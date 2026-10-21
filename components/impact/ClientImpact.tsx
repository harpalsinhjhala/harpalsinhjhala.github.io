import { clientImpact, type ClientImpact as Client } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "./CountUp";
import { TurnaroundBars } from "./TurnaroundBars";

// One section for impact and enterprise work: each client card leads with its numbers,
// then the short note on what was delivered.

const statCols: Record<number, string> = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-2 sm:grid-cols-3" };

function ClientCard({ c }: { c: Client }) {
  return (
    <article className="panel flex h-full flex-col p-5 md:p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{c.sector}</p>
        {c.via ? <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">via {c.via}</p> : null}
      </header>
      <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-fg md:text-2xl">{c.client}</h3>

      <dl className={`mt-5 grid items-end gap-4 ${statCols[c.stats.length] ?? "grid-cols-2"}`}>
        {c.stats.map((s) => (
          <div key={s.label} className="flex min-w-0 flex-col-reverse">
            <dt className="mt-1.5 text-sm leading-snug text-muted">{s.label}</dt>
            <dd>
              {s.text ? (
                <span className="font-display text-2xl font-medium tracking-tight text-pos md:text-[1.7rem]">{s.text}</span>
              ) : (
                <span className="font-display text-4xl font-medium tracking-tight text-fg md:text-5xl">
                  <CountUp value={s.value ?? 0} prefix={s.prefix} suffix={s.suffix ?? ""} />
                </span>
              )}
              {s.visual === "turnaround" ? (
                <div className="mt-3">
                  <TurnaroundBars />
                </div>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
        {c.points.map((p) => (
          <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ClientImpactSection() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="03" label="Impact" title="Measured outcomes, client by client." id="impact-title" />

      <p className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <Icon name="lock" className="size-3.5 text-accent-ink" />
        Client work under NDA. Outcomes shared, data never.
      </p>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {clientImpact.map((c, i) => (
          <Reveal
            as="li"
            key={c.client}
            className={c.wide ? "md:col-span-2 lg:col-span-3" : i === clientImpact.length - 1 ? "md:col-span-2 lg:col-span-2" : "lg:col-span-2"}
          >
            <ClientCard c={c} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
