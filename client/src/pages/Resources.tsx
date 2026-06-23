/* =============================================================
   Resources Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, FileText, Download, ExternalLink } from "lucide-react";
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

const RESEARCH = [
  {
    title: "Mobile phones in schools: DfE Guidance",
    source: "Department for Education",
    year: "2024",
    desc: "The UK government's official guidance on restricting the use of mobile phones throughout the school day, including policy recommendations and implementation advice.",
    href: "https://www.gov.uk/government/publications/mobile-phones-in-schools",
    type: "policy",
  },
  {
    title: "Ill Communication: Technology, Distraction & Student Performance",
    source: "London School of Economics",
    year: "2015",
    desc: "LSE research showing that banning mobile phones in schools improved test scores by 6.4% of a standard deviation overall, and by 14.23% for the most disadvantaged students.",
    href: "https://cep.lse.ac.uk/pubs/download/dp1350.pdf",
    type: "research",
  },
  {
    title: "Brain Drain: The Mere Presence of One's Own Smartphone Reduces Available Cognitive Capacity",
    source: "Journal of the Association for Consumer Research",
    year: "2017",
    desc: "Peer-reviewed study demonstrating that even the mere presence of a smartphone on a desk reduces available cognitive capacity, even when the phone is face-down and silent.",
    href: "https://www.journals.uchicago.edu/doi/10.1086/691462",
    type: "research",
  },
  {
    title: "Screen time: impacts on education and wellbeing",
    source: "House of Commons Education Committee",
    year: "2024",
    desc: "Parliamentary report concluding that phone bans can have a positive impact on mental health and educational outcomes, recommending a statutory ban if voluntary guidance proves ineffective.",
    href: "https://committees.parliament.uk/publications/45128/documents/223543/default/",
    type: "policy",
  },
  {
    title: "School phone policies in England",
    source: "Children's Commissioner for England",
    year: "2025",
    desc: "Landmark survey of 19,000 schools (nearly 90% of schools in England) finding that 90% of secondary schools and 99.8% of primary schools already restrict mobile phone use during the school day.",
    href: "https://www.childrenscommissioner.gov.uk/resource/school-phone-policies-in-england-findings-from-the-childrens-commissioners-school-and-college-survey/",
    type: "research",
  },
  {
    title: "Behaviour in Schools: Advice for headteachers and school staff",
    source: "Department for Education",
    year: "2024",
    desc: "DfE statutory guidance on managing behaviour in schools, including an updated section on mobile phone policies and creating a calm, focused learning environment.",
    href: "https://www.gov.uk/government/publications/behaviour-in-schools--2",
    type: "policy",
  },
];

const DOWNLOADS = [
  {
    title: "Generation Faraday UK Brochure",
    desc: "Full product overview, pricing guide, and implementation information for UK schools. Share with your leadership team.",
    icon: FileText,
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/GF_UK_Brochure_8a6e4b21.pdf",
    cta: "Download Brochure",
    external: true,
  },
  {
    title: "Staff Feedback Report",
    desc: "Staff feedback data collected by Generation Faraday from schools using our bags. Includes satisfaction rates, focus improvement statistics, and qualitative testimonials.",
    icon: BookOpen,
    href: "/contact",
    cta: "Request Report",
    external: false,
  },
  {
    title: "How We Compare",
    desc: "A detailed overview of how Generation Faraday's signal-blocking technology delivers results across the features that matter most to UK schools.",
    icon: Download,
    href: "/compare",
    cta: "View Comparison",
    external: false,
  },
];

const FAQS = [
  {
    q: "Is Generation Faraday compliant with DfE guidance?",
    a: "Yes. The DfE guidance recommends that schools have a clear, enforceable policy on mobile phones. Generation Faraday's signal-blocking bags provide the physical enforcement mechanism to make that policy a reality. Our bags go beyond DfE requirements by blocking all wireless signals - not just securing the device.",
  },
  {
    q: "What happens in an emergency?",
    a: "The Generation Faraday bag opens instantly. No special tools, no waiting, no teacher intervention required. Students can access their device immediately in any emergency. The bag is designed to be opened and closed freely, so access is never restricted when it matters most.",
  },
  {
    q: "Can students still use their phones at break and lunch?",
    a: "Yes. The bags are designed to be opened and closed multiple times per day. Students access their devices freely between lessons, at break, and at lunch. The bag simply ensures that during instructional time, the device is fully signal-blocked.",
  },
  {
    q: "How do you handle students with medical needs?",
    a: "Students with medical needs that require phone access can be accommodated with a modified policy. The Generation Faraday app allows schools to flag individual students as exempt, and the bags can be opened instantly if a medical situation arises.",
  },
  {
    q: "What if a bag is lost or damaged?",
    a: "Each bag is serialised with a unique ID. The Generation Faraday app allows schools to track lost or damaged bags, report them, and manage replacements. Replacement bags are available at a discounted rate for existing customers.",
  },
  {
    q: "How long does implementation take?",
    a: "Most schools are fully operational within one to two weeks of receiving their bags. Our UK team provides full implementation support, including staff training, parent communication templates, and student briefing materials.",
  },
  {
    q: "Is there a minimum order quantity?",
    a: "We can accommodate schools of all sizes. Contact our UK team for pricing based on your student numbers. Free samples are available before any commitment.",
  },
  {
    q: "Do the bags work with smartwatches?",
    a: "Yes. The Faraday liner blocks all wireless signals, including Bluetooth - which means smartwatch connections are also severed when the phone is in the bag. This prevents students from receiving notifications via their watch.",
  },
];

export default function Resources() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const researchSection = useFadeUp(0.05);
  const downloadsSection = useFadeUp(0.1);
  const faqSection = useFadeUp(0.1);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Resources</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              The evidence for<br /><span className="text-[#8B73FF]">phone-free schools.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Research, policy documents, implementation guides, and practical tools to help your school make the case for - and successfully implement - a phone-free learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* Research & Policy */}
      <section className="py-20" ref={researchSection.ref}>
        <div className="container">
          <div className={`mb-12 transition-all duration-500 ${researchSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Research & Policy</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              The evidence base.
            </h2>
            <p className="text-gray-500 mt-2">Key research and policy documents supporting phone-free learning in UK schools.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH.map((item, idx) => (
              <div
                key={item.title}
                className={`bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#f95555]/30 hover:shadow-md transition-all duration-300 flex flex-col ${researchSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.type === "policy" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {item.type === "policy" ? "Policy" : "Research"}
                  </span>
                  <span className="text-xs text-gray-400">{item.year}</span>
                </div>
                <h3 className="font-bold text-[#111111] mb-1 text-sm leading-snug" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.title}</h3>
                <div className="text-xs text-[#f95555] font-semibold mb-3">{item.source}</div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{item.desc}</p>
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f95555] mt-4 hover:gap-2.5 transition-all duration-200"
                    style={{ fontFamily: "'Cabin', sans-serif" }}
                  >
                    View Document <ExternalLink size={11} />
                  </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-20 bg-[#F7F7F8]" ref={downloadsSection.ref}>
        <div className="container">
          <div className={`mb-12 transition-all duration-500 ${downloadsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Downloads & Tools</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Practical resources for your school.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DOWNLOADS.map((item, idx) => (
              <div
                key={item.title}
                className={`bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#f95555]/30 hover:shadow-md transition-all duration-300 flex flex-col ${downloadsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#EEE9FF] flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-[#f95555]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{item.desc}</p>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#f95555] hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "'Cabin', sans-serif" }}
                  >
                    {item.cta} <ArrowRight size={14} />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#f95555] hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "'Cabin', sans-serif" }}
                  >
                    {item.cta} <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" ref={faqSection.ref}>
        <div className="container max-w-3xl">
          <div className={`mb-10 transition-all duration-500 ${faqSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">FAQ</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Common questions from UK schools.
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.q}
                className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${faqSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between font-semibold text-[#111111] hover:bg-gray-50 transition-colors text-sm"
                  style={{ fontFamily: "'Cabin', sans-serif" }}
                  aria-expanded={openFaq === idx}
                  aria-controls={`res-faq-answer-${idx}`}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.q}
                  <span className={`text-[#f95555] transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === idx ? "rotate-180" : ""}`} aria-hidden="true">▾</span>
                </button>
                {openFaq === idx && (
                  <div id={`res-faq-answer-${idx}`} className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F7F7F8]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Have a question we haven't answered?
          </h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Our UK team is happy to answer any questions about implementation, pricing, or policy alignment.
          </p>
          <Link href="/request-quote"
            className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm"
            style={{ fontFamily: "'Cabin', sans-serif" }}
          >
            Contact Our UK Team <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Customer Portal */}
      <section className="py-16 bg-[#111111]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="section-label text-[#C4B8FF] mb-2">Customer Portal</div>
              <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>Already a Generation Faraday school?</h2>
              <p className="text-gray-400 text-sm max-w-lg">Log in to access exclusive implementation guides, training videos, compliance dashboards, and your local support team.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/customer-portal"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-5 py-2.5 rounded hover:bg-white/5 transition-colors text-sm"
              >
                See what's included
              </Link>
              <a href="#"
                className="inline-flex items-center gap-2 bg-[#8B73FF] text-white font-bold px-5 py-2.5 rounded hover:bg-[#7B63EF] transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                Customer Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
