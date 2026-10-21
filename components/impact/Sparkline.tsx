import { area, curveMonotoneX, line } from "d3-shape";
import type { Kpi } from "@/content/site";

const W = 120;
const H = 36;

// Decorative shapes only: no axes or values, so nothing reads as a real time series.
// Paths are computed at build time; the draw-in is a CSS scroll animation (.draw-line in globals.css).
const shapes: Record<"rise" | "flat", number[]> = {
  rise: [0.18, 0.22, 0.2, 0.3, 0.34, 0.31, 0.45, 0.52, 0.5, 0.66, 0.74, 0.9],
  flat: [0.55, 0.6, 0.52, 0.62, 0.58, 0.64, 0.57, 0.63, 0.6, 0.66, 0.61, 0.65],
};

export function Sparkline({ visual, id }: { visual: Kpi["visual"]; id: string }) {
  if (visual === "drop") return <TurnaroundBars />;

  const data = shapes[visual];
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - 2 - v * (H - 6);
  const path = line<number>().x((_, i) => x(i)).y(y).curve(curveMonotoneX)(data) ?? "";
  const fill = area<number>().x((_, i) => x(i)).y0(H).y1(y).curve(curveMonotoneX)(data) ?? "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-9 w-[120px] overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`g-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#g-${id})`} className="draw-fade" />
      <path d={path} pathLength={1} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeLinecap="round" className="draw-line" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r={2.4} fill="var(--accent)" className="draw-fade" />
    </svg>
  );
}

// The one KPI with real numbers behind it: 48 hours before, under 2 hours after.
function TurnaroundBars() {
  return (
    <div className="w-[140px] space-y-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-faint" aria-hidden>
      <div className="flex items-center gap-2">
        <span className="w-11">before</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel-2">
          <div className="draw-bar h-full w-full rounded-full bg-neg" />
        </div>
        <span className="tnum w-5 text-right">48h</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-11">after</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel-2">
          <div className="draw-bar h-full w-[4.2%] rounded-full bg-pos" />
        </div>
        <span className="tnum w-5 text-right">2h</span>
      </div>
    </div>
  );
}
