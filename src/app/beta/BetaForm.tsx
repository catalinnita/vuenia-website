"use client";

import { useState } from "react";

// Posts to /api/beta, which emails the request (see src/app/api/beta/route.ts).
export default function BetaForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submitted = status === "sent";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-lg font-semibold text-ink">Thanks — you&apos;re on the list.</p>
        <p className="mt-2 text-sm text-body">We&apos;ll reach out once a spot opens up.</p>
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
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent-500"
          />
        </div>
        <div>
          <label htmlFor="use-case" className="text-sm font-medium text-ink">
            What are you looking to create?
          </label>
          <textarea
            id="use-case"
            name="useCase"
            rows={3}
            className="mt-1.5 w-full rounded-lg border border-border px-3.5 py-2.5 text-sm outline-none focus:border-accent-500"
            placeholder="A daily podcast, a course, a weekly explainer video..."
          />
        </div>
        {/* Honeypot — hidden from people, tempting to bots. */}
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
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
        {status === "sending" ? "Sending…" : "Request beta access"}
      </button>
    </form>
  );
}
