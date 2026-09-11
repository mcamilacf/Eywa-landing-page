import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send,
  FileSpreadsheet,
  ExternalLink,
  Code2,
  Copy,
  Check,
} from 'lucide-react';
import {
  getActiveWebhookUrl,
  setCustomWebhookUrl,
  getStoredOrders,
  testGoogleSheetsWebhook,
  syncAllPendingOrdersToGoogleSheets,
  DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL,
} from '../services/orderService';
import { OrderReservation } from '../types';
import { formatCOP } from '../utils/format';

interface SheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SheetsSyncModal: React.FC<SheetsSyncModalProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [orders, setOrders] = useState<OrderReservation[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setWebhookUrl(getActiveWebhookUrl());
      setOrders(getStoredOrders());
      setTestResult(null);
      setSyncResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomWebhookUrl(webhookUrl);
    setTestResult({
      success: true,
      message: 'URL actualizada con éxito en la aplicación.',
    });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testGoogleSheetsWebhook(webhookUrl);
      setTestResult(res);
    } catch (err: unknown) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Error desconocido al probar la conexión.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSyncAllOrders = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const res = await syncAllPendingOrdersToGoogleSheets();
      setSyncResult(res.message);
      setOrders(getStoredOrders());
    } catch (err: unknown) {
      setSyncResult('Error al sincronizar: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSyncing(false);
    }
  };

  const appsScriptCode = `// CÓDIGO COMPLETO PARA GOOGLE APPS SCRIPT (Extensiones > Apps Script)
function doGet(e) {
  return ContentService.createTextOutput("Eywa Webhook Activo y Listo para Recibir Pedidos.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Si la hoja está vacía, añade la fila de encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID Pedido",
        "Fecha",
        "Cliente",
        "Teléfono",
        "Productos",
        "Cant. Total",
        "Total COP",
        "Lugar de Recogida",
        "Notas",
        "Estado"
      ]);
    }
    
    // Obtiene los datos enviados en formato JSON o URL parameters
    var raw = e.postData && e.postData.contents ? e.postData.contents : "";
    var data = {};
    try {
      data = JSON.parse(raw);
    } catch(parseErr) {
      data = e.parameter || {};
    }
    
    sheet.appendRow([
      data.orderId || "N/A",
      data.date || new Date().toLocaleString(),
      data.customerName || "Sin nombre",
      "'" + (data.customerPhone || ""),
      data.itemsSummary || "",
      data.totalItems || 1,
      data.totalAmount || 0,
      data.pickupLocation || "Cosmo School Rionegro",
      data.notes || "",
      data.status || "Pendiente de recogida"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#F7F7F2] w-full max-w-2xl rounded-3xl border border-[#5A6D47]/30 shadow-2xl p-6 sm:p-8 relative my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E5EBE6] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#5A6D47]" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#5A6D47]">
                Panel de Sincronización
              </span>
            </div>
            <h3 className="font-serif italic text-2xl sm:text-3xl text-[#3B4D30]">
              Conexión con Google Sheets
            </h3>
            <p className="font-sans text-xs text-[#3B4D30]/80">
              Gestiona el enlace de Google Apps Script y reenvía los pedidos guardados a tu hoja de cálculo.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-8 h-8 rounded-full bg-[#E5EBE6] hover:bg-[#d8e0da] text-[#3B4D30] flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Webhook URL configuration */}
        <form onSubmit={handleSaveUrl} className="space-y-3">
          <label className="block text-xs font-bold text-[#3B4D30] uppercase tracking-wider font-sans">
            URL del Webhook (Google Apps Script /exec)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#5A6D47]/30 text-xs font-mono text-[#3B4D30] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5A6D47]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#3B4D30] hover:bg-[#5A6D47] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Guardar URL
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              disabled={isTesting}
              onClick={handleTestConnection}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E5EBE6] hover:bg-[#d5ded7] text-[#3B4D30] text-xs font-sans font-bold transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {isTesting ? 'Probando...' : 'Enviar fila de prueba a la hoja'}
            </button>

            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#3B4D30] text-xs font-sans font-medium transition-all"
            >
              <Code2 className="w-3.5 h-3.5" />
              {showCode ? 'Ocultar código Apps Script' : 'Ver código Apps Script recomendado'}
            </button>
          </div>
        </form>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-sans flex items-start gap-2.5 ${
              testResult.success
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{testResult.message}</p>
              {testResult.success && (
                <p className="text-[11px] text-emerald-800 mt-1">
                  Revisa tu hoja de cálculo en Google Drive para ver la nueva fila registrada.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Code Snippet Accordion */}
        {showCode && (
          <div className="p-4 rounded-2xl bg-[#2A3423] text-[#E5EBE6] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#A3B18A] uppercase tracking-wider font-sans font-bold">
                Google Apps Script (doGet y doPost)
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[#F7F7F2] text-[11px] font-sans font-medium transition-all"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar código
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto max-h-48 text-[11px] text-emerald-300 p-2 bg-black/30 rounded-lg">
              {appsScriptCode}
            </pre>
            <p className="text-[10px] text-stone-300 font-sans leading-relaxed">
              💡 <strong>Importante al implementar en Google Apps Script:</strong>
              <br />
              1. En <em>Implementar &gt; Nueva implementación</em> selecciona <strong>Aplicación web</strong>.
              <br />
              2. <strong>Ejecutar como:</strong> <em>Yo</em> (tu correo).
              <br />
              3. <strong>Quién tiene acceso:</strong> <em>Cualquier persona</em> (Anyone).
            </p>
          </div>
        )}

        {/* Local Orders Storage & Sync Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#5A6D47]/20 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif font-bold text-base text-[#3B4D30]">
                Pedidos guardados en este navegador ({orders.length})
              </h4>
              <p className="font-sans text-xs text-[#3B4D30]/75">
                Todos los pedidos quedan respaldados localmente para que nunca se pierda información.
              </p>
            </div>
            <button
              type="button"
              disabled={isSyncing || orders.length === 0}
              onClick={handleSyncAllOrders}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5A6D47] hover:bg-[#3B4D30] text-white text-xs font-sans font-bold uppercase tracking-wider transition-all disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Sincronizando...' : 'Reenviar todos a Google Sheets'}
            </button>
          </div>

          {syncResult && (
            <p className="text-xs font-sans font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              {syncResult}
            </p>
          )}

          {orders.length > 0 ? (
            <div className="max-h-48 overflow-y-auto divide-y divide-stone-100 border border-stone-100 rounded-xl">
              {orders.slice(0, 10).map((order) => (
                <div key={order.orderId} className="p-3 text-xs font-sans flex items-center justify-between gap-3 hover:bg-stone-50">
                  <div>
                    <span className="font-mono font-bold text-[#3B4D30]">{order.orderId}</span>
                    <span className="text-stone-400 mx-1.5">·</span>
                    <span className="font-semibold text-stone-700">{order.customer.fullName}</span>
                    <span className="text-stone-400 mx-1.5">·</span>
                    <span className="text-stone-500">{order.customer.phone}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif font-bold text-[#5A6D47]">{formatCOP(order.totalAmount)}</span>
                    <span className="text-[10px] text-stone-400 block">{order.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500 font-sans italic text-center py-2">
              Aún no hay pedidos guardados en este dispositivo.
            </p>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#E5EBE6] hover:bg-[#d5ded7] text-[#3B4D30] font-sans font-bold text-xs uppercase tracking-wider transition-all"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
