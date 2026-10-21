// Turns the source photos and report screenshots into AVIF + WebP at a few widths.
// Output names: <base>-<width>.avif / .webp, referenced by components/Picture.tsx.
import sharp from "sharp";
import fs from "node:fs";

const jobs = [
  // Photos: portrait 4:5 crop.
  { src: "source-images/hero.jpg", out: "public/images/hero", widths: [480, 600, 800], crop: { ratio: 4 / 5, top: 0 } },
  { src: "source-images/about.jpg", out: "public/images/about", widths: [480, 800], crop: { ratio: 4 / 5, top: 0.3 } },
  // Report previews. Power BI captures have an empty band at the bottom, so keep the top 740px.
  { src: "public/projects/raw/ai-sales.png", out: "public/projects/ai-sales", widths: [800, 1600], crop: { ratio: 16 / 9, top: 0 } },
  { src: "public/projects/raw/real-estate-pbi.png", out: "public/projects/real-estate", widths: [800, 1600], extract: { left: 0, top: 0, width: 1600, height: 740 } },
  { src: "public/projects/raw/stock-brokerage-pbi.png", out: "public/projects/stock-brokerage", widths: [800, 1600], extract: { left: 0, top: 0, width: 1600, height: 740 } },
  { src: "public/projects/raw/car-1-overview.png", out: "public/projects/car-theft", widths: [800, 1600] },
  { src: "public/projects/raw/hr-analytics-pbi.png", out: "public/projects/hr-analytics", widths: [800, 1600], extract: { left: 0, top: 0, width: 1600, height: 740 } },
];

for (const job of jobs) {
  if (!fs.existsSync(job.src)) {
    console.log("missing", job.src);
    continue;
  }
  let base = sharp(job.src).rotate();
  const meta = await base.metadata();
  if (job.extract) base = base.extract(job.extract);
  if (job.crop) {
    const width = meta.width;
    const height = Math.min(meta.height, Math.round(width / job.crop.ratio));
    const top = Math.min(meta.height - height, Math.round(meta.height * job.crop.top));
    base = base.extract({ left: 0, top, width, height });
  }
  const buf = await base.toBuffer();
  for (const w of job.widths) {
    const img = sharp(buf).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 50, effort: 6 }).toFile(`${job.out}-${w}.avif`);
    await img.clone().webp({ quality: 74 }).toFile(`${job.out}-${w}.webp`);
  }
  const m = await sharp(buf).metadata();
  console.log("ok", job.out, `${m.width}x${m.height}`);
}
