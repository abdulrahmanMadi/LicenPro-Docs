import fs from "fs";
import path from "path";

const frDir = "src/app/docs/content/static-pages/fr";
const files = [
  "concurrent-license.ts",
  "credit-based-license.ts",
  "floating-license.ts",
  "node-locked-license.ts",
  "perpetual-license.ts",
  "quick-start-before.ts",
  "sdk-wpf.ts",
  "sessions-activations.ts",
  "subscription-license.ts",
  "trial-license.ts",
  "usage-based-license.ts",
  "webhooks.ts",
];

const suspicious = [
  /\b(the|and|with|when|your|you should|you can|choose|create|issue|grant|open|select|missing|wrong|retry|customer|product owner guide|end user guide|jump to|see also|when to choose|at a glance|for product owners|for end users)\b/i,
];

function extract(file) {
  const t = fs.readFileSync(path.join(frDir, file), "utf8");
  const m = t.match(/export const HTML = "([\s\S]*)" as const;/);
  return m ? m[1].replace(/\\n/g, "\n").replace(/\\r/g, "") : "";
}

for (const f of files) {
  const html = extract(f);
  const h1 = html.match(/<h1>([^<]+)<\/h1>/)?.[1] ?? "?";
  const issues = [];
  for (const p of [
    /<p[^>]*>([^<]{20,200})<\/p>/g,
    /<li>([^<]{20,200})<\/li>/g,
  ]) {
    let m;
    while ((m = p.exec(html)) !== null) {
      const text = m[1].replace(/<[^>]+>/g, "").trim();
      if (/^(Licenses|Generate|Create|Open|Choose|When|The|Your|If|Use|Must|Missing|Wrong|Retry|Customer|Product owner|End user)/i.test(text)) {
        issues.push(text.slice(0, 100));
      }
    }
  }
  console.log(`${f} h1="${h1}"${issues.length ? " ISSUES: " + [...new Set(issues)].slice(0,3).join(" | ") : " OK"}`);
}
