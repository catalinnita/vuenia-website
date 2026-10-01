// Replaces the old "How it works" list: the point isn't the order of steps, it's that
// a person can step into any of them. Each claim maps to a real admin capability —
// per-step human_review pauses (and verification escalating to a human), editing a
// completed step then "Rerun from here", and manual injection of human-written output
// at run start. Keep it in step with the admin app if those change.
//
// Each feature is headed by a tiny, decorative slice of the interface showing the
// action itself, rather than another icon tile — the hero and provider sections already
// carry plenty of those.

const FEATURES = [
  {
    title: "Pause for approval",
    body: "Flag any step to stop and wait for you. Read the script, check the slides, then approve, edit, or send it back — nothing moves on until you say so. If a fact-check can't be resolved, the step comes to you instead of shipping.",
    visual: (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500 motion-reduce:animate-none" />
          Waiting for you
        </span>
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">Approve</span>
        <span className="rounded-full px-3 py-1 text-xs font-semibold text-ink ring-1 ring-border">Edit</span>
      </div>
    ),
  },
  {
    title: "Edit anything, rerun from there",
    body: "Change one line of the script or swap a single slide. Vuenia re-runs only the steps after your change — everything before it stays exactly as it was, so you never pay to regenerate what you already liked.",
    visual: (
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-[15px] text-ink">
          Stocks closed <span className="text-muted line-through decoration-rose-400">lower</span>{" "}
          <span className="rounded bg-sky-100 px-1 text-sky-800">higher</span> today
        </span>
        <span className="rounded-full px-2.5 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
          ↻ Rerun from here
        </span>
      </div>
    ),
  },
  {
    title: "Bring your own content",
    body: "Start from any step with work you've made yourself — your own research notes, a finished script — and the agents carry it the rest of the way through narration, slides, video, and publishing.",
    visual: (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-lg border border-dashed border-emerald-400 bg-emerald-50 px-2.5 py-1 font-mono text-emerald-800">
          my-script.txt
        </span>
        <span className="text-muted">→ narration, slides, video</span>
      </div>
    ),
  },
] as const;

export default function HumanControl() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div data-reveal="" className="max-w-2xl">
        <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
          Agents do the legwork. You keep the final say.
        </h2>
        <p className="mt-4 text-body">
          Every step in a Pipeline is yours to stop, change, or replace. Step in where
          your judgement matters, and let the agents handle the rest.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
        {FEATURES.map((f, i) => (
          <div key={f.title} data-reveal={String(i + 1)}>
            <div aria-hidden className="flex min-h-9 items-center">
              {f.visual}
            </div>
            <p className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</p>
            <p className="mt-2 text-sm text-body">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
