"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OPEN_SETTINGS_EVENT, hasGlobalPrivacyControl, readConsent, saveConsent, type ConsentChoice } from "@/lib/consent";

const button =
  "rounded-full px-5 py-2 text-sm font-semibold text-ink ring-1 ring-inset ring-border transition-colors hover:bg-white";

// Slim consent bar, fixed to the bottom so it can't shift the layout, rendered only
// after hydration so it never competes with first paint. Accept and Reject are styled
// identically (UK ICO / EU guidance: rejecting must be as easy as accepting). A browser
// sending Global Privacy Control gets "rejected" recorded without being asked.
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      if (hasGlobalPrivacyControl()) saveConsent("rejected", "gpc");
      // Browser-only state, unavailable during SSR.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      else setOpen(true);
    }
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice, "banner");
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 px-4 py-4 shadow-[0_-8px_24px_-12px_rgb(11_15_25/0.15)] backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm text-body">
          We&apos;d like to use advertising cookies to measure how our ads perform. Nothing is set unless you
          accept.{" "}
          <Link href="/privacy#cookies" className="font-medium text-ink underline underline-offset-2">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("rejected")} className={button}>
            Reject
          </button>
          <button type="button" onClick={() => choose("accepted")} className={button}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
