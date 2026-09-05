import type { AppLocale } from '../../core/i18n/locale.types';
import type { ChangelogEntry } from './changelog.types';
import { pickByLocale } from './locale-pick';
import { CHANGELOG_ENTRIES_EN } from './changelog.entries.en';
import { CHANGELOG_ENTRIES_AR } from './changelog.entries.ar';
import { CHANGELOG_ENTRIES_FR } from './changelog.entries.fr';

const BY_LOCALE = {
  en: CHANGELOG_ENTRIES_EN,
  ar: CHANGELOG_ENTRIES_AR,
  fr: CHANGELOG_ENTRIES_FR,
};

export function getChangelogEntries(locale: AppLocale): ChangelogEntry[] {
  return pickByLocale(BY_LOCALE, locale);
}
