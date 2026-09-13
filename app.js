// ==========================================================================
// FARMMACHINERIES
// Premier E-Commerce Platform for Farm Machinery & Agricultural Equipment
// ==========================================================================

const SUPABASE_URL = "https://munbteqhjgwoxebguqdl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bmJ0ZXFoamd3b3hlYmd1cWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzM1ODYsImV4cCI6MjA5NjE0OTU4Nn0.tYvdCKxpC6OEWYGhCaOwJbSDimxoHBbbX-CyMR0j59s";

const supabaseClient = (typeof window !== "undefined" && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ==========================================================================
// CURRENCY
// Every product is priced in its own native `currency` (USD unless stated).
// The visitor's country decides how prices are displayed, so a Kenyan sees
// Kenya Shillings, a Ugandan USh, a Tanzanian TSh, and so on across the
// East African Community. Rates in FX_PER_USD are approximate: review and
// update them whenever exchange rates move.
// ==========================================================================
const FX_PER_USD = {
  USD: 1,
  KES: 129,
  UGX: 3700,
  TZS: 2600,
  RWF: 1400,
  BIF: 2900
};

const COUNTRY_CURRENCY = {
  KE: "KES",
  UG: "UGX",
  TZ: "TZS",
  RW: "RWF",
  BI: "BIF"
};

const CURRENCY_TIMEZONE = {
  "Africa/Nairobi": "KES",
  "Africa/Kampala": "UGX",
  "Africa/Dar_es_Salaam": "TZS",
  "Africa/Kigali": "RWF",
  "Africa/Bujumbura": "BIF"
};

const CURRENCY_DISPLAY = {
  USD: { prefix: "$", suffix: " USD" },
  KES: { prefix: "KSh ", suffix: "" },
  UGX: { prefix: "USh ", suffix: "" },
  TZS: { prefix: "TSh ", suffix: "" },
  RWF: { prefix: "FRw ", suffix: "" },
  BIF: { prefix: "FBu ", suffix: "" }
};

const FREE_FREIGHT_THRESHOLD_USD = 800;
const FREIGHT_FEE_USD = 45;

function detectVisitorCurrency() {
  try {
    const tags = [navigator.language].concat(navigator.languages || []);
    for (const tag of tags) {
      const region = String(tag || "").split(/[-_]/)[1];
      if (region && COUNTRY_CURRENCY[region.toUpperCase()]) {
        return COUNTRY_CURRENCY[region.toUpperCase()];
      }
    }
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (CURRENCY_TIMEZONE[timeZone]) return CURRENCY_TIMEZONE[timeZone];
  } catch (e) {}
  return "USD";
}

const SITE_CURRENCY = detectVisitorCurrency();

function toSiteCurrency(amount, fromCurrency) {
  const from = FX_PER_USD[fromCurrency] ? fromCurrency : "USD";
  return (Number(amount) / FX_PER_USD[from]) * FX_PER_USD[SITE_CURRENCY];
}

function formatMoney(amount, currencyCode) {
  const display = CURRENCY_DISPLAY[SITE_CURRENCY] || CURRENCY_DISPLAY.USD;
  const value = Math.round(toSiteCurrency(amount, currencyCode || "USD"));
  return display.prefix + value.toLocaleString("en-US") + display.suffix;
}

// Cart totals are held in the visitor's currency while freight is priced in USD.
function freightFeeFor(subtotal) {
  const subtotalUSD = subtotal / FX_PER_USD[SITE_CURRENCY];
  return subtotalUSD >= FREE_FREIGHT_THRESHOLD_USD ? 0 : toSiteCurrency(FREIGHT_FEE_USD, "USD");
}

function freeFreightShortfall(subtotal) {
  return toSiteCurrency(FREE_FREIGHT_THRESHOLD_USD, "USD") - subtotal;
}

// 10 Curated Machinery Catalog Items
const PRODUCTS_DATA = [
  {
    id: 1,
    brand: "JIADI",
    model: "JD16L Walking Diesel Tractor 16HP with Implements (Key Start)",
    category: "tractors",
    price: 260000,
    currency: "KES",
    badge: "BEST SELLER",
    badgeType: "badge-gold-crown",
    sku: "FM-JD-JD16L",
    rating: 0,
    reviewsCount: 0,
    hp: "16.0 HP",
    rpm: "2,200 RPM",
    cooling: "Water-Cooled Condenser / Radiator",
    starter: "Electric Key Start + Manual Crank Backup",
    displacement: "Approx. 1,100 cc (ZH1100 Series)",
    weight: "Approx. 350 kg",
    bullets: [
      "16 HP ZH1100-series diesel ploughs 1.5 - 2 acres per hour on roughly 2 litres of diesel per hour",
      "Approx. 350 kg frame holds traction in hard, compacted soil where lighter petrol tillers bounce",
      "Ships with disc ploughs, arrow ploughs, rotavators and iron wheels, with gear drive and reverse"
    ],
    specs: {
      "Brand / Model": "JIADI JD16L (ZH1100 / JD1100P Engine)",
      "Engine Type": "4-Stroke, Single-Cylinder Horizontal Water-Cooled Diesel",
      "Power Output": "16.0 HP",
      "Cooling System": "Water-Cooled Condenser / Radiator",
      "Starting System": "Electric Key Start, manual cranking on some packages",
      "Fuel Consumption": "Approx. 2 Litres of Diesel per Hour",
      "Transmission": "Full Gear-Driven Manual Gearbox, Multiple Forward Speeds (up to 15 km/h) + Reverse",
      "Weight": "Around 350 kg",
      "Working Capacity": "Ploughs 1.5 - 2 Acres per Hour (soil dependent)",
      "Implements Supplied": "Disc Ploughs, Arrow Ploughs, Rotavators and Iron Wheels"
    },
    images: [
      "images/jiadi-walking-tractor-16hp.jpg"
    ],
    description: "The JIADI JD16L is a heavy-duty 16 HP walking diesel tractor built for medium to large-scale farming. Its water-cooled ZH1100-series single-cylinder diesel sips roughly 2 litres per hour while ploughing 1.5 to 2 acres an hour, and the 350 kg frame gives it the downward traction to cut hard, compacted soil without bouncing. Delivered complete with disc ploughs, arrow ploughs, rotavators and iron wheels.",
    reviews: []
  },
  {
    id: 2,
    brand: "JIADI",
    model: "JD10L Walking Diesel Tractor 10HP",
    category: "tractors",
    price: 245000,
    currency: "KES",
    badge: "COMPACT POWER",
    badgeType: "badge-blue-star",
    sku: "FM-JD-JD10L",
    rating: 0,
    reviewsCount: 0,
    hp: "10.0 HP",
    cooling: "Water-Cooled (Air-Cooled on Heavy-Duty Variants)",
    starter: "Manual Recoil Crank / Optional Electric Start",
    weight: "Approx. 200 - 300 kg",
    bullets: [
      "10 HP horizontal diesel delivers the high torque for deep ploughing and tilling where petrol tillers stall",
      "Gear-driven transmission with multiple forward speeds plus reverse",
      "Supplied with both rubber tyres and iron traction wheels for road and field work"
    ],
    specs: {
      "Brand / Model": "JIADI JD10L",
      "Engine Type": "Single-Cylinder, 4-Stroke, Horizontal Diesel Engine",
      "Power Output": "10.0 HP",
      "Cooling System": "Water-Cooled (Air-Cooled on Heavy-Duty Variants)",
      "Starting Method": "Manual Recoil Crank, or Electric Start on Some Variants",
      "Transmission": "Gear-Driven, Multiple Forward Speeds + Reverse",
      "Wheels Supplied": "Rubber Tyres and Iron Traction Wheels",
      "Weight": "Approx. 200 - 300 kg (varies by attachments)"
    },
    images: [
      "images/jiadi-walking-tractor-10hp.jpg"
    ],
    description: "The JIADI JD10L is a heavy-duty walking tractor, also known as a power tiller, designed for small to medium-scale farming. Its 10 HP diesel engine handles the tough soil conditions that petrol models struggle with, producing the high torque needed for deep ploughing and tilling. Gear-driven transmission with reverse, and it comes with both rubber tyres and iron traction wheels.",
    reviews: []
  },
  {
    id: 3,
    brand: "JIADI",
    model: "JD-2000MH Walk-Behind Maize Harvester 16HP (192F Diesel, Key Start)",
    category: "harvesting",
    price: 203000,
    currency: "KES",
    badge: "HARVEST READY",
    badgeType: "badge-green-circle",
    sku: "FM-JD-JD2000MH",
    rating: 0,
    reviewsCount: 0,
    hp: "16.0 HP",
    starter: "Electric Key Start + Manual Recoil Backup",
    weight: "Approx. 250 - 280 kg",
    bullets: [
      "16 HP 192F diesel engine has the torque to push through heavy, fibrous maize stalks",
      "Walk-behind design with a harvesting width of roughly 600 - 800 mm for single-row work",
      "Gear drive with multiple speeds to suit varying crop density"
    ],
    specs: {
      "Brand / Model": "JIADI JD-2000MH",
      "Engine": "192F Single-Cylinder, 4-Stroke Diesel",
      "Power Output": "16.0 HP",
      "Starting System": "Electric Key Start with Manual Recoil Backup",
      "Transmission": "Gear Drive, Multiple Speeds for Varying Crop Density",
      "Harvesting Width": "Approx. 600 - 800 mm (single-row)",
      "Weight": "Approx. 250 - 280 kg"
    },
    images: [
      "images/jiadi-maize-harvester-16hp.jpg"
    ],
    description: "The JIADI JD-2000MH is a high-performance walk-behind maize harvester engineered for small to medium-sized corn fields. Its 16 HP 192F diesel engine is built to handle the heavy, fibrous nature of maize stalks that bog down lighter equipment, and the gear drive offers multiple speeds to match crop density.",
    reviews: []
  },
  {
    id: 4,
    brand: "Astramilano",
    model: "AMP50H2 High-Pressure Water Pump 2 inch (7.5 HP Petrol)",
    category: "pumps",
    price: 21000,
    currency: "KES",
    badge: "HIGH PRESSURE",
    badgeType: "badge-blue-star",
    sku: "FM-AST-AMP50H2",
    rating: 0,
    reviewsCount: 0,
    hp: "7.5 HP Petrol",
    capacity: "20,000 - 25,000 L/hr",
    weight: "2-Wheel Trolley Mounted",
    bullets: [
      "55 - 65 m total head, roughly double the 28 - 32 m of a standard pump",
      "Moves an estimated 20,000 - 25,000 litres per hour through 2 inch (50 mm) ports",
      "7 - 8 m suction depth with a closed-type high-pressure alloy impeller"
    ],
    specs: {
      "Brand / Model": "Astramilano AMP50H2 (High Pressure Series)",
      "Engine Power": "7.5 HP, 4-Stroke Petrol",
      "Inlet / Outlet": "2 inches (50 mm)",
      "Max Total Head": "55 - 65 Metres",
      "Max Flow Rate": "Approx. 20,000 - 25,000 Litres per Hour",
      "Suction Depth": "7 - 8 Metres",
      "Impeller": "Closed-Type High-Pressure Alloy"
    },
    images: [
      "images/astramilano-water-pump-7-5hp.jpg"
    ],
    description: "The Astramilano AMP50H2 is a high-pressure 2 inch water pump built for irrigation and water transfer where a standard pump cannot reach. Running a 7.5 HP four-stroke petrol engine, it delivers a 55 to 65 metre total head against the 28 to 32 metres of a typical pump, moving an estimated 20,000 to 25,000 litres per hour with a 7 to 8 metre suction depth.",
    reviews: []
  },
  {
    id: 5,
    brand: "Milano Italia",
    model: "MCC-300 High-Speed Chopper 800 - 1,200 kg/hr (7.5 HP)",
    category: "processing",
    price: 33000,
    currency: "KES",
    badge: "FEED PROCESSING",
    badgeType: "badge-gold-crown",
    sku: "FM-MIL-MCC300",
    rating: 0,
    reviewsCount: 0,
    hp: "7.5 HP Petrol",
    capacity: "800 - 1,200 kg/hr",
    bullets: [
      "Cuts 800 - 1,200 kg per hour depending on material and feeding rate",
      "Hardened steel blades slice cleanly rather than crush, keeping fodder palatable",
      "Belt-driven for a safety buffer if the blades strike a hard object"
    ],
    specs: {
      "Brand / Model": "Milano Italia MCC-300",
      "Capacity": "800 - 1,200 kg/hr (material and feed-rate dependent)",
      "Engine": "7.5 HP Petrol, 4-Stroke Air-Cooled",
      "Cutting Mechanism": "High-Speed Hardened Steel Blades (3 - 4 blades)",
      "Drive System": "Belt-Driven"
    },
    images: [
      "images/milano-high-speed-chopper-7-5hp.jpg"
    ],
    description: "The Milano Italia MCC-300 is a high-speed chopper that turns fodder, maize stalks and crop residue into feed at 800 to 1,200 kg per hour. Hardened steel blades slice cleanly rather than crush so the fodder stays palatable, and the belt drive provides a safety buffer if the blades strike a hard object.",
    reviews: []
  },
  {
    id: 6,
    brand: "Milano Italia",
    model: "PT1500 Pellet Machine with 5HP Motor (100 - 200 kg/hr)",
    category: "processing",
    price: 64000,
    currency: "KES",
    badge: "PELLET PRESS",
    badgeType: "badge-blue-star",
    sku: "FM-MIL-PT1500",
    rating: 0,
    reviewsCount: 0,
    hp: "5.0 HP Electric Motor",
    capacity: "100 - 200 kg/hr",
    weight: "Approx. 100 - 130 kg",
    bullets: [
      "Produces 100 - 200 kg of pellets per hour on a flat-die system",
      "Adjustable 2 mm - 8 mm pellet size via interchangeable die plates",
      "Runs on a 5 HP electric motor, single or three-phase"
    ],
    specs: {
      "Brand / Model": "Milano Italia PT1500",
      "Motor Power": "5 HP Electric",
      "Power Source": "Electric (single or 3-phase options)",
      "Production Capacity": "100 - 200 kg per Hour",
      "Pellet Size": "2 mm - 8 mm, adjustable via die plate",
      "Mechanism": "Flat Die System",
      "Machine Weight": "Approx. 100 - 130 kg"
    },
    images: [
      "images/milano-pellet-machine-5hp.jpg"
    ],
    description: "The PT1500 Milano Italia pellet machine is a heavy-duty, entry-level industrial unit that converts raw organic material into compact pellets. Paired with a 5 HP electric motor it produces 100 to 200 kg per hour with adjustable 2 mm to 8 mm pellet dies, making it a practical fit for small to medium poultry farms and biomass fuel production.",
    reviews: []
  },
  {
    id: 7,
    brand: "Aico Japan",
    model: "YDH002 Double Barrel Milking Machine (2 x 25L)",
    category: "dairy",
    price: 66000,
    currency: "KES",
    badge: "DAIRY PRO",
    badgeType: "badge-green-circle",
    sku: "FM-AIC-YDH002",
    rating: 0,
    reviewsCount: 0,
    hp: "1.1 kW Electric Motor",
    capacity: "2 x 25 Litres",
    weight: "Stainless Steel 304 Buckets",
    bullets: [
      "Two buckets and two clusters let one operator milk two cows at once",
      "Milks 20 - 25 cows per hour with 180 - 240 litres/min vacuum capacity",
      "304 food-grade stainless steel buckets, 2 x 25 litres"
    ],
    specs: {
      "Brand / Model": "Aico Japan YDH002 (Double Barrel / Dual Canister)",
      "Motor Power": "0.75 - 1.1 kW High-Torque Motor",
      "Bucket Capacity": "2 x 25 Litres (50 L total)",
      "Bucket Material": "304 Food-Grade Stainless Steel",
      "Milking Speed": "20 - 25 Cows per Hour",
      "Vacuum Capacity": "180 - 240 Litres/min",
      "Pulsation": "Dual Pneumatic Pulsators, adjustable 60/40"
    },
    images: [
      "images/aico-milking-machine.jpg"
    ],
    description: "The Aico Japan YDH002 is the heavy-duty double barrel milking machine for medium to large dairy operations. Two buckets and two milking clusters run simultaneously, letting a single operator milk two cows at once and cutting the total time spent in the parlour. It milks 20 to 25 cows per hour, with 304 food-grade stainless steel buckets holding 2 x 25 litres.",
    reviews: []
  },
  {
    id: 8,
    brand: "Aico Japan",
    model: "AC608 Petrol Trolley Sprayer 60 Litres",
    category: "sprayers",
    price: 49000,
    currency: "KES",
    badge: "ORCHARD SPRAYER",
    badgeType: "badge-blue-star",
    sku: "FM-AIC-AC608",
    rating: 0,
    reviewsCount: 0,
    hp: "8.0 HP Petrol",
    capacity: "60 Litre Tank",
    weight: "2-Wheel Steel Trolley",
    bullets: [
      "60 litre tank balances light weight with a professional petrol piston pump",
      "Triple cylinder piston pump delivers 20 - 35 bar (approx. 300 - 500 PSI)",
      "50 m hose with up to 15 m horizontal and 10 m vertical reach"
    ],
    specs: {
      "Brand / Model": "Aico Japan AC608",
      "Tank Capacity": "60 Litres",
      "Engine Options": "8.0 HP standard high-pressure config, or 6.5 HP",
      "Hose Length": "50 Metres, High-Pressure Reinforced",
      "Pump Type": "Triple Cylinder Piston Pump",
      "Pressure Output": "20 - 35 bar (approx. 300 - 500 PSI)",
      "Reach": "Up to 15 m horizontal, up to 10 m vertical",
      "Mobility": "2-Wheel Steel Trolley with Pneumatic Tyres"
    },
    images: [
      "images/aico-trolley-sprayer-60l.jpg"
    ],
    description: "The Aico Japan AC608 is a compact, high-mobility trolley sprayer with a 60 litre tank. It is light enough to manoeuvre through tight rows in greenhouses and small vegetable plots, while still running a professional petrol-powered triple cylinder piston pump that delivers 20 to 35 bar through 50 metres of hose.",
    reviews: []
  },
  {
    id: 9,
    brand: "Aico Japan",
    model: "AC840PS Trolley Sprayer 8HP with Hose Reel",
    category: "sprayers",
    price: 27000,
    currency: "KES",
    badge: "ALL-IN-ONE",
    badgeType: "badge-gold-crown",
    sku: "FM-AIC-AC840PS",
    rating: 0,
    reviewsCount: 0,
    hp: "8.0 HP Petrol",
    capacity: "50 - 100 m Hose",
    weight: "Reinforced Industrial Trolley",
    bullets: [
      "Integrated manual-crank hose reel prevents kinking and puncture damage",
      "Adjustable pressure up to 50 bar (approx. 725 PSI) with 20 - 35 L/min suction",
      "Reinforced trolley frame with large wheels for muddy, uneven fields"
    ],
    specs: {
      "Brand / Model": "Aico Japan AC840PS (Professional Series)",
      "Engine": "8.0 HP Petrol, 4-Stroke OHV",
      "Pump": "Heavy-Duty Triplex Piston Pump with Brass Manifold",
      "Hose Reel": "Manual-Crank Reel Mounted to the Trolley Frame",
      "Hose Pipe": "Standard 50 m or 100 m High-Pressure Agricultural Hose",
      "Pressure Output": "Adjustable up to 50 bar (approx. 725 PSI)",
      "Suction Rate": "20 - 35 Litres per Minute",
      "Trolley": "Reinforced Industrial Frame with Large Wheels"
    },
    images: [
      "images/aico-trolley-sprayer-8hp.jpg"
    ],
    description: "The Aico Japan AC840PS is the premium all-in-one configuration in the Aico spraying line. It shares the 8 HP petrol engine and triplex piston pump of the AC835PS, but adds an integrated hose reel that makes single-operator work far more efficient and removes the most common cause of hose damage: kinking and accidental puncture.",
    reviews: []
  },
  {
    id: 10,
    brand: "Dera",
    model: "2-Stroke Brush Cutter (Nylon Head & Metal Blade)",
    category: "cutters",
    price: 12500,
    currency: "KES",
    badge: "FIELD CLEARING",
    badgeType: "badge-green-circle",
    sku: "FM-DER-BC2S",
    rating: 0,
    reviewsCount: 0,
    hp: "1.45 - 1.65 kW (2-Stroke)",
    weight: "Handheld / Shoulder Harness",
    bullets: [
      "Air-cooled 2-stroke petrol engine, typically 35.8 cc to 52 cc displacement",
      "Runs on pre-mixed petrol and 2-stroke oil",
      "Takes nylon trimmer heads for grass and metal blades for tough weeds and bushes"
    ],
    specs: {
      "Brand / Model": "Dera 2-Stroke Brush Cutter",
      "Engine Type": "2-Stroke, Air-Cooled Petrol",
      "Displacement": "Typically 35.8 cc - 52 cc depending on engine size",
      "Power Output": "Typically 1.45 kW - 1.65 kW",
      "Fuel System": "Pre-Mixed Petrol and 2-Stroke Oil",
      "Cutting Attachments": "Nylon Trimmer Heads for Grass, Metal Blades for Tough Weeds and Bushes"
    },
    images: [
      "images/dera-brush-cutter.jpg"
    ],
    description: "The Dera 2-stroke brush cutter is a light, air-cooled petrol clearing tool for grass, weeds and scrub. It accepts nylon trimmer heads for grass and metal blades for tougher weeds and bushes, and runs on pre-mixed petrol and 2-stroke oil.",
    reviews: []
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
let searchQuery = "";
let currentSort = "default";

function getFilteredAndSortedProducts() {
  let list = PRODUCTS_DATA.filter(item => {
    if (currentCategory !== "all" && item.category !== currentCategory) return false;

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

  if (currentSort === "price-asc") {
    list.sort((a, b) => toSiteCurrency(a.price, a.currency) - toSiteCurrency(b.price, b.currency));
  } else if (currentSort === "price-desc") {
    list.sort((a, b) => toSiteCurrency(b.price, b.currency) - toSiteCurrency(a.price, a.currency));
  } else if (currentSort === "rating-desc") {
    list.sort((a, b) => b.rating - a.rating);
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
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: 8px; border: 1px dashed #CBD5E1;">
        <div style="font-size: 40px; margin-bottom: 10px;">🔍</div>
        <h3>No matching machinery systems found</h3>
        <p style="color: #64748B; font-size: 13.5px; margin-bottom: 16px;">Try adjusting your search keywords or category filters.</p>
        <button class="flyer-add-cart-btn" style="display:inline-flex; width: auto; padding: 8px 20px; margin: 0 auto;" onclick="resetFilters()">View All Systems</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const cardQty = getCardQty(item.id);
    const bulletsHtml = (item.bullets || []).slice(0, 2)
      .map(b => `<li><span class="bullet-dot">✓</span> ${b}</li>`)
      .join("");

    return `
      <div class="flyer-product-card" data-id="${item.id}">
        <span class="flyer-badge ${item.badgeType}">${item.badge}</span>
        
        <a href="product.html?id=${item.id}" class="flyer-card-media-link" title="View ${item.model} Specifications">
          <div class="flyer-card-media">
            <img 
              src="${item.images[0]}" 
              alt="${item.brand} ${item.model}" 
              class="flyer-product-image"
              loading="lazy"
              onerror="this.onerror=null; this.src='images/hero_banner.jpg';"
            />
          </div>
        </a>

        <div class="flyer-card-info">
          <a href="product.html?id=${item.id}" class="flyer-card-title-link">
            <div class="flyer-card-title">
              <span class="brand-bold">${item.brand}</span>
              <span class="model-line">${item.model}</span>
            </div>
          </a>

          ${item.reviewsCount > 0 ? `
          <div class="card-stars-row">
            <span class="stars-gold">★★★★★</span>
            <span class="rating-val">${item.rating}</span>
            <span class="review-count-pill">(${item.reviewsCount})</span>
          </div>` : `
          <div class="card-stars-row">
            <span style="font-size: 11.5px; color: #94A3B8; font-weight: 700;">Be the first to review</span>
          </div>`}

          <ul class="flyer-card-bullets">
            ${bulletsHtml}
          </ul>

          <div class="flyer-price-row">
            <span class="price-sublabel">Dealer Direct:</span>
            <span class="price-main">${formatMoney(item.price, item.currency)}</span>
          </div>

          <div class="flyer-card-actions">
            <div class="flyer-stepper">
              <button class="stepper-btn minus" onclick="stepCardQty(${item.id}, -1)">−</button>
              <span class="stepper-val" id="cardQty-${item.id}">${cardQty}</span>
              <button class="stepper-btn plus" onclick="stepCardQty(${item.id}, 1)">+</button>
            </div>

            <button class="flyer-add-cart-btn" onclick="addCardQtyToCart(${item.id})">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>Add to Cart</span>
            </button>
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
      price: toSiteCurrency(prod.price, prod.currency),
      currency: SITE_CURRENCY,
      image: prod.images[0],
      hp: prod.hp,
      specs: prod.hp || "",
      quantity: qty
    });
  }

  saveCart();
  triggerToast(`Added ${qty} × "${prod.model}" to cart!`);
  openCart();
}

function resetFilters() {
  currentCategory = "all";
  searchQuery = "";
  currentSort = "default";

  document.querySelectorAll(".flyer-cat-item").forEach(c => c.classList.remove("active"));
  const allChip = document.querySelector('.flyer-cat-item[data-category="all"]');
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
      <div style="text-align: center; padding: 40px 16px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🛒</div>
        <h4 style="font-size: 16px; margin-bottom: 6px;">Your Equipment Cart is Empty</h4>
        <p style="font-size: 13px; color: #64748B; margin-bottom: 16px;">Select diesel engines, power tillers, or pump accessories to begin.</p>
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
          <div class="cart-item-price">${formatMoney(item.price, item.currency || SITE_CURRENCY)}</div>
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

  const shippingFee = freightFeeFor(subtotal);
  const total = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal, SITE_CURRENCY);
  if (totalEl) totalEl.textContent = formatMoney(total, SITE_CURRENCY);

  const shippingNote = document.getElementById("shippingNoticeText");
  if (shippingNote) {
    if (shippingFee === 0) {
      shippingNote.innerHTML = `✅ <b>Free Freight & Wooden Crate Packing</b> applied!`;
    } else {
      shippingNote.innerHTML = `Add ${formatMoney(freeFreightShortfall(subtotal), SITE_CURRENCY)} more for <b>Free Crated Freight Shipping</b>!`;
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
// CHECKOUT MODAL
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
      <div style="display: flex; justify-content: space-between; font-size: 12.5px; padding: 4px 0; border-bottom: 1px dashed #F1F5F9;">
        <div><b>${item.name}</b> × ${item.quantity}</div>
        <div style="font-weight: 700;">${formatMoney(itemTotal, SITE_CURRENCY)}</div>
      </div>
    `;
  }).join("");

  const shippingFee = freightFeeFor(subtotal);
  const total = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal, SITE_CURRENCY);
  if (shippingEl) shippingEl.textContent = shippingFee === 0 ? "Free Shipping" : formatMoney(shippingFee, SITE_CURRENCY);
  if (totalEl) totalEl.textContent = formatMoney(total, SITE_CURRENCY);
  if (qrTotalEl) qrTotalEl.textContent = formatMoney(total, SITE_CURRENCY);
}

// Handle Order Form Submission
async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("custName");
  const phoneInput = document.getElementById("custPhone");
  const emailInput = document.getElementById("custEmail");
  const streetInput = document.getElementById("custStreet");
  const cityInput = document.getElementById("custDistrict");
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
  const customerCity = cityInput ? cityInput.value.trim() : "";
  const customerProvince = provinceInput ? provinceInput.value : "General";
  const customerNotes = notesInput ? notesInput.value.trim() : "";
  const deliverySpeed = speedSelect ? speedSelect.value : "Palletized Freight Linehaul Courier";
  const paymentMethod = paymentSelect ? paymentSelect.value : "Inspection on Delivery (COD) / Carrier Escrow";

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Please fill in your Full Name, Phone / WhatsApp, and Delivery Address!");
    return;
  }

  let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let shipping = freightFeeFor(subtotal);
  let total = subtotal + shipping;

  const orderId = "FM-" + Math.floor(100000 + Math.random() * 900000);
  const trackingCode = "FM-FREIGHT-" + orderId.slice(-4);

  const orderData = {
    id: orderId,
    order_number: orderId,
    trackingCode: trackingCode,
    currency: SITE_CURRENCY,
    customerName,
    customerPhone,
    customerEmail,
    customerAddress,
    customerCity,
    customerProvince,
    customerNotes,
    deliverySpeed,
    paymentMethod,
    items: [...cart],
    subtotal,
    shipping,
    total,
    status: "Pending (Workshop Run-Test)",
    createdAt: new Date().toISOString()
  };

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Processing Machinery Order...</span>`;
  }

  saveUserOrderLocally(orderData);

  // Background dispatch
  try {
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "order",
        order: orderData
      })
    }).catch(() => {});
  } catch (e) {}

  cart = [];
  saveCart();
  closeCheckoutModal();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>CONFIRM MACHINERY PURCHASE</span>`;
  }

  showOrderSuccessModal(orderData);
}

function saveUserOrderLocally(order) {
  try {
    const key = "thanhdat_user_orders";
    const existing = localStorage.getItem(key);
    const list = existing ? JSON.parse(existing) : [];
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
  if (totalEl) totalEl.textContent = formatMoney(order.total, order.currency || SITE_CURRENCY);
  if (trackCodeEl) trackCodeEl.textContent = order.trackingCode;

  modal.classList.add("active");
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
    alert("Please enter your Order Reference (e.g., FM-123456) or Phone Number!");
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
        <p style="font-size: 13px;">Please verify your order number or phone. You can also call us directly at <b>+254 795 365 461</b>.</p>
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

      <div class="tracking-meta-grid">
        <div><b>Customer:</b> ${found.customerName} (${found.customerPhone})</div>
        <div><b>Destination:</b> ${found.customerAddress}, ${found.customerProvince || ''}</div>
        <div><b>Freight Method:</b> ${found.deliverySpeed || 'Express Freight Courier'}</div>
        <div><b>Total Amount:</b> <span style="color: #15803D; font-weight: 800;">${formatMoney(found.total, found.currency || SITE_CURRENCY)}</span></div>
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
        <a href="tel:+254795365461" style="display: inline-block; background: #15803D; color: #FFFFFF; padding: 9px 18px; border-radius: 6px; font-size: 13px; font-weight: 700;">📞 Call Workshop Direct: +254 795 365 461</a>
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
  renderCatalog();

  // Category flyer items
  document.querySelectorAll(".flyer-cat-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".flyer-cat-item").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      currentCategory = item.getAttribute("data-category") || "all";
      renderCatalog();
    });
  });

  // Search input
  const searchInput = document.getElementById("machinerySearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Sort select
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

  // Checkout
  const checkoutBtn = document.getElementById("proceedCheckoutBtn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", openCheckoutModal);

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
