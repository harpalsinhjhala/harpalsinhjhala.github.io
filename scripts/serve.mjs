// Minimal static server for the exported site in ./out (used by the screenshot and OG scripts).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
};

export function serve(root = "out", port = 4173) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(root, p);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "content-type": types[".html"] });
      return fs.createReadStream(path.join(root, "404.html")).pipe(res);
    }
    // Mirror GitHub Pages: gzip text assets and a 10 minute cache.
    const type = types[path.extname(file)] ?? "application/octet-stream";
    const gzip = /text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "");
    res.writeHead(200, { "content-type": type, "cache-control": "max-age=600", ...(gzip ? { "content-encoding": "gzip" } : {}) });
    const stream = fs.createReadStream(file);
    (gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}` || process.argv[1]?.endsWith("serve.mjs")) {
  const port = Number(process.env.PORT ?? 4173);
  serve("out", port).then(() => console.log(`serving ./out on http://localhost:${port}`));
}
