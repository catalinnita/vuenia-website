"use client";

import { useState } from "react";
import { buttonClass } from "./Button";
import { CREDIT_OPTIONS, DEFAULT_CREDIT, FIVE_MIN_EPISODE_USD, episodesFor } from "@/lib/credit";

// The pricing page's checkout control: pick starting Vuenia credit — or $0 to run on
// your own API keys — and go straight to Stripe Checkout (api/checkout) for the 7-day
// trial plus that credit.
export default function CreditPicker() {
  const [value, setValue] = useState(String(DEFAULT_CREDIT));
  const ownKeys = value === "0";
  const amount = Number(value);
  const episodes = episodesFor(amount);

  return (
    <form action="/api/checkout" method="post" className="mt-6">
      <label htmlFor="starting-credit" className="text-sm font-medium text-ink">
        Starting credit
      </label>
      <select
        id="starting-credit"
        name="credit"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="select-chevron mt-1.5 h-11 w-full rounded-lg border border-border bg-surface pr-10 pl-3.5 text-sm text-ink outline-none focus:border-accent-500"
      >
        {CREDIT_OPTIONS.map((a) => (
          <option key={a} value={a}>
            ${a}
          </option>
        ))}
        <option value="0">$0 — I&apos;ll use my own keys</option>
      </select>

      <p className="mt-3 rounded-xl bg-accent-50 px-4 py-3 text-sm text-accent-700">
        {ownKeys ? (
          <>
            Connect your own Anthropic, OpenAI, ElevenLabs or other API keys after you sign up — every call runs
            on your own account, so existing discounts still apply. Anything without a key of its own can be paid
            from credit you add later.
          </>
        ) : (
          <>
            Credit pays for model and voice usage at exactly what the providers charge — no markup, no provider
            accounts. ${amount} covers about {episodes} five-minute episode{episodes === 1 ? "" : "s"} (about $
            {FIVE_MIN_EPISODE_USD.toFixed(2)} each). Mix in your own keys any time.
          </>
        )}
      </p>

      <button type="submit" className={buttonClass("primary", "mt-5 w-full sm:w-auto")}>
        {ownKeys ? "Start 7-day free trial" : "Buy and start trial"}
      </button>
      <p className="mt-3 text-xs text-muted">
        {ownKeys
          ? "No charge for 7 days. Cancel any time from your account."
          : `Only the $${amount} credit is charged today — the subscription starts after 7 days. Cancel any time.`}
      </p>
    </form>
  );
}
