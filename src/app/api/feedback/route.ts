import { NextResponse } from "next/server";

// "Share your feedback" (src/app/feedback) — emailed to the team via Resend's HTTP API.
const TO = process.env.FEEDBACK_TO || "feedback@vuenia.com";
// Resend's shared test sender only delivers to the Resend account's own address — set
// BETA_REQUEST_FROM to an address on a verified domain to send anywhere else.
const FROM = process.env.BETA_REQUEST_FROM || "Vuenia <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: Record<string, unknown>, key: string, max: number) {
  const value = data[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — feedback not sent");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

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
  const message = field(data, "message", 10000);
  if (!message) return NextResponse.json({ error: "Feedback is required" }, { status: 400 });
  const replyTo = EMAIL_RE.test(email) ? email : null;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject: `Feedback${name ? ` from ${name}` : ""}`,
      text: `Name: ${name || "(not given)"}\nEmail: ${email || "(not given)"}\n\n${message}`,
    }),
  });
  if (!res.ok) {
    console.error("Resend rejected feedback email:", res.status, await res.text());
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
