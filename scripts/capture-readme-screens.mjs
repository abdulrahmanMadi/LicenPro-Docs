import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../docs/readme');
fs.mkdirSync(outDir, { recursive: true });

const BASE = 'http://localhost:4202';

const shots = [
  { file: 'home-en-light.png', path: '/', locale: 'en', theme: 'light' },
  { file: 'home-en-dark.png', path: '/', locale: 'en', theme: 'dark' },
  { file: 'quick-start-en-light.png', path: '/quick-start', locale: 'en', theme: 'light' },
  { file: 'api-overview-en-dark.png', path: '/api/overview', locale: 'en', theme: 'dark' },
];

const browser = await chromium.launch();

for (const shot of shots) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: shot.theme === 'dark' ? 'dark' : 'light',
  });
  await context.addInitScript(
    ({ locale, theme }) => {
      localStorage.setItem('licenpro-locale', locale);
      localStorage.setItem('docs-theme', theme);
    },
    { locale: shot.locale, theme: shot.theme }
  );
  const page = await context.newPage();
  await page.goto(`${BASE}${shot.path}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForSelector('.docs-layout, .doc-page, .help-page', { timeout: 30000 });
  await page.waitForTimeout(800);
  const dest = path.join(outDir, shot.file);
  await page.screenshot({ path: dest, fullPage: false });
  console.log('wrote', dest);
  await context.close();
}

await browser.close();
