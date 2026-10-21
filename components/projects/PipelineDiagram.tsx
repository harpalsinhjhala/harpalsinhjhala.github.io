import type { FlowNode } from "@/content/site";

// Boxes joined by animated dashed connectors. Horizontal from lg up, vertical below.
export function PipelineDiagram({ nodes, note }: { nodes: FlowNode[]; note?: string }) {
  return (
    <figure className="panel p-4 md:p-6">
      <ol className="flex flex-col items-stretch lg:flex-row">
        {nodes.map((n, i) => (
          <li key={n.label} className="flex flex-col items-stretch lg:min-w-0 lg:flex-1 lg:flex-row">
            <div className="relative rounded-lg border border-line-strong bg-panel-2 px-3.5 py-3 lg:min-w-0 lg:flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">stage_{i + 1}</p>
              <p className="mt-1 text-sm font-medium text-fg">{n.label}</p>
              {n.detail ? <p className="mt-0.5 font-mono text-[11px] text-muted">{n.detail}</p> : null}
            </div>
            {i < nodes.length - 1 ? (
              <>
                <svg aria-hidden viewBox="0 0 40 12" className="hidden h-3 w-8 shrink-0 self-center lg:block">
                  <line x1="0" y1="6" x2="34" y2="6" stroke="var(--accent)" strokeWidth="1.5" className="flow-line" />
                  <path d="M33 2l5 4-5 4" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                </svg>
                <svg aria-hidden viewBox="0 0 12 28" className="mx-auto h-7 w-3 lg:hidden">
                  <line x1="6" y1="0" x2="6" y2="22" stroke="var(--accent)" strokeWidth="1.5" className="flow-line" />
                  <path d="M2 21l4 5 4-5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                </svg>
              </>
            ) : null}
          </li>
        ))}
      </ol>
      {note ? (
        <figcaption className="mt-4 flex items-center gap-2 border-t border-dashed border-line pt-4 font-mono text-[11px] text-muted">
          <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent-ink">ai</span>
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}
