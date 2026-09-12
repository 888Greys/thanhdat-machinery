// Vercel Serverless API Route: /api/notify
// Handles Telegram notifications and Resend email delivery for Tư Thành - Nông Cơ Thành Đạt 2

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
    const formatCurrency = (amount) => {
      const num = Number(amount || 0);
      return num.toLocaleString('vi-VN') + ' ₫';
    };

    // Format Telegram Message
    const itemsText = (order.items || [])
      .map(item => `  ⚙️ <b>${escapeHtml(item.name)}</b> × ${item.quantity}\n     <i>${item.specs || item.hp || ''}</i> — ${formatCurrency(item.price)}`)
      .join('\n\n');

    const telegramText = [
      `🚜 <b>ĐƠN HÀNG MÁY NÔNG NGHIỆP MỚI — THÀNH ĐẠT 2</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📦 <b>Mã Đơn Hàng:</b> <code>#${escapeHtml(order.id)}</code>`,
      `⏳ <b>Trạng Thái:</b> <b>CHỜ XÁC NHẬN (Kỹ Thuật Đang Test Máy)</b>`,
      `🚚 <b>Mã Vận Đơn:</b> <code>${escapeHtml(order.trackingCode || 'TD2-' + order.id.slice(-6))}</code>`,
      `📅 <b>Thời Gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} (Giờ VN)`,
      ``,
      `👤 <b>THÔNG TIN KHÁCH HÀNG:</b>`,
      `• <b>Họ và tên:</b> ${escapeHtml(order.customerName || 'N/A')}`,
      `• <b>Số điện thoại:</b> <b>${escapeHtml(order.customerPhone || 'N/A')}</b>`,
      `• <b>Email:</b> ${escapeHtml(order.customerEmail || 'Không cung cấp')}`,
      `• <b>Địa chỉ nhận hàng:</b> ${escapeHtml(order.customerAddress || '')}, ${escapeHtml(order.customerDistrict || '')}, ${escapeHtml(order.customerProvince || '')}`,
      `• <b>Phương thức vận chuyển:</b> ${escapeHtml(order.deliverySpeed || 'Chành Xe Miền Tây / Viettel Post')}`,
      `• <b>Thanh toán:</b> ${escapeHtml(order.paymentMethod || 'Chuyển Khoản VietQR / COD')}`,
      order.customerNotes ? `• <b>Ghi chú của khách:</b> <i>${escapeHtml(order.customerNotes)}</i>` : '',
      ``,
      `🛠️ <b>DANH SÁCH THIẾT BỊ ĐẶT MUA (${(order.items || []).length} mục):</b>`,
      itemsText,
      ``,
      `💰 <b>TỔNG GIÁ TRỊ ĐƠN HÀNG:</b>`,
      `• <b>Tiền hàng:</b> ${formatCurrency(order.subtotal)}`,
      `• <b>Cước vận chuyển / Đóng kiện gỗ:</b> ${order.shipping === 0 ? 'MIỄN PHÍ VẬN CHUYỂN' : formatCurrency(order.shipping)}`,
      `• <b>TỔNG THANH TOÁN:</b> <b>${formatCurrency(order.total)}</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📍 <i>Cửa Hàng Thành Đạt 2 — 49 Võ Văn Kiệt, P.7, TP. Sóc Trăng (Hotline: 0918 453 476)</i>`
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
            subject: `⚙️ Xác Nhận Đơn Hàng #${order.id} — Tư Thành Nông Cơ Thành Đạt 2`,
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
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">TƯ THÀNH - NÔNG CƠ THÀNH ĐẠT 2</h1>
            <p style="margin: 6px 0 0 0; color: #fde047; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Tổng Kho Động Cơ Diesel & Máy Nông Nghiệp Sóc Trăng</p>
          </div>
          <div style="padding: 28px 24px; background: #ffffff;">
            <h2 style="color: #0f172a; font-size: 19px; margin-top: 0; font-weight: 700;">Kính chào Quý khách, ${escapeHtml(user.name || user.email.split('@')[0])}!</h2>
            <p style="color: #475569; line-height: 1.6; font-size: 14px;">Cảm ơn Quý khách đã kết nối với Cửa Hàng Nông Cơ Thành Đạt 2. Khi mua sắm thiết bị máy nổ diesel và nông cơ tại Thành Đạt 2, Quý khách luôn được đảm bảo:</p>
            <ul style="color: #334155; line-height: 1.8; padding-left: 20px; font-size: 14px;">
              <li><strong>Hàng chính hãng 100%:</strong> Kubota, Yanmar, John Deere nguyên thùng mới 100%.</li>
              <li><strong>Kỹ thuật kiểm tra chạy nổ:</strong> Thử tải, chỉnh ga, kiểm tra áp lực dầu trước khi xuất xưởng.</li>
              <li><strong>Giao hàng chành xe hỏa tốc:</strong> Vận chuyển tận nơi toàn miền Tây và toàn quốc.</li>
              <li><strong>Bảo hành chính hãng 24 tháng:</strong> Đầy đủ linh kiện phụ tùng thay thế trọn đời máy.</li>
            </ul>
            <div style="text-align: center; margin: 30px 0 20px 0;">
              <a href="https://thanhdatmachinery.vercel.app" style="background: #2e7d32; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">Xem Danh Mục Động Cơ & Thiết Bị</a>
            </div>
            <div style="margin-top: 24px; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
              <span style="color: #64748b; font-size: 12px;">Cần tư vấn kỹ thuật hoặc báo giá sỉ đại lý? Gọi ngay: </span>
              <a href="tel:0918453476" style="color: #1b5e20; font-weight: 800; text-decoration: none; font-size: 13px;">0918 453 476 (Zalo Tư Thành)</a>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 16px 20px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            Cửa Hàng Thành Đạt 2 • 49 Võ Văn Kiệt, Phường 7, TP. Sóc Trăng<br>
            TikTok: @nnc.thanhdat2 (404K Follower) • Hotline / Zalo: 0918 453 476
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
          subject: '🚜 Chào Mừng Đến Với Cửa Hàng Nông Cơ Thành Đạt 2 — Sóc Trăng',
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

function generateInvoiceEmailHtml(order) {
  const formatCurrency = (amount) => {
    const num = Number(amount || 0);
    return num.toLocaleString('vi-VN') + ' ₫';
  };

  const itemsHtml = (order.items || []).map(item => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 14px 10px; color: #0f172a; font-weight: 600; font-size: 14px;">
        ${escapeHtml(item.name)}
        <div style="color: #64748b; font-size: 12px; font-weight: normal; margin-top: 2px;">
          Số lượng: ${item.quantity} × ${formatCurrency(item.price)}
          ${item.specs ? `<br><span style="color: #047857; font-size: 11px;">⚙️ ${escapeHtml(item.specs)}</span>` : ''}
        </div>
      </td>
      <td style="padding: 14px 10px; color: #1b5e20; font-weight: 700; text-align: right; font-size: 14px;">
        ${formatCurrency(item.price * item.quantity)}
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
          <div style="display: inline-block; padding: 4px 14px; background: #fef08a; border: 1px solid #facc15; border-radius: 999px; color: #854d0e; font-size: 11px; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px;">⏳ TRẠNG THÁI: CHỜ KỸ THUẬT TEST MÁY</div>
          <div style="font-size: 28px; margin-bottom: 4px;">🚜</div>
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">TƯ THÀNH - NÔNG CƠ THÀNH ĐẠT 2</h1>
          <p style="margin: 6px 0 0 0; color: #dcfce7; font-size: 13px;">Phiếu Đặt Hàng & Kiểm Tra Máy cho Quý khách ${escapeHtml(order.customerName || 'Bà Con Khách Hàng')}</p>
        </div>

        <!-- Status Alert -->
        <div style="margin: 20px 24px 0 24px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 16px 20px; text-align: left;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 18px;">✅</span>
            <span style="color: #166534; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">ĐÃ GHI NHẬN ĐƠN HÀNG THÀNH CÔNG</span>
          </div>
          <p style="margin: 0; color: #14532d; font-size: 13px; line-height: 1.5;">
            Cửa hàng Thành Đạt 2 đã nhận được yêu cầu của Quý khách. Đội ngũ kỹ thuật viên đang tiến hành kiểm tra bugi, béc dầu, nhớt máy và giật nổ thử tải trước khi đóng thùng gỗ bàn giao cho chành xe.
          </p>
        </div>

        <!-- Order Meta -->
        <div style="padding: 18px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-top: 20px;">
          <table style="width: 100%; font-size: 13px;">
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Mã Đơn Hàng:</td>
              <td style="color: #1b5e20; font-weight: 800; font-family: monospace; font-size: 15px; text-align: right;">#${escapeHtml(order.id)}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Mã Vận Đơn:</td>
              <td style="color: #0f172a; font-weight: 700; font-family: monospace; text-align: right;">${escapeHtml(order.trackingCode || 'TD2-' + order.id.slice(-6))}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Hình thức vận chuyển:</td>
              <td style="color: #0f172a; text-align: right;">${escapeHtml(order.deliverySpeed || 'Chành xe Miền Tây')}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-weight: 700; padding: 4px 0;">Địa chỉ giao máy:</td>
              <td style="color: #0f172a; text-align: right;">${escapeHtml(order.customerAddress || '')}, ${escapeHtml(order.customerDistrict || '')}, ${escapeHtml(order.customerProvince || '')}</td>
            </tr>
          </table>
        </div>

        <!-- Items Table -->
        <div style="padding: 24px;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 15px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Chi Tiết Thiết Bị & Động Cơ</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="margin-top: 20px; border-top: 2px solid #f1f5f9; padding-top: 14px;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Tiền hàng:</td>
                <td style="text-align: right; color: #0f172a; font-weight: 600;">${formatCurrency(order.subtotal)}</td>
              </tr>
              <tr>
                <td style="color: #64748b; padding: 4px 0;">Cước vận chuyển chành xe:</td>
                <td style="text-align: right; color: #166534; font-weight: 600;">${order.shipping === 0 ? 'Miễn Phí Vận Chuyển' : formatCurrency(order.shipping)}</td>
              </tr>
              <tr style="font-size: 16px; border-top: 1px dashed #cbd5e1;">
                <td style="color: #0f172a; font-weight: 800; padding: 10px 0 4px 0;">TỔNG THANH TOÁN:</td>
                <td style="text-align: right; color: #1b5e20; font-weight: 800; padding: 10px 0 4px 0; font-size: 18px;">${formatCurrency(order.total)}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Pre-delivery Test Guarantee Box -->
        <div style="margin: 0 24px 24px 24px; background: #fffbeb; border: 1px solid #fef08a; border-radius: 8px; padding: 14px 18px;">
          <h4 style="margin: 0 0 6px 0; color: #854d0e; font-size: 13px; font-weight: 700;">🛡️ QUYỀN LỢI & CAM KẾT KHI NHẬN HÀNG:</h4>
          <p style="margin: 0; color: #713f12; font-size: 12px; line-height: 1.5;">
            Khi chành xe giao tới nơi, Quý khách được quyền mở kiện gỗ kiểm tra đúng model, phụ kiện đi kèm và thử nổ máy nổ giòn êm ái trước khi thanh toán nốt số tiền còn lại.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #0f172a; padding: 22px 24px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
          <strong style="color: #f8fafc; font-size: 13px;">CỬA HÀNG NÔNG CƠ THÀNH ĐẠT 2 (TƯ THÀNH)</strong><br>
          📍 Địa chỉ: 49 Võ Văn Kiệt, Phường 7, TP. Sóc Trăng, Tỉnh Sóc Trăng<br>
          📞 Hotline / Zalo Kỹ Thuật: <a href="tel:0918453476" style="color: #4ade80; text-decoration: none; font-weight: bold;">0918 453 476</a><br>
          📱 Kênh TikTok Chính Thức: <b>@nnc.thanhdat2</b> (404.000+ Người Theo Dõi)
        </div>
      </div>
    </body>
    </html>
  `;
}
