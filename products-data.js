// Shared Products Catalog Data for Tu Thanh Machinery
function formatMoney(amount) {
  return "$" + Number(amount).toLocaleString("en-US") + " USD";
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
  }
];

if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.formatMoney = formatMoney;
}
