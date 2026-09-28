"use client";

import { useEffect, useState } from "react";

// Cycles through `words` in place. Every word sits in the same grid cell, so the
// element is always as wide as the longest one and the surrounding headline
// never reflows as the word changes.
export default function RotatingWord({
  words,
  interval = 2200,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`grid ${className}`}>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden
          className={`col-start-1 row-start-1 whitespace-nowrap transition-all duration-500 ease-out motion-reduce:transition-none ${
            i === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
