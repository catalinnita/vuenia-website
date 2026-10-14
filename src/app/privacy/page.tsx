import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieSettingsLink from "@/components/consent/CookieSettingsLink";

export const metadata: Metadata = { title: "Privacy policy — Vuenia" };

// DRAFT — fill in the bracketed details and have it reviewed before relying on it.
// It describes what the product actually does today (see the sections below); update it
// when that changes, and bump LAST_UPDATED.
const COMPANY = "[Company legal name]";
const ADDRESS = "[Registered address]";
const CONTACT_EMAIL = "[privacy@vuenia.com]";
const LAST_UPDATED = "14 October 2026";

const PROCESSORS = [
  { name: "Supabase", purpose: "Accounts, sign-in and the app's database", where: "United States" },
  { name: "Vercel", purpose: "Hosting the website and app; cookieless analytics and performance monitoring", where: "United States / global edge" },
  { name: "Cloudflare", purpose: "Network delivery and security", where: "Global" },
  { name: "Stripe", purpose: "Payments, subscriptions and invoices — we never see or store your full card details", where: "United States / EU" },
  { name: "Resend", purpose: "Sending emails, such as demo requests and account messages", where: "United States" },
  { name: "Google", purpose: "Google sign-in (if you choose it); Google Ads measurement (only with your consent); YouTube publishing (if you connect it)", where: "United States / global" },
  { name: "Anthropic, OpenAI, Hugging Face", purpose: "Language models that generate research, scripts and slides — when paid from Vuenia credit, or via your own keys", where: "United States" },
  { name: "ElevenLabs", purpose: "Voice narration", where: "United States / EU" },
  { name: "Amazon Web Services", purpose: "Running pipelines and storing generated audio, slides and video", where: "United States" },
];

const COOKIES = [
  { name: "Sign-in session (Supabase)", type: "Strictly necessary", purpose: "Keeps you signed in to the Vuenia app", duration: "Until you sign out or the session expires" },
  { name: "vuenia-consent (stored in your browser)", type: "Strictly necessary", purpose: "Remembers your cookie choice", duration: "Until you clear it or we change the banner" },
  { name: "Google Ads (_gcl_*, and Google advertising cookies)", type: "Advertising — only with consent", purpose: "Measures whether our ads lead to sign-ups, and lets us show ads to past visitors", duration: "Up to 13 months" },
  { name: "Stripe", type: "Strictly necessary", purpose: "Fraud prevention during checkout, set on Stripe's own pages", duration: "Set by Stripe" },
];

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-body">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-display-sm font-display font-bold text-ink md:text-display-md">Privacy policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated {LAST_UPDATED}</p>

        <Section title="Who we are">
          <p>
            Vuenia is operated by {COMPANY}, {ADDRESS} (&quot;we&quot;, &quot;us&quot;). We are the controller of the
            personal data described here. For any privacy question or request, email{" "}
            <span className="font-medium text-ink">{CONTACT_EMAIL}</span>.
          </p>
        </Section>

        <Section title="What we collect">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-ink">Account details</strong> — your name, email address and password (stored
              hashed), or your Google account details if you sign in with Google; your time zone and preferences.
            </li>
            <li>
              <strong className="text-ink">Billing</strong> — your subscription status, credit purchases and invoices.
              Card details are handled by Stripe and never reach us.
            </li>
            <li>
              <strong className="text-ink">What you create</strong> — your pipelines, prompts, notes, scripts, voices
              and the audio, slides and video generated from them, plus any API keys you add (readable only by your account, and encrypted at rest by our database provider).
            </li>
            <li>
              <strong className="text-ink">Demo requests</strong> — your name, email and what you&apos;d like to see.
            </li>
            <li>
              <strong className="text-ink">Usage and performance</strong> — cookieless, aggregated page-view and
              performance data from Vercel, which doesn&apos;t identify you.
            </li>
            <li>
              <strong className="text-ink">Advertising</strong> — only if you accept cookies: Google Ads measurement of
              whether our ads lead to visits and sign-ups.
            </li>
          </ul>
        </Section>

        <Section title="Why we use it, and our legal basis">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              To provide the service you sign up for — your account, pipelines, runs and publishing (
              <em>performance of a contract</em>).
            </li>
            <li>To take payments and keep financial records (<em>contract</em> and <em>legal obligation</em>).</li>
            <li>To answer demo requests and support questions (<em>legitimate interests</em>).</li>
            <li>To keep the service secure and working well (<em>legitimate interests</em>).</li>
            <li>To measure our advertising (<em>consent</em> — which you can withdraw any time).</li>
          </ul>
          <p>We don&apos;t sell your personal data, and we don&apos;t use your content to train AI models.</p>
        </Section>

        <Section title="Who we share it with">
          <p>
            We use the service providers below to run Vuenia. They process data on our behalf and under contract,
            only for the purposes described.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs text-muted">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Provider</th>
                  <th className="px-4 py-2.5 font-medium">What for</th>
                  <th className="px-4 py-2.5 font-medium">Where</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PROCESSORS.map((p) => (
                  <tr key={p.name} className="align-top">
                    <td className="px-4 py-2.5 font-medium whitespace-nowrap text-ink">{p.name}</td>
                    <td className="px-4 py-2.5">{p.purpose}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap">{p.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            When you use your own API keys, calls run on your own account with that provider, under your agreement
            with them.
          </p>
        </Section>

        <Section title="International transfers">
          <p>
            Several providers are based in the United States. Where your data leaves the UK or EEA, it is protected by
            the UK International Data Transfer Addendum or the EU Standard Contractual Clauses, or by the provider&apos;s
            certification under the EU–US Data Privacy Framework and its UK extension.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            Account data and your content are kept while your account is open, and deleted within 30 days of you
            closing it. Billing records are kept for as long as tax law requires (usually six years). Demo requests
            are kept for up to 12 months. Consent records are kept for as long as needed to show the choice was made.
          </p>
        </Section>

        <Section id="cookies" title="Cookies">
          <p>
            We only set advertising cookies if you accept them in our cookie banner. Rejecting has no effect on the
            site, and a browser that sends a Global Privacy Control signal is treated as having rejected. Everything
            else below is strictly necessary for the site and app to work.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs text-muted">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Cookie</th>
                  <th className="px-4 py-2.5 font-medium">Type</th>
                  <th className="px-4 py-2.5 font-medium">Purpose</th>
                  <th className="px-4 py-2.5 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COOKIES.map((c) => (
                  <tr key={c.name} className="align-top">
                    <td className="px-4 py-2.5 font-medium text-ink">{c.name}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap">{c.type}</td>
                    <td className="px-4 py-2.5">{c.purpose}</td>
                    <td className="px-4 py-2.5">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            You can change your choice any time:{" "}
            <CookieSettingsLink className="font-medium text-ink underline underline-offset-2" />.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Depending on where you live, you can ask to access, correct, delete or export your personal data, object
            to or restrict how we use it, and withdraw consent at any time. To make a request, email{" "}
            <span className="font-medium text-ink">{CONTACT_EMAIL}</span> — we&apos;ll respond within one month.
          </p>
          <p>
            <strong className="text-ink">UK and EU:</strong> you can also complain to the UK Information
            Commissioner&apos;s Office (ico.org.uk) or your local data protection authority.
          </p>
          <p>
            <strong className="text-ink">California and other US states:</strong> you have the right to know what we
            collect, to delete it, to correct it, and to opt out of the &quot;sharing&quot; of personal data for
            cross-context advertising — which you can do by rejecting cookies or sending a Global Privacy Control
            signal. We don&apos;t sell personal data and won&apos;t treat you differently for exercising your rights.
          </p>
        </Section>

        <Section title="Children">
          <p>Vuenia isn&apos;t intended for anyone under 16, and we don&apos;t knowingly collect their data.</p>
        </Section>

        <Section title="Changes">
          <p>
            If we change this policy we&apos;ll update the date above, and for significant changes let account holders
            know by email.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
