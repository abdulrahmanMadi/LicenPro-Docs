import fs from "fs";
import path from "path";

const frDir = "src/app/docs/content/static-pages/fr";
const enDir = "src/app/docs/content/static-pages/en";

function extractHtml(file) {
  const t = fs.readFileSync(file, "utf8");
  const m = t.match(/export const HTML = "([\s\S]*)" as const;/);
  if (!m) return null;
  return m[1].replace(/\\n/g, "\n").replace(/\\r/g, "");
}

function getBlocks(html) {
  const blocks = [];
  for (const tag of ["p", "li", "td", "span"]) {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
    let m;
    while ((m = re.exec(html)) !== null) {
      const text = m[1]
        .replace(/<[^>]+>/g, "")
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
      if (text.length > 20 && /[A-Za-z]{4,}/.test(text)) blocks.push(text);
    }
  }
  return blocks;
}

const files = process.argv.slice(2);
for (const f of files) {
  const en = extractHtml(path.join(enDir, f));
  const fr = extractHtml(path.join(frDir, f));
  if (!en || !fr) continue;
  const enSet = new Set(getBlocks(en));
  const same = getBlocks(fr).filter((b) => enSet.has(b));
  if (same.length) {
    console.log(`\n=== ${f} (${same.length} identical blocks) ===`);
    same.slice(0, 15).forEach((s) => console.log("- " + s.slice(0, 120) + (s.length > 120 ? "..." : "")));
    if (same.length > 15) console.log(`... and ${same.length - 15} more`);
  } else {
    console.log(`${f}: no identical prose blocks`);
  }
}
