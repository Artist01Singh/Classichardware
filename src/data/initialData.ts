import { IMAGES } from '../assets/imageRegistry';

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryKey: 'door-handles' | 'locks' | 'cabinet' | 'sanitary' | 'tools';
  price: number;
  material: string;
  finishes: string[];
  description: string;
  features: string[];
  inStock: boolean;
  image: string;
  sku: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  source: 'Google' | 'Verified Client';
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  items?: { id: string; name: string; quantity: number }[];
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface BusinessConfig {
  name: string;
  category: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  googleRating: number;
  reviewCount: number;
  announcementText: string;
  announcementActive: boolean;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
}

export const INITIAL_BUSINESS_CONFIG: BusinessConfig = {
  name: "Classic Hardware",
  category: "Architectural & Builder's Hardware",
  phone: "08506887573",
  phoneFormatted: "+91 85068 87573",
  whatsappNumber: "918506887573",
  email: "classichardware.orders@gmail.com",
  address: "Shop No. 12-14, Commercial Market, Hardware & Architectural Complex",
  googleMapsUrl: "https://maps.app.goo.gl/F45zSatYSpVFvdbBA",
  googleRating: 4.9,
  reviewCount: 148,
  announcementText: "Trade & Project Specials: Architect & Contractor volume discounts available on premium mortise locks & door fittings. Direct WhatsApp assistance: 08506887573.",
  announcementActive: true,
  openingHours: {
    weekdays: "Monday – Saturday: 9:30 AM – 8:30 PM",
    sunday: "Sunday: 10:00 AM – 5:00 PM"
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Knurled Brass Architectural Lever Handle Set",
    category: "Door Handles",
    categoryKey: "door-handles",
    price: 3850,
    material: "Solid Forged Brass",
    finishes: ["Brushed Brass", "Matte Black", "Antique Bronze", "Satin Nickel"],
    description: "Architect-grade knurled texture lever handle mounted on a circular solid brass rosette. Engineered for heavy residential and commercial entrance doors.",
    features: ["Heavy spring return mechanism", "Corrosion-resistant PVD coating", "Fits 35mm - 55mm door thickness", "Matching escutcheon included"],
    inStock: true,
    image: IMAGES.craftsmanshipKnurled,
    sku: "CH-DH-KN401"
  },
  {
    id: "prod-2",
    name: "Monolithic Satin Nickel & Brushed Gold Lever Pair",
    category: "Door Handles",
    categoryKey: "door-handles",
    price: 2950,
    material: "Virgin Zinc & Solid Brass Core",
    finishes: ["Satin Nickel", "Brushed Gold", "Gunmetal Grey"],
    description: "Sleek minimalist European profile with rounded ergonomic grip. Ideal for modern apartments, luxury villas, and boutique workspaces.",
    features: ["Silent action internal bearing", "Salt spray tested 200 hours", "Concealed screw fixing", "Ergonomic tactile balance"],
    inStock: true,
    image: IMAGES.doorHandlesMarble,
    sku: "CH-DH-MN202"
  },
  {
    id: "prod-3",
    name: "Heavy-Duty Euro Profile Mortise Lock Body & Brass Cylinder",
    category: "Locks & Security",
    categoryKey: "locks",
    price: 2450,
    material: "Hardened Steel & Solid Brass Deadbolt",
    finishes: ["Brushed Brass", "Stainless Steel", "Matte Black"],
    description: "Industrial-grade double throw mortise lock body with computerized 6-pin brass euro cylinder and 4 anti-drill dimple keys.",
    features: ["Anti-saw hardened steel bolt", "Reversible latch for left/right doors", "Tested for 300,000 cycles", "Anti-pick cylinder mechanism"],
    inStock: true,
    image: IMAGES.precisionMortiseLock,
    sku: "CH-LK-MB855"
  },
  {
    id: "prod-4",
    name: "Diamond Knurled Solid Brass Cabinet & Drawer T-Bar Pulls",
    category: "Cabinet & Kitchen",
    categoryKey: "cabinet",
    price: 780,
    material: "100% Solid Extruded Brass",
    finishes: ["Burnished Brass", "Matte Black", "Raw Brushed Brass", "Dark Bronze"],
    description: "Luxury tactile knurled cabinet handles designed for high-end bespoke kitchens, wardrobes, bathroom vanities, and credenzas.",
    features: ["Heavy solid brass weight", "M4 machine screws included", "Anti-fingerprint nano-lacquer", "Available in 96mm, 128mm, 160mm & 224mm"],
    inStock: true,
    image: IMAGES.cabinetPullsKitchen,
    sku: "CH-CB-KB108"
  },
  {
    id: "prod-5",
    name: "Full-Extension Soft-Close Telescopic Drawer Channels (Pair)",
    category: "Cabinet & Kitchen",
    categoryKey: "cabinet",
    price: 980,
    material: "Cold-Rolled Carbon Steel (1.2mm Gauge)",
    finishes: ["Zinc Plated Silver", "Matte Black Electrostatic"],
    description: "Ultra-smooth hydraulic damping runners with 45kg load rating. Silent closing performance tested for 50,000 push-pull actions.",
    features: ["Integrated hydraulic soft-close damper", "Quick-release trigger lever", "45 kg load capacity", "Lengths from 12-inch to 24-inch"],
    inStock: true,
    image: IMAGES.telescopicDrawerSlide,
    sku: "CH-TC-SC45"
  },
  {
    id: "prod-6",
    name: "Commercial Grade SUS304 Ball Bearing Door Butt Hinges (Pair)",
    category: "Door Handles",
    categoryKey: "door-handles",
    price: 650,
    material: "Grade 304 Stainless Steel",
    finishes: ["Satin Stainless", "Antique Brass", "Matte Black", "PVD Gold"],
    description: "Heavy 3mm thick stainless steel hinges with 4 precision ball bearings. Guaranteed noiseless, sag-free door movement for decades.",
    features: ["4 self-lubricating ball bearings", "Non-removable pin for exterior doors", "Load rating up to 80 kg/pair", "Rustproof for lifetime use"],
    inStock: true,
    image: IMAGES.ballBearingHinges,
    sku: "CH-HG-SS304"
  },
  {
    id: "prod-7",
    name: "Smart Biometric & Digital Keypad Smart Door Lock",
    category: "Locks & Security",
    categoryKey: "locks",
    price: 9400,
    material: "High-Strength Aluminum Alloy & Tempered Glass",
    finishes: ["Matte Black", "Space Grey"],
    description: "State-of-the-art keyless smart lock with semiconductor fingerprint sensor, capacitive keypad, RFID card access, and mechanical backup key.",
    features: ["0.3s rapid fingerprint recognition", "Scramble PIN anti-peep technology", "Emergency USB-C power jump", "Auto-locking motorized latch"],
    inStock: true,
    image: IMAGES.smartBiometricLock,
    sku: "CH-LK-BIO90"
  },
  {
    id: "prod-8",
    name: "Solid Brass Luxury Bathroom Towel Bar & Robe Hook Hardware Suite",
    category: "Bathroom & Sanitary",
    categoryKey: "sanitary",
    price: 2850,
    material: "Forged Brass",
    finishes: ["Brushed Gold", "Matte Black", "Chrome Plated"],
    description: "Coordinated architectural bathroom hardware suite featuring a 24-inch heavy towel rail, toilet paper holder, and dual robe hooks.",
    features: ["Heavy solid brass construction", "Moisture and corrosion proof", "Concealed wall mounting brackets", "5-year finish warranty"],
    inStock: true,
    image: IMAGES.brassBathroomSuite,
    sku: "CH-SN-STE30"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Classic Hardware Boutique Showroom",
    category: "Showroom",
    image: IMAGES.showroomBoutique,
    description: "Dedicated consultation desks and illuminated architectural hardware wall displays in our showroom."
  },
  {
    id: "gal-2",
    title: "Luxury Fluted Walnut Entrance Door Suite",
    category: "Door Fittings",
    image: IMAGES.flutedWalnutDoor,
    description: "Solid fluted dark walnut entrance door fitted with satin brass knurled lever handle and high-security cylinder."
  },
  {
    id: "gal-3",
    title: "Precision Knurled Brass Hardware Detail",
    category: "Door Fittings",
    image: IMAGES.craftsmanshipKnurled,
    description: "Close-up diamond knurled brass handle and mortise lockplate mounted on dark textured travertine."
  },
  {
    id: "gal-4",
    title: "Custom Kitchen Cabinet Hardware",
    category: "Cabinet & Kitchen",
    image: IMAGES.cabinetPullsKitchen,
    description: "Knurled solid brass pulls and soft-close drawer system installed on architectural dark cabinetry."
  },
  {
    id: "gal-5",
    title: "High-Security Mechanical Locksets",
    category: "Locks & Security",
    image: IMAGES.precisionMortiseLock,
    description: "Engineered euro profile mortise lock mechanism and high-security brass computerized dimple cylinders."
  },
  {
    id: "gal-6",
    title: "Architectural Lever & Hinges Display",
    category: "Showroom",
    image: IMAGES.architecturalWall,
    description: "Curated solid brass handles, matte black pulls, and precision security fittings mounted on oak panels."
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Ar. Rajesh Verma",
    role: "Lead Architect, Studio Apex Design",
    rating: 5,
    date: "2 weeks ago",
    comment: "Classic Hardware has been our trusted partner for villa door fittings and kitchen hardware. Their solid brass collection and PVD finishes are exceptional. Quick delivery and genuine technical advice from their team.",
    source: "Google"
  },
  {
    id: "rev-2",
    author: "Sanjay Singhal",
    role: "Interior Contractor & Builder",
    rating: 5,
    date: "1 month ago",
    comment: "Best hardware store in town! Sourced all the mortise locks, soft-close drawer channels, and door handles for our 12-unit residential project. Unbeatable trade pricing and genuine high-gauge quality.",
    source: "Google"
  },
  {
    id: "rev-3",
    author: "Pooja Malhotra",
    role: "Homeowner, Luxury Apartment Renovation",
    rating: 5,
    date: "2 months ago",
    comment: "Visited their showroom after finding them on Google. The staff patiently demonstrated knurled handles and smart locks that perfectly matched our dark walnut doors. Truly professional service and prompt support.",
    source: "Google"
  },
  {
    id: "rev-4",
    author: "Vikramjit Rao",
    role: "Property Developer",
    rating: 5,
    date: "3 months ago",
    comment: "High quality products, genuine brass material (not cheap pot metal), and transparent quotes. You can directly WhatsApp them on 08506887573 for instant quotes. Highly recommended.",
    source: "Google"
  }
];

export const INITIAL_FAQS = [
  {
    question: "Do you offer special trade discounts for architects, interior designers, and contractors?",
    answer: "Yes. Classic Hardware provides dedicated B2B project pricing, bulk order tiers, and credit terms for registered architects, interior designers, and building contractors. You can request a quote online or bring your bill of quantities (BOQ) directly to our showroom."
  },
  {
    question: "What finishes and materials are available for door handles and locks?",
    answer: "We specialize in solid forged brass, Grade 304/316 stainless steel, and high-strength virgin zinc alloy. Finishes include PVD Gold, Brushed Brass, Antique Bronze, Matte Black, Satin Nickel, Rose Gold, and Mirror Chrome with anti-tarnish protective coatings."
  },
  {
    question: "Can you provide matching master key systems or keyed-alike cylinders?",
    answer: "Absolutely. We customize master key suites and keyed-alike brass cylinders for residences, commercial offices, and hotels. This allows one master key to access all perimeter doors while individual sub-keys open specific rooms."
  },
  {
    question: "Do you supply physical hardware samples for client presentations?",
    answer: "Yes! We provide finish samples, handle swatches, and working sample boards for interior designers and architects presenting palettes to clients. Contact us on 08506887573 to arrange sample delivery."
  },
  {
    question: "How do I place an order or request an estimate for my project?",
    answer: "You can add items to your online Quote List on this website and send it directly via WhatsApp or email, call our store directly at 08506887573, or visit our showroom with your architectural floor plans."
  },
  {
    question: "Where is Classic Hardware located and what are your operating hours?",
    answer: "We are open Monday through Saturday from 9:30 AM to 8:30 PM, and Sundays from 10:00 AM to 5:00 PM. You can find our exact location on Google Maps using the directions button or the link provided across the site."
  }
];
