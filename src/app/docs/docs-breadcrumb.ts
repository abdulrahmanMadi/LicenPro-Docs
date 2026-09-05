import { getApiTopic } from './content/api-topics.content';
import { getPlatformTopic } from './content/platform-guides.content';
import { getSdkTopic } from './content/sdk-topics.content';
import type { AppLocale } from '../core/i18n/locale.types';

export interface BreadcrumbSegment {
  label: string;
  /** Last segment is styled as current page */
  current?: boolean;
}

export type TranslateFn = (key: string) => string;

/** Maps static doc routes to `docs.nav.*` dictionary keys. */
const STATIC_PATH_KEYS: Record<string, string> = {
  '/': 'docs.nav.home',
  '/quick-start': 'docs.nav.quick-start',
  '/first-organization': 'docs.nav.first-organization',
  '/first-product': 'docs.nav.first-product',
  '/first-license': 'docs.nav.first-license',
  '/rsa-keys': 'docs.nav.rsa-keys',
  '/perpetual-license': 'docs.nav.perpetual',
  '/trial-license': 'docs.nav.trial',
  '/subscription-license': 'docs.nav.subscription',
  '/floating-license': 'docs.nav.floating',
  '/concurrent-license': 'docs.nav.concurrent',
  '/node-locked-license': 'docs.nav.node-locked',
  '/credit-based-license': 'docs.nav.credit-based',
  '/usage-based-license': 'docs.nav.usage-based',
  '/sessions-activations': 'docs.nav.sessions-activations',
  '/webhooks': 'docs.nav.webhooks',
  '/changelog': 'docs.nav.section.changelog',
  '/sdk/dotnet': 'docs.nav.sdk-dotnet',
  '/sdk/winforms': 'docs.nav.sdk-winforms',
  '/sdk/wpf': 'docs.nav.sdk-wpf',
  '/api/overview': 'docs.nav.api-hub',
};

function humanizeSlug(slug: string): string {
  return slug
    .split(/[-_/]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function buildBreadcrumbSegments(url: string, t: TranslateFn, locale: AppLocale = 'en'): BreadcrumbSegment[] {
  const path = (url.split('?')[0].split('#')[0] || '/').replace(/\/+$/, '') || '/';
  const base: BreadcrumbSegment[] = [{ label: t('docs.breadcrumb.documentation') }];

  if (path === '/' || path === '') {
    return [...base, { label: t('docs.nav.home'), current: true }];
  }

  const platformMatch = /^\/guides\/platform\/([^/]+)$/.exec(path);
  if (platformMatch) {
    const slug = platformMatch[1];
    const topic = getPlatformTopic(slug, locale);
    return [
      ...base,
      { label: t('docs.breadcrumb.platform') },
      { label: topic?.title ?? humanizeSlug(slug), current: true },
    ];
  }

  const apiTopicMatch = /^\/api\/([^/]+)$/.exec(path);
  if (apiTopicMatch && path !== '/api/overview') {
    const slug = apiTopicMatch[1];
    const topic = getApiTopic(slug, locale);
    return [
      ...base,
      { label: t('docs.breadcrumb.restApi') },
      { label: topic?.title ?? humanizeSlug(slug), current: true },
    ];
  }

  if (path === '/api/overview') {
    return [
      ...base,
      { label: t('docs.breadcrumb.restApi') },
      { label: t('docs.nav.api-hub'), current: true },
    ];
  }

  const sdkTopicMatch = /^\/sdk\/([^/]+)$/.exec(path);
  if (sdkTopicMatch && !['dotnet', 'winforms', 'wpf'].includes(sdkTopicMatch[1])) {
    const slug = sdkTopicMatch[1];
    const topic = getSdkTopic(slug, locale);
    return [
      ...base,
      { label: t('docs.breadcrumb.dotnetSdk') },
      { label: topic?.title ?? humanizeSlug(slug), current: true },
    ];
  }

  const staticKey = STATIC_PATH_KEYS[path];
  if (staticKey) {
    const title = t(staticKey);
    if (path.startsWith('/sdk/')) {
      return [...base, { label: t('docs.breadcrumb.dotnetSdk') }, { label: title, current: true }];
    }
    return [...base, { label: title, current: true }];
  }

  const parts = path.split('/').filter(Boolean);
  return [...base, { label: humanizeSlug(parts[parts.length - 1] ?? 'Page'), current: true }];
}
