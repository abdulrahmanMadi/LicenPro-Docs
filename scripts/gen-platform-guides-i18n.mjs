import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/app/docs/content');
const i18nDir = path.join(__dirname, 'i18n/platform-guides');

const HEADERS = {
  ar: `import type { DocTopic } from '../doc-topic.types';

const link = (path: string, label: string) =>
  \`<a class="doc-inline-link" href="\${path}">\${label}</a>\`;

/** Dashboard screenshot with lightbox (full-resolution asset, no compression). */
const screenshot = (file: string, alt: string) =>
  \`<figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/\${file}" data-doc-image-alt="\${alt}" aria-label="عرض لقطة الشاشة بالحجم الكامل">
      <img src="assets/docs/\${file}" alt="\${alt}" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
  </figure>\`;

const HOST = 'https://licenpro.runasp.net';
`,
  fr: `import type { DocTopic } from '../doc-topic.types';

const link = (path: string, label: string) =>
  \`<a class="doc-inline-link" href="\${path}">\${label}</a>\`;

/** Dashboard screenshot with lightbox (full-resolution asset, no compression). */
const screenshot = (file: string, alt: string) =>
  \`<figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/\${file}" data-doc-image-alt="\${alt}" aria-label="Afficher la capture en taille réelle">
      <img src="assets/docs/\${file}" alt="\${alt}" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Cliquez sur l'image pour ouvrir l'aperçu en pleine résolution.</figcaption>
  </figure>\`;

const HOST = 'https://licenpro.runasp.net';
`,
};

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

const EXPORT_NAMES = { ar: 'PLATFORM_GUIDES_AR', fr: 'PLATFORM_GUIDES_FR' };

function escapeTemplate(str) {
  const normalized = str.replace(/\\\$\{/g, '${');
  return normalized.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
}

function loadTopics(locale) {
  const dir = path.join(i18nDir, locale);
  const topics = {};
  for (const slug of SLUGS) {
    const file = path.join(dir, `${slug}.json`);
    topics[slug] = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return topics;
}

function buildFile(locale) {
  const topics = loadTopics(locale);
  const entries = SLUGS.map((slug) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const t = topics[slug];
    return `  ${key}: {
    title: ${JSON.stringify(t.title)},
    lead: ${JSON.stringify(t.lead)},
    body: \`${escapeTemplate(t.body)}\`,
  }`;
  }).join(',\n');

  return `${HEADERS[locale]}
export const ${EXPORT_NAMES[locale]}: Record<string, DocTopic> = {
${entries},
};
`;
}

for (const locale of ['ar', 'fr']) {
  fs.writeFileSync(
    path.join(contentDir, `platform-guides.${locale}.ts`),
    buildFile(locale),
    'utf8'
  );
}

console.log('Generated platform-guides.ar.ts and platform-guides.fr.ts');
