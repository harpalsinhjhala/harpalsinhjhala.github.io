import { experience, site, type Role } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Career path overview (desktop) above a vertical timeline of readable role cards.

function toMonths(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function duration(r: Role, now: number) {
  const total = (r.end ? toMonths(r.end) : now) - toMonths(r.start);
  const y = Math.floor(total / 12);
  const m = total % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
}

function shortOrg(org: string) {
  return org.replace(/\s*\(.*\)$/, "").replace("Gujarat Technological University", "GTU");
}

export function ExperienceTimeline() {
  const now = toMonths(site.lastUpdated.slice(0, 7));
  const work = experience.filter((r) => r.kind === "work");
  const edu = experience.filter((r) => r.kind === "education");

  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="04" label="Experience" title="Four years across insurance, mortgage servicing, brokerage, energy and edtech." id="experience-title" />

      {/* Overview: the career path as equal steps, oldest to newest. */}
      <div aria-hidden className="mb-8 hidden md:block">
        <ol className="grid grid-cols-3 gap-3">
          {[...work].reverse().map((r, i, arr) => (
            <li key={r.org} className="relative">
              <div className={`panel h-full px-5 py-4 ${!r.end ? "border-accent/50" : ""}`}>
                <div className="flex items-center justify-between font-mono text-[11px] text-faint">
                  <span>
                    {r.startLabel.slice(-4)} – {r.end ? r.endLabel.slice(-4) : "now"}
                  </span>
                  {!r.end ? (
                    <span className="flex items-center gap-1.5 text-pos">
                      <span className="pulse-dot size-1.5 rounded-full bg-pos" />
                      current
                    </span>
                  ) : (
                    <span>{duration(r, now)}</span>
                  )}
                </div>
                <p className="mt-2 font-display text-lg font-medium tracking-tight text-fg">{r.role}</p>
                <p className="text-sm text-muted">{shortOrg(r.org)}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-panel-2">
                  <div className={`h-full rounded-full ${r.end ? "bg-accent/60" : "bg-accent"}`} style={{ width: `${((i + 1) / arr.length) * 100}%` }} />
                </div>
              </div>
              {i < arr.length - 1 ? (
                <span className="absolute -right-3 top-1/2 z-10 grid size-6 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg text-accent-ink">
                  <Icon name="arrowRight" className="size-3" />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <ol className="space-y-6">
        {work.map((r, i) => (
          <Reveal as="li" key={r.org} className="relative pl-7 md:grid md:grid-cols-[180px_1fr] md:gap-8 md:pl-0">
            {/* Rail and node */}
            <span aria-hidden className={`absolute left-[5px] top-2 w-px bg-line ${i === work.length - 1 ? "bottom-0" : "-bottom-6"}`} />
            <span
              aria-hidden
              className={`absolute left-0 top-1.5 size-[11px] rounded-full border-2 ${r.end ? "border-line-strong bg-bg" : "pulse-dot border-pos bg-pos"}`}
            />

            <div className="mb-3 md:mb-0 md:pl-7 md:pt-0.5">
              <p className="font-mono text-[12px] text-fg">
                <time dateTime={r.start}>{r.startLabel}</time> – {r.end ? <time dateTime={r.end}>{r.endLabel}</time> : r.endLabel}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px] text-faint">
                {duration(r, now)}
                {!r.end ? <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent-ink">current</span> : null}
              </p>
            </div>

            <article className="panel overflow-hidden">
              <header className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-start sm:justify-between md:px-6">
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-fg md:text-2xl">{r.role}</h3>
                  <p className="mt-0.5 text-[15px] text-muted">{r.org}</p>
                </div>
                {r.award ? (
                  <p className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-md border border-accent/40 bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent-ink">
                    <Icon name="award" className="size-3.5" />
                    {r.award}
                  </p>
                ) : null}
              </header>

              <div className="px-5 py-5 md:px-6">
                <p className="text-[15px] leading-relaxed text-fg">{r.summary}</p>
                {r.clients?.length ? (
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Clients</span>
                    {r.clients.map((c) => (
                      <span key={c} className="rounded-md border border-line-strong px-2 py-0.5 text-fg">
                        {c}
                      </span>
                    ))}
                  </p>
                ) : null}

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {r.highlights.map((h) => (
                    <li key={h.result} className="rounded-lg border border-line bg-panel-2 px-4 py-3">
                      <p className="tnum font-display text-lg font-medium text-pos">{h.result}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{h.detail}</p>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Stack</span>
                  {r.stack.map((s) => (
                    <span key={s} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                      {s}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>

      {edu.map((r) => (
        <Reveal key={r.org} className="mt-6 pl-7 md:grid md:grid-cols-[180px_1fr] md:gap-8 md:pl-0">
          <p className="mb-2 font-mono text-[12px] text-fg md:mb-0 md:pl-7 md:pt-4">
            {r.startLabel} – {r.endLabel}
          </p>
          <div className="panel flex flex-wrap items-center justify-between gap-2 px-5 py-4 md:px-6">
            <div>
              <h3 className="font-display text-lg font-medium tracking-tight text-fg">{r.role}</h3>
              <p className="text-sm text-muted">{r.org}</p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Education</span>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
