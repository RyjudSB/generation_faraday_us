/* =============================================================
   Testimonials Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   SOURCE: All testimonials taken verbatim from the "Testimonials"
   Google Doc in the Generation Faraday Google Drive.
   NO testimonials have been invented or paraphrased.
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { Quote, ArrowRight } from "lucide-react";
import { Link } from "wouter";

function useFadeUp(threshold = 0.08) {
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

/* -- Real testimonials only - sourced verbatim from Google Drive -- */
const TESTIMONIALS = [
  {
    quote: `The transition to using the bags has been remarkably smooth over the past two weeks. Staff have noted that the atmosphere in the halls and classrooms has changed dramatically. There are no phones or earbuds in sight, making a noticeable difference. When asked about their experience, students frequently respond with perspectives such as, "It's made me realise how often I think about checking my phone," and, "At first I thought it would be hard, but actually I've been able to focus much better in class." Each morning, students are greeted at the gate and place their phones in the bags before entering campus, carrying them throughout the day. At dismissal, a team of staff efficiently unlocks the bags, minimising any delay. Overall, the process has become streamlined and effective for everyone involved. We couldn't be more pleased with the results.`,
    name: "Eric Frandsen",
    title: "Principal",
    school: "Surfside Educational Academy, Oceanside Unified School District",
  },
  {
    quote: "The implementation of Generation Faraday's signal-blocking pouches on our secondary campuses has been surprisingly smooth. The company has provided us with many valuable implementation and communication tools and is clearly invested in our success. It's just a few days in and we are already seeing a positive impact on instruction and the overall learning environment. We are excited about this partnership and look forward to working with Generation Faraday to provide more focused, engaged classrooms.",
    name: "Dr. Suzy Lofton-Bullis",
    title: "Deputy Superintendent",
    school: "Lago Vista ISD",
  },
  {
    quote: "We're incredibly excited to receive Generation Faraday bags as part of the F.I.R.M. initiative! These bags will help us create a more focused and engaged learning environment by reducing distractions and allowing students to fully immerse themselves in their studies. With the added security of knowing their devices are protected, our students can be more present, motivated, and ready to learn. We're confident this will make a meaningful difference in their academic experience!",
    name: "Brenda Barragan",
    title: "Assistant Principal",
    school: "Legacy Visual and Performing Arts High School",
  },
  {
    quote: "Portola Charter Middle School is extremely excited and grateful to be a recipient of Generation Faraday bags as part of the F.I.R.M. initiative. As a school we looked at a few types of phone bags and were impressed with the superior quality of the Generation Faraday bags. I am looking forward to seeing the positive effects these bags will produce in terms of improved student behaviour and improved academics.",
    name: "Becky Garcia",
    title: "Assistant Principal",
    school: "Portola Charter Middle School",
  },
  {
    quote: "In addition to using the bags as a tool in my classroom, I love the fact that my students can take them home! Many students report using their bags as a tool at home for self-regulation while studying. I also love that it brings parents into the discussion about how we manage phone use. It's great to involve families in solving complex issues like the role of phones in schools. A couple of students even reported that their parents were more thrilled about the product for the younger siblings than they were for my students.",
    name: "Graham Oleson",
    title: "Teacher",
    school: "San Marcos High School (Pilot Programme)",
  },
  {
    quote: `I think they are beneficial to the students and teachers. It allows for "total freedom" of time and thought from the digital and social media world, and allows students to focus on their classmates, lessons, and collaboration with the people in the room.`,
    name: "Christina Cable",
    title: "Teacher",
    school: "Dos Pueblos High School (Pilot Programme)",
  },
  {
    quote: "I found this product helpful in allowing students to separate from the cellphone and headphones with less anxiety. The compliance of putting in a bag on their desk was much higher than putting phones in the cellphone hotel on the wall.",
    name: "Richard Johnston",
    title: "Teacher",
    school: "Santa Barbara High School (Pilot Programme)",
  },
];

export default function Testimonials() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const gridSection  = useFadeUp(0.05);
  const videoSection = useFadeUp(0.05);
  const ctaSection   = useFadeUp(0.05);

  return (
    <main className="pt-16 overflow-x-hidden">

      {/* Hero */}
      <section className="py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container relative z-10 text-center">
          <div className={`transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 text-[#f95555] text-xs font-bold tracking-widest uppercase mb-6 border border-[#f95555]/30 rounded-full px-4 py-2">
              <Quote size={12} />
              From Schools Using Generation Faraday
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "'Cabin', sans-serif" }}>
              What schools are saying.
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">
              Real feedback from principals, deputy superintendents, and teachers who have implemented Generation Faraday in their schools.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="py-24 bg-white" ref={gridSection.ref}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name}
                className={`rounded-2xl p-8 border border-gray-100 bg-[#FAFAFA] hover:border-[#f95555]/20 hover:shadow-lg transition-all duration-300 flex flex-col ${gridSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 flex-shrink-0" style={{ background: "rgba(249,85,85,0.1)" }}>
                  <Quote size={18} className="text-[#f95555]" />
                </div>
                <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 mb-6 italic">
                  "{t.quote}"
                </blockquote>
                <div className="border-t border-gray-100 pt-5">
                  <div className="font-bold text-[#111111] text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>{t.name}</div>
                  <div className="text-xs text-[#f95555] font-semibold mt-0.5">{t.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-16 lg:py-20 bg-[#F7F7F8]" ref={videoSection.ref}>
        <div className="container">
          <div className={`text-center mb-10 transition-all duration-500 ${videoSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label mb-3">Video Testimonial</div>
            <h2 className="text-3xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>See the difference for yourself</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Watch Sierra Sands Unified School District share their experience with Generation Faraday.</p>
          </div>
          <div
            className={`max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-100 transition-all duration-500 ${videoSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/V5SYUVcc-zI"
                title="Sierra Sands Generation Faraday Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f95555]" ref={ctaSection.ref}>
        <div className="container text-center">
          <div className={`transition-all duration-500 ${ctaSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Ready to see results like these?
            </h2>
            <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
              Join the schools already using Generation Faraday to create focused, phone-free learning environments.
            </p>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 bg-white text-[#f95555] font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
