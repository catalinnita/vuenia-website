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

// The providers the admin app's Settings → API keys accepts today
// (admin/src/app/(dashboard)/settings/api-keys/config.ts) — keep in step with it.
// Logos are single-colour 24×24 SVG paths: Anthropic, Hugging Face and ElevenLabs
// from simple-icons (CC0), OpenAI from @lobehub/icons (MIT) — simple-icons dropped
// OpenAI's mark at OpenAI's request. Each sits in its brand colour on a light tint
// of it (ElevenLabs' brand is black, so it gets a neutral tint).
const PROVIDERS = [
  {
    name: "Anthropic",
    tile: "bg-[#fbece6] text-[#d97757]",
    logo: "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z",
    kind: "Language models",
    body: "Claude writes research summaries, scripts, and slide copy.",
  },
  {
    name: "OpenAI",
    tile: "bg-[#e3f5ef] text-[#10a37f]",
    logo: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z",
    kind: "Language models",
    body: "Switch any writing step to a GPT model instead.",
  },
  {
    name: "Hugging Face",
    tile: "bg-[#fff3cf] text-[#ff9d00]",
    logo: "M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624",
    kind: "Open models",
    body: "Open-source models from the Hub or your own Inference Endpoints.",
  },
  {
    name: "ElevenLabs",
    tile: "bg-[#eef0f4] text-ink",
    logo: "M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z",
    kind: "Voice",
    body: "Natural narration and distinct voices for every host.",
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

        {/* Providers */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
            Works with the models you already use
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROVIDERS.map((provider) => (
              <div key={provider.name} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${provider.tile}`}>
                    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="h-6 w-6">
                      <path d={provider.logo} />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-lg leading-tight font-semibold text-ink">{provider.name}</p>
                    <p className="text-xs text-muted">{provider.kind}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-body">{provider.body}</p>
              </div>
            ))}
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
