import { Component, effect, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslateService } from '../../core/i18n/translate.service';
import { getChangelogEntries } from '../../docs/content/changelog.content';
import type { ChangelogCategory, ChangelogEntry } from '../../docs/content/changelog.types';

@Component({
  selector: 'app-changelog',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css'],
})
export class ChangelogComponent {
  private readonly i18n = inject(TranslateService);
  readonly changelog = signal<ChangelogEntry[]>([]);

  constructor() {
    effect(() => {
      void this.i18n.tick();
      this.changelog.set(getChangelogEntries(this.i18n.locale()));
    });
  }

  getCategoryIcon(category: ChangelogCategory): string {
    switch (category) {
      case 'added':
        return 'ki-plus-squared';
      case 'improved':
        return 'ki-arrow-up';
      case 'fixed':
        return 'ki-wrench';
      case 'security':
        return 'ki-shield-tick';
      case 'deprecated':
        return 'ki-trash';
      default: {
        const _exhaustive: never = category;
        return _exhaustive;
      }
    }
  }

  releaseTypeLabel(type: ChangelogEntry['type']): string {
    switch (type) {
      case 'major':
        return this.i18n.t('docs.changelog.type.major');
      case 'minor':
        return this.i18n.t('docs.changelog.type.minor');
      case 'patch':
        return this.i18n.t('docs.changelog.type.patch');
      default: {
        const _exhaustive: never = type;
        return _exhaustive;
      }
    }
  }

  categoryLabel(category: ChangelogCategory): string {
    switch (category) {
      case 'added':
        return this.i18n.t('docs.changelog.category.added');
      case 'improved':
        return this.i18n.t('docs.changelog.category.improved');
      case 'fixed':
        return this.i18n.t('docs.changelog.category.fixed');
      case 'security':
        return this.i18n.t('docs.changelog.category.security');
      case 'deprecated':
        return this.i18n.t('docs.changelog.category.deprecated');
      default: {
        const _exhaustive: never = category;
        return _exhaustive;
      }
    }
  }
}
