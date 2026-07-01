// ─── HARDWARE CATEGORIES (for /hardware catalog landing page) ────────────────
export const hardwareCategories = [
  {
    id: 'printers',
    title: 'Barcode Printers',
    icon: 'printer',
    tagline: 'Print with precision at every scale',
    description: 'From ultra-portable mobile units to heavy-duty industrial workhorses, our barcode printer range covers every environment and volume requirement.',
    heroImg: '/assets/img/Product/Desktop.jpg',
    bgImg: '/assets/img/Product/Desktop.jpg',
    subtypes: [
      'Mobile Printers',
      'Desktop Printers',
      'Industrial Printers',
      'Enterprise Printers',
      'Healthcare Printers',
      'RFID Printers',
      'Color Label Printers',
      'ID Card Printers',
    ],
    specs: ['Max print width up to 8"', 'Speed up to 14 IPS', '203–600 DPI resolution', 'USB / Ethernet / Wi-Fi / BT', 'RFID UHF encoding options'],
    brands: ['Zebra', 'Honeywell', 'TSC', 'Godex', 'Citizen'],
    industries: ['Retail', 'Healthcare', 'Manufacturing', 'Warehousing & Distribution', 'Transportation & Logistics'],
    productCount: 8,
    color: '#06a3da',
    gradient: 'from-[#06a3da]/10 to-[#214177]/5',
  },
  {
    id: 'scanners',
    title: 'Barcode Scanners',
    icon: 'scanner',
    tagline: 'Scan smarter, faster, anywhere',
    description: 'Complete scanning portfolio — from general-purpose handheld to ultra-rugged industrial, wearable ring scanners, vision-based code readers, industrial cameras, and OEM modules.',
    heroImg: '/assets/img/Product/barcode_scanner.jpg',
    bgImg: '/assets/img/Product/Barcode-Scanner/barcodebgimage.jpg',
    subtypes: [
      // Scanning Solutions
      'General Purpose Handheld',
      'Rugged Handheld',
      'Ultra-Rugged Handheld',
      'Hands-Free / Countertop',
      'Presentation Scanners',
      'Fixed-Mount / Embedded',
      'Wearable Scanners',
      'Industrial Stationary',
      'Mobile Computing Devices',
      // Identification & Marking
      'Laser Marking Systems',
      'OEM Reader Modules',
      // Vision & Imaging
      'Industrial Cameras (Area/Line/3D/Smart)',
      'Fixed Code Readers',
      'Handheld Code Readers',
      'Controllers & Components',
      'Optics & Lighting',
    ],
    specs: ['1D / 2D / QR / PDF417', 'Bluetooth & Wi-Fi models', 'IP65–IP68 rated options', 'Up to 15m scan range', 'Mobile phone scanning capable'],
    brands: ['Zebra', 'Honeywell', 'Datalogic', 'Newland'],
    industries: ['Retail', 'Healthcare', 'Manufacturing', 'Hospitality', 'Warehousing & Distribution', 'Transportation & Logistics'],
    productCount: 8,
    color: '#214177',
    gradient: 'from-[#214177]/10 to-[#06a3da]/5',
  },
  {
    id: 'computing',
    title: 'Mobile Computers',
    icon: 'mobile',
    tagline: 'Enterprise mobility redefined',
    description: 'Rugged handheld devices, tablets, and wearable computers built for warehouse, retail, healthcare, and field service — powered by Android enterprise.',
    heroImg: '/assets/img/Product/MobileComputers/Tablets.jpg',
    bgImg: '/assets/img/Product/MobileComputers/Tablets.jpg',
    subtypes: [
      'Handheld Devices',
      'Tablets',
      'Wearable Computers',
      'Vehicle-Mount Computers',
      'Healthcare Mobile Computers',
    ],
    applications: [
      'Inventory Management',
      'Mobile Point-of-Sale (mPOS)',
      'In-Aisle Assistance',
      'Restocking & Returns',
      'Store Operations & Task Management',
      'Order Fulfilment',
    ],
    specs: ['Android 12+ Enterprise', 'Hot-swap battery', '4G LTE / 5G options', 'IP67 / MIL-STD-810', 'Integrated barcode scanner'],
    brands: ['Zebra', 'Honeywell', 'Datalogic'],
    industries: ['Retail', 'Healthcare', 'Warehousing & Distribution', 'Manufacturing', 'Transportation & Logistics'],
    productCount: 5,
    color: '#0f766e',
    gradient: 'from-[#0f766e]/10 to-[#06a3da]/5',
  },
  {
    id: 'pos',
    title: 'POS Systems',
    icon: 'pos',
    tagline: 'Power your point of sale',
    description: 'Complete POS hardware ecosystem — countertop terminals, mobile POS, self-service kiosks, RFID-enabled POS, integrated scanners, cash drawers, and receipt printers.',
    heroImg: '/assets/img/Product/POS/POSImg.jpg',
    bgImg: '/assets/img/Product/POS/POSImg.jpg',
    subtypes: [
      'Countertop Terminals',
      'Mobile POS (mPOS)',
      'Self-Service Kiosks',
      'Integrated POS with Scanners',
      'RFID-Enabled POS',
      'Thermal Receipt Printers',
      'Cash Drawers',
      'Billing Rolls',
    ],
    applications: [
      'Inventory Management',
      'Mobile Point-of-Sale (mPOS)',
      'Line Busting',
      'In-Aisle Assistance',
      'Restocking & Returns',
      'Store Operations',
    ],
    specs: ['Touch screen 10.1"–15.6"', 'MSR / NFC / EMV capable', 'Android & Windows OS', 'Modular peripheral support', 'Cloud POS software ready'],
    brands: ['Posiflex', 'Newland', 'Epson'],
    industries: ['Retail', 'Hospitality', 'Healthcare', 'Warehousing & Distribution'],
    productCount: 7,
    color: '#7c3aed',
    gradient: 'from-[#7c3aed]/10 to-[#06a3da]/5',
  },
  {
    id: 'rfid',
    title: 'RFID Systems',
    icon: 'rfid',
    tagline: 'Instant inventory visibility',
    description: 'Full RAIN RFID ecosystem — fixed readers, handheld readers, antennas, RFID printers/encoders, and tags for asset tracking and inventory management.',
    heroImg: '/assets/img/Product/RFID/RFID-IMG.jpg',
    bgImg: '/assets/img/Product/RFID/RFID-IMG.jpg',
    subtypes: [
      'Fixed RFID Readers',
      'Handheld RFID Readers',
      'RFID Antennas',
      'RFID Printers & Encoders',
      'UHF RFID Tags & Labels',
    ],
    specs: ['RAIN RFID / UHF Gen2', 'Up to 15m read range', 'Fixed + mobile options', 'ISO 18000-6C compliant', 'Real-time asset tracking'],
    brands: ['Zebra', 'Impinj', 'iDTRONIC'],
    industries: ['Retail', 'Healthcare', 'Manufacturing', 'Warehousing & Distribution', 'Transportation & Logistics'],
    productCount: 4,
    color: '#dc2626',
    gradient: 'from-[#dc2626]/10 to-[#06a3da]/5',
  },
  {
    id: 'consumables',
    title: 'Labels, Tags & Ribbons',
    icon: 'label',
    tagline: 'The right label for every surface',
    description: 'Comprehensive range of barcode labels, specialty tags, and thermal transfer ribbons — from plain paper to polyester, food-safe to tamper-evident.',
    heroImg: '/assets/img/Product/consumable/Printed-Barcode-Label.jpeg',
    bgImg: '/assets/img/Product/consumable/Printed-Barcode-Label.jpeg',
    subtypes: [
      'Plain Barcode Labels',
      'Colored Barcode Labels',
      'Polyester / Durable Labels',
      'Printed Barcode Labels',
      'Food-Safe Labels',
      'Medical / Pharmaceutical Labels',
      'Security & Tamper-Evident Labels',
      'Jewelry Tags',
      'Taffeta Labels',
      'Drum Labels',
      'Thermal Transfer Ribbons',
    ],
    specs: ['Direct thermal & thermal transfer', 'Paper, polyester, polypropylene', 'Custom sizes & shapes', 'FDA / pharmaceutical compliant', 'UV, moisture & chemical resistant'],
    brands: ['Cryptware'],
    industries: ['Retail', 'Healthcare', 'Manufacturing', 'Hospitality', 'Transportation & Logistics'],
    productCount: 16,
    color: '#d97706',
    gradient: 'from-[#d97706]/10 to-[#06a3da]/5',
  },
];

// ─── INDUSTRIES (for /hardware page) ─────────────────────────────────────────
export const hardwareIndustries = [
  { name: 'Retail', iconKey: 'ShoppingCart', desc: 'POS, scanners, mobile computers for checkout, in-aisle assistance, mPOS, and line-busting ops' },
  { name: 'Healthcare', iconKey: 'Heart', desc: 'Patient wristbands, clinical asset tracking, antimicrobial scanners, and mobile healthcare devices' },
  { name: 'Manufacturing', iconKey: 'Factory', desc: 'Industrial printers, ultra-rugged scanners, wearable computers, and RFID asset management' },
  { name: 'Hospitality', iconKey: 'Coffee', desc: 'ID card printers, POS terminals, barcode solutions, and guest check-in systems' },
  { name: 'Warehousing & Distribution', iconKey: 'Box', desc: 'Vehicle-mount computers, fixed scanners, RFID readers, and pick-and-pack automation' },
  { name: 'Transportation & Logistics', iconKey: 'Truck', desc: 'Mobile printers, rugged handhelds, track-and-trace solutions, and forklift terminals' }
];

export const catalogData = [
  // ═══════════════════════════════════════════════════════════
  // TSC PRINTERS — Desktop Series
  // ═══════════════════════════════════════════════════════════
  {
    id: "tsc-te-244",
    title: "TSC TE-244 Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Desktop",
    description: "The TSC TE-244 is a 4-inch desktop thermal transfer barcode label printer designed for versatile, everyday labeling applications. Using one-inch core ribbons up to 300 m, the TE Series delivers exceptional print quality in a compact footprint ideal for retail, healthcare, and light manufacturing environments.",
    img: "/assets/img/Product/TSC/0c1a6912.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI (8 dots/mm)",
      "Print Speed: Up to 5 IPS (127 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Max Label Length: 40\" (1016 mm)",
      "Interface: USB 2.0 + Serial + Ethernet",
      "Media Width: 1\" – 4.64\" (25.4 – 118 mm)",
      "Ribbon Capacity: 1\" core up to 300 m",
      "Power Supply: 100–240V AC, Auto-Switching",
      "Operating Temp: 41°F – 104°F (5°C – 40°C)"
    ],
    models: ["TE-244"],
    useCases: [
      "Retail price & shelf labeling",
      "Shipping & receiving labels",
      "Inventory management",
      "Healthcare specimen labeling",
      "Light-duty manufacturing labels"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/desktop-barcode-printers/te-series",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "tsc-ttp-244-pro",
    title: "TSC TTP-244 PRO Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Desktop",
    description: "The TSC TTP-244 PRO features state-of-the-art electronics that pack even more performance into an entry-level desktop platform. Enhanced from prior TTP models, this thermal transfer printer delivers reliable, high-quality output and includes a built-in real-time clock and extended connectivity options.",
    img: "/assets/img/Product/TSC/02-copy_s.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI (8 dots/mm)",
      "Print Speed: Up to 5 IPS (127 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Max Label Length: 40\" (1016 mm)",
      "Interface: USB 2.0 + Serial + Parallel + Ethernet",
      "Memory: 8 MB SDRAM, 4 MB Flash",
      "Real-Time Clock: Built-in",
      "Media Sensor: Reflective + Transmissive",
      "Power Supply: 100–240V AC, Auto-Switching"
    ],
    models: ["TTP-244 PRO"],
    useCases: [
      "Retail & warehouse labeling",
      "Shipping & logistics",
      "Product identification",
      "Inventory tracking",
      "Office & light industrial use"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/desktop-barcode-printers/ttp-series/ttp-244-pro",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "tsc-te-210",
    title: "TSC TE-210 Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Desktop",
    description: "The TSC TE-210 is a compact 2-inch desktop barcode label printer offering 203 DPI resolution in a smaller form factor. Built for space-constrained environments, it uses 1-inch core ribbons up to 300 m and is ideal for small label applications including jewelry tags, wristbands, and small-format retail labels.",
    img: "/assets/img/Product/TSC/0c1a6912.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI (8 dots/mm)",
      "Print Speed: Up to 5 IPS (127 mm/s)",
      "Print Width: 2.20\" (56 mm)",
      "Max Label Length: 40\" (1016 mm)",
      "Interface: USB 2.0 + Serial + Ethernet",
      "Media Width: 1\" – 2.64\" (25.4 – 67 mm)",
      "Ribbon Capacity: 1\" core up to 300 m",
      "Operating Temp: 41°F – 104°F (5°C – 40°C)",
      "Power Supply: 100–240V AC, Auto-Switching"
    ],
    models: ["TE-210"],
    useCases: [
      "Jewelry & retail tagging",
      "Patient wristbands",
      "Small product labels",
      "Pharmacy prescription labels",
      "Library & asset management"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/desktop-barcode-printers/te-series",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "tsc-te-310",
    title: "TSC TE-310 Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Desktop",
    description: "The TSC TE-310 is a 4-inch desktop thermal transfer barcode label printer with 300 DPI resolution, enabling crisp, high-resolution label output including fine fonts, dense barcodes, and detailed graphics. Perfect for applications requiring superior print clarity such as pharmaceutical, electronics, and compliance labeling.",
    img: "/assets/img/Product/TSC/0c1a6912.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 300 DPI (12 dots/mm)",
      "Print Speed: Up to 5 IPS (127 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Max Label Length: 40\" (1016 mm)",
      "Interface: USB 2.0 + Serial + Ethernet",
      "Media Width: 1\" – 4.64\" (25.4 – 118 mm)",
      "Ribbon Capacity: 1\" core up to 300 m",
      "Operating Temp: 41°F – 104°F (5°C – 40°C)",
      "Power Supply: 100–240V AC, Auto-Switching"
    ],
    models: ["TE-310"],
    useCases: [
      "Pharmaceutical & compliance labels",
      "Electronics component marking",
      "High-density 2D barcode printing",
      "Medical device labeling",
      "Fine-font legal & document labels"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/desktop-barcode-printers/te-series",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "tsc-ta-310",
    title: "TSC TA-310 Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Desktop",
    description: "The TSC TA-310 is a cost-effective, high-resolution 300 DPI thermal transfer desktop printer. Designed for businesses needing crisp barcode and label output at an affordable price point, the TA-310 features a sturdy metal frame, wide media compatibility, and multiple connectivity options.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 300 DPI (12 dots/mm)",
      "Print Speed: Up to 4 IPS (101.6 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Max Label Length: 100\" (2540 mm)",
      "Interface: USB 2.0 + Serial + Ethernet",
      "Media Type: Die-cut, continuous, fan-fold, tags",
      "Memory: 8 MB SDRAM, 4 MB Flash",
      "Cutter: Optional guillotine cutter",
      "Power Supply: 100–240V AC, Auto-Switching"
    ],
    models: ["TA-310"],
    useCases: [
      "Healthcare specimen & pharmacy labels",
      "Electronics component labels",
      "Retail price & product marking",
      "Document & compliance labels",
      "Fine-detail barcode output"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/desktop-barcode-printers/ta-series",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "tsc-da-310",
    title: "TSC DA-310 Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Desktop",
    description: "The TSC DA series desktop printers combine affordability with a durable and reliable design. The DA-310 offers both 203 and 300 DPI print resolution with printing speeds up to 6 IPS. The large 60-watt power supply produces high-quality printed labels even at its fastest print speeds. Linerless models are also available.",
    img: "/assets/img/Product/TSC/da200_3.png",
    specs: [
      "Print Method: Direct Thermal",
      "Resolution: 203 / 300 DPI",
      "Print Speed: Up to 6 IPS (152.4 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Max Label Length: 100\" (2540 mm)",
      "Interface: USB 2.0 + Serial + Ethernet",
      "Power Supply: 60W, 100–240V AC",
      "Media: Linerless & standard label stocks",
      "Cutter: Optional peeler / cutter module",
      "Operating Temp: 41°F – 104°F (5°C – 40°C)"
    ],
    models: ["DA-310"],
    useCases: [
      "Direct thermal linerless labeling",
      "Retail shelf & price labels",
      "Food & grocery labeling",
      "Hospitality order tickets",
      "Healthcare specimen labels"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/desktop-barcode-printers/da-series",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  // ═══════════════════════════════════════════════════════════
  // TSC PRINTERS — Industrial Series
  // ═══════════════════════════════════════════════════════════
  {
    id: "tsc-ml-241-341p",
    title: "TSC ML 241/341P Industrial Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Industrial",
    description: "The TSC ML series represents a new generation of compact industrial barcode label printers designed to fit into more work areas. They feature a durable all-metal construction, ease-of-use, noise-reduced printing, self-diagnostic TPH Care technology, and easy field maintenance — making them ideal for high-volume industrial environments.",
    img: "/assets/img/Product/TSC/ml240-02.png",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI (ML 241P) / 300 DPI (ML 341P)",
      "Print Speed: Up to 6 IPS (152.4 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Max Label Length: 100\" (2540 mm)",
      "Ribbon Capacity: 1\" / 3\" core, up to 450 m",
      "Interface: USB 2.0 + Serial + Ethernet + GPIO",
      "Construction: All-metal housing",
      "TPH Care: Self-diagnostic printhead protection",
      "Operating Temp: 32°F – 104°F (0°C – 40°C)"
    ],
    models: ["ML 241P", "ML 341P"],
    useCases: [
      "Manufacturing production line labeling",
      "Warehousing & distribution",
      "Logistics & shipping labels",
      "Automotive parts identification",
      "Electronics component tracking"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/industrial-barcode-printers/ml-series",
    documents: [],
    type: "hardware",
    classification: "Industrial Printers"
  },
  {
    id: "tsc-mh-261-361p",
    title: "TSC MH 261/361P Industrial Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Industrial",
    description: "The TSC MH series industrial printers deliver premium performance for fast, high-volume label printing. Built for mission-critical environments, the MH series features a rugged metal construction, large color touchscreen display, advanced connectivity, and RFID encoding capability — engineered for 24/7 industrial operation.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI (MH 261P) / 300 DPI (MH 361P)",
      "Print Speed: Up to 12 IPS (304.8 mm/s)",
      "Print Width: 6.6\" (168 mm)",
      "Max Label Length: 150\" (3810 mm)",
      "Ribbon Capacity: 1\" / 3\" core, up to 600 m",
      "Interface: USB Host/Device + Ethernet + Serial + GPIO + Wi-Fi (optional)",
      "Display: 4.3\" Color Touchscreen",
      "RFID: UHF optional",
      "Operating Temp: 32°F – 104°F (0°C – 40°C)"
    ],
    models: ["MH 261P", "MH 361P"],
    useCases: [
      "High-volume warehouse labeling",
      "Manufacturing line automation",
      "RFID tag encoding & printing",
      "Logistics & parcel labeling",
      "Industrial asset & compliance labels"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/industrial-barcode-printers/mh-series",
    documents: [],
    type: "hardware",
    classification: "Industrial Printers"
  },
  {
    id: "tsc-ttp-286mt-384mt",
    title: "TSC TTP 286MT / 384MT Industrial Barcode Label Printer",
    category: "products",
    subcategory: "printers",
    brand: "TSC",
    printerType: "Industrial",
    description: "The TSC TTP-286MT and TTP-384MT industrial barcode printers offer a wide 8-inch print width for oversized label formats. Built with enhanced electronics and state-of-the-art performance, they are ideal for pallet labels, compliance placards, and wide-format industrial labeling requiring 203 or 300 DPI output.",
    img: "/assets/img/Product/TSC/02-copy_s.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI (TTP-286MT) / 300 DPI (TTP-384MT)",
      "Print Speed: Up to 8 IPS (203 mm/s)",
      "Print Width: 8.5\" (216 mm) — Wide Format",
      "Max Label Length: 100\" (2540 mm)",
      "Ribbon: 1\" / 3\" core, up to 600 m",
      "Interface: USB + Serial + Ethernet + Centronics",
      "Memory: 16 MB SDRAM, 8 MB Flash",
      "Cutter: Optional guillotine cutter",
      "Power Supply: 100–240V AC, Auto-Switching"
    ],
    models: ["TTP 286MT", "TTP 384MT"],
    useCases: [
      "Pallet & GS1 compliance labels",
      "Wide-format product identification",
      "Transportation & logistics placards",
      "Manufacturing & warehouse automation",
      "Retail over-labeling & price ticketing"
    ],
    officialUrl: "https://usca.tscprinters.com/en/products/industrial-barcode-printers/ttp-series",
    documents: [],
    type: "hardware",
    classification: "Industrial Printers"
  },
  // ═══════════════════════════════════════════════════════════
  // ZEBRA PRINTERS — Desktop Series
  // ═══════════════════════════════════════════════════════════
  {
    id: "zebra-zd421-zd621",
    title: "Zebra ZD421 / ZD621 Series",
    category: "products",
    subcategory: "printers",
    brand: "Zebra",
    printerType: "Desktop",
    description: "The Zebra ZD421 and ZD621 are advanced 4-inch desktop printers featuring an intuitive user interface, powerful architecture, and field-upgradeable wireless connectivity. Available in Direct Thermal and Thermal Transfer models, plus the ZD421C ribbon-cartridge variant for the easiest ribbon loading in its class. The ZD621 adds enhanced enterprise security and dual-radio capability.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Print Method: Direct Thermal / Thermal Transfer",
      "Resolution: 203 DPI or 300 DPI",
      "Print Speed: Up to 6 IPS (152 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Connectivity: USB + Ethernet + Bluetooth 4.1 + Wi-Fi 802.11ac",
      "Display: 2.5\" Color LCD (ZD621) / LED indicator (ZD421)",
      "Media Handling: Easy-load drop-in media design",
      "Security: NFC for fast pairing, optional Kiosk mode",
      "Power: Universal AC power 100–240V",
      "OS Support: Android, Windows, iOS via Zebra ZSB"
    ],
    models: [
      "ZD421 — 203 DPI (standard enterprise logistics)",
      "ZD421 — 300 DPI (micro-fonts and complex 2D data matrices)",
      "ZD621 — 203 DPI",
      "ZD621 — 300 DPI"
    ],
    useCases: [
      "Enterprise logistics & shipping labels",
      "Retail price & product labeling",
      "Healthcare patient ID & specimen labels",
      "Manufacturing parts identification",
      "Warehousing & distribution"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/printers/desktop/zd400-series/zd421.html",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "zebra-zd411",
    title: "Zebra ZD411",
    category: "products",
    subcategory: "printers",
    brand: "Zebra",
    printerType: "Desktop",
    description: "The Zebra ZD411 is a compact 2-inch desktop printer delivering flexible, secure performance with industry-leading ease of use. Available in Direct Thermal and Thermal Transfer models, it fits tight counter spaces while providing full enterprise-class features including field-upgradeable wireless and Zebra's Link-OS platform for seamless remote management.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Print Method: Direct Thermal / Thermal Transfer",
      "Resolution: 203 DPI or 300 DPI",
      "Print Width: 2.20\" (56 mm)",
      "Print Speed: Up to 6 IPS (152 mm/s)",
      "Connectivity: USB + Ethernet + Bluetooth + Wi-Fi (optional)",
      "Display: LED indicator lights",
      "Media: Die-cut, continuous, fan-fold, tags, wristbands",
      "Link-OS: Remote management via Zebra ZBI / ZSB",
      "Power: Universal 100–240V AC",
      "Operating Temp: 32°F – 104°F (0°C – 40°C)"
    ],
    models: ["ZD411"],
    useCases: [
      "Pharmacy & prescription labeling",
      "Patient wristbands & specimen labels",
      "Retail jewelry & small product tags",
      "Library management",
      "Compact workspace labeling"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/printers/desktop/zd400-series/zd411.html",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "zebra-zd220-zd230",
    title: "Zebra ZD220 / ZD230 Series",
    category: "products",
    subcategory: "printers",
    brand: "Zebra",
    printerType: "Desktop",
    description: "The Zebra ZD220 and ZD230 are affordable, entry-level 4-inch desktop printers engineered for businesses requiring reliable barcode label printing at the lowest total cost. The ZD220 is Direct Thermal only, while the ZD230 adds Thermal Transfer capability. Both deliver proven Zebra quality for asset tracking, labeling, and shipping in economy-tier deployments.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Print Method: Direct Thermal (ZD220) / Thermal Transfer (ZD230)",
      "Resolution: 203 DPI",
      "Print Width: 4.09\" (104 mm)",
      "Print Speed: Up to 5 IPS (127 mm/s)",
      "Connectivity: USB 2.0 + Serial + Ethernet",
      "Media: Die-cut labels, continuous, fan-fold",
      "Display: Single LED status indicator",
      "Power: Universal AC 100–240V",
      "Weight: 2.8 lbs (1.27 kg)",
      "Operating Temp: 32°F – 104°F (0°C – 40°C)"
    ],
    models: [
      "ZD220 — Direct Thermal, 203 DPI (entry-level economy)",
      "ZD230 — Thermal Transfer, 203 DPI"
    ],
    useCases: [
      "Retail asset & inventory labels",
      "Shipping & receiving",
      "Basic product identification",
      "Light office labeling",
      "Entry-level warehousing"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/printers/desktop/zd200-series.html",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "zebra-zd888",
    title: "Zebra ZD888 Series",
    category: "products",
    subcategory: "printers",
    brand: "Zebra",
    printerType: "Desktop",
    description: "The Zebra ZD888 is a value-tier 4-inch direct thermal desktop printer designed for regional markets requiring standard text and barcode output at an affordable price. It delivers reliable performance for everyday labeling applications including shipping, product identification, and light retail use.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Print Method: Direct Thermal",
      "Resolution: 203 DPI",
      "Print Width: 4.09\" (104 mm)",
      "Print Speed: Up to 4 IPS (101.6 mm/s)",
      "Connectivity: USB 2.0 + Serial",
      "Media: Die-cut, continuous paper labels",
      "Display: LED indicator",
      "Power: Universal AC 100–240V",
      "Operating Temp: 32°F – 104°F (0°C – 40°C)",
      "Compliance: RoHS, CE, FCC"
    ],
    models: ["ZD888 — 203 DPI (value-tier regional model, standard text output)"],
    useCases: [
      "Shipping & courier labeling",
      "Retail product marking",
      "Basic inventory tagging",
      "Light office use",
      "Economy-tier deployments"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/printers/desktop.html",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  // ═══════════════════════════════════════════════════════════
  // ZEBRA PRINTERS — Industrial Series
  // ═══════════════════════════════════════════════════════════
  {
    id: "zebra-zt610-zt620",
    title: "Zebra ZT610 / Zebra ZT620",
    category: "products",
    subcategory: "printers",
    brand: "Zebra",
    printerType: "Industrial",
    description: "The Zebra ZT610 and ZT620 are premium industrial printers built for mission-critical, high-volume printing operations. The ZT610 offers a 4-inch print width while the ZT620 provides 6-inch width — both with up to 600 DPI resolution, a 4.3-inch color touchscreen, dual-radio wireless, and RFID encoding. Designed for 24/7 operation in the most demanding environments.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203, 300, or 600 DPI",
      "Print Width: 4.09\" ZT610 / 6.6\" ZT620",
      "Print Speed: Up to 14 IPS (355.6 mm/s)",
      "Display: 4.3\" Color Touchscreen",
      "Connectivity: USB + Ethernet + Serial + Bluetooth + Wi-Fi 802.11ac",
      "Ribbon: 1\" / 3\" core, up to 450 m",
      "RFID: UHF RFID optional",
      "Construction: All-metal industrial housing",
      "Operating Temp: 32°F – 104°F (0°C – 40°C)"
    ],
    models: ["ZT610", "ZT620"],
    useCases: [
      "High-volume warehouse & distribution labeling",
      "Manufacturing production line automation",
      "RFID label encoding",
      "Aerospace & defense parts marking",
      "Transportation & logistics compliance labels"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/printers/industrial/zt600-series.html",
    documents: [],
    type: "hardware",
    classification: "Industrial Printers"
  },
  {
    id: "zebra-zt411-zt421-zt510",
    title: "Zebra ZT411 / ZT421 / ZT510",
    category: "products",
    subcategory: "printers",
    brand: "Zebra",
    printerType: "Industrial",
    description: "The Zebra ZT411, ZT421, and ZT510 are industrial-class barcode label printers combining advanced management capabilities with exceptional value. The ZT510 is a 4-inch model offering core industrial features; the ZT411 (4-inch) and ZT421 (6-inch) add RFID encoding, a color touchscreen, and enhanced connectivity — making them the most flexible mid-range industrial printers available.",
    img: "/assets/img/Product/Zebra/brand-photography-website-about-us-en-us.jpg.imgo.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203, 300, or 600 DPI",
      "Print Width: 4.09\" (ZT411/ZT510) / 6.6\" (ZT421)",
      "Print Speed: Up to 12 IPS (304.8 mm/s)",
      "Display: 4.3\" Color Touchscreen (ZT411/ZT421) / Monochrome (ZT510)",
      "Connectivity: USB + Ethernet + Bluetooth + Wi-Fi (optional)",
      "Ribbon: 1\" / 3\" core, up to 450 m",
      "RFID: UHF RFID (ZT411/ZT421, optional)",
      "Construction: All-metal industrial frame",
      "Operating Temp: 32°F – 104°F (0°C – 40°C)"
    ],
    models: ["ZT411", "ZT421", "ZT510"],
    useCases: [
      "Industrial warehouse labeling",
      "Logistics & distribution center automation",
      "RFID tag printing & encoding",
      "Manufacturing parts & compliance labels",
      "Retail supply chain management"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/printers/industrial/zt400-series.html",
    documents: [],
    type: "hardware",
    classification: "Industrial Printers"
  },
  // ═══════════════════════════════════════════════════════════
  // HONEYWELL PRINTERS
  // ═══════════════════════════════════════════════════════════
  {
    id: "honeywell-pc42t",
    title: "Honeywell PC42t / PC42t Plus",
    category: "products",
    subcategory: "printers",
    brand: "Honeywell",
    printerType: "Desktop",
    description: "The Honeywell PC42t and PC42t Plus are compact, affordable desktop thermal transfer barcode printers designed for light-duty labeling applications. The PC42t Plus adds USB host capability for direct keyboard input and additional interface options. Both deliver reliable print quality for retail, shipping, and light industrial use at a budget-friendly price point.",
    img: "/assets/img/Product/Honeywell/sps-ppr-pc42t-printer-1.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI (8 dots/mm)",
      "Print Speed: Up to 4 IPS (101.6 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Max Label Length: 60\" (1524 mm)",
      "Connectivity: USB 2.0 + Serial + Ethernet",
      "USB Host: Yes (PC42t Plus only)",
      "Media Width: 1\" – 4.4\" (25 – 112 mm)",
      "Power: External Adapter 100–240V AC",
      "Operating Temp: 41°F – 104°F (5°C – 40°C)"
    ],
    models: [
      "PC42t — 203 DPI (budget workhorse)",
      "PC42t Plus — 203 DPI (USB host enabled)"
    ],
    useCases: [
      "Retail price & shelf labeling",
      "Shipping & receiving labels",
      "Light-duty inventory labeling",
      "Office barcode printing",
      "Product identification"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-printers/desktop/pc42t-desktop-printer",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "honeywell-pc45t",
    title: "Honeywell PC45t Series",
    category: "products",
    subcategory: "printers",
    brand: "Honeywell",
    printerType: "Desktop",
    description: "The Honeywell PC45t is a next-generation connected desktop printer built for modern retail and medical environments. Supporting both 203 and 300 DPI, it features a 2.4-inch LCD display, USB host for direct input devices, optional Wi-Fi, and Honeywell's SmartPrint Companion app for wireless configuration. The 300 DPI variant excels at high-accuracy medical and asset tracking labels.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI or 300 DPI",
      "Print Speed: Up to 5 IPS (127 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Display: 2.4\" Monochrome LCD",
      "Connectivity: USB + Ethernet + Wi-Fi 802.11ac (optional) + BT 4.2",
      "USB Host: Yes (for scanner / keyboard / USB drive)",
      "Media Width: 1\" – 4.65\" (25.4 – 118 mm)",
      "Power: Universal 100–240V AC",
      "Operating Temp: 41°F – 104°F (5°C – 40°C)"
    ],
    models: [
      "PC45t — 203 DPI (next-generation connected retail)",
      "PC45t — 300 DPI (high-accuracy medical and asset tracking)"
    ],
    useCases: [
      "Connected retail labeling",
      "Medical device & specimen labels",
      "Asset tracking in healthcare",
      "Pharmacy & prescription printing",
      "Distribution & logistics"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-printers/desktop/pc45t-desktop-printer",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  {
    id: "honeywell-pc43t",
    title: "Honeywell PC43t Series",
    category: "products",
    subcategory: "printers",
    brand: "Honeywell",
    printerType: "Desktop",
    description: "The Honeywell PC43t is an LCD-equipped mid-range desktop barcode printer offering an intuitive 2.4-inch display for standalone operation without a connected PC. Available in 203 and 300 DPI variants, the 300 DPI model delivers detailed graphics and fine textual prints ideal for healthcare, electronics, and precision labeling environments.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "Print Method: Thermal Transfer / Direct Thermal",
      "Resolution: 203 DPI or 300 DPI",
      "Print Speed: Up to 5 IPS (127 mm/s)",
      "Print Width: 4.09\" (104 mm)",
      "Display: 2.4\" Color LCD with keypad",
      "Connectivity: USB + Ethernet + Wi-Fi (optional) + BT",
      "USB Host: Yes (external USB keyboard / scanner)",
      "Memory: 8 MB SDRAM, 4 MB Flash",
      "Power: Universal 100–240V AC",
      "Operating Temp: 41°F – 104°F (5°C – 40°C)"
    ],
    models: [
      "PC43t — 203 DPI (LCD-equipped mid-range)",
      "PC43t — 300 DPI (detailed graphics / fine textual prints)"
    ],
    useCases: [
      "Healthcare specimen & wristband printing",
      "Electronics & PCB component marking",
      "Manufacturing quality control labels",
      "Retail product identification",
      "Standalone label printing without PC"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-printers/desktop/pc43t-desktop-printer",
    documents: [],
    type: "hardware",
    classification: "Desktop Printers"
  },
  // ═══════════════════════════════════════════════════════════
  // MOBILE COMPUTERS — Zebra Handheld Devices
  // ═══════════════════════════════════════════════════════════
  {
    id: "zebra-mc9400-mc9450",
    title: "Zebra MC9400/MC9450 Mobile Computer",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra MC9400 and MC9450 are the most powerful mission-critical handheld mobile computers Zebra has ever built. Featuring Wi-Fi 6E, optional 5G connectivity, and the SE58 Extended Range Scan Engine with IntelliFocus technology, these ultra-rugged devices deliver unmatched performance for the most demanding warehouse, manufacturing, and field service operations.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "OS: Android 13 (upgradeable to Android 15+)",
      "Processor: Qualcomm 6490 Octa-core 2.7 GHz",
      "RAM: 8 GB / Storage: 128 GB UFS",
      "Display: 4.0\" WVGA Gorilla Glass, 1-2 glove touch",
      "Scan Engine: SE58 1D/2D Extended Range + IntelliFocus",
      "Wireless: Wi-Fi 6E (802.11a/b/g/n/ac/ax) + 5G optional",
      "Bluetooth: 5.3",
      "Battery: 7,000 mAh, hot-swap PowerPrecision+",
      "Rugged: IP67 + MIL-STD-810H",
      "Drop Rating: 6 ft (1.8 m) multiple drops to concrete"
    ],
    models: ["MC9400", "MC9450"],
    useCases: [
      "Inventory management in large warehouses",
      "Manufacturing plant floor operations",
      "Receiving & shipping verification",
      "Distribution center picking & packing",
      "Field service & asset management"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/mc9400.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-mc3400-mc3450",
    title: "Zebra MC3400/MC3450 Mobile Computer",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra MC3400 series brings next-generation power, scanning, and connectivity to the best-selling MC33 form factor. With Wi-Fi 6E, optional 5G, and advanced scanning options, the MC3400 and MC3450 deliver best-in-class rugged performance for retail, warehouse, and distribution environments in a comfortable, lightweight design.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "OS: Android 13 (upgradeable)",
      "Processor: Qualcomm 6490 Octa-core 2.7 GHz",
      "RAM: 6 GB / Storage: 64 GB UFS",
      "Display: 4.0\" WVGA Gorilla Glass, glove-touch",
      "Scan Engine: SE4850 / SE58 Extended Range options",
      "Wireless: Wi-Fi 6E (802.11ax) + 5G Sub-6 GHz (MC3450)",
      "Bluetooth: 5.3",
      "Battery: 5,200 mAh hot-swap PowerPrecision+",
      "Rugged: IP65 + MIL-STD-810H",
      "Drop Rating: 5 ft (1.5 m) to concrete"
    ],
    models: ["MC3400", "MC3450"],
    useCases: [
      "Retail inventory & stock counting",
      "In-aisle product & price checks",
      "Warehouse order picking",
      "Restocking & returns management",
      "Mobile point-of-sale (mPOS)"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/mc3400.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-tc15-tn28",
    title: "Zebra TC15 / TN28",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra TC15 and TN28 are enterprise-class mobile computers in a smartphone-inspired form factor. Designed for frontline workers, they combine the look and feel of a consumer device with enterprise durability, dedicated scan engine, and Zebra's LifeGuard security platform — delivering reliable connectivity and productivity for retail, hospitality, and light industrial use.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "OS: Android 13 Enterprise",
      "Processor: Octa-core 2.0 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Display: 6.0\" FHD+ Corning Gorilla Glass",
      "Scan Engine: Integrated 1D/2D rear-facing imager",
      "Wireless: Wi-Fi 6 (802.11ax) + 4G LTE",
      "Bluetooth: 5.1 + NFC",
      "Battery: 4,300 mAh",
      "Rugged: IP65",
      "Drop Rating: 4 ft (1.2 m) to concrete"
    ],
    models: ["TC15", "TN28"],
    useCases: [
      "Retail frontline worker applications",
      "Mobile POS & line busting",
      "In-aisle assistance & product checks",
      "Hospitality order management",
      "Light warehouse & field operations"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/tc1-series.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-tc22-tc27",
    title: "Zebra TC22/TC27",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra TC22 and TC27 are purpose-built enterprise mobile computers designed to give small and mid-sized businesses a cost-effective path to enterprise productivity. The TC22 supports Wi-Fi only while the TC27 adds 4G LTE. Both deliver reliable scanning, long battery life, and Zebra's Mobility DNA software suite for simplified device management.",
    img: "/assets/img/Product/Zebra/zebra-tc22-tc27.jpg",
    specs: [
      "OS: Android 11 (upgradeable to Android 13)",
      "Processor: Qualcomm 4490 Octa-core 2.4 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Display: 5.0\" HD Corning Gorilla Glass",
      "Scan Engine: SE4100 1D/2D imager",
      "Wireless: Wi-Fi 6 (TC22) / Wi-Fi 6 + 4G LTE (TC27)",
      "Bluetooth: 5.1 + NFC",
      "Battery: 4,000 mAh",
      "Rugged: IP52",
      "Drop Rating: 4 ft (1.2 m) to concrete"
    ],
    models: ["TC22", "TC27"],
    useCases: [
      "SMB retail inventory management",
      "Mobile POS for small stores",
      "Order fulfilment (BOPIS/BOPAC)",
      "Store task management",
      "Light warehousing & delivery"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/tc2-series.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-tc5-series",
    title: "Zebra TC5 Series (TC501/TC53/TC58/TC53e/TC58e-RFID)",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra TC5 series builds on the best-selling TC52/TC57 platform, offering models that span standard enterprise to RFID-enabled configurations. The TC53 (Wi-Fi) and TC58 (5G) deliver rugged performance with SE4850/SE55 extended-range scanning. The TC53e and TC58e feature enhanced display brightness, while the TC58e-RFID adds integrated UHF RFID capability for inventory operations.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "OS: Android 11/13 (upgradeable)",
      "Processor: Qualcomm 6490 Octa-core 2.7 GHz (TC53e/TC58e)",
      "RAM: 6 GB / Storage: 128 GB",
      "Display: 5.0\" FHD Gorilla Glass 5, 1000 nit outdoor-readable",
      "Scan Engine: SE4850/SE55 Extended Range 1D/2D",
      "Wireless: Wi-Fi 6E (TC53/TC53e) / 5G Sub-6 GHz (TC58/TC58e)",
      "RFID: Integrated UHF RFID (TC58e-RFID model)",
      "Battery: 5,000 mAh hot-swap PowerPrecision+",
      "Rugged: IP67 + MIL-STD-810H",
      "Drop Rating: 6 ft (1.8 m) to concrete"
    ],
    models: ["TC501", "TC53", "TC58", "TC53e", "TC58e-RFID"],
    useCases: [
      "Retail inventory & replenishment",
      "Warehouse order picking",
      "RFID-based stock counting (TC58e-RFID)",
      "Store operations & task management",
      "Mobile POS & line busting"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/tc5-series.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-tc7-series",
    title: "Zebra TC7 Series (TC701/TC73/TC78)",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra TC7 series is the ultimate rugged mobile computer for demanding indoor and outdoor environments. The TC73 (Wi-Fi 6E) and TC78 (5G) deliver outstanding performance for warehouse, yard, and field service operations with a large 6-inch display, superior extended-range scanning, and exceptional durability. The TC701 provides an entry-level configuration in the same rugged TC7 body.",
    img: "/assets/img/Product/Zebra/courier-photography-website-application-tc78-zq220-proof-of-delivery-printing-receipt-5x4-3600.jpg.imgo.jpg",
    specs: [
      "OS: Android 13 (upgradeable)",
      "Processor: Qualcomm 6490 Octa-core 2.7 GHz",
      "RAM: 8 GB / Storage: 128 GB UFS",
      "Display: 6.0\" FHD Gorilla Glass 5, 1000 nit",
      "Scan Engine: SE58 Extended Range with IntelliFocus",
      "Wireless: Wi-Fi 6E (TC73) / 5G Sub-6 GHz (TC78)",
      "Bluetooth: 5.3 + NFC",
      "Battery: 6,700 mAh hot-swap PowerPrecision+",
      "Rugged: IP68 + MIL-STD-810H",
      "Drop Rating: 8 ft (2.4 m) to concrete"
    ],
    models: ["TC701", "TC73", "TC78"],
    useCases: [
      "Ultra-rugged warehouse operations",
      "Outdoor field service & logistics",
      "Transportation & proof-of-delivery",
      "Manufacturing plant floor",
      "Public safety & utility field work"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/tc7-series.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-fr55",
    title: "Zebra FR55 First Responder",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra FR55 is purpose-built for public safety and first responder operations. Designed to meet the unique demands of police, fire, and EMS, the FR55 features a rugged, durable form factor with an isolated battery compartment for use in explosive atmospheres, a programmable emergency button, and a large outdoor-readable display for reliable communication and data access in the field.",
    img: "/assets/img/Product/Zebra/zebra-fr55-first-responder.jpg",
    specs: [
      "OS: Android 11 Enterprise",
      "Processor: Qualcomm Octa-core",
      "RAM: 6 GB / Storage: 128 GB",
      "Display: 5.5\" FHD Gorilla Glass, 1000 nit sunlight-readable",
      "Scan Engine: Integrated 1D/2D imager",
      "Wireless: Wi-Fi 6 + 4G LTE + FirstNet Ready",
      "Bluetooth: 5.1 + NFC",
      "Battery: 5,000 mAh (isolated ATEX compartment)",
      "Rugged: IP68 + MIL-STD-810H",
      "Special: Emergency PTT button, ATEX Zone 2 certified"
    ],
    models: ["FR55"],
    useCases: [
      "Police field reporting & evidence capture",
      "Fire & EMS incident management",
      "Public safety communications",
      "Emergency dispatch & response",
      "Critical infrastructure inspection"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/fr55.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-em45",
    title: "Zebra EM45 Enterprise Mobile Computer",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra EM45 is a versatile enterprise mobile device delivering a premium consumer-like experience with enterprise-grade security and manageability. Designed for frontline workers who need a smartphone-style device with enterprise connectivity and Zebra's LifeGuard security updates, the EM45 bridges the gap between consumer and dedicated enterprise mobile computers.",
    img: "/assets/img/Product/Zebra/zebra-em45-enterprise-mobile-computer.jpg",
    specs: [
      "OS: Android 12 Enterprise",
      "Processor: Qualcomm Octa-core 2.4 GHz",
      "RAM: 8 GB / Storage: 128 GB",
      "Display: 6.5\" FHD+ AMOLED",
      "Scan Engine: Rear-facing 1D/2D imager",
      "Wireless: Wi-Fi 6 (802.11ax) + 5G Sub-6 GHz",
      "Bluetooth: 5.2 + NFC",
      "Battery: 5,000 mAh",
      "Rugged: IP68",
      "Special: eSIM + Dual SIM, Google Play Protect"
    ],
    models: ["EM45"],
    useCases: [
      "Enterprise mobility for frontline workers",
      "Retail customer engagement",
      "Field sales & order management",
      "Healthcare bedside computing",
      "Hospitality & guest services"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/em45.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "zebra-ps30",
    title: "Zebra PS30 Personal Shopper",
    category: "products",
    subcategory: "computing",
    brand: "Zebra",
    description: "The Zebra PS30 Personal Shopper is designed to transform the retail customer experience by enabling self-scanning in the store. Compact and ergonomic, it features a dedicated 1D/2D scan engine, a customer-facing display for real-time feedback, and enterprise-grade management — helping retailers reduce checkout friction and increase customer satisfaction.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Qualcomm Octa-core",
      "RAM: 2 GB / Storage: 16 GB",
      "Display: 3.5\" Touch (associate-facing)",
      "Scan Engine: SE4100 1D/2D Imager",
      "Wireless: Wi-Fi 5 (802.11ac) + Bluetooth 5.0",
      "Battery: Long-life for full retail shift",
      "Dock: Multi-slot charging cradle",
      "Rugged: Drop-resistant for retail environments",
      "Special: Designed for in-store customer self-scanning"
    ],
    models: ["PS30"],
    useCases: [
      "Customer self-scanning in grocery retail",
      "In-aisle product price & info checks",
      "Loyalty program management at checkout",
      "Scan-and-go mobile checkout",
      "Retail customer engagement"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/mobile-computers/handheld/ps30.html",
    documents: [],
    type: "hardware",
    classification: "Healthcare & Retail Computers"
  },
  // ═══════════════════════════════════════════════════════════
  // MOBILE COMPUTERS — Honeywell Handheld Devices
  // ═══════════════════════════════════════════════════════════
  {
    id: "honeywell-ct-series",
    title: "Honeywell CT Series",
    category: "products",
    subcategory: "computing",
    brand: "Honeywell",
    description: "The Honeywell CT series is a comprehensive family of versatile and highly rugged enterprise mobile computers designed for retail, warehouse, and field service environments. Spanning from the entry-level CT30 (Dolphin) to the ultra-rugged CT47 and CT70, each model delivers optimized performance for its target use case with Android Enterprise, Honeywell's Mobility Edge platform, and best-in-class scanning.",
    img: "/assets/img/Product/Honeywell/honeywell-ct-series.jpg",
    specs: [
      "OS: Android 11/13 Enterprise (Mobility Edge Platform)",
      "Processor: Qualcomm Octa-core (varies by model)",
      "RAM: 3–6 GB / Storage: 32–128 GB",
      "Display: 4.0\" – 6.0\" (model dependent)",
      "Scan Engine: N6803FR FlexRange / N6800 (model dependent)",
      "Wireless: Wi-Fi 6E / 4G LTE / 5G (model dependent)",
      "Bluetooth: 5.x + NFC",
      "Battery: 3,000–4,600 mAh (model dependent)",
      "Rugged: IP65/IP67 + MIL-STD-810H",
      "Drop Rating: 4–6 ft (1.2–1.8 m)"
    ],
    models: [
      "CT30 (Dolphin) — Entry-level, retail & light use",
      "CT30-XP — Extended ruggedness, retail",
      "CT32 — Mid-range enterprise",
      "CT37 — Keypad enterprise model",
      "CT40-XP — Enhanced outdoor rugged",
      "CT45 — Mid-range, 5G-ready",
      "CT45-XP — Extended rugged with 5G",
      "CT47 — Ultra-rugged, warehouse & field",
      "CT60-XP — Ultra-rugged with 5G + extended range scan",
      "CT70 — Max rugged, outdoor operations"
    ],
    useCases: [
      "Retail inventory & store operations",
      "Warehouse picking & packing",
      "Field service & delivery",
      "In-aisle assistance & price checks",
      "Order fulfilment (BOPIS/BOPAC)"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/mobile-computers/handheld-computers",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "honeywell-ck-series",
    title: "Honeywell CK Series",
    category: "products",
    subcategory: "computing",
    brand: "Honeywell",
    description: "The Honeywell CK series are ultra-rugged enterprise mobile computers built for the most demanding environments including cold storage, heavy industry, and outdoor logistics. The CK65 and CK67 feature a physical numeric keypad alongside a touchscreen for reliable data entry in gloves, while the CK65 Cold Storage variant is optimized for freezer warehousing operations down to -30°C.",
    img: "/assets/img/Product/Honeywell/honeywell-ck-series.jpg",
    specs: [
      "OS: Android 9/11 Enterprise (Mobility Edge Platform)",
      "Processor: Qualcomm Snapdragon 660 Octa-core 2.2 GHz",
      "RAM: 3–4 GB / Storage: 32–64 GB",
      "Display: 4.0\" WVGA Gorilla Glass, glove/wet-touch",
      "Scan Engine: N6803FR FlexRange Extended 1D/2D",
      "Wireless: Wi-Fi 5 (802.11ac) + Bluetooth 5.0",
      "Keypad: Numeric + function keys",
      "Battery: 6,700 mAh hot-swap",
      "Rugged: IP67 + MIL-STD-810G",
      "Cold Storage: -30°C to 50°C (CK65 Cold Storage)"
    ],
    models: [
      "CK62 Rugged",
      "CK65 Ultrarugged",
      "CK65 Cold Storage",
      "CK67 Ultrarugged"
    ],
    useCases: [
      "Cold chain & freezer warehouse operations",
      "Heavy industrial plant floor",
      "Distribution center picking with keypad",
      "Outdoor logistics & yard management",
      "Manufacturing quality control"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/mobile-computers/handheld-computers/ck65-mobile-computer",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "honeywell-cn80g-cn80",
    title: "Honeywell CN80G / CN80",
    category: "products",
    subcategory: "computing",
    brand: "Honeywell",
    description: "The Honeywell CN80 and CN80G are ultra-rugged mobile computers offering both a large 4-inch touchscreen and a full physical keypad for reliable data entry in any condition. Designed for warehouse, outdoor, and field service operations, these devices provide extended battery life, extreme ruggedness, and Honeywell's FlexRange scan engine for near-far scanning without mode switching.",
    img: "/assets/img/Product/Honeywell/honeywell-cn80g-cn80.jpg",
    specs: [
      "OS: Android 8.1 / Android 11 (Mobility Edge Platform)",
      "Processor: Qualcomm Snapdragon 660 Octa-core 2.2 GHz",
      "RAM: 3 GB / Storage: 32 GB",
      "Display: 4.2\" WVGA Gorilla Glass, glove-touch",
      "Scan Engine: N6803FR FlexRange (near + extended range)",
      "Wireless: Wi-Fi 5 (802.11a/b/g/n/ac) + 4G LTE (CN80G)",
      "Keypad: Full QWERTY / Numeric options",
      "Battery: 7,000 mAh hot-swap",
      "Rugged: IP67 + MIL-STD-810G",
      "Drop Rating: 5 ft (1.5 m) to concrete"
    ],
    models: ["CN80", "CN80G (with 4G LTE)"],
    useCases: [
      "Outdoor field service & utilities",
      "Warehouse operations requiring keypad input",
      "Transportation & logistics",
      "Cold storage & freezer environments",
      "Rugged manufacturing operations"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/mobile-computers/handheld-computers/cn80-mobile-computer",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "honeywell-eda-series",
    title: "Honeywell EDA Series",
    category: "products",
    subcategory: "computing",
    brand: "Honeywell",
    description: "The Honeywell EDA series covers enterprise data acquisition devices ranging from the lightweight EDA5/EDA5S for retail applications to the powerful EDA61K for demanding warehouse use. Built on Honeywell's Mobility Edge platform, the EDA series supports Android Enterprise, Honeywell's Mobility SDK, and features 5G connectivity in select models for high-bandwidth enterprise mobility.",
    img: "/assets/img/Product/Honeywell/honeywell-eda-series.jpg",
    specs: [
      "OS: Android 11/13 Enterprise (Mobility Edge Platform)",
      "Processor: Octa-core 2.0–2.4 GHz (model dependent)",
      "RAM: 3–6 GB / Storage: 32–128 GB",
      "Display: 5.0\" – 6.0\" FHD (model dependent)",
      "Scan Engine: N3603 / N6700 1D/2D (model dependent)",
      "Wireless: Wi-Fi 5/6E + 4G LTE / 5G Sub-6 (EDA56-5G)",
      "Bluetooth: 5.x + NFC",
      "Battery: 3,000–4,500 mAh",
      "Rugged: IP64/IP67 + MIL-STD-810H",
      "Drop Rating: 4–5 ft (1.2–1.5 m)"
    ],
    models: [
      "EDA5 — Entry-level retail/light warehouse",
      "EDA5S — Slim form factor",
      "EDA56 — Mid-range enterprise",
      "EDA56-5G — 5G connected enterprise",
      "EDA61K — Rugged keypad model"
    ],
    useCases: [
      "Retail inventory management",
      "Warehouse picking & scanning",
      "In-aisle assistance & product checks",
      "Order fulfilment & restocking",
      "Store task management & communications"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/mobile-computers/handheld-computers",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "honeywell-scanpal-series",
    title: "Honeywell ScanPal Series",
    category: "products",
    subcategory: "computing",
    brand: "Honeywell",
    description: "The Honeywell ScanPal series offers cost-effective enterprise mobile computers that deliver reliable, secure connectivity and rugged durability for retail and light warehouse applications. The ScanPal EDA51, EDA57, and EDA56 Wi-Fi 6 provide a range of capabilities from entry-level scanning to advanced wireless performance, all built on Android Enterprise with Honeywell's Mobility DNA software.",
    img: "/assets/img/Product/Honeywell/honeywell-scanpal-series.jpg",
    specs: [
      "OS: Android 10/11 Enterprise",
      "Processor: Octa-core 2.0 GHz",
      "RAM: 3 GB / Storage: 32 GB",
      "Display: 5.0\" HD / 5.5\" FHD",
      "Scan Engine: N3603 1D/2D Area Imager",
      "Wireless: Wi-Fi 5 / Wi-Fi 6 (EDA56 Wi-Fi6) + BT 5.0",
      "Battery: 3,000–3,800 mAh",
      "Rugged: IP67",
      "Drop Rating: 4 ft (1.2 m)",
      "Special: Honeywell Operational Intelligence ready"
    ],
    models: [
      "ScanPal EDA51 — Entry-level barcode scanner",
      "ScanPal EDA57 — Mid-range enterprise",
      "ScanPal EDA56 Wi-Fi 6 — Advanced wireless retail"
    ],
    useCases: [
      "Retail stock counting & inventory",
      "Restocking & shelf management",
      "Store task management",
      "Light warehouse operations",
      "Mobile point-of-sale (mPOS)"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/mobile-computers/handheld-computers/eda51-mobile-computer",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  // ═══════════════════════════════════════════════════════════
  // MOBILE COMPUTERS — Datalogic Handheld Devices
  // ═══════════════════════════════════════════════════════════
  {
    id: "datalogic-memor-12-17",
    title: "Datalogic Memor 12/17",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Memor 12 and Memor 17 are full-touch, rugged Android enterprise PDAs built for retail, healthcare, and light warehouse applications. The Memor 17 features a larger 5.7-inch display, while both offer Datalogic's advanced Green Spot for good-read feedback, enterprise-class scanning, and Datalogic's Wavelink Avalanche ready management platform.",
    img: "/assets/img/Product/Datalogic/datalogic-memor-12-17.jpg",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Qualcomm Snapdragon 660 Octa-core 2.2 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Display: 4.0\" WVGA (Memor 12) / 5.7\" FHD (Memor 17)",
      "Scan Engine: 1D/2D with Green Spot good-read feedback",
      "Wireless: Wi-Fi 5 (802.11a/b/g/n/ac) + BT 5.0 + 4G LTE optional",
      "NFC: Yes",
      "Battery: 3,600–5,000 mAh",
      "Rugged: IP65 + MIL-STD-810G",
      "Drop Rating: 5 ft (1.5 m) to concrete"
    ],
    models: ["Memor 12", "Memor 17"],
    useCases: [
      "Retail inventory & price checking",
      "Healthcare specimen tracking",
      "Light warehouse scanning",
      "In-store customer assistance",
      "Restocking & shelf management"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/rugged-pdas/memor-10-pd-814.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "datalogic-memor-11",
    title: "Datalogic Memor 11",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Memor 11 is a compact, lightweight enterprise Android PDA that combines a consumer-friendly design with enterprise-class durability and scanning performance. Ideal for retail and healthcare frontline workers, it features a high-resolution 1D/2D imager, Datalogic's signature Green Spot, and a slim form factor that fits comfortably in a shirt pocket or worn all-day.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Qualcomm Octa-core 1.8 GHz",
      "RAM: 3 GB / Storage: 32 GB",
      "Display: 5.0\" HD Gorilla Glass",
      "Scan Engine: 1D/2D Mega Pixel Imager with Green Spot",
      "Wireless: Wi-Fi 5 (802.11a/b/g/n/ac) + BT 5.0",
      "NFC: Yes",
      "Battery: 4,000 mAh",
      "Rugged: IP54",
      "Drop Rating: 4.9 ft (1.5 m)"
    ],
    models: ["Memor 11"],
    useCases: [
      "Retail frontline operations",
      "Healthcare clinical scanning",
      "Light inventory management",
      "Customer-facing retail assistance",
      "Field service data capture"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/rugged-pdas/memor-11-pd-849.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "datalogic-memor-30-35",
    title: "Datalogic Memor 30/35",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Memor 30 and Memor 35 are mid-range rugged enterprise Android PDAs offering enhanced scanning performance and enterprise connectivity for warehouse and logistics applications. Both feature Datalogic's SE4850/2D imager with Green Spot feedback, while the Memor 35 adds a physical numeric keypad for environments requiring keypad data entry alongside touchscreen operation.",
    img: "/assets/img/Product/Datalogic/datalogic-memor-30-35.jpg",
    specs: [
      "OS: Android 11 Enterprise",
      "Processor: Qualcomm Snapdragon 660 Octa-core 2.2 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Display: 5.0\" FHD Gorilla Glass (touch + glove compatible)",
      "Scan Engine: 1D/2D with Green Spot + optional DPM reader",
      "Wireless: Wi-Fi 6 (802.11ax) + BT 5.0 + 4G LTE",
      "NFC: Yes",
      "Battery: 5,000 mAh hot-swap",
      "Rugged: IP65 + MIL-STD-810H",
      "Drop Rating: 5 ft (1.5 m)"
    ],
    models: ["Memor 30", "Memor 35 (with numeric keypad)"],
    useCases: [
      "Warehouse order picking & receiving",
      "Distribution center operations",
      "Manufacturing & production tracking",
      "Transportation & logistics scanning",
      "Field service & asset management"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/rugged-pdas/memor-30-pd-874.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "datalogic-joya-smart",
    title: "Datalogic Joya Smart & Smart+",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Joya Smart and Smart+ are personal shopper devices purpose-built for retail self-scanning applications. Ultra-compact and ergonomic, they enable customers to scan items as they shop, reducing checkout queues and enhancing the shopping experience. The Smart+ adds Wi-Fi 5 and a customer-facing pistol grip with trigger for improved scanning ergonomics.",
    img: "/assets/img/Product/Datalogic/datalogic-joya-smart-smart-.jpg",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Quad-core 1.4 GHz",
      "RAM: 1 GB / Storage: 8 GB",
      "Display: 3.5\" HVGA Touch",
      "Scan Engine: 1D/2D Imager with Green Spot",
      "Wireless: Wi-Fi 5 (802.11 a/b/g/n/ac)",
      "Bluetooth: 4.2",
      "Battery: Long-shift capable",
      "Rugged: IP54, Drop 4.9 ft (1.5 m)",
      "Form Factor: Compact pistol-grip personal shopper"
    ],
    models: ["Joya Smart", "Joya Smart+"],
    useCases: [
      "Retail customer self-scanning",
      "Scan-and-go checkout",
      "In-store inventory assistance",
      "Customer loyalty & promotions at scan",
      "Grocery & supermarket shopping"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/personal-shoppers/joya-smart-pd-858.html",
    documents: [],
    type: "hardware",
    classification: "Healthcare & Retail Computers"
  },
  {
    id: "datalogic-joya-touch-22",
    title: "Datalogic Joya Touch 22",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Joya Touch 22 is an advanced Android-based personal shopper designed for next-generation retail self-scanning. With a large 5.0-inch display, Wi-Fi 6, and Datalogic's all-in-one scanner design, the Joya Touch 22 delivers an intuitive, app-rich shopping experience while reducing checkout friction and supporting loyalty program integration.",
    img: "/assets/img/Product/Datalogic/datalogic-joya-touch-22.png",
    specs: [
      "OS: Android 11 Enterprise",
      "Processor: Qualcomm Octa-core 1.8 GHz",
      "RAM: 3 GB / Storage: 32 GB",
      "Display: 5.0\" FHD Gorilla Glass Touch",
      "Scan Engine: 1D/2D Mega Pixel Imager with Green Spot",
      "Wireless: Wi-Fi 6 (802.11ax) + BT 5.0",
      "NFC: Yes",
      "Battery: 3,800 mAh",
      "Rugged: IP52, Drop 4 ft (1.2 m)",
      "Special: Designed for customer self-scanning in retail"
    ],
    models: ["Joya Touch 22"],
    useCases: [
      "Next-gen retail self-scanning",
      "Scan-and-go mobile checkout",
      "Customer loyalty & digital coupons",
      "In-store navigation & product lookup",
      "Grocery & supermarket smart shopping"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/personal-shoppers/joya-touch-22-pd-872.html",
    documents: [],
    type: "hardware",
    classification: "Healthcare & Retail Computers"
  },
  {
    id: "datalogic-skorpio-x5",
    title: "Datalogic Skorpio X5",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Skorpio X5 is a premium, ultra-rugged enterprise mobile computer with an ergonomic pistol-grip form factor built for high-volume scanning in demanding warehouse and manufacturing environments. Featuring Datalogic's SE4850 extended-range scan engine, a high-capacity hot-swap battery, Wi-Fi 6, and Class 1 Division 2 certification, the Skorpio X5 handles the toughest industrial workflows.",
    img: "/assets/img/Product/Datalogic/FIXED_RETAIL.jpg",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Qualcomm Snapdragon 660 Octa-core 2.2 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Display: 4.3\" WVGA Gorilla Glass, glove-touch",
      "Scan Engine: SE4850 Extended Range 1D/2D with Green Spot",
      "Wireless: Wi-Fi 6 (802.11ax) + BT 5.0",
      "Battery: 5,200 mAh hot-swap",
      "Rugged: IP65 + MIL-STD-810H",
      "Drop Rating: 5 ft (1.5 m)",
      "Special: Class 1 Div 2 hazardous location certified"
    ],
    models: ["Skorpio X5"],
    useCases: [
      "High-volume warehouse scanning",
      "Manufacturing floor automation",
      "Hazardous location operations (C1D2)",
      "Distribution center order picking",
      "Extended-range asset tracking"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/rugged-pdas/skorpio-x5-pd-856.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "datalogic-memor-k20-25",
    title: "Datalogic Memor K20/K25",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Memor K20 and K25 are compact Android enterprise mobile computers in a slim, lightweight form factor that combines smartphone ergonomics with enterprise scanning and ruggedness. Ideal for retail and light hospitality use, they offer integrated 1D/2D scanning, NFC, and Wi-Fi connectivity in a device small enough to fit in any uniform pocket.",
    img: "/assets/img/Product/Datalogic/datalogic-memor-k20-25.png",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Octa-core 1.8 GHz",
      "RAM: 2 GB / Storage: 16 GB",
      "Display: 4.0\" WVGA",
      "Scan Engine: 1D/2D Imager with Green Spot",
      "Wireless: Wi-Fi 5 (802.11 a/b/g/n/ac) + BT 4.2",
      "NFC: Yes",
      "Battery: 3,000 mAh",
      "Rugged: IP52",
      "Drop Rating: 4 ft (1.2 m)"
    ],
    models: ["Memor K20", "Memor K25"],
    useCases: [
      "Retail frontline scanning",
      "Light warehouse inventory",
      "Hospitality order management",
      "In-store stock counts",
      "Mobile point-of-sale"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/rugged-pdas/memor-k-pd-842.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  {
    id: "datalogic-memor-17-hc",
    title: "Datalogic Memor 17 HC",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Memor 17 HC is a healthcare-specific enterprise mobile computer with disinfectant-ready housing certified for use with over 50 hospital-grade cleaning agents. Built on the Memor 17 platform with a large 5.7-inch display, it integrates clinical barcode scanning, NFC for eHealth card reading, and antimicrobial material for use in patient-facing healthcare environments.",
    img: "/assets/img/Product/Datalogic/datalogic-memor-17-hc.png",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Qualcomm Snapdragon 660 Octa-core 2.2 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Display: 5.7\" FHD Gorilla Glass",
      "Scan Engine: 1D/2D Imager with Green Spot + NFC",
      "Wireless: Wi-Fi 5 (802.11ac) + BT 5.0 + 4G LTE",
      "Healthcare: Disinfectant-ready housing, 50+ agents certified",
      "Battery: 5,000 mAh",
      "Rugged: IP65 + MIL-STD-810G",
      "Drop Rating: 5 ft (1.5 m)"
    ],
    models: ["Memor 17 HC"],
    useCases: [
      "Bedside patient identification & wristband scanning",
      "Medication administration (eMAR)",
      "Clinical specimen tracking",
      "Healthcare asset management",
      "Electronic health record (EHR) access"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/rugged-pdas/memor-10-hc-pd-827.html",
    documents: [],
    type: "hardware",
    classification: "Healthcare & Retail Computers"
  },
  {
    id: "datalogic-falcon-x60",
    title: "Datalogic Falcon X60/X65",
    category: "products",
    subcategory: "computing",
    brand: "Datalogic",
    description: "The Datalogic Falcon X60 and X65 are ultra-rugged mobile computers engineered to handle the harshest industrial and outdoor environments. Built for demanding warehouse, logistics, and manufacturing operations, the Falcon X series features a pistol-grip design, extended-range scanning up to 50 feet, an all-metal chassis, and Datalogic's Wavelink Avalanche EMM support.",
    img: "/assets/img/Product/Datalogic/datalogic-falcon-x60-65.jpg",
    specs: [
      "OS: Android 10 Enterprise",
      "Processor: Qualcomm Snapdragon 660 Octa-core 2.2 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Display: 4.3\" WVGA Gorilla Glass, glove-touch",
      "Scan Engine: SE4850 Extended Range 1D/2D + optional DPM",
      "Wireless: Wi-Fi 5 (802.11ac) + BT 5.0 + 4G LTE optional",
      "Battery: 7,500 mAh hot-swap",
      "Rugged: IP67 + MIL-STD-810H",
      "Drop Rating: 6 ft (1.8 m)",
      "Special: -20°C to 50°C operating range, extreme environment"
    ],
    models: ["Falcon X60", "Falcon X65"],
    useCases: [
      "Heavy industrial plant floor scanning",
      "Cold storage & freezer warehouse",
      "Outdoor logistics & yard management",
      "Extended-range warehouse scanning",
      "Manufacturing quality control"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/mobile-computers/rugged-pdas/falcon-x4-pd-726.html",
    documents: [],
    type: "hardware",
    classification: "Handheld Devices"
  },
  // ═══════════════════════════════════════════════════════════
  // BARCODE SCANNERS — Zebra General Purpose Handheld
  // ═══════════════════════════════════════════════════════════
  {
    id: "zebra-ds2200-series",
    title: "Zebra DS2200 Series 1D/2D",
    category: "products",
    subcategory: "scanners",
    brand: "Zebra",
    description: "The Zebra DS2200 series includes affordable point-of-sale 1D and 2D handheld imagers available in corded (DS2208) and cordless (DS2278) configurations. Featuring Zebra's PRZM Intelligent Imaging technology, these scanners deliver fast, accurate scanning of 1D barcodes and 2D codes from paper labels, mobile screens, and even damaged barcodes — including Healthcare variants with antimicrobial housing.",
    img: "/assets/img/Product/Zebra/cc600-6000-series-3x2-3600.jpg.imgo.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 Area Imager",
      "Technology: PRZM Intelligent Imaging",
      "Connectivity: USB (DS2208) / Bluetooth (DS2278)",
      "Scan Range: Standard (3–35 cm typical)",
      "Reads: Paper labels, mobile screens, damaged codes",
      "Drop Rating: 5 ft (1.5 m) repeated drops",
      "IP Rating: IP52",
      "Decode Rate: Multiple barcodes per second",
      "Trigger: Single-finger, ergonomic form factor",
      "HC Variant: Disinfectant-ready antimicrobial housing"
    ],
    models: ["DS2208", "DS2208 HC", "DS2278", "DS2278 HC"],
    useCases: [
      "Retail POS checkout scanning",
      "Healthcare patient ID & medication",
      "Light warehouse receiving",
      "Hospitality order processing",
      "Document scanning & ticketing"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/scanners/general-purpose-scanners/handheld/ds2200-series.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "zebra-ds4600-series",
    title: "Zebra DS4600 Series 1D/2D",
    category: "products",
    subcategory: "scanners",
    brand: "Zebra",
    description: "The Zebra DS4600 series provides powerful, versatile 1D and 2D scanning for demanding point-of-sale and retail environments. Available in standard, extended-distance (XD), and Healthcare variants, with both corded and cordless Bluetooth options. Featuring Zebra's PRZM Intelligent Imaging, the DS4600 delivers superior performance on all barcodes including mobile phones, poorly printed, and damaged codes.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 Area Imager",
      "Technology: PRZM Intelligent Imaging",
      "Connectivity: USB corded (DS4608) / Bluetooth (DS4678)",
      "Scan Range: Standard & Extended Distance (XD models)",
      "XD Range: Up to 1.2 m / 4 ft scan distance",
      "Drop Rating: 6 ft (1.8 m)",
      "IP Rating: IP52",
      "Reads: Mobile screens, all 2D codes, damaged barcodes",
      "HC Variant: Disinfectant-ready antimicrobial",
      "Wireless: Bluetooth 4.0 (DS4678/DS4678 XD)"
    ],
    models: ["DS4678", "DS4678 XD", "DS4608", "DS4608 HC", "DS4608 XD"],
    useCases: [
      "Retail POS with extended-range scanning",
      "Healthcare medication verification",
      "Warehouse receiving & shipping",
      "Hospitality & restaurant POS",
      "Driver licence & document scanning"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/scanners/general-purpose-scanners/handheld/ds4608.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "zebra-ds82-series",
    title: "Zebra DS82 Series 1D/2D",
    category: "products",
    subcategory: "scanners",
    brand: "Zebra",
    description: "The Zebra DS82 series delivers advanced scanning performance for high-demand retail, healthcare, and industrial environments. Available in standard, with internal mirror (R models for hands-free/countertop use), and Healthcare configurations, the DS82 series features enhanced PRZM Intelligent Imaging for superior performance on reflective, damaged, and mobile phone barcodes at near-contact to extended distance.",
    img: "/assets/img/Product/Zebra/zebra-ds82-series-1d-2d.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 Area Imager",
      "Technology: PRZM Intelligent Imaging",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 45 cm (17.7 in) typical",
      "Omnidirectional: Yes (R models with mirror for hands-free)",
      "Drop Rating: 6 ft (1.8 m)",
      "IP Rating: IP52",
      "R Model: Built-in mirror for presentation/hands-free use",
      "HC Variant: Disinfectant-ready antimicrobial",
      "Reads: Mobile screens, damaged codes, reflective surfaces"
    ],
    models: ["DS8208", "DS8208R", "DS8208 HC", "DS8288", "DS8288R", "DS8288 HC"],
    useCases: [
      "High-volume retail POS scanning",
      "Healthcare specimen & medication verification",
      "Hands-free countertop scanning (R models)",
      "Manufacturing incoming inspection",
      "Hospitality & ticketing"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/scanners/general-purpose-scanners/handheld/ds8200-series.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "zebra-li2208",
    title: "Zebra LI2208 1D",
    category: "products",
    subcategory: "scanners",
    brand: "Zebra",
    description: "The Zebra LI2208 is a 1D linear imager scanner that provides the same industry-leading reliability and ergonomics as Zebra's most popular scanner, the LS2208, with upgraded extended-range scan technology. Delivering fast, accurate scanning of linear barcodes with LED illumination (no laser), the LI2208 is ideal for environments requiring reliable 1D scanning performance.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Scan Type: 1D Linear Imager (no laser)",
      "Scan Element: LED illumination",
      "Connectivity: USB + RS-232 + Keyboard Wedge",
      "Scan Range: 0 – 35.6 cm (14 in) typical",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Decode: All standard 1D barcodes",
      "Motion Tolerance: Aggressive motion tolerance",
      "Trigger: Ergonomic single-trigger",
      "Ambient Light: Works in direct sunlight up to 9,000 lux"
    ],
    models: ["LI2208"],
    useCases: [
      "Retail checkout scanning",
      "Inventory management",
      "Healthcare light scanning",
      "Library & document scanning",
      "General 1D barcode applications"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/scanners/general-purpose-scanners/handheld/li2208.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "zebra-li4278",
    title: "Zebra LI4278 1D",
    category: "products",
    subcategory: "scanners",
    brand: "Zebra",
    description: "The Zebra LI4278 takes 1D barcode scanning to the next level with a cordless Bluetooth design that allows workers to scan faster and farther — up to 100 feet from the base. The LI4278 eliminates cable clutter at the checkout while delivering superior scanning performance on all standard 1D barcodes, including damaged and poorly printed codes.",
    img: "/assets/img/Product/Zebra/50-12500-066-photography-product-accessory-wriststrap-image-3x2-3600.jpg.imgo.jpg",
    specs: [
      "Scan Type: 1D Linear Imager (cordless)",
      "Wireless: Bluetooth 2.4 GHz (up to 100 ft / 30 m range)",
      "Base: Included Bluetooth base station (USB)",
      "Battery: 1,700 mAh Li-ion, 14-hr shift life",
      "Drop Rating: 6 ft (1.8 m)",
      "IP Rating: IP52",
      "Decode: All standard 1D symbologies",
      "Scan Rate: 547 scans/sec",
      "Roaming: Multi-base roaming supported",
      "Connectivity: USB via base station"
    ],
    models: ["LI4278"],
    useCases: [
      "Cordless retail checkout scanning",
      "Warehouse inventory without cable clutter",
      "In-aisle & mobile retail scanning",
      "Hospitality order scanning",
      "Library & asset tracking"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/scanners/general-purpose-scanners/handheld/li4278.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "zebra-ls1203",
    title: "Zebra LS1203 1D",
    category: "products",
    subcategory: "scanners",
    brand: "Zebra",
    description: "The Zebra LS1203 is an affordable, durable, high-quality 1D laser barcode scanner ideal for small retailers and light-duty scanning applications. Built on Zebra's proven platform, the LS1203 delivers reliable performance on all standard 1D barcodes with a simple corded USB connection and comfortable ergonomic form factor — the perfect entry-level scanning solution.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Scan Type: 1D Laser",
      "Scan Pattern: Single line",
      "Connectivity: USB",
      "Scan Range: 5 – 40 cm (2 – 16 in) typical",
      "Drop Rating: 5 ft (1.5 m)",
      "Decode: All standard 1D barcodes",
      "Scan Rate: 100 scans/sec",
      "Illumination: 650 nm visible laser diode",
      "Trigger: Ergonomic pistol-grip trigger",
      "Weight: 99 g (3.5 oz)"
    ],
    models: ["LS1203"],
    useCases: [
      "Small retail store checkout",
      "Light inventory management",
      "Office document & asset scanning",
      "Healthcare basic scanning",
      "Entry-level 1D barcode operations"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/scanners/general-purpose-scanners/handheld/ls1203.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "zebra-ls2208",
    title: "Zebra LS2208 1D",
    category: "products",
    subcategory: "scanners",
    brand: "Zebra",
    description: "The Zebra LS2208 is Zebra's most popular general-purpose 1D laser barcode scanner, providing fast and reliable scanning in a lightweight ergonomic form factor. Ideal for retail POS and healthcare environments, the LS2208 delivers proven performance on all standard 1D barcode formats with simple plug-and-play USB connectivity and industry-leading durability.",
    img: "/assets/img/Product/Zebra/cq5dam.thumbnail.140.100.png",
    specs: [
      "Scan Type: 1D Laser",
      "Scan Pattern: Single line",
      "Connectivity: USB + RS-232 + Keyboard Wedge",
      "Scan Range: 0 – 45.7 cm (18 in) typical",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Decode: All standard 1D symbologies",
      "Scan Rate: 100 scans/sec",
      "Illumination: 650 nm visible laser diode",
      "Weight: 113 g (4 oz)"
    ],
    models: ["LS2208"],
    useCases: [
      "Retail POS checkout (most popular)",
      "Healthcare specimen & medication scanning",
      "Hospitality restaurant/bar POS",
      "Light warehouse & inventory",
      "General 1D barcode applications"
    ],
    officialUrl: "https://www.zebra.com/us/en/products/scanners/general-purpose-scanners/handheld/ls2208.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  // ═══════════════════════════════════════════════════════════
  // BARCODE SCANNERS — Honeywell General Purpose Handheld
  // ═══════════════════════════════════════════════════════════
  {
    id: "honeywell-xenon-dpm-1970",
    title: "Honeywell Xenon DPM 1970",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Xenon DPM 1970 is a corded handheld scanner optimized for Direct Part Mark (DPM) reading. Using Honeywell's advanced illumination technology, the 1970 decodes DPM codes on metal, plastic, ceramic, and silicon surfaces — marks made by dot peen, laser etch, inkjet, and electro-chemical etch — in addition to standard 1D and 2D barcodes.",
    img: "/assets/img/Product/Honeywell/honeywell-xenon-dpm-1970.jpg",
    specs: [
      "Scan Type: 1D / 2D / DPM Imager",
      "DPM Reading: Dot peen, laser etch, inkjet, electro-chemical",
      "Connectivity: USB corded",
      "Illumination: Patented DPM aiming with multi-angle LEDs",
      "Decode: All 1D, 2D, PDF417, DPM codes",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP41",
      "Surface Compatibility: Metal, plastic, ceramic, silicon",
      "Trigger: Pistol-grip ergonomic",
      "Industries: Manufacturing, automotive, aerospace"
    ],
    models: ["Xenon DPM 1970"],
    useCases: [
      "Manufacturing DPM part marking verification",
      "Automotive component tracking",
      "Aerospace serial number reading",
      "Electronics PCB traceability",
      "Medical device DPM marking compliance"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/xenon-dpm-1970",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-xenon-dpm-1972",
    title: "Honeywell Xenon DPM 1972",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Xenon DPM 1972 is the cordless Bluetooth version of the Xenon DPM 1970, delivering all the same DPM reading capability with the added flexibility of wireless operation. Using Bluetooth, it provides mobile DPM scanning up to 10 m from a base station — ideal for large manufacturing floors and assembly lines where cable-free operation improves worker efficiency.",
    img: "/assets/img/Product/Honeywell/honeywell-xenon-dpm-1972.jpg",
    specs: [
      "Scan Type: 1D / 2D / DPM Imager",
      "Wireless: Bluetooth (up to 10 m range)",
      "DPM Reading: Dot peen, laser etch, inkjet, electro-chemical",
      "Illumination: Patented DPM multi-angle LED aiming",
      "Battery: Rechargeable Li-ion",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP41",
      "Decode: All 1D, 2D, PDF417, DPM codes",
      "Base Station: Included Bluetooth base",
      "Industries: Manufacturing, aerospace, automotive"
    ],
    models: ["Xenon DPM 1972"],
    useCases: [
      "Wireless DPM scanning on large factory floors",
      "Automotive production line QC",
      "Aerospace component traceability",
      "Electronics manufacturing DPM",
      "Mobile manufacturing inspection"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/xenon-dpm-1972",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-xenon-ultra-1960",
    title: "Honeywell Xenon ULTRA 1960",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Xenon ULTRA 1960 is the corded next-generation premium handheld scanner delivering superior performance in the most challenging retail and industrial scanning environments. With enhanced processing power and imaging capability, the Xenon ULTRA 1960 decodes 1D, 2D, and mobile phone barcodes faster and more reliably than ever — even on damaged and poorly printed codes.",
    img: "/assets/img/Product/Honeywell/honeywell-xenon-ultra-1960.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 Area Imager",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 56 cm (22 in)",
      "Mobile Screen: Yes — reads mobile phone barcodes",
      "Drop Rating: 6 ft (1.8 m)",
      "IP Rating: IP42",
      "Illumination: White LED aiming",
      "Decode: All 1D, 2D, stacked barcodes",
      "Speed: Aggressive scan rate for high-volume checkouts",
      "Ergonomics: Balanced pistol-grip design"
    ],
    models: ["Xenon ULTRA 1960"],
    useCases: [
      "High-volume retail POS scanning",
      "Healthcare patient ID & specimens",
      "Hospitality QR menu scanning",
      "Ticketing & event management",
      "Manufacturing & logistics scanning"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/xenon-ultra-1960",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-xenon-ultra-1962",
    title: "Honeywell Xenon ULTRA 1962",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Xenon ULTRA 1962 is the cordless Bluetooth variant of the Xenon ULTRA 1960, offering the same premium scanning performance with wireless freedom. Featuring a high-capacity battery for full-shift operation and Bluetooth connectivity up to 10 m from the base, the 1962 is ideal for mobile and countertop retail and healthcare environments.",
    img: "/assets/img/Product/Honeywell/honeywell-xenon-ultra-1962.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 Area Imager",
      "Wireless: Bluetooth (up to 10 m range)",
      "Battery: Li-ion rechargeable, full-shift life",
      "Base Station: Included Bluetooth base (USB)",
      "Scan Range: Near contact to 56 cm (22 in)",
      "Mobile Screen: Yes — reads mobile phone barcodes",
      "Drop Rating: 6 ft (1.8 m)",
      "IP Rating: IP42",
      "Decode: All 1D, 2D, stacked codes",
      "Ergonomics: Balanced pistol-grip design"
    ],
    models: ["Xenon ULTRA 1962"],
    useCases: [
      "Cordless retail POS checkout",
      "Healthcare bedside scanning",
      "Hospitality table-side order scanning",
      "Mobile in-aisle retail scanning",
      "Event ticketing & access control"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/xenon-ultra-1962",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-1452g",
    title: "Honeywell Voyager 1452g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager 1452g is a cordless 1D/2D area imager providing wireless scanning freedom for retail and light warehouse applications. With Bluetooth connectivity and a charging base, it delivers reliable multi-symbology scanning with a user-friendly form factor and excellent battery life for full-shift operations.",
    img: "/assets/img/Product/Honeywell/honeywell-voyager-1452g.png",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Wireless: Bluetooth 4.0 (up to 10 m)",
      "Battery: Li-ion rechargeable",
      "Base Station: USB Bluetooth base included",
      "Scan Range: Near contact to 35 cm",
      "Drop Rating: 5 ft (1.5 m)",
      "Decode: 1D, 2D, QR, PDF417",
      "Mobile Screen: Yes",
      "Ergonomics: Lightweight ergonomic grip",
      "IP Rating: IP41"
    ],
    models: ["Voyager 1452g"],
    useCases: [
      "Retail cordless checkout scanning",
      "Light warehouse inventory",
      "Hospitality & restaurant POS",
      "Healthcare light scanning",
      "Office & asset management"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-1452g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-xp-1470g",
    title: "Honeywell Voyager XP 1470g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager XP 1470g delivers accurate and reliable scanning capability on traditional barcodes and digital screens — even on damaged and difficult-to-read codes. The corded 1470g features Honeywell's Adaptus Imaging Technology 6.0 for exceptional performance on 1D and 2D barcodes in demanding retail, healthcare, and logistics environments.",
    img: "/assets/img/Product/Honeywell/sps-ppr-1470g-barcode-scanner.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 XP Imager",
      "Connectivity: USB corded",
      "Technology: Adaptus Imaging Technology 6.0",
      "Scan Range: Near contact to 55 cm (21.6 in)",
      "Mobile Screen: Yes — digital & LCD screens",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP41",
      "Decode: Damaged, poorly printed & low-contrast codes",
      "Trigger: High-reliability trigger, 10M actuations",
      "Illumination: White LED + aimer"
    ],
    models: ["Voyager XP 1470g"],
    useCases: [
      "Retail checkout with mobile wallet scanning",
      "Healthcare lab specimen scanning",
      "Logistics & shipping label verification",
      "Hospitality loyalty QR scanning",
      "Transportation ticketing"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-xp-1470g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-xp-1472g",
    title: "Honeywell Voyager XP 1472g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager XP 1472g is the cordless Bluetooth version of the Voyager XP 1470g, combining Extreme Performance imaging with wireless flexibility. With an 8-hour battery life and up to 10 m Bluetooth range, it provides reliable cordless scanning of all 1D and 2D barcodes including mobile phone screens and damaged codes in retail and healthcare environments.",
    img: "/assets/img/Product/Honeywell/sps-ppr-1472g-barcode-scanner.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 XP Imager",
      "Wireless: Bluetooth (up to 10 m range)",
      "Battery: 8-hour full-shift Li-ion",
      "Base: USB Bluetooth charging base",
      "Mobile Screen: Yes",
      "Scan Range: Near contact to 55 cm",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP41",
      "Decode: Damaged & poorly printed codes",
      "Illumination: White LED + aimer"
    ],
    models: ["Voyager XP 1472g"],
    useCases: [
      "Cordless retail checkout",
      "Healthcare bedside & patient scanning",
      "Mobile inventory management",
      "Hospitality & event scanning",
      "Logistics & courier operations"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-xp-1472g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-xenon-xp-1950g",
    title: "Honeywell Xenon XP 1950g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Xenon XP 1950g series scanners deliver premium performance and durability for improved employee productivity and lower total cost of ownership. The corded 1950g features Honeywell's Xenon XP imaging engine with wide-angle aiming and fast decode rates for all 1D and 2D symbologies — proven for high-volume retail and healthcare deployments.",
    img: "/assets/img/Product/Honeywell/sps-ppr-1950g-barcode-scanner.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 XP Imager",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 48 cm (19 in)",
      "Mobile Screen: Yes",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Trigger Durability: 100M actuations",
      "Illumination: White LED aiming",
      "Decode Rate: Multiple codes per second",
      "Ergonomics: Comfortable, large-grip form"
    ],
    models: ["Xenon XP 1950g"],
    useCases: [
      "High-volume retail POS",
      "Healthcare specimen & wristband scanning",
      "Hospitality & food service",
      "Manufacturing incoming inspection",
      "Logistics & distribution"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/xenon-xp-1950g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-xenon-xp-1952g",
    title: "Honeywell Xenon XP 1952g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Xenon XP 1952g is the cordless Bluetooth version of the Xenon XP 1950g, delivering premium imaging performance with wireless scanning freedom. Full-shift battery life, Bluetooth connectivity up to 10 m, and multi-base roaming support make the 1952g ideal for mobile retail, healthcare, and logistics deployments requiring untethered scanning.",
    img: "/assets/img/Product/Honeywell/sps-ppr-1952g-barcode-scanner-1.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 XP Imager",
      "Wireless: Bluetooth (up to 10 m range)",
      "Battery: Full-shift Li-ion, hot-swap capable",
      "Base: Bluetooth charging cradle (USB)",
      "Mobile Screen: Yes",
      "Scan Range: Near contact to 48 cm",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Multi-Base Roaming: Yes",
      "Trigger Durability: 100M actuations"
    ],
    models: ["Xenon XP 1952g"],
    useCases: [
      "Cordless retail checkout scanning",
      "Healthcare mobile scanning",
      "Hospitality mobile POS",
      "Warehouse mobile picking",
      "Event management & ticketing"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/xenon-xp-1952g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-1200g",
    title: "Honeywell Voyager 1200g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager 1200g is a reliable 1D laser barcode scanner built on Honeywell's proven laser scanning platform. With an elegant curved form factor, it delivers fast and reliable 1D barcode scanning for retail and light commercial applications — a trusted, durable scanner for everyday point-of-sale and inventory use.",
    img: "/assets/img/Product/Honeywell/sps-ppr-1200g-primary-image.jpg",
    specs: [
      "Scan Type: 1D Laser Scanner",
      "Connectivity: USB + RS-232 + Keyboard Wedge",
      "Scan Range: 5 – 43 cm (2 – 17 in) typical",
      "Scan Rate: 100 scans/sec",
      "Drop Rating: 5 ft (1.5 m)",
      "Decode: All standard 1D symbologies",
      "Illumination: 650 nm visible red laser",
      "Trigger: Ergonomic curve-back design",
      "Weight: 128 g (4.5 oz)",
      "IP Rating: IP41"
    ],
    models: ["Voyager 1200g"],
    useCases: [
      "Retail POS 1D scanning",
      "Inventory management",
      "Light healthcare scanning",
      "Hospitality & restaurant",
      "Office & library use"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-1200g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-1202g",
    title: "Honeywell Voyager 1202g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager 1202g is the cordless Bluetooth version of the Voyager 1200g laser scanner, delivering reliable 1D linear barcode scanning with wireless flexibility. Perfect for retail and warehouse environments where cable-free operation improves worker mobility, the 1202g maintains the same elegant curved form factor with Bluetooth connectivity up to 10 m from the base.",
    img: "/assets/img/Product/Honeywell/sps-ppr-1202g-barcode-scanner-1.jpg",
    specs: [
      "Scan Type: 1D Laser Scanner (cordless)",
      "Wireless: Bluetooth (up to 10 m range)",
      "Battery: Rechargeable Li-ion",
      "Base Station: USB Bluetooth base included",
      "Scan Range: 5 – 43 cm typical",
      "Drop Rating: 5 ft (1.5 m)",
      "Decode: All standard 1D symbologies",
      "Scan Rate: 100 scans/sec",
      "Illumination: 650 nm red laser",
      "IP Rating: IP41"
    ],
    models: ["Voyager 1202g"],
    useCases: [
      "Cordless retail POS",
      "Mobile inventory scanning",
      "Hospitality table-side scanning",
      "Light warehouse operations",
      "Library & document scanning"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-1202g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-1250g",
    title: "Honeywell Voyager 1250g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager 1250g is a high-performance corded 1D laser scanner with an improved, more aggressive decode capability over the Voyager 1200g. Featuring a familiar pistol-grip form factor, USB connectivity, and reliable all-day durability, the 1250g is an ideal upgrade scanner for retail checkout, inventory, and light industrial 1D barcode applications.",
    img: "/assets/img/Product/Honeywell/sps-ppr-voyager-1250g-primary-image.jpg",
    specs: [
      "Scan Type: 1D Laser Scanner",
      "Connectivity: USB + RS-232",
      "Scan Range: 5 – 45 cm typical",
      "Scan Rate: 100 scans/sec",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP41",
      "Decode: All standard 1D + stacked 1D",
      "Illumination: 650 nm visible red laser",
      "Trigger Durability: High-reliability trigger",
      "Weight: 128 g (4.5 oz)"
    ],
    models: ["Voyager 1250g"],
    useCases: [
      "Retail POS 1D scanning",
      "Light warehouse inventory",
      "Healthcare 1D scanning",
      "Hospitality & restaurant POS",
      "Office & general barcode use"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-1250g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-1400g",
    title: "Honeywell Voyager 1400g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager 1400g upgrades the Voyager laser platform to a 2D area imager, delivering reliable 1D and 2D barcode scanning with Honeywell's proven curved form factor. Capable of reading QR codes, PDF417, and mobile phone screens, the 1400g is an excellent value upgrade path for retail and light commercial environments moving to 2D scanning.",
    img: "/assets/img/Product/Honeywell/sps-ppr-voyager-1400g-primary-image.jpg",
    specs: [
      "Scan Type: 1D / 2D / QR / PDF417 Area Imager",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 35 cm typical",
      "Mobile Screen: Yes",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP41",
      "Illumination: White LED aiming",
      "Decode: 1D, 2D, stacked, QR, DataMatrix",
      "Weight: 130 g (4.6 oz)",
      "Ergonomics: Familiar curved Voyager form"
    ],
    models: ["Voyager 1400g"],
    useCases: [
      "Retail QR code & loyalty scanning",
      "Healthcare 2D specimen scanning",
      "Hospitality mobile payment scanning",
      "Inventory management with 2D codes",
      "Light commercial 2D applications"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-1400g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-voyager-1602g",
    title: "Honeywell Voyager 1602g",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Voyager 1602g is an ultra-compact pocket-sized 1D/2D Bluetooth scanner designed for mobile and space-constrained applications. Its small form factor makes it easy to carry in a pocket or clip to a belt, while its Bluetooth connectivity enables wireless scanning from mobile devices, tablets, and POS terminals — ideal for retail, healthcare, and light logistics.",
    img: "/assets/img/placeholder.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Wireless: Bluetooth 4.0",
      "Form Factor: Ultra-compact pocket scanner",
      "Battery: Rechargeable Li-ion",
      "Mobile Pairing: iOS, Android, Windows compatible",
      "Scan Range: Near contact to 25 cm",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP40",
      "Clip: Belt clip included",
      "Weight: Under 100 g"
    ],
    models: ["Voyager 1602g"],
    useCases: [
      "Mobile retail scanning with smartphones/tablets",
      "Healthcare bedside pocket scanning",
      "Field service mobile data capture",
      "Light logistics & courier scanning",
      "mPOS & pop-up retail"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/voyager-1602g",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-eclipse-5145",
    title: "Honeywell Eclipse 5145",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Eclipse 5145 is a proven single-line laser barcode scanner designed for hands-free and handheld scanning at retail checkout and light industrial environments. Its unique angled head design allows for both handheld and stand-mounted use, making it highly versatile for countertop POS applications where both modes are needed.",
    img: "/assets/img/Product/Honeywell/honeywell-eclipse-5145.jpg",
    specs: [
      "Scan Type: 1D Laser (single-line)",
      "Connectivity: USB + RS-232 + Keyboard Wedge",
      "Scan Range: 2 – 32 cm (0.8 – 12.6 in)",
      "Hands-Free: Stand-mounted operation supported",
      "Scan Rate: 100 scans/sec",
      "Drop Rating: 4 ft (1.2 m)",
      "Illumination: 650 nm visible red laser",
      "Decode: All standard 1D symbologies",
      "Head Angle: Angled for countertop versatility",
      "Weight: 150 g (5.3 oz)"
    ],
    models: ["Eclipse 5145"],
    useCases: [
      "Retail countertop POS (handheld + stand)",
      "Hospitality order entry",
      "Light warehouse receiving",
      "Office & library scanning",
      "Healthcare 1D scanning"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/eclipse-5145",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-hh490",
    title: "Honeywell HH490",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell HH490 is designed for commercial environments requiring high-speed 1D/2D scanning operations at an affordable price point. Featuring a compact, durable form factor and simple USB connectivity, the HH490 delivers reliable barcode reading for retail, hospitality, and light warehousing applications where cost-effective performance is the priority.",
    img: "/assets/img/Product/Honeywell/honeywell-hh490.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 30 cm typical",
      "Mobile Screen: Yes",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP41",
      "Decode: 1D, 2D, QR, PDF417",
      "Illumination: LED aiming",
      "Weight: Lightweight compact design",
      "Price Tier: Value / Entry-level"
    ],
    models: ["HH490"],
    useCases: [
      "Retail POS 1D/2D scanning",
      "Hospitality QR scanning",
      "Light warehouse & inventory",
      "Office & general barcode capture",
      "Entry-level 2D scanning"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/hh490",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-hh492",
    title: "Honeywell HH492",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell HH492 offers wireless workflow flexibility with Bluetooth connectivity, providing all the performance of the HH490 without cable constraints. Designed for commercial environments requiring high-speed 1D/2D scanning with wireless freedom, the HH492 is ideal for mobile retail, hospitality, and warehouse operations.",
    img: "/assets/img/Product/Honeywell/no-image.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Wireless: Bluetooth cordless",
      "Battery: Rechargeable Li-ion",
      "Base Station: USB Bluetooth base",
      "Scan Range: Near contact to 30 cm typical",
      "Mobile Screen: Yes",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP41",
      "Decode: 1D, 2D, QR, PDF417",
      "Price Tier: Value / Entry-level cordless"
    ],
    models: ["HH492"],
    useCases: [
      "Cordless retail POS scanning",
      "Hospitality wireless order taking",
      "Light warehouse mobile scanning",
      "mPOS & pop-up retail",
      "Entry-level wireless 2D scanning"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/hh490",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-xenon-1900c",
    title: "Honeywell Xenon 1900C",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Xenon 1900C is a corded area-imaging scanner from Honeywell's flagship Xenon series, delivering high-performance 1D and 2D barcode scanning with superior motion tolerance. Suitable for demanding retail POS, healthcare, and logistics environments, the 1900C provides outstanding decode capability on poorly printed, damaged, and mobile phone barcodes.",
    img: "/assets/img/Product/Honeywell/honeywell-xenon-1900c.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 45 cm (18 in)",
      "Mobile Screen: Yes",
      "Motion Tolerance: Superior aggressiveness",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP41",
      "Decode: All 1D, 2D, stacked, PDF417",
      "Illumination: LED aiming",
      "Trigger Durability: 100M actuations"
    ],
    models: ["Xenon 1900C"],
    useCases: [
      "High-volume retail checkout",
      "Healthcare medication & specimen scanning",
      "Logistics label verification",
      "Hospitality & entertainment",
      "Transportation ticketing"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/xenon-1900",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "honeywell-fusion-3780",
    title: "Honeywell Fusion 3780 Handheld/Hands-Free Scanner",
    category: "products",
    subcategory: "scanners",
    brand: "Honeywell",
    description: "The Honeywell Fusion 3780 combines omnidirectional laser barcode scanning in a lightweight, ergonomic, and durable form factor supporting both hands-free presentation and handheld use cases. Its multi-plane laser scanning pattern provides fast, omnidirectional reading of all standard 1D barcodes in busy retail checkout and hospitality environments.",
    img: "/assets/img/Product/Honeywell/sps-ppr-3780-primary-image.jpg",
    specs: [
      "Scan Type: 1D Omnidirectional Laser",
      "Scan Pattern: Multi-plane omnidirectional",
      "Connectivity: USB + RS-232 + Keyboard Wedge",
      "Operation: Handheld + hands-free stand",
      "Scan Range: 0 – 30 cm (0 – 12 in)",
      "Drop Rating: 5 ft (1.5 m)",
      "Decode: All standard 1D symbologies",
      "Illumination: Multi-line laser",
      "Trigger: Pull trigger + auto-sense (stand mode)",
      "Weight: 255 g (9 oz)"
    ],
    models: ["Fusion 3780"],
    useCases: [
      "Retail POS countertop omnidirectional scanning",
      "Hospitality & food service checkout",
      "Pharmacy prescription scanning",
      "Convenience store & grocery POS",
      "Light warehouse receiving"
    ],
    officialUrl: "https://sps.honeywell.com/us/en/products/productivity/barcode-scanners/handheld-scanners/fusion-3780",
    documents: [],
    type: "hardware",
    classification: "General Purpose Hands-Free Scanners"
  },
  // ═══════════════════════════════════════════════════════════
  // BARCODE SCANNERS — Datalogic
  // ═══════════════════════════════════════════════════════════
  {
    id: "datalogic-quickscan-2100",
    title: "Datalogic QuickScan 2100",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic QuickScan 2100 is a value-tier corded 1D laser barcode scanner delivering reliable scanning performance for light retail, office, and point-of-sale applications. Simple USB connectivity, ergonomic design, and Datalogic's proven decode algorithms make the QuickScan 2100 an ideal entry-level scanning solution.",
    img: "/assets/img/Product/Datalogic/SOFTWARE_SOLUTIONS_261X252.jpg",
    specs: [
      "Scan Type: 1D Laser",
      "Connectivity: USB corded",
      "Scan Range: 5 – 40 cm typical",
      "Scan Rate: 100 scans/sec",
      "Drop Rating: 4 ft (1.2 m)",
      "Decode: All standard 1D symbologies",
      "Illumination: 650 nm red laser",
      "Weight: ~120 g",
      "IP Rating: IP42",
      "Trigger: Ergonomic single-finger"
    ],
    models: ["QuickScan 2100"],
    useCases: [
      "Entry-level retail POS",
      "Office document scanning",
      "Light warehouse inventory",
      "Hospitality basic scanning",
      "General 1D barcode applications"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/quickscan-2100-pd-837.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-quickscan-2200",
    title: "Datalogic QuickScan 2200",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic QuickScan 2200 is a versatile 1D/2D area imager scanner offering affordable multi-symbology scanning for retail, healthcare, and logistics. Featuring Datalogic's Green Spot good-read feedback and an ergonomic design, the 2200 enables fast, accurate scanning of all 1D and 2D barcodes including QR codes and mobile phone screens.",
    img: "/assets/img/Product/Datalogic/datalogic-quickscan-2200.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 30 cm typical",
      "Mobile Screen: Yes",
      "Green Spot: Good-read feedback",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP42",
      "Decode: 1D, 2D, QR, PDF417, DataMatrix",
      "Illumination: LED + Green Spot aiming",
      "Price Tier: Value 2D scanner"
    ],
    models: ["QuickScan 2200"],
    useCases: [
      "Retail 2D/QR POS scanning",
      "Healthcare light 2D scanning",
      "Hospitality QR menu & payment",
      "Warehouse receiving with 2D codes",
      "Office & general 2D barcode use"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/quickscan-2200-pd-848.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-quickscan-2500",
    title: "Datalogic QuickScan 2500",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic QuickScan 2500 is a cordless 1D/2D Bluetooth area imager scanner offering premium wireless scanning performance with Datalogic's Green Spot feedback. Providing wireless freedom up to 10 m and multi-host Bluetooth connectivity, the QuickScan 2500 is ideal for retail, hospitality, and light warehouse environments requiring cable-free 2D scanning.",
    img: "/assets/img/Product/Datalogic/Intralogistics_Thumbnail.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Wireless: Bluetooth (up to 10 m)",
      "Battery: Rechargeable Li-ion",
      "Base: USB Bluetooth charging base",
      "Mobile Screen: Yes",
      "Green Spot: Good-read feedback",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP42",
      "Decode: 1D, 2D, QR, PDF417",
      "Multi-Host: Bluetooth multi-pairing"
    ],
    models: ["QuickScan 2500"],
    useCases: [
      "Cordless retail POS 2D scanning",
      "Hospitality wireless QR scanning",
      "Light warehouse mobile scanning",
      "Mobile retail & pop-up stores",
      "Healthcare light cordless scanning"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/quickscan-2500-pd-853.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-gryphon-4200",
    title: "Datalogic Gryphon 4200",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic Gryphon 4200 is a general-purpose 1D/2D area imager barcode scanner designed for retail, healthcare, and light industrial applications. With Datalogic's Green Spot and Beep & Flash feedback, the Gryphon 4200 delivers reliable multi-symbology scanning in a durable, comfortable form factor — available in corded and cordless configurations.",
    img: "/assets/img/Product/Datalogic/machine_vision_digital_Catalogue_thumb.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB (corded) / Bluetooth (cordless)",
      "Scan Range: Near contact to 30 cm",
      "Mobile Screen: Yes",
      "Green Spot: Good-read visual feedback",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP42",
      "Decode: 1D, 2D, QR, DataMatrix, PDF417",
      "Illumination: White LED + Green Spot",
      "Trigger: High-cycle ergonomic"
    ],
    models: ["Gryphon 4200"],
    useCases: [
      "Retail POS 1D/2D scanning",
      "Healthcare specimen & patient ID",
      "Hospitality QR menu & loyalty",
      "Office & document scanning",
      "Light warehouse inventory"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/gryphon-4200-pd-765.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-gryphon-4500",
    title: "Datalogic Gryphon 4500",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic Gryphon 4500 Series represents the premium range of handheld imagers from Datalogic for general purpose applications. With superior image quality and decode performance, the Gryphon 4500 reads all 1D and 2D barcodes including challenging DPM codes and mobile phone screens — complete with Green Spot good-read feedback and extended-range scanning capability.",
    img: "/assets/img/Product/Datalogic/Chemical%20disinfectant.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager (premium)",
      "Connectivity: USB (corded) / Bluetooth (cordless)",
      "Scan Range: Near contact to 55 cm (21.6 in) XLR",
      "DPM: Optional Direct Part Mark reading",
      "Mobile Screen: Yes — excellent digital screen decode",
      "Green Spot: Premium good-read feedback",
      "Drop Rating: 6 ft (1.8 m)",
      "IP Rating: IP52",
      "Decode: 1D, 2D, DPM, postal, stacked",
      "Healthcare: Disinfectant-ready (HC model)"
    ],
    models: ["Gryphon 4500", "Gryphon 4500 HC", "Gryphon 4500 XLR"],
    useCases: [
      "Premium retail POS 2D scanning",
      "Healthcare medication verification",
      "Manufacturing DPM reading",
      "Logistics extended-range scanning",
      "Pharmacy & prescription barcode reading"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/gryphon-4500-pd-766.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-gryphon-4600",
    title: "Datalogic Gryphon 4600",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic Gryphon 4600 is a versatile wireless 1D/2D handheld scanner supporting multi-interface connectivity including Bluetooth, 433 MHz radio, and USB cradle options. Designed for flexible deployment across retail, healthcare, and warehouse environments, the Gryphon 4600 delivers premium decode performance with Green Spot feedback and multi-host wireless capability.",
    img: "/assets/img/Product/Datalogic/datalogic-gryphon-4600.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Wireless: Bluetooth + 433 MHz radio options",
      "Base Station: Multi-interface cradle",
      "Battery: Rechargeable Li-ion",
      "Mobile Screen: Yes",
      "Green Spot: Good-read feedback",
      "Drop Rating: 6 ft (1.8 m)",
      "IP Rating: IP52",
      "Decode: 1D, 2D, QR, PDF417, DataMatrix",
      "Multi-Host: Simultaneous connections"
    ],
    models: ["Gryphon 4600"],
    useCases: [
      "Cordless retail 2D POS scanning",
      "Healthcare wireless scanning",
      "Warehouse mobile picking",
      "Manufacturing mobile QC",
      "Multi-station wireless deployment"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/gryphon-4600-pd-789.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-heron-3100",
    title: "Datalogic Heron 3100",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic Heron 3100 is a compact, entry-level corded 1D handheld laser barcode scanner offering straightforward, reliable scanning for light commercial applications. With a simple USB connection and durable construction, the Heron 3100 is an ideal starter scanner for small retail stores, offices, and light hospitality environments.",
    img: "/assets/img/Product/Datalogic/datalogic-heron-3100.jpg",
    specs: [
      "Scan Type: 1D Laser",
      "Connectivity: USB + RS-232",
      "Scan Range: 5 – 35 cm typical",
      "Scan Rate: 100 scans/sec",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP41",
      "Decode: All standard 1D symbologies",
      "Illumination: 650 nm red laser",
      "Weight: ~120 g",
      "Price Tier: Entry-level"
    ],
    models: ["Heron 3100"],
    useCases: [
      "Small retail store POS",
      "Office document scanning",
      "Light hospitality barcode scanning",
      "Library & asset management",
      "Entry-level 1D scanning"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/heron-hd3100-pd-593.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-heron-3400",
    title: "Datalogic Heron 3400",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic Heron 3400 is a step-up from the Heron 3100, offering both handheld and hands-free presentation scanning in a single device. Its unique head-down design supports countertop stand use for hands-free operation, while the powerful 1D/2D imager with Green Spot feedback ensures reliable scanning of all barcode types in retail and light commercial settings.",
    img: "/assets/img/Product/Datalogic/datalogic-heron-3400.png",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB + RS-232",
      "Operation: Handheld + hands-free stand",
      "Scan Range: Near contact to 30 cm",
      "Green Spot: Good-read feedback",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP41",
      "Decode: 1D, 2D, QR, PDF417",
      "Stand: Optional countertop stand",
      "Price Tier: Entry-level 2D"
    ],
    models: ["Heron 3400"],
    useCases: [
      "Retail countertop POS (handheld + stand)",
      "Healthcare light 2D scanning",
      "Hospitality QR code scanning",
      "Office 2D document capture",
      "Library & small business use"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/heron-hd3430-pd-668.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-td1100",
    title: "Datalogic TD1100",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic TD1100 is a versatile 1D/2D handheld imager scanner designed for demanding retail and commercial environments. With a rugged form factor, comprehensive barcode decode capability including mobile phone screens, and Datalogic's signature Green Spot, the TD1100 delivers reliable daily-use performance for retail checkout, inventory, and healthcare scanning.",
    img: "/assets/img/Product/Datalogic/Scanner%20SDK-web.png",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 35 cm",
      "Mobile Screen: Yes",
      "Green Spot: Good-read feedback",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP42",
      "Decode: 1D, 2D, QR, PDF417, DataMatrix",
      "Illumination: White LED + Green Spot",
      "Ergonomics: Lightweight pistol-grip"
    ],
    models: ["TD1100"],
    useCases: [
      "Retail POS 1D/2D scanning",
      "Healthcare barcode capture",
      "Hospitality QR & loyalty scanning",
      "Warehouse receiving verification",
      "Manufacturing parts identification"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/general-duty/td1100-pd-852.html",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "datalogic-powerscan-9100",
    title: "Datalogic PowerScan 9100 Series",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic PowerScan 9100 series is a professional-grade ultra-rugged industrial 1D linear imager scanner built for demanding manufacturing and logistics environments. Designed to withstand extreme temperatures, heavy drops, and continuous industrial use, the PowerScan 9100 delivers fast, reliable 1D scanning with an extended read range and Class 1 Division 2 certification.",
    img: "/assets/img/Product/Datalogic/datalogic-powerscan-9100-series.jpg",
    specs: [
      "Scan Type: 1D Linear Imager (Industrial grade)",
      "Connectivity: RS-232 + USB + Ethernet (model dependent)",
      "Scan Range: Up to 60 cm (24 in) extended range",
      "Drop Rating: 6 ft (1.8 m) repeated drops",
      "Operating Temp: -20°C to 50°C",
      "IP Rating: IP65",
      "C1D2: Class 1 Division 2 hazardous area certified",
      "Decode: All standard 1D symbologies",
      "Construction: All-metal rugged housing",
      "Trigger: High-reliability industrial trigger"
    ],
    models: ["PowerScan PBT9100 (BT)", "PowerScan PM9100 (Multi-IF)", "PowerScan PD9100 (RS-232)"],
    useCases: [
      "Heavy industrial manufacturing scanning",
      "Warehouse extended-range 1D reading",
      "Automotive production line tracking",
      "Outdoor logistics & loading dock",
      "Hazardous environment scanning (C1D2)"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/industrial/powerscan-9100-pd-758.html",
    documents: [],
    type: "hardware",
    classification: "Ultra-Rugged Barcode Scanners"
  },
  {
    id: "datalogic-powerscan-9500",
    title: "Datalogic PowerScan 9500 Series",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic PowerScan 9500 series is a premium ultra-rugged industrial 1D/2D scanner delivering exceptional performance in the harshest environments. With an extended read range of up to 6 m (20 ft), Class 1 Division 2 certification, all-metal construction, and resistance to extreme temperatures and multiple drops, the 9500 is the benchmark for demanding industrial 2D scanning.",
    img: "/assets/img/Product/Datalogic/datalogic-powerscan-9500-series.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager (Industrial)",
      "Connectivity: RS-232 + USB + Bluetooth + 433 MHz",
      "Scan Range: Near contact to 2 m (6.6 ft) standard / 6 m (20 ft) XLR",
      "Drop Rating: 6 ft (1.8 m) on all 6 faces",
      "Operating Temp: -30°C to 50°C",
      "IP Rating: IP65",
      "C1D2: Class 1 Division 2 hazardous certified",
      "Decode: All 1D, 2D, DPM, stacked codes",
      "Construction: All-metal military-grade housing",
      "Green Spot: Industrial good-read feedback"
    ],
    models: ["PowerScan PBT9500 (BT)", "PowerScan PD9500 (RS-232)", "PowerScan PD9500 XLR"],
    useCases: [
      "Heavy-duty industrial manufacturing",
      "Cold chain & freezer warehouse scanning",
      "Extended-range warehouse automation",
      "Automotive & aerospace production lines",
      "Outdoor harsh-environment operations"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/industrial/powerscan-9500-pd-759.html",
    documents: [],
    type: "hardware",
    classification: "Ultra-Rugged Barcode Scanners"
  },
  {
    id: "datalogic-powerscan-9600",
    title: "Datalogic PowerScan 9600 Series",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic PowerScan 9600 is the next-generation flagship ultra-rugged industrial scanner offering the most advanced performance in the PowerScan family. With superior 1D/2D imaging, an optional DPM decode module, enhanced wireless options, and the industry's highest ruggedness ratings, the 9600 addresses the most demanding industrial scanning requirements including automotive, logistics, and cold chain.",
    img: "/assets/img/Product/Datalogic/1-min.jpg",
    specs: [
      "Scan Type: 1D / 2D / DPM Area Imager (Industrial)",
      "Connectivity: RS-232 + USB + Bluetooth 5.0 + 433 MHz STAR",
      "Scan Range: Near contact to 10 m (32 ft) XLR",
      "Drop Rating: 6 ft (1.8 m) on all 6 faces",
      "Operating Temp: -40°C to 50°C (cold storage certified)",
      "IP Rating: IP67",
      "C1D2: Class 1 Division 2 certified",
      "DPM: Optional Direct Part Mark module",
      "Construction: All-metal reinforced housing",
      "Battery: 6,000 mAh extended Li-ion (wireless)"
    ],
    models: ["PowerScan PBT9600 (BT)", "PowerScan PM9600 (Multi-IF)", "PowerScan PD9600 XLR"],
    useCases: [
      "Next-gen heavy industrial 2D scanning",
      "Automotive DPM traceability",
      "Cold chain & freezer extended-range scanning",
      "Hazardous manufacturing (C1D2)",
      "High-throughput logistics automation"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/industrial/powerscan-9600-pd-869.html",
    documents: [],
    type: "hardware",
    classification: "Ultra-Rugged Barcode Scanners"
  },
  {
    id: "datalogic-powerscan-9600-rfid",
    title: "Datalogic PowerScan 9600 RFID Series",
    category: "products",
    subcategory: "scanners",
    brand: "Datalogic",
    description: "The Datalogic PowerScan 9600 RFID combines the PowerScan 9600's ultra-rugged industrial barcode scanning with integrated UHF RFID reading capability in a single handheld device. This hybrid scanner-RFID reader enables simultaneous barcode and RFID data capture for manufacturing, logistics, and retail supply chain operations requiring dual-technology traceability.",
    img: "/assets/img/Product/Datalogic/1-min.jpg",
    specs: [
      "Scan Type: 1D / 2D Barcode + UHF RFID",
      "RFID: RAIN UHF Gen2 (ISO 18000-6C)",
      "RFID Read Range: Up to 1.5 m",
      "Connectivity: Bluetooth 5.0 + USB",
      "Drop Rating: 6 ft (1.8 m)",
      "Operating Temp: -30°C to 50°C",
      "IP Rating: IP65",
      "Decode: All 1D, 2D + UHF RFID tags",
      "Construction: All-metal rugged housing",
      "Industries: Manufacturing, logistics, retail"
    ],
    models: ["PowerScan 9600 RFID"],
    useCases: [
      "Hybrid barcode + RFID manufacturing traceability",
      "Retail supply chain RFID + barcode verification",
      "Logistics RFID asset tracking",
      "Automotive dual-tech production line",
      "Warehouse RFID + barcode inventory counting"
    ],
    officialUrl: "https://www.datalogic.com/eng/products/barcode-scanners/industrial/powerscan-9600-rfid-pd-876.html",
    documents: [],
    type: "hardware",
    classification: "Ultra-Rugged Barcode Scanners"
  },
  // ═══════════════════════════════════════════════════════════
  // BARCODE SCANNERS — Newland General Purpose Handheld
  // ═══════════════════════════════════════════════════════════
  {
    id: "newland-hr23-dorada",
    title: "Newland HR23 Dorada",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR23 Dorada is an affordable 1D/2D Bluetooth handheld scanner that takes intensive scanning to the next level with Newland's advanced decoding technology — all for the price of a 1D scanner. Available in corded and Bluetooth versions, the HR23 Dorada delivers 2D scanning performance at an exceptional value for retail, hospitality, and light warehouse use.",
    img: "/assets/img/Product/Newland/0000286_hr33_marlin_3.png",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded / Bluetooth 5.0",
      "Scan Range: Near contact to 30 cm",
      "Battery: Rechargeable Li-ion (BT model)",
      "Mobile Screen: Yes",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP42",
      "Decode: 1D, 2D, QR, DataMatrix, PDF417",
      "Illumination: White LED + aimer",
      "Price Tier: Value 2D scanner"
    ],
    models: ["HR23 Dorada Corded", "HR23 Dorada Bluetooth"],
    useCases: [
      "Entry-level retail 2D scanning",
      "Hospitality QR code scanning",
      "Light warehouse inventory",
      "Office 2D barcode capture",
      "Small business mobile POS"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr23-dorada",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-hr33-marlin",
    title: "Newland HR33 Marlin",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR33 Marlin is a high-performance 1D/2D Bluetooth handheld scanner featuring an easily replaceable battery for effortless, uninterrupted barcode scanning. With Bluetooth 5.0 and an ergonomic design, the HR33 Marlin delivers reliable 2D scanning with outstanding battery performance for retail, warehouse, and hospitality operations.",
    img: "/assets/img/Product/Newland/0000355_hr33_marlin_bt_3.png",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded / Bluetooth 5.0",
      "Battery: Replaceable Li-ion (BT model)",
      "Scan Range: Near contact to 35 cm",
      "Mobile Screen: Yes",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Decode: 1D, 2D, QR, DataMatrix, PDF417",
      "Illumination: White LED + aimer",
      "Battery Life: Full-shift replaceable cell"
    ],
    models: ["HR33 Marlin Corded", "HR33 Marlin Bluetooth"],
    useCases: [
      "Retail 2D POS checkout",
      "Warehouse mobile scanning",
      "Hospitality QR & loyalty scanning",
      "Healthcare light 2D scanning",
      "In-aisle retail inventory"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr33-marlin",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-bs80-piranha",
    title: "Newland BS80 Piranha II 1D/2D",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland BS80 Piranha II is a compact, pocket-sized 1D/2D handheld scanner delivering reliable barcode reading in an ultra-compact form factor. Perfect for mobile retail, food service, and light scanning applications where portability is paramount, the BS80 Piranha II reads all standard 1D and 2D barcodes including QR codes from mobile screens.",
    img: "/assets/img/Product/Newland/newland-bs80-piranha-ii-1d-2d.jpg",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded",
      "Form Factor: Ultra-compact pocket scanner",
      "Scan Range: Near contact to 20 cm",
      "Mobile Screen: Yes",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP40",
      "Decode: 1D, 2D, QR, PDF417, DataMatrix",
      "Weight: Under 100 g",
      "Price Tier: Compact entry-level"
    ],
    models: ["BS80 Piranha II"],
    useCases: [
      "Compact retail POS",
      "Food service & restaurant QR scanning",
      "Mobile event ticketing",
      "Library & small business",
      "Pop-up retail & mPOS"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/bs80-piranha",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-hr11-aringa",
    title: "Newland HR11 Aringa",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR11 Aringa is a compact, ergonomic 1D corded handheld scanner delivering excellent performance for intensive scanning of all SKU barcode labels. Its durable housing survives 1.5 m drops and its lightweight 120 g body reduces operator fatigue for all-day scanning in retail and light warehouse environments.",
    img: "/assets/img/Product/Newland/0000198_hr11_aringa_1.png",
    specs: [
      "Scan Type: 1D Linear Imager",
      "Connectivity: USB corded",
      "Scan Range: 5 – 40 cm",
      "Scan Rate: 100 scans/sec",
      "Drop Rating: 4.9 ft (1.5 m)",
      "IP Rating: IP42",
      "Decode: All standard 1D symbologies",
      "Weight: 120 g (compact lightweight)",
      "Illumination: Red LED linear",
      "Price Tier: Entry-level 1D"
    ],
    models: ["HR11 Aringa"],
    useCases: [
      "Intensive retail POS scanning",
      "Inventory barcode label reading",
      "Hospitality & food service 1D",
      "Office & library scanning",
      "Light warehouse receiving"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr11-aringa",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-hr15-wahoo-corded",
    title: "Newland HR15 Wahoo Corded",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR15 Wahoo Corded is a 1D/2D handheld scanner with a coiled cable for easy reach and tangle-free operation. Supporting all common 1D barcodes plus PDF417 and MicroPDF417 stacked 2D barcodes, the Wahoo Corded delivers versatile multi-symbology scanning for retail and light commercial environments.",
    img: "/assets/img/Product/Newland/0000032_hr15-wahoo-bt-sd.png",
    specs: [
      "Scan Type: 1D + PDF417 / MicroPDF417",
      "Connectivity: USB corded (coiled cable)",
      "Scan Range: Near contact to 35 cm",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP41",
      "Decode: 1D, PDF417, MicroPDF417",
      "Illumination: LED aiming",
      "Cable: Coiled USB for workspace flexibility",
      "Weight: ~130 g",
      "Price Tier: Mid-range"
    ],
    models: ["HR15 Wahoo Corded"],
    useCases: [
      "Retail POS with PDF417 driver license scanning",
      "Government ID & document scanning",
      "Healthcare patient ID scanning",
      "Hospitality & ticketing",
      "Light warehouse receiving"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr15-wahoo",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-hr15-wahoo-bt-sd",
    title: "Newland HR15 Wahoo BT SD",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR15 Wahoo BT SD uses Bluetooth 5.0 to maintain a strong, anti-interference wireless connection for scanning in tight workspaces. This versatile cordless scanner fits right at home in compact retail, hospitality, and office environments where cable-free scanning improves workflow efficiency.",
    img: "/assets/img/Product/Newland/0000645_nls-cd1580-n0.png",
    specs: [
      "Scan Type: 1D + PDF417 / MicroPDF417",
      "Wireless: Bluetooth 5.0",
      "Battery: Rechargeable Li-ion",
      "Wireless Range: Up to 10 m",
      "Scan Range: Near contact to 35 cm",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP41",
      "Decode: 1D, PDF417, MicroPDF417",
      "Anti-Interference: Bluetooth 5.0 frequency hopping",
      "Price Tier: Mid-range cordless"
    ],
    models: ["HR15 Wahoo BT SD"],
    useCases: [
      "Cordless retail POS in small spaces",
      "Hospitality wireless order scanning",
      "Government ID & document scanning",
      "Healthcare portable scanning",
      "Office & library mobile scanning"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr15-wahoo",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-hr32-marlin-hc",
    title: "Newland HR32 Marlin HC",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR32 Marlin HC is a healthcare-grade 1D/2D barcode scanner featuring an antimicrobial coating and Bluetooth 5.0 connectivity. It reads virtually all 1D or 2D barcodes, including high-density codes, with a strong anti-interference wireless connection — making it ideal for clinical and patient-facing healthcare environments requiring regular disinfection.",
    img: "/assets/img/Product/Newland/0000016_hr32-marlin-bluetooth-hc.png",
    specs: [
      "Scan Type: 1D / 2D Area Imager",
      "Connectivity: USB corded HC / Bluetooth 5.0 HC",
      "Healthcare: Antimicrobial coating, disinfectant-ready",
      "Scan Range: Near contact to 35 cm",
      "Mobile Screen: Yes",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Decode: 1D, 2D, QR, high-density codes",
      "Illumination: White LED + aimer",
      "Certifications: Healthcare safety compliant"
    ],
    models: ["HR32 Marlin Corded HC", "HR32 Marlin Bluetooth HC"],
    useCases: [
      "Hospital patient wristband scanning",
      "Medication administration (eMAR)",
      "Clinical specimen & lab scanning",
      "Pharmacy prescription reading",
      "Healthcare asset tracking"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr32-marlin-hc",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-hr52-bonito",
    title: "Newland HR52 Bonito",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR52 Bonito is a premium 1D/2D area imager scanner scanning virtually all barcodes — including damaged and reflective surfaces — with ease. Available in corded, Bluetooth, and DUO (simultaneous BT + USB) variants, the HR52 offers snappy and accurate scanning performance through a strong Bluetooth 5.0 connection with extended read range and superior decode capability.",
    img: "/assets/img/Product/Newland/0000182_hr52_bonito_bluetooth_2.png",
    specs: [
      "Scan Type: 1D / 2D Area Imager (premium)",
      "Connectivity: USB corded / Bluetooth 5.0 / DUO (BT+USB)",
      "Scan Range: Near contact to 50 cm",
      "Mobile Screen: Yes — excellent on digital screens",
      "Reflective Surfaces: Superior decode on shiny labels",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Decode: 1D, 2D, QR, DataMatrix, damaged codes",
      "DUO: Simultaneous BT + USB dual connection",
      "Battery: High-capacity Li-ion (BT models)"
    ],
    models: ["HR52 Bonito Corded", "HR52 Bonito Bluetooth", "HR52 Bonito DUO"],
    useCases: [
      "Premium retail POS with reflective label scanning",
      "Healthcare 2D scanning including damaged codes",
      "Manufacturing part marking verification",
      "Logistics mobile scanning with DUO",
      "High-accuracy inventory & asset tracking"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr52-bonito",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-hr12-anchoa",
    title: "Newland HR12 Anchoa",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland HR12 Anchoa is a practical, user-friendly entry-level 1D scanner at an extremely competitive price. Incorporating Newland's 1D chip technology for excellent barcode scanning performance at low power consumption, the HR12 Anchoa is the ideal scanner for budget-conscious retailers, libraries, and light commercial applications.",
    img: "/assets/img/Product/Newland/0000395_hr12_anchoa_2.png",
    specs: [
      "Scan Type: 1D Linear Imager",
      "Connectivity: USB corded",
      "Scan Range: 5 – 35 cm typical",
      "Scan Rate: 100 scans/sec",
      "Drop Rating: 4 ft (1.2 m)",
      "IP Rating: IP41",
      "Decode: All standard 1D symbologies",
      "Power: Low-power chip technology",
      "Weight: Under 120 g",
      "Price Tier: Entry-level budget"
    ],
    models: ["HR12 Anchoa"],
    useCases: [
      "Budget-tier retail POS",
      "Library & document scanning",
      "School & educational use",
      "Light office scanning",
      "Entry-level 1D barcode applications"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/hr12-anchoa",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-nvh220-lophius-bt",
    title: "Newland NVH220 Lophius AI Bluetooth",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland NVH220 Lophius AI is an AI-powered 1D/2D handheld scanner that leverages artificial intelligence algorithms to achieve superior decode performance on challenging barcodes including damaged, distorted, and low-contrast codes. The Bluetooth variant delivers AI-enhanced wireless scanning for retail, logistics, and manufacturing quality control applications.",
    img: "/assets/img/Product/Newland/newland-nvh220-lophius-ai-bluetooth.jpg",
    specs: [
      "Scan Type: 1D / 2D AI-Powered Area Imager",
      "AI Feature: Artificial Intelligence decode algorithm",
      "Wireless: Bluetooth 5.0",
      "Scan Range: Near contact to 50 cm",
      "Mobile Screen: Yes",
      "Damaged Codes: Superior AI-enhanced decode",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Decode: 1D, 2D, QR, damaged & distorted barcodes",
      "Battery: Rechargeable Li-ion"
    ],
    models: ["NVH220 Lophius AI Bluetooth"],
    useCases: [
      "Manufacturing QC scanning of difficult part codes",
      "Logistics damaged label recovery",
      "Retail high-density 2D scanning",
      "Healthcare specimen labels (worn/damaged)",
      "AI-assisted industrial barcode verification"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/nvh220-lophius",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "newland-nvh220-lophius-corded",
    title: "Newland NVH220 Lophius AI Corded",
    category: "products",
    subcategory: "scanners",
    brand: "Newland",
    description: "The Newland NVH220 Lophius AI Corded is the USB-connected version of Newland's AI-powered 1D/2D scanner. Delivering the same artificial intelligence-enhanced barcode decode performance as the BT variant via a direct USB connection, it's ideal for fixed-position countertop POS and inspection stations requiring the best possible decode rate on challenging codes.",
    img: "/assets/img/Product/Newland/newland-nvh220-lophius-ai-corded.jpg",
    specs: [
      "Scan Type: 1D / 2D AI-Powered Area Imager",
      "AI Feature: Artificial Intelligence decode algorithm",
      "Connectivity: USB corded",
      "Scan Range: Near contact to 50 cm",
      "Mobile Screen: Yes",
      "Damaged Codes: Superior AI-enhanced decode",
      "Drop Rating: 5 ft (1.5 m)",
      "IP Rating: IP52",
      "Decode: 1D, 2D, QR, damaged & distorted barcodes",
      "Application: Fixed-position AI scanning"
    ],
    models: ["NVH220 Lophius AI Corded"],
    useCases: [
      "Fixed POS AI-enhanced 2D scanning",
      "Quality inspection station barcode reading",
      "Manufacturing damaged-code recovery",
      "Logistics label verification",
      "Retail countertop premium 2D scanning"
    ],
    officialUrl: "https://www.newlandaidc.com/products/barcode-scanner/nvh220-lophius",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  // ═══════════════════════════════════════════════════════════
  // BARCODE SCANNERS — Hikrobot Wired Handheld Code Readers
  // ═══════════════════════════════════════════════════════════
  {
    id: "hikrobot-idh2000",
    title: "Hikrobot IDH2000 Series Wired Handheld Code Reader",
    category: "products",
    subcategory: "scanners",
    brand: "Hikrobot",
    description: "The Hikrobot IDH2000 Series is an entry-level wired handheld code reader from Hikrobot's industrial machine vision division. Leveraging Hikrobot's advanced image processing technology, the IDH2000 delivers reliable 1D and 2D barcode reading for industrial automation, manufacturing inspection, and logistics applications with robust industrial connectivity.",
    img: "/assets/img/Product/Hikrobot/Aw7hz6sVFLKTAAAAAElFTkSuQmCC.jpg",
    specs: [
      "Scan Type: 1D / 2D Industrial Code Reader",
      "Technology: Hikrobot Advanced Image Processing",
      "Connectivity: USB wired industrial",
      "Scan Range: Near contact to 30 cm",
      "Decode: 1D, 2D, QR, DataMatrix, PDF417",
      "Drop Rating: Industrial grade",
      "IP Rating: IP54",
      "Illumination: White LED precision",
      "Industries: Manufacturing, logistics, automation",
      "Series: Entry-level IDH"
    ],
    models: ["IDH2000 Series Wired Handheld Code Reader"],
    useCases: [
      "Manufacturing production line code reading",
      "Industrial logistics barcode capture",
      "Quality inspection scanning",
      "Warehouse automation integration",
      "Industrial automation data collection"
    ],
    officialUrl: "https://www.hikrobotics.com/en/machinevision/service/download/?module=1",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "hikrobot-idh3000",
    title: "Hikrobot IDH3000 Series Wired Handheld Code Reader",
    category: "products",
    subcategory: "scanners",
    brand: "Hikrobot",
    description: "The Hikrobot IDH3000 Series is a mid-range wired handheld code reader offering enhanced image processing performance for industrial environments. Built on Hikrobot's machine vision technology platform, the IDH3000 handles a wider range of barcode types and surface conditions including DPM codes, making it suitable for demanding manufacturing and automation inspection tasks.",
    img: "/assets/img/Product/Hikrobot/hikrobot-idh3000-series.jpg",
    specs: [
      "Scan Type: 1D / 2D / DPM Industrial Code Reader",
      "Technology: Hikrobot Machine Vision Platform",
      "Connectivity: USB + RS-232 wired industrial",
      "Scan Range: Near contact to 40 cm",
      "DPM: Direct Part Mark reading capability",
      "Decode: 1D, 2D, QR, DataMatrix, DPM",
      "IP Rating: IP54",
      "Illumination: Multi-angle LED",
      "Industries: Manufacturing, automotive, electronics",
      "Series: Mid-range IDH"
    ],
    models: ["IDH3000 Series Wired Handheld Code Reader"],
    useCases: [
      "Industrial DPM barcode reading",
      "Automotive component traceability",
      "Electronics manufacturing inspection",
      "Production line quality control",
      "Industrial automation code capture"
    ],
    officialUrl: "https://www.hikrobotics.com/en/machinevision/service/download/?module=1",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "hikrobot-idh7000",
    title: "Hikrobot IDH7000 Series Wired Handheld Code Reader",
    category: "products",
    subcategory: "scanners",
    brand: "Hikrobot",
    description: "The Hikrobot IDH7000 Series is a high-performance wired handheld code reader with advanced industrial-grade image processing for demanding code reading applications. Supporting extended-range scanning and superior performance on difficult surfaces including glossy, reflective, and damaged barcodes, the IDH7000 is engineered for precision industrial scanning workflows.",
    img: "/assets/img/Product/Hikrobot/hikrobot-idh7000-series.jpg",
    specs: [
      "Scan Type: 1D / 2D / DPM High-Performance Code Reader",
      "Technology: Hikrobot Advanced Machine Vision",
      "Connectivity: USB + RS-232 + Ethernet industrial",
      "Scan Range: Near contact to 60 cm extended",
      "DPM: Advanced Direct Part Mark reading",
      "Decode: 1D, 2D, DPM, reflective, damaged codes",
      "IP Rating: IP65",
      "Illumination: High-power multi-spectrum LED",
      "Industries: Automotive, aerospace, heavy manufacturing",
      "Series: High-performance IDH"
    ],
    models: ["IDH7000 Series Wired Handheld Code Reader"],
    useCases: [
      "High-performance industrial DPM reading",
      "Aerospace component serial number tracking",
      "Automotive body-in-white laser-etched codes",
      "Extended-range warehouse code reading",
      "Precision manufacturing quality inspection"
    ],
    officialUrl: "https://www.hikrobotics.com/en/machinevision/service/download/?module=1",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "hikrobot-idh9000",
    title: "Hikrobot IDH9000 Series Wired Handheld Code Reader",
    category: "products",
    subcategory: "scanners",
    brand: "Hikrobot",
    description: "The Hikrobot IDH9000 Series is Hikrobot's flagship ultra-high-performance wired handheld code reader, incorporating the most advanced machine vision image processing algorithms available. Designed for the most demanding industrial reading tasks including miniature, ultra-dense, and severely damaged codes, the IDH9000 represents the pinnacle of Hikrobot's handheld scanning technology.",
    img: "/assets/img/Product/Hikrobot/hikrobot-idh9000-series.png",
    specs: [
      "Scan Type: 1D / 2D / DPM Ultra-High-Performance Code Reader",
      "Technology: Hikrobot Premium Machine Vision AI Platform",
      "Connectivity: USB + RS-232 + Ethernet + GigE industrial",
      "Scan Range: Near contact to 80 cm ultra-extended",
      "DPM: Ultra-high-performance Direct Part Mark",
      "Decode: All 1D, 2D, DPM, miniature, ultra-dense codes",
      "IP Rating: IP67",
      "Resolution: High-resolution industrial image sensor",
      "Industries: Semiconductor, medical devices, aerospace",
      "Series: Flagship premium IDH"
    ],
    models: ["IDH9000 Series Wired Handheld Code Reader"],
    useCases: [
      "Semiconductor component ultra-dense code reading",
      "Medical device micro-barcode scanning",
      "Aerospace precision DPM traceability",
      "High-value asset individual serialization",
      "Research & precision industrial inspection"
    ],
    officialUrl: "https://www.hikrobotics.com/en/machinevision/service/download/?module=1",
    documents: [],
    type: "hardware",
    classification: "General Purpose Handheld Scanners"
  },
  {
    id: "androidpos",
    title: "Android POS Terminal",
    category: "products",
    subcategory: "pos",
    brand: "Newland",
    description: "Android POS that provides businesses with the mobility of a tablet and the functionality of a fixed terminal. Features a 10.1\" tablet, MSR attachment, pistol grip with built-in 2D barcode scanner, 2nd removable battery, and optional dock station to transform into a full-fledged stationary POS.",
    img: "/assets/img/Product/POS/AndroidPOS.png",
    specs: [
      "Display: 10.1\" FHD IPS touch",
      "OS: Android 10 Enterprise",
      "CPU: Octa-core 2.0 GHz",
      "RAM: 4 GB / Storage: 64 GB",
      "Built-in 2D barcode scanner",
      "MSR + NFC + Fingerprint"
    ],
    models: [
      "NQuire 1000",
      "N910 Pro",
      "PT30"
    ],
    documents: [],
    type: "hardware",
    featured: true
  },
  {
    id: "windowspos",
    title: "Windows POS Terminal",
    category: "products",
    subcategory: "pos",
    brand: "Posiflex",
    description: "A newly designed Windows POS terminal featuring an ultra-slim and sleek look that exhibits elegance. Uncompromising on space requirements, better cable management, and easy maintenance — taking POS terminal design to the next level.",
    img: "/assets/img/Product/POS/windowsPOS.jpg",
    specs: [
      "Display: 15.6\" FHD touch",
      "OS: Windows 10/11 IoT",
      "CPU: Intel Core i3/i5",
      "RAM: 4–16 GB / SSD: 128–512 GB",
      "Peripheral ports: USB 3.0×4, COM×2",
      "MSR / iButton / Fingerprint options"
    ],
    models: [
      "Posiflex XT-3315",
      "RT-5100",
      "MT-4009"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "billingrollpos",
    title: "Billing Roll",
    category: "products",
    subcategory: "pos",
    brand: "Cryptware",
    description: "Our wide selection of receipt paper ensures that no matter what printer you have, we'll have the right paper for it. From standard thermal rolls to multi-ply impact paper in a variety of sizes for cash registers, POS, mobile printing, e-ticketing, and gas station pump payment terminals.",
    img: "/assets/img/Product/POS/billingrollPOS.png",
    specs: [
      "Width: 57 mm, 76 mm, 80 mm",
      "Thermal & multi-ply impact",
      "Standard & long-life BPA-free",
      "Custom preprinted available",
      "Colored variants available",
      "Core diameter: 12 mm / 25 mm"
    ],
    models: [
      "BPA-Free Thermal 80mm",
      "Colored Thermal 57mm",
      "Multi-Ply 76mm"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "billingThermalpos",
    title: "POS Billing Thermal Printer",
    category: "products",
    subcategory: "pos",
    brand: "Epson",
    description: "High-performance printing speed up to 220 mm per second. Speedy printing satisfies crowded check-out lines and promotional activities in peak hours. Features spill-resistant top cover, easy paper replacement, and flexible wall-mount design.",
    img: "/assets/img/Product/POS/thermalprinterPOS.jpg",
    specs: [
      "Print speed: up to 220 mm/sec",
      "Paper width: 58 mm / 80 mm",
      "Resolution: 180 × 180 DPI",
      "Interface: USB + Serial + Ethernet",
      "Auto-cutter included",
      "Spill-resistant top cover"
    ],
    models: [
      "Epson TM-T88VII",
      "TM-T20III",
      "TM-T82X"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "cashdrawer",
    title: "Cash Drawer",
    category: "products",
    subcategory: "pos",
    brand: "Posiflex",
    description: "Cash drawers are one of the core components of every Point of Sale System. Printer or terminal-driven models available. Compatible with any POS system. Designed for the most rugged environments — also available in lighted variants perfect for your bar or nightclub.",
    img: "/assets/img/Product/POS/CashDrawerPOS.jpg",
    specs: [
      "Printer-driven / USB / Serial",
      "Bill slots: 5 / Coin slots: 8",
      "Two-point locking security",
      "Dimensions: 330×380×100 mm",
      "Steel construction",
      "Compatible with all major printers"
    ],
    models: [
      "CR9310",
      "CR6310",
      "Manual Release Model"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "softwarepos",
    title: "POS Software",
    category: "products",
    subcategory: "pos",
    brand: "Cryptware",
    description: "POS Software is the center of any system and determines how effectively you can run your business. Every business is different — whether you're a retail store, restaurant, or need to process orders on the go, we have the software to get your business running.",
    img: "/assets/img/Product/POS/softwarePOS.png",
    specs: [
      "Cloud + on-premise options",
      "Real-time inventory sync",
      "Multi-store management",
      "CRM & loyalty integration",
      "Tax & GST compliant reports",
      "Android + Windows compatible"
    ],
    models: [
      "Retail Pro",
      "RestoPOS",
      "CloudPOS Enterprise"
    ],
    documents: [],
    type: "software"
  },
  {
    id: "fixed-reader",
    title: "RFID Fixed Readers",
    category: "products",
    subcategory: "rfid",
    brand: "Zebra",
    description: "Our fixed RAIN RFID readers help you achieve maximum asset visibility across your enterprise. Get even more insight with the RFID Array Reader which provides visibility into the pinpoint location of all your tagged assets, including whether they are on the move.",
    img: "/assets/img/Product/RFID/fixed-reader-rfid.jpg",
    specs: [
      "RAIN RFID / UHF Gen2",
      "ISO 18000-6C compliant",
      "Up to 4 antenna ports",
      "Read rate: 1000+ tags/sec",
      "GPIO: 4 inputs / 4 outputs",
      "PoE+ powered"
    ],
    models: [
      "FX7500",
      "FX9600",
      "ATR7000"
    ],
    documents: [],
    type: "hardware",
    featured: true
  },
  {
    id: "handheld-reader",
    title: "RFID Handheld Readers",
    category: "products",
    subcategory: "rfid",
    brand: "Zebra",
    description: "From warehouses and loading docks to indoor customer-facing and carpeted environments, our handheld RAIN RFID readers and RFID-enabled scanners help you achieve maximum visibility into your enterprise assets.",
    img: "/assets/img/Product/RFID/hendheld-reader-rfid.jpg",
    specs: [
      "RAIN RFID / UHF Gen2",
      "Read range: up to 15 m",
      "Android 10 OS",
      "Wi-Fi 802.11ac + BT 5.0",
      "IP65 rated",
      "Hot-swap battery"
    ],
    models: [
      "RFD40",
      "RFD8500",
      "MC3330R"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "antennas-rfid",
    title: "RFID Antennas",
    category: "products",
    subcategory: "rfid",
    brand: "Zebra",
    description: "Quickly and accurately track inventory and assets. Our robust RAIN RFID antennas offer the high performance and range needed for high-traffic and precision environments — from loading docks to clean rooms.",
    img: "/assets/img/Product/RFID/Antennas-rfid.png",
    specs: [
      "RAIN UHF 902–928 MHz",
      "Linear & circular polarization",
      "Gain: 6 dBi – 9 dBi",
      "Indoor & outdoor rated",
      "IP67 rated (outdoor)",
      "RP-TNC / N-type connectors"
    ],
    models: [
      "AN440",
      "AN480",
      "AN720"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "printer-rfid",
    title: "RFID Printers",
    category: "products",
    subcategory: "rfid",
    brand: "Zebra",
    description: "Your solution depends on reliable data. With the industry's widest range of printers you can accurately print and encode RAIN RFID labels, tags, and cards where and when you need them. Factory- or field-installable RFID encoding capability meets your evolving needs for years to come.",
    img: "/assets/img/Product/RFID/tag-label-rfid.jpg",
    specs: [
      "UHF RFID encoding",
      "ISO 18000-6C / EPC Gen2",
      "Print + encode simultaneously",
      "Desktop, mobile & industrial formats",
      "Void prevention and verify mode",
      "Print resolution: 203–300 DPI"
    ],
    models: [
      "ZD500R",
      "ZT410 RFID",
      "ZQ630 RFID"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "plain-barcode-labels",
    title: "Plain Barcode Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Standard direct thermal and thermal transfer white paper labels. Excellent print quality for general shipping, warehousing, retail, and inventory barcodes. Available in standard and custom sizes.",
    img: "/assets/img/Product/consumable/Plain-Barcode-Labels.jpg",
    specs: [
      "Direct thermal & thermal transfer",
      "Material: Paper / Polypropylene",
      "Temp range: -10°C to +80°C",
      "Custom sizes & core diameters",
      "Permanent adhesive",
      "Suitable for all major printers"
    ],
    models: [
      "Standard 50×25mm",
      "Standard 100×150mm",
      "Custom Cut"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "colored-barcode",
    title: "Colored Barcode Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "High-quality colored barcode labels designed for color-coded inventory tracking, product categorization, and branding. Available in various colors and dimensions to match your identification system.",
    img: "/assets/img/Product/consumable/Colored-Barcode-Labels.jpg",
    specs: [
      "Direct thermal printable",
      "Available in 10+ colors",
      "Permanent adhesive",
      "Standard & custom sizes",
      "Compatible with Zebra, TSC, Godex",
      "Temperature resistant to 70°C"
    ],
    models: [
      "Red",
      "Yellow",
      "Green",
      "Blue",
      "Orange",
      "Custom Color"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "polyester-barcode",
    title: "Polyester Barcode Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Highly durable polyester labels with excellent resistance to chemicals, moisture, tearing, and extreme temperatures. Ideal for asset tagging and long-term product tracking in harsh environments.",
    img: "/assets/img/Product/consumable/Polyester-Barcode-Labels.jpg",
    specs: [
      "Material: Polyester (PET)",
      "Chemical resistant",
      "Temp range: -40°C to +150°C",
      "Moisture & UV resistant",
      "Matte & glossy finish",
      "Thermal transfer print method"
    ],
    models: [
      "Silver Polyester",
      "White Matte Polyester",
      "Transparent Polyester"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "printed-barcode",
    title: "Printed Barcode Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Custom pre-printed labels featuring your brand logo, static text, or predefined sequential serial numbers. Ready to print additional barcode data on demand. Minimum order quantities available.",
    img: "/assets/img/Product/consumable/Printed-Barcode-Label.jpeg",
    specs: [
      "Pre-printed + overprint capable",
      "Full color or spot color printing",
      "Variable data capable",
      "Logo & branding integration",
      "Custom sequential numbering",
      "Min order: 1000 labels"
    ],
    models: [
      "Pre-Printed Roll",
      "Fan-Fold Sheet",
      "Continuous Feed"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "food-labels",
    title: "Food Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Food-safe labels compliant with safety regulations for direct and indirect food contact. Resistant to moisture, freezing temperatures, and condensation — ideal for supermarkets, food production, and cold chain logistics.",
    img: "/assets/img/Product/consumable/Food-Labels.jpg",
    specs: [
      "FDA food-contact compliant",
      "Freezer-grade: -40°C rated",
      "Moisture resistant adhesive",
      "Direct thermal printable",
      "Removable & permanent options",
      "Custom sizes available"
    ],
    models: [
      "Freezer Grade 50×25mm",
      "Removable Adhesive",
      "All-Temp Label"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "medical-labels",
    title: "Medical Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "FDA-compliant labels for medical devices, laboratory specimens, syringe markers, and pharmacy prescriptions. Designed to withstand sterilization, autoclave, and refrigeration without adhesive failure.",
    img: "/assets/img/Product/consumable/Medical-Labels.jpg",
    specs: [
      "FDA / CE compliant",
      "Autoclave resistant",
      "Cryogenic storage rated",
      "Tamper-evident options",
      "Direct thermal & laser print",
      "Lab specimen tube compatible"
    ],
    models: [
      "Autoclave Label",
      "Cryogenic Label",
      "Pharmacy Rx Label"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "security-labels",
    title: "Security Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Tamper-evident security labels that leave a void message or break apart upon removal. Protect your products and assets against unauthorized access, theft, and counterfeiting.",
    img: "/assets/img/Product/consumable/Security-Labels.jpg",
    specs: [
      "VOID pattern on removal",
      "Brittle facestock material",
      "Permanent aggressive adhesive",
      "Custom VOID text available",
      "Sequential serial numbering",
      "Laser or thermal print"
    ],
    models: [
      "Void Security Label",
      "Destructible Label",
      "Serial Numbered Security"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "void-labels",
    title: "Void Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Tamper-evident labels that display a visible \"VOID\" message on the surface when peeled or removed. Ideal for warranty protection, document sealing, and anti-tamper applications.",
    img: "/assets/img/Product/consumable/Void-Labels.jpg",
    specs: [
      "VOID pattern reveal on peel",
      "Silver / white facestock",
      "Permanent pressure-sensitive adhesive",
      "Custom size & shape",
      "Print resolution: 203+ DPI",
      "Temperature resistant"
    ],
    models: [
      "Silver VOID",
      "White VOID",
      "Custom VOID Text"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "tamper-proof-labels",
    title: "Tamper Proof Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Specialized tamper-proof labels that crumble or fracture when any attempt is made to remove them, guaranteeing product integrity and providing clear evidence of tampering.",
    img: "/assets/img/Product/consumable/Tamper-Proof-Label.jpg",
    specs: [
      "Destructible vinyl facestock",
      "Fractures on removal attempt",
      "Permanent aggressive adhesive",
      "Chemical & UV resistant",
      "Custom printing available",
      "Sequential numbering option"
    ],
    models: [
      "Destructible Vinyl",
      "Ultra-Destructible",
      "Crumble-on-Peel"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "warranty-labels",
    title: "Warranty Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Warranty protection labels and seals that break easily if tampered with. Prevents unauthorized opening, tracks returns securely, and provides proof of original sealing.",
    img: "/assets/img/Product/consumable/Warranty-Label.jpg",
    specs: [
      "High-tack permanent adhesive",
      "Sequential serial numbers",
      "Custom branding & logo",
      "Heat & chemical resistant",
      "Holographic options available",
      "Min order: 500 labels"
    ],
    models: [
      "Standard Warranty Seal",
      "Holographic Warranty",
      "Numbered Warranty"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "taffeta-labels",
    title: "Taffeta Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "High-quality care tags and brand labels made from premium taffeta fabric. Comfortable, wash-resistant, and durable print for clothing and apparel — suitable for all garment labeling requirements.",
    img: "/assets/img/Product/consumable/Taffeta-Labels.jpg",
    specs: [
      "Material: Taffeta fabric",
      "Wash-fast at 60°C",
      "Thermal transfer printable",
      "Heat-shrink & iron-on options",
      "Custom woven or printed",
      "Soft touch, non-irritating"
    ],
    models: [
      "Printed Taffeta",
      "Woven Taffeta",
      "Satin Taffeta"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "transparent-labels",
    title: "Transparent Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Clear, see-through labels that give a clean, premium \"no-label\" look. Perfect for glass bottles, cosmetics, and luxury product packaging where aesthetics are critical.",
    img: "/assets/img/Product/consumable/Transparent-Labels.jpg",
    specs: [
      "Material: Clear PET / BOPP",
      "High-gloss finish",
      "Permanent & removable adhesive",
      "Laser & inkjet printable",
      "Scratch & moisture resistant",
      "FDA compliant variants"
    ],
    models: [
      "Clear BOPP",
      "Clear PET Gloss",
      "Clear Matte"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "weatherproof-labels",
    title: "Weatherproof Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Waterproof and weather-resistant labels engineered for outdoor use. Resistant to moisture, fading, and temperature fluctuations — designed for outdoor asset management and signage.",
    img: "/assets/img/Product/consumable/Weatherproof-Labels.jpg",
    specs: [
      "UV-resistant top coat",
      "Waterproof facestock",
      "Operating temp: -40°C to +120°C",
      "Aggressive outdoor adhesive",
      "Thermal transfer printable",
      "Outdoor lifespan: 3–5 years"
    ],
    models: [
      "Outdoor Asset Label",
      "UV-Resistant Polyester",
      "All-Weather Paper"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "drum-labels",
    title: "Drum Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Heavy-duty chemical drum labels engineered to adhere to metal and plastic surfaces. Designed to withstand harsh chemicals, weather, and UV exposure for industrial drum and pail identification.",
    img: "/assets/img/Product/consumable/Drum-Labels.jpg",
    specs: [
      "Curved surface adhesive",
      "Chemical & solvent resistant",
      "Operating temp: -20°C to +100°C",
      "GHS / HAZMAT compliant design",
      "UV-resistant face stock",
      "Custom sizes up to A4"
    ],
    models: [
      "GHS Drum Label",
      "Standard Drum Label",
      "Chemical Resistant"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "jewelry-tags",
    title: "Jewelry Tags",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Premium, adhesive-free center tags designed for jewelry, rings, and accessories. Clean removal ensures no sticky residue on delicate products while providing clear pricing and barcode identification.",
    img: "/assets/img/Product/consumable/Jewelry-Tag.jpg",
    specs: [
      "String-tied no-adhesive design",
      "Barcode + price printable",
      "Tyvek & paper variants",
      "Thermal transfer print",
      "Size: 40×20mm to 70×40mm",
      "Custom branding available"
    ],
    models: [
      "Tyvek Jewelry Tag",
      "Paper String Tag",
      "RFID Jewelry Tag"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "product-labels",
    title: "Product Labels",
    category: "products",
    subcategory: "consumables",
    brand: "Cryptware",
    description: "Clear, vibrant labels designed for retail products, cosmetics, food items, and promotional packaging. Available in matte, gloss, and textured finishes to match your brand identity.",
    img: "/assets/img/Product/consumable/Product-Labels.jpg",
    specs: [
      "Full color printing available",
      "Matte, gloss & satin finish",
      "Permanent & removable adhesive",
      "Paper, BOPP & PET facestock",
      "Shape: Rectangle, circle, die-cut",
      "Minimum quantity: 500 labels"
    ],
    models: [
      "Gloss Product Label",
      "Matte Product Label",
      "Die-Cut Custom Shape"
    ],
    documents: [],
    type: "hardware"
  },
  {
    id: "Cloud-Services",
    title: "Cloud Services",
    category: "solutions",
    subcategory: "cloud",
    description: "Cloud services are infrastructure, platforms, or software hosted by third-party providers made available through the internet. Cloud services facilitate data flow from front-end clients through the internet to the provider's systems — accessible with nothing more than a computer and internet connectivity.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "software"
  },
  {
    id: "e-procurement",
    title: "e-Procurement",
    category: "solutions",
    subcategory: "eprocurement",
    description: "Modernize your supply chain and requisition processes. Automated supplier bidding, order placement, and contract compliance workflows integrated directly into your ERP.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "software"
  },
  {
    id: "IP-CCTV",
    title: "IP-CCTV",
    category: "solutions",
    subcategory: "cctv",
    description: "CCTV surveillance can deter potential criminals. When a crime does occur, video footage can help law enforcement investigate and provide evidence for prosecution. Used in conjunction with audio, thermal, and other sensors to alert officials to occurrences out of the ordinary.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "hardware"
  },
  {
    id: "ISP-Solutions",
    title: "ISP Solutions",
    category: "solutions",
    subcategory: "isp",
    description: "Internet service provider (ISP) solutions for personal and business customers. Making it possible to surf the web, shop online, conduct business, and connect with family and friends. Also providing email services, domain registration, web hosting, and browser packages.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "software"
  },
  {
    id: "It-infra",
    title: "IT & Infra",
    category: "solutions",
    subcategory: "it-infra",
    description: "Enterprise-grade IT infrastructure setup including server rack installations, virtualization, automated backup systems, active directory services, and secure local area networks.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "hardware"
  },
  {
    id: "network-security",
    title: "Network and Security",
    category: "solutions",
    subcategory: "network",
    description: "Network security is a broad term covering technologies, devices, and processes — a set of rules and configurations designed to protect the integrity, confidentiality, and accessibility of computer networks and data.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "hardware"
  },
  {
    id: "office-automation",
    title: "Office Automation",
    category: "solutions",
    subcategory: "office",
    description: "Office automation refers to computer machinery and software used to digitally create, collect, store, manipulate, and relay office information. Raw data storage, electronic transfer, and management of electronic business information comprise the basic activities.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "hardware"
  },
  {
    id: "Software",
    title: "Software",
    category: "solutions",
    subcategory: "software",
    description: "Software is a set of instructions, data, or programs used to operate computers and execute specific tasks. It is the opposite of hardware, which describes the physical aspects of a computer.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "software"
  },
  {
    id: "cryptoaccounting",
    title: "CryptoAccounting Pricing",
    category: "solutions",
    subcategory: "accounting",
    description: "Comprehensive crypto bookkeeping, operation visibility, and financial department tracking. Empower your team with robust automated ledger and tax-compliant transaction pipelines.",
    img: "/assets/img/mainlogo_3(1).jpg",
    specs: null,
    type: "software"
  },
  {
    id: "e-commerce-erp-template",
    title: "ERP - Cryptware Infotech Solutions LLP",
    category: "industries",
    subcategory: "templates",
    description: "This premium ERP product helps businesses run their daily operations in one place. It supports two working styles: Warehouse and inventory operations (WMS), and Billing and invoice operations (Billing). Built for teams who want better control over purchasing, stock movement, sales fulfillment, invoicing, profit tracking, and team accountability.",
    img: "/assets/img/erp.png",
    specs: [
      "Warehouse and inventory operations (WMS)",
      "Billing and invoice operations (Billing)",
      "Purchasing & Vendor Management",
      "Stock movement & Conversion",
      "Sales Fulfillment & Invoicing",
      "Profit tracking & Team accountability"
    ],
    type: "software",
    workingStyles: [
      {
        name: "Warehouse & Inventory Operations (WMS)",
        icon: "warehouse",
        desc: "Optimize bulk and loose stock movement, monitor rack placements, and track stock conversions dynamically."
      },
      {
        name: "Billing & Invoice Operations (Billing)",
        icon: "billing",
        desc: "Handle order-to-cash lifecycle, tax invoice records, delivery documentation, and payments smoothly."
      }
    ],
    whoShouldUse: [
      {
        team: "Business Owner",
        help: "Sees stock, sales, and profit clearly in one dashboard"
      },
      {
        team: "Operations Team",
        help: "Manages purchase, stock movement, conversion, and dispatch"
      },
      {
        team: "Sales Team",
        help: "Creates quotations, sales orders, and closes customer orders faster"
      },
      {
        team: "Accounts Team",
        help: "Tracks invoices, expenses, pending payments, and profitability"
      },
      {
        team: "Admin Team",
        help: "Controls users, access, printer setup, and system activity logs"
      }
    ],
    features: [
      {
        name: "Dashboard",
        icon: "dashboard",
        what: "Open one screen to see today's purchase, today's sales, stock, low-stock alerts, revenue, and profit.",
        benefit: "Faster decisions without waiting for manual reports. Management can spot risks and opportunities early."
      },
      {
        name: "Master Setup (Business Foundation)",
        icon: "setup",
        what: "Create and manage key master data like products, customers, suppliers, categories, warehouse, racks, size, units, and brands.",
        benefit: "Clean and consistent data. Fewer mistakes in purchasing, stock, and sales entries."
      },
      {
        name: "Purchase Management",
        icon: "purchase",
        what: "Add purchase entries as bulk or loose stock. Link purchases to suppliers and products. Print barcodes/labels.",
        benefit: "Better stock visibility from day one. Faster receiving process and easier item tracking."
      },
      {
        name: "Purchase Orders",
        icon: "orders",
        what: "Create and track purchase orders for suppliers. Monitor order status and keep records.",
        benefit: "Better vendor planning. Reduces missed or delayed procurements."
      },
      {
        name: "Sales Management (Sales + Order + Quotation)",
        icon: "sales",
        what: "Create quotations for customers. Track sales order lifecycle: Quotation → Draft → Confirm → Dispatch → Fulfill → Close.",
        benefit: "Clear order tracking from lead to payment. Better customer service and fewer fulfillment delays."
      },
      {
        name: "Sales Invoices",
        icon: "invoice",
        what: "Create and manage sales invoices. Maintain delivery and tax invoice records.",
        benefit: "Accurate billing and better financial control. Clear invoice history for follow-up and audits."
      },
      {
        name: "Inventory Management",
        icon: "inventory",
        what: "Move stock between warehouse and rack. Convert bulk stock into loose stock. Check product price and available stock instantly.",
        benefit: "Better stock utilization. Less dead stock and fewer stock-out situations."
      },
      {
        name: "Expense Tracking",
        icon: "expense",
        what: "Record and manage business expenses for complete cost visibility.",
        benefit: "Complete cost visibility. Better profit and margin understanding."
      },
      {
        name: "Reports and Ledgers",
        icon: "reports",
        what: "View stock report, purchase report, sales report, stock movement report, customer ledger, supplier ledger, and P&L report.",
        benefit: "Ready insights for review meetings. Faster business decisions based on facts, not assumptions."
      },
      {
        name: "Administration and Control",
        icon: "admin",
        what: "Manage users and permissions, configure currency and printer settings, change password, and review audit logs.",
        benefit: "Better security and accountability. Controlled access and clean operations."
      }
    ]
  },
  {
    id: "textile-and-apparels-erp-template",
    title: "Textile and Apparels ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "The profitability of an apparel manufacturing unit depends on the scheduling of its machines, workmen, and high level of coordination within various departments in the organization.",
    img: "/assets/img/Industries/textiles-apparels-industry.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "construction-real-estate-erp-template",
    title: "Construction & Real Estate ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "The \"3 Cs\" — coordination, collaboration, and cost, all key success factors in the construction industry, come together in open source ERP/CRM. Add in project, assets, and human resource management features for a winning formula.",
    img: "/assets/img/Industries/construction-real-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "integrated-public-sector-erp-solution",
    title: "Integrated Public Sector ERP Solution",
    category: "industries",
    subcategory: "templates",
    description: "More than any corporation, the government needs to optimize its operations using technologies to serve its people better. Many governments have identified the possibilities of serving people with the help of digitization, automation, and intelligent decision support systems.",
    img: "/assets/img/Industries/egovernance-erp-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "telecom-erp-template",
    title: "Telecom ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "Telecom ERP template gives you maximum flexibility to configure complex business processes unique to your telecom business. Implement efficient end-to-end processes throughout your value chain and get better control over your organization.",
    img: "/assets/img/Industries/telecom-erp-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "education-erp-template",
    title: "Education ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "The Education ERP template has been designed to cover the needs of any educational institute, whether it is a high school, university, training center, or group of institutions.",
    img: "/assets/img/Industries/education-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "retail-and-supply-chain-template",
    title: "Retail and Supply Chain Template",
    category: "industries",
    subcategory: "templates",
    description: "Retail & Supply Chain Template is a complete industry-specific solution covering the needs of all-size companies: retailers, distribution companies, wholesalers, and FMCG companies. Specially caters to supermarkets, hypermarkets, mini markets, apparel outlets, convenience stores, and more.",
    img: "/assets/img/Industries/retail-scm-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "distribution-erp-template",
    title: "Distribution ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "Distribution companies achieve a higher level of automation in various areas of operations. Includes state-of-the-art Warehouse Management System supporting picking, put away, replenishment, and integration with robotics systems.",
    img: "/assets/img/Industries/distribution-erp-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "discrete-manufacturing-erp-template",
    title: "Discrete Manufacturing ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "A solution so powerful to recognize bottlenecks early in the planning process and handle sudden changes and shifting priorities during the manufacturing process.",
    img: "/assets/img/Industries/discrete-manufacturing-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "professional-service-template",
    title: "Professional Service Template",
    category: "industries",
    subcategory: "templates",
    description: "Optimizing assets and resources is the key to profitability when rendering professional services. We offer a comprehensive ERP application to help you organize your professional services business, with minimum cost and effort.",
    img: "/assets/img/Industries/business-services-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "life-insurance-erp-template",
    title: "Life Insurance ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "Life Insurance ERP solution allows business users to configure the software to meet their process needs, empowering organizations to seamlessly achieve their administrative goals with minimal effort and maximize productivity across multiple hierarchies.",
    img: "/assets/img/Industries/insurance-erp-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "food-and-beverage-erp-template",
    title: "Food and Beverage ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "Our F&B ERP template is designed to cover the needs of the food service (catering) industry. Whether you are running a restaurant, fast-food chain, cafeteria, or any other meal preparation business.",
    img: "/assets/img/Industries/retail-scm-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "oil-and-gas-erp-template",
    title: "Oil and Gas ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "Oil and Gas ERP solution supports digital transformation in oil and gas exploration, refining, processing, and distribution. Reduce risk, increase efficiency, and make better-informed decisions.",
    img: "/assets/img/Industries/Oil-and-Gas-ERP-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "manufacturing-erp-template",
    title: "Manufacturing ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "A comprehensive manufacturing ERP template for production planning, machine scheduling, work order management, quality control, and shop floor automation. Streamline your entire production lifecycle.",
    img: "/assets/img/Industries/discrete-manufacturing-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "retail-pos-erp-template",
    title: "Retail POS ERP Template",
    category: "industries",
    subcategory: "templates",
    description: "Integrated Retail POS ERP template combining point-of-sale, inventory management, customer loyalty, supplier management, and financial reporting in one unified platform for multi-store retail operations.",
    img: "/assets/img/Industries/retail-scm-industry-template.jpg",
    specs: null,
    type: "software"
  },
  {
    id: "healthcare-erp-template",
    title: "Healthcare Management ERP",
    category: "industries",
    subcategory: "templates",
    description: "Complete healthcare management ERP covering patient records, appointment scheduling, billing, pharmacy management, lab integration, and compliance reporting for hospitals, clinics, and diagnostic centers.",
    img: "/assets/img/Industries/egovernance-erp-industry-template.jpg",
    specs: null,
    type: "software"
  }
];
