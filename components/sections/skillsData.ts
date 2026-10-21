import { domains, skills } from "@/content/site";

// Data and label fitting shared by the skills grid (SkillsPack) and the desktop layout (SkillsOrbit).

export type Group = { id: string; label: string; items: string[]; domain?: boolean };

export const groups: Group[] = [
  ...skills.map((s) => ({ id: s.table, label: s.label.replace(" and ", " & "), items: s.columns })),
  { id: "dim_domain", label: "Domains", items: domains, domain: true },
];

export const maxCount = Math.max(...groups.map((g) => g.items.length));

// Shorter names for the bubbles only; the full name stays in the tooltip and the screen-reader list.
export const short: Record<string, string> = {
  "AI assisted analytics engineering": "AI-assisted analytics",
  "Financial and MIS Reporting": "Financial & MIS reporting",
  "Star Schema Modelling": "Star schema",
  "ETL/ELT Pipelines": "ETL / ELT",
};

// Pick the line break that gives the largest font that still fits inside the circle.
export function fitLabel(label: string, r: number, max = 13.5) {
  const words = label.split(" ");
  let best = { lines: [label], size: 0 };
  for (let n = 1; n <= Math.min(3, words.length); n++) {
    const per = Math.ceil(label.length / n);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      if (cur && (cur + " " + w).length > per && lines.length < n - 1) {
        lines.push(cur);
        cur = w;
      } else cur = cur ? `${cur} ${w}` : w;
    }
    lines.push(cur);
    const longest = Math.max(...lines.map((l) => l.length));
    const size = Math.min(max, (2 * r * 0.86) / (longest * 0.55), (2 * r * 0.7) / (lines.length * 1.2));
    if (size > best.size) best = { lines, size };
  }
  return best;
}
