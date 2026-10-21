import { hierarchy, pack, type HierarchyCircularNode } from "d3-hierarchy";
import { fitLabel, groups, maxCount, short, type Group } from "./skillsData";

// Desktop skills layout: the core group (data engineering) sits in the centre and the other groups
// ring it closely, each wired to the core with a flowing data line. Group area scales with skill
// count and every skill bubble has equal weight. Laid out at build time; no client JS.

type Leaf = { name: string };

const MAX_D = 340;
const GAP = 34; // space between the core and each satellite, enough for the curved group label
const CORE = "data_engineering";
// Clockwise from the top.
const RING: { id: string; angle: number }[] = [
  { id: "bi_visualisation", angle: -90 },
  { id: "ai_automation", angle: -18 },
  { id: "dim_domain", angle: 54 },
  { id: "cloud", angle: 126 },
  { id: "business", angle: 198 },
];

function packGroup(g: Group) {
  const d = MAX_D * Math.sqrt(g.items.length / maxCount);
  const root = hierarchy<{ children?: Leaf[] } & Partial<Leaf>>({ children: g.items.map((name) => ({ name })) }).count();
  const laid = pack<{ children?: Leaf[] } & Partial<Leaf>>().size([d, d]).padding(4)(root);
  return { r: d / 2, leaves: laid.leaves() as HierarchyCircularNode<Leaf>[] };
}

const byId = new Map(groups.map((g) => [g.id, g]));
const core = { g: byId.get(CORE)!, cx: 0, cy: 0, ...packGroup(byId.get(CORE)!) };
const satellites = RING.map(({ id, angle }) => {
  const g = byId.get(id)!;
  const p = packGroup(g);
  const dist = core.r + p.r + GAP;
  const a = (angle * Math.PI) / 180;
  return { g, cx: dist * Math.cos(a), cy: dist * Math.sin(a), ...p };
});
const all = [core, ...satellites];

// Tight viewBox around everything, with room for the curved labels.
const M = 30;
const minX = Math.min(...all.map((c) => c.cx - c.r)) - M;
const maxX = Math.max(...all.map((c) => c.cx + c.r)) + M;
const minY = Math.min(...all.map((c) => c.cy - c.r)) - M;
const maxY = Math.max(...all.map((c) => c.cy + c.r)) + M;

const FONT = Math.min(...all.flatMap((c) => c.leaves.map((l) => fitLabel(short[l.data.name] ?? l.data.name, l.r).size)));

function GroupBubble({ c, isCore }: { c: (typeof all)[number]; isCore?: boolean }) {
  const lh = FONT * 1.18;
  const arcR = c.r + 12;
  const arc = `M ${c.cx - arcR} ${c.cy} A ${arcR} ${arcR} 0 0 1 ${c.cx + arcR} ${c.cy}`;
  const domain = c.g.domain;
  return (
    <g>
      <circle cx={c.cx} cy={c.cy} r={c.r + 4} fill="none" className={isCore ? "stroke-accent/40" : "stroke-line"} strokeDasharray="2 5" />
      <circle
        cx={c.cx}
        cy={c.cy}
        r={c.r}
        strokeWidth={isCore ? 1.5 : 1}
        className={domain ? "fill-accent-soft stroke-accent/50" : isCore ? "fill-panel stroke-accent/70" : "fill-panel stroke-line-strong"}
      />
      <path id={`orbit-${c.g.id}`} d={arc} fill="none" />
      <text className={`font-mono text-[11px] uppercase tracking-[0.18em] ${domain || isCore ? "fill-accent-ink" : "fill-muted"}`}>
        <textPath href={`#orbit-${c.g.id}`} startOffset="50%" textAnchor="middle">
          {isCore ? "core · " : ""}
          {c.g.label} · n={c.g.items.length}
        </textPath>
      </text>
      {c.leaves.map((leaf) => {
        const { lines } = fitLabel(short[leaf.data.name] ?? leaf.data.name, leaf.r);
        const x = leaf.x - c.r + c.cx;
        const y = leaf.y - c.r + c.cy;
        return (
          <g key={leaf.data.name} className="pack-leaf">
            <title>{`${leaf.data.name} · ${c.g.label}`}</title>
            <circle cx={x} cy={y} r={leaf.r} strokeWidth={1} className={domain ? "fill-accent/15 stroke-accent/60" : "fill-panel-2 stroke-accent/35"} />
            <text textAnchor="middle" className="fill-fg font-sans font-medium" style={{ fontSize: FONT }}>
              {lines.map((l, k) => (
                <tspan key={k} x={x} y={y + (k - (lines.length - 1) / 2) * lh + FONT * 0.36}>
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function SkillsOrbit() {
  return (
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} className="h-auto w-full overflow-visible" aria-hidden>
      {/* Connectors from the core to each satellite, data flowing outward */}
      {satellites.map((s) => {
        const len = Math.hypot(s.cx, s.cy);
        const ux = s.cx / len;
        const uy = s.cy / len;
        return (
          <line
            key={s.g.id}
            x1={ux * (core.r + 5)}
            y1={uy * (core.r + 5)}
            x2={s.cx - ux * (s.r + 5)}
            y2={s.cy - uy * (s.r + 5)}
            stroke="var(--accent)"
            strokeOpacity={0.7}
            strokeWidth={1.5}
            className="flow-line"
          />
        );
      })}
      <GroupBubble c={core} isCore />
      {satellites.map((s) => (
        <GroupBubble key={s.g.id} c={s} />
      ))}
    </svg>
  );
}
