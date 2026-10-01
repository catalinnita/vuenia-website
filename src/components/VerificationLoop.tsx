// Verification as a loop: generate → check → revise with the specific violation fed
// back → … → pass, or hand to a person after max_tries. Mirrors agent/_verifier.py's
// run_verified() and the verifier types in agent/verifiers.py (word_count, llm_judge,
// relative_dates, indicator_dates) — keep the copy in step with those.

const CHECKS = ["Word count", "Relative dates", "Economic-calendar dates", "Your own rule, in plain English"];

const ATTEMPTS = [
  { ok: false, label: "Attempt 1", note: "Says “yesterday” — this episode publishes Monday" },
  { ok: false, label: "Attempt 2", note: "CPI is out on the 14th, not the 15th" },
  { ok: true, label: "Attempt 3", note: "Passed every check" },
] as const;

export default function VerificationLoop() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div data-reveal="">
          <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
            Checked, fixed, and checked again.
          </h2>
          <p className="mt-4 text-body">
            Attach verification to any step. When an output breaks a rule, Vuenia sends it
            back with the exact problem spelled out and tries again — looping until it
            passes. If it still can&apos;t after the attempts you allow, it stops and comes
            to you instead of shipping.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {CHECKS.map((check) => (
              <li key={check} className="rounded-full px-3 py-1 text-xs font-medium text-ink ring-1 ring-border">
                {check}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative: one step's verification log, ending in a pass. */}
        <div aria-hidden data-reveal="1" className="rounded-3xl border border-border bg-surface p-6 shadow-[0_10px_30px_-12px_rgba(11,15,25,0.15)]">
          <div className="flex items-center justify-between">
            <p className="font-display text-[15px] font-semibold text-ink">generate_script</p>
            <span className="text-xs text-muted">max 3 attempts</span>
          </div>
          <ol className="mt-5 space-y-3">
            {ATTEMPTS.map((a) => (
              <li key={a.label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                    a.ok ? "bg-emerald-500" : "bg-rose-400"
                  }`}
                >
                  {a.ok ? "✓" : "✕"}
                </span>
                <div>
                  <p className="text-xs font-semibold text-ink">{a.label}</p>
                  <p className={`text-sm ${a.ok ? "text-emerald-700" : "text-body"}`}>{a.note}</p>
                  {!a.ok && <p className="mt-1 text-xs text-muted">↻ Revised with this feedback</p>}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-border pt-4 text-xs text-muted">
            Still failing after 3 tries? The step pauses for your review.
          </p>
        </div>
      </div>
    </section>
  );
}
