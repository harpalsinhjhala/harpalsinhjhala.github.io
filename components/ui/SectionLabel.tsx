export function SectionLabel({ index, label, title, id }: { index: string; label: string; title: string; id?: string }) {
  return (
    <header className="mb-8 md:mb-12">
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span className="text-accent-ink">{index}</span>
        <span aria-hidden className="text-faint">/</span>
        <span>{label}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </p>
      <h2 id={id} className="mt-4 max-w-3xl font-display text-3xl font-medium tracking-tight text-fg md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
    </header>
  );
}
