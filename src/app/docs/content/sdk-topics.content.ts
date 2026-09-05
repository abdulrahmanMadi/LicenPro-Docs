import type { AppLocale } from '../../core/i18n/locale.types';
import type { DocTopic } from '../doc-topic.types';
import { pickByLocale } from './locale-pick';
import { SDK_TOPICS_EN } from './sdk-topics.en';
import { SDK_TOPICS_AR } from './sdk-topics.ar';
import { SDK_TOPICS_FR } from './sdk-topics.fr';

const BY_LOCALE = {
  en: SDK_TOPICS_EN,
  ar: SDK_TOPICS_AR,
  fr: SDK_TOPICS_FR,
};

/** All SDK topic slugs (for prerender). */
export const SDK_TOPICS = SDK_TOPICS_EN;

export function getSdkTopic(slug: string, locale: AppLocale = 'en'): DocTopic | null {
  return pickByLocale(BY_LOCALE, locale)[slug] ?? null;
}
