import { aiWorkflow } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons: IconName[] = ["compass", "zap", "shield"];

export function AiWorkflow() {
  return (
    <section aria-labelledby="ai-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="05" label="How I work with AI" title="AI drafts. I decide and verify." id="ai-title" />
      <ol className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-3">
        {aiWorkflow.map((s, i) => (
          <Reveal as="li" key={s.step} className="relative bg-panel p-6">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-lg border border-line-strong text-accent-ink">
                <Icon name={icons[i]} className="size-5" />
              </span>
              <span className="font-mono text-[11px] text-faint">step_0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-fg">{s.step}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
