"use client";

import { useState } from "react";

const input =
  "mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent-500";

// The former beta-access form, repurposed: posts to /api/demo, which stores the
// request (super-admin lists it) and emails it to the team.
export default function DemoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-lg font-semibold text-ink">Thanks — we&apos;ll be in touch.</p>
        <p className="mt-2 text-sm text-body">We usually reply within one working day to set up a time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" name="name" type="text" required className={input} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Work email
          </label>
          <input id="email" name="email" type="email" required className={input} />
        </div>
        <div>
          <label htmlFor="use-case" className="text-sm font-medium text-ink">
            What would you like to see?
          </label>
          <textarea
            id="use-case"
            name="useCase"
            rows={4}
            className={input}
            placeholder="A daily show for our team, onboarding videos, a course from our docs..."
          />
        </div>
        {/* Honeypot — hidden from people, tempting to bots. */}
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      </div>
      {status === "error" && (
        <p role="alert" className="mt-5 text-sm text-red-600">
          Something went wrong sending your request. Please try again in a moment.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a private demo"}
      </button>
    </form>
  );
}
