/* =============================================================
   Footer - Generation Faraday UK "Clean Signal" design
   Dark background (#1d1d1d), white text, brand red (#f95555) accent links.
   All internal links scroll to top on navigation.
   WCAG 2.1/2.2 AA: aria-label on social links, aria-hidden on
   decorative icons/SVGs, landmark nav labels.
   ============================================================= */
import { Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useCallback } from "react";

const productLinks = [
  { label: "Faraday Signal-Blocking Bags", href: "/products" },
  { label: "Organisers & Storage", href: "/products" },
  { label: "Locking & Security Cases", href: "/products" },
  { label: "Event & Venue Solutions", href: "/products" },
  { label: "View All Products", href: "/products" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Compare Solutions", href: "/compare" },
  { label: "The App", href: "/app" },
  { label: "Resources & Research", href: "/resources" },
];

const resourceLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Download Brochure", href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663421755905/3YCXv4tdieCm7bVuJSQHVg/brochure_8f4172df.pdf", external: true },
  { label: "Implementation Guide", href: "/resources" },
  { label: "Research & Evidence", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request a Free Sample", href: "/request-quote" },
];

/** Internal link that always scrolls to the top of the destination page */
function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const [location] = useLocation();

  const handleClick = useCallback(() => {
    if (location === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
    }
  }, [location, href]);

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <NavLink href="/" className="flex items-center gap-2 mb-4 w-fit" aria-label="Generation Faraday - home">
              <div className="w-8 h-8 rounded-full bg-[#f95555] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeDasharray="4 2" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-white block" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  Generation Faraday
                </span>
                <span className="text-xs text-[#9B8FD4] font-semibold tracking-widest uppercase" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  United Kingdom
                </span>
              </div>
            </NavLink>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Creating distraction-free environments in UK schools, homes, and beyond. Signal-blocking technology trusted by educators nationwide.
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a href="tel:+441264243243" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={14} className="text-[#f95555]" aria-hidden="true" />
                +44 1264 243243
              </a>
              <NavLink href="/contact" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={14} className="text-[#f95555]" aria-hidden="true" />
                Contact Us
              </NavLink>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              {[
                { Icon: Instagram, label: "Generation Faraday on Instagram", href: "https://www.instagram.com/generationfaraday/" },
                { Icon: Linkedin, label: "Generation Faraday on LinkedIn", href: "https://www.linkedin.com/company/generation-faraday" },
                { Icon: Facebook, label: "Generation Faraday on Facebook", href: "https://www.facebook.com/GenerationFaraday/" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  role="listitem"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f95555] transition-colors"
                >
                  <Icon size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <nav aria-label="Products navigation">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#9B8FD4] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Products
            </h2>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <NavLink href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#9B8FD4] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Company
            </h2>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <NavLink href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources navigation">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#9B8FD4] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Resources
            </h2>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  ) : (
                    <NavLink href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Generation Faraday UK. All rights reserved. Part of MOS Equipment.
          </p>
          <div className="flex items-center gap-4">
            <NavLink href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink href="/accessibility" className="text-xs text-gray-500 hover:text-white transition-colors">Accessibility</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
