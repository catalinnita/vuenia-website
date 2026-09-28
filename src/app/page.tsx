import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import PipelineFan from "@/components/PipelineFan";
import RotatingWord from "@/components/RotatingWord";

const BLUEPRINTS = [
  {
    name: "Basic",
    description: "A single-narrator audio or video on any topic.",
    status: "Available",
    color: "bg-pastel-sky",
  },
  {
    name: "Podcast",
    description: "Multi-voice, structured segments — audio or video.",
    status: "Available",
    color: "bg-pastel-mint",
  },
  {
    name: "Online course",
    description: "Reading material, narrated video, and auto-generated quizzes.",
    status: "Coming soon",
    color: "bg-pastel-peach",
  },
  {
    name: "Slide deck",
    description: "A narrated script exported as PPTX, Google Slides, and more.",
    status: "Coming soon",
    color: "bg-pastel-lime",
  },
] as const;

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Pick a blueprint",
    body: "Start from Basic, Podcast, Online course, or Slide deck — or build your own pipeline from scratch.",
  },
  {
    n: "02",
    title: "Configure the steps",
    body: "Choose what feeds it context, which model writes each piece, which voices narrate it, and what needs your sign-off.",
  },
  {
    n: "03",
    title: "Run it",
    body: "Trigger it manually or put it on a schedule. Every run is tracked step by step — input, output, cost, and timing.",
  },
  {
    n: "04",
    title: "Review, or don't",
    body: "Full autonomy or a checkpoint anywhere. Don't like one slide? Edit just that piece and re-run from there.",
  },
] as const;

const VALUE_PROPS = [
  {
    title: "No-code pipeline builder",
    body: "Add, remove, and reorder steps on a canvas — every Pipeline is configuration, not a codebase.",
  },
  {
    title: "Bring your own data",
    body: "Context agents pull from search, specific URLs, public or private APIs and databases — or a brief you type in.",
  },
  {
    title: "Built-in fact-checking",
    body: "Attach verification agents to any step — catch a wrong date, a banned phrase, an unsupported claim — before it ships.",
  },
  {
    title: "A human checkpoint wherever you want one",
    body: "Full autonomy, full manual control, or anything in between — set per step, per Pipeline.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pt-20 pb-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h1 className="text-display-md font-display font-bold text-ink lg:text-display-xl">
                Publish{" "}
                <RotatingWord
                  words={["podcasts", "videos", "courses", "slide decks"]}
                  className="text-accent-500"
                />
                without a production team.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-body">
                A team of AI agents does the legwork — researching, scripting,
                narrating, and editing. You choose where to step in: approve the
                outline, rewrite a line, swap a voice, or take the wheel
                entirely. The agents handle the production; the creative calls
                stay yours.
              </p>
              <div className="mt-8">
                <Button href="/beta">Request beta access</Button>
              </div>
            </div>

            <PipelineFan />
          </div>
        </section>

        {/* Blueprints */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
            Built for more than one show
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BLUEPRINTS.map((bp) => (
              <div key={bp.name} className={`rounded-2xl ${bp.color} p-6`}>
                <div className="flex items-start justify-between">
                  <p className="font-display text-lg font-semibold text-ink">{bp.name}</p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      bp.status === "Available" ? "bg-ink text-white" : "bg-white/70 text-body"
                    }`}
                  >
                    {bp.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-body">{bp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
            <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
              How it works
            </h2>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.n}>
                  <p className="font-display text-sm font-semibold text-accent-500">{step.n}</p>
                  <p className="mt-2 text-lg font-semibold text-ink">{step.title}</p>
                  <p className="mt-2 text-sm text-body">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center md:px-16">
            {/* The show's two hosts frame the copy from either side; the
                radial shade keeps the centred text legible where they overlap.
                On narrow screens the card is too tall to frame anything, so the
                photo becomes a full-width banner above the copy instead. */}
            <div className="relative -mx-8 -mt-14 mb-8 aspect-video md:hidden">
              <Image src="/images/morning-bell-hosts.png" alt="" fill sizes="100vw" className="object-cover" />
            </div>
            <Image
              src="/images/morning-bell-hosts.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="-z-10 hidden object-cover object-[center_25%] md:block"
            />
            <div className="absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_45%_70%_at_center,rgb(11_15_25/0.85),transparent)] md:block" />
            <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">See it in production</p>
            {/* The artwork is a round badge on a square canvas — clipping it to a
                circle drops the square corners. */}
            <Image
              src="/images/morning-bell-logo.jpg"
              alt="The Morning Bell logo"
              width={112}
              height={112}
              className="mx-auto mt-6 h-24 w-24 rounded-full shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] md:h-28 md:w-28"
            />
            <h2 className="mt-4 text-display-sm font-display font-bold text-white md:text-display-md">
              The Morning Bell
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              A daily two-host market podcast — context, script, narration,
              slides, video, and publishing, all running end to end on Vuenia.
            </p>
            <a
              href="https://www.youtube.com/@TheMorningBellAI"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-50"
            >
              Watch on YouTube ↗
            </a>
            <p className="mt-6 text-xs text-white/40">More shows built on Vuenia will be added here as they launch.</p>
          </div>
        </section>

        {/* Value props */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
            Why teams choose Vuenia
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            {VALUE_PROPS.map((vp) => (
              <div key={vp.title} className="bg-surface p-8">
                <p className="text-lg font-semibold text-ink">{vp.title}</p>
                <p className="mt-2 text-sm text-body">{vp.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-28">
          <div className="rounded-3xl bg-accent-50 px-8 py-16 text-center md:px-16">
            <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
              Your first episode doesn&apos;t have to take a week.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-body">
              Set up a Pipeline once. Run it as many times as you need — daily,
              weekly, on demand.
            </p>
            <div className="mt-8">
              <Button href="/beta">Request beta access</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
