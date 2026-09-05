import type { AppLocale } from '../../core/i18n/locale.types';
import type { DocTopic } from '../doc-topic.types';
import { pickByLocale } from './locale-pick';
import { API_TOPICS_EN } from './api-topics.en';
import { API_TOPICS_AR } from './api-topics.ar';
import { API_TOPICS_FR } from './api-topics.fr';

const BY_LOCALE = {
  en: API_TOPICS_EN,
  ar: API_TOPICS_AR,
  fr: API_TOPICS_FR,
};

/** All API topic slugs (for prerender). */
export const API_TOPICS = API_TOPICS_EN;

export function getApiTopic(slug: string, locale: AppLocale = 'en'): DocTopic | null {
  return pickByLocale(BY_LOCALE, locale)[slug] ?? null;
}
