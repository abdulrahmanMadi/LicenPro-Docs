import { Injectable, computed, inject } from '@angular/core';
import { AR_DICT } from './dictionaries/ar';
import { EN_DICT } from './dictionaries/en';
import { FR_DICT } from './dictionaries/fr';
import { LocaleService } from './locale.service';
import { AppLocale } from './locale.types';

const DICTS: Record<AppLocale, Record<string, string>> = {
  en: EN_DICT,
  ar: AR_DICT,
  fr: FR_DICT,
};

/**
 * Translation policy (keep in English in all locales):
 * - Brand: LicenPro
 * - Tech: SDK, .NET, C#, API, RSA, HWID, WinForms, WPF, REST
 * - Code samples and file paths
 */
@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly localeService = inject(LocaleService);

  readonly locale = this.localeService.locale;
  readonly tick = computed(() => this.localeService.locale());

  t(key: string, params?: Record<string, string | number>): string {
    const locale = this.localeService.locale();
    const dict = DICTS[locale] ?? EN_DICT;
    let value = dict[key] ?? EN_DICT[key] ?? key;
    if (params) {
      for (const [name, raw] of Object.entries(params)) {
        value = value.replaceAll(`{{${name}}}`, String(raw));
      }
    }
    return value;
  }
}
