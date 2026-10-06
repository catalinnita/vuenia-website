"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Hero centerpiece: a live run of a real Pipeline, played on loop. The agents work in
// sequence — each takes what the previous one produced — so it's drawn the way the
// admin app shows a run: one ordered list on a timeline, one step active at a time
// (enlarged, with the admin's own status pill), including a pause for human review
// on the script (see HumanControl's section). The "Pipeline" node beside the list is
// the real coordinator (agent/orchestrator_agent.py) — wired to every agent, it
// dispatches each step in turn, shown by the live connector to the active agent.

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

const AGENTS = [
  { name: "Researcher", detail: "Pulled 4 sources", time: "0:41", icon: "search", tile: "bg-sky-100 text-sky-600" },
  { name: "Scriptwriter", detail: "Wrote 1,050 words", time: "2:12", icon: "pen", tile: "bg-violet-100 text-violet-600", review: true },
  { name: "Narrator", detail: "Voiced 3 speakers", time: "1:23", icon: "mic", tile: "bg-orange-100 text-orange-600" },
  { name: "Slide designer", detail: "Built 12 slides", time: "6:58", icon: "slides", tile: "bg-lime-100 text-lime-700" },
  { name: "Video editor", detail: "Cut 9:42 of video", time: "0:19", icon: "film", tile: "bg-rose-100 text-rose-600" },
  { name: "Publisher", detail: "Posted to YouTube", time: "0:06", icon: "send", tile: "bg-emerald-100 text-emerald-600" },
] as const;

type Frame = { step: number; mode: "running" | "review" | "done"; ms: number };

// The run, as a timeline of frames: each step runs, the script also waits on review,
// then everything holds "done" for a beat before the loop restarts.
const FRAMES: Frame[] = [
  ...AGENTS.flatMap((agent, i): Frame[] => [
    { step: i, mode: "running", ms: 1800 },
    ...("review" in agent ? [{ step: i, mode: "review" as const, ms: 2000 }] : []),
  ]),
  { step: AGENTS.length, mode: "done", ms: 3200 },
];

type Status = "queued" | "running" | "review" | "done";

function statusOf(i: number, frame: Frame): Status {
  if (i < frame.step) return "done";
  if (i > frame.step) return "queued";
  return frame.mode === "done" ? "done" : frame.mode;
}

function pipelineLine(frame: Frame): string {
  if (frame.mode === "done") return "Run complete";
  const agent = AGENTS[frame.step];
  if (frame.mode === "review") return "Waiting on you";
  return frame.step === 0 ? `Starting → ${agent.name}` : `→ ${agent.name}`;
}

// Connectors from the Pipeline node to every agent's icon, in px against the wrapper
// (not a stretched viewBox), measured from the DOM. Rows change size as the active
// step grows, so after each frame change they're re-measured on every animation frame
// until the grow transition has settled. Vertical layout: hub's right edge → icons'
// left edges; horizontal: hub's bottom → icons' tops.
type Geo = { w: number; h: number; from: [number, number]; to: [number, number][] };

function useConnectors(frame: Frame, horizontal: boolean) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLSpanElement>(null);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);

  useLayoutEffect(() => {
    function measure() {
      const wrap = wrapRef.current;
      const hub = hubRef.current;
      if (!wrap || !hub) return;
      const w = wrap.getBoundingClientRect();
      // The layout not shown at this breakpoint is display:none — nothing to measure.
      if (w.width === 0) return;
      const h = hub.getBoundingClientRect();
      setGeo({
        w: w.width,
        h: w.height,
        from: horizontal
          ? [h.left + h.width / 2 - w.left, h.bottom - w.top]
          : [h.right - w.left, h.top + h.height / 2 - w.top],
        to: iconRefs.current.map((el) => {
          const r = el?.getBoundingClientRect();
          if (!r) return [0, 0];
          return horizontal
            ? [r.left + r.width / 2 - w.left, r.top - w.top]
            : [r.left - w.left, r.top + r.height / 2 - w.top];
        }),
      });
    }
    let raf = 0;
    const until = performance.now() + 650;
    const tick = () => {
      measure();
      if (performance.now() < until) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [frame, horizontal]);

  return { wrapRef, hubRef, iconRefs, geo };
}

// Pipeline → each agent. The one being worked on is dark with dashes flowing toward
// the agent; finished ones mid-grey; queued ones faint.
function Connectors({ geo, frame, horizontal }: { geo: Geo | null; frame: Frame; horizontal: boolean }) {
  if (!geo) return null;
  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible" width={geo.w} height={geo.h}>
      {geo.to.map(([x, y], i) => {
        const [fx, fy] = geo.from;
        const status = statusOf(i, frame);
        const active = status === "running" || status === "review";
        let d: string;
        if (horizontal) {
          const mid = fy + (y - fy) * 0.55;
          d = `M ${fx} ${fy} C ${fx} ${mid}, ${x} ${mid}, ${x} ${y}`;
        } else {
          const mid = fx + (x - fx) * 0.55;
          d = `M ${fx} ${fy} C ${mid} ${fy}, ${mid} ${y}, ${x} ${y}`;
        }
        return (
          <path
            key={i}
            d={d}
            fill="none"
            strokeLinecap="round"
            strokeWidth={active ? 2 : 1.25}
            strokeDasharray={active ? "4 5" : undefined}
            className={`transition-colors duration-300 ${
              active
                ? "animate-dash-flow stroke-ink motion-reduce:animate-none"
                : status === "done"
                  ? "stroke-gray-300"
                  : "stroke-gray-200"
            }`}
          />
        );
      })}
    </svg>
  );
}

// The Pipeline node's icon: the coordinator handing each step to the next agent in turn.
function HubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative h-6 w-6">
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v4M12 11.5 6.5 17M12 11.5l5.5 5.5" />
    </svg>
  );
}

function AgentGlyph({ icon, status }: { icon: string; status: Status }) {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        {ICONS[icon]}
      </svg>
      {status === "done" && (
        <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-bg">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      )}
    </>
  );
}

// Same status pills as the admin app's StatusPill: amber with moving stripes while
// running, light blue awaiting review.
function StatusPill({ status }: { status: Status }) {
  if (status === "running")
    return (
      <span className="animate-stripes inline-flex rounded-full bg-[#fffaeb] px-2 py-px text-[10px] font-medium text-[#dc6803]">
        running
      </span>
    );
  if (status === "review")
    return (
      <span className="inline-flex rounded-full bg-[#f0f9ff] px-2 py-px text-[10px] font-medium text-[#0ba5ec]">
        awaiting review
      </span>
    );
  return null;
}

export default function PipelineFan() {
  // Starts on the finished state (also what server render and reduced-motion users
  // see), then plays from the top once mounted.
  const [frameIndex, setFrameIndex] = useState(FRAMES.length - 1);
  const frame = FRAMES[frameIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(
      () => setFrameIndex((f) => (f + 1) % FRAMES.length),
      frame.ms,
    );
    return () => clearTimeout(id);
  }, [frame]);

  // Beside the hero copy (lg+) the run reads top to bottom; stacked under it on
  // tablets and phones it's laid out left to right so it doesn't tower over the page.
  return (
    <div aria-hidden className="w-full">
      <VerticalFan frame={frame} />
      <HorizontalFan frame={frame} />
    </div>
  );
}

function VerticalFan({ frame }: { frame: Frame }) {
  const { wrapRef, hubRef, iconRefs, geo } = useConnectors(frame, false);

  return (
    <div ref={wrapRef} className="relative left-10 mx-auto hidden w-full max-w-[34rem] items-center gap-10 lg:flex">
      <Connectors geo={geo} frame={frame} horizontal={false} />

      <div className="relative z-10 flex w-24 shrink-0 flex-col items-center text-center">
        <span
          ref={hubRef}
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white shadow-[0_10px_24px_-10px_rgba(11,15,25,0.6)]"
        >
          <HubIcon />
        </span>
        <p className="mt-2 font-display text-[15px] leading-tight font-semibold text-ink">Pipeline</p>
        {/* Fixed height, so a longer or shorter status can't nudge the node. */}
        <p className="mt-0.5 h-8 text-xs leading-4 text-muted">{pipelineLine(frame)}</p>
      </div>

      <div className="relative min-w-0 flex-1">
        {/* The agents' own order, top to bottom. */}
        <span className="absolute top-[2.75rem] bottom-[2.75rem] left-[21px] w-0.5 bg-gray-200" />

        <ol>
          {AGENTS.map((agent, i) => {
            const status = statusOf(i, frame);
            const active = status === "running" || status === "review";
            return (
              // Every row is a fixed height with room for the enlarged state built in, and
              // the active step grows purely by transform (1.5×) around its icon's centre.
              // So nothing else in the animation ever moves — not the other rows, the
              // timeline, the Pipeline node, or the connectors' far ends.
              <li key={agent.name} className="relative flex h-[5.5rem] items-center">
                <div
                  className={`flex w-full origin-[22px_50%] items-center gap-4 transition-transform duration-500 ease-out ${
                    active ? "scale-150" : "scale-100"
                  }`}
                >
                  <span
                    ref={(el) => {
                      iconRefs.current[i] = el;
                    }}
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      status === "queued" ? "bg-gray-100 text-gray-300" : agent.tile
                    }`}
                  >
                    <AgentGlyph icon={agent.icon} status={status} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-display text-[15px] leading-tight font-semibold transition-colors duration-300 ${
                          status === "queued" ? "text-muted" : "text-ink"
                        }`}
                      >
                        {agent.name}
                      </p>
                      <StatusPill status={status} />
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {status === "done" && (
                        <>
                          {agent.detail} · {agent.time}
                        </>
                      )}
                      {status === "running" && "Working…"}
                      {status === "review" && "Waiting for your approval"}
                      {status === "queued" && "Queued"}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function HorizontalFan({ frame }: { frame: Frame }) {
  const { wrapRef, hubRef, iconRefs, geo } = useConnectors(frame, true);
  const current = frame.mode === "done" ? null : AGENTS[frame.step];

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-2xl lg:hidden">
      <Connectors geo={geo} frame={frame} horizontal />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span
          ref={hubRef}
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white shadow-[0_10px_24px_-10px_rgba(11,15,25,0.6)]"
        >
          <HubIcon />
        </span>
      </div>

      <div className="relative mt-14 sm:mt-20">
        {/* The agents' own order, left to right, through the icons' centres. */}
        <span className="absolute top-[22px] right-[8.333%] left-[8.333%] h-0.5 bg-gray-200 max-sm:top-[18px]" />

        <ol className="grid grid-cols-6 gap-1 sm:gap-3">
          {AGENTS.map((agent, i) => {
            const status = statusOf(i, frame);
            const active = status === "running" || status === "review";
            return (
              <li key={agent.name} className="flex flex-col items-center text-center">
                {/* Grows by transform only, so the row and connectors never shift. */}
                <span
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition duration-500 ease-out max-sm:h-9 max-sm:w-9 ${
                    status === "queued" ? "bg-gray-100 text-gray-300" : agent.tile
                  } ${active ? "scale-125" : "scale-100"}`}
                >
                  <AgentGlyph icon={agent.icon} status={status} />
                </span>
                <p
                  className={`mt-3 w-full font-display text-[10px] leading-tight font-semibold transition-colors duration-300 sm:text-[13px] ${
                    status === "queued" ? "text-muted" : "text-ink"
                  }`}
                >
                  {/* Soft hyphens, so the longest names can wrap in a phone-width column. */}
                  {agent.name.replace("Researcher", "Re\u00ADsearcher").replace("Scriptwriter", "Script\u00ADwriter")}
                </p>
                <p className="mt-0.5 text-[10px] text-muted max-sm:hidden sm:text-xs">
                  {status === "done" ? agent.time : status === "queued" ? "Queued" : "…"}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* What the Pipeline is doing now — fixed height so the hero never jumps. */}
      <div className="mt-5 flex h-6 items-center justify-center gap-2 text-xs text-muted">
        <span className="font-display font-semibold text-ink">Pipeline</span>
        <span>{pipelineLine(frame)}</span>
        {current && <StatusPill status={statusOf(frame.step, frame)} />}
      </div>
    </div>
  );
}
