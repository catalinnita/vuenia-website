import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreditPicker from "@/components/CreditPicker";
import RotatingWord from "@/components/RotatingWord";
import { priceInPerspective } from "@/lib/priceInPerspective";
import { getPlatformPrice } from "@/lib/stripePrice";
import { FIVE_MIN_EPISODE_USD } from "@/lib/credit";

export const metadata: Metadata = { title: "Pricing — Vuenia" };

// One platform subscription for everyone — its price comes from the Stripe Price
// (lib/stripePrice.ts), not this file; that lookup is cached for an hour. Tokens are
// separate and at cost: per provider, a user either brings their own key or pays from
// prepaid Vuenia credit, so using credit never costs more than bringing keys. The
// platform card's CreditPicker posts to api/checkout (Stripe Checkout, then sign-up).

const CHECKOUT_ERRORS: Record<string, string> = {
  unavailable: "Checkout isn't available right now. Please try again shortly.",
  error: "Something went wrong opening checkout. Please try again.",
};

// Only what the product does today — each line maps to a live feature (see the home
// page sections and admin). Add new ones here as they ship, not before.
const INCLUDED = [
  "Unlimited podcasts, videos and slide decks",
  "Start in minutes with ready-made AI agents",
  "Publish on autopilot — daily, weekly or once",
  "Researched from the web and your own notes",
  "Natural multi-voice narration with your own hosts",
  "Mistakes caught and fixed before you see them",
  "The final say on every script, slide and voice",
  "Turn your own scripts and notes into episodes",
  "Straight to YouTube in one click",
  "See exactly what every episode costs",
] as const;

const episodeCost = `$${FIVE_MIN_EPISODE_USD.toFixed(2)}`;

const FAQS = [
  {
    q: "How much does an episode cost in tokens?",
    a: `About ${episodeCost} for a 5-minute, single-voice episode, audio or video — rendering the video adds no token cost. Longer episodes and extra voices scale roughly with length: our own 10-minute, two-host daily show averages about $3.30.`,
  },
  {
    q: "Does Vuenia credit cost more than using my own keys?",
    a: "No. Credit is spent at the providers' own rates with no markup, and the platform fee is the same either way. The only difference is whether usage is paid from your Vuenia credit or billed by your provider.",
  },
  {
    q: "Can I mix my own keys and credit?",
    a: "Yes. Add a key for language models and use credit for voice, or the other way round — anything without a key of its own is paid from credit. Change it any time in Settings; completed runs keep their original cost.",
  },
  {
    q: "What happens when my credit runs out?",
    a: "Top up any amount from Settings → Billing & credit. Steps covered by your own keys keep working regardless.",
  },
  {
    q: "Is my API key safe?",
    a: "Keys are stored encrypted and used only to make the calls your Pipelines are configured to make. They're never logged in plaintext or shared across accounts.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — the platform subscription starts with a 7-day free trial. Sign up, add your own keys or a little credit, and build and test a real Pipeline before your first charge.",
  },
] as const;

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const [price, { checkout }] = await Promise.all([
    getPlatformPrice(),
    searchParams,
  ]);
  const checkoutError = checkout ? CHECKOUT_ERRORS[checkout] : undefined;

  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
          <h1 className="text-display-md font-display font-bold text-ink">
            One price. Your tokens or ours.
          </h1>
          <p className="mt-4 text-body">
            Everyone gets the full platform for one subscription. For tokens,
            bring your own model and voice keys, buy Vuenia credit, or mix the
            two — always at exactly what the providers charge, with no markup.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          {checkoutError && (
            <p
              role="alert"
              className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700"
            >
              {checkoutError}
            </p>
          )}
          <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div>
                {price ? (
                  <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                    <span className="font-display text-5xl font-bold tracking-tight text-accent-500">
                      {price.label}
                    </span>
                    {price.interval && <span className="text-base font-medium text-muted">/{price.interval}</span>}
                    {price.interval === "month" && price.currency === "USD" && (
                      <span className="flex basis-full items-baseline gap-1.5 text-sm font-medium text-body sm:ml-3 sm:basis-auto">
                        <span className="text-muted max-sm:hidden">·</span>
                        <RotatingWord words={priceInPerspective(price.amount)} interval={2600} className="text-ink" />
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="font-display text-2xl font-bold text-ink">Price announced at launch</p>
                )}
                <span className="mt-3 inline-flex items-center rounded-full bg-[#dff59a] px-3.5 py-1.5 text-sm font-semibold text-ink ring-1 ring-[#b6e446] ring-inset">
                  7-day FREE trial
                </span>
                <CreditPicker />
              </div>
              <div>
                <p className="mb-4 text-sm text-body">
                  The pipeline builder, orchestration, rendering, and hosting —
                  the same for everyone, however you pay for tokens.
                </p>
                <ul className="space-y-3">
                  {INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-base font-medium tracking-tight text-ink"
                    >
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent-500"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Same inner padding as the pricing box above, so the two line up. */}
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <div className="px-8 md:px-10">
            <h2 className="text-display-sm font-display font-bold text-ink">Frequently asked questions</h2>
            <div className="mt-8 divide-y divide-border">
              {FAQS.map((item) => (
                <div key={item.q} className="py-6">
                  <p className="font-semibold text-ink">{item.q}</p>
                  <p className="mt-2 text-sm text-body">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
