import { NextResponse } from "next/server";

// "Request a private demo" (src/app/demo) — the former beta-access form, repurposed.
// Each request is saved to Supabase's beta_requests table (listed in super-admin/) and
// emailed to the team via Resend's HTTP API. Neither uses an SDK; the request counts as
// received if either one succeeds.
const TO = process.env.BETA_REQUEST_TO || "catalinnita01@gmail.com";
// Resend's shared test sender only delivers to the Resend account's own address — set
// BETA_REQUEST_FROM to an address on a verified domain to send anywhere else.
const FROM = process.env.BETA_REQUEST_FROM || "Vuenia <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: Record<string, unknown>, key: string, max: number) {
  const value = data[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Insert via PostgREST with the service-role key (beta_requests has RLS on and no
// policies). A repeat request from the same address hits the unique index (409) — still
// a success from the visitor's point of view.
async function storeRequest(row: { name: string; email: string; use_case: string | null }): Promise<boolean> {
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!projectId || !secretKey) {
    console.error("Supabase env not set — demo request not stored");
    return false;
  }
  const res = await fetch(`https://${projectId}.supabase.co/rest/v1/beta_requests`, {
    method: "POST",
    headers: { apikey: secretKey, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
  if (res.ok || res.status === 409) return true;
  console.error("Supabase rejected demo request:", res.status, await res.text());
  return false;
}

async function emailRequest(name: string, email: string, useCase: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — demo request not emailed");
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Private demo request — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nWhat they'd like to see:\n${useCase || "(left blank)"}`,
    }),
  });
  if (res.ok) return true;
  console.error("Resend rejected demo request email:", res.status, await res.text());
  return false;
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never see it; bots that fill it get a fake success.
  if (field(data, "website", 200)) return NextResponse.json({ ok: true });

  const name = field(data, "name", 200);
  const email = field(data, "email", 320);
  const useCase = field(data, "useCase", 5000);
  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 400 });
  }

  const [stored, emailed] = await Promise.all([
    storeRequest({ name, email, use_case: useCase || null }),
    emailRequest(name, email, useCase),
  ]);
  if (!stored && !emailed) return NextResponse.json({ error: "Could not send" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
