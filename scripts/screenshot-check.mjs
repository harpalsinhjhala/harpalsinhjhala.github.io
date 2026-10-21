// Full-page screenshots of the exported site at the four review widths, in both themes.
// Usage: node scripts/screenshot-check.mjs [path] [dark|light]
import { chromium } from "playwright";
import fs from "node:fs";
import { serve } from "./serve.mjs";

const arg = process.argv[2] ?? "home";
const route = arg === "home" ? "/" : `/${arg.replace(/^\/+|\/+$/g, "")}/`;
const themes = process.argv[3] ? [process.argv[3]] : ["dark", "light"];
const widths = [375, 768, 1280, 1920];
const name = route === "/" ? "home" : route.replace(/\//g, "_").replace(/^_|_$/g, "");

fs.mkdirSync("shots", { recursive: true });
const server = await serve("out", 4174);
const browser = await chromium.launch();
const errors = [];

for (const theme of themes) {
  for (const w of widths) {
    // Reduced motion: scroll-driven reveals do not run in full-page captures, so render every section statically.
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && errors.push(`${w} ${theme}: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`${w} ${theme}: ${e.message}`));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${w} ${theme}: ${r.status()} ${r.url()}`));
    await page.goto(`http://localhost:4174${route}`, { waitUntil: "networkidle" });
    // Scroll through so in-view reveals and counters run before the capture.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) errors.push(`${w} ${theme}: horizontal overflow ${overflow}px`);
    await page.screenshot({ path: `shots/${name}-${theme}-${w}.png`, fullPage: true });
    await ctx.close();
  }
}

await browser.close();
server.close();
console.log(errors.length ? errors.join("\n") : "no console errors, no horizontal overflow");
