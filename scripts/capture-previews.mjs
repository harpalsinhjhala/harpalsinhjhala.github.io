// Captures a 1600x900 screenshot of each public Power BI report for the project preview cards.
import { chromium } from "playwright";
import fs from "node:fs";

const reports = {
  "real-estate": "https://app.powerbi.com/view?r=eyJrIjoiMWY3ZDQ2Y2UtYzE3ZC00ZDMzLWI5MzgtMjkzZjU0NjA0ZmI3IiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
  "stock-brokerage": "https://app.powerbi.com/view?r=eyJrIjoiY2E4ZDYzMmItODU5NS00Nzk4LTg4NWItNjFjODMyOWU0MTgwIiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
  "car-theft": "https://app.powerbi.com/view?r=eyJrIjoiZjk1Zjk0NWUtMmUxYS00OGY4LTkxMmEtNGRjNzdjYmJjM2JhIiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
  "hr-analytics": "https://app.powerbi.com/view?r=eyJrIjoiZmQ4NjA5NDQtOTE5NS00NzlhLWJjZDAtY2Q5NTEyMmUyMThlIiwidCI6IjQ5ZTI0NzNlLWI1OWQtNGE0ZS05NmU5LTdmYjQ3NDY3MjNhMyJ9",
};

const only = process.argv.slice(2);
fs.mkdirSync("public/projects/raw", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
for (const [slug, url] of Object.entries(reports)) {
  if (only.length && !only.includes(slug)) continue;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
    await page.waitForTimeout(25_000);
    await page.screenshot({ path: `public/projects/raw/${slug}-pbi.png` });
    console.log("captured", slug);
  } catch (err) {
    console.log("FAILED", slug, err.message.split("\n")[0]);
  }
}
await browser.close();
