/* =============================================================
   Contact Page - Generation Faraday UK
   Local Representative: Andover Forensics
   ============================================================= */
import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", school: "", email: "", role: "", students: "", message: "",
  });

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch within one working day.");
  }

  return (
    <main id="main-content" className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#111111] py-20 lg:py-24">
        <div className="container">
          <div className={`max-w-3xl transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="section-label text-[#C4B8FF] mb-4">Get in Touch</div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Ready to create a<br /><span className="text-[#8B73FF]">phone-free school?</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Contact your local UK representative for Generation Faraday — or send us a message directly.
            </p>
          </div>
        </div>
      </section>

      {/* Local Rep Feature */}
      <section className="py-16 bg-[#F7F7F8] border-b border-gray-200">
        <div className="container">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Your Local Representative</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Andover Forensics
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
              Authorised UK representative for Generation Faraday. Based in Hampshire, serving schools and organisations across the United Kingdom.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
            {/* Rep card header */}
            <div className="bg-[#111111] px-8 py-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 p-2">
                <span className="text-[#111111] font-extrabold text-lg tracking-tight" style={{ fontFamily: "'Cabin', sans-serif" }}>AF</span>
              </div>
              <div>
                <div className="text-white font-extrabold text-xl mb-1" style={{ fontFamily: "'Cabin', sans-serif" }}>Andover Forensics</div>
                <div className="text-gray-400 text-sm">Authorised Generation Faraday UK Representative</div>
                <a
                  href="https://www.andoverforensics.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#8B73FF] text-xs font-semibold mt-1.5 hover:text-[#C4B8FF] transition-colors"
                >
                  www.andoverforensics.com <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div className="px-8 py-8 grid sm:grid-cols-3 gap-6">
              <a
                href="tel:+441264243243"
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-[#F7F7F8] hover:bg-[#EEE9FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEE9FF] group-hover:bg-white flex items-center justify-center transition-colors">
                  <Phone size={20} className="text-[#f95555]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</div>
                  <div className="text-sm font-bold text-[#111111]">+44 1264 243243</div>
                </div>
              </a>

              <a
                href="mailto:info@andoverforensics.com"
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-[#F7F7F8] hover:bg-[#EEE9FF] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEE9FF] group-hover:bg-white flex items-center justify-center transition-colors">
                  <Mail size={20} className="text-[#f95555]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</div>
                  <div className="text-sm font-bold text-[#111111]">info@andoverforensics.com</div>
                </div>
              </a>

              <div className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-[#F7F7F8]">
                <div className="w-12 h-12 rounded-xl bg-[#EEE9FF] flex items-center justify-center">
                  <MapPin size={20} className="text-[#f95555]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-sm font-bold text-[#111111]">Andover, Hampshire</div>
                  <div className="text-xs text-gray-400">United Kingdom</div>
                </div>
              </div>
            </div>

            {/* What they offer */}
            <div className="px-8 pb-8">
              <div className="bg-[#111111] rounded-2xl p-6">
                <div className="text-xs font-bold text-[#C4B8FF] uppercase tracking-wide mb-4">What your local rep provides</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Free consultation for your school or organisation",
                    "Local on-site demonstrations available",
                    "Tailored pricing in GBP",
                    "Free sample bags before commitment",
                    "Implementation support and training",
                    "Ongoing compliance and app assistance",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 size={12} className="text-[#8B73FF] flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-10">
            <div className="section-label mb-2">Send a Message</div>
            <h2 className="text-3xl font-extrabold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>Or fill in the form below.</h2>
            <p className="text-gray-500 mt-2 text-sm">We'll connect you with your local representative within one working day.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div aria-live="polite" aria-atomic="true">
              {submitted ? (
                <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-10 text-center" role="status">
                  <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" aria-hidden="true" />
                  <h2 className="text-2xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Cabin', sans-serif" }}>Message received!</h2>
                  <p className="text-gray-500">Thank you for getting in touch. Your local representative will respond within one working day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Contact form">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-firstName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">First Name *</label>
                      <input
                        id="contact-firstName"
                        required
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors"
                        placeholder="Jane"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-lastName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Last Name *</label>
                      <input
                        id="contact-lastName"
                        required
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors"
                        placeholder="Smith"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-school" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">School / Organisation *</label>
                    <input
                      id="contact-school"
                      required
                      type="text"
                      value={form.school}
                      onChange={(e) => setForm({ ...form, school: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors"
                      placeholder="St. Mary's Secondary School"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email Address *</label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors"
                        placeholder="jane.smith@school.co.uk"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-role" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Your Role</label>
                      <select
                        id="contact-role"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors bg-white"
                      >
                        <option value="">Select role</option>
                        <option value="headteacher">Headteacher / Principal</option>
                        <option value="deputy">Deputy Headteacher</option>
                        <option value="senco">SENCO</option>
                        <option value="teacher">Class Teacher</option>
                        <option value="admin">School Business Manager</option>
                        <option value="governor">Governor / Trustee</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-students" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Number of Students</label>
                    <select
                      id="contact-students"
                      value={form.students}
                      onChange={(e) => setForm({ ...form, students: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors bg-white"
                    >
                      <option value="">Select school size</option>
                      <option value="under100">Under 100</option>
                      <option value="100-500">100-500</option>
                      <option value="500-1000">500-1,000</option>
                      <option value="1000-2000">1,000-2,000</option>
                      <option value="over2000">Over 2,000 (Multi-Academy Trust)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Message (Optional)</label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] transition-colors resize-none"
                      placeholder="Tell us about your school's current phone policy, any specific requirements, or questions you have..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#f95555] text-white font-bold py-4 rounded-lg hover:bg-[#e04444] transition-colors text-sm"
                    style={{ fontFamily: "'Cabin', sans-serif" }}
                  >
                    Send Request
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form you agree to be contacted by our UK representative. We never share your data with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
