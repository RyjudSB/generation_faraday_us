/* =============================================================
   Privacy Policy - Generation Faraday UK
   GDPR-compliant privacy policy for a UK business website.
   ============================================================= */
import { useEffect, useState } from "react";
import { Link } from "wouter";

const LAST_UPDATED = "1 March 2026";

const SECTIONS = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: `Generation Faraday UK is a trading name of MOS Equipment Ltd, a company registered in England and Wales. Our registered address is available upon request.

We are the data controller for personal information collected through this website (generationfaraday.co.uk). If you have any questions about how we handle your data, please use our contact form at generationfaraday.co.uk/contact.`,
  },
  {
    id: "what-we-collect",
    title: "2. What Personal Information We Collect",
    content: `We collect the following categories of personal information:

**Information you provide directly:**
- Name and job title (when you submit an enquiry or quote request)
- School or organisation name
- Email address and telephone number
- The content of messages you send us via our contact form
- Information you provide when requesting a free sample

**Information collected automatically:**
- IP address and approximate location (country/region)
- Browser type and version
- Pages visited and time spent on each page
- Referring website
- Device type (desktop, mobile, tablet)

We do not collect sensitive personal data (such as health information, ethnicity, or financial details) through this website.`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use your personal information for the following purposes:

**To respond to your enquiries** - When you submit a contact form or quote request, we use your information to respond to you. The legal basis for this processing is our legitimate interest in responding to potential customers.

**To send you information you have requested** - If you request a free sample, product brochure, or other materials, we use your contact details to fulfil that request. The legal basis is the performance of a contract or pre-contractual steps.

**To improve our website** - We use anonymised analytics data to understand how visitors use our website and to improve its content and usability. The legal basis is our legitimate interest in improving our services.

**To comply with legal obligations** - We may process your information where required by law, such as in response to a court order or regulatory requirement.

We do not use your personal information for automated decision-making or profiling.`,
  },
  {
    id: "marketing",
    title: "4. Marketing Communications",
    content: `We will only send you marketing communications if you have explicitly consented to receive them. You can withdraw your consent at any time by:

- Clicking the "unsubscribe" link in any marketing email
- Using our contact form at generationfaraday.co.uk/contact
- Writing to us at our registered address

We do not sell, rent, or share your personal information with third parties for their marketing purposes.`,
  },
  {
    id: "sharing",
    title: "5. Who We Share Your Information With",
    content: `We share your personal information only in the following circumstances:

**Service providers** - We use third-party services to operate our website and business, including email hosting, website analytics, and customer relationship management software. These providers process data on our behalf and are bound by data processing agreements.

**Legal requirements** - We may disclose your information to law enforcement or regulatory authorities if required by law.

**Business transfers** - If we sell or transfer part of our business, your information may be transferred as part of that transaction. We will notify you in advance if this occurs.

We do not transfer your personal data outside the United Kingdom or European Economic Area without ensuring appropriate safeguards are in place.`,
  },
  {
    id: "retention",
    title: "6. How Long We Keep Your Information",
    content: `We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, and in accordance with our legal obligations:

- **Enquiry and contact form data**: 3 years from the date of last contact
- **Customer records**: 7 years from the end of the business relationship (for accounting and legal purposes)
- **Analytics data**: 26 months (anonymised)

After these periods, your data is securely deleted or anonymised.`,
  },
  {
    id: "your-rights",
    title: "7. Your Rights Under UK GDPR",
    content: `Under UK data protection law, you have the following rights:

**Right of access** - You can request a copy of the personal information we hold about you.

**Right to rectification** - You can ask us to correct inaccurate or incomplete information.

**Right to erasure** - You can ask us to delete your personal information in certain circumstances.

**Right to restrict processing** - You can ask us to limit how we use your information in certain circumstances.

**Right to data portability** - You can ask us to provide your information in a machine-readable format.

**Right to object** - You can object to our processing of your information where we rely on legitimate interests.

**Right to withdraw consent** - Where we rely on your consent, you can withdraw it at any time.

To exercise any of these rights, please use our contact form at generationfaraday.co.uk/contact. We will respond within one month. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
  {
    id: "cookies",
    title: "8. Cookies",
    content: `Our website uses cookies - small text files stored on your device - to improve your experience and help us understand how the site is used.

**Essential cookies** - Required for the website to function. These cannot be disabled.

**Analytics cookies** - Help us understand how visitors interact with the website. We use anonymised analytics data only. You can opt out of analytics cookies using your browser settings or a cookie management tool.

You can control cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of the website.`,
  },
  {
    id: "security",
    title: "9. Security",
    content: `We take the security of your personal information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss, or disclosure.

Our website uses HTTPS encryption for all data in transit. Access to personal data within our organisation is restricted to authorised personnel only.

No method of transmission over the internet is completely secure. While we take all reasonable steps to protect your information, we cannot guarantee absolute security.`,
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we make significant changes, we will update the "Last updated" date at the top of this page and, where appropriate, notify you by email.

We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Contact:** generationfaraday.co.uk/contact
**Post:** Generation Faraday UK, [Registered Address], England

For complaints about how we handle your data, you can also contact the Information Commissioner's Office (ICO):
**Website:** ico.org.uk
**Telephone:** 0303 123 1113`,
  },
];

export default function Privacy() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#111111] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 text-[#C4B8FF] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-[#C4B8FF]" />
              Legal
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contents</p>
                <nav className="flex flex-col gap-1">
                  {SECTIONS.map(s => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-xs text-gray-500 hover:text-[#f95555] py-1 transition-colors leading-tight"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="bg-[#F7F5FF] border border-[#f95555]/10 rounded-xl p-5 mb-10">
                <p className="text-sm text-[#f95555] leading-relaxed">
                  <strong>Summary:</strong> We collect your name, email, and school information when you contact us. We use it only to respond to your enquiry. We don't sell your data. You have full rights over your information under UK GDPR. For questions, <Link href="/contact" className="underline">contact us via our contact form</Link>.
                </p>
              </div>

              {SECTIONS.map(section => (
                <div key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                  <h2 className="text-xl font-bold text-[#111111] mb-4" style={{ fontFamily: "'Cabin', sans-serif" }}>
                    {section.title}
                  </h2>
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.content.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-semibold text-[#111111] mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('- ')) {
                        return <li key={i} className="ml-4 list-disc mb-1">{line.slice(2)}</li>;
                      }
                      if (line.trim() === '') return <br key={i} />;
                      return <p key={i} className="mb-2">{line}</p>;
                    })}
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-8 mt-8">
                <Link href="/request-quote" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f95555] hover:gap-3 transition-all" style={{ fontFamily: "'Cabin', sans-serif" }}>
                  Contact us with any questions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
