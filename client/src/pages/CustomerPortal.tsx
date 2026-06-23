/* =============================================================
   Customer Portal - Generation Faraday UK
   ============================================================= */
import { useEffect, useState } from "react";
import { KeyRound, BookOpen, Video, Phone, Users, FileText, BarChart3, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Link } from "wouter";

const PORTAL_SECTIONS = [
  {
    icon: BookOpen,
    title: "Support Materials",
    desc: "Downloadable guides, policy templates, parent letter templates, and assembly resources to help you launch and maintain your phone-free programme.",
    colour: "bg-[#EEE9FF] text-[#7B5EA7]",
  },
  {
    icon: FileText,
    title: "Implementation Guides",
    desc: "Step-by-step rollout plans, staff training checklists, and student onboarding resources tailored for UK schools.",
    colour: "bg-[#FFF0F0] text-[#f95555]",
  },
  {
    icon: Video,
    title: "Video Library",
    desc: "Training videos, how-to guides, and best-practice walkthroughs for staff and administrators.",
    colour: "bg-[#F0FDF4] text-emerald-600",
  },
  {
    icon: Phone,
    title: "Contact & Support",
    desc: "Direct access to your local representative, the UK support team, and live chat during business hours.",
    colour: "bg-[#FFF8E7] text-amber-600",
  },
  {
    icon: Users,
    title: "Rep Information",
    desc: "Your dedicated Andover Forensics contact details, scheduling for on-site visits, and escalation routes.",
    colour: "bg-[#F0F4FF] text-blue-600",
  },
  {
    icon: BarChart3,
    title: "Compliance Dashboard",
    desc: "Access your school's compliance data, RFID scan reports, and Ofsted-ready summaries from the Generation Faraday app.",
    colour: "bg-[#F7F7F8] text-gray-600",
  },
];

export default function CustomerPortal() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-24">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Customer Portal</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Everything you need,<br /><span className="text-[#8B73FF]">in one place.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Your Generation Faraday customer portal gives you access to implementation guides, training videos, support resources, compliance data, and your dedicated local rep — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded hover:bg-[#e04444] transition-colors text-sm"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                <KeyRound size={16} aria-hidden="true" />
                Log In to Your Portal
              </a>
              <Link href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded hover:border-white/40 hover:bg-white/5 transition-colors text-sm"
              >
                Not a customer yet? Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-3">What's Inside</div>
            <h2 className="text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Your portal includes everything<br />to run a successful programme.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTAL_SECTIONS.map((s) => (
              <div key={s.title} className="bg-[#F7F7F8] rounded-2xl p-6 border border-gray-100 hover:border-[#f95555]/20 hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.colour}`}>
                  <s.icon size={22} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login CTA */}
      <section className="py-16 bg-[#111111]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-[#8B73FF]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Already a customer?
            </h2>
            <p className="text-gray-400 mb-8">
              Log in with your school's credentials to access your resources, compliance data, and support team.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-8 py-4 rounded hover:bg-[#e04444] transition-colors"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              <KeyRound size={18} aria-hidden="true" />
              Log In to Customer Portal
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Need access? <Link href="/contact" className="text-[#8B73FF] hover:text-[#C4B8FF] transition-colors">Contact your local rep</Link> to set up your account.
            </p>
          </div>
        </div>
      </section>

      {/* Not a customer yet */}
      <section className="py-16 bg-[#F7F7F8]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Not yet a Generation Faraday school?
          </h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Once you're set up, you'll have immediate access to the full customer portal — including all guides, videos, and your dedicated UK support team.
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
              Speak to Our Team <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
