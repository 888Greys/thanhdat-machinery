// Vercel Serverless API Route: /api/notify
// Handles Telegram notifications and Resend email delivery for Tu Thanh Machinery

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const rawSender = process.env.RESEND_SENDER || 'orders@coincash.cash';
  
  let RESEND_SENDER = 'Tu Thanh Machinery <orders@coincash.cash>';
  if (rawSender.includes('@')) {
    const emailMatch = rawSender.match(/<([^>]+)>/);
    const emailOnly = emailMatch ? emailMatch[1].trim() : rawSender.trim();
    RESEND_SENDER = `Tu Thanh Machinery <${emailOnly}>`;
  }

  const body = req.body || {};
  const { type, order, user } = body;

  const results = { telegram: null, email: null };

  // 1. ORDER NOTIFICATION
  if (type === 'order' && order) {
    // Format Telegram Message
    const itemsText = (order.items || [])
      .map(item => `  ⚙️ <b>${escapeHtml(item.name)}</b> × ${item.quantity}\n     <i>${item.specs || item.hp || ''}</i> — ${formatCurrency(item.price, item.currency || order.currency)}`)
      .join('\n\n');

    const telegramText = [
      `🚜 <b>NEW MACHINERY ORDER — TU THANH MACHINERY</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📦 <b>Order ID:</b> <code>#${escapeHtml(order.id)}</code>`,
      `⏳ <b>Status:</b> <b>PENDING (Workshop Inspection & Run-Test)</b>`,
      `🚚 <b>Freight Tracking Code:</b> <code>${escapeHtml(order.trackingCode || 'TTM-' + order.id.slice(-6))}</code>`,
      `📅 <b>Date:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })} ICT`,
      ``,
      `👤 <b>CUSTOMER DETAILS:</b>`,
      `• <b>Full Name:</b> ${escapeHtml(order.customerName || 'N/A')}`,
      `• <b>Phone / WhatsApp:</b> <b>${escapeHtml(order.customerPhone || 'N/A')}</b>`,
      `• <b>Email:</b> ${escapeHtml(order.customerEmail || 'Not provided')}`,
      `• <b>Shipping Address:</b> ${escapeHtml(order.customerAddress || '')}, ${escapeHtml(order.customerCity || order.customerDistrict || '')}, ${escapeHtml(order.customerProvince || '')}`,
      `• <b>Freight Courier:</b> ${escapeHtml(order.deliverySpeed || 'Express Freight / Crate Courier')}`,
      `• <b>Payment Method:</b> ${escapeHtml(order.paymentMethod || 'Wire Transfer / Inspection on Delivery (COD)')}`,
      order.customerNotes ? `• <b>Customer Notes:</b> <i>${escapeHtml(order.customerNotes)}</i>` : '',
      ``,
      `🛠️ <b>ORDERED EQUIPMENT (${(order.items || []).length} items):</b>`,
      itemsText,
      ``,
      `💰 <b>FINANCIAL SUMMARY:</b>`,
      `• <b>Subtotal:</b> ${formatCurrency(order.subtotal, order.currency)}`,
      `• <b>Freight / Wooden Crate Packing:</b> ${order.shipping === 0 ? 'FREE FREIGHT SHIPPING' : formatCurrency(order.shipping, order.currency)}`,
      `• <b>TOTAL AMOUNT:</b> <b>${formatCurrency(order.total, order.currency)}</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📍 <i>Tu Thanh Machinery — Industrial Area, Nairobi, Kenya (Hotline / WhatsApp: +84 918 453 476)</i>`
    ].filter(Boolean).join('\n');

    // Send Telegram Notification
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
            parse_mode: 'HTML'
          })
        });
        results.telegram = await tgRes.json();
      } catch (tgErr) {
        console.error('Telegram Error:', tgErr);
        results.telegram = { ok: false, error: tgErr.message };
      }
    }

    // Send Resend Confirmation Email to Customer if email provided
    if (order.customerEmail && RESEND_API_KEY) {
      const emailHtml = generateInvoiceEmailHtml(order);

      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: RESEND_SENDER,
            to: [order.customerEmail],
            subject: `⚙️ Order Confirmation #${order.id} — Tu Thanh Machinery`,
            html: emailHtml
          })
        });

        const emailData = await emailRes.json();
        results.email = emailData;

        if (!emailRes.ok && emailData.message) {
          console.warn('Resend send warning:', emailData);
        }
      } catch (emErr) {
        console.error('Resend Error:', emErr);
        results.email = { ok: false, error: emErr.message };
      }
    }

    return res.status(200).json({ success: true, results });
  }

  // 2. WELCOME / INQUIRY NOTIFICATION
  if (type === 'welcome' && user && user.email && RESEND_API_KEY) {
    try {
      const welcomeHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);">
          <div style="background: #1b5e20; padding: 32px 24px; text-align: center;">
            <div style="font-size: 32px; margin-bottom: 6px;">🚜</div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">TU THANH MACHINERY</h1>
            <p style="margin: 6px 0 0 0; color: #fde047; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Diesel Engines & Agricultural Equipment</p>
          </div>
          <div style="padding: 28px 24px; background: #ffffff;">
            <h2 style="color: #0f172a; font-size: 19px; margin-top: 0; font-weight: 700;">Welcome, ${escapeHtml(user.name || user.email.split('@')[0])}!</h2>
            <p style="color: #475569; line-height: 1.6; font-size: 14px;">Thank you for connecting with Tu Thanh Machinery. When ordering diesel engines and power machinery from our showroom, you are guaranteed:</p>
            <ul style="color: #334155; line-height: 1.8; padding-left: 20px; font-size: 14px;">
              <li><strong>100% Brand-New Units:</strong> Genuine Kubota, Yanmar, and John Deere power equipment in factory crates.</li>
              <li><strong>Comprehensive Pre-Test Run:</strong> Oil filled, injector calibrated, and engine run-tested before crate packaging.</li>
              <li><strong>Secured Freight Shipping:</strong> Palletized and shock-proof crated dispatch nationwide and globally.</li>
              <li><strong>24-Month Official Warranty:</strong> Guaranteed spare parts availability and direct video consultation with certified mechanics.</li>
            </ul>
            <div style="text-align: center; margin: 30px 0 20px 0;">
              <a href="https://modernmachinery.vercel.app" style="background: #2e7d32; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">Browse Machinery Catalog</a>
            </div>
            <div style="margin-top: 24px; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
              <span style="color: #64748b; font-size: 12px;">Need technical advice or wholesale pricing? Contact us directly: </span>
              <a href="tel:+84918453476" style="color: #1b5e20; font-weight: 800; text-decoration: none; font-size: 13px;">+84 918 453 476 (Hotline / WhatsApp)</a>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 16px 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            Tu Thanh Machinery Showroom • Industrial Area, Nairobi, Kenya<br>
            TikTok: @nnc.thanhdat2 (404K+ Followers) • WhatsApp: +84 918 453 476
          </div>
        </div>
      `;

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: RESEND_SENDER,
          to: [user.email],
          subject: '🚜 Welcome to Tu Thanh Machinery — Account Access Confirmed',
          html: welcomeHtml
        })
      });

      const emailData = await emailRes.json();
      return res.status(200).json({ success: true, email: emailData });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(400).json({ error: 'Unknown request type' });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Order amounts arrive already converted into the customer's currency.
const CURRENCY_DISPLAY = {
  USD: { prefix: '$', suffix: ' USD' },
  KES: { prefix: 'KSh ', suffix: '' }
};

function formatCurrency(amount, currency) {
  const display = CURRENCY_DISPLAY[currency] || CURRENCY_DISPLAY.USD;
  return display.prefix + Number(amount || 0).toLocaleString('en-US') + display.suffix;
}

function generateInvoiceEmailHtml(order) {
  const itemsHtml = (order.items || []).map(item => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 14px 10px; color: #0f172a; font-weight: 600; font-size: 14px;">
        ${escapeHtml(item.name)}
        <div style="color: #64748b; font-size: 12px; font-weight: normal; margin-top: 2px;">
          Quantity: ${item.quantity} × ${formatCurrency(item.price, item.currency || order.currency)}
          ${item.specs ? `<br><span style="color: #047857; font-size: 11px;">⚙️ ${escapeHtml(item.specs)}</span>` : ''}
        </div>
      </td>
      <td style="padding: 14px 10px; color: #1b5e20; font-weight: 700; text-align: right; font-size: 14px;">
        ${formatCurrency(item.price * item.quantity, item.currency || order.currency)}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); color: #0f172a;">
        
        <!-- Brand Header -->
        <div style="background: #1b5e20; padding: 32px 24px; text-align: center;">
          <div style="display: inline-block; padding: 4px 14px; background: #fef08a; border: 1px solid #facc15; border-radius: 999px; color: #854d0e; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px;">⏳ STATUS: PRE-DISPATCH RUN-TEST UNDERWAY</div>
          <div style="font-size: 28px; margin-bottom: 4px;">🚜</div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">TU THANH MACHINERY</h1>
          <p style="margin: 6px 0 0 0; color: #dcfce7; font-size: 13px;">Official Order Receipt &amp; Machinery Inspection Certificate for ${escapeHtml(order.customerName || 'Valued Client')}</p>
        </div>

        <!-- Status Alert -->
        <div style="margin: 20px 24px 0 24px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 16px 20px; text-align: left;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 18px;">✅</span>
            <span style="color: #166534; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">ORDER CONFIRMED &amp; PROCESSING</span>
          </div>
          <p style="margin: 0; color: #14532d; font-size: 13px; line-height: 1.5;">
            Thank you for your order. Our certified technicians are filling engine oil, checking compression, and completing a live dyno-test run before packaging your machinery in a reinforced wooden crate.
          </p>
        </div>

        <!-- Order Meta -->
        <div style="padding: 18px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-top: 20px;">
          <table style="width: 100%; font-size: 13px;">
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Order Reference:</td>
              <td style="color: #1b5e20; font-weight: 800; font-family: monospace; font-size: 15px; text-align: right;">#${escapeHtml(order.id)}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Freight Tracking Code:</td>
              <td style="color: #0f172a; font-weight: 700; font-family: monospace; text-align: right;">${escapeHtml(order.trackingCode || 'TTM-' + order.id.slice(-6))}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Shipping Method:</td>
              <td style="color: #0f172a; text-align: right;">${escapeHtml(order.deliverySpeed || 'Express Freight Courier')}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Delivery Destination:</td>
              <td style="color: #0f172a; text-align: right;">${escapeHtml(order.customerAddress || '')}, ${escapeHtml(order.customerCity || order.customerDistrict || '')}, ${escapeHtml(order.customerProvince || '')}</td>
            </tr>
          </table>
        </div>

        <!-- Items Table -->
        <div style="padding: 24px;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 15px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Itemized Equipment Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="margin-top: 20px; border-top: 2px solid #f1f5f9; padding-top: 14px;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Subtotal:</td>
                <td style="text-align: right; color: #0f172a; font-weight: 600;">${formatCurrency(order.subtotal, order.currency)}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Freight &amp; Crate Handling:</td>
                <td style="text-align: right; color: #166534; font-weight: 600;">${order.shipping === 0 ? 'Free Freight Shipping' : formatCurrency(order.shipping, order.currency)}</td>
              </tr>
              <tr style="font-size: 16px; border-top: 1px dashed #cbd5e1;">
                <td style="color: #0f172a; font-weight: 800; padding: 10px 0 4px 0;">TOTAL:</td>
                <td style="text-align: right; color: #1b5e20; font-weight: 800; padding: 10px 0 4px 0; font-size: 18px;">${formatCurrency(order.total, order.currency)}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Pre-delivery Test Guarantee Box -->
        <div style="margin: 0 24px 24px 24px; background: #fffbeb; border: 1px solid #fef08a; border-radius: 8px; padding: 14px 18px;">
          <h4 style="margin: 0 0 6px 0; color: #854d0e; font-size: 13px; font-weight: 700;">🛡️ INSPECTION &amp; DELIVERY GUARANTEE:</h4>
          <p style="margin: 0; color: #713f12; font-size: 12px; line-height: 1.5;">
            Upon delivery by our freight courier, you are entitled to inspect the crate seals, verify model serial numbers, and test-start the engine before finalizing any remaining payment.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #0f172a; padding: 22px 24px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
          <strong style="color: #f8fafc; font-size: 13px;">TU THANH MACHINERY SHOWROOM &amp; DISTRIBUTION</strong><br>
          📍 Address: Industrial Area, Nairobi, Kenya<br>
          📞 Hotline / WhatsApp: <a href="tel:+84918453476" style="color: #4ade80; text-decoration: none; font-weight: bold;">+84 918 453 476</a><br>
          📱 Official TikTok Channel: <b>@nnc.thanhdat2</b> (404,000+ Followers)
        </div>
      </div>
    </body>
    </html>
  `;
}
