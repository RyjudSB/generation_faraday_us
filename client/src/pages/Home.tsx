/* ============================================================
   Home - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   UK spelling throughout. Evidence-backed stats. Real testimonials.
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, CheckCircle2, Shield, BarChart3, Smartphone,
  ChevronLeft, ChevronRight, Check, X, BookOpen, Users, AlertTriangle,
  Home as HouseIcon, Star, TrendingUp, Award, Phone, Mail,
  WifiOff, Zap, Lock, FileText, KeyRound
} from "lucide-react";
import { Link } from "wouter";

// ── CDN image URLs ──────────────────────────────────────────────
const HERO_IMG       = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/gf-hero-maxlock_649e6376.png";
const BAG_IMG        = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/bag_55ca1828.jpg";
const APP_IMG        = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/app_ab162e82.webp";
const CUSTOMIZE_IMG  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/customize_6de914a1.png";
const FANNED_IMG     = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/fanned-bags_2d3f8a28.webp";

// ── Partner logos (all 6 lighthouse schools) ────────────────────
const PARTNER_LOGOS = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/lago-vista_53f23a7c.png",    alt: "Lago Vista ISD" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/sierra-sands_d27a2ac1.png", alt: "Sierra Sands Unified" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/oceanside_995b7f29.png",    alt: "Oceanside Unified" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/compton_4b3e1114.png",      alt: "Compton USD" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/umatilla_9d4ebea6.png",    alt: "Umatilla School District" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/sentinels_bd53b69b.png", alt: "Sentinels" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/urban-assembly-green-school_7e610b71.png", alt: "Urban Assembly Green School" },
];

// ── Comparison data ─────────────────────────────────────────────
const COMPARISON_ROWS = [
  { feature: "Blocks all wireless signals (WiFi, 4G/5G, Bluetooth)", gf: true,  competitor: false },
  { feature: "Stops notifications and buzzing completely",            gf: true,  competitor: false },
  { feature: "Blocks smartwatch connections",                         gf: true,  competitor: false },
  { feature: "Instant emergency access - no tools required",         gf: true,  competitor: false },
  { feature: "Students take bag home for healthier habits",           gf: true,  competitor: false },
  { feature: "Custom colours and school branding available",          gf: true,  competitor: "Limited" },
  { feature: "Compliance tracking app included",                      gf: true,  competitor: false },
  { feature: "Trusted by law enforcement and military",               gf: true,  competitor: false },
  { feature: "No unlock station required",                            gf: true,  competitor: false },
];

// ── Testimonials ────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "The transition to using the bags has been remarkably smooth. Staff have noted that the atmosphere in the halls and classrooms has changed dramatically, there are no phones or earbuds in sight. When asked, students frequently say: 'It's made me realise how often I think about checking my phone' and 'At first I thought it would be hard, but actually I've been able to focus much better in class.'  We couldn't be more pleased with the results.",
    name: "Eric Frandsen",
    role: "Principal, Surfside Educational Academy, Oceanside Unified School District",
    stars: 5,
  },
  {
    quote: "The implementation of Generation Faraday's signal-blocking pouches on our secondary campuses has been surprisingly smooth. The company has provided us with many valuable implementation and communication tools and is clearly invested in our success. It's just a few days in and we are already seeing a positive impact on instruction and the overall learning environment.",
    name: "Dr. Suzy Lofton-Bullis",
    role: "Deputy Superintendent, Lago Vista ISD",
    stars: 5,
  },
  {
    quote: "We're incredibly excited to receive Generation Faraday bags! These bags will help us create a more focused and engaged learning environment by reducing distractions and allowing students to fully immerse themselves in their studies. With the added security of knowing their devices are protected, our students can be more present, motivated, and ready to learn.",
    name: "Brenda Barragan",
    role: "Assistant Principal, Legacy Visual & Performing Arts High School",
    stars: 5,
  },
  {
    quote: "Portola Charter Middle School is extremely excited and grateful to be a recipient of Generation Faraday bags. We looked at a few types of phone bags and were impressed with the superior quality. I am looking forward to seeing the positive effects on student behaviour and academics.",
    name: "Becky Garcia",
    role: "Assistant Principal, Portola Charter Middle School",
    stars: 5,
  },
  {
    quote: "In addition to using the bags as a tool in my classroom, I love the fact that my students can take them home! Many students report using their bags as a tool at home for self-regulation while studying. It also brings parents into the discussion about how we manage phone use, a couple of students even reported that their parents were more thrilled about the product for younger siblings than for my own students.",
    name: "Graham Oleson",
    role: "Teacher, Pilot Programme, SMHS",
    stars: 5,
  },
  {
    quote: "I found this product helpful in allowing students to separate from the cellphone and headphones with less anxiety. The compliance of putting the phone in a bag on their desk was much higher than putting phones in the cellphone hotel on the wall.",
    name: "Richard Johnston",
    role: "Teacher, Santa Barbara High School",
    stars: 5,
  },
  {
    quote: "I think they are beneficial to students and teachers. It allows for 'total freedom' of time and thought from the digital and social media world, and allows students to focus on their classmates, lessons, and collaboration with the people in the room.",
    name: "Christina Cable",
    role: "Teacher, Dos Pueblos High School",
    stars: 5,
  },
];

// ── Research stats ──────────────────────────────────────────────
const RESEARCH_FACTS = [
  {
    stat: "72%",
    source: "Ofcom, 2024",
    href: "https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2024",
    claim: "of secondary school pupils own a smartphone and use it during the school day",
  },
  {
    stat: "43 min",
    source: "NASBE / Burnell et al., 2025",
    href: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2837133",
    claim: "median daily smartphone use by pupils aged 11\u201317 during school hours, even with policies in place",
  },
  {
    stat: "6.4%",
    source: "LSE Research, 2015",
    href: "https://cep.lse.ac.uk/pubs/download/dp1350.pdf",
    claim: "improvement in test scores for lower-achieving students when phones are removed",
  },
  {
    stat: "89%",
    source: "NASUWT Teacher Survey, 2023",
    href: "https://www.nasuwt.org.uk/static/847bdd11-256f-4aec-8ee7cc0201f2bf9f/33ff67f1-358b-4ec7-9ec50e1f602dca88/Big-Question-Survey-Report-2023.pdf",
    claim: "of teachers say smartphones are a significant source of classroom disruption",
  },
];

// ── Hooks ───────────────────────────────────────────────────────
function useFadeUp(threshold = 0.12) {
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

function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatItem({ value, suffix, label, sublabel, started }: { value: number; suffix: string; label: string; sublabel?: string; started: boolean }) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="text-center px-6 py-10">
      <div className="text-5xl lg:text-6xl font-extrabold text-[#f95555] mb-2 leading-none" style={{ fontFamily: "'Cabin', sans-serif" }}>
        {count}{suffix}
      </div>
      <p className="text-sm font-semibold text-[#111111] mb-1">{label}</p>
       {sublabel && <p className="text-xs text-gray-400">{sublabel}</p>}
    </div>
  );
}
// ── Main component ──────────────────────────────────────────────
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const statsSection        = useFadeUp(0.3);
  const partnersSection     = useFadeUp(0.1);
  const researchSection     = useFadeUp();
  const whySection          = useFadeUp();
  const howItWorks          = useFadeUp();
  const comparisonSection   = useFadeUp();
  const productsSection     = useFadeUp();
  const appSection          = useFadeUp();
  const policySection       = useFadeUp();
  const testimonialsSection = useFadeUp();
  const contactSection      = useFadeUp();

  const [tIdx, setTIdx] = useState(0);
  const prev = () => setTIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setTIdx((i) => (i + 1) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const [formData, setFormData] = useState({ firstName: "", lastName: "", school: "", email: "", students: "", role: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#f95555 1px, transparent 1px), linear-gradient(90deg, #f95555 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[92vh] items-center">

            {/* Left */}
            <div className="py-20 lg:py-28 lg:pr-16" style={{paddingTop: '30px'}}>
              <div
                className={`inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-6 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <span className="w-6 h-px bg-[#f95555]" />
                Generation Faraday - United Kingdom
              </div>
              <h1
                className={`text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold text-[#111111] leading-[1.05] mb-6 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ fontFamily: "'Cabin', sans-serif", transitionDelay: "100ms" }}
              >
                Give students<br />the gift of<br />
                <span className="text-[#f95555]">undivided focus</span>
              </h1>
              <div
                className={`w-16 h-1 bg-[#f95555] mb-6 transition-all duration-500 ${heroVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
                style={{ transformOrigin: "left", transitionDelay: "300ms" }}
              />
              <p
                className={`text-lg text-gray-600 leading-relaxed mb-8 max-w-lg transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "200ms" }}
              >
                Generation Faraday creates distraction-free environments in UK schools, homes, and beyond. Our signal-blocking Faraday bags cut every wireless signal - not just lock the device - keeping students fully present and genuinely focused.
              </p>
              <div
                className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "300ms" }}
              >
                <Link href="/request-quote"
                  className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded-lg hover:bg-[#e04444] transition-all duration-200 text-sm shadow-lg shadow-black/20"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                >
                  Request a Free Sample <ArrowRight size={15} />
                </Link>
                <a href="https://generationfaraday.com/how-it-works/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-7 py-3.5 rounded-lg hover:border-[#f95555] hover:text-[#f95555] transition-all duration-200 text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                >
                  How It Works
                </a>
              </div>
              {/* Signal blocking badges */}
              <div
                className={`flex flex-wrap gap-2 mb-5 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "350ms" }}
              >
                {["WiFi", "4G / 5G", "Bluetooth", "NFC"].map((sig) => (
                  <span key={sig} className="inline-flex items-center gap-1.5 bg-[#EEE9FF] text-[#7B5EA7] border border-[#8B73FF]/20 text-xs font-bold px-3 py-1 rounded-full">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="1" y1="1" x2="23" y2="23"/>
                      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                      <line x1="12" y1="20" x2="12.01" y2="20"/>
                    </svg>
                    {sig} Blocked
                  </span>
                ))}
              </div>
              {/* Trust badges */}
              <div
                className={`flex flex-wrap gap-5 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "400ms" }}
              >
                {[
                  { icon: Shield, label: "Signal-Blocking Certified" },
                  { icon: Award, label: "DfE-Aligned Policy" },
                  { icon: CheckCircle2, label: "Mission Darkness Tech" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                    <div className="w-6 h-6 rounded-full bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                      <Icon size={12} className="text-[#f95555]" />
                    </div>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - hero image */}
            <div
              className={`hidden lg:block relative h-full min-h-[92vh] transition-all duration-1000 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <img
                src={HERO_IMG}
                alt="Students walking to class - Generation Faraday UK"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Gradient overlay on left edge */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-12 left-0 -translate-x-1/4 bg-white rounded-2xl shadow-2xl p-5 w-56 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EEE9FF] flex items-center justify-center">
                    <TrendingUp size={14} className="text-[#f95555]" />
                  </div>
                  <span className="text-xs font-bold text-[#f95555] uppercase tracking-wide">Proven Impact</span>
                </div>
                <div className="text-3xl font-extrabold text-[#111111] mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>+20 min</div>
                <p className="text-xs text-gray-500 leading-snug">of learning time recovered per day per class</p>
                <a href="https://cep.lse.ac.uk/pubs/download/dp1350.pdf" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 mt-1.5 font-medium hover:text-[#f95555] underline underline-offset-1 transition-colors block">Source: LSE, 2015 ↗</a>
              </div>
              {/* Second floating card */}
              <div className="absolute top-16 right-8 bg-[#f95555] rounded-2xl shadow-2xl p-4 w-44">
                <div className="flex items-center gap-2 mb-2">
                  <WifiOff size={14} className="text-white" />
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wide">Signal Status</span>
                </div>
                <p className="text-white font-bold text-sm">100% Blocked</p>
                <p className="text-xs text-red-200 mt-0.5">WiFi · 4G/5G · Bluetooth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Darkness trust bar */}
      <div className="bg-[#0A0A0A] border-b border-white/5 py-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
            <div className="text-gray-500 text-xs font-medium">Technology by</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-amber-400 font-bold text-sm tracking-wide" style={{ fontFamily: "'Cabin', sans-serif" }}>MISSION DARKNESS™</span>
              <span className="text-gray-600 text-xs">by MOS Equipment</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">🛡️ <span>UK MOD Approved</span></span>
              <span className="flex items-center gap-1">🔵 <span>UK Police</span></span>
              <span className="flex items-center gap-1">🔬 <span>Lab-Certified</span></span>
              <span className="flex items-center gap-1">⚖️ <span>Used in Investigations</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* ── "We meet you where you are" band ─────────────── */}
      <div className="bg-[#f95555] py-5">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-white font-extrabold text-base" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Already have a phone policy? We work with it.
              </p>
              <p className="text-red-100 text-sm mt-0.5">
                Day-one whole school or gradual rollout — Generation Faraday meets you where you are.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/implementation" className="bg-white text-[#f95555] text-xs font-bold px-4 py-2 rounded-full hover:bg-red-50 transition-colors whitespace-nowrap">
                See implementation styles
              </Link>
              <Link href="/bundles" className="border border-white/40 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap">
                Build a bundle
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. STATS BAND ───────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-[#FAFAFA]" ref={statsSection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            <StatItem value={88}  suffix="%" label="Report improved classroom focus"          sublabel="Staff feedback report 2025-26"  started={statsSection.visible} />
            <StatItem value={84}  suffix="%" label="Report improved student behaviour"        sublabel="Staff feedback report 2025-26"  started={statsSection.visible} />
            <StatItem value={92}  suffix="%" label="Of teachers support continuation"         sublabel="Staff feedback report 2025-26"  started={statsSection.visible} />
            <StatItem value={100} suffix="%" label="Of wireless signals blocked - guaranteed" sublabel="Faraday-certified shielding"   started={statsSection.visible} />
          </div>
        </div>
      </section>

      {/* ── 3. LIGHTHOUSE SCHOOLS ───────────────────────────── */}
      <section className="py-16 bg-white" ref={partnersSection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-500 ${partnersSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Lighthouse Schools</p>
            <h3 className="text-2xl font-extrabold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Trusted by leading schools and districts
            </h3>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">Proven across the United States - and now expanding across the United Kingdom</p>
          </div>
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center transition-all duration-700 ${partnersSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "150ms" }}
          >
            {PARTNER_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center p-4 rounded-xl border border-gray-100 bg-[#FAFAFA] hover:border-[#f95555]/20 hover:bg-[#F5F2FF] transition-all duration-300 group"
                style={{ aspectRatio: "1 / 1" }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-14 max-w-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. RESEARCH FACTS ───────────────────────────────── */}
      <section className="py-24 bg-[#111111] relative overflow-hidden" ref={researchSection.ref}>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f95555]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#f95555]/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`mb-14 transition-all duration-500 ${researchSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 text-[#C4B8FF] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#C4B8FF]" />
              The Evidence
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>
              The case for phone-free<br /><span className="text-[#C4B8FF]">classrooms in the UK.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESEARCH_FACTS.map((fact, i) => (
              <div
                key={fact.stat}
                className={`bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all duration-300 ${researchSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-5xl font-extrabold text-[#C4B8FF] mb-4 leading-none" style={{ fontFamily: "'Cabin', sans-serif" }}>{fact.stat}</div>
                <p className="text-sm text-white/80 font-medium leading-relaxed mb-4">{fact.claim}</p>
                <div className="pt-4 border-t border-white/10">
                  <a href={fact.href} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 font-semibold uppercase tracking-wide hover:text-white/70 underline underline-offset-2 transition-colors">{fact.source}</a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-8">
            Sources:{" "}
            <a href="https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2024" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">Ofcom 2024</a>;
            {" "}<a href="https://cep.lse.ac.uk/pubs/download/dp1350.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">LSE \"Ill Communication\" (2015)</a>;
            {" "}<a href="https://www.nasuwt.org.uk/static/847bdd11-256f-4aec-8ee7cc0201f2bf9f/33ff67f1-358b-4ec7-9ec50e1f602dca88/Big-Question-Survey-Report-2023.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/50 transition-colors">NASUWT Annual Survey 2023</a>.
          </p>
        </div>
      </section>

      {/* ── 5. WHY IT MATTERS ───────────────────────────────── */}
      <section className="py-24 bg-white" ref={whySection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-500 ${whySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#f95555]" />
              Why It Matters
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Built for every stakeholder<br />in the school community.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* For Students */}
            <div
              className={`rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-600 ${whySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="bg-[#f95555] px-8 py-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                  <BookOpen size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>For Students</h3>
              </div>
              <div className="bg-white p-8">
                <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                  With phones securely stored and signals blocked, students can fully immerse themselves in lessons, discussions, and collaborative activities - without the temptation of digital distractions. Research from the <a href="https://www.journals.uchicago.edu/doi/full/10.1086/691462" target="_blank" rel="noopener noreferrer" className="text-[#f95555] underline hover:no-underline">University of Texas (2017)</a> found that even the <em>presence</em> of a smartphone on a desk reduces available cognitive capacity, even when the phone is face-down and silent.
                </p>
                <ul className="flex flex-col gap-3">
                  {["Better concentration and deeper learning", "Reduced anxiety from social media pressure", "Improved in-person social skills", "Healthier phone habits at home too"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-[#f95555]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* For Teachers */}
            <div
              className={`rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-600 ${whySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="bg-[#111111] px-8 py-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>For Teachers</h3>
              </div>
              <div className="bg-white p-8">
                <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                  Faraday bags save instructional time by eliminating the need for repeated reminders, phone collection, or policy enforcement - allowing educators to focus on delivering meaningful, uninterrupted lessons.  Research shows that UK schools with restrictive phone policies spend over 100 hours per week managing phone use, equivalent to three full-time staff members (<a href="https://www.birmingham.ac.uk/research/perspective/phone-free-schools" target="_blank" rel="noopener noreferrer" className="text-[#f95555] underline hover:no-underline">University of Birmingham, 2026</a>). Signal-blocking removes the enforcement burden entirely, freeing teachers to focus on teaching.                </p>
                <ul className="flex flex-col gap-3">
                  {["No more confiscation disputes or enforcement battles", "Fewer behaviour incidents and classroom conflict", "Reduced admin burden, no manual phone collection", "App dashboard for effortless compliance tracking"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-[#111111]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4 benefit cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: TrendingUp, title: "Academic Performance", desc: "A study of 91 schools in England found test scores improved by 6.4% of a standard deviation after phone prohibitions, with effects most pronounced for lower-achieving students.", href: "https://cep.lse.ac.uk/pubs/download/dp1350.pdf", sourceLabel: "LSE, 2015", color: "#f95555" },
              { icon: Shield, title: "Policy Enforcement", desc: "The app and bags work together to make phone-free policies enforceable - not just aspirational. Compliance tracking is built in.", color: "#f95555" },
              { icon: AlertTriangle, title: "Cyberbullying & Conflict", desc: "Signal-blocked devices mean fewer opportunities for in-school cyberbullying, social media drama, and peer pressure during the school day.", color: "#f95555" },
              { icon: HouseIcon, title: "Classroom to Home", desc: "Bags travel home with students, giving parents a practical tool to encourage healthier screen habits at the dinner table and during homework.", color: "#f95555" },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 hover:border-[#f95555]/20 hover:shadow-md transition-all duration-300 ${whySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEE9FF] flex items-center justify-center mb-4">
                  <card.icon size={18} className="text-[#f95555]" />
                </div>
                <h4 className="text-sm font-bold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{card.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                {(card as any).sourceLabel && (card as any).href && (
                  <a href={(card as any).href} target="_blank" rel="noopener noreferrer" className="text-xs text-[#f95555] font-semibold mt-2 block hover:underline">{(card as any).sourceLabel} ↗</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAFA]" ref={howItWorks.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-500 ${howItWorks.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#f95555]" />
              Implementation
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Simple. Effective. Proven.
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl">No complicated setup. No unlock stations. No disruption to your school day. Generation Faraday integrates seamlessly into existing routines.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {[
              { num: "01", icon: Smartphone, title: "Bag Up", desc: "Students place their phone in the Generation Faraday bag at the start of class. All signals - WiFi, 4G/5G, Bluetooth - are instantly and completely blocked." },
              { num: "02", icon: BookOpen, title: "Focus", desc: "With zero notifications and zero temptation, students are fully present - engaging with classmates and focused on lessons. No buzzing. No glancing. No distraction." },
              { num: "03", icon: Lock, title: "Access", desc: "Between classes and at lunch, students access devices freely. In emergencies, bags open instantly with no special tools, unlock stations, or teacher intervention required." },
              { num: "04", icon: BarChart3, title: "Track", desc: "The Generation Faraday App lets administrators track bag assignments by student, monitor compliance across classrooms, and manage enforcement from a single dashboard." },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`relative transition-all duration-500 ${howItWorks.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Step number - large background */}
                <div className="text-[5rem] font-extrabold text-[#f95555]/8 mb-0 select-none leading-none -mb-4" style={{ fontFamily: "'Cabin', sans-serif", color: '#7462d0' }}>{step.num}</div>
                <div className="w-10 h-10 rounded-xl bg-[#f95555] flex items-center justify-center mb-4">
                  <step.icon size={18} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-px bg-gray-200 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. COMPARISON TABLE ─────────────────────────────── */}
      <section className="py-24 bg-[#111111] relative overflow-hidden" ref={comparisonSection.ref}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-500 ${comparisonSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 text-[#C4B8FF] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#C4B8FF]" />
              Comparison
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Why signal-blocking<br />makes the difference.
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl text-sm leading-relaxed">
              Without true signal-blocking, notifications still come through, distractions persist, and the learning environment suffers. Generation Faraday eliminates distraction entirely: not just the device, but every signal it carries.
            </p>
          </div>

          <div className={`overflow-x-auto transition-all duration-700 ${comparisonSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-8 text-gray-400 font-semibold w-1/2">Feature</th>
                  <th className="text-center py-4 px-6 w-1/4">
                    <span className="inline-block bg-[#f95555] text-white text-xs font-bold px-4 py-1.5 rounded-full">Generation Faraday</span>
                  </th>
                  <th className="text-center py-4 px-6 text-gray-400 font-semibold w-1/4 text-xs uppercase tracking-wide">Standard Pouches</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                    <td className="py-4 pr-8 text-gray-300 text-sm">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        <div className="w-7 h-7 rounded-full bg-[#f95555]/30 flex items-center justify-center">
                          <Check size={14} className="text-[#C4B8FF]" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.competitor === false ? (
                        <div className="flex justify-center">
                          <div className="w-7 h-7 rounded-full bg-red-900/30 flex items-center justify-center">
                            <X size={14} className="text-red-400" />
                          </div>
                        </div>
                      ) : (
                        <span className="text-yellow-400 text-xs font-semibold">{row.competitor}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`mt-8 transition-all duration-500 ${comparisonSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "300ms" }}>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              See Full Comparison <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. PRODUCTS ─────────────────────────────────────── */}
      <section className="py-24 bg-white" ref={productsSection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-14 transition-all duration-500 ${productsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#f95555]" />
              Our Products
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Signal blocking is<br />just the beginning.
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl text-sm">From individual student bags to classroom organisers and locking accessories - a complete ecosystem for phone-free learning, designed to fit any school's needs and budget.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { tag: "Top Seller", title: "Max-Lock Faraday Bag", desc: "The flagship school bag. Signal-blocking pouch with magnetic lock option. Fits all phone models. Customisable colours and school branding available.", img: FANNED_IMG },
              { tag: "Organisers", title: "Shielded Storage Box", desc: "A shielded classroom storage container for multiple devices. Perfect for centralised, signal-blocked collection during instruction.", img: CUSTOMIZE_IMG },
              { tag: "Locking", title: "Locking & Security Accessories", desc: "Secure locking accessories for schools requiring a higher level of enforcement and accountability.", img: BAG_IMG },
              { tag: "Events", title: "Event & Venue Solutions", desc: "Scalable signal-blocking solutions for concerts, theatres, corporate events, and public venues across the UK.", img: FANNED_IMG },
            ].map((product, i) => (
              <div
                key={product.title}
                className={`group bg-[#FAFAFA] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-[#f95555]/20 transition-all duration-300 ${productsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="h-48 overflow-hidden bg-white relative">
                  <img src={product.img} alt={product.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#f95555] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">{product.tag}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{product.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Customisation CTA */}
          <div
            className={`bg-[#f95555] rounded-2xl grid lg:grid-cols-2 gap-10 overflow-hidden transition-all duration-700 ${productsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "400ms", minHeight: "340px" }}
          >
            {/* Text side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>Customise the look for your school</h3>
              <p className="text-red-100 leading-relaxed mb-5 text-sm">
                Choose from a range of fabric colours and finishes to match your school's branding. Add your school crest, name, or custom text. Every bag is built with the same signal-blocking technology trusted by schools and law enforcement worldwide.
              </p>
              <ul className="flex flex-col gap-2.5 mb-6">
                {["Wide range of fabric colours available", "Add your school logo or crest", "Bulk pricing for whole-school rollout", "Free samples available on request"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link href="/request-quote" className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  Request a Quote <ArrowRight size={14} />
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  View All Products
                </Link>
              </div>
            </div>
            {/* Image side - pinned to bottom so bags peek over the edge */}
            <div className="relative flex items-end justify-center px-4 pt-6">
              <img
                src={CUSTOMIZE_IMG}
                alt="Customisable Generation Faraday bag colours"
                className="object-contain object-bottom drop-shadow-2xl"
                style={{ height: "130%", maxHeight: "460px", width: "auto", maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8b. PHONE DROP BOX & SHIELDED BOX ─────────────── */}
      <section className="py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f95555]/20 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#C4B8FF] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#C4B8FF]" />
              Beyond the Bag
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Solutions for every<br /><span className="text-[#C4B8FF]">school environment.</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
              From individual student bags to centralised storage and venue-scale collection, Generation Faraday has a solution for every context.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Phone Drop Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#C4B8FF]/30 transition-all duration-300">
              <div className="inline-flex items-center gap-2 bg-[#f95555]/40 text-[#C4B8FF] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
                GFSA-DB
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Portable Phone Venue Drop Box</h3>
              <p className="text-gray-400 leading-relaxed mb-5 text-sm">
                A portable, signal-blocking drop box for venues, events, and schools requiring centralised phone collection. Students deposit their devices on entry, all signals are blocked inside. Ideal for assemblies, exams, performances, and venue-wide phone-free policies.
              </p>
              <ul className="flex flex-col gap-2.5 mb-6">
                {[
                  "Portable and easy to position at entry points",
                  "Blocks all wireless signals inside the box",
                  "Suitable for assemblies, exams, and events",
                  "Scalable, multiple units for larger venues",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-[#f95555]/50 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#C4B8FF]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/products/GFSA-DB" className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors" style={{ fontFamily: "'Cabin', sans-serif" }}>
                View Product <ArrowRight size={14} />
              </Link>
            </div>

            {/* Shielded Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#C4B8FF]/30 transition-all duration-300">
              <div className="inline-flex items-center gap-2 bg-[#f95555]/40 text-[#C4B8FF] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-5">
                GFSA-SB
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Generation Faraday Shielded Box</h3>
              <p className="text-gray-400 leading-relaxed mb-5 text-sm">
                A classroom-based signal-blocking storage container. Students place their devices in the box at the start of class, all signals are blocked for every device inside. No individual bags required. Perfect for schools wanting a centralised, teacher-managed approach.
              </p>
              <ul className="flex flex-col gap-2.5 mb-6">
                {[
                  "Holds multiple devices simultaneously",
                  "Blocks all wireless signals for every device inside",
                  "Teacher-managed, no student bag required",
                  "Compact design fits on any classroom desk",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-[#f95555]/50 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#C4B8FF]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/products/GFSA-SB" className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors" style={{ fontFamily: "'Cabin', sans-serif" }}>
                View Product <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. APP ──────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAFA]" ref={appSection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-600 ${appSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">
                <span className="w-6 h-px bg-[#f95555]" />
                The App
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111] mb-5" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Seamless policy<br />compliance tracking.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Ensure smooth implementation of phone-free policies with the Generation Faraday App. Track assigned bags, monitor compliance, and streamline enforcement - all from one easy-to-use dashboard designed for busy school staff. Available free with every school order.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Track bag assignments and serial numbers per student",
                  "Flag non-compliant students instantly",
                  "Monitor lost, damaged, or missing bags",
                  "View real-time classroom compliance at a glance",
                  "Access school-wide reports and insights",
                  "Available on iOS and Android - free with every order",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#f95555]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <a href="https://generationfaraday.com/mobile-app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#111111] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#f95555] transition-colors" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  Learn More About the App <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <div className={`flex justify-center transition-all duration-700 ${appSection.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "150ms" }}>
              <img src={APP_IMG} alt="Generation Faraday compliance app on phone" className="max-h-[500px] object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. POLICY / UK CONTEXT ─────────────────────────── */}
      <section className="py-24 bg-white" ref={policySection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-600 ${policySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">
                <span className="w-6 h-px bg-[#f95555]" />
                School Policy
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111] mb-5" style={{ fontFamily: "'Cabin', sans-serif" }}>
                The UK government<br /><span className="text-[#f95555]">has spoken.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                In February 2024, the Department for Education published guidance calling on all schools in England to ban mobile phones throughout the school day. The guidance states that schools should prohibit the use of mobile phones - including during breaks and lunchtime - and that headteachers should take "robust action" to enforce these policies.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Generation Faraday provides the physical technology to make these policies enforceable - not just aspirational. Our signal-blocking bags remove the temptation entirely, making compliance the path of least resistance for students.
              </p>
              <div className="bg-[#FAFAFA] border-l-4 border-[#f95555] pl-5 py-5 rounded-r-xl mb-6">
                <p className="text-gray-700 italic leading-relaxed text-sm">
                  "Each student will place their personal cellular device into a non-locking, signal-blocking pouch during classroom instruction. Students will have access to their device between classes and at lunch."
                </p>
                <footer className="mt-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                 , Example school phone policy statement
                </footer>
              </div>
              <a href="https://generationfaraday.com/wp-content/uploads/2024/11/GenerationFaraday_Brochure_0925_compressed.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#111111] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#f95555] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                <FileText size={14} />
                Download Policy Resources <ArrowRight size={14} />
              </a>
            </div>
            <div className={`transition-all duration-700 ${policySection.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "150ms" }}>
              <img src={FANNED_IMG} alt="Generation Faraday bags" className="rounded-2xl w-full object-contain bg-gray-50 p-6 shadow-xl border border-gray-100" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. TESTIMONIALS ────────────────────────────────── */}
      <section className="py-24 bg-[#111111] relative overflow-hidden" ref={testimonialsSection.ref}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#f95555]/20 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`mb-14 transition-all duration-500 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 text-[#C4B8FF] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#C4B8FF]" />
              Educator Voices
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>
              What educators are saying.
            </h2>
          </div>

          <div className={`transition-all duration-600 ${testimonialsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 max-w-3xl backdrop-blur-sm">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: TESTIMONIALS[tIdx].stars }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-5xl text-[#C4B8FF] font-serif leading-none mb-4 select-none" aria-hidden="true">"”</div>              <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-8 font-medium">
                {TESTIMONIALS[tIdx].quote}
              </p>
              <div className="pt-6 border-t border-white/10">
                <p className="font-bold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>{TESTIMONIALS[tIdx].name}</p>
                <p className="text-sm text-white/50">{TESTIMONIALS[tIdx].role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button type="button" onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C4B8FF] hover:text-[#C4B8FF] text-white/60 transition-colors" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#C4B8FF] hover:text-[#C4B8FF] text-white/60 transition-colors" aria-label="Next testimonial">
                <ChevronRight size={18} />
              </button>
              <div className="flex gap-1.5 ml-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === tIdx ? "bg-[#C4B8FF] w-6" : "bg-white/20 w-1.5"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-pressed={i === tIdx}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. PROMO BANNER ────────────────────────────────── */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#f95555] to-[#5B3FBF] rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                <Zap size={11} />
                Limited Time Offer
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Spring 2026 UK School Promotion
              </h2>
              <p className="text-red-100 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
                Special introductory pricing for UK schools. Bulk discounts, free samples, customisable colours, and full implementation support available. Our UK team will guide you through every step - from policy drafting to bag distribution. Limited availability - enquire before 30 April 2026.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/request-quote" className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-7 py-3.5 rounded-lg hover:bg-red-50 transition-colors text-sm shadow-lg" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  Request Free Sample <ArrowRight size={14} />
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. CONTACT CTA ─────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAFA]" ref={contactSection.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className={`transition-all duration-500 ${contactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-4">
                <span className="w-6 h-px bg-[#f95555]" />
                Get in Touch
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111111] mb-5" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Ready to create a<br />
                <span className="text-[#f95555]">phone-free school?</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Our UK team is ready to help you implement a phone-free policy that works. Request a quote, or request a free sample bag to share with your leadership team.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Free consultation with a UK specialist",
                  "Tailored pricing for your school size",
                  "Free sample bags available - no commitment",
                  "Full implementation support included",
                  "Ongoing compliance and app support",
                  "Policy template documents provided",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#f95555]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-[#111111] uppercase tracking-wide mb-1">UK Contact</p>
                <Link href="/contact" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#f95555] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-[#f95555]" />
                  </div>
                  Contact Us
                </Link>
                <a href="tel:+441264243243" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#f95555] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-[#f95555]" />
                  </div>
                  +44 1264 243243
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className={`transition-all duration-600 ${contactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "150ms" }}>
              <div aria-live="polite" aria-atomic="true">
              {formSent ? (
                <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center" role="status">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={30} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>Request Received!</h3>
                  <p className="text-gray-500 text-sm">Our UK team will be in touch within one business day.</p>
                </div>
              ) : (
                <form
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
                  onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                >
                  <h3 className="text-xl font-bold text-[#111111] mb-6" style={{ fontFamily: "'Cabin', sans-serif" }}>Request a Free Sample or Quote</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="home-firstName" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">First Name *</label>
                      <input id="home-firstName" required type="text" value={formData.firstName} onChange={e => setFormData(p => ({...p, firstName: e.target.value}))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] bg-white transition-colors" placeholder="Jane" />
                    </div>
                    <div>
                      <label htmlFor="home-lastName" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Last Name *</label>
                      <input id="home-lastName" required type="text" value={formData.lastName} onChange={e => setFormData(p => ({...p, lastName: e.target.value}))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] bg-white transition-colors" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="home-school" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">School / Organisation *</label>
                    <input id="home-school" required type="text" value={formData.school} onChange={e => setFormData(p => ({...p, school: e.target.value}))}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] bg-white transition-colors" placeholder="Westfield Academy" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="home-email" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                    <input id="home-email" required type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] bg-white transition-colors" placeholder="j.smith@school.ac.uk" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="home-role" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Your Role</label>
                      <select id="home-role" value={formData.role} onChange={e => setFormData(p => ({...p, role: e.target.value}))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] bg-white transition-colors text-gray-700">
                        <option value="">Select role</option>
                        <option>Headteacher / Principal</option>
                        <option>Deputy Headteacher</option>
                        <option>Head of Year</option>
                        <option>Class Teacher</option>
                        <option>School Business Manager</option>
                        <option>IT / Operations</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="home-students" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Number of Students</label>
                      <select id="home-students" value={formData.students} onChange={e => setFormData(p => ({...p, students: e.target.value}))}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] bg-white transition-colors text-gray-700">
                        <option value="">Select size</option>
                        <option>Under 100</option>
                        <option>100-500</option>
                        <option>500-1,000</option>
                        <option>Over 1,000</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="home-message" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message (Optional)</label>
                    <textarea id="home-message" value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))} rows={3}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] bg-white transition-colors resize-none"
                      placeholder="Tell us about your school's current phone policy or any questions you have…" />
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    By submitting this form you agree to our <Link href="/privacy" className="underline hover:text-[#f95555]">Privacy Policy</Link>. We will never share your data with third parties.
                  </p>
                  <button type="submit"
                    className="w-full bg-[#f95555] text-white font-bold py-3.5 rounded-lg hover:bg-[#e04444] transition-colors text-sm shadow-lg shadow-black/20"
                    style={{ fontFamily: "'Cabin', sans-serif" }}
                  >
                    Send Request
                  </button>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Portal callout */}
      <section className="py-14 bg-[#111111]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8B73FF]/20 flex items-center justify-center flex-shrink-0">
                <KeyRound size={22} className="text-[#8B73FF]" aria-hidden="true" />
              </div>
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: "'Cabin', sans-serif" }}>Already a Generation Faraday school?</div>
                <div className="text-gray-400 text-sm">Access your implementation guides, training videos, compliance data, and support team.</div>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/customer-portal"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-5 py-2.5 rounded hover:border-white/40 hover:bg-white/5 transition-colors text-sm"
              >
                Learn more
              </Link>
              <a href="#"
                className="inline-flex items-center gap-2 bg-[#8B73FF] text-white font-bold px-5 py-2.5 rounded hover:bg-[#7B63EF] transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                <KeyRound size={14} aria-hidden="true" />
                Customer Login
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
