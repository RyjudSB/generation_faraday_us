/* =============================================================
   About Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP";
const HERO_IMG    = `${CDN}/hero_54a6bf1f.webp`;
const FANNED_IMG  = `${CDN}/fanned-bags_2d3f8a28.webp`;

const PARTNER_LOGOS = [
  { src: `${CDN}/lago-vista_53f23a7c.png`,    alt: "Lago Vista ISD" },
  { src: `${CDN}/sierra-sands_d27a2ac1.png`, alt: "Sierra Sands Unified" },
  { src: `${CDN}/oceanside_995b7f29.png`,    alt: "Oceanside Unified" },
  { src: `${CDN}/compton_4b3e1114.png`,      alt: "Compton USD" },
  { src: `${CDN}/umatilla_9d4ebea6.png`,    alt: "Umatilla School District" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/sentinels_bd53b69b.png", alt: "Sentinels" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/urban-assembly-green-school_7e610b71.png", alt: "Urban Assembly Green School" },
];

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

const VALUES = [
  { title: "Evidence-Led", desc: "Every product decision is grounded in research. We don't make claims we can't back up - from signal-blocking performance to durability cycle testing." },
  { title: "Built for Schools", desc: "We've spent years working directly with school leaders, teachers, and students to understand what works in practice - not just in theory." },
  { title: "Honest About Trade-Offs", desc: "No solution is perfect for every school. We'll tell you when our product isn't the right fit - and help you find one that is." },
  { title: "Long-Term Partners", desc: "We don't disappear after the sale. Our UK team provides ongoing implementation support, training, and app updates throughout your programme." },
];

export default function About() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const missionSection = useFadeUp(0.1);
  const valuesSection = useFadeUp(0.1);
  const partnersSection = useFadeUp(0.1);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-[#111111] py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="container relative z-10">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">About Us</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Helping students<br /><span className="text-[#8B73FF]">focus and thrive.</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Generation Faraday was founded on a simple conviction: the smartphone epidemic in schools is solvable - and the solution doesn't have to be complicated, expensive, or disruptive.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20" ref={missionSection.ref}>
        <div className="container">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-600 ${missionSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <div className="section-label mb-4">Our Mission</div>
              <h2 className="text-4xl font-extrabold text-[#111111] mb-5" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Restoring the conditions<br />for genuine learning.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Generation Faraday is a product of MOS Equipment - a company with deep roots in signal-blocking technology for law enforcement, military, and government applications. We took that same rigorous engineering and applied it to one of the most pressing challenges in modern education.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our bags aren't just phone pouches. They're the physical embodiment of a school's commitment to focused, distraction-free learning. When a student places their phone in a Generation Faraday bag, they're not just following a rule - they're entering a different kind of environment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We launched in the United States and have since partnered with schools and districts across the country. Now we're bringing that experience, and that technology, to the United Kingdom.
              </p>
              <Link href="/request-quote"
                className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded hover:bg-[#e04444] transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                Get in Touch <ArrowRight size={15} />
              </Link>
            </div>
            <div>
              <img src={FANNED_IMG} alt="Generation Faraday bags" className="rounded-2xl w-full object-contain bg-gray-50 p-4" style={{ maxHeight: "400px" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Darkness */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Manufacturing Partner</span>
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Powered by<br /><span className="text-amber-400">Mission Darkness.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Generation Faraday bags are manufactured by MOS Equipment — the company behind the Mission Darkness brand, the world's most trusted name in Faraday shielding for law enforcement, military, and government applications.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                The same signal-blocking technology used by UK police forces, the Ministry of Defence, and government investigative agencies is in every Generation Faraday school bag. When a student places their phone inside, it's protected by the same materials and manufacturing standards trusted by national security professionals.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "UK MOD", desc: "Ministry of Defence approved" },
                  { label: "UK Police", desc: "Used by forces nationwide" },
                  { label: "Investigative Agencies", desc: "Every UK agency that conducts investigations" },
                  { label: "Military Grade", desc: "Same tech — adapted for schools" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-amber-400 font-bold text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.label}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://missiondarkness.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-amber-400/30 text-amber-400 font-semibold px-5 py-2.5 rounded hover:bg-amber-400/10 transition-colors text-sm"
              >
                Learn about Mission Darkness →
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#161616] rounded-2xl p-8 border border-white/10">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">Trust credentials</div>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "🛡️", title: "Lab-tested & certified", desc: "Every bag is independently tested to verify 100% signal blocking across all frequencies." },
                    { icon: "🔬", title: "Used in evidence handling", desc: "MOS Equipment Faraday bags are used to preserve digital evidence by UK investigators." },
                    { icon: "🏫", title: "Adapted for education", desc: "Generation Faraday takes Mission Darkness technology and makes it practical for school life." },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="text-xl flex-shrink-0">{item.icon}</div>
                      <div>
                        <div className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.title}</div>
                        <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
                <div className="text-amber-400 font-bold text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>MISSION DARKNESS™</div>
                <div className="text-gray-400 text-xs leading-relaxed">The #1 trusted Faraday brand for law enforcement and government worldwide. Made by MOS Equipment — the same company behind every Generation Faraday product.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F7F7F8]" ref={valuesSection.ref}>
        <div className="container">
          <div className={`text-center mb-14 transition-all duration-500 ${valuesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Our Values</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              How we work.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v, idx) => (
              <div
                key={v.title}
                className={`bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#f95555]/20 hover:shadow-md transition-all duration-300 ${valuesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <h3 className="text-lg font-bold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>{v.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UK expansion */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label text-[#C4B8FF] mb-4">Generation Faraday in the UK</div>
              <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Built for US schools.<br /><span className="text-[#8B73FF]">Ready for UK schools.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The UK government's guidance on mobile phones in schools has created a clear mandate - but enforcement remains inconsistent. We've seen this challenge play out in the US, and we know exactly what schools need to make phone-free policies stick.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Our UK team provides local support, UK-specific implementation guidance, and pricing tailored to British school budgets. We understand the Ofsted framework, the DfE guidance, and the practical realities of UK school life.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "UK-based specialist support team",
                  "Pricing in GBP with UK-standard invoicing",
                  "DfE-aligned implementation guidance",
                  "Free samples available before commitment",
                  "Bulk pricing for whole-school or multi-academy trust rollout",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle2 size={14} className="text-[#8B73FF] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-6">By the numbers</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "3,000+", label: "Cycle durability testing" },
                  { stat: "100%", label: "Signal blocking - guaranteed" },
                  { stat: "100+", label: "Hours/week UK schools spend managing phones (University of Birmingham, 2026)" },
                  { stat: "56%", label: "Of Britons support banning phones in schools (Ipsos, 2026)" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-2xl font-extrabold text-[#8B73FF] mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{s.stat}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* US Team */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-3">Our Team</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              The people behind Generation Faraday.
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
              Our US-based team brings together expertise in education, technology, law enforcement, and school administration.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {[
              { name: "Ryan Judy", title: "Co-Founder & CEO", initials: "RJ", photo: "https://generationfaraday.com/wp-content/uploads/2025/03/Ryan-Bossman.jpg" },
              { name: "Jennifer Andrulewicz", title: "Chief Growth Officer", initials: "JA", photo: "" },
              { name: "Joe Schwartz", title: "Co-Founder & COO", initials: "JS", photo: "https://generationfaraday.com/wp-content/uploads/2025/03/Joe.jpg" },
              { name: "Amanda Benenati", title: "VP Marketing", initials: "AB", photo: "https://generationfaraday.com/wp-content/uploads/2025/03/Amanda.jpg" },
              { name: "Jon Rogstad", title: "Software Lead", initials: "JR", photo: "https://generationfaraday.com/wp-content/uploads/2025/03/Jon.jpg" },
              { name: "Tyler Guynn", title: "Operations Manager", initials: "TG", photo: "https://generationfaraday.com/wp-content/uploads/2025/03/Tyler.jpg" },
              { name: "Kees Schippers", title: "Accounts / Shipping & Logistics", initials: "KS", photo: "https://generationfaraday.com/wp-content/uploads/2025/03/Kees.jpg" },
              { name: "Jamie Baker", title: "Customer Success Manager", initials: "JB", photo: "https://generationfaraday.com/wp-content/uploads/2025/09/Jamie-Baker2.png" },
              { name: "Katelyn Secrist", title: "Account Executive, West", initials: "KS", photo: "https://generationfaraday.com/wp-content/uploads/2026/01/Katelyn.png" },
              { name: "Tracy Kirsch", title: "Account Executive, SE & Gulf", initials: "TK", photo: "https://generationfaraday.com/wp-content/uploads/2026/01/Tracy.png" },
              { name: "Dianne Dunning-Gill", title: "Account Executive, Midwest", initials: "DD", photo: "https://generationfaraday.com/wp-content/uploads/2026/01/Dianne-Dunning-Gill.png" },
              { name: "Melissa Torba", title: "Account Executive, East", initials: "MT", photo: "https://generationfaraday.com/wp-content/uploads/2026/01/Melissa-Torba.png" },
            ].map((member) => (
              <div key={member.name} className="bg-[#F7F7F8] rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 hover:border-[#f95555]/20 hover:shadow-md transition-all duration-300">
                <div className="w-32 h-32 rounded-full bg-[#f95555] flex items-center justify-center mb-3 overflow-hidden">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-white font-bold text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{member.initials}</span>
                  )}
                </div>
                <div className="font-bold text-[#111111] text-sm mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{member.name}</div>
                <div className="text-xs text-gray-500">{member.title}</div>
              </div>
            ))}
          </div>

          {/* UK Team */}
          <div className="border-t border-gray-100 pt-14">
            <div className="text-center mb-10">
              <div className="section-label mb-3">UK Team</div>
              <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Generation Faraday UK.
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                Our UK specialist team is here to support British schools from initial enquiry through to full implementation.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-[#f95555] rounded-2xl p-8 max-w-sm w-full text-center">
                <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-5">
                  <span className="text-white font-bold text-2xl" style={{ fontFamily: "'Cabin', sans-serif" }}>JJ</span>
                </div>
                <div className="font-extrabold text-white text-lg mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>Joe Jouhal</div>
                <div className="text-red-100 text-sm mb-5">UK Country Manager</div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-5 py-2.5 rounded hover:bg-red-50 transition-colors text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white" ref={partnersSection.ref}>
        <div className="container">
          <div className={`text-center mb-10 transition-all duration-500 ${partnersSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Trusted Partners</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Schools and districts that trust Generation Faraday.
            </h2>
          </div>
          <div className={`flex flex-wrap justify-center items-center gap-8 transition-all duration-600 ${partnersSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "100ms" }}>
            {PARTNER_LOGOS.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-12 max-w-[8rem] object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F7F7F8]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Ready to work with us?
          </h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Our UK team is ready to help you implement a phone-free policy that works. Request a quote, request a free sample, or just ask a question.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/request-quote"
              className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Request a Quote <ArrowRight size={15} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border border-[#f95555] text-[#f95555] font-bold px-7 py-3.5 rounded hover:bg-[#EEE9FF] transition-colors text-sm"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
