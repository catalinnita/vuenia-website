"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

// Footer link that re-opens the cookie banner, so a choice can be changed any time.
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
