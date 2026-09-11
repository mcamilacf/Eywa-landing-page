import { OrderReservation, CartItem, OrderCustomerInfo, POT_DIMENSIONS } from '../types';
import { formatCOP } from '../utils/format';

const STORAGE_KEY = 'eywa_orders_history';

/**
 * Default Google Sheets Webhook URL provided by the store owner (Carlos Cuartas)
 */
export const DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycby2d3iLPe4WvGR5WQ14lZJO9hMoz5xCwZKR8ObW8oczKYiA1ZY9U-C11PV6W3p_xqymXQ/exec';

/**
 * Returns the currently active Google Sheets Webhook URL
 */
export function getActiveWebhookUrl(): string {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem('eywa_google_sheets_url');
    if (custom && custom.trim().length > 0 && !custom.includes('AKfycbw_5KZz')) {
      return sanitizeGoogleAppsScriptUrl(custom);
    }
  }
  const envUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
  if (envUrl && envUrl.trim().length > 0 && !envUrl.includes('AKfycbw_5KZz')) {
    return sanitizeGoogleAppsScriptUrl(envUrl);
  }
  return DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL;
}

/**
 * Updates or resets custom Google Sheets Webhook URL
 */
export function setCustomWebhookUrl(url: string): void {
  if (typeof window !== 'undefined') {
    if (url.trim()) {
      localStorage.setItem('eywa_google_sheets_url', url.trim());
    } else {
      localStorage.removeItem('eywa_google_sheets_url');
    }
  }
}

/**
 * Retrieves all orders saved in local storage
 */
export function getStoredOrders(): OrderReservation[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

/**
 * Generates a unique, readable Eywa order code like #EYWA-592814
 */
export function generateOrderId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `#EYWA-${randomNum}`;
}

export const STORE_PICKUP_INFO = {
  storeName: 'Evento Especial Cosmo School Rionegro',
  address: 'Cra 55A #35-229, Comfama Rionegro',
  city: 'Rionegro, Antioquia',
  schedule: 'Sábado 24 de Octubre de 2026 · 9:00 AM a 4:00 PM (Evento Especial)',
  phone: '+57 300 123 4567',
  notice: 'Presenta tu número de pedido al momento de recoger tu kit en el evento. El pago se efectúa directamente al recibir (Efectivo, Tarjeta o Transferencia).',
};

/**
 * Creates an OrderReservation object from the active cart items and customer details
 */
export function createOrderReservation(
  customer: OrderCustomerInfo,
  items: CartItem[]
): OrderReservation {
  const orderId = generateOrderId();
  const now = new Date();

  const formattedItems = items.map((item) => ({
    plantId: item.plant.id,
    plantName: item.plant.name,
    size: item.size,
    potDimensions: POT_DIMENSIONS[item.size].label,
    quantity: item.quantity,
    priceUnit: item.price,
    subtotal: item.price * item.quantity,
  }));

  const totalAmount = formattedItems.reduce((acc, item) => acc + item.subtotal, 0);
  const totalItems = formattedItems.reduce((acc, item) => acc + item.quantity, 0);

  const order: OrderReservation = {
    orderId,
    createdAt: now.toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    customer: {
      fullName: customer.fullName.trim(),
      phone: customer.phone.trim(),
      notes: customer.notes?.trim() || '',
    },
    items: formattedItems,
    totalItems,
    totalAmount,
    pickupLocation: `${STORE_PICKUP_INFO.storeName} - ${STORE_PICKUP_INFO.address}`,
    pickupSchedule: STORE_PICKUP_INFO.schedule,
    status: 'Pendiente de recogida',
  };

  return order;
}

/**
 * Sanitizes Google Apps Script Web App URL to ensure it ends in /exec
 */
export function sanitizeGoogleAppsScriptUrl(url: string): string {
  let clean = url.trim();
  if (clean.includes('script.google.com') && clean.endsWith('/edit')) {
    clean = clean.replace(/\/edit$/, '/exec');
  }
  if (clean.includes('script.google.com') && clean.endsWith('/dev')) {
    // Note: /dev only works when logged in as author, /exec is needed for anonymous users
  }
  return clean;
}

/**
 * Sends a test row to Google Sheets via the Web App URL (via backend proxy with direct fallback)
 */
export async function testGoogleSheetsWebhook(
  url?: string
): Promise<{ success: boolean; message: string }> {
  const targetUrl = url?.trim() || getActiveWebhookUrl();
  const cleanUrl = sanitizeGoogleAppsScriptUrl(targetUrl);

  if (!cleanUrl.includes('script.google.com')) {
    return {
      success: false,
      message:
        'La URL no parece ser de Google Apps Script. Debe iniciar con https://script.google.com/macros/s/.../exec',
    };
  }

  // 1. Try sending via backend proxy route first (completely bypasses browser CORS & adblockers)
  try {
    const apiRes = await fetch('/api/test-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ webhookUrl: cleanUrl }),
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.success) {
        return {
          success: true,
          message: '¡Prueba enviada y verificada con éxito en Google Sheets!',
        };
      }
    }
  } catch (proxyErr) {
    console.warn('Backend proxy no disponible para prueba, intentando directo...', proxyErr);
  }

  // 2. Direct client-side fallback
  const testPayload = {
    orderId: '#TEST-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }),
    customerName: 'Cliente de Prueba (Eywa)',
    customerPhone: '+57 300 000 0000',
    notes: 'Prueba de sincronización exitosa',
    totalItems: 1,
    totalAmount: 48000,
    totalFormatted: '$48.000',
    itemsSummary: '1x Kit Romero (M - Ø15×12 cm) - $48.000',
    pickupLocation: 'Cosmo School Rionegro (Cra 55A #35-229, Comfama)',
    status: 'Prueba de Conexión',
  };

  try {
    await fetch(cleanUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(testPayload),
    });

    return {
      success: true,
      message: '¡Prueba enviada a Google Apps Script!',
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: 'Error al enviar a la URL de Apps Script: ' + (err instanceof Error ? err.message : String(err)),
    };
  }
}

/**
 * Submits the order to Google Apps Script / Google Sheets Webhook and saves to local storage
 */
export async function submitOrderToGoogleSheets(
  order: OrderReservation
): Promise<{ success: boolean; message: string }> {
  // 1. Save to local storage for persistence
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('No se pudo guardar el pedido en localStorage:', err);
  }

  // 2. Determine Webhook URL (from localStorage or Vite environment or Default)
  const webhookUrl = getActiveWebhookUrl();

  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return {
      success: true,
      message: 'Guardado localmente. (Configura tu URL de Google Apps Script para recibirlo en Drive).',
    };
  }

  // 3. First attempt: Use the application's backend server proxy
  // This completely eliminates CORS issues, browser adblocker interference, and redirect dropouts in published browsers
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order,
        webhookUrl,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        console.log('[Eywa] Pedido enviado a Google Sheets vía backend server con éxito:', order.orderId);
        return {
          success: true,
          message: 'Pedido sincronizado automáticamente con la hoja de Google Drive.',
        };
      }
    }
  } catch (backendError) {
    console.warn('[Eywa] Backend proxy no respondió, recurriendo a envío directo...', backendError);
  }

  // 4. Fallback attempt: Direct fetch from client
  try {
    const payload = {
      orderId: order.orderId,
      date: order.createdAt,
      customerName: order.customer.fullName,
      customerPhone: order.customer.phone,
      notes: order.customer.notes || '',
      totalItems: order.totalItems,
      totalAmount: order.totalAmount,
      totalFormatted: formatCOP(order.totalAmount),
      itemsSummary: order.items
        .map(
          (i) =>
            `${i.quantity}x Kit ${i.plantName} (${i.size} - ${i.potDimensions}) - ${formatCOP(i.subtotal)}`
        )
        .join(' | '),
      pickupLocation: order.pickupLocation,
      status: order.status,
    };

    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'Pedido sincronizado automáticamente con la hoja de Google Drive.',
    };
  } catch (error) {
    console.error('Error al enviar el pedido a Google Apps Script:', error);
    return {
      success: true,
      message: 'Pedido guardado localmente (sin conexión con Google Sheets).',
    };
  }
}

/**
 * Re-submits all locally saved orders to Google Sheets
 */
export async function syncAllPendingOrdersToGoogleSheets(): Promise<{
  total: number;
  synced: number;
  message: string;
}> {
  const orders = getStoredOrders();
  if (orders.length === 0) {
    return {
      total: 0,
      synced: 0,
      message: 'No hay pedidos guardados en el historial local.',
    };
  }

  const webhookUrl = getActiveWebhookUrl();
  let count = 0;

  for (const order of orders) {
    try {
      // 1. Try server proxy
      let sent = false;
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order, webhookUrl }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            sent = true;
          }
        }
      } catch {
        // Fallback to client fetch
      }

      if (!sent) {
        const payload = {
          orderId: order.orderId,
          date: order.createdAt,
          customerName: order.customer.fullName,
          customerPhone: order.customer.phone,
          notes: order.customer.notes || '',
          totalItems: order.totalItems,
          totalAmount: order.totalAmount,
          totalFormatted: formatCOP(order.totalAmount),
          itemsSummary: order.items
            .map(
              (i) =>
                `${i.quantity}x Kit ${i.plantName} (${i.size} - ${i.potDimensions}) - ${formatCOP(i.subtotal)}`
            )
            .join(' | '),
          pickupLocation: order.pickupLocation,
          status: order.status,
        };

        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      }
      count++;
    } catch (err) {
      console.error('Error al sincronizar pedido ' + order.orderId, err);
    }
  }

  return {
    total: orders.length,
    synced: count,
    message: `Se sincronizaron ${count} de ${orders.length} pedidos con Google Sheets.`,
  };
}

/**
 * Builds a direct WhatsApp message URL so customer or store can confirm the pickup
 */
export function generateWhatsAppOrderUrl(order: OrderReservation): string {
  const itemsText = order.items
    .map(
      (item) =>
        `• ${item.quantity}x Kit ${item.plantName} (Tamaño ${item.size} - ${item.potDimensions}): ${formatCOP(item.subtotal)}`
    )
    .join('\n');

  const text = `🌿 *NUEVO ENCARGO EYWA BOTANICALS* 🌿\n\n` +
    `*Número de Pedido:* ${order.orderId}\n` +
    `*Cliente:* ${order.customer.fullName}\n` +
    `*Teléfono:* ${order.customer.phone}\n` +
    (order.customer.notes ? `*Notas:* ${order.customer.notes}\n` : '') +
    `\n*Detalle del Pedido:*\n${itemsText}\n\n` +
    `*Total a Pagar:* ${formatCOP(order.totalAmount)}\n` +
    `*Modalidad:* Entrega en Evento Cosmo School Rionegro\n` +
    `*Lugar:* ${order.pickupLocation}\n` +
    `*Fecha y Horario:* ${order.pickupSchedule}\n\n` +
    `_Conservo este mensaje y mi código de pedido ${order.orderId} para reclamar mi kit en el evento._`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
