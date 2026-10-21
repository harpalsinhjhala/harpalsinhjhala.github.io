import { profile, site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { PhotoCard } from "./PhotoCard";
import { SqlConsole } from "./SqlConsole";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      {/* Phone order: intro, photo, console. Desktop: intro and console on the left, photo on the right. */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-8 md:px-6 md:pb-14 md:pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-x-14 lg:gap-y-12">
        <div className="flex min-w-0 flex-col lg:col-start-1 lg:row-start-1">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 font-mono text-[11px] text-muted">
            <span className="pulse-dot size-1.5 shrink-0 rounded-full bg-pos" aria-hidden />
            {profile.location}
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.75rem] font-medium leading-[1.02] tracking-[-0.03em] text-fg sm:text-6xl lg:text-[4.5rem]"
          >
            {profile.name}
          </h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-accent-ink sm:text-sm">{profile.title}</p>
          <p className="mt-6 max-w-2xl font-display text-[1.75rem] font-medium leading-[1.12] tracking-[-0.02em] text-fg sm:text-[2.35rem]">
            {profile.lead} <span className="whitespace-nowrap text-accent-ink">{profile.leadAccent}</span>
          </p>

          {/* The stack as a pipeline; each stage lights up in turn (.pipe-stage in globals.css). */}
          <ol className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[12px] sm:text-[13px]" aria-label="How I work: from SQL to C-suite decisions">
            {profile.pipeline.map((stage, i) => {
              const last = i === profile.pipeline.length - 1;
              return (
                <li key={stage} className="flex items-center gap-1.5">
                  <span
                    className={`pipe-stage rounded-md border px-2 py-1 ${last ? "border-accent bg-accent text-accent-fg" : "border-line-strong text-muted"}`}
                    style={{ animationDelay: `${i * 0.45}s` }}
                  >
                    {stage}
                  </span>
                  {!last ? (
                    <span aria-hidden className="text-accent-ink">
                      →
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.line}</p>

          {/* Proof: each number says what it is and who it was for. */}
          <ul className="mt-6 grid max-w-2xl grid-cols-1 divide-y divide-line overflow-hidden rounded-lg border border-line bg-panel sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {profile.proof.map((p) => (
              <li key={p.label} className="flex items-baseline justify-between gap-3 px-4 py-3 sm:flex-col sm:justify-start sm:gap-0">
                <p className="tnum whitespace-nowrap font-display text-lg font-medium text-pos sm:text-xl">{p.value}</p>
                <p className="text-right sm:mt-1 sm:text-left">
                  <span className="block font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-muted">{p.label}</span>
                  <span className="mt-0.5 block text-[13px] leading-tight text-fg">{p.context}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Delivered for</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {profile.deliveredFor.map((c) => (
                <li key={c} className="rounded-md border border-line-strong bg-panel px-2.5 py-1 text-[13px] font-medium text-fg">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-px"
            >
              View Projects
              <Icon name="arrowRight" />
            </a>
            <a
              href={site.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent"
            >
              <Icon name="download" />
              Download CV
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:max-w-none">
          <div className="lg:sticky lg:top-24">
            <PhotoCard />
          </div>
        </div>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <SqlConsole />
        </div>
      </div>
    </section>
  );
}
