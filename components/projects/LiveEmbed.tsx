"use client";

import { useRef, useState } from "react";
import type { Project } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";

// Click-to-load embed. Nothing from Power BI is requested until the button is pressed.
// Under 768px the iframe is never offered for Power BI; the preview links out to the full report instead.
export function LiveEmbed({ project }: { project: Project }) {
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const frameWrap = useRef<HTMLDivElement>(null);
  const { embed } = project;
  const isPbi = embed.kind === "powerbi";
  const openLabel = isPbi ? "Open in Power BI" : "Open full dashboard";

  function fullscreen() {
    const el = frameWrap.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  }

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className={`size-1.5 rounded-full ${state === "ready" ? "pulse-dot bg-pos" : "bg-line-strong"}`} aria-hidden />
          {state === "ready" ? "live" : state === "loading" ? "connecting" : "preview"} · {isPbi ? "power bi" : "d3 dashboard"}
        </p>
        <div className="flex items-center gap-2">
          {state !== "idle" ? (
            <button
              type="button"
              onClick={fullscreen}
              className="hidden items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:text-fg md:inline-flex"
            >
              <Icon name="expand" className="size-3.5" />
              Fullscreen
            </button>
          ) : null}
          <a
            href={embed.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:text-fg"
          >
            {openLabel}
            <Icon name="arrowUpRight" className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div ref={frameWrap} className="relative aspect-[16/9] bg-panel-2">
        {state === "idle" ? (
          <>
            <Picture
              base={project.preview}
              widths={[800, 1600]}
              alt={project.previewAlt}
              width={project.previewSize[0]}
              height={project.previewSize[1]}
              sizes="(min-width: 1152px) 1100px, 100vw"
              imgClassName="h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/30 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-center p-4 md:items-center">
              {/* Desktop and tablet: load in place */}
              <button
                type="button"
                onClick={() => setState("loading")}
                className="hidden items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-fg shadow-lg transition-transform hover:-translate-y-px md:inline-flex"
              >
                <Icon name="play" />
                Load live dashboard
              </button>
              {/* Phone: Power BI embeds are poor on small screens, so open the full report */}
              <a
                href={embed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-medium text-accent-fg md:hidden"
              >
                Open full dashboard
                <Icon name="arrowUpRight" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </>
        ) : (
          <>
            {state === "loading" ? (
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-3 p-4" aria-hidden>
                <div className="skeleton col-span-4 rounded-md" />
                <div className="skeleton rounded-md" />
                <div className="skeleton rounded-md" />
                <div className="skeleton rounded-md" />
                <div className="skeleton rounded-md" />
                <div className="skeleton col-span-3 rounded-md" />
                <div className="skeleton rounded-md" />
              </div>
            ) : null}
            <iframe
              title={embed.title}
              src={embed.url}
              onLoad={() => setState("ready")}
              allowFullScreen
              className={`absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-0"}`}
            />
            <span role="status" className="sr-only">
              {state === "ready" ? "Dashboard loaded" : "Loading dashboard"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
