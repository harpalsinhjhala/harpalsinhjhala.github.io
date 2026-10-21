import { awards } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Recognition() {
  return (
    <section aria-labelledby="awards-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="06" label="Recognition" title="Awards." id="awards-title" />
      <ul className="grid gap-4 md:grid-cols-2">
        {awards.map((a, i) => (
          <Reveal as="li" key={a.title} className="panel relative overflow-hidden p-6">
            <span aria-hidden className="absolute -right-6 -top-10 font-display text-[9rem] font-medium leading-none text-fg opacity-[0.04]">
              {a.year.slice(2)}
            </span>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent-ink">
                <Icon name="award" className="size-5" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{a.year}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-fg">{a.title}</h3>
            <p className="mt-1 text-sm text-fg">{a.org}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.note}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
