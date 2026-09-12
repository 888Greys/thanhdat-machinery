// ==========================================================================
// TƯ THÀNH - NÔNG CƠ THÀNH ĐẠT 2 (SÓC TRĂNG)
// E-Commerce Platform for Diesel Engines, Tillers, Pumps & Marine Equipment
// ==========================================================================

const SUPABASE_URL = "https://munbteqhjgwoxebguqdl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bmJ0ZXFoamd3b3hlYmd1cWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzM1ODYsImV4cCI6MjA5NjE0OTU4Nn0.tYvdCKxpC6OEWYGhCaOwJbSDimxoHBbbX-CyMR0j59s";

const supabaseClient = (typeof window !== "undefined" && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Currency State: "VND" or "USD" (Exchange rate approx: 1 USD = 25,000 VND)
let currentCurrency = localStorage.getItem("thanhdat_currency") || "VND";
const USD_RATE = 25000;

function formatMoney(vndAmount) {
  if (currentCurrency === "USD") {
    const usd = Math.round(vndAmount / USD_RATE);
    return "$" + usd.toLocaleString("en-US") + " USD";
  }
  return Number(vndAmount).toLocaleString("vi-VN") + " ₫";
}

// 16+ Curated Machinery Catalog
const PRODUCTS_DATA = [
  {
    id: 1,
    brand: "Kubota",
    model: "Kubota RT140 Plus Két Nước Tuần Hoàn (14.0 HP)",
    category: "engines",
    price: 26500000,
    badge: "BÁN CHẠY NHẤT",
    badgeType: "gold-badge",
    sku: "TD2-KUB-RT140",
    hp: "14.0 HP (Mã Lực)",
    rpm: "2,400 RPM",
    rating: 4.9,
    reviewsCount: 14,
    cooling: "Két nước tuần hoàn làm mát",
    starter: "Quay tay trợ lực / Hỗ trợ lên củ đề 12V",
    displacement: "709 cc",
    weight: "115 kg",
    fuelTank: "11 Lít Diesel",
    bullets: [
      "Công suất chuẩn 14.0 HP, buồng đốt lốc xoáy TVCS lực kéo cực khỏe",
      "Két nước nhôm đúc tản nhiệt siêu nhanh, chạy liên tục không sôi nước",
      "Thích hợp kéo dàn xới 2 bánh, bơm nước đồng lớn, chạy vỏ lãi miền Tây"
    ],
    specs: {
      "Hãng sản xuất": "Kubota Corporation (Nhập khẩu Thái Lan)",
      "Kiểu động cơ": "Diesel 4 thì, 1 xi lanh nằm ngang nằm, làm mát két nước",
      "Công suất liên tục": "12.5 HP / 2400 vòng/phút",
      "Công suất cực đại": "14.0 HP / 2400 vòng/phút",
      "Dung tích xi lanh": "709 cc (Đường kính 97mm x Hành trình 96mm)",
      "Hệ thống làm mát": "Két nước tản nhiệt tuần hoàn cưỡng bức",
      "Hệ thống bôi trơn": "Bơm nhớt cưỡng bức kết hợp vung té",
      "Dung tích bình nhiên liệu": "11.0 Lít (Dầu DO Diesel)",
      "Trọng lượng khô": "115 kg (Khung bệ gang chịu lực)",
      "Bảo hành": "24 Tháng chính hãng kèm sổ bảo hành & quà tặng nhớt máy"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Động cơ Diesel Kubota RT140 Plus là dòng máy nổ huyền thoại được bà con nông dân và anh em chạy ghe vỏ lãi Sóc Trăng, Cần Thơ, An Giang đặc biệt tin cậy. Máy được trang bị buồng đốt xoáy lốc TVCS giúp đốt cháy nhiên liệu triệt để, tiếng nổ giòn tan, tiết kiệm 15% dầu so với các dòng máy đời cũ. Cửa hàng Thành Đạt 2 bao kỹ thuật viên nổ thử, chỉnh ga đều trước khi giao.",
    reviews: [
      { id: "r101", author: "Chú Ba Đạt", location: "Kế Sách, Sóc Trăng", rating: 5, date: "2 ngày trước", title: "Máy nổ rất giòn, kéo dàn xới đất ngọt xớt", content: "Tôi mua con RT140 này về gắn vô dàn xới 2 bánh phay ruộng trũng. Máy đề ba bốc, chạy liên tục cả ngày mà két nước chỉ ấm, không sôi sùng sục như con máy cũ. Cửa hàng giao tận nhà chành xe nhanh lẹ.", helpful: 24, liked: false },
      { id: "r102", author: "Anh Hai Thắng", location: "Long Phú, Sóc Trăng", rating: 5, date: "5 ngày trước", title: "Gắn láp đuôi tôm chạy ghe vỏ lãi lướt sóng", content: "Lắp dàn láp 3.8m inox với chân vịt thau của Thành Đạt 2, chạy xuồng 8m chở 1 tấn lúa qua sông Hậu ngọt lịm. Chạy êm ru ít hao dầu.", helpful: 18, liked: false },
      { id: "r103", author: "Bác Năm Luông", location: "Mỹ Xuyên, Sóc Trăng", rating: 5, date: "1 tuần trước", title: "Hàng chuẩn Thái Lan xịn đập thùng", content: "Coi trên TikTok anh Tư Thành thấy thử máy nổ giòn ưng quá nên đặt luôn. Nhận máy đúng như video, nguyên đai nguyên kiện có kèm bình nhớt với đồ nghề nghề.", helpful: 15, liked: false },
      { id: "r104", author: "Văn Hậu", location: "Ô Môn, Cần Thơ", rating: 5, date: "2 tuần trước", title: "Kỹ thuật tư vấn rất nhiệt tình", content: "Hỏi Zalo nửa đêm mà tiệm vẫn trả lời chỉ dẫn cách xả gió béc dầu. Rất có tâm, bà con nông dân mua ở đây an tâm 100%.", helpful: 9, liked: false }
    ]
  },
  {
    id: 2,
    brand: "Yanmar",
    model: "Yanmar TF120-DI Phun Dầu Trực Tiếp (12.0 HP)",
    category: "engines",
    price: 22800000,
    badge: "TIẾT KIỆM DẦU",
    badgeType: "blue-badge",
    sku: "TD2-YAN-TF120",
    hp: "12.0 HP (Mã Lực)",
    rpm: "2,400 RPM",
    rating: 4.8,
    reviewsCount: 11,
    cooling: "Két nước làm mát cưỡng bức",
    starter: "Quay tay trợ lực giảm áp nhẹ",
    displacement: "638 cc",
    weight: "102 kg",
    fuelTank: "10.5 Lít Diesel",
    bullets: [
      "Công nghệ Direct Injection (DI) phun nhiên liệu trực tiếp áp lực cao",
      "Tiết kiệm dầu số 1 phân khúc, giật quay tay cực nhẹ không sợ dội",
      "Thích hợp gắn máy bơm nước tưới tiêu, ghe xuồng và máy phát điện"
    ],
    specs: {
      "Hãng sản xuất": "Yanmar Co., Ltd.",
      "Kiểu động cơ": "Diesel 4 thì, 1 xi lanh, phun trực tiếp DI",
      "Công suất tối đa": "12.0 HP / 2400 RPM",
      "Buồng đốt": "Phun trực tiếp (Direct Injection) đa điểm",
      "Dung tích xi lanh": "638 cc",
      "Hệ thống làm mát": "Két nước tuần hoàn quạt gió",
      "Trọng lượng": "102 kg",
      "Mức tiêu hao nhiên liệu": "Khoảng 1.1 Lít / giờ khi đủ tải",
      "Bảo hành": "24 Tháng chính hãng Yanmar"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Động cơ Yanmar TF120-DI nổi danh với công nghệ phun dầu trực tiếp Direct Injection mang lại khả năng khởi động nhạy bén ngay cả trong thời tiết sương lạnh miền sông nước. Piston hợp kim nhôm chịu nhiệt cao và xéc-măng mạ crôm cứng cáp cho tuổi thọ trên 10 năm hoạt động liên tục.",
    reviews: [
      { id: "r201", author: "Út Tâm", location: "Ngã Năm, Sóc Trăng", rating: 5, date: "3 ngày trước", title: "Cực kỳ tiết kiệm dầu", content: "Tôi gắn vô đầu bơm 114mm bơm nước chống mặn cho vuông tôm, chạy cả buổi sáng hết chừng lít rưỡi dầu. Máy nổ êm ít rung lắc.", helpful: 21, liked: false },
      { id: "r202", author: "Hoàng Nhân", location: "Châu Thành, An Giang", rating: 5, date: "1 tuần trước", title: "Quay tay rất nhẹ", content: "Có van giảm áp trợ lực nên chỉ cần gạt van quay 3 vòng buông tay là máy tự nổ giòn tan. Người già cũng tự quay nổ được.", helpful: 14, liked: false }
    ]
  },
  {
    id: 3,
    brand: "Kubota",
    model: "Kubota RT155 Plus DI Khởi Động Đề Điện (15.5 HP)",
    category: "engines",
    price: 29500000,
    badge: "ĐỀ ĐIỆN 1 CHẠM",
    badgeType: "green-badge",
    sku: "TD2-KUB-RT155DE",
    hp: "15.5 HP (Mã Lực)",
    rpm: "2,400 RPM",
    rating: 5.0,
    reviewsCount: 16,
    cooling: "Két nước nhôm tổ ong tản nhiệt lớn",
    starter: "Củ đề điện 12V 1 chạm + Ổ khóa Zin",
    displacement: "753 cc",
    weight: "122 kg",
    fuelTank: "11.5 Lít Diesel",
    bullets: [
      "Trang bị sẵn củ đề điện 12V đề phát nổ ngay, không cần quay tay cực nhọc",
      "Công suất khủng 15.5 HP, buồng đốt Direct Injection leo dốc tải nặng cực bốc",
      "Kèm bộ phát sạc ắc quy tự động sạc khi máy vận hành"
    ],
    specs: {
      "Hãng sản xuất": "Kubota Siam Thailand",
      "Model": "RT155 Plus DI E-Start",
      "Công suất": "15.5 HP / 2400 RPM",
      "Hệ thống khởi động": "Đề điện 12V có khóa an toàn + Tay quay dự phòng",
      "Dung tích xi lanh": "753 cc",
      "Bình ắc quy khuyến nghị": "12V 35Ah - 45Ah",
      "Trọng lượng": "122 kg",
      "Bảo hành": "24 Tháng (Bảo hành cả củ đề và động cơ)"
    },
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Phiên bản cao cấp nhất của Kubota RT Series: Kubota RT155 Plus DI được tích hợp sẵn hệ thống đề điện 12V bấm nút khởi động nhẹ nhàng, loại bỏ hoàn toàn nỗi vất vả khi quay tay lúc trời mưa bùn đất. Máy sở hữu công suất 15.5 mã lực dũng mãnh, chuyên trị các dòng máy xới tải nặng, máy cắt cỏ voi, bơm bùn cát và ghe tải lớn.",
    reviews: [
      { id: "r301", author: "Chú Sáu Rạng", location: "Hồng Dân, Bạc Liêu", rating: 5, date: "Hôm qua", title: "Có đề điện khỏe re, bấm cái là nổ", content: "Tuổi tôi ngoài 60 rồi quay tay máy lớn không nổi. Mua con RT155 đề điện của anh Tư Thành về bấm nút tạch phát nổ liền, kéo giàn xới ruộng sướng mê tơi.", helpful: 30, liked: false },
      { id: "r302", author: "Trần Minh Tấn", location: "Vị Thủy, Hậu Giang", rating: 5, date: "4 ngày trước", title: "Công suất thực sự quá mạnh", content: "Kéo đầu bơm 168mm tát cạn đầm tôm trong vòng 2 tiếng đồng hồ. Máy chạy êm, tiếng bô trầm ấm.", helpful: 17, liked: false }
    ]
  },
  {
    id: 4,
    brand: "Yanmar",
    model: "Yanmar TF160-DI Lực Kéo Tàu Ghe Cực Đại (16.0 HP)",
    category: "engines",
    price: 31200000,
    badge: "CHUYÊN TÀU GHE",
    badgeType: "gold-badge",
    sku: "TD2-YAN-TF160",
    hp: "16.0 HP (Mã Lực)",
    rpm: "2,400 RPM",
    rating: 4.9,
    reviewsCount: 13,
    cooling: "Két nước tuần hoàn quạt thổi gió mạnh",
    starter: "Quay tay trợ lực / Tùy chọn đề điện",
    displacement: "845 cc",
    weight: "135 kg",
    fuelTank: "12 Lít Diesel",
    bullets: [
      "Dung tích xi lanh cực lớn 845cc cho mô men xoắn khổng lồ ở dải tua thấp",
      "Vỏ bọc kim loại sơn tĩnh điện chống ăn mòn nước phèn, nước mặn",
      "Được giới vận tải sông nước miền Tây tôn vinh là cỗ máy tải bền bỉ nhất"
    ],
    specs: {
      "Hãng sản xuất": "Yanmar Corporation",
      "Model": "TF160-DI Marine & Heavy Duty",
      "Công suất cực đại": "16.0 HP / 2400 RPM",
      "Đường kính x Hành trình piston": "102 mm x 105 mm",
      "Dung tích xi lanh": "845 cc",
      "Loại nhiên liệu": "Dầu Diesel",
      "Trọng lượng": "135 kg",
      "Bảo hành": "24 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Yanmar TF160-DI sở hữu quả piston kích thước lớn 102mm tạo lực nén khủng khiếp, giúp kéo được chân vịt thau bước lớn cho tàu ghe chở 3-5 tấn hàng hóa di chuyển nhanh trên sông ngòi. Máy trang bị bơm dầu bôi trơn cao áp bảo vệ trục khuỷu và bạc dên tuyệt đối.",
    reviews: [
      { id: "r401", author: "Lê Văn Điền", location: "Cù Lao Dung, Sóc Trăng", rating: 5, date: "4 ngày trước", title: "Ghe chở dưa hấu chạy bốc vô cùng", content: "Tôi đi ghe chở dưa hấu bán chợ nổi Cái Răng, gắn máy này chạy ngược con nước xiết mà ghe vẫn lướt phom phom.", helpful: 19, liked: false }
    ]
  },
  {
    id: 5,
    brand: "Kubota",
    model: "Kubota RT125 Bốc Hơi / Két Nước Tiêu Chuẩn (12.5 HP)",
    category: "engines",
    price: 21900000,
    badge: "BỀN BỈ 10 NĂM",
    badgeType: "blue-badge",
    sku: "TD2-KUB-RT125",
    hp: "12.5 HP",
    rpm: "2,400 RPM",
    rating: 4.8,
    reviewsCount: 12,
    cooling: "Thùng nước bốc hơi hoặc két nước",
    starter: "Tay quay trợ lực giật nhẹ",
    displacement: "624 cc",
    weight: "98 kg",
    fuelTank: "10 Lít Diesel",
    bullets: [
      "Dòng máy nổ diesel quốc dân, phụ tùng thay thế đâu đâu cũng có sẵn",
      "Kết cấu cơ khí đơn giản, nồi đồng cối đá, dễ sửa chữa căn chỉnh",
      "Giá thành hợp lý, hoàn vốn siêu nhanh cho bà con làm mùa"
    ],
    specs: {
      "Hãng sản xuất": "Kubota Thailand",
      "Model": "RT125 Standard",
      "Công suất": "12.5 HP / 2400 RPM",
      "Dung tích xi lanh": "624 cc",
      "Trọng lượng": "98 kg",
      "Bảo hành": "24 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Động cơ Kubota RT125 là sự lựa chọn kinh tế nhất cho bà con cần máy nổ công suất từ 12.5 mã lực. Vận hành êm ái, bốc khói sạch, dễ bảo trì, linh kiện ron phốt có bán khắp mọi tiệm kim khí miền Tây.",
    reviews: [
      { id: "r501", author: "Hai Lúa Trà Vinh", location: "Càng Long, Trà Vinh", rating: 5, date: "1 tuần trước", title: "Máy chạy bền vô đối", content: "Dùng từ đời RT trước tới giờ đổi sang RT125 mới này máy nổ êm hơn hẳn, bớt rung lắc.", helpful: 12, liked: false }
    ]
  },
  {
    id: 6,
    brand: "John Deere",
    model: "John Deere Heavy Agri Power Unit Đa Dụng (22.0 HP)",
    category: "engines",
    price: 42000000,
    badge: "TIÊU CHUẨN MỸ",
    badgeType: "green-badge",
    sku: "TD2-JD-AGRI22",
    hp: "22.0 HP",
    rpm: "2,600 RPM",
    rating: 5.0,
    reviewsCount: 9,
    cooling: "Két nước đồng 3 hàng làm mát siêu tốc",
    starter: "Đề điện cao cấp chống nước IP67",
    displacement: "1,100 cc",
    weight: "165 kg",
    fuelTank: "15 Lít Diesel",
    bullets: [
      "Công nghệ động cơ John Deere USA danh tiếng, chịu tải nặng liên tục 24/7",
      "Két nước đồng 3 tầng tản nhiệt cao cấp, bơm nước lưu lượng cực lớn",
      "Chuyên dùng cho trạm bơm tưới vùng hạn mặn, kéo máy phát điện 10kVA"
    ],
    specs: {
      "Hãng sản xuất": "John Deere Power Systems",
      "Công suất": "22.0 HP / 2600 RPM",
      "Dung tích xi lanh": "1100 cc",
      "Hệ thống điện": "Củ đề 12V 1.8kW + Củ sạc 40A",
      "Trọng lượng": "165 kg",
      "Bảo hành": "36 Tháng chính hãng"
    },
    images: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Dòng động cơ công nghiệp chuyên dụng John Deere Heavy Agri mang công suất 22 mã lực đỉnh cao. Máy được chế tạo bằng gang cầu đúc nguyên khối chống va đập, vòng bi trục khuỷu tiêu chuẩn công nghiệp nặng, thích hợp cho các trang trại nuôi tôm thâm canh quy mô lớn chạy quạt nước thâu đêm suốt sáng.",
    reviews: [
      { id: "r601", author: "Trại Tôm Minh Phú", location: "Trần Đề, Sóc Trăng", rating: 5, date: "3 tuần trước", title: "Chạy quạt 12 cánh suốt đêm không hụt ga", content: "Tôi mua 2 cục John Deere 22HP của tiệm Tư Thành để chạy dàn quạt oxy cho 6 ao tôm. Máy chạy đều ga, không sợ tuột vòng tua, quá chất lượng!", helpful: 26, liked: false }
    ]
  },
  {
    id: 7,
    brand: "Vikyno",
    model: "Vikyno RV125-2 Két Nước Tuần Hoàn (12.5 HP)",
    category: "engines",
    price: 17500000,
    badge: "GIÁ BÌNH DÂN",
    badgeType: "blue-badge",
    sku: "TD2-VIK-RV125",
    hp: "12.5 HP",
    rpm: "2,200 RPM",
    rating: 4.7,
    reviewsCount: 10,
    cooling: "Két nước làm mát tuần hoàn",
    starter: "Quay tay trợ lực",
    displacement: "630 cc",
    weight: "105 kg",
    fuelTank: "10 Lít Diesel",
    bullets: [
      "Thương hiệu Vikyno liên doanh Yanmar công nghệ Nhật Bản",
      "Giá thành mềm hơn nhập khẩu nguyên kiện nhưng chất lượng rất bền",
      "Tiết kiệm chi phí đầu tư ban đầu cho các gia đình nông dân"
    ],
    specs: {
      "Hãng sản xuất": "Vikyno & Vinappro",
      "Model": "RV125-2",
      "Công suất": "12.5 HP / 2200 RPM",
      "Trọng lượng": "105 kg",
      "Bảo hành": "18 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Động cơ Diesel Vikyno RV125-2 được sản xuất theo dây chuyền công nghệ chuyển giao từ Yanmar Nhật Bản. Với tầm giá dưới 18 triệu đồng, đây là lựa chọn số một cho các nhu cầu bơm nước ruộng, kéo xuồng gia đình và chạy đầu phát điện dân dụng.",
    reviews: [
      { id: "r701", author: "Bảy Hùng", location: "Thạnh Trị, Sóc Trăng", rating: 5, date: "1 tháng trước", title: "Máy tốt giá rẻ", content: "Tiền ít mà muốn máy khỏe thì mua con Vikyno này là chuẩn bài. Kéo dàn xới 1 vụ là thu hồi đủ vốn.", helpful: 11, liked: false }
    ]
  },
  {
    id: 8,
    brand: "Thành Đạt 2",
    model: "Trọn Bộ Máy Xới Đất Đa Năng Thành Đạt 2 (Kèm Động Cơ RT140)",
    category: "tillers",
    price: 38500000,
    badge: "TRỌN BỘ SẴN DÙNG",
    badgeType: "gold-badge",
    sku: "TD2-TILL-FULL140",
    hp: "14.0 HP Kubota RT140",
    rpm: "Đầy đủ số tiến / lùi / đảo chiều",
    rating: 5.0,
    reviewsCount: 15,
    cooling: "Két nước",
    starter: "Hỗ trợ đề điện hoặc quay tay",
    weight: "245 kg trọn bộ",
    bullets: [
      "Bao gồm khung sườn máy xới cải tiến + Động cơ Kubota RT140 xịn + Dàn phay đất 18 dao",
      "Càng lái trợ lực, chuyển hướng nhẹ tênh, bánh lồng chống lầy lội cực tốt",
      "Có ghế ngồi lái phía sau cho bà con đỡ mỏi chân khi làm đồng cả ngày"
    ],
    specs: {
      "Cấu hình": "Khung sườn Thành Đạt 2 + Máy nổ Kubota RT140 Plus",
      "Bề rộng phay đất": "850 mm - 1100 mm",
      "Độ sâu phay đất": "150 mm - 250 mm",
      "Hộp số": "6 số tiến, 2 số lùi, có khóa vi sai chống lật",
      "Phụ kiện tặng kèm": "1 Cặp bánh lồng sắt + 1 Cặp bánh cao su di chuyển + 1 Dàn dao xới 18 lưỡi hợp kim",
      "Bảo hành": "24 Tháng toàn bộ máy và khung sườn"
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Bộ máy xới đất 2 bánh cải tiến Thành Đạt 2 là vũ khí đắc lực cho bà con làm lúa vụ đông xuân và hè thu tại đồng bằng sông Cửu Long. Khung sườn làm bằng thép ống dày dặn, hộp số bạc đạn ngâm dầu chống cát bụi tuyệt đối. Động cơ Kubota RT140 kéo phay đất tơi xốp, cắt gốc rạ nhẹ nhàng.",
    reviews: [
      { id: "r801", author: "Anh Tám Ruộng", location: "Châu Thành, Sóc Trăng", rating: 5, date: "2 ngày trước", title: "Xới đất ướt không hề bị lún bùn", content: "Ruộng trũng miền Tây sợ nhất máy lún lầy. Cặp bánh lồng tiệm Thành Đạt gắn bản to đi phăng phăng. Xới 1 công đất mất có 25 phút.", helpful: 28, liked: false }
    ]
  },
  {
    id: 9,
    brand: "Thành Đạt 2",
    model: "Khung Cày & Dàn Xới 2 Bánh Bạc Đạn Đôi Cải Tiến (Chưa Máy)",
    category: "tillers",
    price: 14500000,
    badge: "KHUNG THÉP DÀY",
    badgeType: "blue-badge",
    sku: "TD2-FRAME-PRO",
    hp: "Lắp máy từ 10 - 18 HP",
    rating: 4.8,
    reviewsCount: 8,
    weight: "130 kg",
    bullets: [
      "Khung sườn thép đặc chịu lực dập nguyên khối chống cong vênh",
      "Cốt láp và bạc đạn đôi Nhật bãi chịu tải nặng, bốt tay lái đảo hướng 1 chạm",
      "Bệ máy khoan sẵn lỗ ren tiêu chuẩn bắt vừa mọi dòng Kubota RT, Yanmar TF, Vikyno"
    ],
    specs: {
      "Hãng chế tạo": "Xưởng Cơ Khí Thành Đạt 2 (Sóc Trăng)",
      "Khả năng tương thích": "Kubota RT100 - RT160, Yanmar TF105 - TF160, Vikyno RV125 - RV165",
      "Hệ truyền động": "Dây curoa 3 rãnh bản B + Hộp xích đôi ngâm dầu",
      "Bảo hành": "36 Tháng cho khung sườn và hộp số"
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Dành riêng cho bà con đã có sẵn đầu nổ diesel ở nhà và muốn đóng mới dàn xới đất. Khung sườn cải tiến 2026 của Nông Cơ Thành Đạt 2 được hạ trọng tâm giúp máy không bị chao đảo khi đi vào luống cày gồ ghề.",
    reviews: [
      { id: "r901", author: "Khánh Vĩnh", location: "Gò Quao, Kiên Giang", rating: 5, date: "1 tuần trước", title: "Khung rất cứng cáp", content: "Thép dày hàn mí rất ngấu, bắt con máy Yanmar 12HP cũ vô khít rịt nổ không rung máy.", helpful: 14, liked: false }
    ]
  },
  {
    id: 10,
    brand: "Kubota/Thành Đạt",
    model: "Trọn Bộ Máy Bơm Nước Đầu Nổ Diesel Ống 114mm (120 m³/h)",
    category: "pumps",
    price: 28900000,
    badge: "LƯU LƯỢNG KHỦNG",
    badgeType: "gold-badge",
    sku: "TD2-PUMP-114",
    hp: "12.5 HP Kubota RT125",
    capacity: "120 - 150 m³/giờ",
    rating: 4.9,
    reviewsCount: 13,
    cooling: "Két nước",
    bullets: [
      "Lưu lượng nước khổng lồ 120-150 khối/giờ, chống hạn cứu úng cực nhanh",
      "Đầu bơm gang cánh đồng đúc áp lực cao, hút sâu 8m đẩy xa 500m",
      "Gác sẵn bệ sắt chữ U có 4 bánh xe đẩy di chuyển trên bờ đê tiện lợi"
    ],
    specs: {
      "Động cơ": "Kubota RT125 chính hãng Thái Lan",
      "Đầu bơm": "Bơm áp lực cao họng hút xả 114mm",
      "Lưu lượng": "120 - 150 m³/h",
      "Cột áp": "Đẩy cao 15-20 mét, đẩy xa 300 - 500 mét",
      "Bảo hành": "24 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Bộ máy bơm nước lưu lượng lớn chuyên dùng cho hợp tác xã nông nghiệp, cánh đồng mẫu lớn và vuông nuôi tôm công nghiệp. Động cơ kéo trực tiếp qua puli bản B truyền lực 100%, không bị tuột đai.",
    reviews: [
      { id: "r1001", author: "Hợp Tác Xã Mỹ Tú", location: "Mỹ Tú, Sóc Trăng", rating: 5, date: "5 ngày trước", title: "Nước xả như thác chảy", content: "Ống 114 xả nước căng đét, bơm cả bờ bao chỉ cần nửa ngày là tràn bờ.", helpful: 16, liked: false }
    ]
  },
  {
    id: 11,
    brand: "Thành Đạt 2",
    model: "Đầu Bơm Cát & Bơm Bùn Cánh Hở Hợp Kim Gang Đúc Họng 100mm",
    category: "pumps",
    price: 6800000,
    badge: "CÁNH HỞ CHỐNG NGHẸT",
    badgeType: "blue-badge",
    sku: "TD2-PUMP-SAND100",
    rating: 4.8,
    reviewsCount: 9,
    bullets: [
      "Cánh quạt bơm thiết kế cánh hở bán nguyệt không bị nghẹt rác rơm hay sỏi đá",
      "Thân bơm đúc bằng gang hợp kim mạ crom chịu mài mòn cực tốt",
      "Chuyên vét mương vườn dừa, hút bùn đáy ao tôm, san lấp cát mặt bằng"
    ],
    specs: {
      "Chất liệu thân bơm": "Gang hợp kim đúc dày 12mm",
      "Cánh bơm": "Cánh hở 3 lá hợp kim chống mòn",
      "Họng hút xả": "100 mm (Gắn ống mềm gân kẽm)",
      "Công suất máy kéo khuyến nghị": "Động cơ diesel từ 12 HP trở lên",
      "Bảo hành": "12 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Đầu bơm bùn cát chuyên dụng Thành Đạt 2 giải quyết triệt để vấn đề hút bùn quánh đáy ao nuôi trồng thủy sản. Bạc đạn nhúng trong buồng nhớt khép kín ngăn chặn nước mặn và bùn cát lọt vào phá hỏng trục.",
    reviews: [
      { id: "r1101", author: "Trọng Nghĩa", location: "Cần Giuộc, Long An", rating: 5, date: "2 tuần trước", title: "Vét bùn mương vườn rất ưng", content: "Hút sình non và rễ cỏ trơn tru không hề kẹt cánh bơm.", helpful: 10, liked: false }
    ]
  },
  {
    id: 12,
    brand: "Thành Đạt 2",
    model: "Bộ Dàn Láp Đuôi Tôm Inox 304 Bạc Đạn Nhúng Dầu Dài 3.8m",
    category: "marine",
    price: 4200000,
    badge: "INOX 304 NƯỚC MẶN",
    badgeType: "green-badge",
    sku: "TD2-LAP-38M",
    rating: 5.0,
    reviewsCount: 17,
    bullets: [
      "Toàn bộ vỏ ống và trục cốt láp làm từ Inox 304 không hít nam châm, chống rỉ sét nước mặn",
      "Hệ thống bạc đạn đũa nhúng dầu chống nước 3 tầng phốt cơ khí",
      "Chạy êm ái, giảm rung lắc đuôi ghe xuồng tối đa ở dải tua máy cao"
    ],
    specs: {
      "Chiều dài láp": "3.8 Mét (Có tùy chọn 4.2m và 4.5m)",
      "Đường kính cốt": "Cốt 22mm hoặc 25mm tiện ren chuẩn",
      "Chất liệu": "Inox SUS304 không gỉ",
      "Gối đỡ máy": "Khớp nối mềm cao su chịu xoắn",
      "Bảo hành": "24 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Dàn láp đuôi tôm Thành Đạt 2 là sản phẩm độc quyền được gia công tỉ mỉ bằng máy tiện CNC. Phốt chặn nước nhập khẩu chịu nhiệt cao giữ cho buồng dầu luôn sạch sẽ, giúp cốt láp quay nhẹ nhàng tăng thêm 20% tốc độ cho vỏ lãi.",
    reviews: [
      { id: "r1201", author: "Tài Vỏ Lãi", location: "Năm Căn, Cà Mau", rating: 5, date: "3 ngày trước", title: "Láp rất êm không hú", content: "Lắp vô con máy Kubota 14HP chạy ra biển đánh cá nước mặn cả tháng nay mà cốt vẫn sáng bóng không bị rỗ sét.", helpful: 22, liked: false }
    ]
  },
  {
    id: 13,
    brand: "Thành Đạt 2",
    model: "Chân Vịt Tốc Độ Đua Vỏ Lãi Inox 304 & Thau Đúc CNC",
    category: "marine",
    price: 1250000,
    badge: "XÉ NƯỚC CỰC BỐC",
    badgeType: "gold-badge",
    sku: "TD2-PROP-SPEED",
    rating: 4.9,
    reviewsCount: 14,
    bullets: [
      "Thiết kế 2 lá bản xẻ nước thủy động học tối ưu cho ghe xuồng miền Tây",
      "Được cân bằng động điện tử triệt tiêu rung giật tay lái khi chạy hết ga",
      "Đầy đủ kích cỡ bước ren cho cốt 19mm, 22mm, 25mm"
    ],
    specs: {
      "Chất liệu": "Hợp kim Thau Đúc hoặc Inox 304 đúc nguyên khối",
      "Đường kính cánh": "220 mm - 280 mm",
      "Cỡ cốt tương thích": "Cốt 22mm hoặc 25mm côn tiêu chuẩn",
      "Đặc tính": "Cắt rong rêu, bốc đầu lướt sóng nhanh"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Chân vịt tốc độ Thành Đạt 2 được nghiên cứu riêng cho dòng sông rạch nhiều lục bình của miền Tây sông nước. Góc nghiêng lá chân vịt được vát bén giúp thoát nước tức thì và dễ dàng cắt đứt rơm rạ vướng víu.",
    reviews: [
      { id: "r1301", author: "Bình Ca Nô", location: "Phụng Hiệp, Hậu Giang", rating: 5, date: "1 tuần trước", title: "Cầm lái nhẹ tênh", content: "Chạy tốc độ cao mà tay lái không bị ghì hay vặn sang một bên, bo cua rất ngọt.", helpful: 15, liked: false }
    ]
  },
  {
    id: 14,
    brand: "Thành Đạt / Yanmar",
    model: "Máy Phát Điện Diesel Nông Nghiệp 7.5kVA Cách Âm Chống Ồn",
    category: "generators",
    price: 34500000,
    badge: "CÁCH ÂM SIÊU ÊM",
    badgeType: "green-badge",
    sku: "TD2-GEN-75KVA",
    hp: "Động cơ diesel 14 HP",
    capacity: "7.5 kVA - Điện áp 220V",
    rating: 4.9,
    reviewsCount: 11,
    bullets: [
      "Vỏ thùng cách âm phủ mút tiêu âm cao cấp, đứng cách 5 mét êm ru",
      "Củ phát dây đồng 100% chịu tải khởi động mô tơ quạt ao tôm và máy lạnh",
      "Tự động ngắt điện khi quá tải hoặc hụt áp bảo vệ thiết bị điện tử gia đình"
    ],
    specs: {
      "Công suất liên tục": "7.0 kVA / 220V 50Hz",
      "Công suất cực đại": "7.5 kVA",
      "Động cơ": "Diesel 1 xi lanh 4 thì làm mát két nước",
      "Hệ thống khởi động": "Đề điện 12V 1 chạm có sạc tự động",
      "Độ ồn": "Chỉ 68 dB ở khoảng cách 7m",
      "Bảo hành": "24 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Cứu cánh không thể thiếu cho các trang trại nuôi tôm mùa cao điểm tránh sự cố mất điện lưới. Máy phát điện diesel Thành Đạt 7.5kVA tiêu thụ chỉ 1.2 lít dầu/giờ, vận hành bền bỉ nhiều ngày đêm liền.",
    reviews: [
      { id: "r1401", author: "Hợp Tác Xã Thủy Sản Bến Tre", location: "Ba Tri, Bến Tre", rating: 5, date: "4 ngày trước", title: "Cứu cả vuông tôm mùa mưa bão", content: "Cúp điện lúc nửa đêm, bấm nút đề phát nổ liền cấp điện cho 8 giàn quạt nước, sáng ra tôm vẫn khỏe re.", helpful: 18, liked: false }
    ]
  },
  {
    id: 15,
    brand: "Thành Đạt 2",
    model: "Bộ Nâng Cấp Khởi Động Đề Điện 12V 1 Chạm (Cho Kubota RT/Yanmar TF)",
    category: "parts",
    price: 3800000,
    badge: "KHÔNG CẦN QUAY TAY",
    badgeType: "gold-badge",
    sku: "TD2-KIT-ESTART",
    rating: 5.0,
    reviewsCount: 22,
    bullets: [
      "Trọn bộ gồm củ đề Nhật bãi xịn, vành răng bánh đà đúc chính xác, pát nhôm, ổ khóa",
      "Lắp vừa khít 100% cho các dòng máy Kubota RT120-160 và Yanmar TF105-160",
      "Chỉ cần bấm chìa khóa là máy nổ ngay, phụ nữ hay người lớn tuổi đều tự nổ máy được"
    ],
    specs: {
      "Điện áp hoạt động": "12V DC",
      "Củ đề": "Motor giảm tốc mô-men xoắn cao công nghệ Nhật",
      "Vành răng": "Thép nhiệt luyện tôi cao tần chống mòn răng",
      "Bộ dây & Rơ-le": "Dây đồng nguyên chất bọc gen chịu nhiệt",
      "Bảo hành": "12 Tháng đổi mới"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Giải pháp tuyệt vời biến máy nổ diesel quay tay truyền thống thành máy nổ đề điện hiện đại chỉ trong 30 phút lắp ráp. Đầy đủ phụ kiện ốc tán, pát định tâm và sơ đồ đấu nối dây điện đi kèm.",
    reviews: [
      { id: "r1501", author: "Bác Bảy Nghĩa", location: "Kế Sách, Sóc Trăng", rating: 5, date: "Hôm qua", title: "Bộ đề này quá đáng tiền", content: "Tôi gắn vô con máy Kubota 125 cũ ở nhà, giờ vợ tôi ra mở máy bơm nước tưới vườn chỉ cần vặn khóa là xong, không phải nhờ vả ai quay tay nữa.", helpful: 35, liked: false }
    ]
  },
  {
    id: 16,
    brand: "Kubota Thái Lan",
    model: "Bộ Hơi Piston Bạc, Áo Xi-Lanh & Kim Phun Kubota RT140 Chính Hãng",
    category: "parts",
    price: 2150000,
    badge: "CHÍNH HÃNG 100%",
    badgeType: "blue-badge",
    sku: "TD2-PART-PISTON140",
    rating: 4.9,
    reviewsCount: 16,
    bullets: [
      "Hàng chính hãng Kubota Siam có tem chống hàng giả 7 màu",
      "Piston hợp kim nhôm đúc phủ lớp chống bó kẹt xéc măng",
      "Kim phun cao áp căn chỉnh sẵn tia phun sương tơi xốp"
    ],
    specs: {
      "Quy cách": "Trọn bộ gồm 1 Quả Piston + Bộ Bạc Xéc Măng + 1 Ống Áo Xi Lanh + 1 Béc Phun",
      "Xuất xứ": "Made in Thailand",
      "Độ chuẩn": "Cốt 0 tiêu chuẩn nhà máy",
      "Bảo hành": "12 Tháng"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Bộ hơi chính hãng Kubota Thái Lan giúp phục hồi 100% công suất cho động cơ sau nhiều năm cày ải. Máy sau khi vô bộ hơi mới nổ giòn tan, hết sạch khói đen và tiết kiệm dầu như lúc mới đập thùng.",
    reviews: [
      { id: "r1601", author: "Thợ Máy Minh Tiến", location: "Long Mỹ, Hậu Giang", rating: 5, date: "3 ngày trước", title: "Thợ máy chuyên nghiệp tin dùng", content: "Làm máy cho khách tôi toàn lấy phụ tùng bên anh Tư Thành. Hàng chuẩn Thái, khe hở xéc măng chuẩn đét không cần mài dũa.", helpful: 20, liked: false }
    ]
  }
];

// Custom Reviews State (stored locally)
function loadCustomReviews() {
  try {
    const saved = localStorage.getItem("thanhdat_custom_reviews");
    if (saved) {
      const customReviews = JSON.parse(saved);
      customReviews.forEach(rev => {
        const prod = PRODUCTS_DATA.find(p => p.id === rev.productId);
        if (prod && !prod.reviews.some(r => r.id === rev.id)) {
          prod.reviews.unshift(rev);
          prod.reviewsCount = prod.reviews.length;
        }
      });
    }
  } catch (e) {
    console.warn("Could not load custom reviews:", e);
  }
}

function saveCustomReview(reviewObj) {
  try {
    const saved = localStorage.getItem("thanhdat_custom_reviews");
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(reviewObj);
    localStorage.setItem("thanhdat_custom_reviews", JSON.stringify(list));
  } catch (e) {
    console.error("Could not save custom review:", e);
  }
}

// Shopping Cart State
let cart = [];

function loadCart() {
  try {
    const saved = localStorage.getItem("thanhdat_cart");
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("thanhdat_cart", JSON.stringify(cart));
  } catch (e) {}
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const badge = document.getElementById("cartCountNumber");
  if (!badge) return;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "inline-flex" : "none";
}

// Filtering & Search
let currentCategory = "all";
let currentHpFilter = "all";
let searchQuery = "";
let currentSort = "default";

function getFilteredAndSortedProducts() {
  let list = PRODUCTS_DATA.filter(item => {
    // Category match
    if (currentCategory !== "all" && item.category !== currentCategory) return false;
    
    // Horsepower filter match
    if (currentHpFilter !== "all") {
      const hpNum = parseFloat(item.hp) || 0;
      if (currentHpFilter === "under12" && hpNum >= 12) return false;
      if (currentHpFilter === "12to14" && (hpNum < 12 || hpNum > 14)) return false;
      if (currentHpFilter === "15plus" && hpNum < 15) return false;
    }

    // Search query match
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = item.model.toLowerCase().includes(q);
      const matchBrand = item.brand.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchBullets = item.bullets && item.bullets.some(b => b.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchCategory && !matchBullets) return false;
    }
    return true;
  });

  // Sorting
  if (currentSort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating-desc") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === "hp-desc") {
    list.sort((a, b) => (parseFloat(b.hp) || 0) - (parseFloat(a.hp) || 0));
  }

  return list;
}

function renderCatalog() {
  const container = document.getElementById("catalogGrid");
  const countEl = document.getElementById("toolbarCountNum");
  if (!container) return;

  const filtered = getFilteredAndSortedProducts();
  if (countEl) countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-catalog-state">
        <div class="empty-icon">🔍</div>
        <h3>Không tìm thấy thiết bị phù hợp</h3>
        <p>Vui lòng thử tìm từ khóa khác như "Kubota", "Yanmar", "RT140", "đề điện", hoặc gọi ngay Hotline <b>0918 453 476</b> để được nhân viên hỗ trợ.</p>
        <button class="reset-filter-btn" onclick="resetFilters()">Xem Tất Cả Máy</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const cardQty = getCardQty(item.id);
    const bulletsHtml = (item.bullets || []).slice(0, 2)
      .map(b => `<li><span class="bullet-check">✓</span> ${b}</li>`)
      .join("");

    return `
      <div class="machinery-card" data-id="${item.id}">
        <div class="card-image-wrap" onclick="openDetailsModal(${item.id})">
          <img src="${item.images[0]}" alt="${item.model}" loading="lazy" class="card-thumb" onerror="this.src='images/hero_machinery.svg'" />
          <span class="card-badge ${item.badgeType}">${item.badge}</span>
          ${item.hp ? `<span class="card-hp-badge">⚡ ${item.hp}</span>` : ''}
        </div>

        <div class="card-content">
          <div class="card-brand-meta">
            <span class="card-brand">${item.brand}</span>
            <span class="card-rating">⭐ ${item.rating} (${item.reviewsCount})</span>
          </div>

          <h3 class="card-title" onclick="openDetailsModal(${item.id})">${item.model}</h3>

          <ul class="card-bullets">
            ${bulletsHtml}
          </ul>

          <div class="card-specs-row">
            ${item.cooling ? `<span class="spec-pill">💧 ${item.cooling.split(' ')[0]} ${item.cooling.split(' ')[1] || ''}</span>` : ''}
            ${item.starter ? `<span class="spec-pill">🔑 ${item.starter.includes('Đề') ? 'Có đề điện' : 'Quay tay'}</span>` : ''}
          </div>

          <div class="card-price-action">
            <div class="card-price-block">
              <span class="price-label">Giá phân phối:</span>
              <span class="card-price">${formatMoney(item.price)}</span>
            </div>

            <div class="card-actions">
              <div class="card-qty-stepper">
                <button class="qty-btn minus" onclick="stepCardQty(${item.id}, -1)">−</button>
                <span class="card-qty-val" id="cardQty-${item.id}">${cardQty}</span>
                <button class="qty-btn plus" onclick="stepCardQty(${item.id}, 1)">+</button>
              </div>

              <button class="add-to-cart-btn" onclick="addCardQtyToCart(${item.id})">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span>CHỌN MUA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// In-card quantity tracker
const cardQuantities = {};

function getCardQty(id) {
  return cardQuantities[id] || 1;
}

function stepCardQty(id, delta) {
  let val = cardQuantities[id] || 1;
  val = Math.max(1, Math.min(20, val + delta));
  cardQuantities[id] = val;
  const el = document.getElementById(`cardQty-${id}`);
  if (el) el.textContent = val;
}

function addCardQtyToCart(id) {
  const prod = PRODUCTS_DATA.find(p => p.id === id);
  if (!prod) return;
  const qty = getCardQty(id);

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: prod.id,
      name: prod.model,
      brand: prod.brand,
      price: prod.price,
      image: prod.images[0],
      hp: prod.hp,
      specs: prod.cooling + " | " + prod.starter,
      quantity: qty
    });
  }

  saveCart();
  triggerToast(`Đã thêm ${qty} máy "${prod.model}" vào giỏ hàng!`);
  openCart();
}

function resetFilters() {
  currentCategory = "all";
  currentHpFilter = "all";
  searchQuery = "";
  currentSort = "default";

  document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
  const allChip = document.querySelector('.cat-chip[data-cat="all"]');
  if (allChip) allChip.classList.add("active");

  const searchInput = document.getElementById("machinerySearchInput");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("catalogSortSelect");
  if (sortSelect) sortSelect.value = "default";

  renderCatalog();
}

// ==========================================================================
// CART DRAWER OPERATIONS
// ==========================================================================
function openCart() {
  const overlay = document.getElementById("cartOverlay");
  if (overlay) overlay.classList.add("active");
  renderCartDrawer();
}

function closeCart() {
  const overlay = document.getElementById("cartOverlay");
  if (overlay) overlay.classList.remove("active");
}

function renderCartDrawer() {
  const list = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotalDisplay");
  const totalEl = document.getElementById("cartTotalDisplay");
  const checkoutBtn = document.getElementById("proceedCheckoutBtn");

  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="empty-cart-view">
        <div style="font-size: 40px; margin-bottom: 12px;">🛒</div>
        <h4>Giỏ hàng của bạn đang trống</h4>
        <p>Chọn các loại động cơ diesel Kubota, Yanmar, dàn xới hoặc phụ tùng để đặt hàng vận chuyển.</p>
        <button class="browse-btn" onclick="closeCart()">Tiếp Tục Xem Máy</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatMoney(0);
    if (totalEl) totalEl.textContent = formatMoney(0);
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  let subtotal = 0;
  list.innerHTML = cart.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-line-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='images/hero_machinery.svg'" />
        <div class="cart-item-details">
          <div class="cart-item-brand">${item.brand}</div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatMoney(item.price)}</div>
          <div class="cart-item-specs">${item.hp || ''}</div>

          <div class="cart-item-controls">
            <div class="cart-qty-box">
              <button onclick="modifyCartQty(${idx}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="modifyCartQty(${idx}, 1)">+</button>
            </div>
            <button class="remove-cart-item-btn" onclick="removeCartItem(${idx})">Xóa</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Shipping is Free for orders over 20M VND in Mekong Delta, else 300,000 VND
  const shippingFee = (subtotal >= 20000000 || subtotal === 0) ? 0 : 300000;
  const total = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (totalEl) totalEl.textContent = formatMoney(total);

  const shippingNote = document.getElementById("shippingNoticeText");
  if (shippingNote) {
    if (subtotal >= 20000000) {
      shippingNote.innerHTML = `✅ <b>Miễn phí vận chuyển chành xe</b> cho đơn hàng trên 20 triệu!`;
    } else {
      shippingNote.innerHTML = `Thêm máy để nhận <b>Miễn phí cước chành xe miền Tây</b>!`;
    }
  }
}

function modifyCartQty(idx, delta) {
  if (!cart[idx]) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) {
    cart.splice(idx, 1);
  }
  saveCart();
}

function removeCartItem(idx) {
  if (!cart[idx]) return;
  cart.splice(idx, 1);
  saveCart();
}

// ==========================================================================
// CHECKOUT MODAL & ORDER PLACEMENT
// ==========================================================================
function openCheckoutModal() {
  if (cart.length === 0) return;
  closeCart();
  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.classList.add("active");
    renderCheckoutSummary();
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");
}

function renderCheckoutSummary() {
  const container = document.getElementById("checkoutOrderReviewList");
  const subtotalEl = document.getElementById("checkoutSubtotalVal");
  const shippingEl = document.getElementById("checkoutShippingVal");
  const totalEl = document.getElementById("checkoutTotalVal");
  const qrTotalEl = document.getElementById("qrTotalDisplay");

  if (!container) return;

  let subtotal = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="checkout-review-row">
        <div class="review-name">
          <b>${item.name}</b> × ${item.quantity}
          <div class="review-meta">${item.hp || ''}</div>
        </div>
        <div class="review-price">${formatMoney(itemTotal)}</div>
      </div>
    `;
  }).join("");

  const shippingFee = (subtotal >= 20000000 || subtotal === 0) ? 0 : 300000;
  const total = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (shippingEl) shippingEl.textContent = shippingFee === 0 ? "Miễn Phí Vận Chuyển" : formatMoney(shippingFee);
  if (totalEl) totalEl.textContent = formatMoney(total);
  if (qrTotalEl) qrTotalEl.textContent = formatMoney(total);
}

// Handle Order Form Submission
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("custName");
  const phoneInput = document.getElementById("custPhone");
  const emailInput = document.getElementById("custEmail");
  const streetInput = document.getElementById("custStreet");
  const districtInput = document.getElementById("custDistrict");
  const provinceInput = document.getElementById("custProvince");
  const notesInput = document.getElementById("custNotes");
  const speedSelect = document.getElementById("deliverySpeedSelect");
  const paymentSelect = document.querySelector('input[name="paymentMethod"]:checked');
  const submitBtn = document.getElementById("placeOrderSubmitBtn");

  if (!nameInput || !phoneInput || !streetInput) return;

  const customerName = nameInput.value.trim();
  const customerPhone = phoneInput.value.trim();
  const customerEmail = emailInput ? emailInput.value.trim() : "";
  const customerAddress = streetInput.value.trim();
  const customerDistrict = districtInput ? districtInput.value.trim() : "";
  const customerProvince = provinceInput ? provinceInput.value : "Sóc Trăng";
  const customerNotes = notesInput ? notesInput.value.trim() : "";
  const deliverySpeed = speedSelect ? speedSelect.value : "Chành Xe Miền Tây Tiêu Chuẩn";
  const paymentMethod = paymentSelect ? paymentSelect.value : "COD (Nhận Máy Thử Xong Mới Trả Tiền)";

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Vui lòng điền đầy đủ Họ Tên, Số Điện Thoại và Địa Chỉ nhận máy!");
    return;
  }

  // Calculate financials
  let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let shipping = (subtotal >= 20000000 || subtotal === 0) ? 0 : 300000;
  let total = subtotal + shipping;

  const orderId = "TD-" + Math.floor(100000 + Math.random() * 900000);
  const trackingCode = "TD2-CHANH-" + orderId.slice(-4);

  const orderData = {
    id: orderId,
    order_number: orderId,
    trackingCode: trackingCode,
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerDistrict,
    customerProvince,
    customerNotes,
    deliverySpeed,
    paymentMethod,
    items: [...cart],
    subtotal,
    shipping,
    total,
    status: "Chờ Xác Nhận",
    createdAt: new Date().toISOString()
  };

  // UI Loading State
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Đang ghi nhận đơn hàng...</span>`;
  }

  // 1. Save Locally
  saveUserOrderLocally(orderData);

  // 2. Persist to Supabase Database
  try {
    const payload = {
      order_number: orderId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      delivery_street: customerAddress,
      delivery_district: customerDistrict,
      delivery_province: customerProvince,
      delivery_notes: customerNotes,
      delivery_speed: deliverySpeed,
      payment_method: paymentMethod,
      items: cart,
      subtotal: subtotal,
      shipping_fee: shipping,
      total: total,
      status: "Chờ Xác Nhận"
    };

    // Try primary table, then fallback
    await fetch(`${SUPABASE_URL}/rest/v1/thanhdat_machinery_orders`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    }).catch(async () => {
      // Fallback to legacy orders table if created earlier
      await fetch(`${SUPABASE_URL}/rest/v1/toronto_wellness_orders`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          order_number: orderId,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail || "khach@thanhdat.vn",
          delivery_street: customerAddress,
          delivery_unit: customerDistrict,
          delivery_postal: customerProvince,
          delivery_notes: customerNotes,
          delivery_speed: deliverySpeed,
          payment_method: paymentMethod,
          items: cart,
          subtotal: subtotal,
          tax: 0,
          total: total,
          status: "Confirmed"
        })
      }).catch(err => console.warn("Supabase background sync:", err));
    });
  } catch (err) {
    console.warn("Supabase network sync skipped:", err);
  }

  // 3. Dispatch Telegram alert & Customer confirmation email via /api/notify
  try {
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "order",
        order: orderData
      })
    }).catch(e => console.warn("Notify API error:", e));
  } catch (e) {}

  // Reset cart & close checkout
  cart = [];
  saveCart();
  closeCheckoutModal();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>XÁC NHẬN ĐẶT MUA MÁY</span>`;
  }

  // Show Order Success Modal
  showOrderSuccessModal(orderData);
}

function saveUserOrderLocally(order) {
  try {
    const key = "thanhdat_user_orders";
    const existing = localStorage.getItem(key);
    const list = existing ? JSON.parse(existing) : [];
    // remove duplicate if exists
    const filtered = list.filter(o => o.id !== order.id && o.order_number !== order.order_number);
    filtered.unshift(order);
    localStorage.setItem(key, JSON.stringify(filtered));
  } catch (e) {}
}

function showOrderSuccessModal(order) {
  const modal = document.getElementById("orderSuccessModal");
  if (!modal) return;

  const idEl = document.getElementById("successOrderId");
  const nameEl = document.getElementById("successCustName");
  const phoneEl = document.getElementById("successCustPhone");
  const totalEl = document.getElementById("successTotalAmount");
  const trackCodeEl = document.getElementById("successTrackingCode");

  if (idEl) idEl.textContent = "#" + order.id;
  if (nameEl) nameEl.textContent = order.customerName;
  if (phoneEl) phoneEl.textContent = order.customerPhone;
  if (totalEl) totalEl.textContent = formatMoney(order.total);
  if (trackCodeEl) trackCodeEl.textContent = order.trackingCode;

  modal.classList.add("active");
}

function closeSuccessModal() {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) modal.classList.remove("active");
}

// ==========================================================================
// DETAILS MODAL & REVIEWS
// ==========================================================================
let currentDetailProduct = null;

function openDetailsModal(id) {
  const prod = PRODUCTS_DATA.find(p => p.id === id);
  if (!prod) return;
  currentDetailProduct = prod;

  const modal = document.getElementById("detailsModal");
  if (!modal) return;

  // Title & Badges
  document.getElementById("detailModalTitle").textContent = prod.model;
  document.getElementById("detailBrandName").textContent = prod.brand;
  document.getElementById("detailPriceDisplay").textContent = formatMoney(prod.price);
  document.getElementById("detailHpPill").textContent = prod.hp || "Nông Cơ Chính Hãng";

  // Main Image & Gallery Thumbnails
  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) {
    mainImg.src = prod.images[0];
    mainImg.onerror = () => { mainImg.src = "images/hero_machinery.svg"; };
  }

  const thumbContainer = document.getElementById("detailGalleryThumbs");
  if (thumbContainer) {
    thumbContainer.innerHTML = prod.images.map((imgUrl, i) => `
      <img 
        src="${imgUrl}" 
        alt="${prod.model} thumb ${i+1}" 
        class="detail-thumb-img ${i === 0 ? 'active' : ''}" 
        onclick="switchDetailImage('${imgUrl}', this)"
        onerror="this.src='images/hero_machinery.svg'"
      />
    `).join("");
  }

  // Description
  const descEl = document.getElementById("detailDescText");
  if (descEl) descEl.textContent = prod.description;

  // Bullets
  const bulletsEl = document.getElementById("detailBulletsList");
  if (bulletsEl) {
    bulletsEl.innerHTML = (prod.bullets || []).map(b => `<li><span class="bullet-check">✓</span> ${b}</li>`).join("");
  }

  // Specifications Table
  const specsTbody = document.getElementById("detailSpecsTbody");
  if (specsTbody) {
    const entries = Object.entries(prod.specs || {});
    specsTbody.innerHTML = entries.map(([k, v]) => `
      <tr>
        <td class="spec-k">${k}</td>
        <td class="spec-v">${v}</td>
      </tr>
    `).join("");
  }

  // Reviews List
  renderDetailReviews(prod);

  // Stepper Reset
  const detailQtyVal = document.getElementById("detailQtyVal");
  if (detailQtyVal) detailQtyVal.textContent = "1";

  modal.classList.add("active");
}

function switchDetailImage(url, el) {
  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) mainImg.src = url;

  document.querySelectorAll(".detail-thumb-img").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");
}

function stepDetailQty(delta) {
  const valEl = document.getElementById("detailQtyVal");
  if (!valEl) return;
  let val = parseInt(valEl.textContent) || 1;
  val = Math.max(1, Math.min(20, val + delta));
  valEl.textContent = val;
}

function addDetailProductToCart() {
  if (!currentDetailProduct) return;
  const valEl = document.getElementById("detailQtyVal");
  const qty = valEl ? parseInt(valEl.textContent) : 1;

  const existing = cart.find(i => i.id === currentDetailProduct.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: currentDetailProduct.id,
      name: currentDetailProduct.model,
      brand: currentDetailProduct.brand,
      price: currentDetailProduct.price,
      image: currentDetailProduct.images[0],
      hp: currentDetailProduct.hp,
      specs: currentDetailProduct.cooling + " | " + currentDetailProduct.starter,
      quantity: qty
    });
  }

  saveCart();
  closeDetailsModal();
  triggerToast(`Đã thêm ${qty} máy "${currentDetailProduct.model}" vào giỏ hàng!`);
  openCart();
}

function closeDetailsModal() {
  const modal = document.getElementById("detailsModal");
  if (modal) modal.classList.remove("active");
}

function renderDetailReviews(prod) {
  const listEl = document.getElementById("detailReviewsList");
  const avgRatingEl = document.getElementById("detailAvgRating");
  const totalCountEl = document.getElementById("detailTotalReviewsCount");

  if (!listEl) return;

  if (avgRatingEl) avgRatingEl.textContent = prod.rating;
  if (totalCountEl) totalCountEl.textContent = (prod.reviews || []).length;

  if (!prod.reviews || prod.reviews.length === 0) {
    listEl.innerHTML = `<p style="color: #64748b; font-size: 14px;">Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!</p>`;
    return;
  }

  listEl.innerHTML = prod.reviews.map(r => `
    <div class="review-item-card">
      <div class="review-header">
        <div>
          <span class="review-author">${r.author}</span>
          <span class="review-location">📍 ${r.location}</span>
        </div>
        <div class="review-stars">
          ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
        </div>
      </div>
      <div class="review-title">${r.title}</div>
      <p class="review-content">${r.content}</p>
      <div class="review-footer">
        <span class="review-date">${r.date}</span>
        <button class="review-helpful-btn ${r.liked ? 'liked' : ''}" onclick="toggleReviewLike('${r.id}')">
          👍 Hữu ích (${r.helpful})
        </button>
      </div>
    </div>
  `).join("");
}

function toggleReviewLike(revId) {
  if (!currentDetailProduct) return;
  const rev = currentDetailProduct.reviews.find(r => r.id === revId);
  if (!rev) return;

  if (rev.liked) {
    rev.helpful -= 1;
    rev.liked = false;
  } else {
    rev.helpful += 1;
    rev.liked = true;
  }

  renderDetailReviews(currentDetailProduct);
}

// Custom Review Form Handler
function handleReviewSubmit(e) {
  e.preventDefault();
  if (!currentDetailProduct) return;

  const authorInput = document.getElementById("reviewAuthorInput");
  const locInput = document.getElementById("reviewLocationInput");
  const ratingInput = document.getElementById("reviewRatingSelect");
  const titleInput = document.getElementById("reviewTitleInput");
  const contentInput = document.getElementById("reviewContentInput");

  if (!authorInput || !contentInput) return;

  const author = authorInput.value.trim();
  const location = locInput ? locInput.value.trim() : "Miền Tây";
  const rating = parseInt(ratingInput ? ratingInput.value : "5");
  const title = titleInput ? titleInput.value.trim() : "Đánh giá máy";
  const content = contentInput.value.trim();

  if (!author || !content) {
    alert("Vui lòng nhập tên và nội dung đánh giá của Quý khách!");
    return;
  }

  const newReview = {
    id: "cr-" + Date.now(),
    productId: currentDetailProduct.id,
    author: author,
    location: location,
    rating: rating,
    date: "Vừa xong",
    title: title,
    content: content,
    helpful: 1,
    liked: true
  };

  currentDetailProduct.reviews.unshift(newReview);
  currentDetailProduct.reviewsCount = currentDetailProduct.reviews.length;
  saveCustomReview(newReview);

  // Clear form
  authorInput.value = "";
  contentInput.value = "";
  if (titleInput) titleInput.value = "";

  renderDetailReviews(currentDetailProduct);
  renderCatalog();
  triggerToast("Cảm ơn Quý khách đã gửi đánh giá kỹ thuật!");
}

// ==========================================================================
// ORDER TRACKING PORTAL ("TRA CỨU ĐƠN HÀNG")
// ==========================================================================
function openOrderTrackingModal() {
  const modal = document.getElementById("orderTrackingModal");
  if (modal) {
    modal.classList.add("active");
    // Show latest local order if available
    renderLatestLocalOrdersInTracking();
  }
}

function closeOrderTrackingModal() {
  const modal = document.getElementById("orderTrackingModal");
  if (modal) modal.classList.remove("active");
}

function renderLatestLocalOrdersInTracking() {
  const container = document.getElementById("trackingRecentList");
  if (!container) return;

  try {
    const list = JSON.parse(localStorage.getItem("thanhdat_user_orders") || "[]");
    if (list.length === 0) {
      container.innerHTML = `<p style="color: #64748b; font-size: 13px;">Chưa có đơn hàng nào được lưu trên thiết bị này.</p>`;
      return;
    }

    container.innerHTML = `
      <div style="font-size: 13px; font-weight: 700; color: #1b5e20; margin-bottom: 8px;">ĐƠN HÀNG GẦN ĐÂY CỦA BẠN:</div>
      ${list.slice(0, 3).map(o => `
        <div class="tracking-history-item" onclick="quickTrackOrder('${o.id}')">
          <div>
            <b>#${o.id}</b> — ${o.customerName}
            <div style="color: #64748b; font-size: 11px;">${new Date(o.createdAt || Date.now()).toLocaleDateString('vi-VN')}</div>
          </div>
          <span class="status-tag status-pending">${o.status || 'Chờ Xác Nhận'}</span>
        </div>
      `).join("")}
    `;
  } catch (e) {}
}

function quickTrackOrder(orderId) {
  const input = document.getElementById("trackingSearchInput");
  if (input) {
    input.value = orderId;
    performOrderTracking();
  }
}

async function performOrderTracking() {
  const input = document.getElementById("trackingSearchInput");
  const resultBox = document.getElementById("trackingResultBox");
  if (!input || !resultBox) return;

  const query = input.value.trim().toUpperCase().replace(/^#/, "");
  if (!query) {
    alert("Vui lòng nhập Mã Đơn Hàng (VD: TD-123456) hoặc Số Điện Thoại!");
    return;
  }

  resultBox.innerHTML = `
    <div style="text-align: center; padding: 24px; color: #1b5e20;">
      <div style="font-size: 24px; margin-bottom: 8px;">⏳</div>
      <div>Đang tra cứu hệ thống xưởng máy Sóc Trăng...</div>
    </div>
  `;

  // Search local orders first
  const localOrders = JSON.parse(localStorage.getItem("thanhdat_user_orders") || "[]");
  let found = localOrders.find(o => 
    (o.id && o.id.toUpperCase().includes(query)) ||
    (o.order_number && o.order_number.toUpperCase().includes(query)) ||
    (o.customerPhone && o.customerPhone.includes(query))
  );

  // If not found locally, query Supabase
  if (!found) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/thanhdat_machinery_orders?or=(order_number.eq.${query},customer_phone.eq.${query})&select=*`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + SUPABASE_ANON_KEY
        }
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        found = {
          id: data[0].order_number,
          order_number: data[0].order_number,
          trackingCode: "TD2-CHANH-" + data[0].order_number.slice(-4),
          customerName: data[0].customer_name,
          customerPhone: data[0].customer_phone,
          customerAddress: data[0].delivery_street,
          customerProvince: data[0].delivery_province,
          deliverySpeed: data[0].delivery_speed,
          paymentMethod: data[0].payment_method,
          items: data[0].items || [],
          total: data[0].total,
          status: data[0].status || "Chờ Xác Nhận",
          createdAt: data[0].created_at
        };
      }
    } catch (e) {}
  }

  if (!found) {
    resultBox.innerHTML = `
      <div class="tracking-not-found">
        <div style="font-size: 32px; margin-bottom: 8px;">❌</div>
        <h4>Không tìm thấy đơn hàng "${query}"</h4>
        <p>Vui lòng kiểm tra lại mã đơn hàng hoặc số điện thoại. Hoặc liên hệ trực tiếp số Hotline <b>0918 453 476</b> để nhân viên xưởng kiểm tra ngay.</p>
      </div>
    `;
    return;
  }

  // Render 5-step Machinery Freight Dispatch Timeline
  resultBox.innerHTML = `
    <div class="tracking-found-card">
      <div class="tracking-card-header">
        <div>
          <span class="tracking-label">MÃ ĐƠN HÀNG:</span>
          <span class="tracking-id-val">#${found.id}</span>
        </div>
        <div>
          <span class="status-tag status-pending">⚙️ ${found.status || 'Chờ Kỹ Thuật Test Máy'}</span>
        </div>
      </div>

      <div class="tracking-info-grid">
        <div><b>Khách hàng:</b> ${found.customerName} (${found.customerPhone})</div>
        <div><b>Nơi nhận:</b> ${found.customerAddress}, ${found.customerProvince || ''}</div>
        <div><b>Vận chuyển:</b> ${found.deliverySpeed || 'Chành Xe Miền Tây'}</div>
        <div><b>Tổng tiền:</b> <span style="color: #1b5e20; font-weight: 800;">${formatMoney(found.total)}</span></div>
      </div>

      <div class="timeline-stepper">
        <div class="timeline-step done">
          <div class="step-icon">1</div>
          <div class="step-text">
            <b>Tiếp Nhận Đơn Hàng</b>
            <span>Xác nhận thông tin & cấu hình máy</span>
          </div>
        </div>

        <div class="timeline-step active">
          <div class="step-icon">2</div>
          <div class="step-text">
            <b>Test Chạy Nổ & Kiểm Tra Áp Suất</b>
            <span>Châm nhớt, căn chỉnh ga, thử tải tại xưởng</span>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-icon">3</div>
          <div class="step-text">
            <b>Đóng Kiện Gỗ Niêm Phong</b>
            <span>Bọc màng co và kiện gỗ chống va đập</span>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-icon">4</div>
          <div class="step-text">
            <b>Bàn Giao Chành Xe / Vận Tải</b>
            <span>Xuất bến Tô Châu, Phương Trang, v.v.</span>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-icon">5</div>
          <div class="step-text">
            <b>Giao Tận Ruộng & Thử Máy</b>
            <span>Kiểm tra nổ máy giòn giã rồi thanh toán</span>
          </div>
        </div>
      </div>

      <div class="tracking-items-summary">
        <b>Thiết Bị Đã Đặt:</b>
        <ul>
          ${(found.items || []).map(it => `<li>⚙️ <b>${it.name}</b> × ${it.quantity}</li>`).join("")}
        </ul>
      </div>

      <div style="text-align: center; margin-top: 14px;">
        <a href="tel:0918453476" class="call-workshop-btn">📞 Gọi Trực Tiếp Xưởng: 0918 453 476</a>
      </div>
    </div>
  `;
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function triggerToast(msg) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "app-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

// Currency Switcher
function toggleCurrency() {
  currentCurrency = currentCurrency === "VND" ? "USD" : "VND";
  localStorage.setItem("thanhdat_currency", currentCurrency);
  const btn = document.getElementById("currencyToggleBtn");
  if (btn) btn.textContent = currentCurrency === "VND" ? "₫ VNĐ" : "$ USD";
  renderCatalog();
  renderCartDrawer();
  if (currentDetailProduct) {
    document.getElementById("detailPriceDisplay").textContent = formatMoney(currentDetailProduct.price);
  }
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadCustomReviews();
  loadCart();
  updateCartBadge();
  renderCatalog();

  // Category filter chips
  document.querySelectorAll(".cat-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentCategory = chip.getAttribute("data-cat") || "all";
      renderCatalog();
    });
  });

  // Horsepower filter pills
  document.querySelectorAll(".hp-chip").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".hp-chip").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentHpFilter = pill.getAttribute("data-hp") || "all";
      renderCatalog();
    });
  });

  // Search inputs
  const searchInput = document.getElementById("machinerySearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById("catalogSortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Cart Buttons
  const cartBtn = document.getElementById("navCartBtn");
  if (cartBtn) cartBtn.addEventListener("click", openCart);

  const closeCartBtn = document.getElementById("closeCartBtn");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);

  const cartOverlay = document.getElementById("cartOverlay");
  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // Checkout Buttons
  const checkoutBtn = document.getElementById("proceedCheckoutBtn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", openCheckoutModal);

  const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeCheckoutModal);

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Details Modal Buttons
  const closeDetailsBtn = document.getElementById("closeDetailsBtn");
  if (closeDetailsBtn) closeDetailsBtn.addEventListener("click", closeDetailsModal);

  const addDetailBtn = document.getElementById("detailAddToCartBtn");
  if (addDetailBtn) addDetailBtn.addEventListener("click", addDetailProductToCart);

  const reviewForm = document.getElementById("detailReviewForm");
  if (reviewForm) reviewForm.addEventListener("submit", handleReviewSubmit);

  // Tracking Modal Buttons
  const trackingNavBtn = document.getElementById("navTrackingBtn");
  if (trackingNavBtn) trackingNavBtn.addEventListener("click", openOrderTrackingModal);

  const closeTrackingBtn = document.getElementById("closeTrackingBtn");
  if (closeTrackingBtn) closeTrackingBtn.addEventListener("click", closeOrderTrackingModal);

  const trackSubmitBtn = document.getElementById("trackingSearchBtn");
  if (trackSubmitBtn) trackSubmitBtn.addEventListener("click", performOrderTracking);

  const trackingInput = document.getElementById("trackingSearchInput");
  if (trackingInput) {
    trackingInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performOrderTracking();
    });
  }

  // Currency Toggle Button
  const currencyBtn = document.getElementById("currencyToggleBtn");
  if (currencyBtn) {
    currencyBtn.textContent = currentCurrency === "VND" ? "₫ VNĐ" : "$ USD";
    currencyBtn.addEventListener("click", toggleCurrency);
  }
});
