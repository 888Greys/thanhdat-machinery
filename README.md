# Tư Thành - Nông Cơ Thành Đạt 2 🚜

Nền tảng thương mại điện tử chuyên nghiệp cho **Tổng Kho Động Cơ Diesel & Máy Nông Nghiệp Tư Thành (Cửa Hàng Thành Đạt 2 - Sóc Trăng)**.
Chuyên phân phối động cơ diesel chính hãng Kubota RT Thái Lan, Yanmar TF Direct Injection, John Deere USA, máy xới đất 2 bánh đa năng, đầu bơm nước áp lực cao, dàn láp đuôi tôm inox 304 và bộ khởi động đề điện 12V.

---

## 🌟 Điểm Nổi Bật & Tính Năng

- **Danh mục thiết bị nông cơ hoàn chỉnh (16+ sản phẩm)**: Đầy đủ thông số mã lực (HP), vòng tua (RPM), buồng đốt, hệ thống làm mát két nước/bốc hơi, trọng lượng và kiểu khởi động đề điện / quay tay.
- **Tích hợp TikTok Spotlight**: Giới thiệu các video thử nổ giòn tan, ráp đề điện 12V và giao chành xe từ kênh TikTok **@nnc.thanhdat2** (hơn 404K người theo dõi, 3.4M lượt thích).
- **Giao diện tối ưu di động 2 cột**: Hiển thị thẻ máy gọn gàng, trực quan trên điện thoại, hỗ trợ tăng giảm số lượng và chọn mua nhanh.
- **Hệ thống đánh giá kỹ thuật thực tế**: Nhận xét và kinh nghiệm từ bà con nông dân và thợ máy khắp các tỉnh Miền Tây (Sóc Trăng, Kế Sách, Cần Thơ, Bạc Liêu, An Giang...).
- **Cổng Tra Cứu Đơn Hàng Vận Chuyển**: Tìm kiếm theo Mã đơn hàng (VD: `TD-123456`) hoặc Số điện thoại với quy trình 5 bước: Tiếp nhận -> Kỹ thuật test máy -> Đóng kiện gỗ -> Bàn giao chành xe Tô Châu/Phương Trang -> Giao tận ruộng & thử nổ máy.
- **Tự động thông báo đơn hàng**:
  - **Telegram Bot**: Bắn tin nhắn báo đơn mới tức thì về điện thoại chủ xưởng kèm chi tiết máy, công suất, số điện thoại khách và địa chỉ giao hàng.
  - **Resend Email Invoice**: Tự động gửi phiếu đặt mua và cam kết kiểm tra máy qua email khách hàng.
- **Phương thức thanh toán & giao hàng phù hợp miền sông nước**:
  - Nhận máy kiểm tra nổ giòn rồi thanh toán (COD).
  - Quét mã VietQR chuyển khoản ngân hàng Vietcombank.
  - Vận chuyển linh hoạt qua chành xe Tô Châu, Phương Trang hoặc xe tải giao tận nhà.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: HTML5 Semantic, CSS3 Responsive Grid, Vanilla JavaScript (ES6+).
- **Serverless Backend**: Vercel Serverless Function (`/api/notify.js`).
- **Database & Storage**: Supabase REST API & Client + LocalStorage offline fallback.
- **Notifications**: Telegram Bot API + Resend Email API.
- **Hosting & CI/CD**: Vercel Cloud.

---

## 🚀 Hướng Dẫn Triển Khai Lên Vercel (Deploy)

### Cách 1: Triển khai qua Vercel CLI

Chạy lệnh sau tại thư mục dự án:

```bash
# Đăng nhập và deploy thử nghiệm
vercel

# Deploy bản chính thức (Production)
vercel --prod
```

### Cách 2: Cài đặt biến môi trường trên Vercel Dashboard

Sau khi deploy lên Vercel, vào mục **Settings > Environment Variables** trên Vercel Dashboard và thêm 4 biến sau:

1. `TELEGRAM_BOT_TOKEN`: Token của bot Telegram.
2. `TELEGRAM_CHAT_ID`: ID của chat hoặc channel nhận thông báo đơn hàng.
3. `RESEND_API_KEY`: Khóa API của Resend để gửi email hóa đơn.
4. `RESEND_SENDER`: Tên người gửi hiển thị (Ví dụ: `Tu Thanh Machinery <orders@coincash.cash>`).

*(Các giá trị này đã được thiết lập sẵn trong file `.env.local` cho môi trường phát triển cục bộ).*

---

## 📍 Thông Tin Cửa Hàng

- **Tên cửa hàng**: Cửa Hàng Nông Cơ Thành Đạt 2 (Tư Thành)
- **Địa chỉ**: 49 Võ Văn Kiệt, Phường 7, TP. Sóc Trăng, Tỉnh Sóc Trăng
- **Hotline / Zalo kỹ thuật**: **0918 453 476**
- **Kênh TikTok chính thức**: [@nnc.thanhdat2](https://www.tiktok.com/@nnc.thanhdat2)
