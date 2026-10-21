// Next 16 static export writes RSC segment files as nested folders (__next.projects/$d$slug/__PAGE__.txt),
// but the client router requests them flat (__next.projects.$d$slug.__PAGE__.txt). Static hosts like
// GitHub Pages cannot rewrite, so copy each nested file to its flat name. Runs after `next build`.
import fs from "node:fs";
import path from "node:path";

const root = "out";
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) flatten(full, dir, entry.name);
    else walk(full);
  }
}

function flatten(segDir, parent, prefix) {
  for (const entry of fs.readdirSync(segDir, { withFileTypes: true })) {
    const full = path.join(segDir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(full, parent, name);
    else {
      fs.copyFileSync(full, path.join(parent, name));
      copied++;
    }
  }
}

walk(root);
console.log(`flattened ${copied} segment files`);
