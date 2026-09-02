import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Validation, rate limiting and delivery all happen on the server, so no API
 * key or address is ever exposed to the browser. The form works as soon as one
 * of the environment variables below is set — see .env.example.
 *
 * Until then the route answers with code "NOT_CONFIGURED" and the UI tells the
 * visitor honestly that nothing was sent, rather than showing a fake success.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { min: 5, max: 160 },
  message: { min: 10, max: 4000 },
} as const;

/** Best-effort, per-instance throttle. Enough to stop casual abuse. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function readString(source: Record<string, unknown>, key: keyof ContactPayload): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: unknown): { data: ContactPayload } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Expected a JSON object." };
  }

  const source = body as Record<string, unknown>;
  const data: ContactPayload = {
    name: readString(source, "name"),
    email: readString(source, "email"),
    message: readString(source, "message"),
  };

  if (data.name.length < LIMITS.name.min || data.name.length > LIMITS.name.max) {
    return { error: "Please provide your name." };
  }
  if (
    data.email.length < LIMITS.email.min ||
    data.email.length > LIMITS.email.max ||
    !EMAIL_PATTERN.test(data.email)
  ) {
    return { error: "Please provide a valid email address." };
  }
  if (data.message.length < LIMITS.message.min || data.message.length > LIMITS.message.max) {
    return { error: "Please write a message between 10 and 4000 characters." };
  }

  return { data };
}

/** Keeps submitted text out of headers and away from HTML injection. */
function plainTextBody(data: ContactPayload): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    "",
    data.message,
  ].join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "INVALID", message: "Could not read the request." },
      { status: 400 },
    );
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json(
      { ok: false, code: "INVALID", message: result.error },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "local";

  if (rateLimited(clientKey)) {
    return NextResponse.json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "That's a few messages in quick succession — please try again in a minute.",
      },
      { status: 429 },
    );
  }

  const data = result.data;

  // ---------------------------------------------------------------------------
  // INTEGRATION POINT — choose ONE delivery route and set its variables in
  // .env.local (never commit them). Both branches run server-side only.
  //
  //   A. Resend      RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
  //   B. Webhook     CONTACT_WEBHOOK_URL   (Formspree, Zapier, n8n, Discord…)
  //
  // To use a different provider (SendGrid, Postmark, Nodemailer, Supabase…),
  // replace the fetch call inside the matching branch. Nothing else in the app
  // needs to change — the client only reads `ok` and `code`.
  // ---------------------------------------------------------------------------

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (resendKey && toEmail && fromEmail) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: data.email,
          subject: `Portfolio message from ${data.name}`,
          text: plainTextBody(data),
        }),
      });

      if (!response.ok) {
        // Deliberately not logging the response body — it can echo credentials.
        console.error("Contact delivery failed with status", response.status);
        return NextResponse.json(
          {
            ok: false,
            code: "DELIVERY_FAILED",
            message: "The message could not be delivered. Please try again shortly.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }

    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          source: "portfolio-contact-form",
        }),
      });

      if (!response.ok) {
        console.error("Contact webhook failed with status", response.status);
        return NextResponse.json(
          {
            ok: false,
            code: "DELIVERY_FAILED",
            message: "The message could not be delivered. Please try again shortly.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error("Contact delivery error:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: "The message could not be delivered. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: false,
      code: "NOT_CONFIGURED",
      message: "No email service is configured for this form yet.",
    },
    { status: 503 },
  );
}
