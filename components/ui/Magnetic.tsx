"use client";

import { useRef } from "react";

// Card drifts a few pixels toward the pointer and lights a glow at --mx/--my.
// Mouse only; touch and reduced motion get a static card (the transition is disabled in CSS).
export function Magnetic({ children, className = "", strength = 6 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * strength * 2;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * strength * 2;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--tx", `${dx}px`);
    el.style.setProperty("--ty", `${dy}px`);
  }

  function onLeave() {
    ref.current?.style.setProperty("--tx", "0px");
    ref.current?.style.setProperty("--ty", "0px");
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`magnetic ${className}`}>
      {children}
    </div>
  );
}
