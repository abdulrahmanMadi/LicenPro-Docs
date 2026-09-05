import fs from "fs";
import path from "path";

const dir = "src/app/docs/content/static-pages/fr";
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

const enPatterns = [
  /\b(for product owners|for end users|Jump to|See also|When to choose|At a glance|What to do|Meaning|Column|Create a|Your organization|Issue a|Grant access|Detailed|Typical|Think of|If every|If different|The app|The balance|Use this|Use global|Read balance|Missing |Wrong |Unknown |Not enough|Status is|Feature not|Wallet missing|Retry |Customer |Must be|Auto-detected|Attribute usage|Ledger entry|Top-ups are|Institution analytics|aggregates both|Event Driven|Automatic Retries|JSON Payload|Quick start|WPF integration|WinForms integration)\b/gi,
  /<h2>[^<]*(Guide|Workflow|Dashboard|Overview|Troubleshooting|Comparison)[^<]*<\/h2>/gi,
  /<h3>[^<]*(Step |Create |Issue |Open |Choose )[^<]*<\/h3>/gi,
];

for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), "utf8");
  const m = t.match(/export const HTML = "([\s\S]*)" as const;/);
  if (!m) {
    console.log(`${f}: NO MATCH`);
    continue;
  }
  const html = m[1].replace(/\\n/g, "\n").replace(/\\r/g, "");
  const hits = new Set();
  for (const p of enPatterns) {
    p.lastIndex = 0;
    let x;
    while ((x = p.exec(html)) !== null) hits.add(x[0]);
  }
  if (hits.size) console.log(`${f}:`, [...hits].join(" | "));
  else console.log(`${f}: OK`);
}
