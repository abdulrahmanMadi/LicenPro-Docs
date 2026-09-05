import type { NavLeaf, NavSection } from '../../docs/docs-nav.config';
import { TranslateService } from './translate.service';

export function localizeNavSections(sections: NavSection[], i18n: TranslateService): NavSection[] {
  for (const section of sections) {
    section.label = i18n.t(`docs.nav.section.${section.id}`);
    localizeNavItems(section.items, i18n);
  }
  return sections;
}

function localizeNavItems(items: NavLeaf[], i18n: TranslateService): void {
  for (const item of items) {
    item.label = i18n.t(`docs.nav.${item.id}`);
    if (item.children?.length) {
      localizeNavItems(item.children, i18n);
    }
  }
}
