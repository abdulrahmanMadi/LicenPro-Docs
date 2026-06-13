/** Sidebar navigation — single source of truth. Nested `children` only under REST API. */

export interface NavLeaf {
  id: string;
  label: string;
  icon: string;
  route?: string;
  fragment?: string;
  /** Second level (e.g. API topic links) */
  children?: NavLeaf[];
  visible?: boolean;
  matchedText?: string;
}

export interface NavSection {
  id: string;
  label: string;
  icon: string;
  expanded?: boolean;
  visible?: boolean;
  matchedText?: string;
  items: NavLeaf[];
}

export const DOCS_NAV: NavSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'ki-outline ki-element-11',
    expanded: true,
    items: [
      { id: 'home', label: 'Documentation home', icon: 'ki-outline ki-home', route: '/' },
      { id: 'concepts', label: 'System overview', icon: 'ki-outline ki-abstract-26', route: '/guides/platform/overview' },
    ],
  },
  {
    id: 'getting-started',
    label: 'Get started',
    icon: 'ki-outline ki-rocket',
    expanded: true,
    items: [
      { id: 'quick-start', label: 'Quick start', icon: 'ki-outline ki-flag', route: '/quick-start' },
      {
        id: 'vendor-workflow',
        label: 'Dashboard workflow',
        icon: 'ki-outline ki-route',
        route: '/quick-start',
        fragment: 'vendor-workflow',
      },
      { id: 'first-organization', label: 'First organization', icon: 'ki-outline ki-briefcase', route: '/first-organization' },
      { id: 'first-product', label: 'First product', icon: 'ki-outline ki-abstract-26', route: '/first-product' },
      { id: 'first-license', label: 'First license', icon: 'ki-outline ki-key', route: '/first-license' },
      { id: 'rsa-keys', label: 'RSA keys', icon: 'ki-outline ki-shield-tick', route: '/rsa-keys' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform (dashboard)',
    icon: 'ki-outline ki-screen',
    expanded: false,
    items: [
      { id: 'gp-orgs', label: 'Organizations', icon: 'ki-outline ki-briefcase', route: '/guides/platform/organizations' },
      { id: 'gp-products', label: 'Products', icon: 'ki-outline ki-mouse-square', route: '/guides/platform/products' },
      { id: 'gp-releases', label: 'Releases', icon: 'ki-outline ki-cloud-add', route: '/guides/platform/releases' },
      {
        id: 'gp-features',
        label: 'Features & entitlements',
        icon: 'ki-outline ki-setting-4',
        route: '/guides/platform/features-entitlements',
      },
      { id: 'gp-licenses', label: 'Licenses (vendor)', icon: 'ki-outline ki-key-square', route: '/guides/platform/licenses' },
      { id: 'gp-activations', label: 'Activations', icon: 'ki-outline ki-verify', route: '/guides/platform/activations' },
      { id: 'gp-sessions', label: 'Sessions', icon: 'ki-outline ki-chart-line', route: '/guides/platform/sessions' },
      { id: 'gp-trials', label: 'Trials', icon: 'ki-outline ki-timer', route: '/guides/platform/trials' },
      { id: 'gp-analytics', label: 'Analytics', icon: 'ki-outline ki-graph-up', route: '/guides/platform/analytics' },
      { id: 'gp-storage', label: 'Storage', icon: 'ki-outline ki-cloud', route: '/guides/platform/storage' },
      { id: 'gp-account', label: 'Account settings', icon: 'ki-outline ki-setting-2', route: '/guides/platform/account-settings' },
    ],
  },
  {
    id: 'license-models',
    label: 'License models',
    icon: 'ki-outline ki-key-square',
    expanded: false,
    items: [
      { id: 'perpetual', label: 'Perpetual', icon: 'ki-outline ki-users', route: '/perpetual-license' },
      { id: 'trial', label: 'Trial', icon: 'ki-outline ki-timer', route: '/trial-license' },
      { id: 'subscription', label: 'Subscription', icon: 'ki-outline ki-calendar-tick', route: '/subscription-license' },
      { id: 'floating', label: 'Floating', icon: 'ki-outline ki-people', route: '/floating-license' },
      { id: 'concurrent', label: 'Concurrent', icon: 'ki-outline ki-users', route: '/concurrent-license' },
      { id: 'node-locked', label: 'Node-locked', icon: 'ki-outline ki-lock', route: '/node-locked-license' },
    ],
  },
  {
    id: 'sdk',
    label: '.NET SDK',
    icon: 'ki-outline ki-microsoft',
    expanded: false,
    items: [
      { id: 'sdk-overview', label: 'SDK overview', icon: 'ki-outline ki-abstract-26', route: '/sdk/overview' },
      { id: 'sdk-config', label: 'Configuration & bootstrap', icon: 'ki-outline ki-setting', route: '/sdk/configuration' },
      { id: 'sdk-client', label: 'LicenseClient lifecycle', icon: 'ki-outline ki-code', route: '/sdk/license-client' },
      {
        id: 'sdk-activation',
        label: 'Activation & sessions',
        icon: 'ki-outline ki-chart-line',
        route: '/sdk/activation-session',
      },
      { id: 'sdk-features', label: 'Features & usage', icon: 'ki-outline ki-setting-2', route: '/sdk/features-usage' },
      { id: 'sdk-offline', label: 'Offline & grace', icon: 'ki-outline ki-wifi-square', route: '/sdk/offline-grace' },
      { id: 'sdk-updates', label: 'Updates & logging', icon: 'ki-outline ki-cloud-download', route: '/sdk/updates-logging' },
      { id: 'sdk-dotnet', label: '.NET integration', icon: 'ki-outline ki-code', route: '/sdk/dotnet' },
      { id: 'sdk-winforms', label: 'WinForms', icon: 'ki-outline ki-mouse', route: '/sdk/winforms' },
      { id: 'sdk-wpf', label: 'WPF', icon: 'ki-outline ki-element-11', route: '/sdk/wpf' },
    ],
  },
  {
    id: 'rest-api',
    label: 'REST API',
    icon: 'ki-outline ki-data',
    expanded: true,
    items: [
      { id: 'api-hub', label: 'REST API overview', icon: 'ki-outline ki-book', route: '/api/overview' },
      {
        id: 'api-auth',
        label: 'Auth & identity',
        icon: 'ki-outline ki-shield-tick',
        children: [
          { id: 'api-auth-users', label: 'Users & roles', icon: 'ki-outline ki-users', route: '/api/auth-users' },
          { id: 'api-security', label: 'Security utilities', icon: 'ki-outline ki-lock', route: '/api/security' },
        ],
      },
      {
        id: 'api-core',
        label: 'Catalog & licensing',
        icon: 'ki-outline ki-package',
        children: [
          { id: 'api-orgs', label: 'Organizations', icon: 'ki-outline ki-briefcase', route: '/api/organizations' },
          { id: 'api-catalog', label: 'Products & releases', icon: 'ki-outline ki-abstract-26', route: '/api/catalog' },
          { id: 'api-licenses', label: 'Licenses', icon: 'ki-outline ki-key', route: '/api/licenses' },
          {
            id: 'api-activations',
            label: 'Activations & sessions',
            icon: 'ki-outline ki-chart-line',
            route: '/api/activations-sessions',
          },
          { id: 'api-trials', label: 'Trials & transfers', icon: 'ki-outline ki-arrows-circle', route: '/api/trials-transfers' },
        ],
      },
      {
        id: 'api-ops',
        label: 'Operations',
        icon: 'ki-outline ki-chart-simple',
        children: [
          { id: 'api-telemetry', label: 'Telemetry & logs', icon: 'ki-outline ki-notepad', route: '/api/telemetry' },
          { id: 'api-storage', label: 'Storage', icon: 'ki-outline ki-cloud', route: '/api/storage' },
          { id: 'api-sdkhost', label: 'SDK host (settings & updates)', icon: 'ki-outline ki-cloud-download', route: '/api/sdk-host' },
        ],
      },
      {
        id: 'api-biz',
        label: 'Commerce & admin',
        icon: 'ki-outline ki-dollar',
        children: [
          { id: 'api-billing', label: 'Subscriptions & payments', icon: 'ki-outline ki-dollar', route: '/api/billing' },
          { id: 'api-admin', label: 'Admin & jobs', icon: 'ki-outline ki-setting-3', route: '/api/admin' },
        ],
      },
    ],
  },
  {
    id: 'integration',
    label: 'Integration',
    icon: 'ki-outline ki-arrow-mix',
    expanded: false,
    items: [
      { id: 'sessions-activations', label: 'Sessions & activations (guide)', icon: 'ki-outline ki-chart-line', route: '/sessions-activations' },
      { id: 'webhooks', label: 'Webhooks', icon: 'ki-outline ki-arrow-mix', route: '/webhooks' },
    ],
  },
  {
    id: 'changelog',
    label: 'Changelog',
    icon: 'ki-outline ki-notepad-edit',
    expanded: false,
    items: [{ id: 'changelog-page', label: 'Releases', icon: 'ki-outline ki-tag', route: '/changelog' }],
  },
];

/** Sidebar for Guides tab (product docs, SDK, integration — everything except REST API tree). */
export const GUIDES_NAV: NavSection[] = DOCS_NAV.filter((s) => s.id !== 'rest-api');

/** Sidebar for API Reference tab (REST topics + overview hub only). */
export const API_NAV: NavSection[] = DOCS_NAV.filter((s) => s.id === 'rest-api');
