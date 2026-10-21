// Verifies the click-to-load rule: no request to the embed host until "Load live dashboard" is pressed,
// and on a 375px phone the iframe is never offered.
import { chromium } from "playwright";
import { serve } from "./serve.mjs";

const slugs = ["ai-sales-analytics", "real-estate-brokerage", "stock-brokerage", "car-theft-analytics", "hr-analytics"];
const server = await serve("out", 4179);
const browser = await chromium.launch();
let ok = true;

for (const slug of slugs) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const hits = [];
  page.on("request", (r) => /app\.powerbi\.com|github\.io\/ai-sales/.test(r.url()) && hits.push(r.url()));
  await page.goto(`http://localhost:4179/projects/${slug}/`, { waitUntil: "networkidle" });
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(1500);
  const before = hits.length;
  await page.getByRole("button", { name: "Load live dashboard" }).click();
  await page.waitForTimeout(4000);
  const iframes = await page.locator("iframe").count();
  console.log(`${slug}: requests before click=${before}, after click=${hits.length}, iframes=${iframes}`);
  if (before !== 0 || hits.length === 0 || iframes !== 1) ok = false;
  await page.close();

  const phone = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true });
  const phoneHits = [];
  phone.on("request", (r) => /app\.powerbi\.com|github\.io\/ai-sales/.test(r.url()) && phoneHits.push(r.url()));
  await phone.goto(`http://localhost:4179/projects/${slug}/`, { waitUntil: "networkidle" });
  const loadVisible = await phone.getByRole("button", { name: "Load live dashboard" }).isVisible();
  const openVisible = await phone.getByRole("link", { name: /Open full dashboard/ }).first().isVisible();
  console.log(`  375px: load button visible=${loadVisible}, open link visible=${openVisible}, embed requests=${phoneHits.length}`);
  if (loadVisible || !openVisible || phoneHits.length) ok = false;
  await phone.close();
}

await browser.close();
server.close();
console.log(ok ? "PASS" : "FAIL");
