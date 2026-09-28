import type { CSSProperties, ReactNode } from "react";

// Line icons (Lucide paths, 24×24, stroked) — inlined rather than adding an icon
// dependency for six glyphs.
const ICONS: Record<string, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
    </>
  ),
  mic: (
    <>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v3" />
    </>
  ),
  slides: (
    <>
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </>
  ),
  film: (
    <>
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </>
  ),
  send: (
    <>
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </>
  ),
};

// One colour per agent, carried through its icon tile, check badge, track and
// travelling dots — so each connection reads as that agent's own lane. Full class
// strings (not built from the hue) so Tailwind can see them.
const AGENTS = [
  {
    name: "Researcher",
    detail: "Pulled 4 sources",
    icon: "search",
    x: 22, y: 9,
    pos: "top-[2%] left-[4%]",
    tilt: "rotate-[-6deg]",
    tile: "bg-sky-100 text-sky-600",
    badge: "bg-sky-500",
    track: "stroke-sky-500/25",
    dot: "bg-sky-500 shadow-[0_0_8px_2px_rgba(14,165,233,0.45)]",
  },
  {
    name: "Scriptwriter",
    detail: "Wrote 1,050 words",
    icon: "pen",
    x: 80, y: 13,
    pos: "top-[6%] right-[2%]",
    tilt: "rotate-[4deg]",
    tile: "bg-violet-100 text-violet-600",
    badge: "bg-violet-500",
    track: "stroke-violet-500/25",
    dot: "bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.45)]",
  },
  {
    name: "Narrator",
    detail: "Voiced 3 speakers",
    icon: "mic",
    x: 14, y: 45,
    pos: "top-[38%] left-[-4%]",
    tilt: "rotate-[3deg]",
    tile: "bg-orange-100 text-orange-600",
    badge: "bg-orange-500",
    track: "stroke-orange-500/25",
    dot: "bg-orange-500 shadow-[0_0_8px_2px_rgba(249,115,22,0.45)]",
  },
  {
    name: "Slide designer",
    detail: "Built 12 slides",
    icon: "slides",
    x: 88, y: 47,
    pos: "top-[40%] right-[-6%]",
    tilt: "rotate-[-4deg]",
    tile: "bg-lime-100 text-lime-700",
    badge: "bg-lime-500",
    track: "stroke-lime-500/30",
    dot: "bg-lime-500 shadow-[0_0_8px_2px_rgba(132,204,22,0.5)]",
  },
  {
    name: "Video editor",
    detail: "Cut 9:42 of video",
    icon: "film",
    x: 24, y: 87,
    pos: "bottom-[6%] left-[6%]",
    tilt: "rotate-[5deg]",
    tile: "bg-rose-100 text-rose-600",
    badge: "bg-rose-500",
    track: "stroke-rose-500/25",
    dot: "bg-rose-500 shadow-[0_0_8px_2px_rgba(244,63,94,0.45)]",
  },
  {
    name: "Publisher",
    detail: "Posted to YouTube",
    icon: "send",
    x: 74, y: 91,
    pos: "bottom-[2%] right-[8%]",
    tilt: "rotate-[-3deg]",
    tile: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-500",
    track: "stroke-emerald-500/25",
    dot: "bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.45)]",
  },
] as const;

// The hero's centerpiece — echoes dropship.io's fanned product-data-card hero, but
// each card is one of the real agents in Vuenia's pipeline, fanned around the
// pipeline they make up, so the hero doubles as a diagram of the actual product.
// `x`/`y` are each card's approximate centre (in % of the square) — the
// connectors (track + travelling dots) run from the hub to there and hide under
// the card.
export default function PipelineFan() {
  return (
    // Laid out at one fixed size (cards are fixed-width, positions are %), then
    // zoomed down as a whole where its column is narrower than 36rem — phones, and
    // the two-column hero at lg — so it shrinks like an image instead of the cards
    // piling onto each other.
    <div className="relative mx-auto h-[36rem] w-[36rem] max-sm:[zoom:0.58] lg:[zoom:0.8] xl:[zoom:1]">
      {/* Faint track per connection, so the path reads even between dots. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {AGENTS.map((agent) => (
          <line
            key={agent.name}
            x1="50"
            y1="50"
            x2={agent.x}
            y2={agent.y}
            vectorEffect="non-scaling-stroke"
            strokeWidth="1"
            className={agent.track}
          />
        ))}
      </svg>

      {/* Dots flowing hub → agent: a few per connection, staggered along the same
          cycle, with each connection offset so they don't all pulse in unison. */}
      {AGENTS.map((agent, i) =>
        [0, 1, 2].map((n) => (
          <span
            key={`${agent.name}-${n}`}
            aria-hidden
            style={
              {
                "--x": `${agent.x}%`,
                "--y": `${agent.y}%`,
                animationDelay: `${-(n * 1.33 + i * 0.6)}s`,
              } as CSSProperties
            }
            className={`absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-travel rounded-full opacity-0 motion-reduce:hidden ${agent.dot}`}
          />
        )),
      )}

      {AGENTS.map((agent) => (
        // Position and tilt live on separate elements on purpose. The animated
        // dots below get their own GPU layers, which forces these overlapping cards
        // onto layers too; if the layer itself were rotated, Chrome would rasterize
        // it flat and then rotate the texture — blurry text. Keeping the layer
        // (outer div) unrotated means the tilted card is painted into it at its
        // angle, so text stays crisp.
        <div key={agent.name} className={`absolute ${agent.pos}`}>
          <div
            className={`flex w-52 items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 pr-4 shadow-[0_10px_30px_-10px_rgba(11,15,25,0.18)] ${agent.tilt}`}
          >
            <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${agent.tile}`}>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                {ICONS[agent.icon]}
              </svg>
              {/* Done badge */}
              <span
                className={`absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-surface ${agent.badge}`}
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
            </span>
            <div className="min-w-0">
              <p className="font-display text-[15px] leading-tight font-semibold text-ink">{agent.name}</p>
              <p className="mt-0.5 text-xs text-muted">{agent.detail}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Hub glow: pale tints of the six agents' colours as a soft conic halo
          behind the sphere, slowly turning and breathing — kept light so it reads
          as a glow, not a shadow. */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -mt-28 -ml-28 h-56 w-56 animate-glow rounded-full bg-[conic-gradient(from_0deg,#bae6fd,#ddd6fe,#fed7aa,#d9f99d,#fecdd3,#a7f3d0,#bae6fd)] blur-3xl motion-reduce:animate-none"
      />

      {/* Hub: a mid-graphite sphere — soft highlight top-left, deeper bottom-right. */}
      <div className="absolute top-1/2 left-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_34%_26%,#6b7385_0%,#454c5c_45%,#2b303c_100%)] text-center shadow-[inset_-8px_-12px_24px_rgba(0,0,0,0.28),inset_4px_6px_14px_rgba(255,255,255,0.16),0_20px_40px_-16px_rgba(11,15,25,0.55)] ring-1 ring-white/15">
        <span className="font-display text-xl leading-tight font-bold text-white">
          6 agents
        </span>
        <span className="mt-1 text-[11px] leading-tight text-white/70">one pipeline</span>
      </div>
    </div>
  );
}
