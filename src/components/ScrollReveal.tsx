"use client";

import { useEffect } from "react";

// Fades up any element marked `data-reveal` the first time it scrolls into view.
// `data-reveal="1" | "2" | "3"` staggers siblings (see globals.css). Content is only
// hidden once this has run (the `reveal-ready` class), so without JS — or before
// hydration — everything is simply visible. Renders nothing itself.
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    // Anything already on screen at load is revealed straight away (no flash);
    // only what's below the fold waits for the scroll.
    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) el.setAttribute("data-revealed", "");
      else observer.observe(el);
    }
    root.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, []);

  return null;
}
