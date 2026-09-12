// ==========================================================================
// TU THANH MACHINERY - DEDICATED PRODUCT PAGE LOGIC
// Handles product data population, gallery, specs, reviews, cart & checkout
// ==========================================================================

const SUPABASE_URL = "https://munbteqhjgwoxebguqdl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bmJ0ZXFoamd3b3hlYmd1cWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzM1ODYsImV4cCI6MjA5NjE0OTU4Nn0.tYvdCKxpC6OEWYGhCaOwJbSDimxoHBbbX-CyMR0j59s";

const supabaseClient = (typeof window !== "undefined" && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

let currentProduct = null;
let selectedQuantity = 1;
let cart = [];

// Get Product ID from URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  return isNaN(id) ? 1 : id;
}

// Shopping Cart Management
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

// Custom Reviews Management
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
  } catch (e) {}
}

function saveCustomReview(reviewObj) {
  try {
    const saved = localStorage.getItem("thanhdat_custom_reviews");
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(reviewObj);
    localStorage.setItem("thanhdat_custom_reviews", JSON.stringify(list));
  } catch (e) {}
}

// Populate Product Details
function initProductPage() {
  const id = getProductIdFromUrl();
  currentProduct = PRODUCTS_DATA.find(p => p.id === id) || PRODUCTS_DATA[0];

  // Document Title
  document.title = `${currentProduct.model} | Tu Thanh Machinery`;
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) pageTitle.textContent = `${currentProduct.model} | Tu Thanh Machinery`;

  // Breadcrumbs
  const bcCat = document.getElementById("bcCategory");
  const bcMod = document.getElementById("bcModel");
  if (bcCat) {
    const catMap = {
      engines: "Diesel Engines",
      tillers: "Power Tillers",
      pumps: "Water Pumps",
      marine: "Marine Long-Tails",
      generators: "Generators",
      parts: "Parts & Kits"
    };
    bcCat.textContent = catMap[currentProduct.category] || "Machinery";
  }
  if (bcMod) bcMod.textContent = currentProduct.model;

  // Badges & Headers
  const badgeEl = document.getElementById("productBadge");
  if (badgeEl) {
    badgeEl.textContent = currentProduct.badge;
    badgeEl.className = `flyer-badge ${currentProduct.badgeType}`;
  }

  const brandPill = document.getElementById("productBrandBadge");
  if (brandPill) brandPill.textContent = `${currentProduct.brand} Factory Direct`;

  const hpPill = document.getElementById("productHpPill");
  if (hpPill) hpPill.textContent = currentProduct.hp || "Heavy-Duty Spec";

  const skuPill = document.getElementById("productSkuTag");
  if (skuPill) skuPill.textContent = `SKU: ${currentProduct.sku || 'TTM-DIRECT'}`;

  const titleEl = document.getElementById("productTitle");
  if (titleEl) titleEl.textContent = currentProduct.model;

  const ratingNum = document.getElementById("productRatingNum");
  if (ratingNum) ratingNum.textContent = currentProduct.rating;

  const revCount = document.getElementById("productReviewsCount");
  if (revCount) revCount.textContent = currentProduct.reviewsCount || (currentProduct.reviews || []).length;

  const priceEl = document.getElementById("productPriceDisplay");
  if (priceEl) priceEl.textContent = formatMoney(currentProduct.price);

  const descEl = document.getElementById("productDescription");
  if (descEl) descEl.textContent = currentProduct.description;

  // Gallery
  const mainImg = document.getElementById("productMainImg");
  if (mainImg) {
    mainImg.src = currentProduct.images[0];
    mainImg.alt = currentProduct.model;
  }

  const thumbsContainer = document.getElementById("productGalleryThumbs");
  if (thumbsContainer) {
    thumbsContainer.innerHTML = currentProduct.images.map((imgSrc, i) => `
      <div class="thumb-item ${i === 0 ? 'active' : ''}" onclick="switchProductImage('${imgSrc}', this)">
        <img src="${imgSrc}" alt="${currentProduct.model} view ${i + 1}" onerror="this.onerror=null; this.src='images/hero_banner.jpg';" />
      </div>
    `).join("");
  }

  // Quick Specs Grid
  const quickSpecs = document.getElementById("quickSpecsGrid");
  if (quickSpecs) {
    const specsMap = [
      { label: "Rated Power", val: currentProduct.hp || "14.0 HP" },
      { label: "Rated Speed", val: currentProduct.rpm || "2,400 RPM" },
      { label: "Cooling Tech", val: currentProduct.cooling || "Radiator Fan" },
      { label: "Starting System", val: currentProduct.starter || "Decompression Crank" },
      { label: "Displacement", val: currentProduct.displacement || "N/A" },
      { label: "Net Weight", val: currentProduct.weight || "N/A" }
    ];

    quickSpecs.innerHTML = specsMap.map(s => `
      <div class="qspec-card">
        <span class="qspec-label">${s.label}</span>
        <span class="qspec-val">${s.val}</span>
      </div>
    `).join("");
  }

  // Feature Bullets
  const bulletsContainer = document.getElementById("productBulletsList");
  if (bulletsContainer) {
    bulletsContainer.innerHTML = (currentProduct.bullets || []).map(b => `
      <li>
        <span class="bullet-check">✓</span>
        <span>${b}</span>
      </li>
    `).join("");
  }

  // Full Technical Specifications Table
  const specsTbody = document.getElementById("specsTableTbody");
  if (specsTbody) {
    const specs = currentProduct.specs || {};
    specsTbody.innerHTML = Object.entries(specs).map(([label, val]) => `
      <tr>
        <td class="spec-label-col"><b>${label}</b></td>
        <td class="spec-val-col">${val}</td>
      </tr>
    `).join("");
  }

  // Reviews
  renderReviewsSection();

  // Related Equipment
  renderRelatedEquipment();
}

function switchProductImage(src, thumbEl) {
  const mainImg = document.getElementById("productMainImg");
  if (mainImg) mainImg.src = src;

  document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
  if (thumbEl) thumbEl.classList.add("active");
}

function stepProductQty(delta) {
  selectedQuantity = Math.max(1, Math.min(20, selectedQuantity + delta));
  const el = document.getElementById("productQtyVal");
  if (el) el.textContent = selectedQuantity;
}

// Reviews Rendering
function renderReviewsSection() {
  const container = document.getElementById("productReviewsContainer");
  const bigAvg = document.getElementById("reviewsAvgBig");
  const countTotal = document.getElementById("reviewsCountTotal");

  if (!container || !currentProduct) return;

  const reviews = currentProduct.reviews || [];
  if (bigAvg) bigAvg.textContent = currentProduct.rating;
  if (countTotal) countTotal.textContent = reviews.length;

  if (reviews.length === 0) {
    container.innerHTML = `<p style="color: #64748B; font-size: 14px; padding: 20px 0;">No reviews yet. Be the first verified operator to review this machinery!</p>`;
    return;
  }

  container.innerHTML = reviews.map(r => `
    <div class="review-comment-card">
      <div class="rev-header-row">
        <div>
          <b class="rev-author-name">${r.author}</b>
          <span class="rev-location-tag">📍 ${r.location}</span>
        </div>
        <div class="stars-gold">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      </div>
      <div class="rev-headline-text">${r.title}</div>
      <p class="rev-body-para">${r.content}</p>
      <div class="rev-footer-row">
        <span class="rev-date">${r.date}</span>
        <button class="rev-helpful-btn" onclick="toggleReviewHelpful('${r.id}')">
          👍 Helpful (${r.helpful})
        </button>
      </div>
    </div>
  `).join("");
}

function toggleReviewHelpful(revId) {
  if (!currentProduct) return;
  const rev = currentProduct.reviews.find(r => r.id === revId);
  if (!rev) return;

  rev.helpful += rev.liked ? -1 : 1;
  rev.liked = !rev.liked;
  renderReviewsSection();
}

function handleReviewFormSubmit(e) {
  e.preventDefault();
  if (!currentProduct) return;

  const author = document.getElementById("revAuthorInput").value.trim();
  const location = document.getElementById("revLocationInput").value.trim();
  const rating = parseInt(document.getElementById("revRatingSelect").value) || 5;
  const title = document.getElementById("revTitleInput").value.trim() || "Performance Feedback";
  const content = document.getElementById("revContentInput").value.trim();

  if (!author || !content) {
    alert("Please fill in your name and detailed feedback!");
    return;
  }

  const newReview = {
    id: "r-" + Date.now(),
    productId: currentProduct.id,
    author,
    location,
    rating,
    date: "Just now",
    title,
    content,
    helpful: 1,
    liked: true
  };

  currentProduct.reviews.unshift(newReview);
  currentProduct.reviewsCount = currentProduct.reviews.length;
  saveCustomReview(newReview);

  document.getElementById("revAuthorInput").value = "";
  document.getElementById("revLocationInput").value = "";
  document.getElementById("revTitleInput").value = "";
  document.getElementById("revContentInput").value = "";

  renderReviewsSection();
  triggerToast("Thank you for submitting your equipment review!");
}

// Related Equipment
function renderRelatedEquipment() {
  const container = document.getElementById("relatedProductsGrid");
  if (!container || !currentProduct) return;

  // Filter 4 products from same or complementary category
  const related = PRODUCTS_DATA
    .filter(p => p.id !== currentProduct.id)
    .slice(0, 4);

  container.innerHTML = related.map(item => `
    <div class="flyer-product-card" data-id="${item.id}">
      <span class="flyer-badge ${item.badgeType}">${item.badge}</span>
      
      <a href="product.html?id=${item.id}" class="card-link-wrap">
        <div class="flyer-card-media">
          <img src="${item.images[0]}" alt="${item.brand} ${item.model}" class="flyer-product-image" loading="lazy" onerror="this.onerror=null; this.src='images/hero_banner.jpg';" />
        </div>
      </a>

      <div class="flyer-card-info">
        <a href="product.html?id=${item.id}" class="card-title-link">
          <div class="flyer-card-title">
            <span class="brand-bold">${item.brand}</span>
            <span class="model-line">${item.model}</span>
          </div>
        </a>

        <div class="card-stars-row">
          <span class="stars-gold">★★★★★</span>
          <span class="rating-val">${item.rating}</span>
          <span class="review-count-pill">(${item.reviewsCount})</span>
        </div>

        <div class="flyer-price-row">
          <span class="price-sublabel">Dealer Direct:</span>
          <span class="price-main">${formatMoney(item.price)}</span>
        </div>

        <div class="flyer-card-actions">
          <a href="product.html?id=${item.id}" class="flyer-add-cart-btn" style="text-decoration:none;">
            <span>View Specifications →</span>
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

// Add to Cart
function addCurrentProductToCart() {
  if (!currentProduct) return;

  const existing = cart.find(i => i.id === currentProduct.id);
  if (existing) {
    existing.quantity += selectedQuantity;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.model,
      brand: currentProduct.brand,
      price: currentProduct.price,
      image: currentProduct.images[0],
      hp: currentProduct.hp,
      specs: (currentProduct.cooling || '') + " | " + (currentProduct.starter || ''),
      quantity: selectedQuantity
    });
  }

  saveCart();
  triggerToast(`Added ${selectedQuantity} × "${currentProduct.model}" to cart!`);
  openCart();
}

function buyNowExpress() {
  if (!currentProduct) return;

  const existing = cart.find(i => i.id === currentProduct.id);
  if (existing) {
    existing.quantity += selectedQuantity;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.model,
      brand: currentProduct.brand,
      price: currentProduct.price,
      image: currentProduct.images[0],
      hp: currentProduct.hp,
      specs: (currentProduct.cooling || '') + " | " + (currentProduct.starter || ''),
      quantity: selectedQuantity
    });
  }

  saveCart();
  openCheckoutModal();
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
      <div style="text-align: center; padding: 40px 16px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🛒</div>
        <h4 style="font-size: 16px; margin-bottom: 6px;">Your Equipment Cart is Empty</h4>
        <p style="font-size: 13px; color: #64748B; margin-bottom: 16px;">Select diesel engines, power tillers, or accessories to begin.</p>
        <button class="flyer-add-cart-btn" style="display: inline-flex; width: auto; padding: 8px 18px; margin: 0 auto;" onclick="closeCart()">Continue Browsing</button>
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
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
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
            <button class="remove-cart-item-btn" onclick="removeCartItem(${idx})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (totalEl) totalEl.textContent = formatMoney(subtotal);
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
  cart.splice(idx, 1);
  saveCart();
}

// ==========================================================================
// CHECKOUT MODAL OPERATIONS
// ==========================================================================
function openCheckoutModal() {
  if (cart.length === 0) {
    alert("Your shopping cart is empty!");
    return;
  }
  closeCart();
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  const reviewList = document.getElementById("checkoutOrderReviewList");
  let subtotal = 0;
  if (reviewList) {
    reviewList.innerHTML = cart.map(item => {
      subtotal += item.price * item.quantity;
      return `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">
          <span>⚙️ <b>${item.name}</b> × ${item.quantity}</span>
          <b>${formatMoney(item.price * item.quantity)}</b>
        </div>
      `;
    }).join("");
  }

  const subtotalEl = document.getElementById("checkoutSubtotalVal");
  const totalEl = document.getElementById("checkoutTotalVal");
  const qrTotalEl = document.getElementById("qrTotalDisplay");

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (totalEl) totalEl.textContent = formatMoney(subtotal);
  if (qrTotalEl) qrTotalEl.textContent = formatMoney(subtotal);

  modal.classList.add("active");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const email = document.getElementById("custEmail").value.trim();
  const province = document.getElementById("custProvince").value.trim();
  const district = document.getElementById("custDistrict").value.trim();
  const street = document.getElementById("custStreet").value.trim();
  const deliverySpeed = document.getElementById("deliverySpeedSelect").value;
  const notes = document.getElementById("custNotes").value.trim();

  const payRadios = document.getElementsByName("paymentMethod");
  let paymentMethod = "Inspection on Delivery (COD) / Carrier Escrow";
  for (let r of payRadios) {
    if (r.checked) paymentMethod = r.value;
  }

  const orderId = "TTM-" + Math.floor(100000 + Math.random() * 900000);
  const trackingCode = "TTM-FREIGHT-" + Math.floor(1000 + Math.random() * 9000);
  const totalAmount = cart.reduce((acc, it) => acc + (it.price * it.quantity), 0);

  const orderData = {
    id: orderId,
    order_number: orderId,
    trackingCode: trackingCode,
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    customerProvince: province,
    customerDistrict: district,
    customerAddress: street,
    deliverySpeed: deliverySpeed,
    paymentMethod: paymentMethod,
    notes: notes,
    items: [...cart],
    total: totalAmount,
    status: "Pre-Dispatch Run-Test",
    createdAt: new Date().toISOString()
  };

  const submitBtn = document.getElementById("placeOrderSubmitBtn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>DISPATCHING ORDER TO WORKSHOP...</span>`;
  }

  // Save order to localStorage for tracking
  try {
    const existingOrders = JSON.parse(localStorage.getItem("thanhdat_user_orders") || "[]");
    existingOrders.unshift(orderData);
    localStorage.setItem("thanhdat_user_orders", JSON.stringify(existingOrders));
  } catch (err) {}

  // Sync to Supabase
  if (supabaseClient) {
    try {
      await supabaseClient.from("orders").insert([{
        order_number: orderData.id,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        customer_address: `${orderData.customerAddress}, ${orderData.customerDistrict}, ${orderData.customerProvince}`,
        items: orderData.items,
        total_amount: orderData.total,
        status: "pending",
        notes: orderData.notes,
        created_at: orderData.createdAt
      }]);
    } catch (sbErr) {
      console.warn("Supabase sync:", sbErr);
    }
  }

  // Call /api/notify for Telegram & Resend email invoice
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "order", order: orderData })
    });
  } catch (apiErr) {
    console.warn("Notification API dispatch:", apiErr);
  }

  // Reset Cart
  cart = [];
  saveCart();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>CONFIRM MACHINERY PURCHASE</span>`;
  }

  closeCheckoutModal();
  showOrderSuccessModal(orderData);
}

function showOrderSuccessModal(order) {
  document.getElementById("successOrderId").textContent = "#" + order.id;
  document.getElementById("successTrackingCode").textContent = order.trackingCode;
  document.getElementById("successCustName").textContent = order.customerName;
  document.getElementById("successCustPhone").textContent = order.customerPhone;
  document.getElementById("successTotalAmount").textContent = formatMoney(order.total);

  const modal = document.getElementById("orderSuccessModal");
  if (modal) modal.classList.add("active");
}

function closeSuccessModal() {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) modal.classList.remove("active");
}

// ==========================================================================
// ORDER TRACKING PORTAL
// ==========================================================================
function openOrderTrackingModal() {
  const modal = document.getElementById("orderTrackingModal");
  if (modal) {
    modal.classList.add("active");
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
      container.innerHTML = `<p style="color: #64748B; font-size: 13px;">No recent orders saved on this browser.</p>`;
      return;
    }

    container.innerHTML = `
      <div style="font-size: 13px; font-weight: 800; color: #15803D; margin-bottom: 8px;">YOUR RECENT ORDERS:</div>
      ${list.slice(0, 3).map(o => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 8px 12px; cursor: pointer; margin-bottom: 6px;" onclick="quickTrackOrder('${o.id}')">
          <div>
            <b>#${o.id}</b> — ${o.customerName}
            <div style="color: #64748B; font-size: 11px;">${new Date(o.createdAt || Date.now()).toLocaleDateString('en-US')}</div>
          </div>
          <span style="font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 999px; background: #FEF3C7; color: #92400E;">${o.status || 'Pending'}</span>
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
    alert("Please enter your Order Reference (e.g., TTM-123456) or Phone Number!");
    return;
  }

  resultBox.innerHTML = `
    <div style="text-align: center; padding: 24px; color: #15803D;">
      <div style="font-size: 24px; margin-bottom: 8px;">⏳</div>
      <div>Querying workshop dispatch database...</div>
    </div>
  `;

  const localOrders = JSON.parse(localStorage.getItem("thanhdat_user_orders") || "[]");
  let found = localOrders.find(o => 
    (o.id && o.id.toUpperCase().includes(query)) ||
    (o.order_number && o.order_number.toUpperCase().includes(query)) ||
    (o.customerPhone && o.customerPhone.includes(query))
  );

  if (!found) {
    resultBox.innerHTML = `
      <div style="text-align: center; padding: 30px 16px; color: #64748B;">
        <div style="font-size: 32px; margin-bottom: 8px;">❌</div>
        <h4>Order "${query}" Not Found</h4>
        <p style="font-size: 13px;">Please verify your order number or phone. You can also call us directly at <b>+84 918 453 476</b>.</p>
      </div>
    `;
    return;
  }

  resultBox.innerHTML = `
    <div style="background: #FFFFFF; border: 1.5px solid #15803D; border-radius: 8px; padding: 18px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 10px; margin-bottom: 12px;">
        <div>
          <span style="font-size: 11px; font-weight: 800; color: #64748B;">ORDER REFERENCE:</span>
          <span style="font-size: 16px; font-weight: 800; color: #15803D; margin-left: 6px;">#${found.id}</span>
        </div>
        <span style="font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 999px; background: #FEF3C7; color: #92400E;">⚙️ ${found.status || 'Pre-Dispatch Run-Test'}</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12.5px; margin-bottom: 18px; background: #F8FAFC; padding: 10px; border-radius: 6px;">
        <div><b>Customer:</b> ${found.customerName} (${found.customerPhone})</div>
        <div><b>Destination:</b> ${found.customerAddress}, ${found.customerProvince || ''}</div>
        <div><b>Freight Method:</b> ${found.deliverySpeed || 'Express Freight Courier'}</div>
        <div><b>Total Amount:</b> <span style="color: #15803D; font-weight: 800;">${formatMoney(found.total)}</span></div>
      </div>

      <div class="timeline-stepper">
        <div class="timeline-step done">
          <div class="step-icon">1</div>
          <div class="step-text">
            <b>Order Received &amp; Spec Verified</b>
            <span>Engine model &amp; accessories confirmed</span>
          </div>
        </div>

        <div class="timeline-step active">
          <div class="step-icon">2</div>
          <div class="step-text">
            <b>Oil Service &amp; Pre-Start Run Test</b>
            <span>Pressure tested &amp; RPM calibrated on workshop dyno</span>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-icon">3</div>
          <div class="step-text">
            <b>Wooden Crate Shock-Proof Packaging</b>
            <span>Shrink-wrapped, padded, and banded on wooden pallet</span>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-icon">4</div>
          <div class="step-text">
            <b>Handed Over to Freight Courier</b>
            <span>Dispatched via commercial linehaul carrier</span>
          </div>
        </div>

        <div class="timeline-step">
          <div class="step-icon">5</div>
          <div class="step-text">
            <b>On-Site Delivery &amp; Inspection</b>
            <span>Customer inspection and test startup verified</span>
          </div>
        </div>
      </div>

      <div style="background: #F8FAFC; border-radius: 6px; padding: 10px; font-size: 12.5px;">
        <b>Ordered Machinery:</b>
        <ul style="list-style: none; margin-top: 4px;">
          ${(found.items || []).map(it => `<li>⚙️ <b>${it.name}</b> × ${it.quantity}</li>`).join("")}
        </ul>
      </div>

      <div style="text-align: center; margin-top: 14px;">
        <a href="tel:+84918453476" style="display: inline-block; background: #15803D; color: #FFFFFF; padding: 9px 18px; border-radius: 6px; font-size: 13px; font-weight: 700;">📞 Call Workshop Direct: +84 918 453 476</a>
      </div>
    </div>
  `;
}

// Toast
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

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadCustomReviews();
  loadCart();
  updateCartBadge();
  initProductPage();

  // Search input redirect to catalog
  const searchInput = document.getElementById("productSearchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const q = encodeURIComponent(searchInput.value.trim());
        window.location.href = `index.html?search=${q}#catalogAnchor`;
      }
    });
  }

  // Add to Cart Main
  const addCartBtn = document.getElementById("addToCartMainBtn");
  if (addCartBtn) addCartBtn.addEventListener("click", addCurrentProductToCart);

  // Buy Now Express
  const buyNowBtn = document.getElementById("buyNowExpressBtn");
  if (buyNowBtn) buyNowBtn.addEventListener("click", buyNowExpress);

  // Review Form
  const revForm = document.getElementById("productReviewForm");
  if (revForm) revForm.addEventListener("submit", handleReviewFormSubmit);

  // Cart Buttons
  const navCartBtn = document.getElementById("navCartBtn");
  if (navCartBtn) navCartBtn.addEventListener("click", openCart);

  const closeCartBtn = document.getElementById("closeCartBtn");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);

  const cartOverlay = document.getElementById("cartOverlay");
  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // Checkout
  const proceedBtn = document.getElementById("proceedCheckoutBtn");
  if (proceedBtn) proceedBtn.addEventListener("click", openCheckoutModal);

  const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeCheckoutModal);

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Tracking
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
});
