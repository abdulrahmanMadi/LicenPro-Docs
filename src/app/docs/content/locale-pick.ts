import type { AppLocale } from '../../core/i18n/locale.types';

/** Pick localized content; falls back to English when a locale is missing. */
export function pickByLocale<T>(
  byLocale: Partial<Record<AppLocale, T>> & { en: T },
  locale: AppLocale
): T {
  return byLocale[locale] ?? byLocale.en;
}
