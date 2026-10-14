// Cookie consent for the one thing on this site that needs it: the Google Ads tag.
// Vercel Analytics / Speed Insights are cookieless and don't. The choice lives in the
// visitor's browser; each decision is also logged anonymously (api/consent) so consent
// can be demonstrated (GDPR Art. 7). Bump CONSENT_VERSION when the banner's wording or
// purposes change — older choices are then asked again.
export const CONSENT_VERSION = 1;
const STORAGE_KEY = "vuenia-consent";
export const CONSENT_EVENT = "vuenia:consent"; // fired on window when the choice changes
export const OPEN_SETTINGS_EVENT = "vuenia:cookie-settings"; // re-open the banner

export type ConsentChoice = "accepted" | "rejected";
export type StoredConsent = { id: string; choice: ConsentChoice; version: number; at: string };

export function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredConsent) : null;
    return parsed && parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

// Global Privacy Control — a browser-level "don't sell or share my data". Honoured as
// a rejection, without asking (California and several other US states require it).
export function hasGlobalPrivacyControl(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function saveConsent(choice: ConsentChoice, source: "banner" | "gpc"): StoredConsent {
  const record: StoredConsent = {
    id: readConsent()?.id ?? crypto.randomUUID(),
    choice,
    version: CONSENT_VERSION,
    at: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage blocked — the choice still applies for this page view */
  }
  // Anonymous record: a random id, the choice, banner version and source. No personal data.
  try {
    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: record.id, choice, version: CONSENT_VERSION, source }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* logging must never break the page */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
  return record;
}
