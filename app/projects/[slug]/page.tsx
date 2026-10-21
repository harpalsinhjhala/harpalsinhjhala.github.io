import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LiveEmbed } from "@/components/projects/LiveEmbed";
import { PipelineDiagram } from "@/components/projects/PipelineDiagram";
import { Icon } from "@/components/ui/Icon";
import { projects } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} case study`,
    description: p.outcome,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title: p.title, description: p.outcome, url: `/projects/${p.slug}/`, images: [`${p.preview}-1600.webp`] },
  };
}

function Block({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-8 md:py-10">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span className="text-accent-ink">{n}</span> <span className="text-faint">/</span> {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-muted md:text-base">
          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const cs = p.caseStudy;

  return (
    <div className="bg-texture">
      <Navbar />
      <main id="main" className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <nav aria-label="Breadcrumb" className="pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-muted hover:text-fg">
            <Icon name="arrowRight" className="size-3.5 rotate-180" />
            All projects
          </Link>
        </nav>

        <header className="pb-10 pt-6 md:pb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink">
            p_{String(i + 1).padStart(2, "0")} · {p.domain}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-medium tracking-[-0.02em] text-fg md:text-6xl">{p.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{p.outcome}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                {s}
              </li>
            ))}
          </ul>
          {p.repo ? (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              <Icon name="github" />
              View the repository
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </header>

        <Block n="01" label="Problem">
          <p className="max-w-3xl text-base leading-relaxed text-fg md:text-lg">{cs.problem}</p>
        </Block>
        <Block n="02" label="Data">
          <List items={cs.data} />
        </Block>
        <Block n="03" label="Approach">
          <List items={cs.approach} />
          <div className="mt-6">
            <PipelineDiagram nodes={cs.flow} note={cs.flowNote} />
          </div>
        </Block>
        <section id="live" className="scroll-mt-24 border-t border-line py-8 md:py-10">
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <span className="text-accent-ink">04</span> <span className="text-faint">/</span> Live dashboard
          </h2>
          <LiveEmbed project={p} />
        </section>
        <Block n="05" label="Business impact">
          <List items={cs.impact} />
        </Block>
        <Block n="06" label="Tools">
          <ul className="flex flex-wrap gap-2">
            {cs.tools.map((t) => (
              <li key={t} className="rounded-md border border-line-strong px-2.5 py-1 font-mono text-xs text-fg">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Link
          href={`/projects/${next.slug}/`}
          className="panel group mt-6 flex items-center justify-between gap-4 p-5 transition-colors hover:border-line-strong md:p-6"
        >
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Next project</span>
            <span className="mt-1 block font-display text-xl font-medium tracking-tight text-fg md:text-2xl">{next.title}</span>
          </span>
          <Icon name="arrowRight" className="size-5 text-accent-ink transition-transform group-hover:translate-x-1" />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
