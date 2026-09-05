import fs from "fs";
import path from "path";

const base = path.resolve("src/app/docs/content/static-pages/fr");

const files = [
  "concurrent-license.ts",
  "floating-license.ts",
  "node-locked-license.ts",
  "perpetual-license.ts",
  "subscription-license.ts",
  "trial-license.ts",
];

const pairs = [
  ["Concurrent license — pour les product owners", "Licence Concurrent — pour les product owners"],
  ["Concurrent license — pour les utilisateurs finaux", "Licence Concurrent — pour les utilisateurs finaux"],
  ["Floating license — pour les product owners", "Licence Floating — pour les product owners"],
  ["Floating license — pour les utilisateurs finaux", "Licence Floating — pour les utilisateurs finaux"],
  ["Node-locked license — pour les product owners", "Licence Node-Locked — pour les product owners"],
  ["Node-locked license — pour les utilisateurs finaux", "Licence Node-Locked — pour les utilisateurs finaux"],
  ["Perpetual license — pour les product owners", "Licence Perpetual — pour les product owners"],
  ["Perpetual license — pour les utilisateurs finaux", "Licence Perpetual — pour les utilisateurs finaux"],
  ["Subscription license — pour les product owners", "Licence Subscription — pour les product owners"],
  ["Subscription license — pour les utilisateurs finaux", "Licence Subscription — pour les utilisateurs finaux"],
  ["Trial license — pour les product owners", "Licence Trial — pour les product owners"],
  ["Trial license — pour les utilisateurs finaux", "Licence Trial — pour les utilisateurs finaux"],
];

for (const file of files) {
  const fp = path.join(base, file);
  let content = fs.readFileSync(fp, "utf8");
  let changed = false;
  for (const [from, to] of pairs) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(fp, content, "utf8");
    console.log("updated", file);
  }
}
