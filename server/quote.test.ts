import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock resend before importing the router
vi.mock("resend", () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ data: { id: "mock-email-id" }, error: null }),
      },
    })),
  };
});

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const validQuoteInput = {
  firstName: "Jane",
  lastName: "Smith",
  email: "j.smith@school.ac.uk",
  phone: "+44 1264 000000",
  jobTitle: "Headteacher",
  organisation: "Westfield Academy",
  items: [
    { sku: "GF-MAXLOCK-001", name: "Max-Lock Faraday Bag", quantity: 100 },
  ],
  notes: "Please include a free sample.",
  billingLine1: "1 School Lane",
  billingLine2: "",
  billingCity: "Andover",
  billingCounty: "Hampshire",
  billingPostcode: "SP10 1AA",
  billingCountry: "United Kingdom",
  sameAsBilling: true,
};

describe("quote.submit", () => {
  it("returns success when emails are sent", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.quote.submit(validQuoteInput);
    expect(result).toEqual({ success: true });
  });

  it("requires at least one product item", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.quote.submit({ ...validQuoteInput, items: [] })
    ).rejects.toThrow();
  });

  it("requires a valid email address", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.quote.submit({ ...validQuoteInput, email: "not-an-email" })
    ).rejects.toThrow();
  });

  it("requires organisation name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.quote.submit({ ...validQuoteInput, organisation: "" })
    ).rejects.toThrow();
  });

  it("validates RESEND_API_KEY is present in environment", () => {
    // This test ensures the env var is configured
    expect(process.env.RESEND_API_KEY).toBeTruthy();
    expect(process.env.RESEND_API_KEY).not.toBe("undefined");
  });
});
