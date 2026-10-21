# Harpal Sinh Jhala · Portfolio

Static Next.js site (App Router, `output: "export"`) for GitHub Pages or Vercel.

All copy lives in [`content/site.ts`](content/site.ts): profile, KPIs, projects and case studies, enterprise work, experience, skills, awards. Edit text there; components only render it.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. To check the production export:

```bash
npm run build
node scripts/serve.mjs
```

That serves `./out` on http://localhost:4173 with gzip, like GitHub Pages.

## Deploy to GitHub Pages

1. Create a public repo named `harpalsinhjhala13.github.io`.
2. Push this folder to its `main` branch.
3. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Every push to `main` runs `.github/workflows/deploy.yml` and publishes `out/` to https://harpalsinhjhala13.github.io.

Your existing project site at `/ai-sales-analytics/` keeps working alongside it.

**Vercel:** import the repo and keep the defaults. Vercel detects Next.js and serves the static export.

## Scripts

| Command | What it does |
|---|---|
| `npm run build` | `next build`, then `scripts/flatten-segments.mjs`, which copies Next 16's nested RSC prefetch files to the flat names the router requests. Without this step, static hosts return 404s on link prefetch. |
| `npm run images` | Rebuilds the AVIF/WebP photos and report previews from `source-images/*.jpg` and `public/projects/raw/*.png`. Both source folders are git-ignored, so only the optimised files are published. |
| `npm run previews` | Captures fresh 1600x900 screenshots of each Power BI report into `public/projects/raw/`. Run `npm run images` afterwards. |
| `npm run og` | Renders `public/og.png`, the 1200x630 social card. |
| `npm run shots` | Full-page screenshots at 375 / 768 / 1280 / 1920 in both themes. Fails on console errors or horizontal overflow. |
| `node scripts/check-embeds.mjs` | Confirms no Power BI or dashboard request fires before "Load live dashboard" is clicked, and that phones get the open-in-new-tab button. |
| `node scripts/lighthouse.mjs home projects/<slug>` | Mobile Lighthouse against the built site. |

`public/resume.pdf` is a copy of the CV with the phone number and Enhancv's embedded metadata removed. When you replace it, export a version without the phone number.
