/**
 * Vercel Serverless Function  - tRPC handler
 *
 * The Vercel Node.js runtime passes a Node.js IncomingMessage (not a Web API
 * Request). fetchRequestHandler requires a proper Web API Request with an
 * absolute URL. We manually construct one here.
 *
 * Route: /api/trpc/[trpc]  →  matched by vercel.json rewrite
 */
import type { IncomingMessage, ServerResponse } from "http";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { z } from "zod";
import superjson from "superjson";

// ── Resend ────────────────────────────────────────────────────────────────────
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = "quotes@generationfaraday.com";
const TO_ADDRESSES = ["joejouhal@generationfaraday.com", "info@generationfaraday.com"];

// ── tRPC ──────────────────────────────────────────────────────────────────────
const t = initTRPC.create({ transformer: superjson });

// ── Quote schema ──────────────────────────────────────────────────────────────
const QuoteSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  organisation: z.string().min(1),
  items: z
    .array(
      z.object({
        sku: z.string().min(1),
        name: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .min(1),
  notes: z.string().optional(),
  billingLine1: z.string().min(1),
  billingLine2: z.string().optional(),
  billingCity: z.string().min(1),
  billingCounty: z.string().optional(),
  billingPostcode: z.string().min(1),
  billingCountry: z.string().default("United Kingdom"),
  sameAsBilling: z.boolean().default(true),
  shippingLine1: z.string().optional(),
  shippingLine2: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingCounty: z.string().optional(),
  shippingPostcode: z.string().optional(),
  shippingCountry: z.string().optional(),
});

function fmtAddr(
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

// ── Shared email chrome ───────────────────────────────────────────────────────
const emailBase = (content: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generation Faraday UK</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0eff5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f0eff5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#2d1f6e 0%,#4a35a8 60%,#6b52c8 100%);border-radius:16px 16px 0 0;padding:40px 48px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <!-- Logo wordmark -->
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:rgba(255,255,255,0.15);border-radius:8px;padding:8px 14px;">
                          <span style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ffffff;">GENERATION FARADAY UK</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;border-radius:0 0 16px 16px;padding:0 0 8px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:28px 0 8px;" align="center">
              <p style="margin:0 0 6px;font-size:12px;color:#9b97b8;">Generation Faraday UK &bull; <a href="https://generationfaraday.co.uk" style="color:#9b97b8;text-decoration:none;">generationfaraday.co.uk</a></p>
              <p style="margin:0;font-size:11px;color:#b8b5cc;">Protecting focus. Empowering learning.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ── Customer confirmation email ───────────────────────────────────────────────
function buildConfirmationEmail(data: z.infer<typeof QuoteSchema>): string {
  const itemRows = data.items
    .map(
      (item, i) => `
      <tr style="background:${i % 2 === 0 ? "#faf9ff" : "#ffffff"};">
        <td style="padding:14px 20px;font-size:14px;color:#1a1535;font-weight:500;border-bottom:1px solid #ede9f8;">${item.name}</td>
        <td style="padding:14px 20px;font-size:13px;color:#6b5fa8;font-family:monospace;border-bottom:1px solid #ede9f8;">${item.sku}</td>
        <td style="padding:14px 20px;font-size:14px;color:#1a1535;font-weight:600;text-align:center;border-bottom:1px solid #ede9f8;">${item.quantity}</td>
      </tr>`
    )
    .join("");

  const content = `
    <!-- Hero band -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="background:linear-gradient(135deg,#2d1f6e 0%,#4a35a8 60%,#6b52c8 100%);padding:0 48px 40px;">
          <h1 style="margin:0 0 8px;font-size:32px;font-weight:800;color:#ffffff;line-height:1.2;letter-spacing:-0.5px;">Thank you,<br>${data.firstName}!</h1>
          <p style="margin:0;font-size:16px;color:rgba(255,255,255,0.8);line-height:1.5;">Your quote request has been received and is being reviewed by our team.</p>
        </td>
      </tr>
    </table>

    <!-- Status pill -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:28px 48px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#eef9f0;border:1.5px solid #4caf7d;border-radius:100px;padding:8px 18px;">
                <span style="font-size:13px;font-weight:600;color:#2e7d52;letter-spacing:0.3px;">&#10003;&nbsp; Request submitted successfully</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Intro text -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:20px 48px 28px;">
          <p style="margin:0;font-size:15px;color:#4a4568;line-height:1.7;">
            Thank you for choosing Generation Faraday UK. A member of our team will review your request and get back to you with a tailored quote within <strong style="color:#2d1f6e;">1 working day</strong>. In the meantime, here's a summary of what you submitted.
          </p>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="padding:0 48px;"><div style="height:1px;background:#ede9f8;"></div></td></tr>
    </table>

    <!-- Order summary -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:28px 48px 8px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9b97b8;">Order Summary</p>
          <p style="margin:0;font-size:20px;font-weight:700;color:#1a1535;">${data.organisation}</p>
        </td>
      </tr>
    </table>

    <!-- Products table -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td style="padding:12px 48px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-radius:10px;overflow:hidden;border:1.5px solid #ede9f8;">
            <thead>
              <tr style="background:#f5f2ff;">
                <th style="padding:12px 20px;text-align:left;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b5fa8;">Product</th>
                <th style="padding:12px 20px;text-align:left;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b5fa8;">SKU</th>
                <th style="padding:12px 20px;text-align:center;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b5fa8;">Qty</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
        </td>
      </tr>
    </table>

    ${data.notes ? `
    <!-- Notes -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:20px 48px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#faf9ff;border-radius:10px;border:1.5px solid #ede9f8;">
            <tr>
              <td style="padding:16px 20px;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#9b97b8;">Additional Notes</p>
                <p style="margin:0;font-size:14px;color:#4a4568;line-height:1.6;">${data.notes}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>` : ""}

    <!-- Divider -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="padding:28px 48px 0;"><div style="height:1px;background:#ede9f8;"></div></td></tr>
    </table>

    <!-- Contact CTA -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:24px 48px 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#2d1f6e,#4a35a8);border-radius:12px;">
            <tr>
              <td style="padding:24px 28px;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);letter-spacing:0.5px;text-transform:uppercase;">Need to reach us sooner?</p>
                <p style="margin:0 0 14px;font-size:15px;color:#ffffff;line-height:1.5;">Our UK team is here to help with any questions about your order.</p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:20px;">
                      <a href="mailto:joejouhal@generationfaraday.com" style="font-size:13px;color:#c4b8ff;text-decoration:none;">&#9993;&nbsp; joejouhal@generationfaraday.com</a>
                    </td>
                    <td>
                      <a href="tel:+441264243243" style="font-size:13px;color:#c4b8ff;text-decoration:none;">&#9742;&nbsp; +44 1264 243243</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return emailBase(content);
}

// ── Internal notification email ───────────────────────────────────────────────
function buildInternalEmail(data: z.infer<typeof QuoteSchema>): string {
  const billing = fmtAddr(
    data.billingLine1, data.billingLine2, data.billingCity,
    data.billingCounty, data.billingPostcode, data.billingCountry
  );
  const shipping = data.sameAsBilling
    ? "Same as billing address"
    : fmtAddr(
        data.shippingLine1 ?? "", data.shippingLine2, data.shippingCity ?? "",
        data.shippingCounty, data.shippingPostcode ?? "",
        data.shippingCountry ?? "United Kingdom"
      );

  const itemRows = data.items
    .map(
      (item, i) => `
      <tr style="background:${i % 2 === 0 ? "#faf9ff" : "#ffffff"};">
        <td style="padding:14px 20px;font-size:14px;color:#1a1535;font-weight:500;border-bottom:1px solid #ede9f8;">${item.name}</td>
        <td style="padding:14px 20px;font-size:13px;color:#6b5fa8;font-family:monospace;border-bottom:1px solid #ede9f8;">${item.sku}</td>
        <td style="padding:14px 20px;font-size:14px;color:#1a1535;font-weight:600;text-align:center;border-bottom:1px solid #ede9f8;">${item.quantity}</td>
      </tr>`
    )
    .join("");

  const infoRow = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 0;font-size:13px;font-weight:600;color:#9b97b8;width:130px;vertical-align:top;">${label}</td>
          <td style="padding:10px 0;font-size:14px;color:#1a1535;vertical-align:top;">${value}</td>
        </tr>`
      : "";

  const content = `
    <!-- Hero band -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="background:linear-gradient(135deg,#2d1f6e 0%,#4a35a8 60%,#6b52c8 100%);padding:0 48px 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <h1 style="margin:0 0 6px;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">New Quote Request</h1>
                <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.75);">From ${data.firstName} ${data.lastName} &bull; ${data.organisation}</p>
              </td>
              <td align="right" valign="middle">
                <div style="background:rgba(255,255,255,0.15);border-radius:100px;padding:8px 16px;white-space:nowrap;">
                  <span style="font-size:12px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">&#9679; Action Required</span>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Contact details -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:28px 48px 0;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9b97b8;">Contact Details</p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#faf9ff;border-radius:10px;border:1.5px solid #ede9f8;">
            <tr>
              <td style="padding:4px 20px 4px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  ${infoRow("Name", `${data.firstName} ${data.lastName}`)}
                  ${infoRow("Email", `<a href="mailto:${data.email}" style="color:#4a35a8;text-decoration:none;">${data.email}</a>`)}
                  ${data.phone ? infoRow("Phone", `<a href="tel:${data.phone}" style="color:#4a35a8;text-decoration:none;">${data.phone}</a>`) : ""}
                  ${data.jobTitle ? infoRow("Job Title", data.jobTitle) : ""}
                  ${infoRow("Organisation", `<strong>${data.organisation}</strong>`)}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Products -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:24px 48px 0;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9b97b8;">Products Requested</p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-radius:10px;overflow:hidden;border:1.5px solid #ede9f8;">
            <thead>
              <tr style="background:#f5f2ff;">
                <th style="padding:12px 20px;text-align:left;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b5fa8;">Product</th>
                <th style="padding:12px 20px;text-align:left;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b5fa8;">SKU</th>
                <th style="padding:12px 20px;text-align:center;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b5fa8;">Qty</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>
        </td>
      </tr>
    </table>

    ${data.notes ? `
    <!-- Notes -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:20px 48px 0;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9b97b8;">Additional Notes</p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#faf9ff;border-radius:10px;border:1.5px solid #ede9f8;">
            <tr><td style="padding:16px 20px;font-size:14px;color:#4a4568;line-height:1.6;">${data.notes}</td></tr>
          </table>
        </td>
      </tr>
    </table>` : ""}

    <!-- Addresses -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:24px 48px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="48%" valign="top" style="padding-right:8px;">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9b97b8;">Billing Address</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#faf9ff;border-radius:10px;border:1.5px solid #ede9f8;">
                  <tr><td style="padding:14px 16px;font-size:14px;color:#1a1535;line-height:1.6;">${billing}</td></tr>
                </table>
              </td>
              <td width="4%"></td>
              <td width="48%" valign="top" style="padding-left:8px;">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9b97b8;">Shipping Address</p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#faf9ff;border-radius:10px;border:1.5px solid #ede9f8;">
                  <tr><td style="padding:14px 16px;font-size:14px;color:#1a1535;line-height:1.6;">${shipping}</td></tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Reply CTA -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding:28px 48px 36px;" align="center">
          <a href="mailto:${data.email}?subject=Re: Your Generation Faraday UK Quote Request" style="display:inline-block;background:linear-gradient(135deg,#2d1f6e,#4a35a8);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.3px;">Reply to ${data.firstName} &rarr;</a>
        </td>
      </tr>
    </table>
  `;

  return emailBase(content);
}

// ── Router ────────────────────────────────────────────────────────────────────
const appRouter = t.router({
  quote: t.router({
    submit: t.procedure.input(QuoteSchema).mutation(async ({ input }) => {
      if (!resend) {
        console.warn("[Quote] RESEND_API_KEY not set  - skipping email send.");
        return { success: true };
      }

      const { error: internalError } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESSES,
        replyTo: input.email,
        subject: `New Quote Request  - ${input.organisation} (${input.items.length} item${input.items.length > 1 ? "s" : ""})`,
        html: buildInternalEmail(input),
      });

      if (internalError) {
        console.error("[Quote] Internal email failed:", internalError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Failed to send quote request. Please try again or contact us directly at contact@generationfaraday.co.uk",
        });
      }

      const { error: confirmError } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: input.email,
        subject: `Your Generation Faraday UK Quote Request  - ${input.organisation}`,
        html: buildConfirmationEmail(input),
      });

      if (confirmError) {
        console.warn("[Quote] Confirmation email failed (non-fatal):", confirmError);
      }

      return { success: true };
    }),
  }),
});

// ── Vercel handler ────────────────────────────────────────────────────────────
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const host = req.headers.host ?? "generationfaraday.co.uk";
  const proto = req.headers["x-forwarded-proto"] ?? "https";
  const absoluteUrl = `${proto}://${host}${req.url}`;

  const bodyChunks: Buffer[] = [];
  for await (const chunk of req) {
    bodyChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const body = Buffer.concat(bodyChunks);

  const webRequest = new Request(absoluteUrl, {
    method: req.method ?? "GET",
    headers: req.headers as Record<string, string>,
    body: req.method !== "GET" && req.method !== "HEAD" ? body : undefined,
  });

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: webRequest,
    router: appRouter,
    createContext: () => ({}),
  });

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  const responseBody = await response.arrayBuffer();
  res.end(Buffer.from(responseBody));
}
