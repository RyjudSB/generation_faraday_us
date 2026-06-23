/* =============================================================
   Accessibility Statement - Generation Faraday UK
   Required under the UK Equality Act 2010 and aligned with
   WCAG 2.1/2.2 Level AA. Updated: March 2026.
   Design: Brand Guidelines 2025 - Cabin/Manrope, Brand Red #f95555
   ============================================================= */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Mail, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function Accessibility() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-24">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Legal</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Accessibility<br /><span className="text-[#8B73FF]">Statement</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Generation Faraday UK is committed to making this website accessible to everyone, including people with disabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-3xl">

          {/* Conformance status */}
          <div className="bg-[#EEE9FF] border border-[#f95555]/20 rounded-2xl p-6 mb-10 flex items-start gap-4">
            <CheckCircle2 size={22} className="text-[#f95555] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-[#111111] mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Partially conformant with WCAG 2.1 Level AA
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                This website partially conforms with the Web Content Accessibility Guidelines (WCAG) version 2.1 at Level AA. "Partially conformant" means that some parts of the content do not fully conform to the accessibility standard. We are actively working to address all known issues.
              </p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed space-y-8">

            <section aria-labelledby="scope-heading">
              <h2 id="scope-heading" className="text-2xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Scope of this statement
              </h2>
              <p>
                This accessibility statement applies to the website at <strong>generationfaraday.co.uk</strong>, operated by Generation Faraday UK (part of MOS Equipment). It covers all pages and content published on this domain.
              </p>
              <p>
                This statement was prepared in March 2026 and will be reviewed and updated at least annually, or whenever significant changes are made to the website.
              </p>
            </section>

            <section aria-labelledby="compliance-heading">
              <h2 id="compliance-heading" className="text-2xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Our commitment
              </h2>
              <p>
                Generation Faraday UK is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards. Our goal is to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, as required under the <strong>Equality Act 2010</strong>.
              </p>
              <p>
                We have taken the following steps to improve accessibility across this website:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Added a visible "Skip to main content" link for keyboard users</li>
                <li>Ensured all navigation elements are keyboard-accessible with visible focus indicators</li>
                <li>Added descriptive <code>alt</code> text to all meaningful images</li>
                <li>Used proper heading hierarchy (<code>h1</code> through <code>h3</code>) throughout all pages</li>
                <li>Associated all form labels with their corresponding input fields using <code>htmlFor</code> and <code>id</code> attributes</li>
                <li>Added <code>aria-label</code> attributes to icon-only buttons and social media links</li>
                <li>Used semantic HTML landmarks (<code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>) on all pages</li>
                <li>Added <code>aria-expanded</code> and <code>aria-controls</code> to all accordion/FAQ components</li>
                <li>Used <code>aria-live</code> regions for dynamic form success/error states</li>
                <li>Marked decorative images and icons as <code>aria-hidden="true"</code></li>
                <li>Added <code>aria-current="page"</code> to active navigation links</li>
                <li>Ensured the mobile menu button communicates its state via <code>aria-expanded</code></li>
              </ul>
            </section>

            <section aria-labelledby="known-issues-heading">
              <h2 id="known-issues-heading" className="text-2xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Known accessibility issues
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3 mb-4">
                <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-amber-800">
                  We are aware of the following issues and are working to resolve them. If you encounter any of these, please contact us and we will do our best to provide the information in an accessible format.
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Animated statistics counters:</strong> The animated counting numbers in the statistics section may be difficult to read for some users. The final values are always visible once animation completes.
                </li>
                <li>
                  <strong>Colour contrast on some decorative elements:</strong> Some secondary text elements (e.g., small captions and source attributions) may not meet the 4.5:1 contrast ratio. We are reviewing these.
                </li>
                <li>
                  <strong>Third-party content:</strong> Some external links open documents (PDFs) hosted by third parties (e.g., government websites, academic journals). We cannot guarantee the accessibility of third-party content.
                </li>
                <li>
                  <strong>Video content:</strong> If video content is added to the site in future, we will ensure captions and transcripts are provided.
                </li>
              </ul>
            </section>

            <section aria-labelledby="technical-heading">
              <h2 id="technical-heading" className="text-2xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Technical information
              </h2>
              <p>
                This website is built using React, TypeScript, and Tailwind CSS. It relies on the following technologies for accessibility:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>HTML5 semantic elements</li>
                <li>WAI-ARIA (Accessible Rich Internet Applications) attributes</li>
                <li>CSS for visual presentation, with no reliance on colour alone to convey information</li>
              </ul>
              <p className="mt-4">
                This website has been tested with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>NVDA screen reader (Windows)</li>
                <li>VoiceOver (macOS and iOS)</li>
                <li>Keyboard-only navigation (Chrome, Firefox, Safari)</li>
              </ul>
            </section>

            <section aria-labelledby="feedback-heading">
              <h2 id="feedback-heading" className="text-2xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Feedback and contact information
              </h2>
              <p>
                We welcome feedback on the accessibility of this website. If you experience any barriers or have difficulty accessing any content, please contact us:
              </p>
              <div className="bg-[#F7F7F8] rounded-xl p-5 mt-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#f95555] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EEE9FF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Mail size={14} className="text-[#f95555]" aria-hidden="true" />
                  </div>
                  <span><strong>Contact Us:</strong> Use our contact form</span>
                </Link>
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-[#EEE9FF] flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <Clock size={14} className="text-[#f95555]" aria-hidden="true" />
                  </div>
                  <span><strong>Response time:</strong> We aim to respond to accessibility feedback within 5 working days.</span>
                </div>
              </div>
              <p className="mt-4">
                When contacting us about an accessibility issue, please include:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>The web address (URL) of the page where you encountered the issue</li>
                <li>A description of the problem</li>
                <li>The assistive technology or browser you are using (if applicable)</li>
              </ul>
            </section>

            <section aria-labelledby="enforcement-heading">
              <h2 id="enforcement-heading" className="text-2xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Enforcement procedure
              </h2>
              <p>
                The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Equality Act 2010 in Great Britain. If you are not happy with how we respond to your complaint, contact the{" "}
                <a
                  href="https://www.equalityhumanrights.com/en/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f95555] underline hover:text-[#2d1f6e]"
                >
                  Equality Advisory and Support Service (EASS)
                </a>
                .
              </p>
            </section>

            <section aria-labelledby="review-heading">
              <h2 id="review-heading" className="text-2xl font-extrabold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                Review and updates
              </h2>
              <p>
                This statement was last reviewed and updated in <strong>March 2026</strong>. We will review this statement at least annually, or whenever significant changes are made to the website.
              </p>
            </section>

          </div>

          {/* Contact CTA */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4">
              Found an accessibility issue on this site? Let us know and we'll fix it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e04444] transition-colors text-sm"
              style={{ fontFamily: "'Cabin', sans-serif" }}
            >
              Report an Accessibility Issue
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
