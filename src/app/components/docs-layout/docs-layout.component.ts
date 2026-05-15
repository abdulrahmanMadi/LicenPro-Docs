import { Component, DestroyRef, inject, PLATFORM_ID, signal, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import {
  GUIDES_NAV,
  API_NAV,
  type NavLeaf,
  type NavSection,
} from '../../docs/docs-nav.config';
import { buildBreadcrumbSegments, type BreadcrumbSegment } from '../../docs/docs-breadcrumb';

@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './docs-layout.component.html',
  styleUrls: ['./docs-layout.component.scss'],
})
export class DocsLayoutComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  isSidebarOpen = true;
  searchQuery = '';
  focusedItemIndex = -1;
  flattenedItems: NavLeaf[] = [];

  /** Guides vs API Reference (Geidea-style); synced from URL on navigation. */
  readonly navMode = signal<'guides' | 'api'>('guides');

  readonly breadcrumbSegments = signal<BreadcrumbSegment[]>([]);

  guidesNavSections: NavSection[] = [];
  apiNavSections: NavSection[] = [];

  currentTheme = signal<'light' | 'dark'>('dark');

  constructor() {
    this.resetNavClones();
    this.applyUrlToNavMode(this.router.url);
    this.breadcrumbSegments.set(buildBreadcrumbSegments(this.router.url));

    if (this.isBrowser) {
      const savedTheme = (localStorage.getItem('docs-theme') as 'light' | 'dark') || 'dark';
      this.currentTheme.set(savedTheme);

      effect(() => {
        const theme = this.currentTheme();
        document.documentElement.setAttribute('data-bs-theme', theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
      });

      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          queueMicrotask(() => this.scrollDocsPanesToTop());
          const url = this.router.url;
          this.applyUrlToNavMode(url);
          this.breadcrumbSegments.set(buildBreadcrumbSegments(url));
        });
    }
  }

  get displayNavSections(): NavSection[] {
    return this.navMode() === 'guides' ? this.guidesNavSections : this.apiNavSections;
  }

  get searchPlaceholder(): string {
    return this.navMode() === 'api' ? 'Search API topics…' : 'Search documentation…';
  }

  private pathOnly(url: string): string {
    return (url.split('?')[0].split('#')[0] || '/').replace(/\/+$/, '') || '/';
  }

  private applyUrlToNavMode(url: string): void {
    const path = this.pathOnly(url).toLowerCase();
    const isApi = path === '/api' || path.startsWith('/api/');
    this.navMode.set(isApi ? 'api' : 'guides');
  }

  private resetNavClones(): void {
    this.guidesNavSections = JSON.parse(JSON.stringify(GUIDES_NAV)) as NavSection[];
    this.apiNavSections = JSON.parse(JSON.stringify(API_NAV)) as NavSection[];
  }

  selectGuidesTab(): void {
    const path = this.pathOnly(this.router.url);
    if (path.startsWith('/api/')) {
      void this.router.navigateByUrl('/');
    }
    this.navMode.set('guides');
    this.resetNavClones();
    this.searchQuery = '';
    this.focusedItemIndex = -1;
    this.onSearchChange();
  }

  selectApiTab(): void {
    const path = this.pathOnly(this.router.url);
    if (!path.startsWith('/api/')) {
      void this.router.navigateByUrl('/api/overview');
    }
    this.navMode.set('api');
    this.resetNavClones();
    this.searchQuery = '';
    this.focusedItemIndex = -1;
    this.onSearchChange();
  }

  private scrollDocsPanesToTop(): void {
    document.querySelector('.docs-content')?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.querySelector('.docs-toc')?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(newTheme);
    if (this.isBrowser) {
      localStorage.setItem('docs-theme', newTheme);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onNavItemClick() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.focusedItemIndex = -1;
    const sections = this.displayNavSections;

    if (!query) {
      sections.forEach((section) => {
        section.visible = true;
        section.matchedText = undefined;
        section.items.forEach((item) => {
          item.visible = true;
          item.matchedText = undefined;
          item.children?.forEach((sub) => {
            sub.visible = true;
            sub.matchedText = undefined;
          });
        });
      });
      this.flattenedItems = [];
      return;
    }

    this.flattenedItems = [];
    sections.forEach((section) => {
      const sectionMatches = section.label.toLowerCase().includes(query);
      let sectionHasVisible = false;

      section.items.forEach((item) => {
        const itemMatches = item.label.toLowerCase().includes(query);

        if (item.children?.length) {
          let groupHasVisible = false;
          item.children.forEach((sub) => {
            const subMatches = sub.label.toLowerCase().includes(query);
            sub.visible = subMatches || itemMatches || sectionMatches;
            sub.matchedText = sub.visible ? this.highlightMatch(sub.label, query) : undefined;
            if (sub.visible) {
              groupHasVisible = true;
              this.flattenedItems.push(sub);
            }
          });
          item.visible = itemMatches || groupHasVisible || sectionMatches;
          item.matchedText = item.visible ? this.highlightMatch(item.label, query) : undefined;
          if (item.visible) sectionHasVisible = true;
        } else {
          const leafMatches = item.label.toLowerCase().includes(query);
          item.visible = leafMatches || sectionMatches;
          item.matchedText = item.visible ? this.highlightMatch(item.label, query) : undefined;
          if (item.visible && item.route) {
            sectionHasVisible = true;
            this.flattenedItems.push(item);
          }
        }
      });

      section.visible = sectionMatches || sectionHasVisible;
      section.matchedText = section.visible ? this.highlightMatch(section.label, query) : undefined;
    });
  }

  highlightMatch(text: string, query: string): string {
    const safe = this.escapeHtml(text);
    if (!query) return safe;
    const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
    return safe.replace(regex, '<mark>$1</mark>');
  }

  private escapeHtml(value: string): string {
    if (!value) return '';
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (this.flattenedItems.length === 0) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedItemIndex = Math.min(this.focusedItemIndex + 1, this.flattenedItems.length - 1);
        this.scrollToFocusedItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedItemIndex = Math.max(this.focusedItemIndex - 1, 0);
        this.scrollToFocusedItem();
        break;
      case 'Enter':
        event.preventDefault();
        if (this.focusedItemIndex >= 0 && this.focusedItemIndex < this.flattenedItems.length) {
          const item = this.flattenedItems[this.focusedItemIndex];
          if (item.route) {
            void this.router.navigate([item.route], { fragment: item.fragment || undefined });
            this.clearSearch();
          }
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.clearSearch();
        break;
    }
  }

  scrollToFocusedItem() {
    setTimeout(() => {
      document.querySelector('.docs-nav-link.keyboard-focused')?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
    }, 0);
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearchChange();
  }

  isItemFocused(item: NavLeaf): boolean {
    if (this.focusedItemIndex < 0 || this.flattenedItems.length === 0) return false;
    return this.flattenedItems[this.focusedItemIndex] === item;
  }
}
