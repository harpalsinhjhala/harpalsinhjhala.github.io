// Renders the 1200x630 Open Graph card to public/og.png. Re-run after changing the headline copy.
import { chromium } from "playwright";
import fs from "node:fs";

const photo = fs.readFileSync("public/images/hero-480.webp").toString("base64");

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&family=Geist+Mono:wght@400;500&family=Geist:wght@400&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0a0e14;color:#e6eaf0;font-family:Geist,sans-serif;position:relative;overflow:hidden;
    background-image:radial-gradient(rgb(148 160 178 / .09) 1px,transparent 1px);background-size:22px 22px}
  .mono{font-family:'Geist Mono',monospace;letter-spacing:.16em;text-transform:uppercase}
  .wrap{position:absolute;inset:56px 64px;display:flex;gap:56px}
  .left{flex:1;display:flex;flex-direction:column}
  .chip{display:inline-flex;align-items:center;gap:10px;font-size:15px;color:#94a0b2;border:1px solid #1f2836;border-radius:999px;padding:8px 16px;width:fit-content;background:#111823}
  .dot{width:9px;height:9px;border-radius:9px;background:#34d399}
  h1{font-family:'Space Grotesk';font-weight:500;font-size:78px;line-height:1;letter-spacing:-.03em;margin-top:34px}
  .title{margin-top:22px;font-size:20px;color:#f2c811}
  .kpis{margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #1f2836;border-radius:14px;overflow:hidden;background:#1f2836;gap:1px}
  .kpi{background:#111823;padding:18px 20px}
  .kpi b{font-family:'Space Grotesk';font-weight:500;font-size:44px;display:block;font-variant-numeric:tabular-nums}
  .kpi span{font-size:15px;color:#94a0b2}
  .photo{width:330px;border:1px solid #1f2836;border-radius:16px;background:#111823;padding:10px;align-self:stretch;display:flex;flex-direction:column}
  .photo .bar{display:flex;justify-content:space-between;font-size:12px;color:#808b9e;padding:4px 6px 10px}
  .photo img{flex:1;width:100%;object-fit:cover;border-radius:10px;filter:saturate(.85)}
  .accent{position:absolute;left:0;bottom:0;height:6px;width:100%;background:linear-gradient(90deg,#f2c811,#f2c811 30%,transparent)}
</style></head><body>
<div class="wrap">
  <div class="left">
    <div class="chip mono" style="letter-spacing:.06em;text-transform:none"><span class="dot"></span>Ahmedabad, India · Open to UAE relocation</div>
    <h1>Harpal Sinh<br>Jhala</h1>
    <div class="title mono">AI Driven Analytics &amp; Data Engineer · BI</div>
    <div class="kpis">
      <div class="kpi"><b>90%+</b><span>reporting time cut</span></div>
      <div class="kpi"><b>14</b><span>C-suite reports, QIC</span></div>
      <div class="kpi"><b>30%</b><span>revenue found in NPAs</span></div>
    </div>
  </div>
  <div class="photo"><div class="bar mono"><span style="color:#94a0b2">● live</span><span>sql · power bi · tableau</span></div>
    <img src="data:image/webp;base64,${photo}"></div>
</div>
<div class="accent"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("wrote public/og.png");
