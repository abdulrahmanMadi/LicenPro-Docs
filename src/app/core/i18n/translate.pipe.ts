import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from './translate.service';

/** Impure so language switches refresh bound strings without manual markForCheck. */
@Pipe({
  name: 't',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(TranslateService);

  transform(key: string, params?: Record<string, string | number>): string {
    void this.i18n.tick();
    return this.i18n.t(key, params);
  }
}
