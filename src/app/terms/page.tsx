import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TERMS_VERSION } from "@/lib/legal";

export const metadata: Metadata = { title: "Terms of Service — Vuenia" };

// DRAFT — fill in the bracketed details and have it reviewed (especially refunds,
// liability and governing law) before relying on it. Bump TERMS_VERSION in lib/legal.ts
// (and admin/src/lib/legal.ts) whenever these terms change materially.
const COMPANY = "[Company legal name]";
const ADDRESS = "[Registered address]";
const CONTACT_EMAIL = "[support@vuenia.com]";
const GOVERNING_LAW = "[England and Wales]";
const LAST_UPDATED = "14 October 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-body">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-display-sm font-display font-bold text-ink md:text-display-md">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted">
          Last updated {LAST_UPDATED} · Version {TERMS_VERSION}
        </p>

        <Section title="1. About these terms">
          <p>
            These terms are an agreement between you and {COMPANY}, {ADDRESS} (&quot;Vuenia&quot;, &quot;we&quot;,
            &quot;us&quot;) for the use of the Vuenia website and app (the &quot;Service&quot;). You accept them when
            you tick the box at checkout or create an account. Our{" "}
            <Link href="/privacy" className="font-medium text-ink underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            explains how we handle personal data.
          </p>
        </Section>

        <Section title="2. Your account">
          <p>
            You must be at least 16, give accurate details, and keep your sign-in secure. You&apos;re responsible for
            what happens under your account. If you use Vuenia for a business, you confirm you can accept these terms
            on its behalf.
          </p>
        </Section>

        <Section title="3. Subscription and free trial">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              The Vuenia subscription is billed monthly at the price shown at checkout, plus any taxes. A card is
              required to start the 7-day free trial.
            </li>
            <li>
              If you don&apos;t cancel before the trial ends, the subscription starts and renews automatically each
              month until you cancel.
            </li>
            <li>
              You can cancel any time in the app under Settings → Billing &amp; credit. Cancelling stops the next
              renewal; you keep access until the end of the period you&apos;ve paid for. We don&apos;t refund partial
              months, except where the law requires it.
            </li>
            <li>
              We may change the price with at least 30 days&apos; notice by email. A new price applies from your next
              renewal, and you can cancel before then.
            </li>
          </ul>
        </Section>

        <Section title="4. Vuenia credit">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Credit is prepaid and pays for language-model and voice usage that isn&apos;t covered by your own API
              keys, at the providers&apos; own rates with no markup. Each run&apos;s cost is shown in the app.
            </li>
            <li>Credit doesn&apos;t expire while your account is open, and can&apos;t be exchanged for cash.</li>
            <li>
              Unused credit is refundable on request within 14 days of purchase. After that, credit isn&apos;t
              refundable except where the law requires it, or if we close the Service.
            </li>
          </ul>
        </Section>

        <Section title="5. Cancellation rights (UK and EU consumers)">
          <p>
            If you&apos;re a consumer in the UK or EU, you normally have 14 days to cancel a purchase of digital
            services. By asking us to start your subscription and credit straight away, you agree that once you have
            used credit, the cancellation right ends for the credit used, and that a cancellation within 14 days of a
            paid subscription period may be reduced to reflect what you&apos;ve already received. Nothing here affects
            your statutory rights.
          </p>
        </Section>

        <Section title="6. Your content">
          <p>
            You keep ownership of what you put into Vuenia — prompts, notes, scripts, voices you&apos;re entitled to
            use — and of the podcasts, videos and slides created for you (&quot;Output&quot;). You give us a limited
            licence to store and process that content only to run the Service for you. We don&apos;t use your content
            to train AI models.
          </p>
          <p>
            You&apos;re responsible for having the rights to what you upload and for what you publish. When you
            publish to YouTube or another platform through your own account, that platform&apos;s terms apply.
          </p>
        </Section>

        <Section title="7. AI-generated output">
          <p>
            Output is generated by AI models and can be incomplete, out of date or wrong, even after Vuenia&apos;s
            automatic checks. Review it before you publish or rely on it. Output is not financial, legal, medical or
            other professional advice — including content about markets or investments.
          </p>
        </Section>

        <Section title="8. Acceptable use">
          <p>You agree not to use Vuenia to create or publish content that:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>is illegal, defamatory, hateful, harassing or sexually explicit involving minors;</li>
            <li>infringes someone else&apos;s copyright, trademarks or other rights;</li>
            <li>
              imitates a real person&apos;s voice or likeness without their permission, or is designed to deceive
              people about who is speaking;
            </li>
            <li>is spam, malware, or misleading financial promotion;</li>
          </ul>
          <p>
            or to break, overload or reverse-engineer the Service, or resell it without our agreement. We may remove
            content or suspend accounts that break these rules.
          </p>
        </Section>

        <Section title="9. Third-party services and your own keys">
          <p>
            Vuenia relies on third-party providers (such as AI model, voice, hosting and payment providers). When you
            add your own API keys, calls run on your account with that provider and their terms and charges apply to
            you. We aren&apos;t responsible for third-party services, their availability or their charges.
          </p>
        </Section>

        <Section title="10. Availability and changes">
          <p>
            We work to keep Vuenia available and reliable but don&apos;t guarantee it will be uninterrupted or
            error-free. We may change, add or remove features; if we make a change that significantly reduces what
            you&apos;ve paid for, you can cancel and we&apos;ll refund any prepaid, unused amount.
          </p>
        </Section>

        <Section title="11. Ending the agreement">
          <p>
            You can close your account at any time. We may suspend or close accounts that seriously or repeatedly break
            these terms, or where required by law, and will tell you why where we can. On closure we&apos;ll delete
            your data as described in our Privacy Policy.
          </p>
        </Section>

        <Section title="12. Liability">
          <p>
            Nothing in these terms limits liability that can&apos;t be limited by law, such as for death or personal
            injury caused by negligence, or fraud. Otherwise, we aren&apos;t liable for indirect or consequential loss,
            or for loss of profit, revenue or data, and our total liability to you in any 12-month period is limited to
            the amount you paid us in that period.
          </p>
          <p>
            If you&apos;re a consumer, we&apos;re responsible for foreseeable loss caused by our failure to comply with
            these terms or to use reasonable care, and your statutory rights aren&apos;t affected.
          </p>
        </Section>

        <Section title="13. Changes to these terms">
          <p>
            We may update these terms. For significant changes we&apos;ll email account holders at least 30 days
            before they apply; continuing to use Vuenia after that means you accept them. If you don&apos;t, you can
            cancel before they take effect.
          </p>
        </Section>

        <Section title="14. Law and contact">
          <p>
            These terms are governed by the law of {GOVERNING_LAW}, and its courts have jurisdiction — though if
            you&apos;re a consumer you can also bring proceedings where you live. Questions:{" "}
            <span className="font-medium text-ink">{CONTACT_EMAIL}</span>.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
