// Scheduling, as the admin app's Schedules page offers it today
// (admin/src/app/(dashboard)/schedules/AddScheduleForm.tsx): every day, specific
// weekdays, or a one-off date — at a time in the user's own time zone — any number
// per Pipeline, each switchable on/off, plus manual runs. Keep the copy in step.

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SCHEDULES = [
  { name: "The Morning Bell", when: "Mon–Fri · 7:00 AM", days: [0, 1, 2, 3, 4], dot: "bg-accent-500", on: true },
  { name: "Weekly market wrap", when: "Sundays · 9:00 AM", days: [6], dot: "bg-violet-500", on: true },
  { name: "Earnings special", when: "Once · Thu 12 Nov, 6:00 PM", days: [3], dot: "bg-orange-500", on: false },
] as const;

export default function Scheduling() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Decorative: a week at a glance, then the schedules that fill it. */}
        <div
          aria-hidden
          data-reveal=""
          className="order-last rounded-3xl border border-border bg-surface p-6 shadow-[0_10px_30px_-12px_rgba(11,15,25,0.15)] lg:order-first"
        >
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {WEEK.map((day, d) => (
              <div key={day} className="rounded-xl bg-gray-50 py-2.5">
                <p className="text-[11px] font-medium text-muted">{day}</p>
                <div className="mt-2 flex h-2 items-center justify-center gap-1">
                  {SCHEDULES.filter((s) => s.on && (s.days as readonly number[]).includes(d)).map((s) => (
                    <span key={s.name} className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-5 divide-y divide-border">
            {SCHEDULES.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot} ${s.on ? "" : "opacity-40"}`} />
                  <div className="min-w-0">
                    <p className={`truncate font-display text-[15px] font-semibold ${s.on ? "text-ink" : "text-muted"}`}>
                      {s.name}
                    </p>
                    <p className="truncate text-xs text-muted">{s.when}</p>
                  </div>
                </div>
                {/* On/off switch */}
                <span
                  className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
                    s.on ? "bg-accent-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm ${s.on ? "left-[1.125rem]" : "left-0.5"}`}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="1">
          <h2 className="text-display-sm font-display font-bold text-ink md:text-display-md">
            Set it once. It shows up on time.
          </h2>
          <p className="mt-4 text-body">
            Put any Pipeline on a schedule — every morning, on the weekdays you choose,
            or once at a set date and time — in your own time zone. Each run gathers fresh
            context, goes through your checks and any approvals you&apos;ve asked for, and
            publishes. Pause a schedule with a switch, or start a run by hand whenever you
            need one.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {["Every day", "Specific weekdays", "Run once", "Run on demand"].map((label) => (
              <li key={label} className="rounded-full px-3 py-1 text-xs font-medium text-ink ring-1 ring-border">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
