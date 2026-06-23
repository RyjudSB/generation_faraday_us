/* =============================================================
   Implementation Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
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

const STEPS = [
  {
    num: "01",
    title: "Information Gathering",
    desc: "Schools first determine whether to use locking or non-locking Faraday bags, set a rollout schedule, and review available resources. Understanding the product, app, and overall implementation process is key before moving forward.",
    details: [
      "Choose between locking (Max-Lock) and non-locking (Standard) bag variants",
      "Review the DfE guidance and align your policy framework",
      "Assess your student numbers and site layout",
      "Download the UK Implementation Guide and policy templates",
    ],
  },
  {
    num: "02",
    title: "Planning",
    desc: "Administrators review recommended policies and complete the policy quiz to define how phone use will be managed, determine the number of Unlock Docks and Handheld Keys needed, and set the replacement policy for students.",
    details: [
      "Complete the online policy quiz to identify the right policy model for your school",
      "Determine the number of Unlock Docks required per site",
      "Set a replacement cost policy (typically £30–40) to deter deliberate tampering",
      "Plan parent and student communication strategy",
    ],
  },
  {
    num: "03",
    title: "Training",
    desc: "Staff are briefed on the policy, the bags, and the app before the launch date. Our UK team provides training materials, a staff presentation, and a FAQ document to ensure everyone is confident and consistent.",
    details: [
      "Staff briefing session using our UK-specific presentation template",
      "Hands-on demonstration of bag operation and Unlock Dock",
      "App walkthrough for admin and pastoral staff",
      "Parent communication sent home with student briefing materials",
    ],
  },
  {
    num: "04",
    title: "Launch and App Rollout",
    desc: "Unlock Docks are installed, and each student is assigned a Faraday bag with a unique serial number, which is logged in a tracking spreadsheet. Schools submit this data to Generation Faraday for integration into the management app.",
    details: [
      "Install Unlock Docks at designated points around the school",
      "Assign serialised bags to students and log in the tracking system",
      "Submit student data to Generation Faraday for app integration",
      "Conduct a student assembly to explain the policy and demonstrate the bags",
    ],
  },
  {
    num: "05",
    title: "Daily Use and Ongoing Support",
    desc: "Students use their assigned Faraday bags daily, locking and unlocking them per school policy. Schools can track compliance and manage assigned bags through the Generation Faraday app, with ongoing support from our UK team.",
    details: [
      "Students lock bags at the start of the school day and unlock at dismissal",
      "App dashboard shows real-time compliance data by class and year group",
      "Flag lost, damaged, or non-compliant bags through the app",
      "UK support team available for troubleshooting, replacements, and training refreshers",
    ],
  },
];

const POLICIES = [
  {
    tag: "RECOMMENDED",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "Bell-to-Bell",
    subtitle: "Student Assigned Bags",
    desc: "Each student has an assigned bag they bring daily. Bags are locked at the first bell and unlocked at the end of the school day.",
    pros: ["Maximises focus and minimises distractions", "Promotes individual accountability", "Optimises app integration and tracking"],
    cons: ["Potential for tampering if bags go home", "Risk of lost or forgotten bags", "Most restrictive option"],
  },
  {
    tag: "MOST CENTRALISED",
    tagColor: "bg-blue-100 text-blue-700",
    title: "Bell-to-Bell",
    subtitle: "No Bag Assignment",
    desc: "Students receive a bag upon entering campus and return it to a collection bin at the end of the day.",
    pros: ["Centralised management and control", "Lower risk of bag loss or tampering", "Efficient for large schools"],
    cons: ["Requires onsite storage solutions", "Daily distribution logistics needed", "No personal accountability for damage"],
  },
  {
    tag: "MOST FLEXIBLE",
    tagColor: "bg-amber-100 text-amber-700",
    title: "Phone-Free Instructional Time",
    subtitle: "Lesson-by-Lesson",
    desc: "Students lock phones during class only. Use is allowed during breaks and lunch. Assigned bags are still used.",
    pros: ["Balances structure with student flexibility", "Easier transition for students", "Supports app tracking and data"],
    cons: ["Bags may be forgotten or tampered with if taken home", "Not fully phone-free all day"],
  },
];

export default function Implementation() {
  const [heroVisible, setHeroVisible] = useState(false);
  const stepsSection = useFadeUp(0.05);
  const policiesSection = useFadeUp(0.1);
  const appSection = useFadeUp(0.1);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f95555]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#f95555]/5 blur-3xl pointer-events-none" />
        <div className="container relative">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Seamless Implementation</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Generation Faraday guides you<br /><span className="text-[#f95555]">every step of the way.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              With an ever-growing product line and focus on innovation, Generation Faraday delivers tailored solutions for every UK school. Our five-step plan ensures a smooth rollout for administrators, teachers, parents, and students.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24" ref={stepsSection.ref}>
        <div className="container">
          <div className={`text-center mb-14 transition-all duration-500 ${stepsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">A Step-by-Step Guide to a Seamless Rollout</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>The five-step implementation plan</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">Our structured approach ensures every stakeholder is prepared and confident before, during, and after launch.</p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`flex gap-6 lg:gap-10 transition-all duration-500 ${stepsSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#f95555] flex items-center justify-center text-white font-extrabold text-lg" style={{ fontFamily: "'Cabin', sans-serif" }}>{step.num}</div>
                  {i < STEPS.length - 1 && <div className="w-0.5 bg-gray-200 h-full mx-auto mt-3" style={{ minHeight: "24px" }} />}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-7 flex-1 hover:border-[#f95555]/20 hover:shadow-sm transition-all duration-300">
                  <h3 className="text-xl font-extrabold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {step.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle2 size={15} className="text-[#f95555] flex-shrink-0 mt-0.5" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy models */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]" ref={policiesSection.ref}>
        <div className="container">
          <div className={`text-center mb-14 transition-all duration-500 ${policiesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Tested and Proven</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Three policy models for UK schools</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">Policies vary based on each school's specific campus. The following three models are the most common implementations of Generation Faraday in UK schools.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {POLICIES.map((policy, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-gray-100 p-7 flex flex-col transition-all duration-500 hover:shadow-md hover:border-[#f95555]/20 ${policiesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 self-start ${policy.tagColor}`}>{policy.tag}</span>
                <h3 className="text-lg font-extrabold text-[#111111] mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{policy.title}</h3>
                <div className="text-xs font-semibold text-[#f95555] mb-3">{policy.subtitle}</div>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{policy.desc}</p>
                <div className="mb-4">
                  <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Benefits</div>
                  <ul className="flex flex-col gap-1.5">
                    {policy.pros.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-600"><CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Considerations</div>
                  <ul className="flex flex-col gap-1.5">
                    {policy.cons.map((c, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-500"><AlertCircle size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App section */}
      <section className="py-16 lg:py-20 bg-[#111111]" ref={appSection.ref}>
        <div className="container">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-500 ${appSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Generation Faraday App</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>The missing piece in your workflow</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">The Generation Faraday app gives administrators real-time visibility of compliance, bag assignments, and incidents across the whole school.</p>
            <ul className="grid sm:grid-cols-2 gap-3 text-left mb-10 max-w-xl mx-auto">
              {["Track bag assignments and serial numbers","Flag non-compliant students","Monitor lost, damaged, or missing bags","View real-time classroom compliance","Access district-wide reports and insights","Manage exemptions for medical needs"].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 size={14} className="text-[#f95555] flex-shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
            <Link href="/app" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Find Out More About the App <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Ready to start your rollout?</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto text-sm">Our UK team will guide you through every step. Request free samples or speak to a specialist today.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/request-quote" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Request Free Samples <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-bold px-7 py-3.5 rounded hover:border-[#f95555]/40 hover:text-[#f95555] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Speak to Our UK Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
