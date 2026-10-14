// Version of the Terms of Service people accept at checkout (Stripe) and sign-up.
// Bump it whenever /terms changes materially, and keep admin/src/lib/legal.ts in step —
// the accepted version is stored on each profile.
export const TERMS_VERSION = "2026-10-14";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.vuenia.com").replace(/\/$/, "");

// Stripe Checkout's required "I agree to the Terms" checkbox. The message overrides
// Stripe's default wording to include the UK/EU immediate-start acknowledgement.
// Needs a Terms of Service URL saved in the Stripe Dashboard (Settings → Public
// details); without it Stripe rejects the session — see withTermsConsent below.
export function termsConsentParams() {
  return {
    consent_collection: { terms_of_service: "required" as const },
    custom_text: {
      terms_of_service_acceptance: {
        message: `I agree to the [Terms of Service](${SITE_URL}/terms) and [Privacy Policy](${SITE_URL}/privacy), and ask for my subscription and credit to start straight away — I understand my 14-day cancellation right ends for any credit I use.`,
      },
    },
  };
}

// Stripe refuses consent collection until a Terms URL is set in the Dashboard. Rather
// than break checkout over that, retry without it — and say so loudly in the logs.
export async function withTermsConsent<T>(create: (terms: ReturnType<typeof termsConsentParams> | Record<string, never>) => Promise<T>): Promise<T> {
  try {
    return await create(termsConsentParams());
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    if (!/terms of service/i.test(message)) throw e;
    console.error("Stripe terms checkbox unavailable — set a Terms of Service URL in the Stripe Dashboard. Checkout created without it:", message);
    return create({});
  }
}
