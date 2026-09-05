/**
 * Post-process locale JSON: translate remaining English link labels and fix FR apostrophes.
 * Run before gen-platform-guides-i18n.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, 'i18n/platform-guides');

const SLUGS = [
  'overview', 'organizations', 'products', 'releases', 'features-entitlements',
  'licenses', 'activations', 'sessions', 'trials', 'analytics', 'storage', 'account-settings',
];

const AR_LABELS = [
  ["link('/webhooks', 'Webhooks')", "link('/webhooks', 'Webhooks')"], // brand term
  ["link('/guides/platform/analytics', 'Analytics')", "link('/guides/platform/analytics', 'التحليلات')"],
  ["link('/api/auth-users', 'Auth &amp; users')", "link('/api/auth-users', 'المصادقة والمستخدمون')"],
  ["link('/api/catalog', 'catalog API')", "link('/api/catalog', 'API الفهرس')"],
  ["link('/api/telemetry', 'Telemetry API')", "link('/api/telemetry', 'API القياس عن بُعد')"],
  ["link('/api/catalog', 'REST catalog')", "link('/api/catalog', 'فهرس REST')"],
  ["link('/perpetual-license', 'Perpetual')", "link('/perpetual-license', 'دائم')"],
  ["link('/trial-license', 'Trial')", "link('/trial-license', 'تجريبي')"],
  ["link('/subscription-license', 'Subscription')", "link('/subscription-license', 'اشتراك')"],
  ["link('/floating-license', 'Floating')", "link('/floating-license', 'عائم')"],
  ["link('/concurrent-license', 'Concurrent')", "link('/concurrent-license', 'متزامن')"],
  ["link('/node-locked-license', 'Node-Locked')", "link('/node-locked-license', 'مقفل على جهاز')"],
  ["link('/credit-based-license', 'Credit-Based')", "link('/credit-based-license', 'قائم على الرصيد')"],
  ["link('/usage-based-license', 'Usage-Based')", "link('/usage-based-license', 'قائم على الاستخدام')"],
  ["link('/perpetual-license', 'Perpetual online')", "link('/perpetual-license', 'دائم عبر الإنترنت')"],
  ["link('/node-locked-license', 'Node-Locked online')", "link('/node-locked-license', 'مقفل على جهاز عبر الإنترنت')"],
  ["link('/guides/platform/activations', 'Activations')", "link('/guides/platform/activations', 'التفعيلات')"],
  ["link('/guides/platform/sessions', 'Sessions')", "link('/guides/platform/sessions', 'الجلسات')"],
  ["link('/api/licenses', 'Licenses API')", "link('/api/licenses', 'API التراخيص')"],
  ["link('/sdk/license-client', 'SDK LicenseClient')", "link('/sdk/license-client', 'LicenseClient في SDK')"],
  ["link('/api/activations-sessions', 'Activations &amp; sessions API')", "link('/api/activations-sessions', 'API التفعيلات والجلسات')"],
  ["link('/sdk/activation-session', 'SDK activation')", "link('/sdk/activation-session', 'تفعيل SDK')"],
  ["link('/sdk/activation-session', 'SDK sessions')", "link('/sdk/activation-session', 'جلسات SDK')"],
  ["link('/api/activations-sessions', 'REST topic')", "link('/api/activations-sessions', 'موضوع REST')"],
  ["link('/api/trials-transfers', 'Trials &amp; transfers API')", "link('/api/trials-transfers', 'API التجارب والنقل')"],
  ["link('/trial-license', 'Trial license model')", "link('/trial-license', 'نموذج الترخيص التجريبي')"],
  ["link('/api/telemetry', 'Telemetry &amp; logs API')", "link('/api/telemetry', 'API القياس عن بُعد والسجلات')"],
  ["link('/api/auth-users', 'Auth &amp; users API')", "link('/api/auth-users', 'API المصادقة والمستخدمين')"],
  ["link('/api/security', 'Security API')", "link('/api/security', 'API الأمان')"],
  ["link('/api/billing', 'Billing API')", "link('/api/billing', 'API الفوترة')"],
  ["link('/api/storage', 'Storage REST topic')", "link('/api/storage', 'موضوع REST للتخزين')"],
  ["link('/subscription-license', 'Subscription model')", "link('/subscription-license', 'نموذج الاشتراك')"],
  ["link('/node-locked-license', 'Node-locked license sharing detection')", "link('/node-locked-license', 'كشف مشاركة الترخيص المقفل على جهاز')"],
  ["link('/credit-based-license', 'Full guide')", "link('/credit-based-license', 'الدليل الكامل')"],
  ["link('/usage-based-license', 'Full guide')", "link('/usage-based-license', 'الدليل الكامل')"],
  ["link('/rsa-keys', 'full API keys walkthrough')", "link('/rsa-keys', 'جولة كاملة لمفاتيح API')"],
  ["link('/rsa-keys', 'API keys guide')", "link('/rsa-keys', 'دليل مفاتيح API')"],
];

const FR_LABELS = [
  ["link('/guides/platform/analytics', 'Analytics')", "link('/guides/platform/analytics', 'Analytique')"],
  ["link('/api/auth-users', 'Auth &amp; users')", "link('/api/auth-users', 'Auth et utilisateurs')"],
  ["link('/api/catalog', 'catalog API')", "link('/api/catalog', 'API catalogue')"],
  ["link('/api/telemetry', 'Telemetry API')", "link('/api/telemetry', 'API Télémétrie')"],
  ["link('/api/catalog', 'REST catalog')", "link('/api/catalog', 'Catalogue REST')"],
  ["link('/api/licenses', 'Licenses API')", "link('/api/licenses', 'API Licences')"],
  ["link('/api/activations-sessions', 'Activations &amp; sessions API')", "link('/api/activations-sessions', 'API Activations et sessions')"],
  ["link('/sdk/activation-session', 'SDK activation')", "link('/sdk/activation-session', 'Activation SDK')"],
  ["link('/sdk/activation-session', 'SDK sessions')", "link('/sdk/activation-session', 'Sessions SDK')"],
  ["link('/api/activations-sessions', 'REST topic')", "link('/api/activations-sessions', 'Sujet REST')"],
  ["link('/api/trials-transfers', 'Trials &amp; transfers API')", "link('/api/trials-transfers', 'API Essais et transferts')"],
  ["link('/api/telemetry', 'Telemetry &amp; logs API')", "link('/api/telemetry', 'API Télémétrie et logs')"],
  ["link('/api/auth-users', 'Auth &amp; users API')", "link('/api/auth-users', 'API Auth et utilisateurs')"],
  ["link('/api/security', 'Security API')", "link('/api/security', 'API Sécurité')"],
  ["link('/api/billing', 'Billing API')", "link('/api/billing', 'API Facturation')"],
  ["link('/api/storage', 'Storage REST topic')", "link('/api/storage', 'Sujet REST Stockage')"],
  ["link('/sdk/updates-logging', 'SDK updates')", "link('/sdk/updates-logging', 'Mises à jour SDK')"],
  ["link('/credit-based-license', 'Full guide')", "link('/credit-based-license', 'Guide complet')"],
  ["link('/usage-based-license', 'Full guide')", "link('/usage-based-license', 'Guide complet')"],
  ["link('/node-locked-license', 'Node-locked license sharing detection')", "link('/node-locked-license', 'Détection de partage licence nœud verrouillé')"],
  ["link('/subscription-license', 'Subscription model')", "link('/subscription-license', 'Modèle abonnement')"],
  ["link('/trial-license', 'Trial license model')", "link('/trial-license', 'Modèle licence essai')"],
];

/** Use double quotes when alt/label contains unescaped apostrophe inside single-quoted arg */
function fixFnCallQuotes(body, fnName) {
  const token = `\\$\{${fnName}(`;
  let out = '';
  let i = 0;
  while (i < body.length) {
    const start = body.indexOf(token, i);
    if (start === -1) {
      out += body.slice(i);
      break;
    }
    out += body.slice(i, start);
    let j = start + token.length;
    if (body[j] !== "'") {
      out += token;
      i = start + token.length;
      continue;
    }
    j++;
    const arg1Start = j;
    while (j < body.length && body[j] !== "'") j++;
    const arg1 = body.slice(arg1Start, j);
    j++;
    while (j < body.length && (body[j] === ',' || body[j] === ' ')) j++;
    if (body[j] !== "'") {
      out += body.slice(start, j);
      i = j;
      continue;
    }
    j++;
    const arg2Start = j;
    const close = "')}";
    const closeIdx = body.indexOf(close, j);
    if (closeIdx === -1) {
      out += body.slice(start);
      break;
    }
    const arg2 = body.slice(arg2Start, closeIdx);
    if (arg2.includes("'")) {
      const escaped = arg2.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      out += `${token}'${arg1}', "${escaped}")}`;
    } else {
      out += body.slice(start, closeIdx + close.length);
    }
    i = closeIdx + close.length;
  }
  return out;
}

function fixFrApostrophes(body) {
  let out = fixFnCallQuotes(body, 'link');
  out = fixFnCallQuotes(out, 'screenshot');
  return out;
}

function applyLabels(body, pairs) {
  let out = body;
  for (const [from, to] of pairs) {
    out = out.split(from).join(to);
  }
  return out;
}

for (const locale of ['ar', 'fr']) {
  const pairs = locale === 'ar' ? AR_LABELS : FR_LABELS;
  for (const slug of SLUGS) {
    const file = path.join(base, locale, `${slug}.json`);
    const topic = JSON.parse(fs.readFileSync(file, 'utf8'));
    topic.body = applyLabels(topic.body, pairs);
    if (locale === 'fr') {
      topic.body = fixFrApostrophes(topic.body);
      topic.lead = topic.lead.replace(/\\'/g, "'");
      topic.title = topic.title.replace(/\\'/g, "'");
    }
    fs.writeFileSync(file, JSON.stringify(topic, null, 2));
  }
  console.log('fixed', locale);
}
