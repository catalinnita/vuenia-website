import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export const metadata: Metadata = { title: "Pricing — Vuenia" };

// PRICING TBD — the platform fee below is illustrative, not decided. See
// _content/pricing.md. What IS decided: one platform fee for everyone, and Vuenia
// tokens are passed through at the providers' own rates with no markup, so using
// them never costs more than bringing your own keys.
const PLATFORM_FEE = "$49";

const INCLUDED = [
  "Unlimited Pipelines and runs",
  "Every blueprint — Basic, Podcast, and more as they launch",
  "Verification agents and human review at any step",
  "Publishing integrations",
  "Per-step cost tracking on every run",
] as const;

const TOKEN_OPTIONS = [
  {
    name: "Use Vuenia tokens",
    tagline: "Nothing to set up.",
    body: "We provide the model and voice access. Usage is billed at exactly what the providers charge us — no markup — and added to your Vuenia bill. One invoice, no provider accounts, no keys to manage.",
    cost: "Provider rates, billed by Vuenia at cost",
  },
  {
    name: "Bring your own keys",
    tagline: "Keep the accounts you already have.",
    body: "Connect your Anthropic, OpenAI, ElevenLabs, or other API keys in Settings. Every call runs on your own account, so existing discounts and enterprise agreements still apply.",
    cost: "Provider rates, billed by your provider",
  },
] as const;

const FAQS = [
  {
    q: "Do Vuenia tokens cost more than using my own keys?",
    a: "No. Vuenia tokens are billed at the providers' own rates with no markup, and the platform fee is the same either way. The only difference is whether usage appears on your Vuenia bill or your provider's.",
  },
  {
    q: "What counts as usage?",
    a: "Every model and voice call a run actually makes. Each run's cost is shown step by step in your dashboard, whichever way you pay for tokens.",
  },
  {
    q: "Can I switch between the two?",
    a: "Anytime, from Settings. Runs already completed keep their original cost; nothing changes retroactively.",
  },
  {
    q: "Is my API key safe?",
    a: "Keys are stored encrypted and used only to make the calls your Pipelines are configured to make. They're never logged in plaintext or shared across accounts.",
  },
  {
    q: "Is there a free trial?",
    a: "During the beta, requested accounts get a limited number of free runs, no card required, so you can build and test a real Pipeline before paying anything.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
          <h1 className="text-display-md font-display font-bold text-ink">
            One price. Your tokens or ours.
          </h1>
          <p className="mt-4 text-body">
            Everyone gets the full platform for one flat fee. Bring your own model
            and voice keys, or use Vuenia&apos;s — billed at exactly what the
            providers charge, with no markup.
          </p>
          <p className="mt-4 text-xs text-muted">
            Vuenia is in beta — pricing below reflects general availability.
          </p>
          <div className="mt-6">
            <Button href="/beta">Request beta access</Button>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-lg font-semibold text-ink">Vuenia platform</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold text-ink">{PLATFORM_FEE}</span>
                  <span className="text-sm text-muted">/month</span>
                </p>
                <p className="mt-4 text-sm text-body">
                  The pipeline builder, orchestration, rendering, and hosting — the
                  same for everyone, however you pay for tokens.
                </p>
              </div>
              <ul className="space-y-2.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 text-center font-display text-xl font-bold text-ink">
            + tokens, at cost. Pick where they come from.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {TOKEN_OPTIONS.map((option) => (
              <div key={option.name} className="flex flex-col rounded-3xl border border-border bg-surface p-8">
                <p className="text-lg font-semibold text-ink">{option.name}</p>
                <p className="mt-1 text-sm text-muted">{option.tagline}</p>
                <p className="mt-4 flex-1 text-sm text-body">{option.body}</p>
                <p className="mt-6 rounded-xl bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700">
                  {option.cost}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-28">
          <h2 className="text-display-sm font-display font-bold text-ink">FAQ</h2>
          <div className="mt-8 divide-y divide-border">
            {FAQS.map((item) => (
              <div key={item.q} className="py-6">
                <p className="font-semibold text-ink">{item.q}</p>
                <p className="mt-2 text-sm text-body">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
