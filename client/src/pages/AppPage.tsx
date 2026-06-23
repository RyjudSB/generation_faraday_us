/* =============================================================
   App Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   Philosophy: GF is an ECOSYSTEM - Hardware + Software + Implementation
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, CheckCircle2, BarChart3, Shield, Bell, Users,
  Smartphone, Globe, Building2, GraduationCap, UserCheck,
  ChevronLeft, ChevronRight, Layers, Cpu, BookOpen, Wifi,
  Lock, Database, TrendingUp, ClipboardCheck, Zap, RefreshCw
} from "lucide-react";
import { Link } from "wouter";
import RFIDIcon from "../components/RFIDIcon";

const WP = "https://generationfaraday.com/wp-content/uploads";
const HERO_IMG    = `${WP}/2025/04/app_header_3.webp`;
const SCREEN_01   = `${WP}/2025/04/AppScreenShots04.webp`;
const SCREEN_02   = `${WP}/2025/04/AppScreenShots02.webp`;
const SCREEN_03   = `${WP}/2025/04/AppScreenShots03.webp`;
const SCREEN_04   = `${WP}/2025/04/AppScreenShots01.webp`;
const PROFILE_IMG = `${WP}/2025/04/AppScreenShots01.webp`;
const SS_02       = `${WP}/2025/04/AppScreenShots02.webp`;
const SS_03       = `${WP}/2025/04/AppScreenShots03.webp`;
const SS_04       = `${WP}/2025/04/AppScreenShots04.webp`;

function useFadeUp(threshold = 0.08) {
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

const PILLARS = [
  {
    icon: Cpu,
    number: "01",
    label: "Hardware",
    title: "Military-Grade Signal Blocking",
    colour: "#f95555",
    dark: true,
    desc: "Every Generation Faraday bag contains a Faraday liner that blocks WiFi, 4G/5G, Bluetooth, and NFC simultaneously. Welded TPU construction. Independently tested to 3,000–4,000 open/close cycles. RFID-serialised for individual student tracking.",
    points: ["Blocks all wireless signals", "Welded waterproof TPU exterior", "RFID serial number per bag", "Tested to 3,000–4,000 cycles"],
  },
  {
    icon: Smartphone,
    number: "02",
    label: "Software",
    title: "The Generation Faraday App",
    colour: "#111111",
    dark: false,
    desc: "The app is the intelligence layer of the ecosystem. It connects every bag to a student, every student to a classroom, and every classroom to your school's compliance data in real time. Available on iOS, Android, and as a full web app.",
    points: ["Real-time compliance dashboard", "RFID bag-to-student assignment", "Role-based access for all staff", "Ofsted-ready reporting"],
  },
  {
    icon: BookOpen,
    number: "03",
    label: "Implementation",
    title: "Guided Rollout & Ongoing Support",
    colour: "#5B4FE8",
    dark: false,
    desc: "A phone-free policy only works if it's implemented correctly. Our UK team provides a structured rollout programme, staff training, parent communication templates, and ongoing support, so your school sees results from day one.",
    points: ["Dedicated UK implementation lead", "Staff training & onboarding", "Parent communication templates", "Ongoing programme support"],
  },
];

const FLOW_STEPS = [
  { icon: Lock,         title: "Student bags their phone",       desc: "The Faraday bag immediately blocks all signals. No notifications. No distractions. The lesson begins." },
  { icon: Wifi,         title: "RFID scan confirms compliance",  desc: "The teacher scans the classroom in under 30 seconds using the app. Each bag's serial number is logged against the student's profile." },
  { icon: Database,     title: "Data is captured in real time",  desc: "Compliance status, attendance, and incident logs are written to the school's dashboard instantly, with no manual data entry required." },
  { icon: TrendingUp,   title: "Leadership acts on insight",     desc: "Senior leaders access whole-school trends. Heads of Year identify repeat non-compliance. Governors receive exportable reports." },
  { icon: RefreshCw,    title: "The programme improves",         desc: "Our implementation team reviews your data with you each term, helping you refine the programme and demonstrate measurable impact." },
];

const KEY_FEATURES = [
  { icon: ClipboardCheck, title: "Asset Tracking & Integrated Setup",    desc: "Every bag is RFID-serialised and tied to a specific student profile. Track serial numbers, assignments, and replacements across your entire inventory, all from one dashboard. Know exactly who has which bag at all times." },
  { icon: BarChart3,      title: "Real-Time Compliance Monitoring",       desc: "View compliance status across every classroom, live. See which students have bagged their phones and which haven't. Flag non-compliant students and notify the relevant teacher without disrupting the lesson." },
  { icon: Building2,      title: "School & District-Level Insights",      desc: "Access whole-school dashboards and generate detailed reports for governors, parents, and Ofsted inspections. Multi-academy trusts can view compliance data across every school in the network from a single login." },
  { icon: Globe,          title: "Access Anywhere, Anytime",              desc: "Available as a native iOS and Android app, and as a full web app at app.generationfaraday.com, with no download required. Access your dashboard from any device, anywhere in the school." },
  { icon: Bell,           title: "Non-Compliance Alerts",                 desc: "Receive push notifications the moment a policy breach is detected. Alerts are routed to the relevant teacher or administrator so issues can be resolved quickly and discreetly." },
  { icon: Shield,         title: "RFID Attendance Tracking",              desc: "Use RFID-serialised bags to automate attendance tracking. When a student's bag is scanned at the start of the day, their attendance is logged automatically, reducing admin burden and improving accuracy." },
];

const DATA_UNLOCKS = [
  { stat: "30 sec", label: "Classroom compliance check",  desc: "Teachers scan an entire class in under 30 seconds at the start of each lesson." },
  { stat: "100%",   label: "Audit trail coverage",        desc: "Every compliance event is logged with a timestamp, student ID, and teacher name." },
  { stat: "1 click",label: "Ofsted-ready report export",  desc: "Export a full compliance report for any time period with a single click." },
  { stat: "0",      label: "Additional hardware required",desc: "Teachers use their existing smartphones. No scanners, no terminals, no extra cost." },
];

const SCREENS = [
  { src: SCREEN_01, label: "Dashboard",          desc: "Instantly track Faraday Bags: active, lost, damaged, or flagged." },
  { src: SCREEN_02, label: "Students",           desc: "Easily track assigned bags and monitor student compliance in one place." },
  { src: SCREEN_03, label: "Individual Profile", desc: "Track individual usage history and compliance at a glance." },
  { src: SCREEN_04, label: "Faraday Bags",       desc: "View and manage allocated and unallocated bags effortlessly." },
];

const GALLERY = [
  { src: PROFILE_IMG, label: "Student Profile View" },
  { src: SS_02,       label: "Compliance Overview" },
  { src: SS_03,       label: "Bag Inventory" },
  { src: SS_04,       label: "Incident Log" },
];

const FULL_FEATURES = [
  "Track bag assignments and serial numbers per student",
  "Real-time classroom compliance dashboard",
  "Flag non-compliant students instantly",
  "Monitor lost, damaged, or missing bags",
  "Access school-wide reports and insights",
  "Scan bag barcodes with your phone camera",
  "Manage multiple classrooms and year groups",
  "Export compliance data for governor reports",
  "Receive push notifications for policy breaches",
  "RFID-enabled attendance tracking",
  "District-level multi-school oversight",
  "Manage inventory by unit and pound value",
  "Track replacements and condition logs",
  "Available on iOS and Android",
  "Full web app, no download required",
  "Secure role-based access for all staff",
];

function AppStoreButtons({ dark = false }: { dark?: boolean }) {
  const bg = dark ? "bg-white text-[#111111]" : "bg-[#111111] text-white";
  const hover = dark ? "hover:bg-gray-100" : "hover:bg-[#222]";
  return (
    <div className="flex flex-wrap gap-4">
      <a href="https://apps.apple.com/app/generation-faraday/id6739363972" target="_blank" rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 ${bg} ${hover} transition-colors rounded-2xl`}
        style={{ fontFamily: "'Cabin', sans-serif", padding: "14px 24px" }}>
        <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div>
          <div style={{ fontSize: "11px", opacity: 0.65, lineHeight: 1, marginBottom: "2px" }}>Download on the</div>
          <div style={{ fontSize: "17px", fontWeight: 800, lineHeight: 1.1 }}>App Store</div>
        </div>
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.generationfaraday.app" target="_blank" rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 ${bg} ${hover} transition-colors rounded-2xl`}
        style={{ fontFamily: "'Cabin', sans-serif", padding: "14px 24px" }}>
        <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="currentColor">
          <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
        </svg>
        <div>
          <div style={{ fontSize: "11px", opacity: 0.65, lineHeight: 1, marginBottom: "2px" }}>Get it on</div>
          <div style={{ fontSize: "17px", fontWeight: 800, lineHeight: 1.1 }}>Google Play</div>
        </div>
      </a>
    </div>
  );
}

export default function AppPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const pillarsSection     = useFadeUp(0.05);
  const flowSection        = useFadeUp(0.05);
  const featuresSection    = useFadeUp(0.05);
  const dataSection        = useFadeUp(0.05);
  const screensSection     = useFadeUp(0.05);
  const hierarchySection   = useFadeUp(0.05);
  const gallerySection     = useFadeUp(0.05);
  const featureListSection = useFadeUp(0.05);
  const downloadSection    = useFadeUp(0.05);

  return (
    <main className="pt-16 overflow-x-hidden">

      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center bg-[#111111] overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Generation Faraday App" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-6 border border-[#f95555]/30 rounded-full px-4 py-2">
                <Layers size={12} />
                Technology + Implementation
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Not just a bag.<br />
                <span className="text-[#f95555]">An ecosystem.</span>
              </h1>
              <p className="text-gray-300 text-xl leading-relaxed mb-8 max-w-2xl">
                Generation Faraday combines military-grade signal-blocking hardware, intelligent compliance software, and a structured implementation programme into one integrated system. The bag blocks the signal. The app manages the policy. The programme makes it stick.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <AppStoreButtons dark={true} />
                <a href="https://app.generationfaraday.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white border border-white/30 hover:border-white/60 transition-colors rounded-2xl px-6 py-4 text-sm font-bold"
                  style={{ fontFamily: "'Cabin', sans-serif" }}>
                  <Globe size={16} />
                  Open Web App
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute right-8 top-1/3 hidden xl:flex flex-col gap-4 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          {[{ n: "3", label: "Pillars of the ecosystem" }, { n: "30s", label: "Classroom compliance check" }, { n: "100%", label: "Audit trail coverage" }].map((b) => (
            <div key={b.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-right">
              <div className="text-3xl font-extrabold text-[#f95555]" style={{ fontFamily: "'Cabin', sans-serif" }}>{b.n}</div>
              <div className="text-xs text-gray-400 mt-0.5">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 2. THREE PILLARS ═════════════════════════════════════ */}
      <section className="py-24 bg-white" ref={pillarsSection.ref}>
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-500 ${pillarsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">The Ecosystem</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Three pillars. One system.
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Most phone solutions address one part of the problem. Generation Faraday addresses all three: the physical device, the data layer, and the human implementation. Each pillar reinforces the others. Remove one and the programme is weaker.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {PILLARS.map((pillar, idx) => (
              <div
                key={pillar.label}
                className={`rounded-3xl p-8 border transition-all duration-500 hover:shadow-xl ${pillarsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                  background: idx === 0 ? "#111111" : idx === 1 ? "#FAFAFA" : "#F0EEFF",
                  borderColor: idx === 0 ? "transparent" : idx === 1 ? "#E5E5E5" : "#D4CCFF",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: idx === 0 ? "rgba(249,85,85,0.15)" : idx === 1 ? "rgba(17,17,17,0.08)" : "rgba(91,79,232,0.12)" }}>
                    <pillar.icon size={22} style={{ color: pillar.colour }} />
                  </div>
                  <span className="text-5xl font-extrabold opacity-10" style={{ fontFamily: "'Cabin', sans-serif", color: pillar.colour }}>{pillar.number}</span>
                </div>
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: pillar.colour }}>{pillar.label}</div>
                <h3 className="text-2xl font-extrabold mb-4" style={{ fontFamily: "'Cabin', sans-serif", color: idx === 0 ? "#fff" : "#111111" }}>{pillar.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: idx === 0 ? "#aaa" : "#555" }}>{pillar.desc}</p>
                <ul className="flex flex-col gap-2.5">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm" style={{ color: idx === 0 ? "#ccc" : "#444" }}>
                      <CheckCircle2 size={14} style={{ color: pillar.colour, flexShrink: 0 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. HOW THE PILLARS CONNECT ═══════════════════════════ */}
      <section className="py-24 bg-[#F7F7F8]" ref={flowSection.ref}>
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-500 ${flowSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">How It Works</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              From bag to board report<br />in five steps.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              The ecosystem is designed so that each step flows naturally into the next, from the moment a student bags their phone to the moment a governor reviews the data.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#f95555] via-[#f95555]/40 to-[#5B4FE8]" style={{ zIndex: 0 }} />
            <div className="grid lg:grid-cols-5 gap-6 relative z-10">
              {FLOW_STEPS.map((step, idx) => (
                <div key={step.title} className={`transition-all duration-500 ${flowSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 border-4 border-white shadow-lg" style={{ background: idx === 0 ? "#f95555" : idx === 4 ? "#5B4FE8" : "#111111" }}>
                      <step.icon size={26} className="text-white" />
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: idx === 0 ? "#f95555" : idx === 4 ? "#5B4FE8" : "#888" }}>Step {idx + 1}</div>
                    <h3 className="font-extrabold text-[#111111] text-sm mb-2 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. APP FEATURE DEEP-DIVE ═════════════════════════════ */}
      <section className="py-24 bg-white" ref={featuresSection.ref}>
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-500 ${featuresSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">The Software Layer</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              The intelligence behind<br />every bag.
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              The Generation Faraday App is the data and compliance layer of the ecosystem. It turns a physical product into a managed programme with real-time visibility, automated tracking, and actionable insight.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_FEATURES.map((feature, idx) => (
              <div key={feature.title} className={`rounded-2xl p-7 border border-gray-100 hover:border-[#f95555]/30 hover:shadow-lg transition-all duration-300 group ${featuresSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${idx * 60}ms`, background: "#FAFAFA" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: "rgba(249,85,85,0.1)" }}>
                  <feature.icon size={20} className="text-[#f95555]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-3 text-lg" style={{ fontFamily: "'Cabin', sans-serif" }}>{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. DATA UNLOCKS ══════════════════════════════════════ */}
      <section className="py-20 bg-[#111111]" ref={dataSection.ref}>
        <div className="container">
          <div className={`text-center mb-14 transition-all duration-500 ${dataSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 text-[#C4B8FF] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#C4B8FF]" />
              What the Data Unlocks
            </div>
            <h2 className="text-4xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Policy compliance you can<br />actually prove.
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              The app doesn't just manage the programme. It generates the evidence. Every scan, every flag, every report is timestamped and auditable.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA_UNLOCKS.map((item, idx) => (
              <div key={item.label} className={`rounded-2xl p-7 border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-500 ${dataSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="text-5xl font-extrabold text-[#f95555] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.stat}</div>
                <div className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.label}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. APP SCREENS ═══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#F4F4F5" }} ref={screensSection.ref}>
        <div className="container">
          <div className={`text-center mb-16 transition-all duration-500 ${screensSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Explore the App</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>A glimpse into every screen.</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">Designed for busy school staff: clean, fast, and intuitive on any device.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {SCREENS.map((screen, idx) => (
              <div key={screen.label} className={`transition-all duration-500 ${screensSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${idx * 80}ms` }}>
                <img src={screen.src} alt={screen.label} className="w-full h-auto block rounded-2xl shadow-md hover:shadow-xl transition-shadow mb-4" />
                <h3 className="font-bold text-[#111111] text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{screen.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{screen.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. USER HIERARCHY ════════════════════════════════════ */}
      <section className="py-24 bg-white" ref={hierarchySection.ref}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-600 ${hierarchySection.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="flex flex-col items-center" style={{ gap: 0 }}>
                <div style={{ clipPath: "polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)", background: "#f4c97a", width: "100%", height: "110px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "8px" }}>
                  <Building2 size={26} color="#7a5c00" />
                  <span style={{ fontFamily: "'Cabin', sans-serif", fontSize: "12px", fontWeight: 800, color: "#7a5c00", marginTop: "4px" }}>District / MAT</span>
                </div>
                <div style={{ clipPath: "polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)", background: "#f95555", width: "80%", height: "110px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "8px" }}>
                  <Shield size={26} color="#fff" />
                  <span style={{ fontFamily: "'Cabin', sans-serif", fontSize: "12px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>Senior Leadership</span>
                </div>
                <div style={{ clipPath: "polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)", background: "#555555", width: "60%", height: "110px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "8px" }}>
                  <GraduationCap size={26} color="#fff" />
                  <span style={{ fontFamily: "'Cabin', sans-serif", fontSize: "12px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>Class Teachers</span>
                </div>
                <div style={{ clipPath: "polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)", background: "#888888", width: "40%", height: "110px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "8px" }}>
                  <UserCheck size={26} color="#fff" />
                  <span style={{ fontFamily: "'Cabin', sans-serif", fontSize: "12px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>Students</span>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-600 ${hierarchySection.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "150ms" }}>
              <div className="section-label mb-3">Access Hierarchy</div>
              <h2 className="text-4xl font-extrabold text-[#111111] mb-6" style={{ fontFamily: "'Cabin', sans-serif" }}>Built for every role<br />in your school.</h2>
              <div className="flex flex-col gap-5">
                {[
                  { icon: Building2,    role: "District / MAT",                colour: "#f4c97a", desc: "Oversee compliance data across every school in the network from a single login. Compare performance, identify outliers, and standardise policy across sites." },
                  { icon: Shield,       role: "Senior Leadership",              colour: "#f95555", desc: "Access whole-school dashboards and generate reports for governors and Ofsted. Demonstrate policy effectiveness with real, auditable data and track programme ROI." },
                  { icon: GraduationCap,role: "Class Teachers & Heads of Year", colour: "#555555", desc: "Check classroom compliance in under 30 seconds at the start of each lesson. Monitor trends across year groups and identify repeat non-compliance." },
                  { icon: UserCheck,    role: "Students",                       colour: "#888888", desc: "Each student is individually tracked via their RFID-serialised bag. Device usage is monitored automatically, with no manual check-in required." },
                ].map((item) => (
                  <div key={item.role} className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F7F8] border border-gray-100">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.colour}18` }}>
                      <item.icon size={18} style={{ color: item.colour }} />
                    </div>
                    <div>
                      <div className="font-bold text-[#111111] text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.role}</div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ RFID SECTION ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#111111]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#8B73FF]/10 border border-[#8B73FF]/20 rounded-full px-4 py-1.5 mb-5">
                <RFIDIcon size={14} className="text-[#8B73FF]" />
                <span className="text-[#8B73FF] text-xs font-bold tracking-widest uppercase">Built into every bag</span>
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Every bag has RFID.<br /><span className="text-[#8B73FF]">The app reads every one.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every Generation Faraday bag ships with a unique RFID chip embedded at manufacture. When staff scan at the entrance each morning, the app instantly knows which students are compliant — without manual registers or clipboards.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { stat: "100%", label: "of bags have RFID" },
                  { stat: "< 1s", label: "per scan at entrance" },
                  { stat: "Live", label: "compliance dashboard" },
                  { stat: "Auto", label: "Ofsted-ready reports" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-extrabold text-[#8B73FF] mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{s.stat}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {[
                  "Unique serial number in every bag — tracked from day one",
                  "Scan at door, assembly, or any checkpoint",
                  "App flags non-compliant students immediately",
                  "Export reports for SLT, governors, or Ofsted in one click",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <RFIDIcon size={13} className="text-[#8B73FF] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <RFIDIcon size={16} className="text-[#8B73FF]" />
                <div className="text-xs font-bold text-[#8B73FF] uppercase tracking-widest">RFID → App → Compliance</div>
              </div>
              <div className="flex flex-col gap-1">
                {[
                  { img: "https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg", label: "Bag sealed — RFID chip inside", border: "border-[#f95555]", bg: "bg-white" },
                  { img: null, emoji: "📡", label: "RFID reader at school entrance", border: "border-amber-500", bg: "bg-amber-500/10" },
                  { img: null, emoji: "📱", label: "App logs student + bag ID in real time", border: "border-[#8B73FF]", bg: "bg-[#8B73FF]/10" },
                  { img: null, emoji: "✅", label: "Compliance confirmed — dashboard updates", border: "border-emerald-500", bg: "bg-emerald-500/10" },
                  { img: null, emoji: "📊", label: "Reports ready for SLT, governors, Ofsted", border: "border-blue-500", bg: "bg-blue-500/10" },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl border-2 ${step.border} ${step.bg} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                        {step.img ? (
                          <img src={step.img} alt="" className="w-full h-full object-contain p-1" />
                        ) : (
                          <span className="text-lg">{step.emoji}</span>
                        )}
                      </div>
                      {i < 4 && <div className="w-0.5 h-4 bg-white/10" />}
                    </div>
                    <div className="text-sm text-gray-300 ml-4 py-1">{step.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#8B73FF]/10 border border-[#8B73FF]/20 rounded-xl p-4">
                <div className="text-[#8B73FF] text-xs font-bold mb-1">No extra hardware needed</div>
                <div className="text-gray-400 text-xs">The RFID reader works with standard NFC-capable tablets or the GF scanning device. Setup takes minutes.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. GALLERY ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#F7F7F8]" ref={gallerySection.ref}>
        <div className="container">
          <div className={`text-center mb-12 transition-all duration-500 ${gallerySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Screen Gallery</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>See it in action.</h2>
          </div>
          <div className={`transition-all duration-500 ${gallerySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "100ms" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6" style={{ maxWidth: "560px", margin: "0 auto 24px" }}>
              <img src={GALLERY[galleryIdx].src} alt={GALLERY[galleryIdx].label} className="w-full h-auto block" style={{ objectFit: "contain" }} />
              <button onClick={() => setGalleryIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={() => setGalleryIdx((i) => (i + 1) % GALLERY.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"><ChevronRight size={20} /></button>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full">{GALLERY[galleryIdx].label}</div>
            </div>
            <div className="flex gap-3 justify-center">
              {GALLERY.map((item, idx) => (
                <button key={item.label} onClick={() => setGalleryIdx(idx)} className={`rounded-xl overflow-hidden border-2 transition-all ${idx === galleryIdx ? "border-[#f95555] scale-105" : "border-transparent opacity-60 hover:opacity-90"}`} style={{ width: "70px" }}>
                  <img src={item.src} alt={item.label} className="w-full h-auto" style={{ objectFit: "contain" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. FULL FEATURE LIST + ROLE CARDS ═══════════════════ */}
      <section className="py-24 bg-white" ref={featureListSection.ref}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className={`transition-all duration-500 ${featureListSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="section-label mb-4">Full Feature List</div>
              <h2 className="text-4xl font-extrabold text-[#111111] mb-6" style={{ fontFamily: "'Cabin', sans-serif" }}>Everything in one place.</h2>
              <div className="grid grid-cols-1 gap-2.5">
                {FULL_FEATURES.map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2 border-b border-gray-100">
                    <CheckCircle2 size={15} className="text-[#f95555] flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`transition-all duration-500 ${featureListSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "100ms" }}>
              <div className="section-label mb-4">Designed for Schools</div>
              <h2 className="text-4xl font-extrabold text-[#111111] mb-6" style={{ fontFamily: "'Cabin', sans-serif" }}>Built for every role<br />in your school.</h2>
              <div className="flex flex-col gap-4">
                {[
                  { role: "Class Teacher",    use: "Check compliance at the start of each lesson in under 30 seconds. Scan bags with your phone camera, no specialist hardware needed.", time: "30 sec check-in" },
                  { role: "Head of Year",     use: "Monitor compliance trends across your year group. Identify repeat non-compliance and escalate quickly with a full audit trail.", time: "Year group view" },
                  { role: "Senior Leadership",use: "Access whole-school dashboards and generate reports for governors and Ofsted. Demonstrate policy effectiveness with real data.", time: "Ofsted-ready reports" },
                  { role: "Admin Staff",      use: "Manage bag inventory, process replacements, track lost bags, and maintain accurate condition logs, all from the dashboard.", time: "Full inventory control" },
                ].map((item, idx) => (
                  <div key={item.role} className="rounded-2xl p-5 border border-gray-100 hover:border-[#f95555]/20 hover:shadow-md transition-all" style={{ background: idx === 0 ? "#0A0A0A" : "#FAFAFA" }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold mb-1.5" style={{ fontFamily: "'Cabin', sans-serif", color: idx === 0 ? "#fff" : "#111111" }}>{item.role}</div>
                        <div className="text-xs leading-relaxed" style={{ color: idx === 0 ? "#aaa" : "#666" }}>{item.use}</div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap" style={{ background: idx === 0 ? "rgba(249,85,85,0.15)" : "rgba(249,85,85,0.08)", color: "#f95555" }}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. DOWNLOAD CTA ═════════════════════════════════════ */}
      <section className="py-24 bg-[#f95555]" ref={downloadSection.ref}>
        <div className="container">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-600 ${downloadSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="inline-flex items-center gap-2 text-white/70 text-xs font-bold tracking-widest uppercase mb-4 border border-white/20 rounded-full px-4 py-2">
                <Zap size={12} />
                Free for all customers
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                The ecosystem is ready.<br />Is your school?
              </h2>
              <p className="text-red-100 mb-8 text-lg leading-relaxed">
                The app is included at no extra cost with every Generation Faraday order. Available on iOS, Android, and as a full web app. Get started in minutes.
              </p>
              <AppStoreButtons dark={true} />
              <p className="text-red-200 text-sm mt-6">
                Not yet a customer?{" "}
                <Link href="/request-quote" className="text-white underline hover:no-underline font-semibold">
                  Request a quote first <ArrowRight size={12} className="inline" />
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: Smartphone, title: "iOS & Android",     desc: "Native apps available on the App Store and Google Play." },
                { icon: Globe,      title: "Web App",            desc: "Access the full dashboard from any browser at app.generationfaraday.com" },
                { icon: Shield,     title: "Free for Customers", desc: "Included at no extra cost with every Generation Faraday order." },
                { icon: Users,      title: "Unlimited Users",    desc: "Add all your teachers, heads of year, and admin staff, with no per-seat fees." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.title}</div>
                    <div className="text-xs text-red-100">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
