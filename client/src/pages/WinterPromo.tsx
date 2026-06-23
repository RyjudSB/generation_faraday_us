/* =============================================================
   Winter 2026 School Promotion - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Gift, Tag } from "lucide-react";
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

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const OFFER_INCLUDES = [
  "10% discount on all bag orders placed before 31 March 2026",
  "Free Unlock Dock (worth £120) with orders of 200+ bags",
  "Free UK delivery on all orders",
  "Priority implementation support from our UK team",
  "Extended 24-month warranty on all bags ordered during the promotion",
  "Free staff training session (remote, up to 60 minutes)",
];

const FAQS = [
  {
    q: "When does the Winter 2026 promotion end?",
    a: "The promotion runs until 31 March 2026. Orders must be placed and confirmed before midnight on 31 March 2026 to qualify.",
  },
  {
    q: "Does the discount apply to replacement bags?",
    a: "The 10% discount applies to new orders only. Replacement bag orders are not eligible for the promotional discount.",
  },
  {
    q: "How do I claim the free Unlock Dock?",
    a: "The free Unlock Dock is automatically included with qualifying orders of 200 or more bags. No discount code is required. It will be added to your order automatically.",
  },
  {
    q: "Can I combine this offer with other discounts?",
    a: "The Winter 2026 promotion cannot be combined with other promotional discounts. Volume pricing and MAT pricing are available separately. Contact our UK team to discuss the best option for your school.",
  },
  {
    q: "Is there a minimum order quantity?",
    a: "There is no minimum order quantity for the 10% discount. The free Unlock Dock applies to orders of 200 or more bags.",
  },
];

export default function WinterPromo() {
  const [heroVisible, setHeroVisible] = useState(false);
  const offerSection = useFadeUp(0.1);
  const faqSection = useFadeUp(0.1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const deadline = new Date("2026-03-31T23:59:59");
  const countdown = useCountdown(deadline);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f95555]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#f95555]/5 blur-3xl pointer-events-none" />
        <div className="container relative">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#f95555] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Limited Time Offer</span>
              <div className="section-label text-[#C4B8FF]">Winter 2026 Promotion</div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              10% off all orders.<br /><span className="text-[#f95555]">Until 31 March 2026.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-10">
              Start the new term with a phone-free school. Order before 31 March 2026 and receive 10% off your entire order, plus a free Unlock Dock with orders of 200 or more bags.
            </p>
            {/* Countdown */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map((unit) => (
                <div key={unit.label} className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-center min-w-[80px]">
                  <div className="text-3xl font-extrabold text-white tabular-nums" style={{ fontFamily: "'Cabin', sans-serif" }}>
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{unit.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/request-quote" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Claim This Offer <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-7 py-3.5 rounded hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Speak to Our UK Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offer details */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]" ref={offerSection.ref}>
        <div className="container">
          <div className={`mb-12 text-center transition-all duration-500 ${offerSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">What's Included</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Everything in the Winter 2026 offer</h2>
          </div>
          <div className={`max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 shadow-sm transition-all duration-500 ${offerSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#EEE9FF] flex items-center justify-center">
                <Gift size={20} className="text-[#f95555]" />
              </div>
              <div>
                <div className="font-extrabold text-[#111111] text-lg" style={{ fontFamily: "'Cabin', sans-serif" }}>Winter 2026 School Promotion</div>
                <div className="text-xs text-[#f95555] font-semibold">Valid until 31 March 2026</div>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {OFFER_INCLUDES.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-[#f95555] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
              <Link href="/request-quote" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded hover:bg-[#e04444] transition-colors text-sm flex-1 justify-center" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Request a Quote <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-bold px-6 py-3 rounded hover:border-[#f95555]/40 hover:text-[#f95555] transition-colors text-sm flex-1 justify-center" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Contact UK Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency banner */}
      <section className="py-8 bg-[#f95555]">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <Clock size={20} />
            <span className="font-bold text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>Offer expires 31 March 2026. Don't miss out</span>
          </div>
          <Link href="/request-quote" className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-5 py-2.5 rounded hover:bg-red-50 transition-colors text-sm whitespace-nowrap" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Get Your Quote Now <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-white" ref={faqSection.ref}>
        <div className="container max-w-3xl">
          <div className={`mb-10 transition-all duration-500 ${faqSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">FAQ</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Common questions about the offer</h2>
          </div>
          <div className={`flex flex-col gap-2 transition-all duration-500 ${faqSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between font-semibold text-[#111111] hover:bg-gray-50 transition-colors text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                  aria-expanded={openFaq === idx}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.q}
                  <span className={`text-[#f95555] transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === idx ? "rotate-180" : ""}`} aria-hidden="true">▾</span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#111111]">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tag size={18} className="text-[#f95555]" />
            <span className="text-[#f95555] font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Cabin', sans-serif" }}>10% Off - Ends 31 March 2026</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Ready to go phone-free this term?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm">Request a quote today and our UK team will get back to you within one working day.</p>
          <Link href="/request-quote" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-8 py-4 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Claim Your 10% Discount <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
