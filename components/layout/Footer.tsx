import { site } from "@/content/site";

export function Footer() {
  const updated = new Date(site.lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-6">
        <p>Built with Next.js and Claude Code. Designed and directed by Harpal Sinh Jhala.</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Last updated <time dateTime={site.lastUpdated}>{updated}</time>
        </p>
      </div>
    </footer>
  );
}
