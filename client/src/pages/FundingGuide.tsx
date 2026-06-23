/* =============================================================
   Funding Guide Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, CheckCircle2, ExternalLink, PoundSterling, BookOpen, Landmark, Building2 } from "lucide-react";
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

const FUNDING_SOURCES = [
  {
    Icon: PoundSterling,
    title: "Pupil Premium",
    tag: "Most Common",
    tagColor: "bg-emerald-100 text-emerald-700",
    desc: "Pupil Premium funding is specifically designed to help schools support disadvantaged pupils. LSE research shows phone-free policies improve outcomes for disadvantaged students by 14.23% of a standard deviation, making Generation Faraday a highly justifiable Pupil Premium expenditure.",
    eligibility: "Schools with Pupil Premium-eligible students (those who have received free school meals in the past 6 years, children in care, or children of service personnel).",
    howToUse: "Document the evidence base (LSE research, Ofcom data) and link expenditure to improved outcomes for disadvantaged pupils. Include in your Pupil Premium strategy statement.",
    link: "https://www.gov.uk/guidance/pupil-premium-information-for-schools-and-alternative-provision-settings",
    linkText: "Pupil Premium Guidance (Gov.uk)",
    internal: false,
  },
  {
    Icon: Landmark,
    title: "School Improvement Budget",
    tag: "Widely Available",
    tagColor: "bg-blue-100 text-blue-700",
    desc: "Most schools have a discretionary school improvement budget that can be used for initiatives that improve teaching and learning. A phone-free policy directly supports improved classroom focus and academic outcomes.",
    eligibility: "All state-funded schools. Budget allocation is at the discretion of the headteacher and governing body.",
    howToUse: "Present the evidence base to your governing body and link the expenditure to your School Development Plan priorities, particularly around behaviour, attendance, and academic achievement.",
    link: "https://www.gov.uk/guidance/schools-financial-value-standard-sfvs",
    linkText: "Schools Financial Value Standard",
    internal: false,
  },
  {
    Icon: BookOpen,
    title: "Behaviour and Attendance Funding",
    tag: "Targeted Support",
    tagColor: "bg-purple-100 text-purple-700",
    desc: "The DfE's Behaviour Hubs programme and related funding streams support schools in improving behaviour and reducing persistent absence. Phone-free policies are a direct intervention for both.",
    eligibility: "Schools with identified behaviour or attendance challenges. Contact your Regional Director's office for current funding availability.",
    howToUse: "Frame Generation Faraday as a behaviour intervention. Document baseline data on phone-related incidents, disruptions, and absence, then track improvement post-implementation.",
    link: "https://www.gov.uk/guidance/behaviour-hubs",
    linkText: "Behaviour Hubs Programme",
    internal: false,
  },
  {
    Icon: Building2,
    title: "MAT Central Funding",
    tag: "For Multi-Academy Trusts",
    tagColor: "bg-amber-100 text-amber-700",
    desc: "Multi-Academy Trusts often have central funding for whole-trust initiatives. A trust-wide phone-free policy, supported by a single Generation Faraday contract, can deliver significant economies of scale.",
    eligibility: "Multi-Academy Trusts with central budgets for shared resources and initiatives.",
    howToUse: "Approach your Trust's central team with a proposal for a trust-wide rollout. Generation Faraday offers volume pricing for MAT contracts. Contact our UK team for a bespoke quote.",
    link: "/request-quote",
    linkText: "Request a MAT Quote",
    internal: true,
  },
];

const COST_BREAKDOWN = [
  { item: "GFSB-PRO Faraday Bag (per student)", cost: "From £18.00", note: "Volume discounts available" },
  { item: "Unlock Dock (per site)", cost: "From £120.00", note: "One dock per 200–300 students recommended" },
  { item: "Handheld Key (per staff member)", cost: "From £45.00", note: "Recommended 1 per form tutor" },
  { item: "Implementation Support", cost: "Included", note: "UK team provides full onboarding support" },
  { item: "Generation Faraday App", cost: "Included", note: "Full app access for admin and pastoral staff" },
  { item: "Annual cost per pupil (bags only)", cost: "From £18.00", note: "Less than a textbook per year" },
];

export default function FundingGuide() {
  const [heroVisible, setHeroVisible] = useState(false);
  const fundingSection = useFadeUp(0.05);
  const costSection = useFadeUp(0.1);
  const downloadSection = useFadeUp(0.1);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f95555]/10 blur-3xl pointer-events-none" />
        <div className="container relative">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Funding Guide</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              How UK schools fund<br /><span className="text-[#f95555]">Generation Faraday.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              A practical guide to the funding streams available to UK state schools for phone management solutions, including Pupil Premium, school improvement budgets, and MAT central funding.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://generationfaraday.com/wp-content/uploads/2025/12/Generation-Faraday-Funding-Guide_25-26-SY.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded hover:bg-[#e04444] transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                <Download size={15} /> Download Full Funding Guide (PDF)
              </a>
              <Link href="/request-quote" className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-6 py-3 rounded hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Get a Quote <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="py-10 bg-[#f95555]">
        <div className="container">
          <p className="text-white text-base leading-relaxed max-w-3xl">
            <strong>The good news:</strong> Generation Faraday bags cost less than a textbook per pupil per year. Most UK schools fund their rollout through existing Pupil Premium or school improvement budgets, with no special application required.
          </p>
        </div>
      </section>

      {/* Funding sources */}
      <section className="py-16 lg:py-24" ref={fundingSection.ref}>
        <div className="container">
          <div className={`mb-12 transition-all duration-500 ${fundingSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Available Funding Streams</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Four ways to fund your rollout</h2>
          </div>
          <div className="flex flex-col gap-6">
            {FUNDING_SOURCES.map((source, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-gray-100 p-8 hover:border-[#f95555]/20 hover:shadow-md transition-all duration-300 ${fundingSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex flex-wrap items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#EEE9FF] flex items-center justify-center flex-shrink-0">
                    <source.Icon size={22} className="text-[#f95555]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>{source.title}</h3>
                      <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${source.tagColor}`}>{source.tag}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{source.desc}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5 mt-4">
                  <div className="bg-[#FAFAFA] rounded-xl p-5">
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Eligibility</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{source.eligibility}</p>
                  </div>
                  <div className="bg-[#FAFAFA] rounded-xl p-5">
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">How to Use This Funding</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{source.howToUse}</p>
                  </div>
                </div>
                <div className="mt-4">
                  {source.internal ? (
                    <Link href={source.link} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f95555] hover:gap-2.5 transition-all duration-200" style={{ fontFamily: "'Cabin', sans-serif" }}>
                      {source.linkText} <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <a href={source.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f95555] hover:gap-2.5 transition-all duration-200" style={{ fontFamily: "'Cabin', sans-serif" }}>
                      {source.linkText} <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost breakdown */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]" ref={costSection.ref}>
        <div className="container">
          <div className={`mb-10 transition-all duration-500 ${costSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Indicative Pricing</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>What does it cost?</h2>
            <p className="text-gray-500 mt-2 text-sm">Indicative pricing for UK schools. Contact us for a bespoke quote based on your student numbers.</p>
          </div>
          <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-500 ${costSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <table className="w-full">
              <thead>
                <tr className="bg-[#111111] text-white">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wide" style={{ fontFamily: "'Cabin', sans-serif" }}>Item</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wide" style={{ fontFamily: "'Cabin', sans-serif" }}>Indicative Cost</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wide hidden sm:table-cell" style={{ fontFamily: "'Cabin', sans-serif" }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {COST_BREAKDOWN.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                    <td className="px-6 py-4 text-sm font-medium text-[#111111]">{row.item}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#f95555]">{row.cost}</td>
                    <td className="px-6 py-4 text-xs text-gray-400 hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4">* Prices are indicative and exclude VAT. Volume discounts are available for orders of 100+ bags. Contact our UK team for a bespoke quote.</p>
        </div>
      </section>

      {/* Download */}
      <section className="py-16 bg-white" ref={downloadSection.ref}>
        <div className="container">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-500 ${downloadSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-16 h-16 rounded-2xl bg-[#EEE9FF] flex items-center justify-center mx-auto mb-6">
              <Download size={28} className="text-[#f95555]" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>Download the full funding guide</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">Our comprehensive UK Funding Guide includes template justification statements for Pupil Premium, a cost-per-pupil calculator, and a letter template for your governing body.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://generationfaraday.com/wp-content/uploads/2025/12/Generation-Faraday-Funding-Guide_25-26-SY.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                <Download size={15} /> Download PDF Guide
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-bold px-7 py-3.5 rounded hover:border-[#f95555]/40 hover:text-[#f95555] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Speak to Our UK Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sample statement */}
      <section className="py-12 bg-[#FAFAFA] border-t border-gray-100">
        <div className="container max-w-3xl">
          <h3 className="text-lg font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>Sample Pupil Premium Justification Statement</h3>
          <div className="bg-white rounded-xl border border-gray-100 p-6 text-sm text-gray-600 leading-relaxed italic">
            "Generation Faraday signal-blocking bags are funded through Pupil Premium as a targeted intervention to improve academic outcomes for disadvantaged pupils. Research from the London School of Economics (2015) demonstrates that phone-free policies improve test scores by 6.4% of a standard deviation overall and by 14.23% for the most disadvantaged students. The cost per Pupil Premium-eligible student is approximately £[X] per year, which represents exceptional value relative to the documented impact on outcomes for this cohort."
          </div>
          <p className="text-xs text-gray-400 mt-3">This is a sample statement only. Schools should adapt this to reflect their specific context and evidence base.</p>
        </div>
      </section>
    </main>
  );
}
