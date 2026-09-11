import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycby2d3iLPe4WvGR5WQ14lZJO9hMoz5xCwZKR8ObW8oczKYiA1ZY9U-C11PV6W3p_xqymXQ/exec';

function resolveWebhookUrl(requestedUrl?: string): string {
  if (requestedUrl && requestedUrl.trim().startsWith('http') && !requestedUrl.includes('AKfycbw_5KZz')) {
    return requestedUrl.trim();
  }
  if (
    process.env.GOOGLE_SHEETS_WEBHOOK_URL &&
    process.env.GOOGLE_SHEETS_WEBHOOK_URL.trim().startsWith('http') &&
    !process.env.GOOGLE_SHEETS_WEBHOOK_URL.includes('AKfycbw_5KZz')
  ) {
    return process.env.GOOGLE_SHEETS_WEBHOOK_URL.trim();
  }
  return DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL;
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Test Google Sheets connection
  app.post('/api/test-sheets', async (req, res) => {
    try {
      const { webhookUrl: customUrl } = req.body || {};
      const targetUrl = resolveWebhookUrl(customUrl);

      const testPayload = {
        orderId: `#TEST-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
        customerName: 'Prueba de Conexión Eywa',
        customerPhone: '3000000000',
        notes: 'Fila de verificación enviada desde el servidor Eywa',
        totalItems: 1,
        totalAmount: 38000,
        totalFormatted: '$ 38.000 COP',
        itemsSummary: '1x Kit Test Conexión',
        pickupLocation: 'Cosmo School Rionegro',
        status: 'Verificación exitosa',
      };

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload),
        redirect: 'follow',
      });

      const responseText = await response.text();
      console.log('[Server] Test sheets response:', response.status, responseText);

      return res.json({
        success: true,
        status: response.status,
        message: '¡Prueba enviada correctamente a Google Sheets!',
        response: responseText,
      });
    } catch (err: unknown) {
      console.error('[Server] Error testing Google Sheets webhook:', err);
      return res.status(500).json({
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  });

  // Submit order to Google Sheets
  app.post('/api/orders', async (req, res) => {
    try {
      const { order, webhookUrl: customUrl } = req.body || {};
      if (!order || !order.orderId) {
        return res.status(400).json({
          success: false,
          error: 'Datos del pedido incompletos.',
        });
      }

      const targetUrl = resolveWebhookUrl(customUrl);

      const payload = {
        orderId: order.orderId,
        date: order.createdAt || new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
        customerName: order.customer?.fullName || 'Sin nombre',
        customerPhone: order.customer?.phone || '',
        notes: order.customer?.notes || '',
        totalItems: order.totalItems || 1,
        totalAmount: order.totalAmount || 0,
        totalFormatted: order.totalFormatted || `$ ${Number(order.totalAmount || 0).toLocaleString('es-CO')} COP`,
        itemsSummary:
          order.itemsSummary ||
          (Array.isArray(order.items)
            ? order.items
                .map((i: { quantity: number; plantName: string; size: string; potDimensions: string }) =>
                  `${i.quantity}x Kit ${i.plantName} (${i.size} - ${i.potDimensions})`
                )
                .join(' | ')
            : 'Productos Eywa'),
        pickupLocation: order.pickupLocation || 'Cosmo School Rionegro (Stand Eywa)',
        status: order.status || 'Pendiente de recogida',
      };

      console.log(`[Server] Forwarding order ${payload.orderId} to Google Sheets webhook...`);

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      const responseText = await response.text();
      console.log(`[Server] Google Sheets responded for ${payload.orderId}:`, response.status, responseText);

      return res.json({
        success: true,
        message: 'Pedido registrado con éxito en Google Sheets.',
        orderId: payload.orderId,
        sheetsResponse: responseText,
      });
    } catch (err: unknown) {
      console.error('[Server] Error forwarding order to Google Sheets:', err);
      // Return 200 with partial success so client doesn't panic, but inform error
      return res.status(200).json({
        success: false,
        warning: 'El pedido se guardó pero falló el reenvío a Google Sheets.',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Eywa server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
