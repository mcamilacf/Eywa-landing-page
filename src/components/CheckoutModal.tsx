import React, { useState } from 'react';
import { CartItem, OrderReservation, POT_DIMENSIONS } from '../types';
import {
  X,
  CheckCircle,
  Store,
  MapPin,
  Clock,
  Copy,
  Check,
  ShoppingBag,
  Send,
  Download,
  AlertCircle,
  Info,
} from 'lucide-react';
import { formatCOP } from '../utils/format';
import {
  createOrderReservation,
  submitOrderToGoogleSheets,
  generateWhatsAppOrderUrl,
  STORE_PICKUP_INFO,
} from '../services/orderService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderReservation | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Por favor ingresa tu nombre completo y un teléfono o WhatsApp de contacto.');
      return;
    }

    if (items.length === 0) {
      alert('Tu pedido no tiene productos.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrder = createOrderReservation(
        {
          fullName: customerName,
          phone: customerPhone,
          notes: customerNotes,
        },
        items
      );

      // Submit silently to Google Sheets webhook in background
      await submitOrderToGoogleSheets(newOrder);
      setConfirmedOrder(newOrder);
      onClearCart();
    } catch (err) {
      console.error('Error procesando el pedido:', err);
      // Fallback in case of unexpected error
      const newOrder = createOrderReservation(
        {
          fullName: customerName,
          phone: customerPhone,
          notes: customerNotes,
        },
        items
      );
      setConfirmedOrder(newOrder);
      onClearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!confirmedOrder) return;
    navigator.clipboard.writeText(confirmedOrder.orderId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadReceipt = () => {
    if (!confirmedOrder) return;
    const content = `================================================
          EYWA BOTANICALS - COMPROBANTE DE ENCARGO
================================================
Número de Pedido: ${confirmedOrder.orderId}
Fecha de Registro: ${confirmedOrder.createdAt}
Cliente: ${confirmedOrder.customer.fullName}
Teléfono: ${confirmedOrder.customer.phone}
${confirmedOrder.customer.notes ? `Notas: ${confirmedOrder.customer.notes}\n` : ''}
MODALIDAD: Entrega en Evento Cosmo School Rionegro
Lugar de Entrega: ${confirmedOrder.pickupLocation}
Fecha y Horario: ${confirmedOrder.pickupSchedule}

DETALLE DEL ENCARGO:
------------------------------------------------
${confirmedOrder.items
  .map(
    (i) =>
      `${i.quantity}x Kit ${i.plantName} (Tamaño ${i.size} - ${i.potDimensions})\n   Precio: ${formatCOP(i.subtotal)}`
  )
  .join('\n\n')}
------------------------------------------------
TOTAL A PAGAR AL RECIBIR: ${formatCOP(confirmedOrder.totalAmount)}
------------------------------------------------
IMPORTANTE:
Presenta este número (${confirmedOrder.orderId}) al momento de reclamar tu kit en el evento de Cosmo School.
¡Gracias por cultivar con Eywa!
================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pedido-${confirmedOrder.orderId.replace('#', '')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F7F7F2] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5EBE6] shadow-2xl my-auto max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 text-[#3B4D30]">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 text-[#3B4D30] hover:bg-[#E5EBE6] flex items-center justify-center transition-colors border border-[#E5EBE6] shadow-xs active:scale-95"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {confirmedOrder ? (
          /* SUCCESS ORDER RESERVATION SCREEN */
          <div className="text-center py-2 sm:py-4 space-y-5 sm:space-y-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E5EBE6] text-[#5A6D47] border border-[#5A6D47]/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1.5 px-2">
              <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#5A6D47] block">
                ¡ENCARGO REGISTRADO CON ÉXITO!
              </span>
              <h2 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#3B4D30] leading-snug">
                ¡Gracias por tu pedido, {confirmedOrder.customer.fullName}!
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#3B4D30]/80 max-w-md mx-auto leading-relaxed">
                Tu kit Eywa ha sido reservado. Ya comenzamos a alistar tus plantas y sustratos para que los reclames durante el evento en <strong>Cosmo School Rionegro</strong>.
              </p>
            </div>

            {/* CRITICAL ORDER NUMBER HIGHLIGHT BOX */}
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border-2 border-[#5A6D47] shadow-xs space-y-3 max-w-lg mx-auto text-left">
              <div className="flex items-center gap-2 text-amber-800 bg-amber-50 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl border border-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span className="text-[11px] sm:text-xs font-bold font-sans">
                  ¡Guarda este número de pedido! Lo necesitas para reclamar tu kit en el evento.
                </span>
              </div>

              <div className="bg-[#E5EBE6] p-3 sm:p-4 rounded-xl flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 sm:gap-3 border border-[#5A6D47]/20">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block">
                    Número de Pedido
                  </span>
                  <span className="font-serif font-bold text-xl sm:text-2xl md:text-3xl tracking-wide text-[#3B4D30]">
                    {confirmedOrder.orderId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full xs:w-auto px-3.5 py-2 rounded-xl bg-[#3B4D30] hover:bg-[#5A6D47] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar Código
                    </>
                  )}
                </button>
              </div>

              {/* Order Quick Details */}
              <div className="space-y-1 text-xs font-sans text-[#3B4D30]/90 pt-1">
                <div className="flex justify-between py-1 border-b border-[#E5EBE6]">
                  <span className="text-[#5A6D47]">Total a pagar al recibir:</span>
                  <span className="font-serif font-bold text-sm text-[#3B4D30]">
                    {formatCOP(confirmedOrder.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5EBE6] gap-2">
                  <span className="text-[#5A6D47] shrink-0">Lugar de Entrega:</span>
                  <span className="font-medium text-right text-[#3B4D30] text-[11px] sm:text-xs">
                    {STORE_PICKUP_INFO.storeName} ({STORE_PICKUP_INFO.address})
                  </span>
                </div>
                <div className="flex justify-between py-1 gap-2">
                  <span className="text-[#5A6D47] shrink-0">Fecha y Horario:</span>
                  <span className="font-medium text-right text-[#3B4D30] text-[11px] sm:text-xs">{STORE_PICKUP_INFO.schedule}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons for Saving Order */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 max-w-lg mx-auto">
              <a
                href={generateWhatsAppOrderUrl(confirmedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-95"
              >
                <Send className="w-4 h-4" />
                Guardar en WhatsApp
              </a>

              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-[#E5EBE6] text-[#3B4D30] border border-[#5A6D47]/30 font-sans font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                Descargar Comprobante
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-[#3B4D30] hover:bg-[#5A6D47] text-white font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs rounded-xl transition-all shadow-xs active:scale-95"
              >
                Volver al Catálogo
              </button>
            </div>
          </div>
        ) : (
          /* ORDER REGISTRATION FORM */
          <form onSubmit={handleSubmitOrder} className="space-y-4 sm:space-y-6">
            
            <div>
              <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#5A6D47] block">
                ENCARGO DE KITS EYWA
              </span>
              <h2 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#3B4D30] leading-snug">
                Registrar Pedido para Entrega en Cosmo School
              </h2>
              <p className="font-sans text-xs text-[#5A6D47] mt-1">
                Haz tu encargo previo para el evento. Tus kits se prepararán y entregarán en el punto del evento; pagas al momento de reclamar con tu número de pedido.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="bg-[#E5EBE6] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#5A6D47]/20 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#5A6D47]">
                <span className="flex items-center gap-1.5 truncate">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#3B4D30] shrink-0" /> Resumen de Kits ({items.reduce((s, i) => s + i.quantity, 0)})
                </span>
                <span className="shrink-0">{formatCOP(subtotal)}</span>
              </div>
              <div className="space-y-1.5 max-h-32 sm:max-h-36 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.plant.id}-${item.size}`}
                    className="flex items-center justify-between text-xs bg-white/90 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#E5EBE6] gap-2"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-[#3B4D30] truncate">Kit {item.plant.name}</span>
                      <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-[#E5EBE6] text-[#3B4D30] font-medium shrink-0">
                        {item.size}
                      </span>
                    </div>
                    <span className="font-serif font-bold text-[#3B4D30] shrink-0">
                      {item.quantity}x {formatCOP(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Pickup Notice (Only one modality) */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#5A6D47]/30 shadow-xs flex items-start gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#3B4D30] text-white shrink-0 mt-0.5">
                <Store className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="space-y-0.5 sm:space-y-1 text-xs text-[#3B4D30] flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <span className="font-bold uppercase tracking-wider text-[9px] sm:text-[10px] text-[#5A6D47]">
                    Modalidad: Entrega en Evento Especial
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#5A6D47] bg-[#E5EBE6] px-1.5 py-0.5 rounded-md">
                    Sin costo de envío
                  </span>
                </div>
                <p className="font-bold text-xs sm:text-sm text-[#3B4D30] truncate">{STORE_PICKUP_INFO.storeName}</p>
                <div className="flex items-center gap-1 text-[#5A6D47] text-[10px] sm:text-[11px]">
                  <MapPin className="w-3 h-3 text-[#3B4D30] shrink-0" />
                  <span className="truncate">{STORE_PICKUP_INFO.address}, {STORE_PICKUP_INFO.city}</span>
                </div>
                <div className="flex items-center gap-1 text-[#5A6D47] text-[10px] sm:text-[11px]">
                  <Clock className="w-3 h-3 text-[#3B4D30] shrink-0" />
                  <span className="truncate">Fecha / Horario: {STORE_PICKUP_INFO.schedule}</span>
                </div>
              </div>
            </div>

            {/* Customer Contact Form Fields */}
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5A6D47] mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Carolina Cuartas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5EBE6] text-sm sm:text-xs text-[#3B4D30] focus:outline-none focus:ring-1 focus:ring-[#5A6D47]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5A6D47] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ej: +57 300 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5EBE6] text-sm sm:text-xs text-[#3B4D30] focus:outline-none focus:ring-1 focus:ring-[#5A6D47]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5A6D47] mb-1">
                  Notas o comentarios del encargo (Opcional)
                </label>
                <input
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Ej: Reclamaré el kit al inicio del evento"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5EBE6] text-sm sm:text-xs text-[#3B4D30] focus:outline-none focus:ring-1 focus:ring-[#5A6D47]"
                />
              </div>
            </div>

            {/* Total and Terms Notice */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#E5EBE6] border border-[#5A6D47]/20 flex items-center justify-between font-sans">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5A6D47] block">
                  Total a Pagar al Recibir
                </span>
                <span className="text-lg sm:text-xl font-serif font-bold text-[#3B4D30]">{formatCOP(total)}</span>
              </div>
              <div className="text-right text-[10px] sm:text-[11px] text-[#5A6D47] space-y-0.5">
                <span className="font-bold text-[#3B4D30] block">Pagas en el evento</span>
                <span>Efectivo, Tarjeta o Transferencia</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-[#3B4D30] hover:bg-[#5A6D47] text-white font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>Generando Pedido...</span>
              ) : (
                <>
                  <Store className="w-4 h-4" />
                  <span>Confirmar Encargo ({formatCOP(total)})</span>
                </>
              )}
            </button>

            <p className="text-[10px] sm:text-[11px] text-center text-[#5A6D47] font-sans">
              Al confirmar, se generará tu <strong>Número de Pedido</strong> exclusivo para presentar al reclamar tu kit en Cosmo School.
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
