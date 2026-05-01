import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const builtIndex = resolve(dist, "index.source.html");
const actionIndex = resolve(dist, "index.html");

if (existsSync(builtIndex)) {
  cpSync(builtIndex, actionIndex, { force: true });
}

const copies = [
  ["assets", "assets"],
  ["downloads", "downloads"],
  ["favicon.svg", "favicon.svg"],
  ["portrait-hero.jpg", "portrait-hero.jpg"],
  ["portrait-original.png", "portrait-original.png"],
];

for (const [from, to] of copies) {
  const source = resolve(dist, from);
  const target = resolve(root, to);

  if (!existsSync(source)) {
    continue;
  }

  mkdirSync(resolve(target, ".."), { recursive: true });
  cpSync(source, target, { recursive: true, force: true });
}
