/* =============================================================
   Compare Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   UK-only comparison: GF vs Yondr vs Phonelocker
   Layout: Score summary → clean comparison table → failure modes → FAQ → CTA
   ============================================================= */
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, X, Minus, ShieldOff, Wrench, Droplets, Radio, ChevronDown, Lock, Unlock, ShieldCheck, Waves, Timer, Smartphone, AlertTriangle, Layers, BarChart3, Scan, FileBarChart, Bell } from "lucide-react";
import { Link } from "wouter";

function useFadeUp(threshold = 0.1) {
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

type CellValue = "yes" | "no" | "partial";

interface CompRow {
  category: string;
  feature: string;
  gf: CellValue;
  yondr: CellValue;
  phonelocker: CellValue;
  note?: string;
}

const ROWS: CompRow[] = [
  // Signal Blocking
  {
    category: "Signal Blocking",
    feature: "Blocks WiFi, 4G/5G, Bluetooth & NFC",
    gf: "yes", yondr: "no", phonelocker: "partial",
    note: "Based on publicly available specifications: Yondr does not list a Faraday liner as a product feature. Phonelocker lists signal blocking as an optional add-on, not included as standard."
  },
  {
    category: "Signal Blocking",
    feature: "Signal blocking included as standard",
    gf: "yes", yondr: "no", phonelocker: "no",
    note: "Based on publicly available product listings at time of review."
  },
  {
    category: "Signal Blocking",
    feature: "Independently verified signal attenuation",
    gf: "yes", yondr: "no", phonelocker: "no",
  },
  // Build Quality
  {
    category: "Build Quality",
    feature: "Waterproof welded TPU seams",
    gf: "yes", yondr: "no", phonelocker: "no",
    note: "Based on publicly available product specifications. Stitched seams may allow moisture ingress over time compared to welded seams."
  },
  {
    category: "Build Quality",
    feature: "Tested to 3,000-4,000 open/close cycles",
    gf: "yes", yondr: "no", phonelocker: "no",
    note: "Based on publicly available warranty and testing information at time of review."
  },
  {
    category: "Build Quality",
    feature: "Expected service life of 4+ years",
    gf: "yes", yondr: "no", phonelocker: "no",
  },
  {
    category: "Build Quality",
    feature: "Secure tamper-resistant lock closure",
    gf: "yes", yondr: "yes", phonelocker: "yes",
  },
  // Management & Compliance
  {
    category: "Management",
    feature: "RFID serialisation per bag",
    gf: "yes", yondr: "no", phonelocker: "no",
    note: "Each GF bag has a unique RFID tag, enabling per-student assignment and full audit trails."
  },
  {
    category: "Management",
    feature: "Companion app for compliance tracking",
    gf: "yes", yondr: "no", phonelocker: "no",
  },
  {
    category: "Management",
    feature: "Students take bag home",
    gf: "yes", yondr: "no", phonelocker: "partial",
  },
  // School Fit
  {
    category: "School Fit",
    feature: "Custom colours & school branding",
    gf: "yes", yondr: "no", phonelocker: "yes",
  },
  {
    category: "School Fit",
    feature: "UK-based support & implementation team",
    gf: "yes", yondr: "no", phonelocker: "yes",
  },
  {
    category: "School Fit",
    feature: "Faraday technology used by law enforcement & military",
    gf: "yes", yondr: "no", phonelocker: "no",
  },
];

// Score: count "yes" per column
const GF_SCORE    = ROWS.filter(r => r.gf === "yes").length;
const YONDR_SCORE = ROWS.filter(r => r.yondr === "yes").length;
const PL_SCORE    = ROWS.filter(r => r.phonelocker === "yes").length;

const CATEGORIES = ["Signal Blocking", "Build Quality", "Management", "School Fit"];

const KEY_CONSIDERATIONS = [
  {
    icon: ShieldOff,
    title: "Signal Blocking",
    desc: "Not all phone pouches block wireless signals. A pouch without a Faraday liner secures the phone physically but may still allow notifications, calls, and data to come through. Generation Faraday bags block WiFi, 4G/5G, Bluetooth, and NFC as standard."
  },
  {
    icon: Wrench,
    title: "Lock Durability",
    desc: "Lock mechanisms in phone pouches are subject to heavy daily use in school environments. Generation Faraday's full-metal tamper-resistant lock is tested to 3,000–4,000 open/close cycles to ensure long-term reliability."
  },
  {
    icon: Droplets,
    title: "Moisture Resistance",
    desc: "School environments involve spills, rain, and humidity. Stitched seams may allow moisture ingress over time, which can affect internal liners. Generation Faraday uses welded waterproof TPU seams to protect the Faraday liner."
  },
  {
    icon: Radio,
    title: "Long-Term Signal Performance",
    desc: "Daily wear and tear can reduce signal-blocking effectiveness over time if the liner is not adequately protected. Generation Faraday's reinforced liner is independently tested to maintain full blocking across its rated service life."
  },
];

const FAQS = [
  {
    q: "Does Generation Faraday actually block all wireless signals?",
    a: "Yes. Every Generation Faraday bag contains a military-grade Faraday liner that blocks WiFi, 4G/5G, Bluetooth, and NFC simultaneously. Signal blocking is standard across all products, not an optional extra. Schools can verify this independently with a simple signal test on delivery."
  },
  {
    q: "What happens in an emergency? Can students access their phones immediately?",
    a: "Yes. Generation Faraday bags open instantly with no tools, no unlock station, and no teacher intervention required. Students simply open their bag. This is by design: the bag provides signal-blocking during lessons while ensuring unrestricted access whenever it is genuinely needed."
  },
  {
    q: "Why does waterproofing matter for a phone pouch?",
    a: "School environments are demanding. Bags are dropped, spilled on, and used in all weather. Generation Faraday uses a welded TPU exterior rather than stitched seams, which prevents moisture from degrading the Faraday liner over time and ensures consistent signal-blocking performance throughout the product's lifespan."
  },
  {
    q: "How long do Generation Faraday bags last?",
    a: "Generation Faraday bags are independently tested to 3,000–4,000 open/close cycles. In a typical school environment with 5–10 uses per day, that equates to years of reliable use. The welded construction and military-grade liner are built to withstand the rigours of daily school life."
  },
  {
    q: "What does RFID serialisation add?",
    a: "Serialised bags allow schools to assign each bag to a specific student, track compliance over time, and quickly identify lost or damaged bags. The Generation Faraday App transforms the physical product into a fully managed compliance system, giving leadership teams real-time visibility without adding administrative burden."
  },
  {
    q: "Can students take the bags home?",
    a: "Yes, and this is one of the most valued features among schools. Students taking bags home extends the benefits of reduced screen time beyond the school day, supporting healthier habits at home. Many schools report that parents actively welcome this aspect of the programme."
  },
];

function Cell({ value }: { value: CellValue }) {
  if (value === "yes") return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
        <CheckCircle2 size={16} className="text-emerald-500" />
      </div>
    </div>
  );
  if (value === "no") return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
        <X size={14} className="text-red-400" />
      </div>
    </div>
  );
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center">
        <Minus size={14} className="text-amber-400" />
      </div>
    </div>
  );
}

function NoteTooltip({ note }: { note: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block ml-1.5">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(o => !o)}
        className="w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-[10px] font-bold flex items-center justify-center hover:bg-gray-300 transition-colors"
        aria-label="More info"
      >i</button>
      {open && (
        <div className="absolute left-0 bottom-6 z-20 w-72 bg-[#111] text-gray-200 text-xs leading-relaxed rounded-xl p-3 shadow-xl border border-white/10">
          {note}
        </div>
      )}
    </div>
  );
}

export default function Compare() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const tableSection = useFadeUp(0.05);
  const failureSection = useFadeUp(0.05);
  const faqSection = useFadeUp(0.05);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#111111] py-20 lg:py-28">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 bg-[#f95555]/15 border border-[#f95555]/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f95555]" />
              <span className="text-[#f95555] text-xs font-bold tracking-widest uppercase">How We Compare</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Compare the features<br />that matter most.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-8">
              Signal blocking, build quality, compliance management, and long-term value. See how Generation Faraday compares on the features UK schools ask about most.
            </p>

            {/* Score cards */}
            <p className="text-xs text-gray-500 mb-3">Feature count based on the criteria listed in the comparison table below, sourced from publicly available specifications.</p>
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              {[
                { label: "Generation Faraday", score: GF_SCORE, total: ROWS.length, highlight: true },
                { label: "Yondr", score: YONDR_SCORE, total: ROWS.length, highlight: false },
                { label: "Phonelocker", score: PL_SCORE, total: ROWS.length, highlight: false },
              ].map((s) => (
                <div key={s.label} className={`rounded-2xl p-4 text-center border ${s.highlight ? "bg-[#f95555] border-[#f95555]" : "bg-white/5 border-white/10"}`}>
                  <div className={`text-3xl font-extrabold mb-1 ${s.highlight ? "text-white" : "text-white"}`} style={{ fontFamily: "'Cabin', sans-serif" }}>
                    {s.score}<span className={`text-base font-normal ${s.highlight ? "text-red-100" : "text-gray-500"}`}>/{s.total}</span>
                  </div>
                  <div className={`text-xs font-semibold ${s.highlight ? "text-red-100" : "text-gray-400"}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20" ref={tableSection.ref}>
        <div className="container">
          <div className={`transition-all duration-500 ${tableSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

            <p className="text-xs text-gray-600 mb-4">Based on publicly available product specifications and marketing materials as of March 2026. We encourage schools to verify all claims independently.</p>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-5 mb-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" /> Included as standard</div>
              <div className="flex items-center gap-1.5"><X size={13} className="text-red-400" /> Not available</div>
              <div className="flex items-center gap-1.5"><Minus size={13} className="text-amber-400" /> Partial / optional add-on</div>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Sticky column headers */}
              <div className="grid grid-cols-[1fr_140px_140px_140px] bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <div className="p-4 lg:p-5" />
                {[
                  { label: "Generation Faraday", sub: "MAX LOCK", highlight: true },
                  { label: "Yondr", sub: "Phone Pouch", highlight: false },
                  { label: "Phonelocker", sub: "Lockable Pouch", highlight: false },
                ].map((col) => (
                  <div key={col.label} className={`p-4 lg:p-5 text-center ${col.highlight ? "bg-[#f95555]" : "bg-[#F7F7F8]"}`}>
                    <div className={`text-sm font-extrabold leading-tight ${col.highlight ? "text-white" : "text-[#111111]"}`} style={{ fontFamily: "'Cabin', sans-serif" }}>{col.label}</div>
                    <div className={`text-[11px] mt-0.5 ${col.highlight ? "text-red-100" : "text-gray-400"}`}>{col.sub}</div>
                  </div>
                ))}
              </div>

              {/* Rows grouped by category */}
              {CATEGORIES.map((cat) => {
                const catRows = ROWS.filter(r => r.category === cat);
                return (
                  <React.Fragment key={cat}>
                    {/* Category header row */}
                    <div className="grid grid-cols-[1fr_140px_140px_140px] bg-gray-50 border-b border-gray-100">
                      <div className="px-4 lg:px-5 py-2.5 col-span-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{cat}</span>
                      </div>
                    </div>
                    {/* Feature rows */}
                    {catRows.map((row, i) => (
                      <div
                        key={row.feature}
                        className={`grid grid-cols-[1fr_140px_140px_140px] border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"} hover:bg-blue-50/20 transition-colors`}
                      >
                        <div className="px-4 lg:px-5 py-4 flex items-center gap-1">
                          <span className="text-sm text-[#111111] font-medium leading-snug">{row.feature}</span>
                          {row.note && <NoteTooltip note={row.note} />}
                        </div>
                        {(["gf", "yondr", "phonelocker"] as const).map((key, ci) => (
                          <div key={key} className={`px-4 lg:px-5 py-4 flex items-center justify-center ${ci === 0 ? "bg-[#f95555]/5" : ""}`}>
                            <Cell value={row[key]} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING DEEP DIVE ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f95555]/10 border border-[#f95555]/20 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#f95555] text-xs font-bold tracking-widest uppercase">Engineering Deep Dive</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
              The details that make<br />the difference.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A closer look at the engineering decisions behind Generation Faraday, and why they matter in a real school environment.
            </p>
          </div>

          {/* ── 1. CLOSURE MECHANISM ─────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#f95555] flex items-center justify-center">
                <Lock size={18} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Closure &amp; Lock Mechanism</h3>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* GF Side */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-[#f95555] px-6 py-4">
                  <div className="text-white font-extrabold text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>Generation Faraday</div>
                  <div className="text-red-100 text-xs mt-0.5">Three closure options to match your school's needs</div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-5">
                    {[
                      { icon: Lock, label: "MAX LOCK", desc: "Proprietary magnetic locking mechanism that requires a dedicated unlock dock or handheld key to release. Full-metal construction with no thin pins and no plastic components. The lock cannot be defeated with off-the-shelf magnets." },
                      { icon: ShieldCheck, label: "Magnetic Snap", desc: "Strong neodymium magnetic closure for fast, secure sealing. Integrated into a proprietary double-roll design that creates two physical barriers. No unlock station required. Teacher-controlled access." },
                      { icon: Layers, label: "Velcro", desc: "Heavy-duty hook-and-loop closure for schools that want the simplest possible operation. Paired with the double-roll fold to maintain signal integrity. Ideal for younger year groups or schools prioritising speed of access." },
                    ].map((opt) => (
                      <div key={opt.label} className="flex gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#EEE9FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <opt.icon size={16} className="text-[#f95555]" />
                        </div>
                        <div>
                          <div className="font-bold text-[#111111] text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{opt.label}</div>
                          <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-800 leading-relaxed"><strong>Proprietary double-roll closure:</strong> Every Generation Faraday bag uses a double-roll fold before the closure engages. This creates a dual-barrier seal that maintains Faraday shielding integrity and prevents the bag from being pried open at the seam.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Typical pouch-style lock */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-gray-100 px-6 py-4">
                  <div className="text-[#111111] font-extrabold text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>Typical Pouch-Style Lock (e.g. Yondr)</div>
                  <div className="text-gray-500 text-xs mt-0.5">Based on publicly available information and press reports</div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-5">
                    {[
                      { icon: AlertTriangle, label: "Single Pin Lock", desc: "Based on publicly available product information, typical pouch-style locks use a single metal pin mechanism to secure the pouch. Press reports from school districts indicate this pin can bend under repeated daily use, causing the lock to fail over time.", colour: "bg-red-50", iconColour: "text-red-400" },
                      { icon: Unlock, label: "Centralised Unlock Station Required", desc: "Students must queue at a centralised unlock station to access their devices. Reports from US school districts describe long queues at the start and end of each day, reducing instructional time and creating logistical bottlenecks.", colour: "bg-amber-50", iconColour: "text-amber-500" },
                      { icon: Smartphone, label: "Off-the-Shelf Bypass", desc: "Multiple press reports and consumer websites document that inexpensive magnets (widely available online) can be used to open the lock without authorisation. Schools report needing to replace 15–20% of pouches annually due to damage and tampering.", colour: "bg-red-50", iconColour: "text-red-400" },
                    ].map((opt) => (
                      <div key={opt.label} className="flex gap-4">
                        <div className={`w-9 h-9 rounded-lg ${opt.colour} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <opt.icon size={16} className={opt.iconColour} />
                        </div>
                        <div>
                          <div className="font-bold text-[#111111] text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{opt.label}</div>
                          <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-400 leading-relaxed"><strong>Sources:</strong> Press reporting from <em>New York Magazine</em> (2023), <em>SFGate</em> (2024), and publicly available school district reviews. Generation Faraday has not independently tested competitor products. Schools are encouraged to verify all claims before purchasing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. WATERPROOFING ─────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#f95555] flex items-center justify-center">
                <Droplets size={18} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Waterproofing &amp; Build</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Waves, title: "Welded TPU Seams", desc: "Every seam is heat-welded, not stitched. This eliminates needle holes that would allow moisture to reach the Faraday liner, the most common cause of signal-blocking degradation over time.", highlight: true },
                { icon: Droplets, title: "Spill & Rain Resistant", desc: "The welded TPU exterior protects against water bottles, rain, and everyday spills. In a school environment, this means the bag performs the same in week 40 as it did in week 1.", highlight: true },
                { icon: ShieldCheck, title: "Liner Protection", desc: "The Faraday liner is fully enclosed between waterproof layers. Unlike stitched pouches where moisture can silently degrade the liner, our construction keeps the shielding material dry and intact.", highlight: true },
                { icon: Timer, title: "4+ Year Service Life", desc: "The combination of welded seams, reinforced liner, and full-metal lock is engineered for a minimum 4-year service life with 5–10 open/close cycles per day, tested to 3,000 to 4,000 total cycles.", highlight: true },
              ].map((card) => (
                <div key={card.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#f95555]/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#EEE9FF] flex items-center justify-center mb-4">
                    <card.icon size={18} className="text-[#f95555]" />
                  </div>
                  <h4 className="font-bold text-[#111111] text-sm mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{card.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. SIGNAL BLOCKING ─────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#f95555] flex items-center justify-center">
                <Radio size={18} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Signal Blocking: Standard vs. Optional</h3>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-[#111111] rounded-2xl p-8">
                <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">Generation Faraday</div>
                <h4 className="text-xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>Signal blocking is standard.</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Every bag ships with a reinforced Faraday liner that blocks WiFi, 4G/5G, Bluetooth, and NFC simultaneously. There is no "basic" version without shielding. Signal blocking is the product, not an add-on.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["WiFi (2.4 & 5 GHz)", "4G / LTE / 5G", "Bluetooth", "NFC"].map((signal) => (
                    <div key={signal} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                      <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-xs text-white font-medium">{signal}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-xs text-gray-400 leading-relaxed">Schools can independently verify signal blocking on delivery with a simple test: place a phone in the bag, close it, and try to call or message the device. No signal should get through.</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">Other Solutions</div>
                <h4 className="text-xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>Lock-only vs. signal-blocking</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">Some phone pouch products on the market secure the phone physically but do not include a Faraday liner as standard. This means the phone may still receive notifications, calls, and data inside the pouch, which can undermine the purpose of a phone-free policy.</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Physical lock only, no signal isolation", icon: X, colour: "text-red-400", bg: "bg-red-50" },
                    { label: "Notifications and calls may still arrive", icon: X, colour: "text-red-400", bg: "bg-red-50" },
                    { label: "Signal blocking sometimes available as paid add-on", icon: Minus, colour: "text-amber-500", bg: "bg-amber-50" },
                    { label: "Schools should check specifications carefully", icon: AlertTriangle, colour: "text-amber-500", bg: "bg-amber-50" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0`}>
                        <item.icon size={13} className={item.colour} />
                      </div>
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-400 leading-relaxed">Based on publicly available product specifications. We encourage schools to request a signal-blocking demonstration from any vendor before committing to a purchase.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. EMERGENCY ACCESS ─────────────────────────── */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#f95555] flex items-center justify-center">
                <Unlock size={18} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Emergency Access</h3>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {[
                  { title: "No unlock station needed", desc: "Generation Faraday bags are designed so that students can open them instantly in any emergency. No special tools, no unlock station, no teacher intervention. The bag opens freely at all times.", icon: Unlock, stat: "Instant", statLabel: "Access time" },
                  { title: "No queuing", desc: "Unlike centralised unlock stations that create bottlenecks at the end of each lesson or day, every student has immediate access to their own device at any time. This eliminates the logistical burden on staff.", icon: Timer, stat: "Zero", statLabel: "Queue time" },
                  { title: "Safeguarding first", desc: "The bag is a signal-blocking tool, not a restraint. Students with medical needs, emergency contacts, or safeguarding requirements always have unrestricted physical access to their device.", icon: ShieldCheck, stat: "100%", statLabel: "Access when needed" },
                ].map((item) => (
                  <div key={item.title} className="p-8 flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-[#EEE9FF] flex items-center justify-center mb-4">
                      <item.icon size={18} className="text-[#f95555]" />
                    </div>
                    <div className="text-3xl font-extrabold text-[#f95555] mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.stat}</div>
                    <div className="text-xs text-gray-400 mb-4">{item.statLabel}</div>
                    <h4 className="font-bold text-[#111111] text-sm mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 5. ECOSYSTEM ─────────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#f95555] flex items-center justify-center">
                <Smartphone size={18} className="text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>More Than a Product. An Ecosystem.</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-3xl">
              Most phone management solutions stop at the hardware. Generation Faraday is a complete ecosystem: hardware, software, and implementation support, designed to give schools full visibility and control.
            </p>

            {/* Ecosystem pillars */}
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  pillar: "Hardware",
                  desc: "Signal-blocking bags with RFID serialisation, multiple closure options, and waterproof construction built for 4+ years of daily school use.",
                  icon: ShieldCheck,
                  colour: "bg-[#f95555]",
                  iconBg: "bg-white/20",
                  textColour: "text-white",
                  subColour: "text-red-100",
                  border: "border-[#f95555]",
                  bg: "bg-[#f95555]",
                },
                {
                  pillar: "Software",
                  desc: "The Generation Faraday App: real-time compliance dashboards, RFID tracking, Ofsted-ready reports, and role-based access for staff and leadership.",
                  icon: BarChart3,
                  colour: "bg-[#111111]",
                  iconBg: "bg-white/10",
                  textColour: "text-white",
                  subColour: "text-gray-400",
                  border: "border-[#111111]",
                  bg: "bg-[#111111]",
                },
                {
                  pillar: "Implementation",
                  desc: "UK-based support team, staff training, parent communication templates, student briefing materials, and ongoing programme optimisation.",
                  icon: Layers,
                  colour: "bg-white",
                  iconBg: "bg-[#EEE9FF]",
                  textColour: "text-[#111111]",
                  subColour: "text-gray-500",
                  border: "border-gray-100",
                  bg: "bg-white",
                },
              ].map((p) => (
                <div key={p.pillar} className={`${p.bg} rounded-2xl p-7 border ${p.border} shadow-sm`}>
                  <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center mb-4`}>
                    <p.icon size={18} className={p.pillar === "Implementation" ? "text-[#f95555]" : "text-white"} />
                  </div>
                  <h4 className={`font-extrabold text-lg mb-2 ${p.textColour}`} style={{ fontFamily: "'Cabin', sans-serif" }}>{p.pillar}</h4>
                  <p className={`text-sm leading-relaxed ${p.subColour}`}>{p.desc}</p>
                </div>
              ))}
            </div>

            {/* App features grid */}
            <div className="bg-[#111111] rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[#f95555] text-xs font-bold tracking-widest uppercase">The Generation Faraday App</div>
                </div>
                <h4 className="text-xl lg:text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  Real-time visibility. Zero admin burden.
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-2xl">
                  Available on iOS, Android, and web. The app turns your phone-free policy into a managed, measurable programme. No competitor offers anything comparable.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Scan, title: "RFID Scanning", desc: "Scan an entire classroom in 30 seconds. Every bag is serialised and tracked to a specific student." },
                    { icon: BarChart3, title: "Compliance Dashboard", desc: "Real-time compliance rates by class, year group, or whole school. Identify patterns instantly." },
                    { icon: FileBarChart, title: "Ofsted-Ready Reports", desc: "One-click export of compliance data, ready for inspection evidence or governor reporting." },
                    { icon: Bell, title: "Alerts & Notifications", desc: "Automated alerts for non-compliance, missing bags, or damaged equipment. Nothing falls through the cracks." },
                  ].map((feat) => (
                    <div key={feat.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <div className="w-9 h-9 rounded-lg bg-[#f95555]/20 flex items-center justify-center mb-3">
                        <feat.icon size={16} className="text-[#f95555]" />
                      </div>
                      <h5 className="font-bold text-white text-sm mb-1.5" style={{ fontFamily: "'Cabin', sans-serif" }}>{feat.title}</h5>
                      <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>

                {/* App screenshots */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {[
                    { src: "https://generationfaraday.com/wp-content/uploads/2025/04/AppScreenShots04.webp", label: "Dashboard" },
                    { src: "https://generationfaraday.com/wp-content/uploads/2025/04/AppScreenShots02.webp", label: "Students" },
                    { src: "https://generationfaraday.com/wp-content/uploads/2025/04/AppScreenShots03.webp", label: "Student Profile" },
                    { src: "https://generationfaraday.com/wp-content/uploads/2025/04/AppScreenShots01.webp", label: "Bag Management" },
                  ].map((screen) => (
                    <div key={screen.label} className="rounded-xl overflow-hidden border border-white/10">
                      <img src={screen.src} alt={`Generation Faraday App - ${screen.label}`} className="w-full h-auto" />
                      <div className="bg-white/5 px-3 py-2">
                        <span className="text-[10px] text-gray-400 font-medium">{screen.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* App links */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/app"
                    className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e04444] transition-colors text-sm"
                    style={{ fontFamily: "'Cabin', sans-serif" }}
                  >
                    Explore the App <ArrowRight size={14} />
                  </Link>
                  <a
                    href="https://app.generationfaraday.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
                    style={{ fontFamily: "'Cabin', sans-serif" }}
                  >
                    Launch Web App <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Competitor comparison callout */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#111111] text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>No competitor offers a comparable software platform</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">Based on publicly available product information as of March 2026, no other UK phone management solution includes a companion app with RFID tracking, compliance dashboards, or Ofsted-ready reporting. Schools using alternative products typically rely on manual registers or spreadsheets to track compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY CONSIDERATIONS ──────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#0D0D0D]" ref={failureSection.ref}>
        <div className="container">
          <div className={`transition-all duration-500 ${failureSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-2 bg-[#f95555]/15 border border-[#f95555]/25 rounded-full px-4 py-1.5 mb-5">
                <span className="text-[#f95555] text-xs font-bold tracking-widest uppercase">Key Considerations</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
                What to look for when<br />choosing a phone management solution.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                These are the four areas that UK schools tell us matter most when evaluating phone management products.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {KEY_CONSIDERATIONS.map((f, i) => (
                <div
                  key={f.title}
                  className={`relative rounded-2xl p-6 border border-white/8 bg-white/4 transition-all duration-500 ${failureSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f95555] flex items-center justify-center mb-5">
                    <f.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-white mb-3 text-base" style={{ fontFamily: "'Cabin', sans-serif" }}>{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CYCLE TESTING VIDEO ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#f95555]/10 border border-[#f95555]/20 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#f95555] text-xs font-bold tracking-widest uppercase">Independent Testing</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Cycle Testing: See It In Action
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              Our bags undergo rigorous cycle testing to verify signal-blocking performance holds up through thousands of open-and-close cycles. Watch the full test below.
            </p>
          </div>
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/V5SYUVcc-zI"
                title="Generation Faraday Cycle Testing"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#F7F7F8]" ref={faqSection.ref}>
        <div className="container">
          <div className={`max-w-3xl mx-auto transition-all duration-500 ${faqSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#f95555]/10 border border-[#f95555]/20 rounded-full px-4 py-1.5 mb-5">
                <span className="text-[#f95555] text-xs font-bold tracking-widest uppercase">Common Questions</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Frequently asked questions
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#111111] text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#f95555] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────────────── */}
      <section className="py-6 bg-white border-t border-gray-100">
        <div className="container">
          <p className="text-xs text-gray-400 max-w-3xl leading-relaxed mb-2">
            <strong>Disclaimer:</strong> All comparisons on this page are based on publicly available product specifications, marketing materials, and our own internal testing as of March 2026. Competitor features and specifications may have changed since the date of review. We encourage schools to verify all claims independently before making purchasing decisions.
          </p>
          <p className="text-xs text-gray-400 max-w-3xl leading-relaxed mb-2">
            Generation Faraday UK makes no claim that competitor products are unsafe, unfit for purpose, or in breach of any standard. The comparison table reflects feature differences only and is not intended to denigrate any brand or product. The scoring system reflects the number of features listed on this page and should not be interpreted as an overall quality rating.
          </p>
          <p className="text-xs text-gray-400 max-w-3xl leading-relaxed">
            Yondr and Phonelocker are trademarks of their respective owners and are used here for identification purposes only. If you represent a listed company and believe any information on this page is inaccurate, please <Link href="/contact" className="text-[#f95555] hover:underline">contact us</Link> and we will review and correct it promptly.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f95555]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Ready to see the difference?
          </h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto text-sm">
            Speak to our UK team about a pilot programme, free samples, or a full school rollout.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-7 py-3.5 rounded-lg hover:bg-red-50 transition-colors text-sm"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Speak to a Specialist <ArrowRight size={15} />
            </Link>
            <Link href="/request-quote"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
