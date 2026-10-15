import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Statement — Vuenia" };

const PROMISES = [
  { title: "Your voice stays yours.", body: "Our tools are built to amplify your ideas, not replace them." },
  { title: "You stay in control.", body: "You decide what gets published. Every key step can include your review and approval." },
  {
    title: "We’ll keep it accessible.",
    body: "We’ll work to keep costs low so that quality content isn’t limited to large teams or big budgets.",
  },
  {
    title: "We’ll be honest.",
    body: "We’ll be clear about what’s automated, what’s AI-generated, and how your content is made.",
  },
  {
    title: "We’ll build with you.",
    body: "Vuenia will grow based on what creators actually need, not on what’s merely possible.",
  },
] as const;

export default function StatementPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-display-sm font-display font-bold text-ink md:text-display-md">Statement</h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-body">
          <p>
            Vuenia exists to close a gap in content creation that, until recently, no technology could bridge. With
            large language models now widely accessible, tools like voice cloning, text-to-speech, speech-to-text and
            intelligent agents can work together to decide how a piece of content is best presented. For podcasters,
            course creators and documentation writers, that means achieving more in less time.
          </p>
          <p>
            Vuenia began with a single output:{" "}
            <Link href="/#the-morning-bell" className="font-medium text-ink underline underline-offset-2">
              The Morning Bell
            </Link>{" "}
            podcast. The goal was simple but demanding: publish a new episode every day that is relevant, grounded in
            real-world data and news, consistent, and easy to understand. Today, The Morning Bell runs almost entirely
            on its own. A human still reviews and approves the script and the slides the system selects, and each
            episode costs an average of around $3 to produce. That number says it all: the ceiling on what one person
            can create has been raised dramatically.
          </p>
          <p>
            But we know not everyone wants to hand over the creative act, and for good reason. People bring a touch
            that a prediction machine never will. That’s why Vuenia isn’t only about generating content. It’s about
            helping you publish your own work faster and across more formats.
          </p>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink">Our Promise to You</h2>
          <ul className="mt-6 space-y-4">
            {PROMISES.map((p) => (
              <li key={p.title} className="flex items-start gap-3 text-lg leading-8">
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-1.5 h-5 w-5 shrink-0 text-accent-500">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-body">
                  <strong className="font-semibold text-ink">{p.title}</strong> {p.body}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-3xl border border-border bg-surface p-8 md:p-10">
          <h2 className="font-display text-2xl font-bold text-ink">Help Us Shape Vuenia</h2>
          <p className="mt-4 text-lg leading-8 text-body">
            This is just the beginning, and we want to hear from you. What’s working? What’s missing? What would help
            you create and publish more of your own work?
          </p>
          <Link
            href="/feedback"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Share your feedback
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
