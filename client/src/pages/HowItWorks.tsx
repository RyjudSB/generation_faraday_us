/* =============================================================
   How It Works - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Clock, BarChart3, Users, Zap, BookOpen, Smartphone, Lock } from "lucide-react";
import { Link } from "wouter";

const STEP_IMGS = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421755905/3YCXv4tdieCm7bVuJSQHVg/hiw-v2-step1-572dCGHXaT6d7FnK9FkECt.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421755905/3YCXv4tdieCm7bVuJSQHVg/hiw-v2-step2-56ZPGLskZocwCjaciUx4TQ.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421755905/3YCXv4tdieCm7bVuJSQHVg/hiw-v2-step3-NXfz3xJXoCTTgPWgh9zjv9.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663421755905/3YCXv4tdieCm7bVuJSQHVg/hiw-v2-step4-QMY633Mi6voE3nBhMZEP3n.webp",
];

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

const STEP_ICONS = [Smartphone, BookOpen, Lock, BarChart3];

const STEPS = [
  {
    num: "01",
    title: "Bag Up",
    desc: "At the start of class - or at the school gate - students place their phone inside the Generation Faraday bag. All wireless signals are instantly blocked the moment the bag is closed. No app required, no Wi-Fi needed. It just works.",
    detail: "The bag's reinforced Faraday liner creates a complete electromagnetic shield. WiFi, 4G/5G, Bluetooth, and NFC signals cannot pass through - in either direction.",
  },
  {
    num: "02",
    title: "Focus",
    desc: "With zero notifications, zero buzzing, and zero temptation, students are fully present. They engage with classmates, participate in discussions, and absorb lessons without the cognitive drain of a device nearby.",
    detail: "Research from the London School of Economics found that banning phones in schools improved test scores by 6.4% of a standard deviation overall \u2014 and by 14.23% for the most disadvantaged students.",
    detailHref: "https://cep.lse.ac.uk/pubs/download/dp1350.pdf",
  },
  {
    num: "03",
    title: "Access",
    desc: "Between classes, at break, and at lunch, students access their devices freely. In an emergency, the bag opens instantly - no unlock station, no special tools, no waiting.",
    detail: "Unlike Yondr and similar locking-only pouches, Generation Faraday bags do not require a centralised unlock station. Students always have immediate access when needed.",
  },
  {
    num: "04",
    title: "Track",
    desc: "The Generation Faraday App lets administrators track bag assignments by student, monitor compliance across classrooms, and manage enforcement from a single dashboard - without disrupting the school day.",
    detail: "Each bag is serialised with a unique ID. Scan any bag to instantly see which student it belongs to, its compliance history, and whether it has been flagged as lost or damaged.",
  },
];

const BENEFITS = [
  { icon: Clock, title: "Reduce the Enforcement Burden", desc: "UK schools with restrictive phone policies spend over 100 hours per week managing phone use, equivalent to three full-time staff members (University of Birmingham SMART Schools Study, 2026). Signal-blocking removes that burden entirely." },
  { icon: BookOpen, title: "Improved Academic Performance", desc: "Removing the constant lure of smartphones leads to higher retention, improved test scores, and better overall academic outcomes - backed by peer-reviewed research." },
  { icon: Shield, title: "Reduced Cyberbullying", desc: "Signal-blocked devices mean students cannot coordinate disruptions or engage in cyberbullying during school hours, creating a more respectful environment." },
  { icon: Users, title: "Better Social Interaction", desc: "Without phones as a social crutch, students engage more meaningfully with peers - improving communication skills and reducing social anxiety." },
  { icon: Zap, title: "Effortless Policy Enforcement", desc: "No more repeated reminders or manual collection. The bag system makes compliance the path of least resistance for students and staff alike." },
  { icon: BarChart3, title: "Whole-School Accountability", desc: "The app provides school leadership with real-time visibility across every classroom - making it easy to identify non-compliance and demonstrate policy effectiveness." },
];

export default function HowItWorks() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const stepsSection = useFadeUp(0.05);
  const benefitsSection = useFadeUp(0.1);
  const policySection = useFadeUp(0.1);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">How It Works</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Simple. Effective.<br /><span className="text-[#8B73FF]">Proven.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              No complicated setup. No unlock stations. No disruption to your school day. Generation Faraday integrates seamlessly into existing routines in four straightforward steps.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20" ref={stepsSection.ref}>
        <div className="container">
          <div className="flex flex-col gap-20">
            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-600 ${stepsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="text-5xl font-extrabold text-[#EEE9FF]" style={{ fontFamily: "'Cabin', sans-serif" }}>{step.num}</div>
                    <div className="w-10 h-10 rounded-xl bg-[#f95555] flex items-center justify-center">
                      {(() => { const Icon = STEP_ICONS[idx]; return <Icon size={18} className="text-white" />; })()}
                    </div>
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>{step.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{step.desc}</p>
                  <div className="bg-[#F7F6FF] border-l-4 border-[#f95555] pl-4 py-3 rounded-r-lg">
                    <p className="text-sm text-[#f95555] leading-relaxed">{step.detail}</p>
                    {(step as any).detailHref && (
                      <a href={(step as any).detailHref} target="_blank" rel="noopener noreferrer" className="text-xs text-[#f95555]/60 font-semibold mt-1.5 block hover:text-[#f95555] underline underline-offset-1 transition-colors">View source ↗</a>
                    )}
                  </div>
                </div>
                <div className={`${idx % 2 === 1 ? "lg:order-1" : ""} rounded-2xl overflow-hidden`}>
                  <img
                    src={STEP_IMGS[idx]}
                    alt={step.title}
                    className="w-full h-auto object-cover rounded-2xl"
                    style={{ aspectRatio: '3/2' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#F7F7F8]" ref={benefitsSection.ref}>
        <div className="container">
          <div className={`text-center mb-14 transition-all duration-500 ${benefitsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Why It Matters</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              The measurable impact of<br />phone-free learning.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, idx) => (
              <div
                key={b.title}
                className={`bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#f95555]/20 hover:shadow-md transition-all duration-300 ${benefitsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEE9FF] flex items-center justify-center mb-4">
                  <b.icon size={18} className="text-[#f95555]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2 text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy context */}
      <section className="py-20 bg-[#111111]" ref={policySection.ref}>
        <div className="container">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-600 ${policySection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="section-label text-[#C4B8FF] mb-4">UK Policy Context</div>
              <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Cabin', sans-serif" }}>
                The DfE has spoken.<br /><span className="text-[#8B73FF]">Now enforce it.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                The <a href="https://www.gov.uk/government/publications/mobile-phones-in-schools" target="_blank" rel="noopener noreferrer" className="text-[#8B73FF] underline hover:no-underline">Department for Education's guidance on mobile phones in schools</a> is clear: schools must have robust, enforceable policies. But guidance without enforcement is just a rule on paper. Generation Faraday provides the technology to make that policy a reality every single day.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Fully aligned with DfE mobile phone guidance",
                  "Supports Ofsted inspection evidence on behaviour and culture",
                  "Helps schools demonstrate a clear, consistent phone policy",
                  "Reduces the burden on individual teachers to enforce rules",
                  "Provides data and reporting to share with governors and parents",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 size={14} className="text-[#8B73FF] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/request-quote"
                className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-6 py-3 rounded hover:bg-red-50 transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                Get Started with Your School <ArrowRight size={15} />
              </Link>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <blockquote className="text-lg text-white leading-relaxed italic mb-6">
                "The implementation of Generation Faraday's signal-blocking pouches on our secondary campuses has been surprisingly smooth. It's just a few days in and we are already seeing a positive impact on instruction and the overall learning environment."
              </blockquote>
              <div className="border-t border-white/10 pt-4">
                <div className="font-bold text-white text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>Dr. Suzy Lofton-Bullis</div>
                <div className="text-gray-400 text-xs">Deputy Superintendent, Lago Vista ISD</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F7F7F8]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Ready to see it in action?
          </h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Request a free sample bag for your school, or speak directly with our UK specialist team.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/request-quote"
              className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Request Free Sample <ArrowRight size={15} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-[#f95555] text-[#f95555] font-bold px-7 py-3.5 rounded hover:bg-[#EEE9FF] transition-colors text-sm"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Speak to a Specialist <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
