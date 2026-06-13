import { getApiTopic } from './content/api-topics.content';
import { getPlatformTopic } from './content/platform-guides.content';
import { getSdkTopic } from './content/sdk-topics.content';

export interface BreadcrumbSegment {
  label: string;
  /** Last segment is styled as current page */
  current?: boolean;
}

const STATIC_PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/quick-start': 'Quick start',
  '/first-organization': 'First organization',
  '/first-product': 'First product',
  '/first-license': 'First license',
  '/rsa-keys': 'RSA keys',
  '/perpetual-license': 'Perpetual license',
  '/trial-license': 'Trial license',
  '/subscription-license': 'Subscription license',
  '/floating-license': 'Floating license',
  '/concurrent-license': 'Concurrent license',
  '/node-locked-license': 'Node-locked license',
  '/sessions-activations': 'Sessions & activations',
  '/webhooks': 'Webhooks',
  '/changelog': 'Changelog',
  '/sdk/dotnet': '.NET integration',
  '/sdk/winforms': 'WinForms',
  '/sdk/wpf': 'WPF',
  '/api/overview': 'REST API overview',
};

function humanizeSlug(slug: string): string {
  return slug
    .split(/[-_/]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function buildBreadcrumbSegments(url: string): BreadcrumbSegment[] {
  const path = (url.split('?')[0].split('#')[0] || '/').replace(/\/+$/, '') || '/';
  const base: BreadcrumbSegment[] = [{ label: 'Documentation' }];

  if (path === '/' || path === '') {
    return [...base, { label: 'Home', current: true }];
  }

  const platformMatch = /^\/guides\/platform\/([^/]+)$/.exec(path);
  if (platformMatch) {
    const slug = platformMatch[1];
    const topic = getPlatformTopic(slug);
    return [...base, { label: 'Platform' }, { label: topic?.title ?? humanizeSlug(slug), current: true }];
  }

  const apiTopicMatch = /^\/api\/([^/]+)$/.exec(path);
  if (apiTopicMatch && path !== '/api/overview') {
    const slug = apiTopicMatch[1];
    const topic = getApiTopic(slug);
    return [...base, { label: 'REST API' }, { label: topic?.title ?? humanizeSlug(slug), current: true }];
  }

  if (path === '/api/overview') {
    return [...base, { label: 'REST API' }, { label: 'REST API overview', current: true }];
  }

  const sdkTopicMatch = /^\/sdk\/([^/]+)$/.exec(path);
  if (sdkTopicMatch && !['dotnet', 'winforms', 'wpf'].includes(sdkTopicMatch[1])) {
    const slug = sdkTopicMatch[1];
    const topic = getSdkTopic(slug);
    return [...base, { label: '.NET SDK' }, { label: topic?.title ?? humanizeSlug(slug), current: true }];
  }

  const staticTitle = STATIC_PAGE_TITLES[path];
  if (staticTitle) {
    if (path.startsWith('/sdk/')) {
      return [...base, { label: '.NET SDK' }, { label: staticTitle, current: true }];
    }
    return [...base, { label: staticTitle, current: true }];
  }

  const parts = path.split('/').filter(Boolean);
  return [...base, { label: humanizeSlug(parts[parts.length - 1] ?? 'Page'), current: true }];
}
