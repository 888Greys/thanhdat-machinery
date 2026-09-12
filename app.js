// ==========================================================================
// TU THANH MACHINERY
// Premier E-Commerce Platform for Diesel Engines, Tillers, Pumps & Marine Equipment
// ==========================================================================

const SUPABASE_URL = "https://munbteqhjgwoxebguqdl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bmJ0ZXFoamd3b3hlYmd1cWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NzM1ODYsImV4cCI6MjA5NjE0OTU4Nn0.tYvdCKxpC6OEWYGhCaOwJbSDimxoHBbbX-CyMR0j59s";

const supabaseClient = (typeof window !== "undefined" && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function formatMoney(amount) {
  return "$" + Number(amount).toLocaleString("en-US") + " USD";
}

// 16+ Curated Machinery Catalog in English
const PRODUCTS_DATA = [
  {
    id: 1,
    brand: "Kubota",
    model: "Kubota RT140 Plus Radiator Cooled Diesel Engine (14.0 HP)",
    category: "engines",
    price: 1060,
    badge: "BEST SELLER",
    badgeType: "gold-badge",
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
      "Manufacturer": "Kubota Corporation (Imported Factory Unit)",
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
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Kubota RT140 Plus is a legendary workhorse recognized by agricultural contractors, commercial farmers, and long-tail boat operators worldwide. Engineered with Kubota's Three Vortex Combustion System (TVCS), it extracts maximum kinetic energy from every drop of fuel while maintaining clean exhaust, low vibration, and exceptional torque.",
    reviews: [
      { id: "r101", author: "David Henderson", location: "Midwest Farm Depot", rating: 5, date: "2 days ago", title: "Phenomenal torque on our rotary tiller", content: "Mounted this RT140 onto our 2-wheel power tiller for heavy spring tilling. Engine starts smoothly, throttles up immediately, and runs cool through 9 hours of continuous operation.", helpful: 24, liked: false },
      { id: "r102", author: "Robert M.", location: "River Marine Works", rating: 5, date: "5 days ago", title: "Flawless power for long-tail boat setup", content: "Paired with a 12.5ft stainless shaft and brass propeller. Carries cargo upstream with zero hesitation. Extremely economical on diesel fuel.", helpful: 18, liked: false },
      { id: "r103", author: "Franklin Vance", location: "AgriTech Supplies", rating: 5, date: "1 week ago", title: "Brand new factory crate, well tested", content: "Engine arrived in a robust wooden crate with oil pre-serviced and clear inspection tags. Runs crisp and steady right out of the box.", helpful: 15, liked: false }
    ]
  },
  {
    id: 2,
    brand: "Yanmar",
    model: "Yanmar TF120-DI Direct Injection Diesel Engine (12.0 HP)",
    category: "engines",
    price: 899,
    badge: "FUEL EFFICIENT",
    badgeType: "blue-badge",
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
      "Fuel Consumption": "Approx. 1.1 Liters / hr at full load",
      "Warranty": "24-Month Factory Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Yanmar's TF120-DI engine delivers unmatched fuel efficiency through its advanced Direct Injection chamber. The chrome-plated piston rings and heat-treated cylinder liner ensure over a decade of dependable daily service.",
    reviews: [
      { id: "r201", author: "James Sullivan", location: "Coastal Irrigation", rating: 5, date: "3 days ago", title: "Remarkably low fuel consumption", content: "Hooked to a 4.5-inch water pump running all morning. Barely consumed 1.5 gallons of diesel. The decompression crank makes cold mornings effortless.", helpful: 21, liked: false }
    ]
  },
  {
    id: 3,
    brand: "Kubota",
    model: "Kubota RT155 Plus DI Electric Key Start Diesel Engine (15.5 HP)",
    category: "engines",
    price: 1180,
    badge: "1-TOUCH E-START",
    badgeType: "green-badge",
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
      "Recommended Battery": "12V 35Ah - 45Ah Lead-Acid or Lithium",
      "Weight": "122 kg",
      "Warranty": "24 Months (Full Coverage on Starter & Block)"
    },
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The premier tier of the Kubota horizontal diesel family. The RT155 Plus DI features a turnkey 12V starter system, eliminating manual cranking fatigue while delivering 15.5 horsepower of unstoppable pull for heavy cultivators, dredging pumps, and industrial barges.",
    reviews: [
      { id: "r301", author: "Arthur Pendelton", location: "Valley Agri Co-op", rating: 5, date: "Yesterday", title: "Turn of the key and it fires up", content: "Electric start is a lifesaver. One turn of the key and the 15.5 HP diesel roars to life. Superb build quality and vibration damping.", helpful: 30, liked: false }
    ]
  },
  {
    id: 4,
    brand: "Yanmar",
    model: "Yanmar TF160-DI Heavy-Duty Marine & Utility Diesel Engine (16.0 HP)",
    category: "engines",
    price: 1250,
    badge: "HEAVY MARINE",
    badgeType: "gold-badge",
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
      "Fuel Type": "Standard Clean Diesel",
      "Net Weight": "135 kg",
      "Warranty": "24 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Yanmar TF160-DI boasts an oversized 102mm cylinder bore generating colossal compression and turning moment. It drives high-pitch propellers and heavy tillage shafts with effortless stability.",
    reviews: [
      { id: "r401", author: "Capt. Michael Ross", location: "Harbor Freight Logistics", rating: 5, date: "4 days ago", title: "Unbeatable pulling power on cargo boats", content: "Pushes our 4-ton cargo barge through strong currents without breaking a sweat. Exhaust runs clean with zero soot buildup.", helpful: 19, liked: false }
    ]
  },
  {
    id: 5,
    brand: "Kubota",
    model: "Kubota RT125 Standard Farm Diesel Engine (12.5 HP)",
    category: "engines",
    price: 875,
    badge: "PROVEN WORKHORSE",
    badgeType: "blue-badge",
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
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Kubota RT125 is the quintessential balance between power, portability, and bulletproof mechanical simplicity. It operates reliably in challenging humid and dusty farm environments.",
    reviews: [
      { id: "r501", author: "Gregory Shaw", location: "Prairie Agro Systems", rating: 5, date: "1 week ago", title: "Unstoppable little engine", content: "Solid cast iron design that simply does not quit. Easy to service, filter changes take 5 minutes, and starts on first crank.", helpful: 12, liked: false }
    ]
  },
  {
    id: 6,
    brand: "John Deere",
    model: "John Deere Heavy Agri Power Unit (22.0 HP Industrial Diesel)",
    category: "engines",
    price: 1680,
    badge: "USA STANDARD",
    badgeType: "green-badge",
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
      "Electrical System": "12V 1.8kW Starter + 40A Heavy Alternator",
      "Dry Weight": "165 kg",
      "Warranty": "36-Month Industrial Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Built to North American heavy-equipment specifications, the John Deere 22 HP power unit provides continuous stationary muscle. Its ductile iron block and heavy forged crankshaft handle constant shock loads with ease.",
    reviews: [
      { id: "r601", author: "Marcus Thorne", location: "Blue Basin Aquaculture", rating: 5, date: "3 weeks ago", title: "Runs aerators all night without a drop in RPM", content: "Installed this unit to run our aquaculture aeration lines overnight. Smooth governors, perfect fuel metering, and zero overheating.", helpful: 26, liked: false }
    ]
  },
  {
    id: 7,
    brand: "Vikyno",
    model: "Vikyno RV125-2 Water-Cooled Commercial Diesel Engine (12.5 HP)",
    category: "engines",
    price: 699,
    badge: "ECONOMY PRO",
    badgeType: "blue-badge",
    sku: "TTM-VIK-RV125",
    hp: "12.5 HP",
    rpm: "2,200 RPM",
    rating: 4.7,
    reviewsCount: 10,
    cooling: "Thermosiphon Water Circulation",
    starter: "Assisted Hand Crank",
    displacement: "630 cc",
    weight: "231 lbs (105 kg)",
    fuelTank: "2.6 Gal (10 L)",
    bullets: [
      "Manufactured under licensed Yanmar Japan commercial engineering standards",
      "Unbeatable cost-to-performance ratio for cost-conscious farm operators",
      "Standardized bolt patterns accept generic pulleys, gearboxes, and chassis"
    ],
    specs: {
      "Manufacturer": "Vikyno Engine Machinery Co.",
      "Model": "RV125-2 Standard",
      "Rated Output": "12.5 HP @ 2,200 RPM",
      "Weight": "105 kg",
      "Warranty": "18-Month Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Vikyno RV125-2 brings reliable water-cooled single-cylinder diesel engineering into an economical price bracket. An outstanding choice for backup farm generation and drainage.",
    reviews: [
      { id: "r701", author: "Samuel O'Connor", location: "Homestead Machinery", rating: 5, date: "1 month ago", title: "Great value and solid performance", content: "For the price point, this engine punches well above its weight. Put it on a trailer mount for field water pumping.", helpful: 11, liked: false }
    ]
  },
  {
    id: 8,
    brand: "Tu Thanh",
    model: "All-Terrain 2-Wheel Walk-Behind Power Tiller Kit (with Kubota RT140 Engine)",
    category: "tillers",
    price: 1540,
    badge: "COMPLETE READY-TO-WORK",
    badgeType: "gold-badge",
    sku: "TTM-TILL-FULL140",
    hp: "14.0 HP Kubota RT140",
    rpm: "6 Forward / 2 Reverse Speeds",
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
      "Working Tillage Width": "850 mm - 1,100 mm",
      "Tillage Depth": "150 mm - 250 mm",
      "Transmission": "Gear Drive (6 Forward, 2 Reverse Speeds)",
      "Included Accessories": "1 Pair Iron Mud Cage Wheels + 1 Pair Transport Tires + 18-Blade Rotary Assembly",
      "Warranty": "24 Months Full Coverage on Engine & Transmission"
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The complete heavy-duty walking tractor setup. Combines a structural steel channel frame with the power of the Kubota RT140 diesel engine. Chews through dense turf, wet paddy mud, and dry clay easily.",
    reviews: [
      { id: "r801", author: "Thomas Briggs", location: "Meadowlands Cultivators", rating: 5, date: "2 days ago", title: "Effortless tillage in heavy soil", content: "The cage wheels keep it floating through soaked clay fields where our heavy four-wheel tractor got stuck. The sulky seat makes it a pleasure to drive.", helpful: 28, liked: false }
    ]
  },
  {
    id: 9,
    brand: "Tu Thanh",
    model: "Heavy-Duty 2-Wheel Cultivator Chassis & Rotary Tiller Frame (No Engine)",
    category: "tillers",
    price: 580,
    badge: "HEAVY STEEL CHASSIS",
    badgeType: "blue-badge",
    sku: "TTM-FRAME-PRO",
    hp: "Compatible with 10 - 18 HP",
    rating: 4.8,
    reviewsCount: 8,
    weight: "286 lbs (130 kg)",
    bullets: [
      "Pressed structural steel beam construction withstands aggressive soil impacts",
      "Dual sealed Japanese roller bearings and quick-disconnect steering handles",
      "Pre-drilled universal motor mounts fit Kubota RT, Yanmar TF, and Vikyno engines"
    ],
    specs: {
      "Manufacturer": "Tu Thanh Machinery Workshop",
      "Engine Compatibility": "Kubota RT100 - RT160, Yanmar TF105 - TF160, Vikyno RV125 - RV165",
      "Drive System": "Triple B-Section V-Belts + Oil-Bath Dual Roller Chain Transmission",
      "Warranty": "36 Months on Structural Chassis and Gearbox"
    },
    images: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Designed for operators who already own a diesel engine and want to upgrade their walking tractor frame. Low center of gravity prevents tipping on steep furrows.",
    reviews: [
      { id: "r901", author: "Elijah Wright", location: "Wright Farm Works", rating: 5, date: "1 week ago", title: "Heavy steel and zero vibrations", content: "Mounted our 12 HP Yanmar to this chassis. Bolted right in without modification. The steering clutches are responsive and smooth.", helpful: 14, liked: false }
    ]
  },
  {
    id: 10,
    brand: "Kubota/Tu Thanh",
    model: "High-Volume Agricultural Diesel Water Pump Set 4.5\" (120-150 m³/h)",
    category: "pumps",
    price: 1150,
    badge: "MASSIVE FLOW",
    badgeType: "gold-badge",
    sku: "TTM-PUMP-114",
    hp: "12.5 HP Kubota RT125",
    capacity: "530 - 660 GPM (120 - 150 m³/h)",
    rating: 4.9,
    reviewsCount: 13,
    cooling: "Radiator",
    bullets: [
      "High discharge rate of 120-150 m³/hr for rapid flood control and large-scale irrigation",
      "Reinforced cast-iron housing with dynamic cast-bronze pressure impeller",
      "Trailer skid with 4 pneumatic rubber transport wheels for convenient canal movement"
    ],
    specs: {
      "Engine": "Kubota RT125 Official Diesel Engine",
      "Pump Head": "High-Pressure Cast Iron Self-Priming 114mm (4.5 inch)",
      "Flow Rate": "120 - 150 m³/hr (530 - 660 Gallons/min)",
      "Head Lift": "50-65 ft Vertical Lift, 1,600 ft Horizontal Delivery",
      "Warranty": "24 Months Full System Coverage"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Engineered for agricultural irrigation, flood drainage, and commercial aquaculture. The heavy Kubota diesel directly drives the high-flow impeller via reinforced dual V-belts.",
    reviews: [
      { id: "r1001", author: "Harvey Cole", location: "Cole River Basin Dist.", rating: 5, date: "5 days ago", title: "Pumps like a waterfall", content: "Drained a 4-acre holding reservoir in under 6 hours. The 4.5-inch outlet flows continuous volume without surging.", helpful: 16, liked: false }
    ]
  },
  {
    id: 11,
    brand: "Tu Thanh",
    model: "Heavy-Duty Cast Iron Mud & Slurry Dredging Pump Head 4\"",
    category: "pumps",
    price: 270,
    badge: "SEMI-OPEN NON-CLOG",
    badgeType: "blue-badge",
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
      "Impeller Type": "3-Blade Semi-Open Non-Clog Impeller",
      "Inlet / Outlet": "100 mm (4.0 Inch Flanged)",
      "Recommended Drive": "12 HP to 18 HP Diesel Engine",
      "Warranty": "12 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Built specifically to solve bottom slurry buildup in ponds and irrigation ditches. The oil-submerged dual mechanical seals prevent grit and silt intrusion from damaging drive shafts.",
    reviews: [
      { id: "r1101", author: "Leonard Brooks", location: "Wetland Dredging Services", rating: 5, date: "2 weeks ago", title: "Chews through dense mud effortlessly", content: "Pumped thick clay sludge and debris out of our retention pond with zero clogs. Very impressed with the build quality.", helpful: 10, liked: false }
    ]
  },
  {
    id: 12,
    brand: "Tu Thanh",
    model: "Marine 304 Stainless Steel Long-Tail Boat Drive Kit (12.5 ft)",
    category: "marine",
    price: 168,
    badge: "SALT-WATER PROOF",
    badgeType: "green-badge",
    sku: "TTM-LAP-38M",
    rating: 5.0,
    reviewsCount: 17,
    bullets: [
      "Full 304 marine-grade stainless steel shaft and sleeve tubing resistant to saltwater corrosion",
      "Oil-bathed needle roller bearings protected by triple-lip mechanical seals",
      "Smoothest high-RPM long-tail operation eliminates tail vibration on riverboats"
    ],
    specs: {
      "Shaft Length": "12.5 Feet (3.8 Meters) — 14 ft option available",
      "Drive Shaft Diameter": "22 mm or 25 mm precision-machined stainless core",
      "Material": "SUS304 Austenitic Stainless Steel",
      "Engine Coupler": "Heavy-duty torsional dampening rubber joint",
      "Warranty": "24 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Custom CNC-machined long-tail marine kit for horizontal diesel engines. The sealed oil-lubricated bearing cartridge ensures the shaft spins freely without cavitation or power loss.",
    reviews: [
      { id: "r1201", author: "Captain Pete", location: "Delta Boat Charter", rating: 5, date: "3 days ago", title: "Glass-smooth running shaft", content: "Mounted to our Kubota 14 HP. Navigated saltwater channels for a month without a speck of rust. Zero tail vibration.", helpful: 22, liked: false }
    ]
  },
  {
    id: 13,
    brand: "Tu Thanh",
    model: "High-Speed CNC Brass & 304 Stainless Boat Racing Propeller",
    category: "marine",
    price: 50,
    badge: "HYDRODYNAMIC CNC",
    badgeType: "gold-badge",
    sku: "TTM-PROP-SPEED",
    rating: 4.9,
    reviewsCount: 14,
    bullets: [
      "2-blade hydrodynamic rake design maximizes water displacement and boat top speed",
      "Electronically balanced on high-speed dynamic balancers to eliminate steering torque pull",
      "Available in standard metric shaft tapers (19mm, 22mm, 25mm)"
    ],
    specs: {
      "Material": "High-Tensile Cast Naval Brass or 304 Stainless",
      "Blade Diameter": "220 mm - 280 mm (8.5 - 11.0 Inch)",
      "Bore Taper": "Standard 1:10 Taper with Keyway",
      "Characteristics": "Weed-shedding leading edge, rapid planing"
    },
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Precision-cast and computer-balanced propeller specifically shaped for river navigation with floating debris. The raked blade geometry glides over weeds while delivering instant planing speed.",
    reviews: [
      { id: "r1301", author: "Warren Mitchell", location: "Bayou Custom Skiffs", rating: 5, date: "1 week ago", title: "Gained 4 knots on GPS instantly", content: "Bolted onto our long-tail shaft. Steering became light as a feather with zero tiller vibration.", helpful: 15, liked: false }
    ]
  },
  {
    id: 14,
    brand: "Tu Thanh / Yanmar",
    model: "Soundproof Heavy-Duty Diesel Generator 7.5 kVA / 220V",
    category: "generators",
    price: 1380,
    badge: "ULTRA QUIET ENCLOSURE",
    badgeType: "green-badge",
    sku: "TTM-GEN-75KVA",
    hp: "14.0 HP Diesel Engine",
    capacity: "7.5 kVA Prime / 220V 60Hz",
    rating: 4.9,
    reviewsCount: 11,
    bullets: [
      "Acoustic insulated steel canopy with high-density foam keeps sound down to 68 dB",
      "100% pure copper wire alternator handles inductive motor startup effortlessly",
      "Automatic digital voltage regulation (AVR) protects sensitive electronics"
    ],
    specs: {
      "Prime Output": "7.0 kVA / 220V Single Phase",
      "Standby Output": "7.5 kVA",
      "Engine Block": "Single Cylinder 4-Stroke Radiator Diesel",
      "Starting System": "12V Electric Push Button with Auto Battery Tender",
      "Noise Level": "68 dBA @ 23 feet (7 meters)",
      "Warranty": "24 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Heavy-duty soundproof diesel generator tailored for aquaculture farms, dairy sheds, and remote field stations. Consumes just 0.32 gal/hr under full load.",
    reviews: [
      { id: "r1401", author: "Kenneth Vance", location: "Vance Dairy Farms", rating: 5, date: "4 days ago", title: "Saved our entire refrigeration during storms", content: "Power cut out at 2 AM. Electric starter fired up on first push. Quiet enough that you can hold a normal conversation right beside it.", helpful: 18, liked: false }
    ]
  },
  {
    id: 15,
    brand: "Tu Thanh",
    model: "1-Touch 12V Electric Starter Upgrade Kit for Kubota RT / Yanmar TF",
    category: "parts",
    price: 152,
    badge: "NO MORE CRANKING",
    badgeType: "gold-badge",
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
      "Motor Type": "High-Torque Planetary Reduction Motor",
      "Flywheel Ring Gear": "Induction-Hardened Alloy Steel Teeth",
      "Wiring Harness": "Heavy Gauge Copper with Sealed Relays & Ignition Switch",
      "Warranty": "12 Months Immediate Replacement"
    },
    images: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The ultimate convenience upgrade for existing horizontal diesel engines. Includes everything needed to add turnkey starting, with full bolt alignment and wiring diagrams.",
    reviews: [
      { id: "r1501", author: "Richard Lawson", location: "Lawson Agri Machinery", rating: 5, date: "Yesterday", title: "Best upgrade I ever bought", content: "Installed on my 10-year-old Kubota engine. Now anyone in our family can turn the key and start pumping irrigation water without struggling with the hand crank.", helpful: 35, liked: false }
    ]
  },
  {
    id: 16,
    brand: "Kubota Genuine",
    model: "Genuine Kubota RT140 Cylinder Piston Ring & High-Pressure Injector Kit",
    category: "parts",
    price: 86,
    badge: "100% GENUINE",
    badgeType: "blue-badge",
    sku: "TTM-PART-PISTON140",
    rating: 4.9,
    reviewsCount: 16,
    bullets: [
      "Factory genuine Kubota parts with authentic holographic security seals",
      "Precision-cast aluminum alloy piston with anti-friction coated skirt",
      "Calibrated high-pressure fuel injector nozzle delivers ultra-fine atomization"
    ],
    specs: {
      "Kit Contents": "1x Piston, 1x Complete Ring Set, 1x Cylinder Liner Sleeve, 1x Calibrated Injector Nozzle",
      "Origin": "Genuine Factory Import",
      "Size": "Standard Standard Bore (Size 0)",
      "Warranty": "12 Months"
    },
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Restore 100% original factory compression and horsepower to your Kubota RT engine. Eliminates black exhaust smoke and blow-by instantly.",
    reviews: [
      { id: "r1601", author: "Master Mechanic Alan", location: "Alan's Diesel Repair", rating: 5, date: "3 days ago", title: "Precision factory tolerances", content: "Ring end gaps were factory perfect out of the box. The engine runs like new with zero smoke and full compression.", helpful: 20, liked: false }
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
        <h3>No matching machinery found</h3>
        <p>Try searching for other terms like "Kubota", "Yanmar", "tiller", "electric starter", or contact our technical team via Hotline / WhatsApp: <b>+84 918 453 476</b>.</p>
        <button class="reset-filter-btn" onclick="resetFilters()">View All Machinery</button>
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
            ${item.cooling ? `<span class="spec-pill">💧 ${item.cooling.split(' ')[0]} Cooling</span>` : ''}
            ${item.starter ? `<span class="spec-pill">🔑 ${item.starter.includes('12V') || item.starter.includes('Electric') ? 'Electric Start' : 'Hand Crank'}</span>` : ''}
          </div>

          <div class="card-price-action">
            <div class="card-price-block">
              <span class="price-label">Wholesale Price:</span>
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
                <span>ADD TO CART</span>
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
  triggerToast(`Added ${qty} × "${prod.model}" to shopping cart!`);
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
        <h4>Your Machinery Cart is Empty</h4>
        <p>Browse our catalog of Kubota & Yanmar diesel engines, tillers, pumps, or starter kits to place an order.</p>
        <button class="browse-btn" onclick="closeCart()">Continue Browsing</button>
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
            <button class="remove-cart-item-btn" onclick="removeCartItem(${idx})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Free freight shipping for orders over $800, else $45 crate packaging & freight fee
  const shippingFee = (subtotal >= 800 || subtotal === 0) ? 0 : 45;
  const total = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (totalEl) totalEl.textContent = formatMoney(total);

  const shippingNote = document.getElementById("shippingNoticeText");
  if (shippingNote) {
    if (subtotal >= 800) {
      shippingNote.innerHTML = `✅ <b>Free Freight & Wooden Crate Packing</b> applied (Orders over $800)!`;
    } else {
      shippingNote.innerHTML = `Add $${800 - subtotal} more for <b>Free Crated Freight Shipping</b>!`;
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

  const shippingFee = (subtotal >= 800 || subtotal === 0) ? 0 : 45;
  const total = subtotal + shippingFee;

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (shippingEl) shippingEl.textContent = shippingFee === 0 ? "Free Shipping" : formatMoney(shippingFee);
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
  const customerProvince = provinceInput ? provinceInput.value : "United States / International";
  const customerNotes = notesInput ? notesInput.value.trim() : "";
  const deliverySpeed = speedSelect ? speedSelect.value : "Standard Palletized Freight Courier";
  const paymentMethod = paymentSelect ? paymentSelect.value : "Inspection on Delivery (COD) / Wire Transfer";

  if (!customerName || !customerPhone || !customerAddress) {
    alert("Please fill in your Full Name, Phone / WhatsApp, and Delivery Address!");
    return;
  }

  // Calculate financials
  let subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let shipping = (subtotal >= 800 || subtotal === 0) ? 0 : 45;
  let total = subtotal + shipping;

  const orderId = "TTM-" + Math.floor(100000 + Math.random() * 900000);
  const trackingCode = "TTM-FREIGHT-" + orderId.slice(-4);

  const orderData = {
    id: orderId,
    order_number: orderId,
    trackingCode: trackingCode,
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

  // UI Loading State
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Processing Machinery Order...</span>`;
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
      delivery_district: customerCity,
      delivery_province: customerProvince,
      delivery_notes: customerNotes,
      delivery_speed: deliverySpeed,
      payment_method: paymentMethod,
      items: cart,
      subtotal: subtotal,
      shipping_fee: shipping,
      total: total,
      status: "Pending"
    };

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
      // Fallback
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
          customer_email: customerEmail || "orders@tu-thanh.com",
          delivery_street: customerAddress,
          delivery_unit: customerCity,
          delivery_postal: customerProvince,
          delivery_notes: customerNotes,
          delivery_speed: deliverySpeed,
          payment_method: paymentMethod,
          items: cart,
          subtotal: subtotal,
          tax: 0,
          total: total,
          status: "Pending"
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
    submitBtn.innerHTML = `<span>CONFIRM MACHINERY PURCHASE</span>`;
  }

  // Show Order Success Modal
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
  document.getElementById("detailHpPill").textContent = prod.hp || "Industrial Spec";

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
  triggerToast(`Added ${qty} × "${currentDetailProduct.model}" to cart!`);
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
    listEl.innerHTML = `<p style="color: #64748b; font-size: 14px;">No reviews yet. Be the first operator to leave a review!</p>`;
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
          👍 Helpful (${r.helpful})
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
  const location = locInput ? locInput.value.trim() : "Commercial Farm";
  const rating = parseInt(ratingInput ? ratingInput.value : "5");
  const title = titleInput ? titleInput.value.trim() : "Performance Review";
  const content = contentInput.value.trim();

  if (!author || !content) {
    alert("Please enter your name and feedback content!");
    return;
  }

  const newReview = {
    id: "cr-" + Date.now(),
    productId: currentDetailProduct.id,
    author: author,
    location: location,
    rating: rating,
    date: "Just now",
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
  triggerToast("Thank you for submitting your equipment review!");
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
      container.innerHTML = `<p style="color: #64748b; font-size: 13px;">No recent orders saved on this browser.</p>`;
      return;
    }

    container.innerHTML = `
      <div style="font-size: 13px; font-weight: 700; color: #1b5e20; margin-bottom: 8px;">YOUR RECENT ORDERS:</div>
      ${list.slice(0, 3).map(o => `
        <div class="tracking-history-item" onclick="quickTrackOrder('${o.id}')">
          <div>
            <b>#${o.id}</b> — ${o.customerName}
            <div style="color: #64748b; font-size: 11px;">${new Date(o.createdAt || Date.now()).toLocaleDateString('en-US')}</div>
          </div>
          <span class="status-tag status-pending">${o.status || 'Pending'}</span>
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
    <div style="text-align: center; padding: 24px; color: #1b5e20;">
      <div style="font-size: 24px; margin-bottom: 8px;">⏳</div>
      <div>Querying workshop dispatch database...</div>
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
          trackingCode: "TTM-FREIGHT-" + data[0].order_number.slice(-4),
          customerName: data[0].customer_name,
          customerPhone: data[0].customer_phone,
          customerAddress: data[0].delivery_street,
          customerProvince: data[0].delivery_province,
          deliverySpeed: data[0].delivery_speed,
          paymentMethod: data[0].payment_method,
          items: data[0].items || [],
          total: data[0].total,
          status: data[0].status || "Pending",
          createdAt: data[0].created_at
        };
      }
    } catch (e) {}
  }

  if (!found) {
    resultBox.innerHTML = `
      <div class="tracking-not-found">
        <div style="font-size: 32px; margin-bottom: 8px;">❌</div>
        <h4>Order "${query}" Not Found</h4>
        <p>Please double-check your order ID or phone number. You can also contact our hotline directly at <b>+84 918 453 476</b> for immediate lookup.</p>
      </div>
    `;
    return;
  }

  // Render 5-step Machinery Freight Dispatch Timeline in English
  resultBox.innerHTML = `
    <div class="tracking-found-card">
      <div class="tracking-card-header">
        <div>
          <span class="tracking-label">ORDER REFERENCE:</span>
          <span class="tracking-id-val">#${found.id}</span>
        </div>
        <div>
          <span class="status-tag status-pending">⚙️ ${found.status || 'Pre-Dispatch Run-Test'}</span>
        </div>
      </div>

      <div class="tracking-info-grid">
        <div><b>Customer:</b> ${found.customerName} (${found.customerPhone})</div>
        <div><b>Destination:</b> ${found.customerAddress}, ${found.customerProvince || ''}</div>
        <div><b>Freight Method:</b> ${found.deliverySpeed || 'Express Freight Courier'}</div>
        <div><b>Total Amount:</b> <span style="color: #1b5e20; font-weight: 800;">${formatMoney(found.total)}</span></div>
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

      <div class="tracking-items-summary">
        <b>Ordered Machinery:</b>
        <ul>
          ${(found.items || []).map(it => `<li>⚙️ <b>${it.name}</b> × ${it.quantity}</li>`).join("")}
        </ul>
      </div>

      <div style="text-align: center; margin-top: 14px;">
        <a href="tel:+84918453476" class="call-workshop-btn">📞 Call Workshop Direct: +84 918 453 476</a>
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
});
