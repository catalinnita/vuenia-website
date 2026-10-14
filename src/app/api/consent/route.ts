import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/lib/consent";

// Anonymous consent log (consent_log table) — lets us show what was chosen, when, and
// under which banner version, without storing anything that identifies the visitor:
// a random id generated in their browser, the choice, the version and its source.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const id = String(data.id ?? "");
  const choice = data.choice;
  const source = data.source === "gpc" ? "gpc" : "banner";
  if (!UUID_RE.test(id) || (choice !== "accepted" && choice !== "rejected")) {
    return NextResponse.json({ error: "Invalid consent" }, { status: 400 });
  }

  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!projectId || !secretKey) return NextResponse.json({ ok: true }); // nothing to log to

  const res = await fetch(`https://${projectId}.supabase.co/rest/v1/consent_log`, {
    method: "POST",
    headers: { apikey: secretKey, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ consent_id: id, choice, banner_version: CONSENT_VERSION, source }),
  });
  if (!res.ok) console.error("Consent log insert failed:", res.status, await res.text());
  return NextResponse.json({ ok: true });
}
