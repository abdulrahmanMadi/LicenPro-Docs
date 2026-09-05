import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enPath = path.join(__dirname, '../src/app/docs/content/platform-guides.en.ts');
const en = fs.readFileSync(enPath, 'utf8');

const slugs = [
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

const outDir = path.join(__dirname, 'i18n/platform-guides/en');
fs.mkdirSync(outDir, { recursive: true });

for (const slug of slugs) {
  const key = slug.includes('-') ? `'${slug}'` : slug;
  const blockRe = new RegExp(
    `${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*\\{[\\s\\S]*?body:\\s*\`([\\s\\S]*?)\`\\s*,\\s*\\}`,
    'm'
  );
  const blockMatch = en.match(blockRe);
  if (!blockMatch) {
    console.error('Failed to parse body for', slug);
    process.exit(1);
  }

  const titleRe = new RegExp(
    `${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:[\\s\\S]*?title:\\s*'((?:\\\\'|[^'])*)'`
  );
  const leadRe = new RegExp(
    `${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:[\\s\\S]*?lead:\\s*'((?:\\\\'|[^'])*)'`
  );
  const titleMatch = en.match(titleRe);
  const leadMatch = en.match(leadRe);

  const obj = {
    title: titleMatch?.[1] ?? '',
    lead: leadMatch?.[1] ?? '',
    body: blockMatch[1],
  };

  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(obj, null, 2));
  console.log('ok', slug);
}
