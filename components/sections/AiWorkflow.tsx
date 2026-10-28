import Link from "next/link";
import { aiProof, aiWorkflow } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// The working loop: three steps wired left to right, a return path from Verify back to Accelerate,
// and the projects delivered this way.

const icons: IconName[] = ["compass", "zap", "shield"];

function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center py-1 lg:px-1 lg:py-0">
      <svg viewBox="0 0 40 12" className="hidden h-3 w-10 lg:block">
        <line x1="0" y1="6" x2="34" y2="6" stroke="var(--accent)" strokeWidth="1.5" className="flow-line" />
        <path d="M33 2l5 4-5 4" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 12 28" className="h-7 w-3 lg:hidden">
        <line x1="6" y1="0" x2="6" y2="22" stroke="var(--accent)" strokeWidth="1.5" className="flow-line" />
        <path d="M2 21l4 5 4-5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function AiWorkflow() {
  return (
    <section aria-labelledby="ai-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="05" label="How I work with AI" title="AI drafts. I decide and verify." id="ai-title" />

      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {aiWorkflow.map((s, i) => {
          const ai = s.owner !== "me";
          return (
            <li key={s.step} className="contents">
              {i > 0 ? <Connector /> : null}
              <Reveal
                className={`panel flex flex-1 flex-col p-5 md:p-6 ${ai ? "border-accent/40 bg-[color-mix(in_oklab,var(--panel)_88%,var(--accent))]" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`grid size-10 place-items-center rounded-lg border ${ai ? "border-accent/50 bg-accent-soft" : "border-line-strong"} text-accent-ink`}>
                    <Icon name={icons[i]} className="size-5" />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${ai ? "bg-accent text-accent-fg" : "border border-line-strong text-muted"}`}>
                    {ai ? "AI agents" : "me"}
                  </span>
                </div>
                <p className="mt-5 font-mono text-[11px] text-faint">step_0{i + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-medium tracking-tight text-fg">{s.step}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                <pre className="mt-auto overflow-x-auto rounded-lg border border-line bg-bg/60 px-3.5 py-3 pt-3 font-mono text-[11.5px] leading-relaxed text-muted [margin-top:1.25rem]">
                  {s.snippet.map((l) => (
                    <div key={l} className={l.startsWith("✓") ? "text-pos" : l.startsWith(">") ? "text-fg" : ""}>
                      {l}
                    </div>
                  ))}
                </pre>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Return path: Verify sends anything that doesn't reconcile back to drafting. */}
      <div aria-hidden className="mt-3 hidden lg:block">
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="h-10 w-full">
          <path d="M 833 0 V 22 Q 833 32 823 32 H 510 Q 500 32 500 22 V 4" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" className="flow-line" vectorEffect="non-scaling-stroke" />
          <path d="M 496 9 L 500 3 L 504 9" fill="none" stroke="var(--accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="-mt-1 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          doesn&apos;t match the source? back to drafting
        </p>
      </div>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint lg:hidden">
        doesn&apos;t match the source? back to step_02
      </p>

      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Built this way</p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {aiProof.map((p) => {
            const body = (
              <>
                <span className="flex items-center justify-between gap-2 text-[15px] font-medium text-fg">
                  {p.label}
                  {p.href ? <Icon name="arrowRight" className="size-4 text-accent-ink transition-transform group-hover:translate-x-1" /> : null}
                </span>
                <span className="mt-1 block text-sm text-muted">{p.detail}</span>
              </>
            );
            return (
              <li key={p.label}>
                {p.href ? (
                  <Link href={p.href} className="group block h-full rounded-lg border border-line bg-panel px-4 py-3 transition-colors hover:border-accent/50">
                    {body}
                  </Link>
                ) : (
                  <div className="h-full rounded-lg border border-line bg-panel px-4 py-3">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
