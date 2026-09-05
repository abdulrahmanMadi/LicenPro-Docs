import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '../src/app/pages');
const outDir = path.join(__dirname, '../src/app/docs/content/static-pages/en');
fs.mkdirSync(outDir, { recursive: true });

function normalizeDocHtml(html) {
  let out = html.trim();
  if (out.startsWith('<div class="help-page">')) {
    out = out.replace(/^<div class="help-page">/, '').replace(/<\/div>\s*$/, '').trim();
  }
  out = out.replace(/<a\s+routerLink="([^"]+)"([^>]*)>/g, (_m, route, rest) => {
    const cls = rest.includes('class=') ? rest : ` class="doc-inline-link"${rest}`;
    return `<a href="${route}"${cls}>`;
  });
  return out;
}

const map = {
  'first-organization': 'first-organization',
  'first-product': 'first-product',
  'first-license': 'first-license',
  'rsa-keys': 'rsa-keys',
  'perpetual-license': 'perpetual-license',
  'trial-license': 'trial-license',
  'subscription-license': 'subscription-license',
  'floating-license': 'floating-license',
  'concurrent-license': 'concurrent-license',
  'node-locked-license': 'node-locked-license',
  'credit-based-license': 'credit-based-license',
  'usage-based-license': 'usage-based-license',
  'sessions-activations': 'sessions-activations',
  webhooks: 'webhooks',
  'sdk-dotnet': 'sdk-dotnet',
  'sdk-winforms': 'sdk-winforms',
  'sdk-wpf': 'sdk-wpf',
};

for (const [folder, id] of Object.entries(map)) {
  const htmlPath = path.join(pagesDir, folder, `${folder}.component.html`);
  const html = normalizeDocHtml(fs.readFileSync(htmlPath, 'utf8'));
  fs.writeFileSync(path.join(outDir, `${id}.ts`), `export const HTML = ${JSON.stringify(html)} as const;\n`);
}

const qs = normalizeDocHtml(fs.readFileSync(path.join(pagesDir, 'quick-start/quick-start.component.html'), 'utf8'));
const mermaidMarker = '<app-mermaid-chart chartId="activation-vs-session" [definition]="activationSessionDef" />';
const [before, after] = qs.split(mermaidMarker);
fs.writeFileSync(path.join(outDir, 'quick-start-before.ts'), `export const HTML = ${JSON.stringify(before.trim())} as const;\n`);
fs.writeFileSync(path.join(outDir, 'quick-start-after.ts'), `export const HTML = ${JSON.stringify((after ?? '').trim())} as const;\n`);

const api = normalizeDocHtml(fs.readFileSync(path.join(pagesDir, 'api-overview/api-overview.component.html'), 'utf8'));
const m1 = '<app-mermaid-chart chartId="system-context" [definition]="systemContextDef" />';
const m2 = '<app-mermaid-chart chartId="license-lifecycle" [definition]="licenseLifecycleDef" />';
const apiParts = api.split(m1);
const apiBefore = apiParts[0]?.trim() ?? '';
const rest = apiParts[1] ?? '';
const apiMidEnd = rest.split(m2);
fs.writeFileSync(path.join(outDir, 'api-overview-before.ts'), `export const HTML = ${JSON.stringify(apiBefore)} as const;\n`);
fs.writeFileSync(path.join(outDir, 'api-overview-mid.ts'), `export const HTML = ${JSON.stringify((apiMidEnd[0] ?? '').trim())} as const;\n`);
fs.writeFileSync(path.join(outDir, 'api-overview-after.ts'), `export const HTML = ${JSON.stringify((apiMidEnd[1] ?? '').trim())} as const;\n`);

console.log('extracted with href normalization');
