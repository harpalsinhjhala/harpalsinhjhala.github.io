import { kpis } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "./CountUp";
import { Sparkline } from "./Sparkline";

export function ImpactStrip() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="01" label="Impact" title="Outcomes, measured." id="impact-title" />
      <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k, i) => (
          <Reveal as="li" key={k.label} className="bg-panel">
            <div className="flex h-full flex-col justify-between gap-6 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  kpi_{String(i + 1).padStart(2, "0")}
                </p>
                <Sparkline visual={k.visual} id={`kpi-${i}`} />
              </div>
              <div>
                <p className="font-display text-5xl font-medium tracking-tight text-fg md:text-[3.4rem]">
                  <CountUp value={k.value} prefix={k.prefix} suffix={k.suffix} />
                </p>
                <p className="mt-2 text-[15px] font-medium text-fg">{k.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{k.context}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
