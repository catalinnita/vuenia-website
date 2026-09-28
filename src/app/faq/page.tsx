import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "FAQ — Vuenia" };

const FAQS = [
  {
    q: "What is Vuenia?",
    a: "A configurable platform for turning a topic, brief, or live data source into a finished audio episode, multi-voice podcast, video, or course — through a no-code Pipeline you build and reuse, not a one-off script.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Building and configuring a Pipeline — steps, context sources, prompts, voices, verification rules — is done entirely through the app.",
  },
  {
    q: "What kinds of content can it produce?",
    a: "Single-narrator audio or video on any topic (Basic), a structured multi-voice podcast (Podcast), and — coming soon — a multi-lesson online course with quizzes, and an exportable slide deck.",
  },
  {
    q: "Can I use my own script instead of generating one?",
    a: "Yes. Any step can be swapped for manual input — paste in your own script and let Vuenia handle only the audio, slides, and video, or supply everything yourself and use Vuenia purely for final assembly and publishing.",
  },
  {
    q: "How does it know what to talk about?",
    a: "You configure one or more context sources per Pipeline: live search, a specific URL, a public or private API/database, or just a brief you type in yourself.",
  },
  {
    q: "What stops it from generating something wrong or off-brand?",
    a: "Verification agents you attach to any step catch and correct issues automatically, and human review lets you require approval — and edit anything — before the Pipeline continues.",
  },
  {
    q: "Can I edit something after it's generated?",
    a: "Yes — edit any step's output, including replacing a single generated slide, then rerun the Pipeline from that point forward.",
  },
  {
    q: "Where does it publish to?",
    a: "YouTube today, with the generated title, description, and tags included automatically. Spotify and Instagram are coming soon.",
  },
  {
    q: "How does pricing work?",
    a: "One flat platform fee for everyone, plus the model and voice tokens your runs use. Bring your own provider keys and your provider bills you, or use Vuenia's tokens and we bill you at the providers' own rates — no markup, so it never costs more. Details on the Pricing page.",
  },
  {
    q: "Is my data and API key information secure?",
    a: "API keys are stored encrypted and used only for the calls your Pipelines are configured to make. Your context sources, generated content, and run history are private to your account.",
  },
  {
    q: "Can I run this on a schedule?",
    a: "Yes — any Pipeline can be triggered manually or scheduled to run automatically, for example a daily episode every weekday morning.",
  },
  {
    q: "How do I get access?",
    a: "Vuenia is invite-only during the beta. Request access and we'll reach out once a spot opens up.",
  },
] as const;

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center">
          <h1 className="text-display-md font-display font-bold text-ink">Questions, answered.</h1>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-28">
          <div className="divide-y divide-border">
            {FAQS.map((item) => (
              <div key={item.q} className="py-6">
                <p className="font-semibold text-ink">{item.q}</p>
                <p className="mt-2 text-sm text-body">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
