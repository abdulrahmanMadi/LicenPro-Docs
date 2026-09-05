import fs from "fs";

const t = fs.readFileSync("src/app/docs/content/static-pages/fr/quick-start-before.ts", "utf8");
const m = t.match(/export const HTML = "([\s\S]*)" as const;/);
const h = m[1].replace(/\\n/g, "\n");
for (const p of ["at a glance", "Typical", "En un coup", "Typique", "Guide sections", "Jump to"]) {
  const i = h.toLowerCase().indexOf(p.toLowerCase());
  if (i >= 0) console.log(p, "->", h.slice(Math.max(0, i - 80), i + p.length + 80));
}
