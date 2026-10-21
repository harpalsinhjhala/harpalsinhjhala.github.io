import { hierarchy, pack, type HierarchyCircularNode } from "d3-hierarchy";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillsOrbit } from "./SkillsOrbit";
import { fitLabel, groups, maxCount, short, type Group } from "./skillsData";

// Skills as circle-packing small multiples, laid out at build time (no client JS).
// Each group is a circle whose area is proportional to its skill count; every skill inside gets equal
// weight, so nothing reads as a proficiency score. Identity comes from direct labels; colour only
// separates skill groups (neutral) from domains (accent).

type Leaf = { name: string };

const VIEW = 372; // every group shares one viewBox, so all circles render at the same scale
const MAX_D = 346;

// Biggest first; domains, the shared dimension, close the grid.
const ordered = [...groups.filter((g) => !g.domain).sort((a, b) => b.items.length - a.items.length), ...groups.filter((g) => g.domain)];

function layoutGroup(g: Group) {
  const d = MAX_D * Math.sqrt(g.items.length / maxCount);
  const root = hierarchy<{ children?: Leaf[] } & Partial<Leaf>>({ children: g.items.map((name) => ({ name })) }).count();
  const laid = pack<{ children?: Leaf[] } & Partial<Leaf>>().size([d, d]).padding(4)(root);
  const off = (VIEW - d) / 2;
  return { d, off, leaves: laid.leaves() as HierarchyCircularNode<Leaf>[] };
}

const layouts = new Map(ordered.map((g) => [g.id, layoutGroup(g)]));
// One font size across every bubble in every group: the largest that fits the hardest label.
const FONT = Math.min(
  ...ordered.flatMap((g) => layouts.get(g.id)!.leaves.map((l) => fitLabel(short[l.data.name] ?? l.data.name, l.r).size)),
);

function GroupCircle({ g }: { g: Group }) {
  const { d, off, leaves } = layouts.get(g.id)!;
  const c = VIEW / 2;
  const r = d / 2;
  const arcR = r + 10;
  const arc = `M ${c - arcR} ${c} A ${arcR} ${arcR} 0 0 1 ${c + arcR} ${c}`;
  const lh = FONT * 1.18;
  return (
    <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="h-auto w-full overflow-visible" aria-hidden>
      <circle cx={c} cy={c} r={r + 4} fill="none" className="stroke-line" strokeDasharray="2 5" />
      <circle cx={c} cy={c} r={r} strokeWidth={1} className={g.domain ? "fill-accent-soft stroke-accent/50" : "fill-panel stroke-line-strong"} />
      <path id={`arc-${g.id}`} d={arc} fill="none" />
      <text className={`font-mono text-[11px] uppercase tracking-[0.18em] ${g.domain ? "fill-accent-ink" : "fill-muted"}`}>
        <textPath href={`#arc-${g.id}`} startOffset="50%" textAnchor="middle">
          {g.label} · n={g.items.length}
        </textPath>
      </text>
      {leaves.map((leaf) => {
        const { lines } = fitLabel(short[leaf.data.name] ?? leaf.data.name, leaf.r);
        const x = leaf.x + off;
        const y = leaf.y + off;
        return (
          <g key={leaf.data.name} className="pack-leaf">
            <title>{`${leaf.data.name} · ${g.label}`}</title>
            <circle cx={x} cy={y} r={leaf.r} strokeWidth={1} className={g.domain ? "fill-accent/15 stroke-accent/60" : "fill-panel-2 stroke-accent/35"} />
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
    </svg>
  );
}

export function SkillsPack() {
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <SectionLabel index="01" label="Skills" title="The stack, packed." id="skills-title" />

      <p className="-mt-4 mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:-mt-6">
        <span>
          {groups.length} groups · {total} skills
        </span>
        <span className="normal-case tracking-normal">Circle area shows how many skills a group holds.</span>
      </p>

      {/* Screen readers and text search get the plain list. */}
      <div className="sr-only">
        {groups.map((g) => (
          <div key={g.id}>
            <h3>{g.label}</h3>
            <ul>
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop: the core group in the centre with the others around it. */}
      <div className="reveal mx-auto hidden max-w-[1000px] lg:block" aria-hidden>
        <SkillsOrbit />
      </div>

      {/* Tablet and phone: one circle per group, big enough to read. */}
      <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:hidden" aria-hidden>
        {ordered.map((g) => (
          <li key={g.id} className="reveal mx-auto w-full max-w-[372px]">
            <GroupCircle g={g} />
          </li>
        ))}
      </ul>
    </section>
  );
}
