/**
 * Writes all platform guide AR/FR JSON from translation modules, then generates TS files.
 * Run: node scripts/build-platform-guides-locale.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, 'i18n/platform-guides');
const translationsDir = path.join(base, 'translations');

const SLUGS = [
  'overview',
  'organizations',
  'products',
  'releases',
  'features-entitlements',
  'licenses',
  'activations',
  'sessions',
  'trials',
  'analytics',
  'storage',
  'account-settings',
];

for (const locale of ['ar', 'fr']) {
  fs.mkdirSync(path.join(base, locale), { recursive: true });
}

for (const slug of SLUGS) {
  const mod = await import(pathToFileURL(path.join(translationsDir, `${slug}.mjs`)).href);
  const topic = mod.default;
  for (const locale of ['ar', 'fr']) {
    const out = path.join(base, locale, `${slug}.json`);
    fs.writeFileSync(out, JSON.stringify(topic[locale], null, 2));
    console.log('wrote', locale, slug);
  }
}

const fix = spawnSync('node', [path.join(__dirname, 'fix-link-labels.mjs')], {
  stdio: 'inherit',
  shell: false,
});
if (fix.status !== 0) process.exit(fix.status ?? 1);

const ui = spawnSync('node', [path.join(__dirname, 'fix-ui-terms.mjs')], {
  stdio: 'inherit',
  shell: false,
});
if (ui.status !== 0) process.exit(ui.status ?? 1);

const gen = spawnSync('node', [path.join(__dirname, 'gen-platform-guides-i18n.mjs')], {
  stdio: 'inherit',
  shell: false,
});
process.exit(gen.status ?? 1);
