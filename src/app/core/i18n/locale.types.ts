export type AppLocale = 'en' | 'ar' | 'fr';

export interface LocaleOption {
  code: AppLocale;
  label: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
  flagSrc: string;
}

/** Shared with LicenPro-Angular so locale persists across apps. */
export const LOCALE_STORAGE_KEY = 'licenpro-locale';

export const LOCALE_OPTIONS: readonly LocaleOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    dir: 'ltr',
    flagSrc: 'assets/flags/united-kingdom.svg',
  },
  {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    dir: 'rtl',
    flagSrc: 'assets/flags/saudi-arabia.svg',
  },
  {
    code: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    dir: 'ltr',
    flagSrc: 'assets/flags/france.svg',
  },
] as const;

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value === 'en' || value === 'ar' || value === 'fr';
}
