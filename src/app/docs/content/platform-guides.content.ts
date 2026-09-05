import type { AppLocale } from '../../core/i18n/locale.types';
import type { DocTopic } from '../doc-topic.types';
import { pickByLocale } from './locale-pick';
import { PLATFORM_GUIDES_EN } from './platform-guides.en';
import { PLATFORM_GUIDES_AR } from './platform-guides.ar';
import { PLATFORM_GUIDES_FR } from './platform-guides.fr';

const BY_LOCALE = {
  en: PLATFORM_GUIDES_EN,
  ar: PLATFORM_GUIDES_AR,
  fr: PLATFORM_GUIDES_FR,
};

/** All platform guide slugs (for prerender). */
export const PLATFORM_GUIDES = PLATFORM_GUIDES_EN;

export function getPlatformTopic(slug: string, locale: AppLocale = 'en'): DocTopic | null {
  return pickByLocale(BY_LOCALE, locale)[slug] ?? null;
}
