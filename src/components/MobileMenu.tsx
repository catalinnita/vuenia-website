"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";

// The header's nav, Log in, and the beta CTA, folded behind a burger below md.
// Closes on any link tap, Escape, or widening past md.
export default function MobileMenu({ links }: { links: readonly { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onWiden = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onWiden);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWiden);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="relative z-50 -mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pt-24 pb-10"
          // A tap on any link navigates; the menu shouldn't linger over the new page.
          onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        >
          <nav className="flex flex-col divide-y divide-border border-y border-border">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-4 font-display text-lg font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            {/* Plain <a>: /app is the separately deployed admin app — see Header. */}
            <a
              href="/app"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-ink ring-1 ring-border ring-inset"
            >
              Log in
            </a>
            <Button href="/beta">Request beta access</Button>
          </div>
        </div>
      )}
    </div>
  );
}
