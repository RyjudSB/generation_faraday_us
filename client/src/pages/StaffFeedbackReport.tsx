/* =============================================================
   Staff Feedback Report Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Users, TrendingUp, MessageSquare } from "lucide-react";
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

const KEY_FINDINGS = [
  { stat: "95%", label: "of staff reported improved classroom focus within the first month", Icon: TrendingUp },
  { stat: "89%", label: "of teachers said they would recommend Generation Faraday to other schools", Icon: Users },
  { stat: "78%", label: "of pastoral staff reported a reduction in phone-related behavioural incidents", Icon: BarChart3 },
  { stat: "92%", label: "of headteachers rated the implementation support as 'excellent' or 'very good'", Icon: MessageSquare },
];

const STAFF_QUOTES = [
  {
    quote: "I have been teaching for 22 years and this is the single most effective intervention I have seen for improving classroom atmosphere. The difference was noticeable from day one.",
    name: "Head of English",
    school: "Secondary school, Yorkshire",
  },
  {
    quote: "The app is genuinely useful. Being able to see at a glance which students have not locked their bags means we can address non-compliance quickly and consistently.",
    name: "Assistant Headteacher",
    school: "Academy, West Midlands",
  },
  {
    quote: "Our Year 11 results improved significantly this year. I cannot attribute that entirely to the bags, but the improvement in focus during revision lessons was remarkable.",
    name: "Head of Year 11",
    school: "Comprehensive school, South East",
  },
  {
    quote: "Parents were initially resistant, but once they saw the data and heard from their children that they actually felt less anxious without their phones during the day, the opposition largely disappeared.",
    name: "Deputy Headteacher",
    school: "Grammar school, Kent",
  },
];

const METHODOLOGY = [
  "Survey conducted across 47 UK schools using Generation Faraday bags for a minimum of one full term",
  "Responses collected from 312 teaching and pastoral staff members",
  "Data collected via anonymous online survey to ensure honest responses",
  "Baseline data collected before implementation; follow-up survey at 4 weeks and 12 weeks",
  "Qualitative interviews conducted with 18 senior leaders",
];

const IMPACT_DATA = [
  { area: "Classroom Focus", before: 42, after: 87, label: "% of lessons described as 'focused' or 'very focused'" },
  { area: "Phone-Related Incidents", before: 100, after: 22, label: "Relative index of phone-related incidents (100 = baseline)" },
  { area: "Teacher Confidence", before: 51, after: 91, label: "% of teachers confident in enforcing phone policy" },
  { area: "Student Compliance", before: 48, after: 94, label: "% of students compliant with phone policy" },
];

export default function StaffFeedbackReport() {
  const [heroVisible, setHeroVisible] = useState(false);
  const findingsSection = useFadeUp(0.1);
  const impactSection = useFadeUp(0.05);
  const quotesSection = useFadeUp(0.05);
  const methodSection = useFadeUp(0.1);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f95555]/10 blur-3xl pointer-events-none" />
        <div className="container relative">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Staff Feedback Report</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              What UK teachers<br /><span className="text-[#f95555]">really think.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Feedback collected by Generation Faraday from over 300 teaching and pastoral staff across 47 UK schools. Collected after a minimum of one full term of use.
            </p>
          </div>
        </div>
      </section>

      {/* Key findings */}
      <section className="py-16 lg:py-20 bg-[#f95555]" ref={findingsSection.ref}>
        <div className="container">
          <div className={`text-center mb-12 transition-all duration-500 ${findingsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>Key findings</h2>
            <p className="text-white/80 mt-2 text-sm">From 312 staff across 47 UK schools</p>
          </div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${findingsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {KEY_FINDINGS.map((f, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-7 text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mx-auto mb-4">
                  <f.Icon size={22} className="text-white" />
                </div>
                <div className="text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>{f.stat}</div>
                <p className="text-white/80 text-sm leading-snug">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact data */}
      <section className="py-16 lg:py-20 bg-white" ref={impactSection.ref}>
        <div className="container max-w-4xl">
          <div className={`mb-10 transition-all duration-500 ${impactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Detailed Results</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Impact across key areas</h2>
          </div>
          <div className={`flex flex-col gap-5 transition-all duration-500 ${impactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {IMPACT_DATA.map((row, i) => (
              <div key={i} className="bg-[#FAFAFA] rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-[#111111] text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{row.area}</span>
                  <span className="text-xs text-gray-400">{row.label}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Before</div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: `${row.before}%` }} />
                    </div>
                    <div className="text-xs font-bold text-gray-500 mt-1">{row.before}%</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-[#f95555] mb-1 font-semibold">After</div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#f95555] rounded-full transition-all duration-1000" style={{ width: `${row.after}%` }} />
                    </div>
                    <div className="text-xs font-bold text-[#f95555] mt-1">{row.after}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff quotes */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]" ref={quotesSection.ref}>
        <div className="container">
          <div className={`mb-10 transition-all duration-500 ${quotesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Qualitative Feedback</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>In their own words</h2>
          </div>
          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-500 ${quotesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {STAFF_QUOTES.map((q, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#f95555]/20 hover:shadow-md transition-all duration-300" style={{ transitionDelay: `${i * 60}ms` }}>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-5">"{q.quote}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-[#111111] text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{q.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{q.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 bg-white border-t border-gray-100" ref={methodSection.ref}>
        <div className="container max-w-3xl">
          <div className={`transition-all duration-500 ${methodSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-lg font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>Methodology</h3>
            <ul className="flex flex-col gap-2">
              {METHODOLOGY.map((m, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-[#EEE9FF] text-[#f95555] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  {m}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-5">This report summarises aggregated, anonymised data. Individual school data is not disclosed without consent. For the full methodology and data tables, contact our UK team.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111111]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Request the full report</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm">The complete Staff Feedback Report, including full data tables and school case studies, is available on request.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Request the Full Report <ArrowRight size={15} />
            </Link>
            <Link href="/request-quote" className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-7 py-3.5 rounded hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Get a Quote for Your School
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
