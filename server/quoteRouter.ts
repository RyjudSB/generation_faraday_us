import { Resend } from "resend";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_ADDRESS = "quotes@generationfaraday.com";
const TO_ADDRESS = "info@generationfaraday.com";

const QuoteSchema = z.object({
  // Contact
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  organisation: z.string().min(1, "Organisation is required"),

  // Order
  items: z
    .array(
      z.object({
        sku: z.string().min(1),
        name: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, "Please select at least one product"),
  notes: z.string().optional(),

  // Billing
  billingLine1: z.string().min(1, "Billing address is required"),
  billingLine2: z.string().optional(),
  billingCity: z.string().min(1, "Billing city is required"),
  billingCounty: z.string().optional(),
  billingPostcode: z.string().min(1, "Billing postcode is required"),
  billingCountry: z.string().default("United Kingdom"),

  // Shipping
  sameAsBilling: z.boolean().default(true),
  shippingLine1: z.string().optional(),
  shippingLine2: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingCounty: z.string().optional(),
  shippingPostcode: z.string().optional(),
  shippingCountry: z.string().optional(),
});

function formatAddress(
  line1: string,
  line2: string | undefined,
  city: string,
  county: string | undefined,
  postcode: string,
  country: string
) {
  return [line1, line2, city, county, postcode, country]
    .filter(Boolean)
    .join(", ");
}

function buildInternalEmail(data: z.infer<typeof QuoteSchema>): string {
  const shipping = data.sameAsBilling
    ? formatAddress(
        data.billingLine1,
        data.billingLine2,
        data.billingCity,
        data.billingCounty,
        data.billingPostcode,
        data.billingCountry
      )
    : formatAddress(
        data.shippingLine1 ?? "",
        data.shippingLine2,
        data.shippingCity ?? "",
        data.shippingCounty,
        data.shippingPostcode ?? "",
        data.shippingCountry ?? "United Kingdom"
      );

  const billing = formatAddress(
    data.billingLine1,
    data.billingLine2,
    data.billingCity,
    data.billingCounty,
    data.billingPostcode,
    data.billingCountry
  );

  const itemRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.sku}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Quote Request</title></head>
<body style="font-family:Arial,sans-serif;color:#111;max-width:640px;margin:0 auto;padding:24px;">
  <div style="background:#3D2B8E;padding:20px 24px;border-radius:8px 8px 0 0;">
    <h1 style="color:#fff;margin:0;font-size:20px;">New Quote Request</h1>
    <p style="color:#C4B8FF;margin:4px 0 0;font-size:13px;">Generation Faraday UK</p>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px;">

    <h2 style="font-size:15px;color:#3D2B8E;border-bottom:2px solid #EEE9FF;padding-bottom:8px;margin-top:0;">Contact Details</h2>
    <table style="width:100%;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:4px 0;color:#666;width:140px;">Name</td><td style="padding:4px 0;"><strong>${data.firstName} ${data.lastName}</strong></td></tr>
      <tr><td style="padding:4px 0;color:#666;">Email</td><td style="padding:4px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
      ${data.phone ? `<tr><td style="padding:4px 0;color:#666;">Phone</td><td style="padding:4px 0;">${data.phone}</td></tr>` : ""}
      ${data.jobTitle ? `<tr><td style="padding:4px 0;color:#666;">Job Title</td><td style="padding:4px 0;">${data.jobTitle}</td></tr>` : ""}
      <tr><td style="padding:4px 0;color:#666;">Organisation</td><td style="padding:4px 0;">${data.organisation}</td></tr>
    </table>

    <h2 style="font-size:15px;color:#3D2B8E;border-bottom:2px solid #EEE9FF;padding-bottom:8px;margin-top:24px;">Products Requested</h2>
    <table style="width:100%;font-size:14px;border-collapse:collapse;border:1px solid #eee;border-radius:6px;overflow:hidden;">
      <thead>
        <tr style="background:#F5F2FF;">
          <th style="padding:8px 12px;text-align:left;font-size:12px;color:#3D2B8E;text-transform:uppercase;">SKU</th>
          <th style="padding:8px 12px;text-align:left;font-size:12px;color:#3D2B8E;text-transform:uppercase;">Product</th>
          <th style="padding:8px 12px;text-align:center;font-size:12px;color:#3D2B8E;text-transform:uppercase;">Qty</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>

    ${data.notes ? `<h2 style="font-size:15px;color:#3D2B8E;border-bottom:2px solid #EEE9FF;padding-bottom:8px;margin-top:24px;">Additional Notes</h2><p style="font-size:14px;color:#444;margin:0;">${data.notes}</p>` : ""}

    <h2 style="font-size:15px;color:#3D2B8E;border-bottom:2px solid #EEE9FF;padding-bottom:8px;margin-top:24px;">Billing Address</h2>
    <p style="font-size:14px;color:#444;margin:0;">${billing}</p>

    <h2 style="font-size:15px;color:#3D2B8E;border-bottom:2px solid #EEE9FF;padding-bottom:8px;margin-top:24px;">Shipping Address</h2>
    <p style="font-size:14px;color:#444;margin:0;">${data.sameAsBilling ? "<em>Same as billing</em>" : shipping}</p>

  </div>
  <p style="font-size:11px;color:#aaa;margin-top:16px;text-align:center;">Submitted via generationfaraday.co.uk quote form</p>
</body>
</html>`;
}

function buildConfirmationEmail(data: z.infer<typeof QuoteSchema>): string {
  const itemList = data.items
    .map(
      (item) =>
        `<li style="padding:4px 0;">${item.name} (SKU: ${item.sku}) &times; ${item.quantity}</li>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Quote Request Received</title></head>
<body style="font-family:Arial,sans-serif;color:#111;max-width:600px;margin:0 auto;padding:24px;">
  <div style="background:#3D2B8E;padding:20px 24px;border-radius:8px 8px 0 0;">
    <h1 style="color:#fff;margin:0;font-size:20px;">Thank you, ${data.firstName}!</h1>
    <p style="color:#C4B8FF;margin:4px 0 0;font-size:13px;">Your quote request has been received.</p>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
    <p style="font-size:14px;color:#444;margin-top:0;">
      Thank you for getting in touch with Generation Faraday UK. We have received your quote request and a member of our UK team will be in touch within <strong>1 working day</strong>.
    </p>

    <h2 style="font-size:15px;color:#3D2B8E;border-bottom:2px solid #EEE9FF;padding-bottom:8px;">Your Request Summary</h2>
    <p style="font-size:14px;color:#666;margin:0 0 4px;"><strong>Organisation:</strong> ${data.organisation}</p>
    <ul style="font-size:14px;color:#444;margin:8px 0 0;padding-left:20px;">${itemList}</ul>

    <div style="background:#F5F2FF;border-left:4px solid #3D2B8E;padding:14px 16px;border-radius:0 6px 6px 0;margin-top:24px;">
      <p style="margin:0;font-size:13px;color:#3D2B8E;font-weight:bold;">Need to reach us sooner?</p>
      <p style="margin:6px 0 0;font-size:13px;color:#444;">
        Email: <a href="mailto:joejouhal@generationfaraday.com" style="color:#3D2B8E;">joejouhal@generationfaraday.com</a><br>
        Phone: <a href="tel:+441264243243" style="color:#3D2B8E;">+44 1264 243243</a>
      </p>
    </div>
  </div>
  <p style="font-size:11px;color:#aaa;margin-top:16px;text-align:center;">Generation Faraday UK &bull; generationfaraday.co.uk</p>
</body>
</html>`;
}

export const quoteRouter = router({
  submit: publicProcedure.input(QuoteSchema).mutation(async ({ input }) => {
    if (!resend) {
      console.warn("[Quote] RESEND_API_KEY not set  - email not sent in dev mode.");
      return { success: true };
    }

    const [internalResult, confirmationResult] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        replyTo: input.email,
        subject: `New Quote Request from ${input.firstName} ${input.lastName} - ${input.organisation}`,
        html: buildInternalEmail(input),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: input.email,
        subject: "Your Generation Faraday UK Quote Request",
        html: buildConfirmationEmail(input),
      }),
    ]);

    // Resend v6 resolves (not rejects) with { data, error } when the domain is
    // unverified or the API call fails  - check both the Promise status AND the
    // SDK-level error object.
    const internalError =
      internalResult.status === "rejected"
        ? internalResult.reason
        : (internalResult.value as { error?: unknown } | undefined)?.error ?? null;

    if (internalError) {
      console.error("[Quote] Failed to send internal email:", internalError);
      throw new Error(
        "Failed to send quote request. Please try again or contact us directly at joejouhal@generationfaraday.com"
      );
    }

    const confirmationError =
      confirmationResult.status === "rejected"
        ? confirmationResult.reason
        : (confirmationResult.value as { error?: unknown } | undefined)?.error ?? null;

    if (confirmationError) {
      console.warn("[Quote] Confirmation email failed (non-fatal):", confirmationError);
    }

    return { success: true };
  }),
});
