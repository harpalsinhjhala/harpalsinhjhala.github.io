import { site } from "@/content/site";

export function Footer() {
  const year = site.lastUpdated.slice(0, 4);
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-6">
        <p>Built by HJ.</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Last updated <time dateTime={year}>{year}</time>
        </p>
      </div>
    </footer>
  );
}
