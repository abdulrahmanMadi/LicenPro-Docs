import type { AppLocale } from '../../core/i18n/locale.types';
import { pickByLocale } from './locale-pick';

import { HTML as FIRST_ORGANIZATION_EN } from './static-pages/en/first-organization';
import { HTML as FIRST_PRODUCT_EN } from './static-pages/en/first-product';
import { HTML as FIRST_LICENSE_EN } from './static-pages/en/first-license';
import { HTML as RSA_KEYS_EN } from './static-pages/en/rsa-keys';
import { HTML as PERPETUAL_EN } from './static-pages/en/perpetual-license';
import { HTML as TRIAL_EN } from './static-pages/en/trial-license';
import { HTML as SUBSCRIPTION_EN } from './static-pages/en/subscription-license';
import { HTML as FLOATING_EN } from './static-pages/en/floating-license';
import { HTML as CONCURRENT_EN } from './static-pages/en/concurrent-license';
import { HTML as NODE_LOCKED_EN } from './static-pages/en/node-locked-license';
import { HTML as CREDIT_BASED_EN } from './static-pages/en/credit-based-license';
import { HTML as USAGE_BASED_EN } from './static-pages/en/usage-based-license';
import { HTML as SESSIONS_EN } from './static-pages/en/sessions-activations';
import { HTML as WEBHOOKS_EN } from './static-pages/en/webhooks';
import { HTML as SDK_DOTNET_EN } from './static-pages/en/sdk-dotnet';
import { HTML as SDK_WINFORMS_EN } from './static-pages/en/sdk-winforms';
import { HTML as SDK_WPF_EN } from './static-pages/en/sdk-wpf';
import { HTML as QUICK_START_BEFORE_EN } from './static-pages/en/quick-start-before';
import { HTML as QUICK_START_AFTER_EN } from './static-pages/en/quick-start-after';
import { HTML as API_OVERVIEW_BEFORE_EN } from './static-pages/en/api-overview-before';
import { HTML as API_OVERVIEW_MID_EN } from './static-pages/en/api-overview-mid';
import { HTML as API_OVERVIEW_AFTER_EN } from './static-pages/en/api-overview-after';

import { HTML as FIRST_ORGANIZATION_AR } from './static-pages/ar/first-organization';
import { HTML as FIRST_PRODUCT_AR } from './static-pages/ar/first-product';
import { HTML as FIRST_LICENSE_AR } from './static-pages/ar/first-license';
import { HTML as RSA_KEYS_AR } from './static-pages/ar/rsa-keys';
import { HTML as PERPETUAL_AR } from './static-pages/ar/perpetual-license';
import { HTML as TRIAL_AR } from './static-pages/ar/trial-license';
import { HTML as SUBSCRIPTION_AR } from './static-pages/ar/subscription-license';
import { HTML as FLOATING_AR } from './static-pages/ar/floating-license';
import { HTML as CONCURRENT_AR } from './static-pages/ar/concurrent-license';
import { HTML as NODE_LOCKED_AR } from './static-pages/ar/node-locked-license';
import { HTML as CREDIT_BASED_AR } from './static-pages/ar/credit-based-license';
import { HTML as USAGE_BASED_AR } from './static-pages/ar/usage-based-license';
import { HTML as SESSIONS_AR } from './static-pages/ar/sessions-activations';
import { HTML as WEBHOOKS_AR } from './static-pages/ar/webhooks';
import { HTML as SDK_DOTNET_AR } from './static-pages/ar/sdk-dotnet';
import { HTML as SDK_WINFORMS_AR } from './static-pages/ar/sdk-winforms';
import { HTML as SDK_WPF_AR } from './static-pages/ar/sdk-wpf';
import { HTML as QUICK_START_BEFORE_AR } from './static-pages/ar/quick-start-before';
import { HTML as QUICK_START_AFTER_AR } from './static-pages/ar/quick-start-after';
import { HTML as API_OVERVIEW_BEFORE_AR } from './static-pages/ar/api-overview-before';
import { HTML as API_OVERVIEW_MID_AR } from './static-pages/ar/api-overview-mid';
import { HTML as API_OVERVIEW_AFTER_AR } from './static-pages/ar/api-overview-after';

import { HTML as FIRST_ORGANIZATION_FR } from './static-pages/fr/first-organization';
import { HTML as FIRST_PRODUCT_FR } from './static-pages/fr/first-product';
import { HTML as FIRST_LICENSE_FR } from './static-pages/fr/first-license';
import { HTML as RSA_KEYS_FR } from './static-pages/fr/rsa-keys';
import { HTML as PERPETUAL_FR } from './static-pages/fr/perpetual-license';
import { HTML as TRIAL_FR } from './static-pages/fr/trial-license';
import { HTML as SUBSCRIPTION_FR } from './static-pages/fr/subscription-license';
import { HTML as FLOATING_FR } from './static-pages/fr/floating-license';
import { HTML as CONCURRENT_FR } from './static-pages/fr/concurrent-license';
import { HTML as NODE_LOCKED_FR } from './static-pages/fr/node-locked-license';
import { HTML as CREDIT_BASED_FR } from './static-pages/fr/credit-based-license';
import { HTML as USAGE_BASED_FR } from './static-pages/fr/usage-based-license';
import { HTML as SESSIONS_FR } from './static-pages/fr/sessions-activations';
import { HTML as WEBHOOKS_FR } from './static-pages/fr/webhooks';
import { HTML as SDK_DOTNET_FR } from './static-pages/fr/sdk-dotnet';
import { HTML as SDK_WINFORMS_FR } from './static-pages/fr/sdk-winforms';
import { HTML as SDK_WPF_FR } from './static-pages/fr/sdk-wpf';
import { HTML as QUICK_START_BEFORE_FR } from './static-pages/fr/quick-start-before';
import { HTML as QUICK_START_AFTER_FR } from './static-pages/fr/quick-start-after';
import { HTML as API_OVERVIEW_BEFORE_FR } from './static-pages/fr/api-overview-before';
import { HTML as API_OVERVIEW_MID_FR } from './static-pages/fr/api-overview-mid';
import { HTML as API_OVERVIEW_AFTER_FR } from './static-pages/fr/api-overview-after';

export interface QuickStartParts {
  beforeMermaid: string;
  afterMermaid: string;
}

export interface ApiOverviewParts {
  beforeSystemChart: string;
  betweenCharts: string;
  afterLifecycleChart: string;
}

type PageMap = Partial<Record<AppLocale, string>> & { en: string };

const STATIC_PAGES: Record<string, PageMap> = {
  'first-organization': { en: FIRST_ORGANIZATION_EN, ar: FIRST_ORGANIZATION_AR, fr: FIRST_ORGANIZATION_FR },
  'first-product': { en: FIRST_PRODUCT_EN, ar: FIRST_PRODUCT_AR, fr: FIRST_PRODUCT_FR },
  'first-license': { en: FIRST_LICENSE_EN, ar: FIRST_LICENSE_AR, fr: FIRST_LICENSE_FR },
  'rsa-keys': { en: RSA_KEYS_EN, ar: RSA_KEYS_AR, fr: RSA_KEYS_FR },
  'perpetual-license': { en: PERPETUAL_EN, ar: PERPETUAL_AR, fr: PERPETUAL_FR },
  'trial-license': { en: TRIAL_EN, ar: TRIAL_AR, fr: TRIAL_FR },
  'subscription-license': { en: SUBSCRIPTION_EN, ar: SUBSCRIPTION_AR, fr: SUBSCRIPTION_FR },
  'floating-license': { en: FLOATING_EN, ar: FLOATING_AR, fr: FLOATING_FR },
  'concurrent-license': { en: CONCURRENT_EN, ar: CONCURRENT_AR, fr: CONCURRENT_FR },
  'node-locked-license': { en: NODE_LOCKED_EN, ar: NODE_LOCKED_AR, fr: NODE_LOCKED_FR },
  'credit-based-license': { en: CREDIT_BASED_EN, ar: CREDIT_BASED_AR, fr: CREDIT_BASED_FR },
  'usage-based-license': { en: USAGE_BASED_EN, ar: USAGE_BASED_AR, fr: USAGE_BASED_FR },
  'sessions-activations': { en: SESSIONS_EN, ar: SESSIONS_AR, fr: SESSIONS_FR },
  webhooks: { en: WEBHOOKS_EN, ar: WEBHOOKS_AR, fr: WEBHOOKS_FR },
  'sdk-dotnet': { en: SDK_DOTNET_EN, ar: SDK_DOTNET_AR, fr: SDK_DOTNET_FR },
  'sdk-winforms': { en: SDK_WINFORMS_EN, ar: SDK_WINFORMS_AR, fr: SDK_WINFORMS_FR },
  'sdk-wpf': { en: SDK_WPF_EN, ar: SDK_WPF_AR, fr: SDK_WPF_FR },
};

const QUICK_START_PARTS: Record<AppLocale, QuickStartParts> = {
  en: { beforeMermaid: QUICK_START_BEFORE_EN, afterMermaid: QUICK_START_AFTER_EN },
  ar: { beforeMermaid: QUICK_START_BEFORE_AR, afterMermaid: QUICK_START_AFTER_AR },
  fr: { beforeMermaid: QUICK_START_BEFORE_FR, afterMermaid: QUICK_START_AFTER_FR },
};

const API_OVERVIEW_PARTS: Record<AppLocale, ApiOverviewParts> = {
  en: {
    beforeSystemChart: API_OVERVIEW_BEFORE_EN,
    betweenCharts: API_OVERVIEW_MID_EN,
    afterLifecycleChart: API_OVERVIEW_AFTER_EN,
  },
  ar: {
    beforeSystemChart: API_OVERVIEW_BEFORE_AR,
    betweenCharts: API_OVERVIEW_MID_AR,
    afterLifecycleChart: API_OVERVIEW_AFTER_AR,
  },
  fr: {
    beforeSystemChart: API_OVERVIEW_BEFORE_FR,
    betweenCharts: API_OVERVIEW_MID_FR,
    afterLifecycleChart: API_OVERVIEW_AFTER_FR,
  },
};

export function getStaticPageHtml(pageId: string, locale: AppLocale): string {
  const page = STATIC_PAGES[pageId];
  if (!page) {
    return '<header class="help-page-header"><h1>Page not found</h1></header>';
  }
  return pickByLocale(page, locale);
}

export function getQuickStartParts(locale: AppLocale): QuickStartParts {
  return QUICK_START_PARTS[locale] ?? QUICK_START_PARTS.en;
}

export function getApiOverviewParts(locale: AppLocale): ApiOverviewParts {
  return API_OVERVIEW_PARTS[locale] ?? API_OVERVIEW_PARTS.en;
}
