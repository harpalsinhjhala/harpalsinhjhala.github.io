import { projects } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="02" label="Projects" title="Live dashboards you can open and use." id="projects-title" />
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} className={p.featured ? "md:col-span-2" : ""}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
