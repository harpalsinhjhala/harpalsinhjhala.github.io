// Splits a full-page screenshot into viewport-height tiles for review: node scripts/crop-shot.mjs shots/x.png 1100
import sharp from "sharp";
const [file, tileH = "1100"] = process.argv.slice(2);
const meta = await sharp(file).metadata();
const h = Number(tileH);
for (let top = 0, i = 0; top < meta.height; top += h, i++) {
  const height = Math.min(h, meta.height - top);
  await sharp(file).extract({ left: 0, top, width: meta.width, height }).toFile(file.replace(".png", `.t${i}.png`));
}
console.log(Math.ceil(meta.height / h), "tiles");
