import { experience, site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Gantt-style rows on a shared time axis. Bar position comes from each role's start and end month.
const AXIS_START = 2018;
const AXIS_END = 2027;

function toYears(ym: string) {
  const [y, mo] = ym.split("-").map(Number);
  return y + (mo - 1) / 12;
}

function pct(v: number) {
  return ((v - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
}

export function ExperienceTimeline() {
  const now = toYears(site.lastUpdated.slice(0, 7));
  const years = Array.from({ length: AXIS_END - AXIS_START + 1 }, (_, i) => AXIS_START + i);

  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="04" label="Experience" title="Four years across insurance, brokerage, energy and edtech." id="experience-title" />

      <div className="panel p-4 md:p-6">
        <div aria-hidden className="relative mb-2 ml-0 h-5 md:ml-[38%]">
          {years.map((y) => (
            <span
              key={y}
              className={`absolute -translate-x-1/2 font-mono text-[10px] text-faint ${y % 2 ? "hidden sm:block" : ""}`}
              style={{ left: `${pct(y)}%` }}
            >
              {String(y).slice(2)}
            </span>
          ))}
        </div>

        <ol className="divide-y divide-line">
          {experience.map((r, i) => {
            const s = toYears(r.start);
            const e = r.end ? toYears(r.end) : now;
            return (
              <Reveal as="li" key={r.role + r.org} className="grid gap-4 py-5 md:grid-cols-[38%_1fr] md:gap-0">
                <div className="md:pr-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                    <time dateTime={r.start}>{r.startLabel}</time> – {r.end ? <time dateTime={r.end}>{r.endLabel}</time> : r.endLabel}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-medium tracking-tight text-fg">{r.role}</h3>
                  <p className="text-sm text-muted">{r.org}</p>
                  {r.points.length ? (
                    <ul className="mt-3 space-y-1.5">
                      {r.points.map((p) => (
                        <li key={p} className="text-sm leading-relaxed text-muted">
                          {p}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {r.award ? (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[11px] text-accent-ink">
                      <Icon name="award" className="size-3.5" />
                      {r.award}
                    </p>
                  ) : null}
                </div>

                <div aria-hidden className="relative order-first h-8 md:order-none md:h-auto">
                  {years.map((y) => (
                    <span key={y} className="absolute inset-y-0 w-px bg-line" style={{ left: `${pct(y)}%` }} />
                  ))}
                  <span
                    className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full md:top-7 ${
                      r.kind === "education" ? "border border-line-strong bg-panel-2" : r.end ? "bg-accent/70" : "bg-accent"
                    }`}
                    style={{ left: `${pct(s)}%`, width: `${pct(e) - pct(s)}%` }}
                  />
                  {!r.end ? (
                    <span className="pulse-dot absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pos md:top-7" style={{ left: `${pct(e)}%` }} />
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
