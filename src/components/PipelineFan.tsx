const AGENTS = [
  { name: "Researcher", x: 19, y: 8, detail: "Pulled 4 sources", pos: "top-[2%] left-[4%] rotate-[-6deg]" },
  { name: "Scriptwriter", x: 83, y: 12, detail: "Wrote 1,050 words", pos: "top-[6%] right-[2%] rotate-[4deg]" },
  { name: "Narrator", x: 11, y: 44, detail: "Voiced 3 speakers", pos: "top-[38%] left-[-4%] rotate-[3deg]" },
  { name: "Slide designer", x: 91, y: 46, detail: "Built 12 slides", pos: "top-[40%] right-[-6%] rotate-[-4deg]" },
  { name: "Video editor", x: 21, y: 88, detail: "Cut 9:42 of video", pos: "bottom-[6%] left-[6%] rotate-[5deg]" },
  { name: "Publisher", x: 77, y: 92, detail: "Posted to YouTube ✓", pos: "bottom-[2%] right-[8%] rotate-[-3deg]" },
] as const;

// The hero's centerpiece — echoes dropship.io's fanned product-data-card hero, but
// each card is one of the real agents in Vuenia's pipeline, fanned around the
// pipeline they make up, so the hero doubles as a diagram of the actual product.
// `x`/`y` are each card's approximate centre (in % of the square) — the
// connector lines run from the hub to there and hide under the card.
export default function PipelineFan() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
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
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            className="animate-flow stroke-accent-500/50 motion-reduce:animate-none"
          />
        ))}
      </svg>

      {AGENTS.map((agent) => (
        <div
          key={agent.name}
          className={`absolute w-44 rounded-2xl border border-border bg-surface p-4 shadow-[0_8px_24px_-8px_rgba(11,15,25,0.12)] ${agent.pos}`}
        >
          <p className="text-sm font-semibold text-ink">{agent.name}</p>
          <p className="mt-0.5 text-xs text-muted">{agent.detail}</p>
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-accent-500 text-center shadow-[0_16px_40px_-12px_rgba(0,119,255,0.55)]">
        <span className="font-display text-xl leading-tight font-bold text-white">
          6 agents
        </span>
        <span className="mt-1 text-[11px] leading-tight text-white/80">one pipeline</span>
      </div>
    </div>
  );
}
