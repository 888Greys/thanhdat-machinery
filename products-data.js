// Shared Products Catalog Data for Farmmachineries

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
    model: "JD14L Walking Diesel Tractor 14HP",
    category: "tractors",
    price: 245000,
    currency: "KES",
    badge: "COMPACT POWER",
    badgeType: "badge-blue-star",
    sku: "FM-JD-JD14L",
    rating: 0,
    reviewsCount: 0,
    hp: "14.0 HP",
    cooling: "Water-Cooled (Air-Cooled on Heavy-Duty Variants)",
    starter: "Manual Recoil Crank / Optional Electric Start",
    weight: "Approx. 200 - 300 kg",
    bullets: [
      "14 HP horizontal diesel delivers the high torque for deep ploughing and tilling where petrol tillers stall",
      "Gear-driven transmission with multiple forward speeds plus reverse",
      "Supplied with both rubber tyres and iron traction wheels for road and field work"
    ],
    specs: {
      "Brand / Model": "JIADI JD14L",
      "Engine Type": "Single-Cylinder, 4-Stroke, Horizontal Diesel Engine",
      "Power Output": "14.0 HP",
      "Cooling System": "Water-Cooled (Air-Cooled on Heavy-Duty Variants)",
      "Starting Method": "Manual Recoil Crank, or Electric Start on Some Variants",
      "Transmission": "Gear-Driven, Multiple Forward Speeds + Reverse",
      "Wheels Supplied": "Rubber Tyres and Iron Traction Wheels",
      "Weight": "Approx. 200 - 300 kg (varies by attachments)"
    },
    images: [
      "images/jiadi-walking-tractor-14hp.jpg"
    ],
    description: "The JIADI JD14L is a heavy-duty walking tractor, also known as a power tiller, designed for small to medium-scale farming. Its 14 HP diesel engine handles the tough soil conditions that petrol models struggle with, producing the high torque needed for deep ploughing and tilling. Gear-driven transmission with reverse, and it comes with both rubber tyres and iron traction wheels.",
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

if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.formatMoney = formatMoney;
}
