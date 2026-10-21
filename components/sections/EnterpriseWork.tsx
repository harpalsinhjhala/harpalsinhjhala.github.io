import { enterpriseWork } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function EnterpriseWork() {
  return (
    <section aria-labelledby="enterprise-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="03" label="Enterprise Work" title="Insurance, banking, energy and ports. Under NDA." id="enterprise-title" />
      <div className="panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel-2 px-5 py-3">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <Icon name="lock" className="size-3.5 text-accent-ink" />
            Client work under NDA. Outcomes shared, data never.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">access: restricted</p>
        </div>
        <ul className="grid gap-px bg-line sm:grid-cols-2">
          {enterpriseWork.map((c, i) => (
            <Reveal as="li" key={c.client} className="bg-panel p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{c.region}</p>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-fg">{c.client}</h3>
              <ul className="mt-4 space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
