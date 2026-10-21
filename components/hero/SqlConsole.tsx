"use client";

import { useEffect, useState } from "react";
import { sqlImpact } from "@/content/site";

// Types the query, then reveals result rows one by one. Space for every line is reserved up front, so nothing shifts.
export function SqlConsole() {
  const { query, rows } = sqlImpact;
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(query.length);
      setShown(rows.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    let r = 0;
    const revealRow = () => {
      r += 1;
      setShown(r);
      if (r < rows.length) timers.push(setTimeout(revealRow, 160));
    };
    const typeChar = () => {
      i += 1;
      setTyped(i);
      if (i < query.length) timers.push(setTimeout(typeChar, 28));
      else timers.push(setTimeout(revealRow, 320));
    };
    timers.push(setTimeout(typeChar, 500));
    return () => timers.forEach(clearTimeout);
  }, [query.length, rows.length]);

  const done = typed >= query.length;
  const finished = shown >= rows.length;

  return (
    <div className="panel overflow-hidden font-mono text-[12px] leading-relaxed sm:text-[13px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-faint">query.sql · impact_db</span>
      </div>

      {/* Screen readers get the finished result as a real table. */}
      <table className="sr-only">
        <caption>Career impact, as a query result</caption>
        <thead>
          <tr>
            <th scope="col">metric</th>
            <th scope="col">value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.metric}>
              <td>{r.metric}</td>
              <td>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-hidden className="px-4 pb-4 pt-3.5">
        <div className="relative">
          <p className="invisible break-words">
            <span>&gt; </span>
            {query}
          </p>
          <p className="absolute inset-0 break-words text-fg">
            <span className="text-accent-ink">&gt; </span>
            <SqlHighlight text={query.slice(0, typed)} />
            {!done ? <span className="caret ml-px" /> : null}
          </p>
        </div>

        <div className="mt-4 overflow-hidden rounded-md border border-line">
          <div className="grid grid-cols-[1fr_auto] border-b border-line bg-panel-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-faint">
            <span>metric</span>
            <span>value</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.metric}
              className="grid grid-cols-[1fr_auto] gap-4 border-b border-line px-3 py-1.5 transition-[opacity,transform] duration-300 last:border-b-0"
              style={{ opacity: i < shown ? 1 : 0, transform: i < shown ? "none" : "translateY(4px)" }}
            >
              <span className="truncate text-muted">{r.metric}</span>
              <span className="tnum text-right font-medium text-pos">{r.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-faint transition-opacity duration-300" style={{ opacity: finished ? 1 : 0 }}>
          {rows.length} rows returned
          <span className="caret ml-2" style={{ height: "0.95em", width: "0.45em" }} />
        </p>
      </div>
    </div>
  );
}

const KEYWORDS = new Set(["SELECT", "FROM", "ORDER", "BY", "DESC"]);

function SqlHighlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+|,|;)/).map((tok, i) =>
        KEYWORDS.has(tok) ? (
          <span key={i} className="text-accent-ink">
            {tok}
          </span>
        ) : (
          <span key={i}>{tok}</span>
        ),
      )}
    </>
  );
}
