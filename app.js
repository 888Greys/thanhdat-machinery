// ==========================================================================
// TU THANH MACHINERY
// Premier E-Commerce Platform for Diesel Engines, Tillers, Pumps & Marine Equipment
// ==========================================================================

const SUPABASE_URL = "https://munbteqhjgwoxebguqdl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bmJ0ZXFoamd3b3hlYmd1cWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzM1ODYsImV4cCI6MjA5NjE0OTU4Nn0.tYvdCKxpC6OEWYGhCaOwJbSDimxoHBbbX-CyMR0j59s";

const supabaseClient = (typeof window !== "undefined" && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ==========================================================================
// CURRENCY
// Every product is priced in its own native `currency` (USD unless stated).
// The visitor's country decides how prices are displayed, so a Kenyan
// visitor always sees Kenya Shillings. Update FX_PER_USD.KES when the rate moves.
// ==========================================================================
const FX_PER_USD = {
  USD: 1,
  KES: 129
};

const COUNTRY_CURRENCY = {
  KE: "KES"
};

const CURRENCY_DISPLAY = {
  USD: { prefix: "$", suffix: " USD" },
  KES: { prefix: "KSh ", suffix: "" }
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
    if (timeZone.indexOf("Africa/Nairobi") === 0) return "KES";
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

// 16 Curated Machinery Catalog Items
const PRODUCTS_DATA = [
  {
    id: 1,
    brand: "Kubota",
    model: "Kubota RT140 Plus Radiator Cooled Diesel Engine (14.0 HP)",
    category: "engines",
    price: 1060,
    badge: "BEST SELLER",
    badgeType: "badge-gold-crown",
    sku: "TTM-KUB-RT140",
    hp: "14.0 HP",
    rpm: "2,400 RPM",
    rating: 4.9,
    reviewsCount: 14,
    cooling: "Forced Radiator Circulation",
    starter: "Decompression Hand Crank / 12V E-Start Ready",
    displacement: "709 cc",
    weight: "253 lbs (115 kg)",
    fuelTank: "2.9 Gal (11 L)",
    bullets: [
      "14.0 HP high torque output with patented TVCS swirl combustion chamber",
      "Heavy-duty aluminum radiator ensures continuous non-stop operation under peak loads",
      "Ideal for 2-wheel walk-behind tillers, irrigation pumps, and marine long-tail boats"
    ],
    specs: {
      "Manufacturer": "Kubota Corporation (Factory Import)",
      "Engine Type": "4-Stroke, 1-Cylinder Horizontal Diesel, Radiator-Cooled",
      "Continuous Rating": "12.5 HP @ 2,400 RPM",
      "Maximum Output": "14.0 HP @ 2,400 RPM",
      "Displacement": "709 cc (Bore: 97 mm × Stroke: 96 mm)",
      "Cooling System": "High-Efficiency Radiator with Forced Circulation Fan",
      "Lubrication": "Trochoid Oil Pump Forced Feed + Splash",
      "Fuel Tank Capacity": "11.0 Liters (Diesel No. 2-D)",
      "Dry Weight": "115 kg (Heavy-Duty Cast Iron Engine Frame)",
      "Warranty": "24-Month Official Warranty with Factory Service Book"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Kubota RT140 Plus is a legendary workhorse recognized by agricultural contractors, commercial farmers, and long-tail boat operators worldwide. Engineered with Kubota's Three Vortex Combustion System (TVCS), it extracts maximum kinetic energy from every drop of fuel while maintaining clean exhaust, low vibration, and exceptional torque.",
    reviews: [
      { id: "r101", author: "David Henderson", location: "Midwest Farm Depot", rating: 5, date: "2 days ago", title: "Phenomenal torque on our rotary tiller", content: "Mounted this RT140 onto our 2-wheel power tiller for heavy spring tilling. Engine starts smoothly, throttles up immediately, and runs cool through 9 hours of continuous operation.", helpful: 24, liked: false },
      { id: "r102", author: "Robert M.", location: "River Marine Works", rating: 5, date: "5 days ago", title: "Flawless power for long-tail boat setup", content: "Paired with a 12.5ft stainless shaft and brass propeller. Carries cargo upstream with zero hesitation. Extremely economical on diesel fuel.", helpful: 18, liked: false }
    ]
  },
  {
    id: 2,
    brand: "Yanmar",
    model: "Yanmar TF120-DI Direct Injection Diesel Engine (12.0 HP)",
    category: "engines",
    price: 899,
    badge: "TOP EFFICIENCY",
    badgeType: "badge-blue-star",
    sku: "TTM-YAN-TF120",
    hp: "12.0 HP",
    rpm: "2,400 RPM",
    rating: 4.8,
    reviewsCount: 11,
    cooling: "Forced Radiator & Fan Cooling",
    starter: "Assisted Decompression Hand Crank",
    displacement: "638 cc",
    weight: "225 lbs (102 kg)",
    fuelTank: "2.7 Gal (10.5 L)",
    bullets: [
      "Direct Injection (DI) high-pressure atomization delivers class-leading fuel economy",
      "Effortless hand-crank startup equipped with automatic decompression lever",
      "Standard choice for agricultural irrigation pumps, generators, and workboats"
    ],
    specs: {
      "Manufacturer": "Yanmar Co., Ltd.",
      "Engine Model": "TF120-DI Commercial Diesel",
      "Maximum Output": "12.0 HP @ 2,400 RPM",
      "Combustion System": "Multi-Hole High-Pressure Direct Injection",
      "Displacement": "638 cc",
      "Cooling": "Water Radiator with Blower Fan",
      "Net Weight": "102 kg",
      "Warranty": "24-Month Factory Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Yanmar's TF120-DI engine delivers unmatched fuel efficiency through its advanced Direct Injection chamber. The chrome-plated piston rings and heat-treated cylinder liner ensure over a decade of dependable daily service.",
    reviews: [
      { id: "r201", author: "James Sullivan", location: "Coastal Irrigation", rating: 5, date: "3 days ago", title: "Remarkably low fuel consumption", content: "Hooked to a 4.5-inch water pump running all morning. Barely consumed 1.5 gallons of diesel.", helpful: 21, liked: false }
    ]
  },
  {
    id: 3,
    brand: "Kubota",
    model: "Kubota RT155 Plus DI Electric Key Start Diesel Engine (15.5 HP)",
    category: "engines",
    price: 1180,
    badge: "1-TOUCH E-START",
    badgeType: "badge-green-circle",
    sku: "TTM-KUB-RT155DE",
    hp: "15.5 HP",
    rpm: "2,400 RPM",
    rating: 5.0,
    reviewsCount: 16,
    cooling: "Honeycomb Aluminum Radiator",
    starter: "12V Electric Key Starter + Emergency Hand Crank",
    displacement: "753 cc",
    weight: "268 lbs (122 kg)",
    fuelTank: "3.0 Gal (11.5 L)",
    bullets: [
      "Heavy-duty 12V gear-reduction starter motor with key ignition panel",
      "15.5 HP maximum output with high-pressure Direct Injection torque",
      "Built-in automatic 40A charging alternator maintains battery during operation"
    ],
    specs: {
      "Manufacturer": "Kubota Siam",
      "Model": "RT155 Plus DI E-Start Edition",
      "Rated Power": "15.5 HP @ 2,400 RPM",
      "Starting System": "12V Heavy-Duty Starter + Manual Backup Crank",
      "Displacement": "753 cc",
      "Weight": "122 kg",
      "Warranty": "24 Months (Full Coverage on Starter & Block)"
    },
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The premier tier of the Kubota horizontal diesel family. The RT155 Plus DI features a turnkey 12V starter system, eliminating manual cranking fatigue while delivering 15.5 horsepower of unstoppable pull.",
    reviews: [
      { id: "r301", author: "Arthur Pendelton", location: "Valley Agri Co-op", rating: 5, date: "Yesterday", title: "Turn of the key and it fires up", content: "Electric start is a lifesaver. One turn of the key and the 15.5 HP diesel roars to life.", helpful: 30, liked: false }
    ]
  },
  {
    id: 4,
    brand: "Yanmar",
    model: "Yanmar TF160-DI Heavy-Duty Marine & Utility Diesel Engine (16.0 HP)",
    category: "engines",
    price: 1250,
    badge: "HEAVY MARINE",
    badgeType: "badge-gold-crown",
    sku: "TTM-YAN-TF160",
    hp: "16.0 HP",
    rpm: "2,400 RPM",
    rating: 4.9,
    reviewsCount: 13,
    cooling: "Forced Radiator with High-CFM Blower",
    starter: "Dual Hand Crank & Electric Starter Ready",
    displacement: "845 cc",
    weight: "297 lbs (135 kg)",
    fuelTank: "3.2 Gal (12 L)",
    bullets: [
      "Massive 845cc single cylinder displacement produces monstrous low-end torque",
      "Marine-grade corrosion resistant electrostatic powder coat finish",
      "Preferred powerhouse for multi-ton transport vessels and commercial irrigation"
    ],
    specs: {
      "Manufacturer": "Yanmar Corporation",
      "Model": "TF160-DI Marine Heavy-Duty",
      "Peak Output": "16.0 HP @ 2,400 RPM",
      "Bore × Stroke": "102 mm × 105 mm",
      "Displacement": "845 cc",
      "Net Weight": "135 kg",
      "Warranty": "24 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Yanmar TF160-DI boasts an oversized 102mm cylinder bore generating colossal compression and turning moment.",
    reviews: [
      { id: "r401", author: "Capt. Michael Ross", location: "Harbor Freight Logistics", rating: 5, date: "4 days ago", title: "Unbeatable pulling power on cargo boats", content: "Pushes our 4-ton cargo barge through strong currents without breaking a sweat.", helpful: 19, liked: false }
    ]
  },
  {
    id: 5,
    brand: "Kubota",
    model: "Kubota RT125 Standard Farm Diesel Engine (12.5 HP)",
    category: "engines",
    price: 875,
    badge: "WORKHORSE",
    badgeType: "badge-blue-star",
    sku: "TTM-KUB-RT125",
    hp: "12.5 HP",
    rpm: "2,400 RPM",
    rating: 4.8,
    reviewsCount: 12,
    cooling: "Radiator / Condenser Cooling System",
    starter: "Assisted Decompression Hand Crank",
    displacement: "624 cc",
    weight: "216 lbs (98 kg)",
    fuelTank: "2.6 Gal (10 L)",
    bullets: [
      "The most widely adopted 12.5 HP agricultural diesel engine in history",
      "Rock-solid cast-iron reliability with universally accessible replacement parts",
      "Fast ROI for smallholders, greenhouse setups, and emergency water extraction"
    ],
    specs: {
      "Manufacturer": "Kubota Thailand",
      "Model": "RT125 Standard Farm Edition",
      "Output": "12.5 HP @ 2,400 RPM",
      "Displacement": "624 cc",
      "Net Weight": "98 kg",
      "Warranty": "24 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Kubota RT125 is the quintessential balance between power, portability, and bulletproof mechanical simplicity.",
    reviews: [
      { id: "r501", author: "Gregory Shaw", location: "Prairie Agro Systems", rating: 5, date: "1 week ago", title: "Unstoppable little engine", content: "Solid cast iron design that simply does not quit.", helpful: 12, liked: false }
    ]
  },
  {
    id: 6,
    brand: "John Deere",
    model: "John Deere Heavy Agri Power Unit (22.0 HP Industrial Diesel)",
    category: "engines",
    price: 1680,
    badge: "USA STANDARD",
    badgeType: "badge-green-circle",
    sku: "TTM-JD-AGRI22",
    hp: "22.0 HP",
    rpm: "2,600 RPM",
    rating: 5.0,
    reviewsCount: 9,
    cooling: "Triple-Core Heavy-Duty Copper Radiator",
    starter: "IP67 Sealed Electric Solenoid Starter",
    displacement: "1,100 cc",
    weight: "363 lbs (165 kg)",
    fuelTank: "4.0 Gal (15 L)",
    bullets: [
      "Heavy industrial grade John Deere power unit rated for 24/7 continuous duty",
      "Triple-core high-capacity copper radiator designed for scorching climate zones",
      "Dedicated power pack for 10kVA generators, timber winches, and large aqua pumps"
    ],
    specs: {
      "Manufacturer": "John Deere Power Systems",
      "Peak Output": "22.0 HP @ 2,600 RPM",
      "Displacement": "1,100 cc",
      "Weight": "165 kg",
      "Warranty": "36-Month Industrial Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Built to North American heavy-equipment specifications, the John Deere 22 HP power unit provides continuous stationary muscle.",
    reviews: [
      { id: "r601", author: "Marcus Thorne", location: "Blue Basin Aquaculture", rating: 5, date: "3 weeks ago", title: "Runs aerators all night without a drop in RPM", content: "Zero overheating and smooth governors.", helpful: 26, liked: false }
    ]
  },
  {
    id: 7,
    brand: "Vikyno",
    model: "Vikyno RV125-2 Water-Cooled Commercial Diesel Engine (12.5 HP)",
    category: "engines",
    price: 699,
    badge: "ECONOMY PRO",
    badgeType: "badge-blue-star",
    sku: "TTM-VIK-RV125",
    hp: "12.5 HP",
    rpm: "2,200 RPM",
    rating: 4.7,
    reviewsCount: 10,
    cooling: "Thermosiphon Water Circulation",
    starter: "Assisted Hand Crank",
    displacement: "630 cc",
    weight: "231 lbs (105 kg)",
    bullets: [
      "Manufactured under licensed Yanmar Japan commercial engineering standards",
      "Unbeatable cost-to-performance ratio for cost-conscious farm operators",
      "Standardized bolt patterns accept generic pulleys, gearboxes, and chassis"
    ],
    specs: {
      "Manufacturer": "Vikyno Engine Machinery Co.",
      "Output": "12.5 HP @ 2,200 RPM",
      "Warranty": "18-Month Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Vikyno RV125-2 brings reliable water-cooled single-cylinder diesel engineering into an economical price bracket.",
    reviews: [
      { id: "r701", author: "Samuel O'Connor", location: "Homestead Machinery", rating: 5, date: "1 month ago", title: "Great value and solid performance", content: "Punches well above its weight.", helpful: 11, liked: false }
    ]
  },
  {
    id: 8,
    brand: "Tu Thanh",
    model: "All-Terrain 2-Wheel Walk-Behind Power Tiller Kit (with Kubota RT140 Engine)",
    category: "tillers",
    price: 1540,
    badge: "COMPLETE TILLER",
    badgeType: "badge-gold-crown",
    sku: "TTM-TILL-FULL140",
    hp: "14.0 HP Kubota RT140",
    rpm: "6 Forward / 2 Reverse",
    rating: 5.0,
    reviewsCount: 15,
    cooling: "Radiator",
    starter: "Key Electric Start + Backup Crank",
    weight: "540 lbs (245 kg)",
    bullets: [
      "Includes reinforced chassis, genuine Kubota RT140 diesel engine, and 18-blade rotary tiller",
      "Power steering clutch with differential lock prevents bogging in deep mud and clay",
      "Includes rear sulky seat attachment for comfortable all-day field operation"
    ],
    specs: {
      "Configuration": "Tu Thanh Tiller Frame + Kubota RT140 Plus Diesel Engine",
      "Tillage Width": "850 mm - 1,100 mm",
      "Warranty": "24 Months Full Coverage"
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The complete heavy-duty walking tractor setup. Chews through dense turf, wet paddy mud, and dry clay easily.",
    reviews: [
      { id: "r801", author: "Thomas Briggs", location: "Meadowlands Cultivators", rating: 5, date: "2 days ago", title: "Effortless tillage in heavy soil", content: "The cage wheels keep it floating through soaked clay fields.", helpful: 28, liked: false }
    ]
  },
  {
    id: 9,
    brand: "Tu Thanh",
    model: "Heavy-Duty 2-Wheel Cultivator Chassis & Rotary Tiller Frame (No Engine)",
    category: "tillers",
    price: 580,
    badge: "HEAVY CHASSIS",
    badgeType: "badge-blue-star",
    sku: "TTM-FRAME-PRO",
    hp: "Fit 10 - 18 HP",
    rating: 4.8,
    reviewsCount: 8,
    bullets: [
      "Pressed structural steel beam construction withstands aggressive soil impacts",
      "Dual sealed Japanese roller bearings and quick-disconnect steering handles",
      "Pre-drilled universal motor mounts fit Kubota RT, Yanmar TF, and Vikyno engines"
    ],
    specs: {
      "Manufacturer": "Tu Thanh Machinery Workshop",
      "Warranty": "36 Months on Structural Chassis and Gearbox"
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Designed for operators who already own a diesel engine and want to upgrade their walking tractor frame.",
    reviews: [
      { id: "r901", author: "Elijah Wright", location: "Wright Farm Works", rating: 5, date: "1 week ago", title: "Heavy steel and zero vibrations", content: "Bolted right in without modification.", helpful: 14, liked: false }
    ]
  },
  {
    id: 10,
    brand: "Kubota/Tu Thanh",
    model: "High-Volume Agricultural Diesel Water Pump Set 4.5\" (120-150 m³/h)",
    category: "pumps",
    price: 1150,
    badge: "MASSIVE FLOW",
    badgeType: "badge-gold-crown",
    sku: "TTM-PUMP-114",
    hp: "12.5 HP Kubota RT125",
    capacity: "530 - 660 GPM",
    rating: 4.9,
    reviewsCount: 13,
    bullets: [
      "High discharge rate of 120-150 m³/hr for rapid flood control and large-scale irrigation",
      "Reinforced cast-iron housing with dynamic cast-bronze pressure impeller",
      "Trailer skid with 4 pneumatic rubber transport wheels for convenient canal movement"
    ],
    specs: {
      "Engine": "Kubota RT125 Official Diesel Engine",
      "Flow Rate": "120 - 150 m³/hr",
      "Warranty": "24 Months Full System Coverage"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Engineered for agricultural irrigation, flood drainage, and commercial aquaculture.",
    reviews: [
      { id: "r1001", author: "Harvey Cole", location: "Cole River Basin Dist.", rating: 5, date: "5 days ago", title: "Pumps like a waterfall", content: "Drained a 4-acre holding reservoir in under 6 hours.", helpful: 16, liked: false }
    ]
  },
  {
    id: 11,
    brand: "Tu Thanh",
    model: "Heavy-Duty Cast Iron Mud & Slurry Dredging Pump Head 4\"",
    category: "pumps",
    price: 270,
    badge: "SEMI-OPEN NON-CLOG",
    badgeType: "badge-blue-star",
    sku: "TTM-PUMP-SAND100",
    rating: 4.8,
    reviewsCount: 9,
    bullets: [
      "Open 3-vane semi-vortex impeller passes weeds, mud, sand, and gravel without jamming",
      "12mm thick abrasion-resistant chromium cast-alloy casing",
      "Dedicated unit for pond dredging, canal desilting, and construction slurry removal"
    ],
    specs: {
      "Casing Material": "High-Chromium Ductile Cast Iron (12mm wall thickness)",
      "Inlet / Outlet": "100 mm (4.0 Inch Flanged)",
      "Warranty": "12 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Built specifically to solve bottom slurry buildup in ponds and irrigation ditches.",
    reviews: [
      { id: "r1101", author: "Leonard Brooks", location: "Wetland Dredging Services", rating: 5, date: "2 weeks ago", title: "Chews through dense mud effortlessly", content: "Pumped thick clay sludge and debris out of our retention pond with zero clogs.", helpful: 10, liked: false }
    ]
  },
  {
    id: 12,
    brand: "Tu Thanh",
    model: "Marine 304 Stainless Steel Long-Tail Boat Drive Kit (12.5 ft)",
    category: "marine",
    price: 168,
    badge: "SALT-WATER PROOF",
    badgeType: "badge-green-circle",
    sku: "TTM-LAP-38M",
    rating: 5.0,
    reviewsCount: 17,
    bullets: [
      "Full 304 marine-grade stainless steel shaft and sleeve tubing resistant to saltwater corrosion",
      "Oil-bathed needle roller bearings protected by triple-lip mechanical seals",
      "Smoothest high-RPM long-tail operation eliminates tail vibration on riverboats"
    ],
    specs: {
      "Shaft Length": "12.5 Feet (3.8 Meters)",
      "Core Material": "SUS304 Austenitic Stainless Steel",
      "Warranty": "24 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Custom CNC-machined long-tail marine kit for horizontal diesel engines.",
    reviews: [
      { id: "r1201", author: "Captain Pete", location: "Delta Boat Charter", rating: 5, date: "3 days ago", title: "Glass-smooth running shaft", content: "Mounted to our Kubota 14 HP. Zero tail vibration.", helpful: 22, liked: false }
    ]
  },
  {
    id: 13,
    brand: "Tu Thanh",
    model: "High-Speed CNC Brass & 304 Stainless Boat Racing Propeller",
    category: "marine",
    price: 50,
    badge: "HYDRODYNAMIC",
    badgeType: "badge-gold-crown",
    sku: "TTM-PROP-SPEED",
    rating: 4.9,
    reviewsCount: 14,
    bullets: [
      "2-blade hydrodynamic rake design maximizes water displacement and boat top speed",
      "Electronically balanced on high-speed dynamic balancers to eliminate steering torque pull",
      "Available in standard metric shaft tapers (19mm, 22mm, 25mm)"
    ],
    specs: {
      "Material": "Naval Brass or 304 Stainless",
      "Diameter": "220 mm - 280 mm"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Precision-cast and computer-balanced propeller specifically shaped for river navigation.",
    reviews: [
      { id: "r1301", author: "Warren Mitchell", location: "Bayou Custom Skiffs", rating: 5, date: "1 week ago", title: "Gained 4 knots on GPS instantly", content: "Steering became light as a feather.", helpful: 15, liked: false }
    ]
  },
  {
    id: 14,
    brand: "Tu Thanh / Yanmar",
    model: "Soundproof Heavy-Duty Diesel Generator 7.5 kVA / 220V",
    category: "generators",
    price: 1380,
    badge: "ULTRA QUIET",
    badgeType: "badge-green-circle",
    sku: "TTM-GEN-75KVA",
    hp: "14.0 HP Engine",
    capacity: "7.5 kVA",
    rating: 4.9,
    reviewsCount: 11,
    bullets: [
      "Acoustic insulated steel canopy with high-density foam keeps sound down to 68 dB",
      "100% pure copper wire alternator handles inductive motor startup effortlessly",
      "Automatic digital voltage regulation (AVR) protects sensitive electronics"
    ],
    specs: {
      "Peak Output": "7.5 kVA / 220V Single Phase",
      "Noise Level": "68 dBA @ 23 feet",
      "Warranty": "24 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Heavy-duty soundproof diesel generator tailored for aquaculture farms, dairy sheds, and remote field stations.",
    reviews: [
      { id: "r1401", author: "Kenneth Vance", location: "Vance Dairy Farms", rating: 5, date: "4 days ago", title: "Saved our entire refrigeration during storms", content: "Electric starter fired up on first push.", helpful: 18, liked: false }
    ]
  },
  {
    id: 15,
    brand: "Tu Thanh",
    model: "1-Touch 12V Electric Starter Upgrade Kit for Kubota RT / Yanmar TF",
    category: "parts",
    price: 152,
    badge: "E-START KIT",
    badgeType: "badge-gold-crown",
    sku: "TTM-KIT-ESTART",
    rating: 5.0,
    reviewsCount: 22,
    bullets: [
      "Complete conversion kit: high-torque 12V starter motor, precision flywheel ring gear, and ignition key panel",
      "Direct bolt-on match for Kubota RT120-160 and Yanmar TF105-160 horizontal engines",
      "Simple 30-minute installation turns manual crank engines into modern key-turn units"
    ],
    specs: {
      "Operating Voltage": "12V DC",
      "Warranty": "12 Months Immediate Replacement"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The ultimate convenience upgrade for existing horizontal diesel engines.",
    reviews: [
      { id: "r1501", author: "Richard Lawson", location: "Lawson Agri Machinery", rating: 5, date: "Yesterday", title: "Best upgrade I ever bought", content: "Installed on my 10-year-old Kubota engine. Starts on first turn of key.", helpful: 35, liked: false }
    ]
  },
  {
    id: 16,
    brand: "Kubota Genuine",
    model: "Genuine Kubota RT140 Cylinder Piston Ring & High-Pressure Injector Kit",
    category: "parts",
    price: 86,
    badge: "100% GENUINE",
    badgeType: "badge-blue-star",
    sku: "TTM-PART-PISTON140",
    rating: 4.9,
    reviewsCount: 16,
    bullets: [
      "Factory genuine Kubota parts with authentic holographic security seals",
      "Precision-cast aluminum alloy piston with anti-friction coated skirt",
      "Calibrated high-pressure fuel injector nozzle delivers ultra-fine atomization"
    ],
    specs: {
      "Contents": "Piston, Rings, Liner Sleeve, Injector Nozzle",
      "Warranty": "12 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Restore 100% original factory compression and horsepower to your Kubota RT engine.",
    reviews: [
      { id: "r1601", author: "Master Mechanic Alan", location: "Alan's Diesel Repair", rating: 5, date: "3 days ago", title: "Precision factory tolerances", content: "Factory perfect out of the box.", helpful: 20, liked: false }
    ]
  },
  {
    id: 17,
    brand: "JIADI",
    model: "JIADI JD14L Walking Diesel Tractor 14HP with Implements (Key Start)",
    category: "tillers",
    price: 155000,
    currency: "KES",
    badge: "BEST VALUE",
    badgeType: "badge-blue-star",
    sku: "TTM-JD-JD14L",
    hp: "14.0 HP",
    rpm: "2,200 RPM",
    rating: 5.0,
    reviewsCount: 0,
    cooling: "Water-Cooled Condenser / Radiator",
    starter: "Electric Key Start + Manual Crank Backup",
    displacement: "Approx. 850 cc",
    weight: "Approx. 300 kg",
    bullets: [
      "14 HP water-cooled diesel built for heavy farm work and sustained draught loads",
      "Supplied with the full implement set: disc ploughs, arrow ploughs, rotavators and iron traction wheels",
      "Gear-drive transmission with multiple forward speeds plus reverse, and key start with manual crank backup"
    ],
    specs: {
      "Brand / Model": "JIADI JD14L",
      "Engine Type": "4-Stroke, Single-Cylinder Horizontal Water-Cooled Diesel",
      "Rated Power": "14.0 HP @ 2,200 RPM",
      "Transmission": "Gear-Driven, Multiple Forward Speeds + Reverse",
      "Starting System": "Electric Key Start with Manual Crank Backup",
      "Wheels Supplied": "Rubber Tyres + Iron Traction Wheels",
      "Implements Supplied": "Disc Ploughs, Arrow Ploughs, Rotavators, Iron Wheels",
      "Best Suited To": "Heavy farm work",
      "Warranty": "12-Month Warranty"
    },
    images: [
      "images/jiadi-walking-tractor.jpg"
    ],
    description: "The JIADI JD14L is a two-wheel walking diesel tractor built for heavy farm work on small and medium holdings. Its water-cooled 14 HP single-cylinder diesel delivers the low-end torque needed for ploughing, harrowing and trailer transport, and it arrives with a complete implement set — disc ploughs, arrow ploughs, rotavators and iron traction wheels — so it is field-ready on delivery.",
    reviews: []
  },
  {
    id: 18,
    brand: "JIADI",
    model: "JIADI JD16L Walking Diesel Tractor 16HP with Implements (Key Start)",
    category: "tillers",
    price: 260000,
    currency: "KES",
    badge: "MOST POPULAR",
    badgeType: "badge-gold-crown",
    sku: "TTM-JD-JD16L",
    hp: "16.0 HP",
    rpm: "2,200 RPM",
    rating: 5.0,
    reviewsCount: 0,
    cooling: "Water-Cooled Condenser / Radiator",
    starter: "Electric Key Start + Manual Crank Backup",
    displacement: "Approx. 1,100 cc (ZH1100 Series)",
    weight: "Approx. 350 kg",
    bullets: [
      "16 HP ZH1100-series diesel ploughs 1.5 - 2 acres per hour on roughly 2 litres of diesel per hour",
      "Approx. 350 kg frame holds traction in hard, compacted soil where lighter petrol tillers bounce",
      "Ships with disc ploughs, arrow ploughs, rotavators and iron wheels — gear drive with reverse, key start"
    ],
    specs: {
      "Brand / Model": "JIADI JD16L (ZH1100 / JD1100P Engine)",
      "Engine Type": "4-Stroke, Single-Cylinder Horizontal Water-Cooled Diesel",
      "Rated Power": "16.0 HP @ 2,200 RPM",
      "Fuel Consumption": "Approx. 2 Litres of Diesel per Hour",
      "Working Capacity": "1.5 - 2 Acres per Hour (soil dependent)",
      "Transmission": "Gear-Driven, Multiple Forward Speeds + Reverse",
      "Starting System": "Electric Key Start with Manual Crank Backup",
      "Wheels Supplied": "Rubber Tyres + Iron Traction Wheels",
      "Implements Supplied": "Disc Ploughs, Arrow Ploughs, Rotavators, Iron Wheels",
      "Best Suited To": "Heavy-duty farming",
      "Warranty": "12-Month Warranty"
    },
    images: [
      "images/jiadi-walking-tractor.jpg"
    ],
    description: "The JIADI JD16L is a heavy-duty 16 HP walking diesel tractor built for medium to large-scale farming. Its water-cooled ZH1100-series single-cylinder diesel runs on roughly 2 litres per hour while ploughing 1.5 to 2 acres an hour, and the 350 kg frame keeps the traction firm in hard, compacted ground. Gear drive with multiple forward speeds and reverse, delivered with disc ploughs, arrow ploughs, rotavators and iron wheels for ploughing, harrowing and transport.",
    reviews: []
  },
  {
    id: 19,
    brand: "JIADI",
    model: "JIADI JD20L Walking Diesel Tractor 20HP with Implements (Key Start)",
    category: "tillers",
    price: 300000,
    currency: "KES",
    badge: "HEAVY-DUTY",
    badgeType: "badge-green-circle",
    sku: "TTM-JD-JD20L",
    hp: "20.0 HP",
    rpm: "2,200 RPM",
    rating: 5.0,
    reviewsCount: 0,
    cooling: "Water-Cooled Condenser / Radiator",
    starter: "Electric Key Start + Manual Crank Backup",
    displacement: "Approx. 1,300 cc",
    weight: "Approx. 420 kg",
    bullets: [
      "20 HP water-cooled diesel for heavy-duty cultivation and transport on larger farms",
      "Gear-drive transmission with multiple forward and reverse speeds hauls loaded trailers over rough ground",
      "Delivered with disc ploughs, arrow ploughs, rotavators and iron traction wheels, with electric key start"
    ],
    specs: {
      "Brand / Model": "JIADI JD20L",
      "Engine Type": "4-Stroke, Single-Cylinder Horizontal Water-Cooled Diesel",
      "Rated Power": "20.0 HP @ 2,200 RPM",
      "Transmission": "Gear-Driven, Multiple Forward Speeds + Reverse",
      "Starting System": "Electric Key Start with Manual Crank Backup",
      "Wheels Supplied": "Rubber Tyres + Iron Traction Wheels",
      "Implements Supplied": "Disc Ploughs, Arrow Ploughs, Rotavators, Iron Wheels",
      "Best Suited To": "Large farms and heavy-duty cultivation & transport",
      "Warranty": "12-Month Warranty"
    },
    images: [
      "images/jiadi-walking-tractor.jpg"
    ],
    description: "The JIADI JD20L is the flagship of the walking diesel tractor range, built for heavy-duty cultivation and transport on larger farms. The water-cooled 20 HP single-cylinder diesel holds torque under continuous ploughing and towing loads, while the heavier frame and gear-drive transmission keep the machine planted and composed in demanding soil.",
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

          <div class="card-stars-row">
            <span class="stars-gold">★★★★★</span>
            <span class="rating-val">${item.rating}</span>
            <span class="review-count-pill">(${item.reviewsCount})</span>
          </div>

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
      specs: prod.cooling + " | " + prod.starter,
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

  const orderId = "TTM-" + Math.floor(100000 + Math.random() * 900000);
  const trackingCode = "TTM-FREIGHT-" + orderId.slice(-4);

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
