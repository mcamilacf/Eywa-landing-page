import React from 'react';
import { CartItem, POT_DIMENSIONS } from '../types';
import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { formatCOP } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (plantId: string, size: 'S' | 'M' | 'L', delta: number) => void;
  onRemoveItem: (plantId: string, size: 'S' | 'M' | 'L') => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 100000;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 10000;
  const total = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-screen sm:max-w-md bg-[#F7F7F2] border-l border-[#E5EBE6] shadow-2xl flex flex-col justify-between text-[#3B4D30]">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-6 border-b border-[#E5EBE6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#767f64]" />
              <h2 className="font-serif italic font-bold text-lg sm:text-xl text-[#3B4D30]">Tu Pedido Eywa</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E5EBE6] text-[#3B4D30] border border-[#767f64]/30">
                {items.reduce((sum, i) => sum + i.quantity, 0)} kits
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full text-[#3B4D30]/70 hover:text-[#3B4D30] hover:bg-[#E5EBE6] flex items-center justify-center transition-colors active:scale-95"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#E5EBE6] border border-[#767f64]/20 flex items-center justify-center text-[#767f64] mx-auto">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="font-serif italic font-bold text-lg text-[#3B4D30]">
                  Tu lista de encargo está vacía
                </p>
                <p className="font-sans text-xs text-[#5A6D47] max-w-xs mx-auto">
                  Explora nuestro catálogo o realiza el quiz para encargar tus kits de cultivo.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.plant.id}-${item.size}`}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#E5EBE6] border border-[#767f64]/20 flex gap-3 sm:gap-4 items-center shadow-xs"
                >
                  <img
                    src={item.plant.imageUrl}
                    alt={item.plant.name}
                    style={{ objectPosition: item.plant.imagePosition || 'center' }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-[#767f64]/20"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif font-bold text-sm text-[#3B4D30] truncate">
                        Kit {item.plant.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.plant.id, item.size)}
                        className="text-[#5A6D47] hover:text-rose-600 transition-colors p-1"
                        aria-label="Eliminar kit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] sm:text-xs font-sans text-[#5A6D47]">
                      Tamaño: <span className="font-bold text-[#3B4D30]">Kit {item.size}</span>{' '}
                      <span className="text-[10px] text-[#5A6D47]/80">({POT_DIMENSIONS[item.size].label})</span>
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 bg-white rounded-lg border border-[#767f64]/20 px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.size, -1)}
                          className="p-1 hover:text-[#767f64] active:scale-95"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3 text-[#3B4D30]" />
                        </button>
                        <span className="text-xs font-bold font-sans text-[#3B4D30] px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.size, 1)}
                          className="p-1 hover:text-[#767f64] active:scale-95"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3 text-[#3B4D30]" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-xs sm:text-sm text-[#3B4D30]">
                        {formatCOP(item.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-[#E5EBE6] bg-[#E5EBE6] space-y-3 sm:space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#3B4D30]/80">
                  <span>Subtotal de Kits</span>
                  <span className="font-bold text-[#3B4D30]">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#3B4D30]/80">
                  <span>Modalidad</span>
                  <span className="font-bold text-[#5A6D47]">Entrega en Cosmo School (Gratis)</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#3B4D30] pt-2 border-t border-[#767f64]/20">
                  <span>Total a Pagar al Recibir</span>
                  <span className="text-[#3B4D30] font-serif text-base sm:text-lg">{formatCOP(subtotal)}</span>
                </div>
                <p className="text-[10px] text-[#5A6D47] text-center pt-0.5">
                  🌿 Reclamas con tu número de pedido durante el evento en Cosmo School Rionegro.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 rounded-xl bg-[#767f64] hover:bg-[#5A6D47] text-white font-sans font-bold uppercase tracking-wider sm:tracking-widest text-xs transition-all shadow-xs flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                Continuar con mi Encargo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
