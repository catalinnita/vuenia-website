"use client";

import { useState } from "react";

const input =
  "mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-accent-500";

// Posts to /api/feedback, which emails it to feedback@vuenia.com.
export default function FeedbackForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
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
        <p className="text-lg font-semibold text-ink">Thank you — that really helps.</p>
        <p className="mt-2 text-sm text-body">We read every message, and reply if you left your email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="name" name="name" type="text" className={input} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email <span className="font-normal text-muted">(optional, if you&apos;d like a reply)</span>
          </label>
          <input id="email" name="email" type="email" className={input} />
        </div>
        <div>
          <label htmlFor="use-case" className="text-sm font-medium text-ink">
            Your feedback
          </label>
          <textarea
            id="use-case"
            name="message"
            rows={6}
            required
            className={input}
            placeholder="What’s working, what’s missing, what you’d like Vuenia to do…"
          />
        </div>
        {/* Honeypot — hidden from people, tempting to bots. */}
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      </div>
      {status === "error" && (
        <p role="alert" className="mt-5 text-sm text-red-600">
          Something went wrong sending your feedback. Please try again in a moment.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}
