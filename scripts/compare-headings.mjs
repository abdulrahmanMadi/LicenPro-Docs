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

const files = process.argv.slice(2);
for (const f of files) {
  const en = extractHtml(path.join(enDir, f));
  const fr = extractHtml(path.join(frDir, f));
  if (!en || !fr) {
    console.log(`\n=== ${f} === MISSING`);
    continue;
  }
  const enHeadings = [...en.matchAll(/<h[1-4][^>]*>([^<]+)<\/h[1-4]>/g)].map((m) => m[1].trim());
  const frHeadings = [...fr.matchAll(/<h[1-4][^>]*>([^<]+)<\/h[1-4]>/g)].map((m) => m[1].trim());
  console.log(`\n=== ${f} ===`);
  console.log("EN h:", enHeadings.join(" | "));
  console.log("FR h:", frHeadings.join(" | "));
  const enTh = [...en.matchAll(/<th>([^<]+)<\/th>/g)].map((m) => m[1].trim());
  const frTh = [...fr.matchAll(/<th>([^<]+)<\/th>/g)].map((m) => m[1].trim());
  const untranslatedTh = enTh.filter((h, i) => frTh[i] === h);
  if (untranslatedTh.length) console.log("Same th:", untranslatedTh.join(" | "));
  const enCallouts = [...en.matchAll(/callout-title">([^<]+)</g)].map((m) => m[1].trim());
  const frCallouts = [...fr.matchAll(/callout-title">([^<]+)</g)].map((m) => m[1].trim());
  const sameCallouts = enCallouts.filter((c, i) => frCallouts[i] === c);
  if (sameCallouts.length) console.log("Same callout:", sameCallouts.join(" | "));
}
