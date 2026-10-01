// How a Pipeline gathers its raw material. The source list mirrors the context agents
// registered in agent/context_agents.py (web_search, url, manual, ask_llm, and the
// finance ones) — keep it in step with that registry; don't advertise sources that
// don't exist there yet.

const SOURCES = [
  { name: "Web search", group: "general" },
  { name: "A specific URL", group: "general" },
  { name: "Your own notes", group: "general" },
  { name: "Ask the LLM", group: "general" },
  { name: "Ticker news", group: "finance" },
  { name: "Economic calendar", group: "finance" },
  { name: "Earnings calendar", group: "finance" },
  { name: "Technical analysis", group: "finance" },
] as const;

const BRIEF = ["Headlines", "This week's calendar", "Market levels", "Your notes"];

export default function ContextSources() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Decorative: sources on the left feeding one assembled context brief. */}
        <div aria-hidden data-reveal="" className="order-last grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] lg:order-first">
          <ul className="flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <li
                key={s.name}
                className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${
                  s.group === "finance"
                    ? "bg-violet-50 text-violet-700 ring-violet-200"
                    : "bg-surface text-ink ring-border"
                }`}
              >
                {s.name}
              </li>
            ))}
          </ul>
          <span className="hidden text-2xl text-gray-300 sm:block">→</span>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_-12px_rgba(11,15,25,0.15)]">
            <p className="font-display text-[15px] font-semibold text-ink">Context brief</p>
            <ul className="mt-3 space-y-2.5">
              {BRIEF.map((section) => (
                <li key={section}>
                  <p className="text-xs font-medium text-body">{section}</p>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100" />
                  <div className="mt-1 h-1.5 w-2/3 rounded-full bg-gray-100" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal="1">
          <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
            Every episode starts with the right research.
          </h2>
          <p className="mt-4 text-body">
            Pick the sources each Pipeline should gather from — live web search, a page you
            point it at, notes you write yourself, or ready-made finance feeds for news,
            calendars and technical levels. Vuenia pulls them together into one context
            brief, organised your way or into a structure it builds for you, and every
            later step works from it.
          </p>
        </div>
      </div>
    </section>
  );
}
