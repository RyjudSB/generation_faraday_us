/* =============================================================
   Product Detail Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   Rich content scraped from generationfaraday.com product pages
   ============================================================= */
import { useEffect, useState, useRef } from "react";
import { ArrowRight, CheckCircle2, ArrowLeft, ChevronLeft, ChevronRight, Shield, Zap, Package, Wrench, Radio } from "lucide-react";
import { Link, useParams } from "wouter";
import RFIDIcon from "../components/RFIDIcon";

// ── Product catalogue ──────────────────────────────────────────────────────────
const PRODUCTS: Record<string, {
  sku: string;
  name: string;
  category: string;
  categoryPath: string;
  badge?: string;
  tagline: string;
  description: string;
  features: string[];
  howToUse?: string[];
  compatibility?: string;
  dimensions?: string;
  specs: { label: string; value: string }[];
  relatedSkus: string[];
  images: string[];
}> = {
  "GFSB-MAX-LOCK": {
    sku: "GFSB-MAX-LOCK",
    name: "School Bag MAX LOCK",
    category: "Faraday Bags",
    categoryPath: "/products#bags",
    badge: "Top Seller",
    tagline: "The flagship school bag with magnetic MAX LOCK mechanism, the most complete signal-blocking solution available for schools.",
    description: "The Generation Faraday Max Lock is the ultimate phone management solution for schools. It combines 100% signal-blocking Faraday shielding with the MAX LOCK magnetic locking mechanism, which requires a teacher-controlled unlock dock or key to open. This makes it ideal for schools that need maximum enforcement, students physically cannot access their phones during the school day without teacher authorisation.\n\nThe bag is built to withstand the rigours of daily school use, with a welded waterproof TPU exterior, reinforced stitching, and a Faraday liner tested to 3,000-4,000 open/close cycles. Each bag is serialised with a unique ID for RFID tracking via the Generation Faraday app.\n\nThe Max Lock bag is designed to be taken home by students each day, meaning the signal-blocking benefit extends beyond school hours, supporting healthy screen habits at home as well as in the classroom. Custom colours and school branding are available for whole-school rollouts.",
    features: [
      "Blocks 100% of wireless signals, WiFi, 4G/5G, Bluetooth, NFC",
      "MAX LOCK magnetic locking mechanism, requires unlock dock or key to open",
      "Reinforced Faraday liner tested to 3,000-4,000 open/close cycles",
      "Welded waterproof TPU exterior, spill and humidity resistant",
      "Full-metal tamper-resistant lock, no thin pins to bend or fail",
      "Fits all phone models including large-screen devices up to 7\"",
      "Serialised with unique ID for RFID tracking via the GF app",
      "Customisable colours and school branding available",
      "Students take bag home, supports healthy habits beyond school",
      "Durable enough for 5-10 open/close cycles per day",
      "Tamper-evident design, visible if opened without authorisation",
      "Compatible with all Generation Faraday unlock accessories",
    ],
    howToUse: [
      "Student places their phone inside the bag at the start of the school day.",
      "The bag is sealed using the MAX LOCK magnetic closure, it cannot be opened without the unlock dock or key.",
      "At the end of the day (or when permitted), the teacher uses the Unlock Dock or Unlocking Key to release the lock.",
      "Students take the bag home, continuing signal-free habits outside school.",
    ],
    compatibility: "Compatible with GFUD-DOCK (Unlock Dock), GFUD-HH-DOCK (Handheld Unlock Dock), and GFUD-KEY (Unlocking Key + Lanyard). Works with GFSA-ORG (Class Phone Organizer) and GFSA-PH (Phone Hotel) for centralised storage.",
    specs: [
      { label: "SKU", value: "GFSB-MAX-LOCK" },
      { label: "Signal blocking", value: "WiFi, 4G/5G, Bluetooth, NFC, 100% guaranteed" },
      { label: "Lock type", value: "Magnetic MAX LOCK (requires GFUD-DOCK, GFUD-HH-DOCK, or GFUD-KEY)" },
      { label: "Fits", value: "All phone models up to 7\"" },
      { label: "Durability", value: "3,000-4,000 open/close cycles tested" },
      { label: "Exterior", value: "Welded waterproof TPU" },
      { label: "Tracking", value: "RFID-serialised, compatible with GF app" },
      { label: "Branding", value: "Custom colours and school logo available" },
    ],
    relatedSkus: ["GFSB-MAX-M", "GFUD-DOCK", "GFUD-KEY", "GFSA-ORG"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16253-e1744825663893.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16233-e1744825856630.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16193-e1744825739684.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16185-e1744825896209.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11773-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11821.jpg",
    ],
  },

  "GFSB-MAX": {
    sku: "GFSB-MAX",
    name: "School Bag MAX Velcro",
    category: "Faraday Bags",
    categoryPath: "/products#bags",
    badge: "Premium",
    tagline: "Premium signal-blocking school bag with secure Velcro closure, full-day device management without teacher-controlled unlocking.",
    description: "The Generation Faraday Max Velcro is the premium individual phone bag for schools that want reliable signal blocking without requiring teacher-controlled unlocking. It delivers the same 100% signal-blocking Faraday shielding as the MAX LOCK model, with a secure Velcro closure that students can open and close themselves.\n\nBuilt with the same welded waterproof TPU exterior and reinforced Faraday liner as the rest of the MAX range, the GFSB-MAX is designed for all-day use. The Velcro closure provides a strong, secure seal while remaining easy to operate, ideal for schools that want signal blocking with a more flexible access policy.\n\nEach bag is serialised for RFID tracking via the Generation Faraday app. Custom colours and school branding are available.",
    features: [
      "Blocks 100% of wireless signals, WiFi, 4G/5G, Bluetooth, NFC",
      "Secure Velcro closure, strong seal, no unlock dock required",
      "Reinforced Faraday liner tested to 3,000-4,000 open/close cycles",
      "Welded waterproof TPU exterior, spill and humidity resistant",
      "Fits all phone models including large-screen devices up to 7\"",
      "Serialised with unique ID for RFID tracking via the GF app",
      "Customisable colours and school branding available",
      "Students take bag home, supports healthy habits beyond school",
      "Lightweight and compact, easy to carry between classes",
    ],
    howToUse: [
      "Student places their phone inside the bag and seals the Velcro closure.",
      "The bag can be stored in the student's pocket, bag, or in a Phone Hotel or Class Organizer.",
      "When permitted, the student opens the Velcro closure to retrieve their phone.",
      "Students take the bag home each day.",
    ],
    compatibility: "Works with GFSA-PH (Phone Hotel) and GFSA-ORG (Class Phone Organizer) for centralised classroom storage.",
    specs: [
      { label: "SKU", value: "GFSB-MAX" },
      { label: "Signal blocking", value: "WiFi, 4G/5G, Bluetooth, NFC, 100% guaranteed" },
      { label: "Closure", value: "Secure Velcro" },
      { label: "Fits", value: "All phone models up to 7\"" },
      { label: "Durability", value: "3,000-4,000 open/close cycles tested" },
      { label: "Exterior", value: "Welded waterproof TPU" },
      { label: "Tracking", value: "RFID-serialised, compatible with GF app" },
      { label: "Branding", value: "Custom colours and school logo available" },
    ],
    relatedSkus: ["GFSB-MAX-LOCK", "GFSB-MAX-M", "GFSB-PRO", "GFSA-PH"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16253-e1744825663893.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16233-e1744825856630.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16193-e1744825739684.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16185-e1744825896209.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11773-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11821.jpg",
    ],
  },

  "GFSB-MAX-M": {
    sku: "GFSB-MAX-M",
    name: "School Bag MAX Magnetic",
    category: "Faraday Bags",
    categoryPath: "/products#bags",
    badge: "Popular",
    tagline: "MAX school bag with magnetic snap closure for fast, consistent access, no unlock dock required.",
    description: "The Generation Faraday Max Magnetic combines the premium MAX build quality with a magnetic snap closure system designed for fast, consistent daily use. It's ideal for schools that want a quick and reliable workflow at the start and end of each lesson, students place their phone in the bag, and the magnetic closure snaps shut securely.\n\nLike all MAX-range bags, it delivers 100% signal blocking across WiFi, 4G/5G, Bluetooth, and NFC, with a durable welded TPU exterior and RFID serialisation for app-based tracking. The magnetic closure is strong enough to keep the bag sealed throughout the school day while remaining easy to operate.\n\nCustom colours and school branding are available for whole-school rollouts.",
    features: [
      "Blocks 100% of wireless signals, WiFi, 4G/5G, Bluetooth, NFC",
      "Magnetic snap closure, fast, consistent, and secure",
      "Reinforced Faraday liner tested to 3,000-4,000 open/close cycles",
      "Welded waterproof TPU exterior",
      "Fits all phone models up to 7\"",
      "RFID-serialised for app tracking",
      "Customisable colours and school branding available",
      "Students take bag home each day",
      "No unlock dock or key required",
    ],
    howToUse: [
      "Student places their phone inside the bag and snaps the magnetic closure shut.",
      "The magnetic seal keeps the bag closed throughout the school day.",
      "Student opens the magnetic closure when permitted to access their phone.",
      "Students take the bag home each day.",
    ],
    compatibility: "Works with GFSA-PH (Phone Hotel) and GFSA-ORG (Class Phone Organizer) for centralised classroom storage.",
    specs: [
      { label: "SKU", value: "GFSB-MAX-M" },
      { label: "Signal blocking", value: "WiFi, 4G/5G, Bluetooth, NFC, 100% guaranteed" },
      { label: "Closure", value: "Magnetic snap" },
      { label: "Fits", value: "All phone models up to 7\"" },
      { label: "Durability", value: "3,000-4,000 open/close cycles tested" },
      { label: "Exterior", value: "Welded waterproof TPU" },
      { label: "Tracking", value: "RFID-serialised, compatible with GF app" },
    ],
    relatedSkus: ["GFSB-MAX-LOCK", "GFSB-MAX", "GFSB-PRO-M"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC09779-2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC01721-2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-12109.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/01/FaradayBag-11712.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg",
    ],
  },

  "GFSB-PRO-M": {
    sku: "GFSB-PRO-M",
    name: "School Bag PRO Magnetic",
    category: "Faraday Bags",
    categoryPath: "/products#bags",
    badge: "Best Value",
    tagline: "PRO-grade signal-blocking bag with magnetic closure, reliable performance at an accessible price point.",
    description: "The Generation Faraday Pro Magnetic delivers the core Generation Faraday signal-blocking performance in the PRO form factor, with a magnetic closure for fast daily use. It's the best-value option for schools that want reliable signal blocking for every student without the premium price of the MAX range.\n\nIdeal for whole-school rollouts where budget is a key consideration, the PRO Magnetic still delivers 100% signal blocking across all wireless frequencies, with a durable construction designed for daily school use. The magnetic closure provides a secure seal that students can operate quickly and consistently.\n\nLike all Generation Faraday bags, the PRO Magnetic is designed to be taken home by students, extending the signal-free benefit beyond school hours.",
    features: [
      "Blocks 100% of wireless signals, WiFi, 4G/5G, Bluetooth, NFC",
      "Magnetic closure, fast and easy to operate",
      "Durable construction for daily school use",
      "Fits all phone models up to 6.7\"",
      "RFID-serialised for app tracking",
      "Customisable colours available",
      "Students take bag home each day",
      "Cost-effective option for whole-school rollouts",
    ],
    howToUse: [
      "Student places their phone inside the bag and closes the magnetic snap.",
      "The bag can be stored in the student's bag or in a classroom organiser.",
      "Student opens the magnetic closure when permitted.",
      "Students take the bag home each day.",
    ],
    specs: [
      { label: "SKU", value: "GFSB-PRO-M" },
      { label: "Signal blocking", value: "WiFi, 4G/5G, Bluetooth, NFC, 100% guaranteed" },
      { label: "Closure", value: "Magnetic snap" },
      { label: "Fits", value: "All phone models up to 6.7\"" },
      { label: "Tracking", value: "RFID-serialised, compatible with GF app" },
    ],
    relatedSkus: ["GFSB-PRO", "GFSB-MAX-M", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02049.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02101.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02098.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02004.jpg",
    ],
  },

  "GFSB-PRO": {
    sku: "GFSB-PRO",
    name: "School Bag PRO Velcro",
    category: "Faraday Bags",
    categoryPath: "/products#bags",
    badge: "Entry Level",
    tagline: "Professional-grade Faraday school bag with Velcro closure, ideal for schools starting their phone-free journey.",
    description: "The Generation Faraday Pro Velcro is Generation Faraday's entry-level individual phone bag, designed for schools that are starting their phone-free programme and want a reliable, cost-effective solution. It delivers the same core 100% signal-blocking technology as the rest of the range, with a secure Velcro closure.\n\nThe PRO Velcro is the ideal starting point for pilot programmes and smaller schools, and can be upgraded to the MAX or MAX LOCK range as the programme matures. Despite being the entry-level option, it still delivers full signal blocking across all wireless frequencies and is built to withstand daily school use.\n\nStudents take the bag home each day, reinforcing healthy phone habits beyond school hours.",
    features: [
      "Blocks 100% of wireless signals, WiFi, 4G/5G, Bluetooth, NFC",
      "Secure Velcro closure",
      "Durable construction for daily school use",
      "Fits all phone models up to 6.7\"",
      "RFID-serialised for app tracking",
      "Students take bag home each day",
      "Ideal entry point for pilot programmes",
      "Upgradeable to MAX or MAX LOCK range",
    ],
    howToUse: [
      "Student places their phone inside the bag and seals the Velcro closure.",
      "The bag can be stored in the student's bag or in a classroom organiser.",
      "Student opens the Velcro closure when permitted.",
      "Students take the bag home each day.",
    ],
    specs: [
      { label: "SKU", value: "GFSB-PRO" },
      { label: "Signal blocking", value: "WiFi, 4G/5G, Bluetooth, NFC, 100% guaranteed" },
      { label: "Closure", value: "Velcro" },
      { label: "Fits", value: "All phone models up to 6.7\"" },
      { label: "Tracking", value: "RFID-serialised, compatible with GF app" },
    ],
    relatedSkus: ["GFSB-PRO-M", "GFSB-MAX", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02053-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02067-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC09779-2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC01721-2.jpg",
    ],
  },

  "GFSA-SB": {
    sku: "GFSA-SB",
    name: "Shielded Box",
    category: "Organisers & Storage",
    categoryPath: "/products#organisers",
    badge: "Centralised Collection",
    tagline: "Signal-blocking storage box with 36 numbered compartments, secure, centralised device collection for classrooms.",
    description: "The Generation Faraday Shielded Box is a portable, signal-blocking storage solution for centralised phone collection. It features 36 numbered foam-lined compartments, each perfectly sized to hold a Generation Faraday phone bag or a phone directly.\n\nThe Shielded Box is ideal for classrooms and exam settings where phones need to be collected and stored in a signal-blocked environment. The numbered compartments make it easy to assign a slot to each student and verify that all devices are accounted for. The portable design with carry handle means it can be moved between rooms as needed.\n\nThe Faraday-shielded interior ensures that all devices stored inside are completely cut off from wireless signals, WiFi, 4G/5G, Bluetooth, and NFC, for the duration of storage.",
    features: [
      "36 numbered foam-lined compartments",
      "Full Faraday shielding, blocks all wireless signals inside",
      "Portable design with carry handle",
      "Compatible with Generation Faraday phone bags or direct phone storage",
      "Numbered slots for easy student assignment and verification",
      "Durable construction for daily classroom use",
      "Ideal for exams, assessments, and centralised collection",
      "Compact enough to store on a shelf or desk",
    ],
    howToUse: [
      "Assign a numbered compartment to each student at the start of term.",
      "Students place their phone (in or out of a GF bag) into their assigned slot.",
      "Close the Shielded Box, all devices inside are immediately signal-blocked.",
      "At the end of the lesson or exam, open the box and students retrieve their devices from their numbered slot.",
    ],
    specs: [
      { label: "SKU", value: "GFSA-SB" },
      { label: "Capacity", value: "36 compartments" },
      { label: "Signal blocking", value: "Full Faraday shielded interior" },
      { label: "Portability", value: "Portable, carry handle included" },
      { label: "Ideal for", value: "Exams, assessments, centralised classroom collection" },
      { label: "Compatible with", value: "GF phone bags or direct phone storage" },
    ],
    relatedSkus: ["GFSA-PH", "GFSA-ORG", "GFSA-DB"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box3.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box4.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box5.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box6.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box7.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box8.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box9.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Phone-Box-graphics11.jpg",
    ],
  },

  "GFSA-PH": {
    sku: "GFSA-PH",
    name: "Phone Hotel",
    category: "Organisers & Storage",
    categoryPath: "/products#organisers",
    badge: "Classroom Favourite",
    tagline: "Wall-mounted classroom phone hotel with 30 numbered, Faraday-shielded slots, organised, shielded, and always accounted for.",
    description: "The Generation Faraday Phone Hotel is a wall-mounted or door-hanging classroom storage solution with 30 individually numbered, Faraday-shielded compartments. Each slot is sized to hold a Generation Faraday phone bag, keeping every student's device signal-blocked, organised, and identifiable throughout the school day.\n\nThe Phone Hotel is designed for classrooms that want a visible, structured approach to phone management. The numbered slots make it immediately clear if any device is missing, and the Faraday-shielded interior ensures that all stored devices are completely cut off from wireless signals.\n\nGeneration Faraday bags can either stay stationed in their compartments for consistent organisation, or be easily removed if students need to carry them to other classes. The top of each bag extends slightly above the compartment, allowing for quick and effortless insertion or removal.\n\nThe Phone Hotel can be mounted on a wall or hung over a door, making it suitable for any classroom layout. To clean, gently wipe away any residue with a soft, damp cloth.",
    features: [
      "30 individually numbered, Faraday-shielded compartments",
      "Full signal blocking, WiFi, 4G/5G, Bluetooth, NFC",
      "Wall-mountable or door-hanging installation",
      "Clear ID card window per slot for student name display",
      "Compatible with all Generation Faraday phone bags",
      "Bags can stay in slots or be removed between classes",
      "Top of each bag extends above slot for easy retrieval",
      "Durable construction for daily classroom use",
      "Visible at-a-glance, instantly shows if any device is missing",
    ],
    howToUse: [
      "Mount the Phone Hotel on a wall or hang over a classroom door.",
      "Assign a numbered slot to each student, insert their name card into the clear ID window.",
      "Students place their GF bag (with phone inside) into their assigned slot at the start of class.",
      "All devices are immediately signal-blocked inside the shielded compartments.",
      "At the end of class, students retrieve their bag from their numbered slot.",
    ],
    compatibility: "Compatible with all Generation Faraday phone bags (GFSB-MAX-LOCK, GFSB-MAX, GFSB-MAX-M, GFSB-PRO-M, GFSB-PRO). Can also store phones directly without bags.",
    specs: [
      { label: "SKU", value: "GFSA-PH" },
      { label: "Capacity", value: "30 numbered slots" },
      { label: "Signal blocking", value: "Full Faraday shielded interior" },
      { label: "Mounting", value: "Wall-mounted (grommet holes) or door-hanging" },
      { label: "ID visibility", value: "Clear ID card window per slot" },
      { label: "Compatible with", value: "All GF phone bags or direct phone storage" },
    ],
    relatedSkus: ["GFSA-ORG", "GFSA-SB", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/01/GFSB-HOTEL-Hero2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/01/GFSB-HOTEL-Hero4.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/01/FaradayBag-11941.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11956.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11949.jpg",
    ],
  },

  "GFUD-KEY": {
    sku: "GFUD-KEY",
    name: "Unlocking Key + Lanyard",
    category: "Locking & Security",
    categoryPath: "/products#locking",
    badge: "Teacher Wear",
    tagline: "Magnetic unlocking key with lanyard, teacher-worn access control for MAX LOCK bags, always to hand.",
    description: "The Generation Faraday Unlocking Key is a compact magnetic key worn on a lanyard by the teacher, providing discreet and always-accessible control over MAX LOCK phone bags. When a student needs to access their phone, for a permitted reason or at the end of the school day, the teacher simply brings the key into contact with the bag's lock to release it.\n\nThe Unlocking Key is the most portable unlocking solution in the Generation Faraday range. It requires no power, no batteries, and no setup, it works purely through magnetic contact. This makes it ideal as a backup to the Unlock Dock, or as the primary unlocking method for teachers who move between classrooms.\n\nThe key comes with a lanyard for comfortable teacher wear throughout the school day.",
    features: [
      "Magnetic unlocking mechanism, no batteries or power required",
      "Worn on a lanyard for constant, discreet teacher access",
      "Compatible with all Generation Faraday MAX LOCK bags",
      "Compact and lightweight, unobtrusive to wear all day",
      "Instant unlocking, simple contact with the bag's lock",
      "Ideal as a backup to the Unlock Dock",
      "Suitable for teachers who move between classrooms",
      "Lanyard included",
    ],
    howToUse: [
      "Teacher wears the Unlocking Key on the included lanyard throughout the school day.",
      "When a student needs to access their phone, the teacher brings the key into contact with the MAX LOCK mechanism on the bag.",
      "The magnetic contact releases the lock instantly, no force or complex operation required.",
      "The bag re-locks automatically when the key is removed.",
    ],
    compatibility: "Compatible with all Generation Faraday MAX LOCK bags (GFSB-MAX-LOCK). Works alongside GFUD-DOCK and GFUD-HH-DOCK as part of a complete unlocking system.",
    specs: [
      { label: "SKU", value: "GFUD-KEY" },
      { label: "Mechanism", value: "Magnetic contact unlocking" },
      { label: "Power", value: "No batteries or power required" },
      { label: "Compatible with", value: "All GF MAX LOCK bags (GFSB-MAX-LOCK)" },
      { label: "Includes", value: "Lanyard" },
      { label: "Ideal for", value: "Teacher-worn access control, backup to Unlock Dock" },
    ],
    relatedSkus: ["GFUD-DOCK", "GFUD-HH-DOCK", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key8.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key7.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key5.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key6.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key4.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key3.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key2.jpg",
    ],
  },

  "GFUD-STAND-2WAY": {
    sku: "GFUD-STAND-2WAY",
    name: "Unlock Dock 2-Way Stand",
    category: "Locking & Security",
    categoryPath: "/products#locking",
    badge: "Dock Accessory",
    tagline: "2-way stand for the Generation Faraday Unlock Dock, stable desk or counter mounting for high-traffic entry points.",
    description: "The Generation Faraday Unlock Dock Podium is a purpose-built stand for the Generation Faraday Unlock Dock, providing stable and ergonomic positioning at desk or counter height. The 2-way stand allows the Unlock Dock to be presented at the optimal angle for students to quickly unlock their MAX LOCK bags as they enter or exit the classroom.\n\nThe stand is designed for high-traffic environments where speed and reliability are essential. By positioning the Unlock Dock at a consistent, accessible height, it reduces the time needed for each student to unlock their bag and helps maintain a smooth flow at classroom entry and exit points.\n\nThe stand is sold separately from the Unlock Dock and is compatible with the standard GFUD-DOCK unit.",
    features: [
      "Stable desk or counter mounting for the Unlock Dock",
      "2-way orientation for optimal bag alignment",
      "Designed for high-traffic classroom entry and exit points",
      "Reduces unlocking time per student",
      "Durable construction for daily use",
      "Compatible with GFUD-DOCK (Unlock Dock)",
      "Sold separately from the Unlock Dock",
    ],
    howToUse: [
      "Place the 2-Way Stand on a stable desk or counter surface at the classroom entry point.",
      "Mount the Unlock Dock onto the stand.",
      "Students approach the stand and press their MAX LOCK bag against the Unlock Dock to release the lock.",
      "The stand keeps the Unlock Dock stable and at the correct height for efficient operation.",
    ],
    compatibility: "Compatible with GFUD-DOCK (Unlock Dock). Designed for use with GFSB-MAX-LOCK bags.",
    specs: [
      { label: "SKU", value: "GFUD-STAND-2WAY" },
      { label: "Compatible with", value: "GFUD-DOCK (Unlock Dock)" },
      { label: "Orientation", value: "2-way" },
      { label: "Mounting", value: "Desk or counter surface" },
      { label: "Sold separately", value: "Unlock Dock not included" },
    ],
    relatedSkus: ["GFUD-DOCK", "GFUD-STAND-4WAY", "GFUD-COVER", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium4.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium6.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium7.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium8.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium5.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium3.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium9.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium10.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium11.jpg",
    ],
  },

  "GFUD-STAND-4WAY": {
    sku: "GFUD-STAND-4WAY",
    name: "Unlock Dock 4-Way Stand",
    category: "Locking & Security",
    categoryPath: "/products#locking",
    badge: "Dock Accessory",
    tagline: "4-way stand for the Generation Faraday Unlock Dock, maximum flexibility for high-traffic entry points.",
    description: "The Generation Faraday Unlock Dock Podium 4-Way Stand is the high-capacity version of the Unlock Dock stand, designed for schools with very high student throughput at entry and exit points. The 4-way orientation allows students to approach from multiple directions simultaneously, significantly reducing queuing time.\n\nLike the 2-Way Stand, it provides stable and ergonomic positioning for the Unlock Dock, ensuring consistent and reliable operation throughout the school day. The 4-way design is particularly suited to wide corridors, main entrances, and assembly points where large numbers of students need to unlock their bags in a short time window.\n\nThe stand is sold separately from the Unlock Dock and is compatible with the standard GFUD-DOCK unit.",
    features: [
      "4-way orientation, students can approach from multiple directions",
      "Designed for very high student throughput",
      "Reduces queuing time at entry and exit points",
      "Stable and ergonomic positioning for the Unlock Dock",
      "Durable construction for daily use",
      "Compatible with GFUD-DOCK (Unlock Dock)",
      "Ideal for corridors, main entrances, and assembly points",
    ],
    howToUse: [
      "Position the 4-Way Stand at the classroom or corridor entry point.",
      "Mount the Unlock Dock onto the stand.",
      "Students approach from any of the 4 sides and press their MAX LOCK bag against the Unlock Dock.",
      "Multiple students can unlock simultaneously, reducing queuing.",
    ],
    compatibility: "Compatible with GFUD-DOCK (Unlock Dock). Designed for use with GFSB-MAX-LOCK bags.",
    specs: [
      { label: "SKU", value: "GFUD-STAND-4WAY" },
      { label: "Compatible with", value: "GFUD-DOCK (Unlock Dock)" },
      { label: "Orientation", value: "4-way" },
      { label: "Mounting", value: "Floor-standing" },
      { label: "Sold separately", value: "Unlock Dock not included" },
    ],
    relatedSkus: ["GFUD-DOCK", "GFUD-STAND-2WAY", "GFUD-COVER", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium4.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium6.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium7.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium8.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium5.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium3.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium9.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium10.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium11.jpg",
    ],
  },

  "GFUD-COVER": {
    sku: "GFUD-COVER",
    name: "Unlock Dock Tamperproof Cover",
    category: "Locking & Security",
    categoryPath: "/products#locking",
    badge: "Security Add-On",
    tagline: "Tamperproof cover for the GF Unlock Dock, prevents unauthorised access and is visibly tamper-evident.",
    description: "The Generation Faraday Unlock Dock Tamper-Proof Cover is a security accessory for the Unlock Dock, designed to prevent unauthorised access to the unlocking mechanism. The cover physically restricts access to the Unlock Dock so that only authorised personnel, teachers or administrators, can use it to unlock MAX LOCK bags.\n\nThe cover is tamper-evident: if anyone attempts to remove or bypass it without authorisation, the evidence is clearly visible. This adds an important layer of accountability to the phone management system, ensuring that the Unlock Dock cannot be used by students to unlock their own bags without teacher knowledge.\n\nThe Tamper-Proof Cover is particularly recommended for schools where the Unlock Dock is positioned in a publicly accessible area, such as a corridor or reception desk.",
    features: [
      "Prevents unauthorised access to the Unlock Dock",
      "Tamper-evident, visible evidence if bypassed without authorisation",
      "Restricts Unlock Dock use to authorised personnel only",
      "Durable polymer construction",
      "Compatible with GFUD-DOCK (Unlock Dock)",
      "Recommended for publicly accessible Unlock Dock locations",
      "Adds accountability to the phone management system",
    ],
    howToUse: [
      "Fit the Tamper-Proof Cover over the Unlock Dock.",
      "The cover restricts access to the unlocking surface, only authorised personnel with the key or code can remove it.",
      "If the cover is tampered with, the evidence is clearly visible.",
      "Remove the cover when authorised unlocking is required.",
    ],
    compatibility: "Compatible with GFUD-DOCK (Unlock Dock). Recommended for use alongside GFUD-STAND-2WAY or GFUD-STAND-4WAY.",
    specs: [
      { label: "SKU", value: "GFUD-COVER" },
      { label: "Compatible with", value: "GFUD-DOCK (Unlock Dock)" },
      { label: "Tamper-evident", value: "Yes, visible evidence of tampering" },
      { label: "Material", value: "Durable polymer" },
      { label: "Ideal for", value: "Publicly accessible Unlock Dock locations" },
    ],
    relatedSkus: ["GFUD-DOCK", "GFUD-STAND-2WAY", "GFUD-STAND-4WAY", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04873.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04876.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04878.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04901.jpg",
    ],
  },

  "GFUD-DOCK": {
    sku: "GFUD-DOCK",
    name: "Unlock Dock",
    category: "Locking & Security",
    categoryPath: "/products#locking",
    badge: "Essential Accessory",
    tagline: "Teacher-controlled magnetic unlocking station, one dock unlocks all MAX LOCK bags in the classroom.",
    description: "The Generation Faraday Unlock Dock is a sleek and reliable magnetic unlocking station specifically designed for use with Generation Faraday MAX LOCK bags. This compact station ensures seamless and efficient unlocking for high-traffic environments, such as schools or workplaces, where secure device management is a priority.\n\nThe Unlock Dock uses a magnetic unlocking mechanism that simplifies the process of opening Generation Faraday locking bags, providing fast and secure access. Its non-slip base ensures stability during operation, making it easy for users to unlock bags without hassle. The compact and durable design is crafted from high-quality materials to withstand heavy use in busy settings.\n\nThe Unlock Dock requires no batteries or power, it operates purely through magnetic contact. For added security, it can be paired with the Tamper-Proof Cover (GFUD-COVER) or mounted on a 2-Way or 4-Way Stand (GFUD-STAND-2WAY / GFUD-STAND-4WAY) for controlled access at classroom entry points.",
    features: [
      "Magnetic unlocking mechanism, fast and secure bag release",
      "Compact and durable design, withstands heavy daily use",
      "Non-slip base, stable during operation",
      "Universal compatibility, works with all GF MAX LOCK bags",
      "No batteries or power required, low maintenance",
      "Can be paired with Tamper-Proof Cover for added security",
      "Compatible with 2-Way and 4-Way Stand accessories",
      "Suitable for desk, counter, or mounted installation",
    ],
    howToUse: [
      "Position the Unlock Dock on a stable surface or mount it as needed. Ensure it is within easy reach for users.",
      "To unlock a bag: align the Generation Faraday Max-Lock phone bag with the Unlock Dock and press gently to disengage the locking mechanism.",
      "Cleaning: wipe the surface with a dry or slightly damp cloth. Avoid harsh chemicals or abrasive materials.",
      "Storage: keep in a clean, dry area when not in use. Avoid exposure to extreme heat or moisture.",
      "Security: if using in a restricted setting, consider pairing with the Tamper-Proof Cover or mounting solutions for controlled access.",
    ],
    compatibility: "Compatible with all Generation Faraday MAX LOCK bags (GFSB-MAX-LOCK). Works with GFUD-COVER (Tamper-Proof Cover), GFUD-STAND-2WAY, and GFUD-STAND-4WAY. Can be installed in GFSA-ORG (Class Phone Organizer) via pre-drilled side holes.",
    specs: [
      { label: "SKU", value: "GFUD-DOCK" },
      { label: "Mechanism", value: "Magnetic contact unlocking" },
      { label: "Power", value: "No batteries or power required" },
      { label: "Compatible with", value: "All GF MAX LOCK bags (GFSB-MAX-LOCK)" },
      { label: "Accessories", value: "GFUD-COVER, GFUD-STAND-2WAY, GFUD-STAND-4WAY" },
      { label: "Base", value: "Non-slip" },
    ],
    relatedSkus: ["GFUD-HH-DOCK", "GFUD-KEY", "GFUD-COVER", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/WechatIMG538.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/WechatIMG535.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Faraday-14991.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Faraday-15004.jpg",
    ],
  },

  "GFSA-DB": {
    sku: "GFSA-DB",
    name: "Portable Phone Drop Box",
    category: "Organisers & Storage",
    categoryPath: "/products#organisers",
    badge: "Events & Venues",
    tagline: "Portable Faraday drop box for venue and event phone collection, signal-blocked, secure, and mobile.",
    description: "The Generation Faraday Phone Drop Box is a portable, signal-blocking collection box designed for venues and events where phones need to be collected and stored securely. It's ideal for theatres, concert venues, corporate events, exam halls, and any setting where a centralised, mobile phone collection point is needed.\n\nThe Drop Box features a Faraday-shielded interior that blocks all wireless signals from devices stored inside, WiFi, 4G/5G, Bluetooth, and NFC. Its portable design means it can be positioned at any entry point and moved as needed. The secure drop slot allows phones to be deposited quickly without requiring staff to handle each device individually.\n\nThe Phone Drop Box is a practical solution for venues that need to enforce a phone-free policy at scale, without the infrastructure of a fixed installation.",
    features: [
      "Full Faraday shielding, blocks all wireless signals inside",
      "Portable design, can be positioned at any entry point",
      "Secure drop slot for fast, contactless phone deposit",
      "Ideal for theatres, concerts, corporate events, and exam halls",
      "No fixed installation required",
      "Durable construction for repeated use",
      "Suitable for schools, venues, and events",
    ],
    howToUse: [
      "Position the Phone Drop Box at the venue entry point.",
      "Attendees or students deposit their phones through the drop slot.",
      "All deposited phones are immediately signal-blocked inside the Faraday-shielded interior.",
      "At the end of the event or session, phones are retrieved from the box.",
    ],
    specs: [
      { label: "SKU", value: "GFSA-DB" },
      { label: "Signal blocking", value: "Full Faraday shielded interior" },
      { label: "Portability", value: "Mobile design, no fixed installation" },
      { label: "Ideal for", value: "School entrances, assemblies, exams, events, venues" },
      { label: "Access", value: "Secure drop slot" },
    ],
    relatedSkus: ["GFSA-SB", "GFSA-PH", "GFSA-ORG"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC03051.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC03054.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02953.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02975.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02979.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02994.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC03050.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC03042.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/DSC03051-1.jpg",
    ],
  },

  "GFUD-HH-DOCK": {
    sku: "GFUD-HH-DOCK",
    name: "Handheld Unlock Dock",
    category: "Locking & Security",
    categoryPath: "/products#locking",
    badge: "Mobile Option",
    tagline: "Portable handheld version of the GF Unlock Dock, ideal for corridor, assembly, and mobile unlocking.",
    description: "The Generation Faraday Handheld Unlock Dock is a portable, handheld version of the standard Unlock Dock, designed for teachers and staff who need to unlock MAX LOCK bags on the move. It's ideal for corridor unlocking at the end of the school day, assembly points, and any situation where a fixed Unlock Dock is not practical.\n\nLike the standard Unlock Dock, the Handheld version uses a magnetic unlocking mechanism that requires no batteries or power. The teacher simply brings the handheld dock into contact with the MAX LOCK bag to release the lock instantly. The compact, ergonomic design makes it comfortable to carry and use throughout the school day.\n\nThe Handheld Unlock Dock is particularly useful as a complement to fixed Unlock Docks, providing flexibility for situations where students cannot come to a fixed station.",
    features: [
      "Portable handheld design, unlocking on the move",
      "Magnetic unlocking mechanism, no batteries or power required",
      "Compatible with all GF MAX LOCK bags",
      "Compact and ergonomic, comfortable to carry all day",
      "Ideal for corridor, assembly, and mobile unlocking",
      "Complements fixed Unlock Dock installations",
      "Instant unlocking, simple contact with the bag's lock",
    ],
    howToUse: [
      "Teacher carries the Handheld Unlock Dock during corridor duty or assembly.",
      "To unlock a student's bag, bring the handheld dock into contact with the MAX LOCK mechanism.",
      "The magnetic contact releases the lock instantly.",
      "The bag re-locks automatically when the dock is removed.",
    ],
    compatibility: "Compatible with all Generation Faraday MAX LOCK bags (GFSB-MAX-LOCK). Works alongside GFUD-DOCK (fixed Unlock Dock) and GFUD-KEY (Unlocking Key).",
    specs: [
      { label: "SKU", value: "GFUD-HH-DOCK" },
      { label: "Mechanism", value: "Magnetic contact unlocking" },
      { label: "Power", value: "No batteries or power required" },
      { label: "Compatible with", value: "All GF MAX LOCK bags (GFSB-MAX-LOCK)" },
      { label: "Form factor", value: "Handheld, portable" },
      { label: "Ideal for", value: "Corridor, assembly, and mobile unlocking" },
    ],
    relatedSkus: ["GFUD-DOCK", "GFUD-KEY", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock3.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock4.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock5.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock6.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock1-1.jpg",
    ],
  },

  "GFSA-ORG": {
    sku: "GFSA-ORG",
    name: "Class Phone Organiser",
    category: "Organisers & Storage",
    categoryPath: "/products#organisers",
    badge: "Whole-Class Solution",
    tagline: "Durable aluminium organiser with 30 compartments, wall-mounted or freestanding, Unlock Dock compatible.",
    description: "The Generation Faraday Class Phone Organiser is a durable aluminium shelving unit compatible with all Generation Faraday Phone Bags. It features 30 compartments sized for easy access, with a design that prevents magnetic bags from sticking together during retrieval.\n\nThe unit can be wall-mounted or placed on a table or floor, making it suitable for any classroom layout. Pre-drilled side holes allow installation of Generation Faraday Unlock Docks (sold separately) when used with Max Lock bags, enabling students to unlock their bags directly at the organiser without needing a separate unlocking station.\n\nThe Class Phone Organiser can also be used without Generation Faraday Phone Bags by placing devices directly in the compartments. Engineered to keep devices organised and accessible, it supports efficient classroom management and provides a clear, visible record of which students have deposited their phones.",
    features: [
      "30 compartments, holds an entire class set of phones or GF bags",
      "Durable aluminium construction, robust and long-lasting",
      "Prevents magnetic bags from sticking together during retrieval",
      "Wall-mountable or freestanding (table or floor)",
      "Pre-drilled side holes for Unlock Dock installation",
      "Compatible with all GF phone bags or direct phone storage",
      "Organised layout, easy retrieval and monitoring of devices",
      "Supports efficient classroom management",
    ],
    howToUse: [
      "Mount the Class Phone Organiser on a wall or place on a stable surface.",
      "Optionally install Unlock Docks in the pre-drilled side holes (sold separately).",
      "Students place their GF bag (with phone inside) into their assigned compartment.",
      "If using Unlock Docks, students can unlock their MAX LOCK bags directly at the organiser.",
      "At the end of class, students retrieve their bag from their compartment.",
      "To clean, wipe the surface with a dry or slightly damp cloth.",
    ],
    compatibility: "Compatible with all Generation Faraday phone bags. Accepts GFUD-DOCK (Unlock Dock) installation via pre-drilled side holes. Works with GFSB-MAX-LOCK for a complete locked storage solution.",
    dimensions: "35.8\" L × 10\" W × 20\" H",
    specs: [
      { label: "SKU", value: "GFSA-ORG" },
      { label: "Capacity", value: "30 compartments" },
      { label: "Material", value: "Durable aluminium" },
      { label: "Dimensions", value: "35.8\" L × 10\" W × 20\" H" },
      { label: "Mounting", value: "Wall-mounted or freestanding (table or floor)" },
      { label: "Unlock Dock", value: "Pre-drilled side holes for GFUD-DOCK installation" },
      { label: "Compatible with", value: "All GF phone bags or direct phone storage" },
    ],
    relatedSkus: ["GFSA-PH", "GFSA-SB", "GFUD-DOCK", "GFSB-MAX-LOCK"],
    images: [
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-1-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-2-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-4-2.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-3-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-5-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-6-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-7-1.jpg",
      "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-8-1.jpg",
    ],
  },
};

// ── Image gallery component ────────────────────────────────────────────────────
function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image with nav arrows */}
      <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 aspect-square flex items-center justify-center group">
        <img
          src={images[active]}
          alt={`${name} - image ${active + 1}`}
          className="w-full h-full object-contain p-6 transition-opacity duration-200"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
              <ChevronLeft size={18} className="text-[#111111]" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
              <ChevronRight size={18} className="text-[#111111]" />
            </button>
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150 bg-white ${
                i === active ? "border-[#f95555] shadow-sm" : "border-gray-100 hover:border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-contain p-1"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Related product card ───────────────────────────────────────────────────────
function RelatedCard({ sku }: { sku: string }) {
  const p = PRODUCTS[sku];
  if (!p) return null;
  return (
    <Link href={`/products/${sku.toLowerCase()}`}
      className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#f95555]/40 hover:shadow-lg transition-all duration-200"
    >
      <div className="w-full aspect-square bg-[#F7F7F8] flex items-center justify-center overflow-hidden">
        {p.images?.[0] && (
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        )}
      </div>
      <div className="p-5">
        <div className="text-xs font-bold text-[#f95555] uppercase tracking-widest mb-1">{p.badge || p.category}</div>
        <div className="font-bold text-[#111111] text-sm mb-1 group-hover:text-[#f95555] transition-colors" style={{ fontFamily: "'Cabin', sans-serif" }}>{p.name}</div>
        <div className="text-xs text-gray-500 mb-3 line-clamp-2">{p.tagline}</div>
        <div className="flex items-center gap-1 text-xs font-semibold text-[#f95555]">
          View product <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────────────────────────
export default function ProductDetail() {
  const params = useParams<{ sku: string }>();
  const sku = params.sku?.toUpperCase();
  const product = sku ? PRODUCTS[sku] : null;

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center py-32">
        <div className="text-center">
          <div className="text-6xl font-extrabold text-[#f95555] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>404</div>
          <h1 className="text-2xl font-bold text-[#111111] mb-3">Product not found</h1>
          <p className="text-gray-500 mb-6">The SKU <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">{sku}</code> doesn't match any product in our catalogue.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
            <ArrowLeft size={15} /> Browse all products
          </Link>
        </div>
      </main>
    );
  }

  const calloutIcons = [Shield, Zap, Package, Wrench];
  const calloutFeatures = product.features.slice(0, 4);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#f95555] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#f95555] transition-colors">Products</Link>
            <span>/</span>
            <Link href={product.categoryPath} className="hover:text-[#f95555] transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-[#f95555] font-semibold">{product.sku}</span>
          </div>
        </div>
      </div>

      {/* HERO: Split layout */}
      <section className="bg-[#111111] min-h-[560px] flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 w-full py-12 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[560px]">
            {/* Left: product image */}
            <div className={`flex items-center justify-center py-12 lg:py-16 transition-all duration-700 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              {product.images?.[0] && (
                <div className="relative w-full max-w-[480px] aspect-square">
                  <div className="absolute inset-0 bg-white/5 rounded-3xl" />
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-8 relative z-10"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {product.images.slice(0, 6).map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#f95555]' : 'bg-white/30'}`} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Right: info */}
            <div className={`lg:pl-12 lg:border-l border-white/10 py-12 lg:py-16 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              {product.badge && (
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-[#f95555] text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  {product.badge}
                </span>
              )}
              <div className="text-[#f95555]/70 text-xs font-bold tracking-widest uppercase mb-3">{product.category}</div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
                {product.name}
              </h1>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">{product.tagline}</p>
              <div className="flex flex-col gap-2 mb-8">
                {product.features.slice(0, 3).map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={14} className="text-[#f95555] flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              {/* Signal blocking + RFID badges in hero */}
              {(product.sku.startsWith("GFSB") || product.sku.startsWith("GFSA")) && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["WiFi", "4G/5G", "Bluetooth", "NFC"].map((sig) => (
                    <span key={sig} className="inline-flex items-center gap-1 bg-white/10 text-white border border-white/20 text-xs font-bold px-2 py-1 rounded-full">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="1" y1="1" x2="23" y2="23"/>
                        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                        <line x1="12" y1="20" x2="12.01" y2="20"/>
                      </svg>
                      {sig} Blocked
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1 bg-[#8B73FF]/20 text-[#C4B8FF] border border-[#8B73FF]/30 text-xs font-bold px-2 py-1 rounded-full">
                    <RFIDIcon size={10} /> RFID Inside
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Link href={`/request-quote?sku=${product.sku}`}
                  className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e04444] transition-colors text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                >
                  Request a Quote <ArrowRight size={14} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors text-sm"
                >
                  Ask a question
                </Link>
              </div>
              <div className="mt-6 text-gray-600 text-xs font-mono">SKU: {product.sku}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CALLOUT STRIP */}
      <section className="bg-[#f95555] py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {calloutFeatures.map((feat, i) => {
              const Icon = calloutIcons[i];
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                  <p className="text-white text-xs leading-relaxed font-medium">{feat}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signal blocking + RFID + trust strip */}
      <div className="bg-[#0A0A0A] border-b border-white/5 py-5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Signal blocking pills */}
              {(product.sku.startsWith("GFSB") || product.sku.startsWith("GFSA")) && (
                <>
                  {["WiFi", "4G/5G", "Bluetooth", "NFC"].map((sig) => (
                    <span key={sig} className="inline-flex items-center gap-1.5 bg-[#EEE9FF]/10 text-[#C4B8FF] border border-[#8B73FF]/20 text-xs font-bold px-3 py-1 rounded-full">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="1" y1="1" x2="23" y2="23"/>
                        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                        <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
                        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                        <line x1="12" y1="20" x2="12.01" y2="20"/>
                      </svg>
                      {sig} Blocked
                    </span>
                  ))}
                  {/* RFID badge with SVG logo */}
                  <div className="flex items-center gap-2 bg-[#8B73FF]/10 border border-[#8B73FF]/20 rounded-full px-3 py-1.5">
                    <RFIDIcon size={14} className="text-[#8B73FF]" />
                    <span className="text-[#8B73FF] text-xs font-bold">RFID Chip Built In</span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-400 text-xs font-bold">Mission Darkness™ Technology</span>
              </div>
              <span className="text-gray-500 text-xs">🛡️ UK MOD &amp; Police approved</span>
              <span className="text-gray-500 text-xs">🔬 Lab-certified signal blocking</span>
            </div>
            <Link href="/app" className="inline-flex items-center gap-1.5 text-xs text-[#8B73FF] font-semibold hover:text-[#C4B8FF] transition-colors">
              <Radio size={12} />
              App + RFID = Full Compliance
            </Link>
          </div>
        </div>
      </div>

      {/* ABOUT + GALLERY */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-3">About this product</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111] mb-6 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Built for schools.<br />Designed to last.
              </h2>
              {product.description.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
              ))}
            </div>
            <div className="lg:sticky lg:top-8">
              <ImageGallery images={product.images} name={product.name} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 bg-[#F7F7F8]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-3">What sets it apart</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Key Features</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#f95555]/30 hover:shadow-md transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-[#f95555]/10 flex items-center justify-center mb-4">
                  <CheckCircle2 size={16} className="text-[#f95555]" />
                </div>
                <p className="text-sm text-[#111111] font-medium leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      {product.howToUse && product.howToUse.length > 0 && (
        <section className="py-20 bg-[#111111]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-3">Step by step</div>
              <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>How to Use</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.howToUse.map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-[80px] font-extrabold text-white/5 leading-none mb-2 select-none" style={{ fontFamily: "'Cabin', sans-serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="-mt-10 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#f95555] text-white text-sm font-bold flex items-center justify-center mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* APP ECOSYSTEM */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#8B73FF]/10 border border-[#8B73FF]/20 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#8B73FF] animate-pulse" />
                <span className="text-[#8B73FF] text-xs font-bold tracking-widest uppercase">Not just a product</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Part of a complete<br />technology ecosystem.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                The {product.name} works with the Generation Faraday app to give your school real-time compliance data. Every bag has a built-in RFID chip. Every scan is logged. Every report is ready to show Ofsted.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "RFID chip in every bag — unique serial number at manufacture",
                  "App scans bags at entry, logging who's in compliance",
                  "Live dashboard shows compliance in real time",
                  "Ofsted-ready reports with one click",
                  "No manual registers or spreadsheets required",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={14} className="text-[#8B73FF] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/app"
                  className="inline-flex items-center gap-2 bg-[#8B73FF] text-white font-bold px-5 py-2.5 rounded hover:bg-[#7B63EF] transition-colors text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                >
                  Explore the App <ArrowRight size={14} />
                </Link>
                <Link href="/bundles"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-5 py-2.5 rounded hover:bg-white/5 transition-colors text-sm"
                >
                  See full bundle <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/10">
              <div className="px-6 pt-5 pb-3 text-xs font-bold text-[#8B73FF] uppercase tracking-widest border-b border-white/5">The ecosystem at a glance</div>
              <div className="divide-y divide-white/5">
                {[
                  {
                    img: "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg",
                    label: "Faraday Bag",
                    desc: "RFID chip inside — blocks all signals",
                    colour: "border-[#f95555]",
                    badge: <RFIDIcon size={11} className="text-[#8B73FF]" />,
                  },
                  {
                    img: "https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium1.jpg",
                    label: "Unlocking Dock",
                    desc: "Fixed at school entrance — fast magnetic release",
                    colour: "border-amber-500",
                    badge: null,
                  },
                  {
                    img: "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock1.jpg",
                    label: "Hand-Held Unlock Doc",
                    desc: "One per class group — teacher carried",
                    colour: "border-[#8B73FF]",
                    badge: null,
                  },
                  {
                    img: "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key1.jpg",
                    label: "Unlocking Key + Lanyard",
                    desc: "Worn by form tutor — always to hand",
                    colour: "border-sky-500",
                    badge: null,
                  },
                  {
                    img: null,
                    label: "GF App",
                    desc: "Live dashboard, RFID scanning, Ofsted reports",
                    colour: "border-emerald-500",
                    badge: null,
                  },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-3 px-4 py-3 border-l-4 ${item.colour}`}>
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.img ? (
                        <img src={item.img} alt={item.label} className="w-full h-full object-contain p-1" />
                      ) : (
                        <span className="text-xl">📱</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <div className="text-white font-bold text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.label}</div>
                        {item.badge}
                      </div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS TABLE */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div>
              <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-3">Technical details</div>
              <h2 className="text-3xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>Specifications</h2>
              <p className="text-gray-500 text-sm leading-relaxed">Full technical specifications for the {product.name}. Contact us for custom configurations or bulk order requirements.</p>
              {product.dimensions && (
                <div className="mt-6 bg-[#F7F7F8] rounded-xl p-4 border border-gray-100">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dimensions</div>
                  <div className="text-sm text-[#111111] font-medium">{product.dimensions}</div>
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                {product.specs.map((s, i) => (
                  <div key={s.label} className={`flex items-start gap-6 px-6 py-4 ${i % 2 === 0 ? 'bg-[#F7F7F8]' : 'bg-white'}`}>
                    <dt className="w-40 flex-shrink-0 text-xs font-bold text-gray-400 uppercase tracking-widest pt-0.5">{s.label}</dt>
                    <dd className="text-sm text-[#111111] font-medium flex-1">{s.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCK SYSTEM — only for MAX LOCK */}
      {product.sku === "GFSB-MAX-LOCK" && (
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-14">
              <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-3">Complete Locking System</div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                The MAX LOCK ecosystem.
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The bag is only part of the system. The MAX LOCK mechanism requires a dedicated unlock station, hand-held dock, or teacher key to release — giving you full control over when phones can be accessed.
              </p>
            </div>

            {/* 3 accessories */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  name: "Unlocking Dock",
                  sku: "GFUD-DOCK",
                  desc: "Fixed station at school entrances and exits. One dock unlocks all locking bags in the class. Contact-based magnetic release — no batteries required.",
                  role: "Main entrance stations",
                  images: [
                    "https://generationfaraday.com/wp-content/uploads/2025/02/WechatIMG538.jpg",
                    "https://generationfaraday.com/wp-content/uploads/2025/02/WechatIMG535.jpg",
                    "https://generationfaraday.com/wp-content/uploads/2025/02/Faraday-14991.jpg",
                  ],
                },
                {
                  name: "Hand-Held Unlock Dock",
                  sku: "GFUD-HH-DOCK",
                  desc: "Portable version of the unlocking dock. Used by staff on duty in corridors, at assemblies, or for spot checks. Same magnetic release, no batteries.",
                  role: "Staff on duty / corridors",
                  images: [
                    "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock1.jpg",
                    "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock2.jpg",
                    "https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock3.jpg",
                  ],
                },
                {
                  name: "Unlocking Key + Lanyard",
                  sku: "GFUD-KEY",
                  desc: "Compact magnetic key worn on a lanyard by form tutors or class teachers. Always to hand — discreet and fast to use.",
                  role: "Class teachers / form tutors",
                  images: [
                    "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key1.jpg",
                    "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key8.jpg",
                    "https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key5.jpg",
                  ],
                },
              ].map((acc) => (
                <div key={acc.sku} className="bg-[#161616] rounded-2xl overflow-hidden border border-white/5 hover:border-[#f95555]/30 transition-colors">
                  <div className="h-48 bg-white flex items-center justify-center">
                    <img
                      src={acc.images[0]}
                      alt={acc.name}
                      className="h-full w-full object-contain p-4"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-[#f95555] text-xs font-bold uppercase tracking-widest mb-1">{acc.role}</div>
                    <h3 className="text-white font-extrabold text-lg mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{acc.name}</h3>
                    <div className="text-gray-500 text-xs font-mono mb-3">{acc.sku}</div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{acc.desc}</p>
                    <div className="flex gap-2">
                      {acc.images.slice(1).map((src, i) => (
                        <img key={i} src={src} alt="" className="w-12 h-12 rounded-lg object-contain bg-white border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ))}
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Link href={`/products/${acc.sku}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#f95555] px-4 py-2 rounded-lg hover:bg-[#e04444] transition-colors"
                      style={{ fontFamily: "'Cabin', sans-serif" }}
                    >
                      View Product <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Lock mechanism detail */}
            <div className="bg-[#111111] rounded-2xl p-8 border border-white/10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">How the lock works</div>
                <h3 className="text-2xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  The MAX LOCK mechanism.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  The MAX LOCK uses a proprietary magnetic locking system. When engaged, it cannot be opened without the specific magnetic release from a Generation Faraday dock or key — off-the-shelf magnets do not work.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Full-metal construction — no plastic parts to fail",
                    "Cannot be defeated with off-the-shelf magnets",
                    "Tamper-evident — visible if forced",
                    "No batteries or charging required in the lock itself",
                    "Rated for 5–10 open/close cycles per day",
                    "Proprietary magnetic field geometry — unique to GF",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <Shield size={13} className="text-amber-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3 text-center">Lock release process</div>
                <div className="flex flex-col gap-2">
                  {[
                    { step: "1", text: "Student presents closed, locked bag at end of class or day" },
                    { step: "2", text: "Teacher touches unlock dock or key to the MAX LOCK mechanism" },
                    { step: "3", text: "Magnetic field releases the lock — takes under 1 second" },
                    { step: "4", text: "Student opens bag and retrieves phone" },
                    { step: "5", text: "Bag re-sealed with phone inside for next session" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-extrabold flex items-center justify-center flex-shrink-0" style={{ fontFamily: "'Cabin', sans-serif" }}>{s.step}</div>
                      <div className="text-gray-300 text-sm">{s.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/bundles"
                className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e04444] transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                See the complete bundle for your school <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* COMPATIBILITY */}
      {product.compatibility && (
        <section className="py-16 bg-[#f95555]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div>
                <div className="text-white/70 text-xs font-bold tracking-widest uppercase mb-3">Works with</div>
                <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>Compatibility</h2>
              </div>
              <div className="lg:col-span-2">
                <p className="text-red-100 text-base leading-relaxed">{product.compatibility}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">Ready to get started?</div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Get UK pricing for {product.name}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Volume-based pricing available. Includes delivery, setup support, and dedicated account management.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/request-quote?sku=${product.sku}`}
              className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#e04444] transition-colors"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {product.relatedSkus.length > 0 && (
        <section className="py-16 bg-[#F7F7F8]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-2">Complete your setup</div>
                <h2 className="text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Related Products</h2>
              </div>
              <Link href="/products" className="text-sm font-semibold text-[#f95555] flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {product.relatedSkus.map((s) => <RelatedCard key={s} sku={s} />)}
            </div>
          </div>
        </section>
      )}

      {/* Back to products */}
      <div className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-[1400px] mx-auto px-6">
          <Link href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#f95555] hover:gap-3 transition-all duration-200"
            style={{ fontFamily: "'Cabin', sans-serif" }}
          >
            <ArrowLeft size={14} /> Back to all products
          </Link>
        </div>
      </div>
    </main>
  );
}
