/* =============================================================
   Blog Page - Generation Faraday UK
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "wouter";

const POSTS = [
  {
    slug: "dfe-guidance-phone-free-schools",
    category: "UK POLICY",
    date: "January 2025",
    title: "DfE Guidance on Mobile Phones in Schools: What Every Headteacher Needs to Know",
    excerpt: "The Department for Education has issued clear guidance requiring schools to restrict mobile phone use throughout the school day. We break down what this means in practice and how Generation Faraday helps schools comply.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    featured: true,
  },
  {
    slug: "lse-research-phone-ban-test-scores",
    category: "RESEARCH",
    date: "December 2024",
    title: "LSE Research: Phone Bans Linked to Significant Test Score Gains",
    excerpt: "A landmark study from the London School of Economics found that restricting mobile phones in schools improved test scores by 6.4% of a standard deviation overall, and by 14.23% for the most disadvantaged pupils.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    featured: false,
  },
  {
    slug: "childrens-commissioner-school-phone-policies",
    category: "UK POLICY",
    date: "April 2025",
    title: "Children's Commissioner: 90% of Secondary Schools Now Restrict Phones",
    excerpt: "A landmark survey of 19,000 schools by the Children's Commissioner for England found that 90% of secondary schools and 99.8% of primary schools already have policies restricting mobile phone use during the school day.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    featured: false,
  },
  {
    slug: "signal-blocking-vs-phone-storage",
    category: "PRODUCT COMPARISON",
    date: "October 2024",
    title: "Signal-Blocking vs. Phone Storage: Why the Distinction Matters for UK Schools",
    excerpt: "Not all phone management solutions are equal. We explain why true signal-blocking, not just physical storage, is the only approach that eliminates distraction entirely.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    featured: false,
  },
  {
    slug: "implementing-phone-free-policy-uk-school",
    category: "IMPLEMENTATION",
    date: "September 2024",
    title: "How to Implement a Phone-Free Policy in a UK Secondary School",
    excerpt: "A practical, step-by-step guide for headteachers and senior leaders. From communicating with parents to training staff and managing the first week.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    featured: false,
  },
  {
    slug: "mental-health-smartphones-young-people",
    category: "MENTAL HEALTH",
    date: "August 2024",
    title: "Smartphones and Young People's Mental Health: The UK Evidence",
    excerpt: "The link between smartphone use and anxiety, depression, and poor sleep in young people is well-established. We review the UK-specific evidence and explain why phone-free schools are a mental health intervention.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    featured: false,
  },
  {
    slug: "pupil-premium-phone-free-schools",
    category: "EQUITY",
    date: "July 2024",
    title: "Why Phone-Free Schools Are an Equity Issue",
    excerpt: "The LSE research is clear: the biggest beneficiaries of phone-free policies are disadvantaged pupils. For schools with high Pupil Premium cohorts, removing phones is one of the highest-impact, lowest-cost interventions available.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    featured: false,
  },
  {
    slug: "ofsted-behaviour-phones",
    category: "OFSTED",
    date: "June 2024",
    title: "What Ofsted Inspectors Look for in Phone Policies",
    excerpt: "DfE behaviour guidance and the Ofsted inspection framework make clear that mobile phone policies are part of a school's broader behaviour culture. We explain what inspectors expect to see.",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",
    featured: false,
  },
];

const CATEGORIES = ["All", "UK Policy", "Research", "Implementation", "Mental Health", "Equity", "Ofsted", "Product Comparison", "Teacher Wellbeing"];

export default function Blog() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const filtered = activeCategory === "All"
    ? POSTS
    : POSTS.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const [featured, ...rest] = filtered;

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#f95555]/10 blur-3xl pointer-events-none" />
        <div className="container relative">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Latest News & Research</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Phone-free schools:<br /><span className="text-[#f95555]">news and research.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              The latest research, policy updates, and practical guidance for UK schools navigating mobile phone management.
            </p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-5 bg-[#FAFAFA] border-b border-gray-100 sticky top-[105px] z-30">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#f95555] text-white border-[#f95555]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#f95555]/40 hover:text-[#f95555]"
                }`}
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 lg:py-20">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No posts in this category yet.</div>
          ) : (
            <>
              {featured && (
                <div className="mb-12 grid lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                    <img src={featured.img} alt={featured.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#EEE9FF] text-[#f95555] text-xs font-bold px-3 py-1 rounded-full">{featured.category}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={11} /> {featured.date}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#111111] mb-4 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>{featured.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                    <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#f95555] hover:gap-3 transition-all duration-200" style={{ fontFamily: "'Cabin', sans-serif" }}>
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <article key={post.slug} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[#f95555]/20 transition-all duration-300 flex flex-col">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex items-center gap-1 text-xs font-bold text-[#f95555] uppercase tracking-wider"><Tag size={9} /> {post.category}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={9} /> {post.date}</span>
                        </div>
                        <h3 className="font-extrabold text-[#111111] text-sm leading-snug mb-3 flex-1" style={{ fontFamily: "'Cabin', sans-serif" }}>{post.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f95555] hover:gap-2.5 transition-all duration-200 mt-auto" style={{ fontFamily: "'Cabin', sans-serif" }}>
                          Read More <ArrowRight size={12} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111111]">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>Ready to go phone-free?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm">Speak to our UK team about a pilot programme, free samples, or a full school rollout.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-7 py-3.5 rounded hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Contact Our UK Team <ArrowRight size={15} />
            </Link>
            <Link href="/request-quote" className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-7 py-3.5 rounded hover:bg-white/10 transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
