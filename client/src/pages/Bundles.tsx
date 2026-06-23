/* =============================================================
   Bundles Page - Generation Faraday UK
   School size slider (100-4000+) with dynamic bundle calculator.
   ============================================================= */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Package, Zap, Smartphone, CheckCircle2, Info,
  ChevronRight, Users, ShieldCheck, ArrowRight, Star,
} from "lucide-react";
import RFIDIcon from "../components/RFIDIcon";

/* ── Signal blocking badge component ─────────────────────── */
function SignalBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#EEE9FF] text-[#7B5EA7] text-xs font-bold px-2 py-0.5 rounded-full">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="1" y1="1" x2="23" y2="23"/>
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
        <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
      </svg>
      {label} Blocked
    </span>
  );
}

/* ── Bundle presets ───────────────────────────────────────── */
const PRESETS = [
  { label: "Small Secondary",   icon: "🏫", value: 450,  desc: "~450 students" },
  { label: "Comprehensive",     icon: "🏫", value: 900,  desc: "~900 students" },
  { label: "Large Comprehensive", icon: "🏫", value: 1400, desc: "~1,400 students" },
  { label: "Academy",           icon: "🏫", value: 2000, desc: "~2,000 students" },
];

function getPreset(students: number) {
  if (students <= 675)  return PRESETS[0];
  if (students <= 1150) return PRESETS[1];
  if (students <= 1700) return PRESETS[2];
  return PRESETS[3];
}

function calcBundle(students: number) {
  const bags       = Math.ceil(students * 1.1);
  const spares     = bags - students;
  const docks      = Math.max(2, Math.ceil(students / 150));
  const handHeld   = Math.max(1, Math.ceil(students / 30));
  const bins       = Math.max(2, Math.ceil(students / 200) * 2);
  return { bags, docks, handHeld, bins, spares };
}

const SLIDER_MAX = 4000;

/* ── Main component ───────────────────────────────────────── */
export default function Bundles() {
  const [students, setStudents] = useState(500);
  const [customInput, setCustomInput] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const bundle  = calcBundle(students);
  const preset  = getPreset(students);
  const isLarge = students > SLIDER_MAX;

  function handleCustomInput(val: string) {
    setCustomInput(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 100) setStudents(n);
  }

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="bg-[#111111] py-20 lg:py-24">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Complete School Systems</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Bundle Builder<br />
              <span className="text-[#f95555]">for your school</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Generation Faraday is a complete technology ecosystem — bags, docks, keys, classroom bins, and the app — all working together.
              Use the slider below to build a suggested system for your school size. The GF App with RFID tracking is always included at no extra charge.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["WiFi Blocked", "4G/5G Blocked", "Bluetooth Blocked", "NFC Blocked"].map((s) => (
                <SignalBadge key={s} label={s.replace(" Blocked", "")} />
              ))}
              <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">
                <RFIDIcon size={11} /> RFID in every bag
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <Info size={16} />
              <span>All quantities are suggestions only — every school is different.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── "We meet you where you are" band ──────────────── */}
      <div className="bg-[#f95555] py-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-white font-bold text-sm">
              Already have a phone policy? Good — we work with it.
              Generation Faraday meets you where you are.
            </p>
            <Link href="/implementation" className="flex-shrink-0 bg-white text-[#f95555] text-xs font-bold px-4 py-2 rounded-full hover:bg-red-50 transition-colors whitespace-nowrap">
              See all implementation styles →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Preset badges ──────────────────────────────────── */}
      <section className="bg-[#F7F7F8] border-b border-gray-200 py-6">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
            {PRESETS.map((p) => {
              const active = getPreset(students).label === p.label && !isLarge;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => { setStudents(p.value); setCustomInput(""); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                    active
                      ? "bg-[#f95555] border-[#f95555] text-white shadow-md scale-105"
                      : "bg-white border-gray-200 text-gray-600 hover:border-[#f95555] hover:text-[#f95555]"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                  <span className={`text-xs ${active ? "text-red-100" : "text-gray-400"}`}>{p.desc}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => { setStudents(4000); setCustomInput(""); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                isLarge
                  ? "bg-[#f95555] border-[#f95555] text-white shadow-md scale-105"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#f95555] hover:text-[#f95555]"
              }`}
            >
              <span>🏙️</span>
              <span>Multi-Academy Trust</span>
              <span className={`text-xs ${isLarge ? "text-red-100" : "text-gray-400"}`}>4,000+</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Slider + live bundle ───────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">

            {/* Slider card */}
            <div className="bg-white rounded-3xl border-2 border-[#f95555]/20 shadow-xl p-8 mb-10">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">School size</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
                      {students.toLocaleString()}
                    </span>
                    <span className="text-xl text-gray-400 font-semibold">students</span>
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 bg-[#f95555]/10 text-[#f95555] px-3 py-1 rounded-full text-xs font-bold">
                    <Star size={10} fill="currentColor" />
                    {preset.icon} {preset.label}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end text-right">
                  <div className="text-xs text-gray-400 font-medium">Bags required</div>
                  <div className="text-3xl font-extrabold text-[#f95555]">{bundle.bags.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">(incl. {bundle.spares} spare bags)</div>
                </div>
              </div>

              <input
                type="range"
                min={100}
                max={SLIDER_MAX}
                step={25}
                value={Math.min(students, SLIDER_MAX)}
                onChange={(e) => { setStudents(Number(e.target.value)); setCustomInput(""); }}
                className="w-full accent-[#f95555] h-2 cursor-pointer"
                aria-label="Number of students"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium mb-5">
                <span>100</span>
                <span>1,000</span>
                <span>2,000</span>
                <span>3,000</span>
                <span>4,000</span>
              </div>

              {/* Custom input for large schools */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">More than 4,000 students? Enter exact count:</span>
                <input
                  type="number"
                  min={4001}
                  placeholder="e.g. 5000"
                  value={customInput}
                  onChange={(e) => handleCustomInput(e.target.value)}
                  className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors"
                />
                {isLarge && (
                  <span className="text-xs text-emerald-600 font-bold">✓ Showing bundle for {students.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Signal blocking banner */}
            <div className="rounded-2xl bg-[#0A0A0A] border border-white/5 p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Every bag blocks:</span>
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
                    {sig}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <RFIDIcon size={14} />
                <span>RFID chip in every bag — scanned by GF App</span>
              </div>
            </div>

            {/* Bundle grid — with real photos */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

              {/* Bags */}
              <PhotoBundleCard
                img="https://generationfaraday.com/wp-content/uploads/2025/02/GF-Max-Lock-F-1.jpg"
                qty={bundle.bags}
                unit="Faraday Bags"
                sub={`${students.toLocaleString()} student bags + ${bundle.spares} spares`}
                bullets={[
                  "RFID chip in every bag",
                  "Choice of MAX LOCK or standard",
                  "Custom school branding available",
                  "Fits all modern smartphones",
                ]}
                rfid
                signals
                accent="red"
              />

              {/* Unlocking docks */}
              <PhotoBundleCard
                img="https://generationfaraday.com/wp-content/uploads/2025/04/Unlock-Dock-Podium1.jpg"
                qty={bundle.docks}
                unit="Unlocking Docks"
                sub="For school entrances / exits"
                bullets={[
                  "Magnetic release — no batteries",
                  "Handles all locking bags",
                  "Fixed at school entry points",
                  "MAX LOCK bags only",
                ]}
                accent="amber"
              />

              {/* Hand-held docks */}
              <PhotoBundleCard
                img="https://generationfaraday.com/wp-content/uploads/2025/04/Handheld-Unlock-Dock1.jpg"
                qty={bundle.handHeld}
                unit="Hand-Held Unlock Docs"
                sub="1 per class group (1 per 30 students)"
                bullets={[
                  "One per form / class teacher",
                  "Portable — always to hand",
                  "Emergency / pastoral use",
                  "Same magnetic release",
                ]}
                accent="purple"
              />

              {/* Unlocking keys */}
              <PhotoBundleCard
                img="https://generationfaraday.com/wp-content/uploads/2025/11/Generation-Faraday-Unlocking-Key1.jpg"
                qty={Math.max(2, Math.ceil(students / 60))}
                unit="Unlocking Key + Lanyards"
                sub="For senior staff & form tutors"
                bullets={[
                  "Worn on teacher lanyard",
                  "Discreet & always available",
                  "No batteries or charging",
                  "Backup to dock system",
                ]}
                accent="sky"
              />

              {/* Collection Bins */}
              <PhotoBundleCard
                img="https://generationfaraday.com/wp-content/uploads/2025/02/Generation-Faraday-Class-Phone-Organizer-1-1.jpg"
                qty={bundle.bins}
                unit="Classroom Collection Bins"
                sub="Labelled storage per classroom"
                bullets={[
                  "Numbered per student",
                  "Sits on teacher's desk",
                  "Keeps bags organised at scale",
                  "Labelled by class or year",
                ]}
                accent="teal"
              />

              {/* App + RFID */}
              <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                <div className="bg-gradient-to-br from-[#8B73FF]/20 to-emerald-500/10 p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <Smartphone size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Always included</div>
                      <div className="text-white font-extrabold text-base" style={{ fontFamily: "'Cabin', sans-serif" }}>GF App + RFID</div>
                    </div>
                    <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">Free</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4 bg-[#8B73FF]/10 rounded-xl p-3">
                    <RFIDIcon size={20} className="text-[#8B73FF] flex-shrink-0" />
                    <div className="text-xs text-[#C4B8FF] leading-snug">
                      <span className="font-bold">RFID chip in every bag</span> — scanned by GF App in under 1 second per room.
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Live compliance dashboard",
                      "Auto-generated Ofsted reports",
                      "Bag scan at registration",
                      "Parent notification option",
                    ].map((b) => (
                      <div key={b} className="flex items-start gap-2 text-xs text-gray-400">
                        <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-5 py-3 border-t border-white/5">
                  <Link href="/app" className="text-xs text-[#8B73FF] font-semibold hover:text-[#C4B8FF] transition-colors flex items-center gap-1">
                    Explore the GF App <ChevronRight size={12} />
                  </Link>
                </div>
              </div>

            </div>

            {/* Summary bar */}
            <div className="bg-[#F7F7F8] rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Suggested bundle for {students.toLocaleString()} students
                </div>
                <div className="text-sm text-gray-700 font-medium flex flex-wrap gap-x-3 gap-y-1">
                  <span>{bundle.bags.toLocaleString()} bags</span>
                  <span className="text-gray-300">·</span>
                  <span>{bundle.docks} unlock docks</span>
                  <span className="text-gray-300">·</span>
                  <span>{bundle.handHeld} hand-held units</span>
                  <span className="text-gray-300">·</span>
                  <span>{bundle.bins} bins</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-emerald-600 font-semibold">App included</span>
                </div>
              </div>
              <Link
                href="/request-quote"
                className="bg-[#f95555] text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#e04444] transition-colors whitespace-nowrap flex items-center gap-2"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                Get a Quote for This Bundle
                <ChevronRight size={16} />
              </Link>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center flex items-center justify-center gap-1">
              <Info size={11} />
              All bundle quantities are indicative suggestions. Your local representative will tailor the exact specification to your school.
            </p>
          </div>
        </div>
      </section>

      {/* ── We meet you where you are ────────────────────── */}
      <section className="py-16 bg-[#111111]">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[#f95555]/10 border border-[#f95555]/20 rounded-full px-4 py-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#f95555] animate-pulse" />
                <span className="text-[#f95555] text-xs font-bold tracking-widest uppercase">Flexible Implementation</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
                We meet you where you are.
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Already have a phone policy? Good — we work with it.
                Starting from scratch? We've done it hundreds of times.
                Whether you want a soft rollout, a hard day-one enforcement, or a classroom-by-classroom
                approach, Generation Faraday fits around your school — not the other way around.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {[
                {
                  title: "Full school, day one",
                  desc: "Every student receives a bag on the same day. The lock system activates immediately. Clear, consistent, and the most effective approach.",
                  tag: "Most common",
                  colour: "border-[#f95555]",
                },
                {
                  title: "Year group rollout",
                  desc: "Start with Year 7 or A-Level groups. Build confidence, refine the process, and expand year by year. Comfortable for schools new to enforcement.",
                  tag: "Gradual",
                  colour: "border-amber-500",
                },
                {
                  title: "Classroom-led",
                  desc: "Each department adopts the system at its own pace. Use individual bags or the classroom organiser. Your department leads manage their own rollout.",
                  tag: "Flexible",
                  colour: "border-purple-500",
                },
                {
                  title: "Bags only",
                  desc: "Start with signal-blocking bags and no locks. Students manage their own phones. Add locks and docks later when you're ready for greater enforcement.",
                  tag: "Entry level",
                  colour: "border-sky-500",
                },
                {
                  title: "Organisers + bags",
                  desc: "Use classroom phone organisers for centralised collection during lessons, with individual bags for break and travel time.",
                  tag: "Hybrid",
                  colour: "border-emerald-500",
                },
                {
                  title: "Already using Yondr?",
                  desc: "Switch is straightforward. We offer like-for-like comparisons, can match your current process, and provide a free sample period so staff can compare directly.",
                  tag: "Switching schools",
                  colour: "border-gray-500",
                },
              ].map((s) => (
                <div key={s.title} className={`bg-[#161616] rounded-2xl border-l-4 ${s.colour} p-5 border border-white/5`}>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${s.colour.replace("border-", "text-")}`}>{s.tag}</div>
                  <div className="font-extrabold text-white text-sm mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{s.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/implementation"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors text-sm"
              >
                Full Implementation Guide <ArrowRight size={14} />
              </Link>
              <p className="text-gray-600 text-xs mt-3">5-step rollout plan, staff training templates, parent letter templates and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Typical school day ───────────────────────────── */}
      <section className="py-16 bg-[#F7F7F8]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="section-label mb-2">School Day Workflow</div>
              <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
                A typical day with Generation Faraday
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Shown here for a full-school rollout with MAX LOCK bags. Adjust to match your implementation style —{" "}
                <Link href="/implementation" className="text-[#f95555] font-semibold hover:underline">
                  see all styles in the guide.
                </Link>
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#f95555] via-purple-400 to-emerald-400 hidden md:block" />
              <div className="space-y-6">
                {[
                  {
                    step: "1", time: "Morning arrival",
                    title: "Students bag their phones",
                    body: "Each student places their phone in their named Faraday bag and seals it. MAX LOCK bags engage automatically on closure.",
                    style: "Works with: full-school, year-group, classroom-led rollouts",
                    colour: "bg-[#f95555] text-white",
                  },
                  {
                    step: "2", time: "Registration",
                    title: "Staff scan RFID with the app",
                    body: "Using the GF App, a staff member scans the room in under 5 seconds. The app flags exactly who has complied and who hasn't — no manual register.",
                    style: "Works with: any style using individual bags",
                    colour: "bg-purple-500 text-white",
                  },
                  {
                    step: "3", time: "Throughout the day",
                    title: "Bags stay in classroom bins",
                    body: "Collection bins hold bags in each classroom. No signal passes through. Students focus. Teachers teach. No hidden phone access possible with MAX LOCK.",
                    style: "Works with: bags-only, bags + organiser, classroom-led",
                    colour: "bg-sky-500 text-white",
                  },
                  {
                    step: "4", time: "End of day",
                    title: "Unlock dock releases phones",
                    body: "Students pass the fixed unlock dock at the exit — MAX LOCK releases in under 1 second. Hand-held units are used by staff on duty for any roaming unlocks.",
                    style: "Works with: full-school MAX LOCK rollouts",
                    colour: "bg-amber-500 text-black",
                  },
                  {
                    step: "5", time: "Reporting",
                    title: "Compliance report generated",
                    body: "The GF App logs attendance and compliance for every session. SLT receive a daily summary. All data is retained for policy audits and Ofsted evidence.",
                    style: "Works with: all implementation styles",
                    colour: "bg-emerald-500 text-white",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-6 md:pl-16">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-extrabold text-lg z-10 ${s.colour}`} style={{ fontFamily: "'Cabin', sans-serif" }}>
                      {s.step}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-100">
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{s.time}</div>
                      <div className="font-extrabold text-[#111111] text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{s.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed mb-2">{s.body}</div>
                      <div className="text-xs text-[#f95555] font-semibold">{s.style}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/implementation" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Read the full implementation guide <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why bundles ─────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="section-label mb-2">Complete System</div>
              <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Why a bundle?</h2>
              <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
                A single Faraday bag is a product. A bundle with docks, an app, and RFID tracking is a school policy.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { Icon: Users, colour: "text-[#f95555]", title: "Scales to your school", body: "From a small secondary of 300 to a Multi-Academy Trust of 4,000+ — the system scales with no change in how staff operate it." },
                { Icon: Zap, colour: "text-amber-500", title: "Lock + unlock in seconds", body: "Unlocking docks at entrances mean students get phones back at end of day in under 3 seconds each. No queues." },
                { Icon: RFIDIcon, colour: "text-purple-500", title: "RFID = instant compliance", body: "Every bag has a chip. A room scan takes under a second. The app tells you exactly who is compliant and who isn't." },
                { Icon: Smartphone, colour: "text-emerald-500", title: "App included — always", body: "GF App usage is included in every bundle. Compliance reports, live dashboards, parent notifications." },
                { Icon: ShieldCheck, colour: "text-sky-500", title: "Mission Darkness tech", body: "Every bag uses MOS Equipment's Mission Darkness shielding — trusted by UK MOD, police, and investigative agencies." },
                { Icon: Package, colour: "text-gray-500", title: "Spare bags included", body: "Every bundle includes a 10% float of spare bags for damaged, lost, or new-intake students. No frantic re-ordering." },
              ].map((c) => (
                <div key={c.title} className="bg-[#F7F7F8] rounded-2xl p-6">
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 border border-gray-100`}>
                    <c.Icon size={20} className={c.colour} />
                  </div>
                  <div className="font-extrabold text-[#111111] mb-1.5 text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{c.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#111111]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-bold text-[#C4B8FF] uppercase tracking-widest mb-4">Ready to get started?</div>
            <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Let us build the right bundle for your school.
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Contact Andover Forensics — your local UK representative — for a free consultation and tailored quote.
              Free sample bags available before any commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-quote" className="bg-[#f95555] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Request a Free Sample
              </Link>
              <Link href="/contact" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:border-white/50 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Talk to a Representative
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

/* ── Photo bundle card component ────────────────────────── */
function PhotoBundleCard({
  img, qty, unit, sub, bullets, rfid = false, signals = false, accent,
}: {
  img: string;
  qty: number;
  unit: string;
  sub: string;
  bullets: string[];
  rfid?: boolean;
  signals?: boolean;
  accent: "red" | "amber" | "purple" | "sky" | "teal";
}) {
  const accentMap = {
    red:    { text: "text-[#f95555]", border: "border-[#f95555]", bg: "bg-[#FFF0F0]" },
    amber:  { text: "text-amber-500",  border: "border-amber-400",  bg: "bg-amber-50" },
    purple: { text: "text-purple-500", border: "border-purple-400", bg: "bg-purple-50" },
    sky:    { text: "text-sky-500",    border: "border-sky-400",    bg: "bg-sky-50" },
    teal:   { text: "text-teal-500",   border: "border-teal-400",   bg: "bg-teal-50" },
  };
  const a = accentMap[accent];

  return (
    <div className={`bg-white rounded-2xl border-2 ${a.border} overflow-hidden flex flex-col`}>
      {/* Photo */}
      <div className="h-44 bg-white flex items-center justify-center p-3 border-b border-gray-100">
        <img
          src={img}
          alt={unit}
          className="h-full w-full object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="font-extrabold text-[#111111] text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{unit}</div>
            <div className="text-xs text-gray-400">{sub}</div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-extrabold ${a.text}`} style={{ fontFamily: "'Cabin', sans-serif" }}>{qty.toLocaleString()}</div>
            <div className="text-xs text-gray-400 -mt-0.5">units</div>
          </div>
        </div>
        {(rfid || signals) && (
          <div className="flex flex-wrap gap-1 mb-3">
            {rfid && (
              <span className={`inline-flex items-center gap-1 ${a.bg} ${a.text} text-xs font-bold px-2 py-0.5 rounded-full`}>
                <RFIDIcon size={10} /> RFID inside
              </span>
            )}
            {signals && ["WiFi", "4G/5G", "BT", "NFC"].map((s) => (
              <span key={s} className="inline-flex items-center gap-1 bg-[#EEE9FF] text-[#7B5EA7] text-xs font-bold px-1.5 py-0.5 rounded-full">
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="1" y1="1" x2="23" y2="23"/>
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                  <line x1="12" y1="20" x2="12.01" y2="20"/>
                </svg>
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="space-y-1.5 mt-auto">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 text-xs text-gray-500">
              <CheckCircle2 size={11} className={`${a.text} flex-shrink-0 mt-0.5`} />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
