import { NextResponse } from "next/server";

// Beta-access requests are emailed via Resend's HTTP API (no SDK dependency).
// Temporary until requests are stored somewhere queryable (e.g. a Supabase table).
const TO = process.env.BETA_REQUEST_TO || "catalinnita01@gmail.com";
// Resend's shared test sender works without verifying a domain, but only delivers
// to the address the Resend account was created with — set BETA_REQUEST_FROM to
// an address on a verified domain to send anywhere else.
const FROM = process.env.BETA_REQUEST_FROM || "Vuenia <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: Record<string, unknown>, key: string, max: number) {
  const value = data[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — beta request not sent");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: a field real visitors never see. Bots that fill it get a fake
  // success so they don't retry.
  if (field(data, "company", 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = field(data, "name", 200);
  const email = field(data, "email", 320);
  const useCase = field(data, "useCase", 5000);

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Beta access request — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nWhat they're looking to create:\n${useCase || "(left blank)"}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend rejected beta request email:", res.status, await res.text());
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
