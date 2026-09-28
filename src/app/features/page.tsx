import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Features — Vuenia" };

const SECTIONS = [
  {
    n: "01",
    title: "Pipelines and blueprints",
    body: "A Pipeline is a named, reusable template: an ordered list of Steps, plus what feeds the first one. Start from a blueprint that matches what you're making, then customize it freely — add a step, remove one, swap a model, change who reviews what.",
    items: [
      ["Basic", "A simple, single-narrator audio or video on any topic."],
      ["Podcast", "Multiple voices, a structured segment order, audio or video output."],
      ["Online course", "A sequence of lessons — reading, video, and an auto-generated quiz. Coming soon."],
      ["Slide deck", "The same content generation, exported as a deck instead of a video. Coming soon."],
    ],
  },
  {
    n: "02",
    title: "Context sources — bring your own data",
    body: "Every Pipeline starts by gathering context. Configure any combination of live search, specific URLs, public or authenticated APIs and databases, or just a manual brief you type in. Define your own structure for how it's organized, or let Vuenia synthesize one automatically.",
    items: [
      ["Search & web sources", "Live research — news search, ticker-scoped queries, calendars, technical analysis."],
      ["Specific URLs", "Point at a page or article and have it pulled in directly."],
      ["APIs and databases", "Public or authenticated, for your own proprietary or licensed data."],
      ["A manual brief", "Type or paste what this run should cover — no automated source required."],
    ],
  },
  {
    n: "03",
    title: "Generation steps",
    body: "Each Step does one job — research, write, narrate, visualize, or assemble — and each is independently configurable: which model runs it, what prompt it follows, and what it's allowed to produce.",
    items: [
      ["Script generation", "A natural, on-brand script from your context, single-narrator or multi-voice."],
      ["Audio generation", "Text-to-speech narration per character, with per-voice settings."],
      ["Slide generation", "An LLM chooses and populates a fitting visual for every beat of the script."],
      ["Video assembly", "Slides and narration stitched into one finished video, timed to the audio."],
    ],
  },
] as const;

const MORE_FEATURES = [
  {
    title: "Verification, built in",
    body: "Attach fact-checking, date-checking, and custom rule agents to any step. Retry automatically with the specific violation fed back in, or escalate to a human after a set number of failed attempts.",
  },
  {
    title: "Human review, wherever you want it",
    body: "Pause after any step for approval, edit any output, and rerun a Pipeline from any point forward instead of regenerating everything from scratch.",
  },
  {
    title: "Publishing",
    body: "YouTube is available today, with generated title, description, and tags. Spotify and Instagram are coming soon.",
  },
  {
    title: "Everything in settings",
    body: "Voices, models, API credentials, publishing targets, verification rules — a new show or a new format is a configuration change, not an engineering request.",
  },
] as const;

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
          <h1 className="text-display-md font-display font-bold text-ink">
            Every part of the pipeline is something you configure, not something you code.
          </h1>
          <p className="mt-4 text-body">
            Vuenia isn&apos;t a single script that makes one kind of show. It&apos;s a set of
            reusable building blocks — context sources, generation steps, verification rules,
            publish targets — that you arrange per Pipeline.
          </p>
        </section>

        {SECTIONS.map((section) => (
          <section key={section.n} className="mx-auto max-w-7xl px-6 pb-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr]">
              <div>
                <p className="font-display text-sm font-semibold text-accent-500">{section.n}</p>
                <h2 className="mt-2 text-display-sm font-display font-bold text-ink">{section.title}</h2>
                <p className="mt-4 text-sm text-body">{section.body}</p>
              </div>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
                {section.items.map(([label, desc]) => (
                  <div key={label} className="bg-surface p-6">
                    <p className="font-semibold text-ink">{label}</p>
                    <p className="mt-1.5 text-sm text-body">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="mx-auto max-w-7xl px-6 pb-28">
          <h2 className="text-display-sm font-display font-bold text-ink">More, built in</h2>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            {MORE_FEATURES.map((f) => (
              <div key={f.title} className="bg-surface p-8">
                <p className="text-lg font-semibold text-ink">{f.title}</p>
                <p className="mt-2 text-sm text-body">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
