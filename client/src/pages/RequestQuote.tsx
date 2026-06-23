/* ============================================================
   Request Quote - Generation Faraday UK
   Full form: product selection + billing/shipping + contact
   Submits via tRPC → Resend to info@generationfaraday.com
   ============================================================= */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Plus, Minus, Trash2, ChevronDown } from "lucide-react";
import { Link } from "wouter";

// ── Product catalogue ────────────────────────────────────────
const PRODUCTS = [
  {
    category: "School Bags",
    items: [
      { sku: "GFSB-MAX-LOCK", name: "Generation Faraday School Bag MAX LOCK", description: "Signal-blocking school bag with magnetic MAX LOCK mechanism for maximum enforcement." },
      { sku: "GFSB-MAX", name: "Generation Faraday School Bag MAX", description: "Premium signal-blocking school bag, the MAX model for full-day device management." },
      { sku: "GFSB-MAX-M", name: "Generation Faraday School Bag MAX Magnetic", description: "MAX school bag with magnetic closure for fast, teacher-controlled access." },
      { sku: "GFSB-PRO-M", name: "Generation Faraday School Bag PRO Magnetic", description: "PRO-grade signal-blocking bag with magnetic closure system." },
      { sku: "GFSB-PRO", name: "Generation Faraday School Bag PRO", description: "Professional-grade Faraday school bag for reliable signal blocking." },
    ],
  },
  {
    category: "Storage & Organisers",
    items: [
      { sku: "GFSA-SB", name: "Generation Faraday Shielded Box", description: "Signal-blocking storage box for centralised device collection." },
      { sku: "GFSA-PH", name: "Generation Faraday School Accessory, Phone Hotel", description: "Classroom phone hotel with numbered slots and full Faraday shielding." },
      { sku: "GFSA-ORG", name: "Generation Faraday Class Phone Organizer", description: "Class-wide phone organiser for structured, signal-blocked storage." },
      { sku: "GFSA-DB", name: "Generation Faraday Portable Phone Venue Drop Box", description: "Portable Faraday drop box for venue and event phone collection." },
    ],
  },
  {
    category: "Unlocking Devices & Accessories",
    items: [
      { sku: "GFUD-DOCK", name: "Generation Faraday Unlocking Device, Unlocking Dock", description: "Teacher-controlled magnetic unlocking dock compatible with all GF locking bags." },
      { sku: "GFUD-HH-DOCK", name: "Generation Faraday Hand-Held Unlock Dock", description: "Portable hand-held version of the GF unlocking dock for mobile use." },
      { sku: "GFUD-KEY", name: "Generation Faraday Unlocking Key + Lanyard", description: "Magnetic unlocking key with lanyard for teacher-worn access control." },
      { sku: "GFUD-STAND-2WAY", name: "Generation Faraday Dock 2-Way Stand for GFUD-DOCK", description: "2-way stand accessory for the Generation Faraday Unlocking Dock." },
      { sku: "GFUD-STAND-4WAY", name: "Generation Faraday Dock 4-Way Stand for GFUD-DOCK", description: "4-way stand accessory for the Generation Faraday Unlocking Dock." },
      { sku: "GFUD-COVER", name: "Generation Faraday Unlock Dock Tamperproof Cover", description: "Tamperproof cover for the GF Unlocking Dock to prevent unauthorised access." },
    ],
  },
];

type LineItem = { sku: string; name: string; quantity: number };

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  organisation: string;
  notes: string;
  billingLine1: string;
  billingLine2: string;
  billingCity: string;
  billingCounty: string;
  billingPostcode: string;
  billingCountry: string;
  sameAsBilling: boolean;
  shippingLine1: string;
  shippingLine2: string;
  shippingCity: string;
  shippingCounty: string;
  shippingPostcode: string;
  shippingCountry: string;
};

const INITIAL_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  organisation: "",
  notes: "",
  billingLine1: "",
  billingLine2: "",
  billingCity: "",
  billingCounty: "",
  billingPostcode: "",
  billingCountry: "United Kingdom",
  sameAsBilling: true,
  shippingLine1: "",
  shippingLine2: "",
  shippingCity: "",
  shippingCounty: "",
  shippingPostcode: "",
  shippingCountry: "United Kingdom",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-[#111111] mb-4 pb-2 border-b border-gray-100" style={{ fontFamily: "'Cabin', sans-serif" }}>
      {children}
    </h2>
  );
}

function Field({
  id, label, required, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#f95555] focus:ring-1 focus:ring-[#f95555] bg-white transition-colors";

export default function RequestQuote() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [items, setItems] = useState<LineItem[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>("School Bags");
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const mutation = trpc.quote.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (err) => setValidationError(err.message),
  });

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addItem(sku: string, name: string) {
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === sku);
      if (existing) return prev.map((i) => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { sku, name, quantity: 1 }];
    });
  }

  function updateQty(sku: string, delta: number) {
    setItems((prev) =>
      prev
        .map((i) => i.sku === sku ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(sku: string) {
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);

    if (items.length === 0) {
      setValidationError("Please select at least one product before submitting.");
      return;
    }

    mutation.mutate({
      ...form,
      items,
      billingLine2: form.billingLine2 || undefined,
      billingCounty: form.billingCounty || undefined,
      phone: form.phone || undefined,
      jobTitle: form.jobTitle || undefined,
      notes: form.notes || undefined,
      shippingLine1: form.sameAsBilling ? undefined : form.shippingLine1,
      shippingLine2: form.sameAsBilling ? undefined : (form.shippingLine2 || undefined),
      shippingCity: form.sameAsBilling ? undefined : form.shippingCity,
      shippingCounty: form.sameAsBilling ? undefined : (form.shippingCounty || undefined),
      shippingPostcode: form.sameAsBilling ? undefined : form.shippingPostcode,
      shippingCountry: form.sameAsBilling ? undefined : form.shippingCountry,
    });
  }

  if (submitted) {
    return (
      <main id="main-content" className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-24">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-lg w-full text-center" role="status" aria-live="polite">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-emerald-600" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#111111] mb-3" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Quote Request Sent!
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Thank you for your request. A member of our UK team will be in touch within <strong>1 working day</strong>. A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-[#f95555] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#e04444] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              Back to Home
            </Link>
            <Link href="/products" className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-[#f95555] hover:text-[#f95555] transition-colors text-sm" style={{ fontFamily: "'Cabin', sans-serif" }}>
              View Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#FAFAFA]">
      {/* Page header */}
      <div className="bg-[#f95555] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[#C4B8FF] text-xs font-bold tracking-widest uppercase mb-3">
            <span className="w-6 h-px bg-[#C4B8FF]" />
            Generation Faraday UK
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white" style={{ fontFamily: "'Cabin', sans-serif" }}>
            Request a Quote
          </h1>
          <p className="text-red-100 mt-2 text-sm max-w-xl">
            Fill in the form below and our UK team will prepare a tailored quote for your school. We typically respond within 1 working day.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-8">

            {/* ── 1. Contact Details ───────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <SectionHeading>1. Your Contact Details</SectionHeading>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="firstName" label="First Name" required>
                  <input id="firstName" type="text" required autoComplete="given-name"
                    value={form.firstName} onChange={(e) => setField("firstName", e.target.value)}
                    className={inputClass} placeholder="Jane" />
                </Field>
                <Field id="lastName" label="Last Name" required>
                  <input id="lastName" type="text" required autoComplete="family-name"
                    value={form.lastName} onChange={(e) => setField("lastName", e.target.value)}
                    className={inputClass} placeholder="Smith" />
                </Field>
                <Field id="email" label="Email Address" required>
                  <input id="email" type="email" required autoComplete="email"
                    value={form.email} onChange={(e) => setField("email", e.target.value)}
                    className={inputClass} placeholder="j.smith@school.ac.uk" />
                </Field>
                <Field id="phone" label="Phone Number">
                  <input id="phone" type="tel" autoComplete="tel"
                    value={form.phone} onChange={(e) => setField("phone", e.target.value)}
                    className={inputClass} placeholder="+44 1264 000000" />
                </Field>
                <Field id="jobTitle" label="Job Title">
                  <input id="jobTitle" type="text" autoComplete="organization-title"
                    value={form.jobTitle} onChange={(e) => setField("jobTitle", e.target.value)}
                    className={inputClass} placeholder="Headteacher" />
                </Field>
                <Field id="organisation" label="School / Organisation" required>
                  <input id="organisation" type="text" required autoComplete="organization"
                    value={form.organisation} onChange={(e) => setField("organisation", e.target.value)}
                    className={inputClass} placeholder="Westfield Academy" />
                </Field>
              </div>
            </div>

            {/* ── 2. Product Selection ─────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <SectionHeading>2. Products Required</SectionHeading>

              {/* Selected items */}
              {items.length > 0 && (
                <div className="mb-6 bg-[#F5F2FF] rounded-xl p-4 border border-[#f95555]/10">
                  <p className="text-xs font-bold text-[#f95555] uppercase tracking-wide mb-3">Selected Products</p>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.sku} className="flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 border border-gray-100">
                        <span className="flex-1 text-sm text-gray-700 font-medium">{item.name}</span>
                        <span className="text-xs text-gray-400 font-mono">{item.sku}</span>
                        <div className="flex items-center gap-1.5">
                          <button type="button" onClick={() => updateQty(item.sku, -1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#f95555] hover:text-[#f95555] transition-colors"
                            aria-label={`Decrease quantity of ${item.name}`}>
                            <Minus size={10} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-[#111111]" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                          <button type="button" onClick={() => updateQty(item.sku, 1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#f95555] hover:text-[#f95555] transition-colors"
                            aria-label={`Increase quantity of ${item.name}`}>
                            <Plus size={10} />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.sku)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.name}`}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product catalogue accordion */}
              <div className="space-y-2">
                {PRODUCTS.map((cat) => (
                  <div key={cat.category} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                      className="w-full flex items-center justify-between px-5 py-3.5 bg-[#FAFAFA] hover:bg-[#F5F2FF] transition-colors text-left"
                      aria-expanded={openCategory === cat.category}
                      aria-controls={`cat-${cat.category.replace(/\s+/g, "-")}`}
                    >
                      <span className="text-sm font-bold text-[#111111]" style={{ fontFamily: "'Cabin', sans-serif" }}>{cat.category}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${openCategory === cat.category ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {openCategory === cat.category && (
                      <div id={`cat-${cat.category.replace(/\s+/g, "-")}`} className="divide-y divide-gray-50">
                        {cat.items.map((product) => {
                          const inCart = items.find((i) => i.sku === product.sku);
                          return (
                            <div key={product.sku} className="flex items-center gap-4 px-5 py-4 bg-white hover:bg-[#FAFAFA] transition-colors">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#111111]">{product.name}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{product.description}</p>
                                <p className="text-[10px] text-gray-300 font-mono mt-0.5">SKU: {product.sku}</p>
                              </div>
                              {inCart ? (
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <button type="button" onClick={() => updateQty(product.sku, -1)}
                                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#f95555] hover:text-[#f95555] transition-colors"
                                    aria-label={`Decrease quantity of ${product.name}`}>
                                    <Minus size={11} />
                                  </button>
                                  <span className="w-8 text-center text-sm font-bold text-[#f95555]">{inCart.quantity}</span>
                                  <button type="button" onClick={() => updateQty(product.sku, 1)}
                                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#f95555] hover:text-[#f95555] transition-colors"
                                    aria-label={`Increase quantity of ${product.name}`}>
                                    <Plus size={11} />
                                  </button>
                                </div>
                              ) : (
                                <button type="button" onClick={() => addItem(product.sku, product.name)}
                                  className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#f95555] text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-[#e04444] transition-colors"
                                  aria-label={`Add ${product.name} to quote`}>
                                  <Plus size={11} aria-hidden="true" />
                                  Add
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Field id="notes" label="Additional Notes or Questions">
                  <textarea id="notes" rows={3} value={form.notes} onChange={(e) => setField("notes", e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="e.g. custom branding requirements, delivery timescales, number of students, current phone policy..." />
                </Field>
              </div>
            </div>

            {/* ── 3. Billing Address ───────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <SectionHeading>3. Billing Address</SectionHeading>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field id="billingLine1" label="Address Line 1" required>
                    <input id="billingLine1" type="text" required autoComplete="billing address-line1"
                      value={form.billingLine1} onChange={(e) => setField("billingLine1", e.target.value)}
                      className={inputClass} placeholder="1 School Lane" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="billingLine2" label="Address Line 2">
                    <input id="billingLine2" type="text" autoComplete="billing address-line2"
                      value={form.billingLine2} onChange={(e) => setField("billingLine2", e.target.value)}
                      className={inputClass} placeholder="Optional" />
                  </Field>
                </div>
                <Field id="billingCity" label="Town / City" required>
                  <input id="billingCity" type="text" required autoComplete="billing address-level2"
                    value={form.billingCity} onChange={(e) => setField("billingCity", e.target.value)}
                    className={inputClass} placeholder="Andover" />
                </Field>
                <Field id="billingCounty" label="County">
                  <input id="billingCounty" type="text" autoComplete="billing address-level1"
                    value={form.billingCounty} onChange={(e) => setField("billingCounty", e.target.value)}
                    className={inputClass} placeholder="Hampshire" />
                </Field>
                <Field id="billingPostcode" label="Postcode" required>
                  <input id="billingPostcode" type="text" required autoComplete="billing postal-code"
                    value={form.billingPostcode} onChange={(e) => setField("billingPostcode", e.target.value)}
                    className={inputClass} placeholder="SP10 1AA" />
                </Field>
                <Field id="billingCountry" label="Country" required>
                  <input id="billingCountry" type="text" required autoComplete="billing country-name"
                    value={form.billingCountry} onChange={(e) => setField("billingCountry", e.target.value)}
                    className={inputClass} />
                </Field>
              </div>
            </div>

            {/* ── 4. Shipping Address ──────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <SectionHeading>4. Shipping Address</SectionHeading>
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    id="sameAsBilling"
                    type="checkbox"
                    checked={form.sameAsBilling}
                    onChange={(e) => setField("sameAsBilling", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#f95555] focus:ring-[#f95555]"
                  />
                  <span className="text-sm text-gray-700 font-medium">Shipping address is the same as billing address</span>
                </label>
              </div>

              {!form.sameAsBilling && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field id="shippingLine1" label="Address Line 1" required>
                      <input id="shippingLine1" type="text" required autoComplete="shipping address-line1"
                        value={form.shippingLine1} onChange={(e) => setField("shippingLine1", e.target.value)}
                        className={inputClass} placeholder="1 School Lane" />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field id="shippingLine2" label="Address Line 2">
                      <input id="shippingLine2" type="text" autoComplete="shipping address-line2"
                        value={form.shippingLine2} onChange={(e) => setField("shippingLine2", e.target.value)}
                        className={inputClass} placeholder="Optional" />
                    </Field>
                  </div>
                  <Field id="shippingCity" label="Town / City" required>
                    <input id="shippingCity" type="text" required autoComplete="shipping address-level2"
                      value={form.shippingCity} onChange={(e) => setField("shippingCity", e.target.value)}
                      className={inputClass} placeholder="Andover" />
                  </Field>
                  <Field id="shippingCounty" label="County">
                    <input id="shippingCounty" type="text" autoComplete="shipping address-level1"
                      value={form.shippingCounty} onChange={(e) => setField("shippingCounty", e.target.value)}
                      className={inputClass} placeholder="Hampshire" />
                  </Field>
                  <Field id="shippingPostcode" label="Postcode" required>
                    <input id="shippingPostcode" type="text" required autoComplete="shipping postal-code"
                      value={form.shippingPostcode} onChange={(e) => setField("shippingPostcode", e.target.value)}
                      className={inputClass} placeholder="SP10 1AA" />
                  </Field>
                  <Field id="shippingCountry" label="Country" required>
                    <input id="shippingCountry" type="text" required autoComplete="shipping country-name"
                      value={form.shippingCountry} onChange={(e) => setField("shippingCountry", e.target.value)}
                      className={inputClass} />
                  </Field>
                </div>
              )}
            </div>

            {/* ── Error + Submit ───────────────────────────────── */}
            {validationError && (
              <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
                {validationError}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
              <p className="text-xs text-gray-400 mb-4">
                By submitting this form you agree to our{" "}
                <Link href="/privacy" className="underline hover:text-[#f95555]">Privacy Policy</Link>.
                We will never share your data with third parties.
              </p>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-[#f95555] text-white font-bold py-4 rounded-xl hover:bg-[#e04444] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm shadow-lg shadow-black/20"
                style={{ fontFamily: "'Cabin', sans-serif" }}
                aria-busy={mutation.isPending}
              >
                {mutation.isPending ? "Sending Request..." : "Submit Quote Request"}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Our UK team typically responds within 1 working day.
              </p>
            </div>

          </div>
        </form>
      </div>
    </main>
  );
}
