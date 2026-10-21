import { domains, skills } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Skills drawn as a schema explorer: each group is a table, domains are a shared dimension.
export function SkillsSchema() {
  const total = skills.reduce((n, t) => n + t.columns.length, 0);
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="05" label="Skills" title="The stack, as a data model." id="skills-title" />

      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        schema: harpal_jhala.skills · {skills.length + 1} tables · {total + domains.length} columns
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((t, i) => (
          <Reveal key={t.table} className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line bg-panel-2 px-4 py-2.5">
              <h3 className="font-mono text-[12px] text-fg">
                <span className="text-faint">tbl.</span>
                {t.table}
              </h3>
              <span className="font-mono text-[10px] text-faint">{t.columns.length} cols</span>
            </div>
            <p className="sr-only">{t.label}</p>
            <ul className="py-1.5">
              <li className="flex items-center justify-between px-4 py-1.5 font-mono text-[11px] text-faint">
                <span>
                  <span className="mr-2 text-accent-ink">FK</span>domain_id
                </span>
                <span>→ dim_domain</span>
              </li>
              {t.columns.map((c) => (
                <li key={c} className="px-4 py-1.5 text-sm text-fg">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="overflow-hidden rounded-[14px] border border-accent/40 bg-accent-soft">
          <div className="flex items-center justify-between border-b border-accent/30 px-4 py-2.5">
            <h3 className="font-mono text-[12px] text-fg">
              <span className="text-faint">dim.</span>dim_domain
            </h3>
            <span className="font-mono text-[10px] text-accent-ink">shared dimension</span>
          </div>
          <p className="sr-only">Domains</p>
          <ul className="py-1.5">
            <li className="px-4 py-1.5 font-mono text-[11px] text-faint">
              <span className="mr-2 text-accent-ink">PK</span>domain_id
            </li>
            {domains.map((d) => (
              <li key={d} className="px-4 py-1.5 text-sm text-fg">
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
