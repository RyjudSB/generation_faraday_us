/* =============================================================
   Navbar - Generation Faraday UK "Clean Signal" design
   Two-row header: utility bar (md+) + sticky main nav.
   Nav collapses to hamburger below xl breakpoint.
   WCAG 2.1/2.2 AA: skip link, aria-expanded, aria-current,
   aria-label on nav, type="button" on all buttons.
   ============================================================= */
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronDown, BookOpen, Users, Wrench, PoundSterling, BarChart3, Gift, FileText, KeyRound, Package } from "lucide-react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Bundles", href: "/bundles" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Compare", href: "/compare" },
  { label: "App", href: "/app" },
  { label: "About", href: "/about" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog", desc: "News, research & policy updates", Icon: BookOpen },
  { label: "Testimonials", href: "/testimonials", desc: "What UK schools are saying", Icon: Users },
  { label: "Implementation Guide", href: "/implementation", desc: "5-step rollout plan", Icon: Wrench },
  { label: "Funding Guide", href: "/funding-guide", desc: "Pupil Premium & budget options", Icon: PoundSterling },
  { label: "How We Compare", href: "/compare", desc: "vs. Yondr & Phonelocker", Icon: FileText },
  { label: "Staff Feedback Report", href: "/staff-feedback-report", desc: "Independent survey data", Icon: BarChart3 },
  { label: "Winter 2026 Promotion", href: "/winter-2026-promo", desc: "10% off - ends 31 March", Icon: Gift },
  { label: "Bundles", href: "/bundles", desc: "System bundles by school size", Icon: Package },
  { label: "Customer Portal", href: "/customer-portal", desc: "Guides, videos & support for existing schools", Icon: KeyRound },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setResourcesOpen(false); }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const resourcesActive = location.startsWith("/blog") || location.startsWith("/testimonials") ||
    location.startsWith("/implementation") || location.startsWith("/funding-guide") ||
    location.startsWith("/staff-feedback-report") || location.startsWith("/winter-2026-promo") ||
    location === "/resources" || location === "/bundles";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-[#f95555] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <div className="sticky top-0 z-50">
        {/* Top utility bar */}
        <div className="bg-[#f95555] text-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-5">
              <a href="tel:+441264243243" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity whitespace-nowrap">
                <Phone size={12} aria-hidden="true" />
                <span className="font-medium">+44 1264 243243</span>
              </a>
              <Link href="/contact" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity whitespace-nowrap">
                <Mail size={12} aria-hidden="true" />
                <span>Contact Us</span>
              </Link>
            </div>
            <Link href="/request-quote"
              className="font-semibold tracking-wider uppercase bg-white text-[#f95555] px-3 py-1 rounded hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              Request Free Sample
            </Link>
          </div>
        </div>

        {/* Main nav */}
        <header className={`bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"} border-b border-gray-100`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663386085875/ECJPbzFqDrCcagBaPp7NxP/gf-logo_429d85e9.png"
                alt="Generation Faraday - home"
                className="h-9 w-auto object-contain"
              />
              <span className="text-xs text-[#f95555] font-bold tracking-widest uppercase hidden sm:block" style={{ fontFamily: "'Cabin', sans-serif" }}>
                United Kingdom
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative text-sm font-medium transition-colors group py-1 whitespace-nowrap ${
                      active ? "text-[#f95555]" : "text-gray-600 hover:text-[#f95555]"
                    }`}
                  >
                    {link.label}
                    <span aria-hidden="true" className={`absolute bottom-0 left-0 h-0.5 bg-[#f95555] transition-all duration-200 ease-out ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                );
              })}

              {/* Resources dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                  className={`relative flex items-center gap-1 text-sm font-medium transition-colors group py-1 whitespace-nowrap ${
                    resourcesActive ? "text-[#f95555]" : "text-gray-600 hover:text-[#f95555]"
                  }`}
                >
                  Resources
                  <ChevronDown size={14} className={`transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
                  <span aria-hidden="true" className={`absolute bottom-0 left-0 h-0.5 bg-[#f95555] transition-all duration-200 ease-out ${resourcesActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <Link href="/resources" className="text-xs font-bold text-[#f95555] uppercase tracking-wider hover:underline" style={{ fontFamily: "'Cabin', sans-serif" }}>
                        All Resources
                      </Link>
                    </div>
                    {resourceLinks.map((r) => (
                      <Link
                        key={r.href + r.label}
                        href={r.href}
                        className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors group/item"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#EEE9FF] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#f95555]/10 transition-colors">
                          <r.Icon size={13} className="text-[#f95555]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#111111] group-hover/item:text-[#f95555] transition-colors" style={{ fontFamily: "'Cabin', sans-serif" }}>{r.label}</div>
                          <div className="text-xs text-gray-400 leading-snug">{r.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA */}
            <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
              <a href="#"
                className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2 rounded hover:border-[#f95555] hover:text-[#f95555] transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "'Cabin', sans-serif" }}
                aria-label="Customer login"
              >
                <KeyRound size={14} aria-hidden="true" />
                Login
              </a>
              <Link href="/request-quote"
                className="bg-[#f95555] text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-[#e04444] transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "'Cabin', sans-serif" }}
              >
                Get a Quote
              </Link>
            </div>

            {/* Hamburger */}
            <button
              type="button"
              className="xl:hidden p-2 text-gray-700 hover:text-[#f95555] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <nav id="mobile-menu" aria-label="Mobile navigation" className="xl:hidden bg-white border-t border-gray-100 px-5 py-5 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-medium py-2.5 border-b border-gray-50 transition-colors ${
                      active ? "text-[#f95555]" : "text-gray-700 hover:text-[#f95555]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Resources accordion */}
              <div className="border-b border-gray-50">
                <button
                  type="button"
                  className={`w-full text-left text-sm font-medium py-2.5 flex items-center justify-between transition-colors ${resourcesActive ? "text-[#f95555]" : "text-gray-700 hover:text-[#f95555]"}`}
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  aria-expanded={mobileResourcesOpen}
                >
                  Resources
                  <ChevronDown size={14} className={`transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileResourcesOpen && (
                  <div className="pl-3 pb-2 flex flex-col gap-1">
                    <Link href="/resources" className="text-xs font-bold text-[#f95555] py-1.5">All Resources</Link>
                    {resourceLinks.map((r) => (
                      <Link key={r.href + r.label} href={r.href} className="text-sm text-gray-600 hover:text-[#f95555] py-1.5 transition-colors">
                        {r.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Mobile contact */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                <a href="tel:+441264243243" className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={13} className="text-[#f95555]" aria-hidden="true" /> +44 1264 243243
                </a>
                <Link href="/contact" className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={13} className="text-[#f95555]" aria-hidden="true" /> Contact Us
                </Link>
              </div>
              <Link href="/request-quote"
                className="mt-3 bg-[#f95555] text-white text-sm font-semibold px-5 py-3 rounded text-center hover:bg-[#e04444] transition-colors"
              >
                Get a Quote
              </Link>
              <a href="#"
                className="mt-2 border border-gray-200 text-gray-600 text-sm font-semibold px-5 py-3 rounded text-center hover:border-[#f95555] hover:text-[#f95555] transition-colors flex items-center justify-center gap-2"
              >
                <KeyRound size={14} aria-hidden="true" />
                Customer Login
              </a>
            </nav>
          )}
        </header>
      </div>
    </>
  );
}
