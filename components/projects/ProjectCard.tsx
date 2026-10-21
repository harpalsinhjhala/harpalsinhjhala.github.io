import Link from "next/link";
import type { Project } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Magnetic } from "@/components/ui/Magnetic";
import { Picture } from "@/components/ui/Picture";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = project.featured;
  return (
    <Magnetic className="group relative h-full">
      <article
        className={`panel relative flex h-full flex-col overflow-hidden transition-colors duration-300 group-hover:border-line-strong ${
          featured ? "lg:grid lg:grid-cols-[1.25fr_1fr]" : ""
        }`}
      >
        {/* Pointer-following glow, positioned by Magnetic via --mx/--my */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 60%)" }}
        />

        <div className={`relative overflow-hidden border-b border-line bg-panel-2 ${featured ? "lg:border-b-0 lg:border-r" : ""}`}>
          <Picture
            base={project.preview}
            widths={[800, 1600]}
            alt={project.previewAlt}
            width={project.previewSize[0]}
            height={project.previewSize[1]}
            sizes={featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            imgClassName={`block w-full object-cover object-left-top transition-[transform,filter] duration-700 group-hover:scale-[1.03] dark:brightness-[0.88] dark:group-hover:brightness-100 ${
              featured ? "aspect-[16/9] lg:aspect-auto lg:h-full" : "aspect-[16/9]"
            }`}
          />
          <span className="absolute left-3 top-3 rounded-md border border-line bg-bg/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted backdrop-blur">
            p_{String(index + 1).padStart(2, "0")}
            {featured ? <span className="ml-2 text-accent-ink">featured · ai</span> : null}
          </span>
        </div>

        <div className="relative z-20 flex flex-1 flex-col p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">{project.domain}</p>
          <h3 className={`mt-2 font-display font-medium tracking-tight text-fg ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.outcome}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <Link
              href={`/projects/${project.slug}/#live`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-px"
            >
              <Icon name="play" className="size-3.5" />
              Explore Live
              <span className="sr-only">: {project.title}</span>
            </Link>
            <Link
              href={`/projects/${project.slug}/`}
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent"
            >
              Case Study
              <span className="sr-only">: {project.title}</span>
              <Icon name="arrowRight" />
            </Link>
          </div>
        </div>
      </article>
    </Magnetic>
  );
}
