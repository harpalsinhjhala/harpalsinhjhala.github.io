import { profile, site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  const img = profile.aboutImage;
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="07" label="Contact" title="Let's talk about your data." id="contact-title" />
      <Reveal className="panel grid overflow-hidden md:grid-cols-[1fr_320px]">
        <div className="flex flex-col p-6 md:p-10">
          <p className="max-w-xl text-lg leading-relaxed text-muted">{profile.openTo}</p>
          <div className="mt-8 max-w-md">
            <CopyEmail email={profile.email} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent"
            >
              <Icon name="linkedin" />
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent"
            >
              <Icon name="github" />
              GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={site.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-px"
            >
              <Icon name="download" />
              Download CV
            </a>
          </div>
          <p className="mt-auto pt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{profile.location}</p>
        </div>
        <div className="relative hidden border-l border-line md:block">
          <Picture
            base={img.src}
            widths={[480, 800]}
            alt={img.alt}
            width={800}
            height={1000}
            sizes="320px"
            className="absolute inset-0"
            imgClassName="h-full w-full object-cover saturate-[0.85]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-panel/40 to-transparent" />
        </div>
      </Reveal>
    </section>
  );
}
