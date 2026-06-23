/* =============================================================
   Products Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, CheckCircle2, Shield, BarChart3, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import RFIDIcon from "../components/RFIDIcon";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP";

const BAGS_IMG       = `${CDN}/bags-category_eade1bd7.png`;
const ORGANIZERS_IMG = `${CDN}/organizers-category_e20efc46.png`;
const LOCKING_IMG    = `${CDN}/locking-category_9d25da38.png`;
const FANNED_IMG     = `${CDN}/fanned-bags_2d3f8a28.webp`;
const CUSTOMIZE_IMG  = `${CDN}/customize_6de914a1.png`;

function useFadeUp(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const CATEGORIES = [
  {
    id: "bags",
    navLabel: "Faraday Bags",
    icon: Shield,
    tag: "Most Popular",
    tagColour: "bg-[#f95555] text-white",
    title: "Faraday Signal-Blocking Bags",
    subtitle: "The core of the Generation Faraday system",
    img: BAGS_IMG,
    heroImg: FANNED_IMG,
    desc: "Our flagship signal-blocking pouches are the foundation of every phone-free school programme. Built with a reinforced Faraday liner and welded waterproof TPU exterior, they block 100% of wireless signals - WiFi, 4G/5G, and Bluetooth - every time.",
    features: [
      "Blocks all wireless signals - WiFi, 4G/5G, Bluetooth, NFC",
      "Reinforced Faraday liner tested to 3,000-4,000 open/close cycles",
      "Welded waterproof TPU exterior - spill and humidity resistant",
      "Full-metal tamper-resistant lock - no thin pins to bend or fail",
      "Fits all phone models including large-screen devices",
      "Serialised with unique ID for RFID tracking via the app",
      "Customisable colours and school branding available",
      "Students take bag home - supports healthy habits beyond school",
    ],
    products: [
      {
        name: "School Bag MAX LOCK",
        sku: "GFSB-MAX-LOCK",
        badge: "Top Seller",
        desc: "The flagship school bag with magnetic MAX LOCK mechanism for maximum enforcement. The most complete signal-blocking solution available for schools.",
        specs: ["SKU: GFSB-MAX-LOCK", "Signal blocking: WiFi, 4G/5G, Bluetooth, NFC", "Lock type: Magnetic MAX LOCK", "Fits: All phone models up to 7\""],
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
      {
        name: "School Bag MAX",
        sku: "GFSB-MAX",
        badge: "Premium",
        desc: "Premium signal-blocking school bag, the MAX model for full-day device management.",
        specs: ["SKU: GFSB-MAX", "Signal blocking: WiFi, 4G/5G, Bluetooth, NFC", "Closure: Secure magnetic snap", "Fits: All phone models up to 7\""],
        images: [
          "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F2.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16253-e1744825663893.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16233-e1744825856630.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayWhite-16185-e1744825896209.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11773-1.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11821.jpg",
        ],
      },
      {
        name: "School Bag MAX Magnetic",
        sku: "GFSB-MAX-M",
        badge: "Popular",
        desc: "MAX school bag with magnetic closure for fast, teacher-controlled access.",
        specs: ["SKU: GFSB-MAX-M", "Signal blocking: WiFi, 4G/5G, Bluetooth, NFC", "Closure: Magnetic", "Fits: All phone models up to 7\""],
        images: [
          "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F2.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC09779-2.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC01721-2.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-12109.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/01/FaradayBag-11712.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg",
        ],
      },
      {
        name: "School Bag PRO Magnetic",
        sku: "GFSB-PRO-M",
        badge: "Best Value",
        desc: "PRO-grade signal-blocking bag with magnetic closure system. Reliable performance at an accessible price point.",
        specs: ["SKU: GFSB-PRO-M", "Signal blocking: WiFi, 4G/5G, Bluetooth, NFC", "Closure: Magnetic", "Fits: All phone models up to 6.7\""],
        images: [
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02049.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02101.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02098.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02004.jpg",
        ],
      },
      {
        name: "School Bag PRO",
        sku: "GFSB-PRO",
        badge: "Entry Level",
        desc: "Professional-grade Faraday school bag for reliable signal blocking. Ideal for schools starting their phone-free journey.",
        specs: ["SKU: GFSB-PRO", "Signal blocking: WiFi, 4G/5G, Bluetooth, NFC", "Closure: Velcro", "Fits: All phone models up to 6.7\""],
        images: [
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02053-1.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02067-1.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC09779-2.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC01721-2.jpg",
        ],
      },
    ],
  },
  {
    id: "organisers",
    navLabel: "Organisers",
    icon: BarChart3,
    tag: "Classroom Solution",
    tagColour: "bg-emerald-600 text-white",
    title: "Organisers & Storage Solutions",
    subtitle: "Centralised, signal-blocked device management",
    img: ORGANIZERS_IMG,
    heroImg: ORGANIZERS_IMG,
    desc: "For schools that prefer centralised collection, our shielded organisers and storage units keep every device signal-blocked, numbered, and accounted for - without requiring individual bags for each student.",
    features: [
      "Shielded interior blocks all wireless signals",
      "Numbered slots for easy student assignment",
      "Wall-mountable or freestanding options",
      "Fits 20-30 devices per unit",
      "Durable powder-coated steel construction",
      "Compatible with the Generation Faraday app for tracking",
      "Ideal for whole-classroom or whole-year-group rollout",
    ],
    products: [
      {
        name: "Phone Hotel",
        sku: "GFSA-PH",
        badge: "Classroom Favourite",
        desc: "Classroom phone hotel with numbered slots and full Faraday shielding. Each student's device gets its own slot, organised, shielded, and identifiable.",
        specs: ["SKU: GFSA-PH", "Capacity: 30 slots", "Signal blocking: Full Faraday shielded", "Mounting: Wall or desk"],
        images: [
          "https://generationfaraday.com/wp-content/uploads/2025/01/GFSB-HOTEL-Hero2.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/01/GFSB-HOTEL-Hero4.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/01/FaradayBag-11941.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11956.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/FaradayBag-11949.jpg",
        ],
      },

      {
        name: "Class Phone Organizer",
        sku: "GFSA-ORG",
        badge: "Whole-Class Solution",
        desc: "Class-wide phone organiser for structured, signal-blocked storage. Keeps every device accounted for throughout the school day.",
        specs: ["SKU: GFSA-ORG", "Signal blocking: Full Faraday shielded", "Numbered slots: Yes", "Suitable for: Full class sets"],
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

    ],
  },
  {
    id: "locking",
    navLabel: "Locking",
    icon: Zap,
    tag: "High Security",
    tagColour: "bg-amber-600 text-white",
    title: "Locking & Security Accessories",
    subtitle: "For schools requiring maximum enforcement",
    img: LOCKING_IMG,
    heroImg: LOCKING_IMG,
    desc: "When schools need a higher level of enforcement and accountability, our locking accessories provide the additional security layer - while maintaining the signal-blocking performance of the core system.",
    features: [
      "Magnetic unlock dock for teacher-controlled release",
      "Compatible with all Generation Faraday bag models",
      "Tamper-evident design - visible if opened without authorisation",
      "Durable enough for 5-10 open/close cycles per day",
      "No batteries or charging required",
      "Works seamlessly with the GF app for compliance tracking",
    ],
    products: [
      {
        name: "Unlocking Dock",
        sku: "GFUD-DOCK",
        badge: "Essential Accessory",
        desc: "Teacher-controlled magnetic unlocking dock compatible with all GF locking bags. One dock unlocks all bags in the classroom.",
        specs: ["SKU: GFUD-DOCK", "Compatibility: All GF locking bags", "Power: No batteries required", "Unlock: Contact-based magnetic"],
        images: [
          "https://generationfaraday.com/wp-content/uploads/2025/02/WechatIMG538.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/WechatIMG535.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/Faraday-14991.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/Faraday-15004.jpg",
        ],
      },
      {
        name: "Hand-Held Unlock Dock",
        sku: "GFUD-HH-DOCK",
        badge: "Mobile Option",
        desc: "Portable hand-held version of the GF unlocking dock. Ideal for corridor or assembly-point unlocking.",
        specs: ["SKU: GFUD-HH-DOCK", "Compatibility: All GF locking bags", "Form factor: Hand-held", "Power: No batteries required"],
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
      {
        name: "Unlocking Key + Lanyard",
        sku: "GFUD-KEY",
        badge: "Teacher Wear",
        desc: "Magnetic unlocking key with lanyard for teacher-worn access control. Discreet and always to hand.",
        specs: ["SKU: GFUD-KEY", "Includes: Lanyard", "Lock type: Magnetic", "Wear: Teacher lanyard"],
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
      {
        name: "Dock 2-Way Stand",
        sku: "GFUD-STAND-2WAY",
        badge: "Dock Accessory",
        desc: "2-way stand accessory for the Generation Faraday Unlocking Dock. Stable desk or counter mounting.",
        specs: ["SKU: GFUD-STAND-2WAY", "Compatible with: GFUD-DOCK", "Orientation: 2-way", "Mounting: Desk or counter"],
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
      {
        name: "Dock 4-Way Stand",
        sku: "GFUD-STAND-4WAY",
        badge: "Dock Accessory",
        desc: "4-way stand accessory for the Generation Faraday Unlocking Dock. Maximum flexibility for high-traffic entry points.",
        specs: ["SKU: GFUD-STAND-4WAY", "Compatible with: GFUD-DOCK", "Orientation: 4-way", "Mounting: Desk or counter"],
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
      {
        name: "Unlock Dock Tamperproof Cover",
        sku: "GFUD-COVER",
        badge: "Security Add-On",
        desc: "Tamperproof cover for the GF Unlocking Dock to prevent unauthorised access. Visible if tampered with.",
        specs: ["SKU: GFUD-COVER", "Compatible with: GFUD-DOCK", "Tamper-evident: Yes", "Material: Durable polymer"],
        images: [
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04873.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04876.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04878.jpg",
          "https://generationfaraday.com/wp-content/uploads/2025/02/DSC04901.jpg",
        ],
      },
    ],
  },
];

// ── Product image carousel for listing cards ─────────────────────────────────
function ProductImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0);

  const prev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  }, [images.length]);

  return (
    <div className="relative w-full bg-white border-b border-gray-100 group" style={{ aspectRatio: "4/3" }}>
      <img
        src={images[idx]}
        alt={`${name} - photo ${idx + 1} of ${images.length}`}
        className="w-full h-full object-contain p-4"
        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
      />
      {images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={14} className="text-[#111111]" />
          </button>
          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 shadow border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={14} className="text-[#111111]" />
          </button>
          {/* Dot indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === idx ? 'bg-[#f95555] w-3' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
          {/* Counter */}
          <div className="absolute top-2 right-2 bg-black/40 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {idx + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}

export default function Products() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const catsSection = useFadeUp(0.05);
  const customiseSection = useFadeUp();

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Our Products</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Signal blocking is<br /><span className="text-[#8B73FF]">just the beginning.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              From individual student bags to classroom organisers, locking accessories, and event solutions - a complete ecosystem for phone-free environments, designed to fit any school's needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Signal blocking band */}
      <div className="bg-[#0A0A0A] border-b border-white/5 py-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Every bag blocks:</span>
            {["WiFi", "4G / 5G", "Bluetooth", "NFC"].map((sig) => (
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
            <span className="inline-flex items-center gap-1.5 bg-amber-400/10 text-amber-300 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full">
              <RFIDIcon size={11} /> RFID in every bag
            </span>
            <span className="text-gray-600 text-xs">100% guaranteed — Faraday-certified shielding</span>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex-shrink-0 px-5 py-4 text-sm font-semibold text-gray-500 hover:text-[#f95555] border-b-2 border-transparent hover:border-[#f95555] transition-all duration-200 whitespace-nowrap"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                {cat.navLabel}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Product categories */}
      <div ref={catsSection.ref}>
        {CATEGORIES.map((cat, catIdx) => (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-20 ${catIdx % 2 === 0 ? "bg-white" : "bg-[#F7F7F8]"}`}
          >
            <div className="container">
              {/* Category header */}
              <div className={`mb-12 transition-all duration-500 ${catsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${catIdx * 50}ms` }}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${cat.tagColour}`} style={{ fontFamily: "'Cabin', sans-serif" }}>
                    {cat.tag}
                  </span>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
                      {cat.title}
                    </h2>
                    <p className="text-[#f95555] font-semibold text-sm mb-4">{cat.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">{cat.desc}</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {cat.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="text-[#f95555] flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative">
                    <img
                      src={cat.heroImg}
                      alt={cat.title}
                      className="w-full rounded-2xl object-contain bg-white p-4"
                      style={{ maxHeight: "380px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Individual products */}
              <div className="grid md:grid-cols-2 gap-6">
                {cat.products.map((product, pIdx) => (
                  <div
                    key={product.name}
                    className={`bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#f95555]/30 hover:shadow-lg transition-all duration-300 ${catsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${catIdx * 50 + pIdx * 80 + 200}ms` }}
                  >
                    {(product as any).images?.length > 0 && (
                      <ProductImageCarousel images={(product as any).images} name={product.name} />
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-xs font-bold text-[#f95555] uppercase tracking-widest mb-1">{product.badge}</div>
                          <h3 className="text-lg font-bold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>{product.name}</h3>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">{product.sku}</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                          <cat.icon size={18} className="text-[#f95555]" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{product.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {["WiFi", "4G/5G", "Bluetooth", "NFC"].map((sig) => (
                          <span key={sig} className="flex items-center gap-1 text-xs bg-[#EEE9FF] text-[#7B5EA7] px-2 py-0.5 rounded-full font-bold tracking-wide">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                            {sig} Blocked
                          </span>
                        ))}
                        {cat.id === "bags" && (
                          <span className="flex items-center gap-1 text-xs bg-[#8B73FF]/10 text-[#8B73FF] border border-[#8B73FF]/20 px-2 py-0.5 rounded-full font-bold">
                            <RFIDIcon size={9} /> RFID Inside
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="px-6 pb-6 flex items-center gap-4">
                      <Link href={`/products/${product.sku}`}
                        className="inline-flex items-center gap-2 text-base font-bold text-white bg-[#f95555] px-4 py-2 rounded-lg hover:bg-[#e04444] transition-all duration-200"
                        style={{ fontFamily: "'Cabin', sans-serif" }}
                      >
                        View Product <ArrowRight size={15} />
                      </Link>
                      <Link href="/request-quote"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#f95555] transition-colors"
                        style={{ fontFamily: "'Cabin', sans-serif" }}
                      >
                        Request Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── VENUE & EVENT SOLUTIONS ─────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Beyond the Classroom</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Signal-Blocking<br />Collection Solutions
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Generation Faraday's technology extends far beyond the classroom. Purpose-built hardware for schools, universities, exam centres, testing bodies, corporate boardrooms, and any environment that demands zero wireless activity.
            </p>
          </div>

          {/* Drop Box, full-width hero card */}
          <div className="rounded-3xl overflow-hidden border border-white/5 mb-6 grid lg:grid-cols-2 min-h-[480px]">
            {/* Image side */}
            <div className="relative bg-[#161616] flex flex-col items-center justify-center p-8 lg:p-12 gap-4">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
              <div className="relative z-10 w-full max-w-[380px]">
                <img
                  src="https://generationfaraday.com/wp-content/uploads/2025/02/DSC03051.jpg"
                  alt="Portable Phone Drop Box"
                  className="w-full h-auto object-contain rounded-xl"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="relative z-10 flex gap-2 overflow-x-auto pb-1 w-full max-w-[380px]">
                {[
                  "https://generationfaraday.com/wp-content/uploads/2025/02/DSC03054.jpg",
                  "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02953.jpg",
                  "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02975.jpg",
                  "https://generationfaraday.com/wp-content/uploads/2025/02/DSC02979.jpg",
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-16 h-16 object-contain rounded-lg bg-[#1e1e1e] flex-shrink-0 border border-white/10" />
                ))}
              </div>
            </div>
            {/* Content side */}
            <div className="bg-[#111111] p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-5 w-fit">
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Schools, Exams &amp; Beyond</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Portable Phone Drop Box</h3>
              <div className="text-xs text-gray-500 font-mono mb-5">GFSA-DB</div>
              <p className="text-gray-300 leading-relaxed mb-6">
                A portable, fully shielded Faraday drop box for high-throughput device collection. Staff hand each person a numbered bag, the device goes in, and the bag drops into the shielded box — zero signal from the moment it's sealed. Ideal for schools, universities, exam centres, and any controlled environment.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Schools & academies",
                  "Universities & colleges",
                  "Exam halls & test centres",
                  "Corporate boardrooms",
                  "Government & secure facilities",
                  "High-security environments",
                ].map((use) => (
                  <div key={use} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 size={12} className="text-amber-400 flex-shrink-0" />
                    {use}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/products/GFSA-DB"
                  className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold px-5 py-2.5 rounded-lg hover:bg-amber-400 transition-colors text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                >
                  View Product <ArrowRight size={14} />
                </Link>
                <Link href="/request-quote?sku=GFSA-DB"
                  className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-5 py-2.5 rounded-lg hover:border-white/30 hover:bg-white/5 transition-colors text-sm"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Shielded Box, full-width hero card (reversed) */}
          <div className="rounded-3xl overflow-hidden border border-white/5 grid lg:grid-cols-2 min-h-[480px]">
            {/* Content side */}
            <div className="bg-[#111111] p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-[#f95555]/10 border border-[#f95555]/20 rounded-full px-3 py-1 mb-5 w-fit">
                <span className="text-[#f95555] text-xs font-bold tracking-widest uppercase">Centralised Collection</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Shielded Box</h3>
              <div className="text-xs text-gray-500 font-mono mb-5">GFSA-SB</div>
              <p className="text-gray-300 leading-relaxed mb-6">
                A compact, fully shielded Faraday storage box for centralised device collection in schools, universities, and secure facilities. Drop devices in, close the lid, and every device is completely cut off — WiFi, 4G/5G, Bluetooth, and NFC all blocked instantly.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Holds up to 20 devices",
                  "Full Faraday shielding",
                  "Portable, carry handle included",
                  "Numbered slot system",
                  "Exam halls & test centres",
                  "Secure meeting rooms",
                ].map((use) => (
                  <div key={use} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 size={12} className="text-[#f95555] flex-shrink-0" />
                    {use}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/products/GFSA-SB"
                  className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-5 py-2.5 rounded-lg hover:bg-[#e04444] transition-colors text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                >
                  View Product <ArrowRight size={14} />
                </Link>
                <Link href="/request-quote?sku=GFSA-SB"
                  className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-5 py-2.5 rounded-lg hover:border-white/30 hover:bg-white/5 transition-colors text-sm"
                >
                  Request Quote
                </Link>
              </div>
            </div>
            {/* Image side */}
            <div className="relative bg-[#161616] flex flex-col items-center justify-center p-8 lg:p-12 gap-4 order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#f95555]/5 to-transparent" />
              <div className="relative z-10 w-full max-w-[380px]">
                <img
                  src="https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box1.jpg"
                  alt="Shielded Box"
                  className="w-full h-auto object-contain rounded-xl"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="relative z-10 flex gap-2 overflow-x-auto pb-1 w-full max-w-[380px]">
                {[
                  "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box2.jpg",
                  "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box3.jpg",
                  "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box4.jpg",
                  "https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Shielded-Box5.jpg",
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-16 h-16 object-contain rounded-lg bg-[#1e1e1e] flex-shrink-0 border border-white/10" />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">Need a custom solution for your organisation? We work with schools, universities, exam bodies, and government facilities across the UK.</p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-white/15 text-white font-semibold px-6 py-3 rounded-lg hover:border-white/30 hover:bg-white/5 transition-colors text-sm"
            >
              Talk to our team <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Customise section */}
      <section className="bg-[#111111] overflow-hidden" ref={customiseSection.ref}>
        <div className="container">
          <div
            className={`grid lg:grid-cols-2 gap-16 transition-all duration-600 ${customiseSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ minHeight: "420px" }}
          >
            {/* Text side */}
            <div className="py-20 flex flex-col justify-center">
              <div className="section-label text-[#C4B8FF] mb-4">Custom Branding</div>
              <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Make it yours.<br /><span className="text-[#8B73FF]">Your school, your colours.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Choose from a wide range of fabric colours and finishes to match your school's identity. Add your school crest, name, or custom text. Every bag is built with the same signal-blocking technology trusted by schools and law enforcement worldwide - just with your branding on it.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "12+ fabric colour options",
                  "Custom embroidery or print available",
                  "School crest and logo application",
                  "Minimum order quantities apply - contact us for details",
                  "Free samples available before bulk order",
                  "Typical lead time: 3-4 weeks",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 size={15} className="text-[#8B73FF] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/request-quote"
                className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-6 py-3 rounded hover:bg-red-50 transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                Request Custom Quote <ArrowRight size={15} />
              </Link>
            </div>
            {/* Image side - bags peek over the bottom edge */}
            <div className="flex items-end justify-center pt-10">
              <img
                src={CUSTOMIZE_IMG}
                alt="Customisable Generation Faraday bags"
                className="object-contain object-bottom drop-shadow-2xl"
                style={{ height: "130%", maxHeight: "520px", width: "auto", maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F7F7F8]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Not sure which product is right for your school?
          </h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Our UK team will assess your school's size, policy goals, and budget - and recommend the right solution. No pressure, no obligation.
          </p>
          <Link href="/request-quote"
            className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm"
            style={{ fontFamily: "'Cabin', sans-serif" }}
          >
            Speak to a UK Specialist <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
