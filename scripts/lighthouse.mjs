// Mobile Lighthouse run against the exported site, using Playwright's Chromium.
// Usage: node scripts/lighthouse.mjs [route ...]   e.g. node scripts/lighthouse.mjs home projects/car-theft-analytics
import { chromium } from "playwright";
import lighthouse from "lighthouse";
import { serve } from "./serve.mjs";

const routes = (process.argv.slice(2).length ? process.argv.slice(2) : ["home"]).map((r) => (r === "home" ? "/" : `/${r}/`));
const server = await serve("out", 4176);
const browser = await chromium.launch({ args: ["--remote-debugging-port=9333"] });

for (const route of routes) {
  const { lhr } = await lighthouse(`http://localhost:4176${route}`, {
    port: 9333,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  console.log(`\n${route}`);
  for (const [k, v] of Object.entries(lhr.categories)) console.log(`  ${k}: ${Math.round(v.score * 100)}`);
  const a = lhr.audits;
  console.log(`  LCP ${a["largest-contentful-paint"].displayValue} · CLS ${a["cumulative-layout-shift"].displayValue} · TBT ${a["total-blocking-time"].displayValue}`);
  for (const audit of Object.values(a)) {
    if (audit.score !== null && audit.score < 0.9 && !["informative", "notApplicable", "manual"].includes(audit.scoreDisplayMode))
      console.log(`  - ${audit.id} (${audit.score}) ${audit.displayValue ?? ""}`);
  }
}

await browser.close();
server.close();
