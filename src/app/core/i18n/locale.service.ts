import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, signal } from '@angular/core';
import {
  AppLocale,
  LOCALE_OPTIONS,
  LOCALE_STORAGE_KEY,
  LocaleOption,
  isAppLocale,
} from './locale.types';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly localeSignal = signal<AppLocale>('en');

  readonly locale = this.localeSignal.asReadonly();
  readonly dir = computed(() => (this.localeSignal() === 'ar' ? 'rtl' : 'ltr'));
  readonly options = LOCALE_OPTIONS;
  readonly currentOption = computed(
    () => LOCALE_OPTIONS.find((o) => o.code === this.localeSignal()) ?? LOCALE_OPTIONS[0]
  );

  constructor(
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setLocale(this.readStoredLocale(), false);
    }
  }

  setLocale(locale: AppLocale, persist = true): void {
    this.localeSignal.set(locale);
    this.applyToDocument(locale);
    if (persist && isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      } catch {
        /* ignore quota / private mode */
      }
    }
  }

  optionFor(code: AppLocale): LocaleOption {
    return LOCALE_OPTIONS.find((o) => o.code === code) ?? LOCALE_OPTIONS[0];
  }

  private readStoredLocale(): AppLocale {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isAppLocale(stored)) {
        return stored;
      }
    } catch {
      /* ignore */
    }
    return 'en';
  }

  private applyToDocument(locale: AppLocale): void {
    const html = this.doc.documentElement;
    const option = this.optionFor(locale);
    html.lang = locale;
    html.dir = option.dir;
    html.setAttribute('data-locale', locale);
    if (locale === 'ar') {
      html.classList.add('locale-ar');
    } else {
      html.classList.remove('locale-ar');
    }
  }
}
