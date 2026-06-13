import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  Injector,
  PLATFORM_ID,
  signal,
  effect,
  afterNextRender,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import {
  Router,
  RouterOutlet,
  RouterLink,
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

export interface TocEntry {
  id: string;
  label: string;
  level: number;
}

@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './docs-layout.component.html',
  styleUrls: ['./docs-layout.component.scss'],
})
export class DocsLayoutComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

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

  /** Right-rail table of contents (built from headings in the main column). */
  readonly tocEntries = signal<TocEntry[]>([]);
  readonly activeTocId = signal<string | null>('top');

  private tocScrollCleanup: (() => void) | null = null;
  private tocIntersectionObserver: IntersectionObserver | null = null;
  private contentMutationObserver: MutationObserver | null = null;
  private contentObserverRoot: HTMLElement | null = null;
  private tocMutationDebounce: ReturnType<typeof setTimeout> | null = null;

  /** Main column scroll container (see template `#docsScrollRoot`). */
  private readonly docsScrollRootEl = viewChild<ElementRef<HTMLElement>>('docsScrollRoot');

  /** Collapsed sidebar branches (nested API groups), keyed by `NavLeaf.id`. */
  readonly collapsedNavBranchIds = signal<Set<string>>(new Set());

  /** Collapsed top-level sections (OVERVIEW, …), keyed by `guides:sectionId` / `api:sectionId`. */
  readonly collapsedSectionKeys = signal<Set<string>>(new Set());

  readonly imageLightboxOpen = signal(false);
  readonly imageLightboxSrc = signal('');
  readonly imageLightboxAlt = signal('');

  constructor() {
    this.resetNavClones();
    this.applyUrlToNavMode(this.router.url);
    this.initSectionCollapseState();
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
          this.closeImageLightbox();
          queueMicrotask(() => this.scrollDocsPanesToTop());
          const url = this.router.url;
          const prevMode = this.navMode();
          this.applyUrlToNavMode(url);
          if (this.navMode() !== prevMode) {
            this.initSectionCollapseState();
          }
          this.breadcrumbSegments.set(buildBreadcrumbSegments(url));
          this.expandNavForCurrentUrl();
          this.scheduleTocRefresh();
        });
    }

    this.destroyRef.onDestroy(() => {
      this.tocScrollCleanup?.();
      this.tocScrollCleanup = null;
      this.disposeInnerContentObserver();
    });

    if (this.isBrowser) {
      queueMicrotask(() => {
        this.scheduleTocRefresh();
        this.expandNavForCurrentUrl();
      });
    }
  }

  get searchHitCount(): number {
    return this.searchQuery.trim() ? this.flattenedItems.length : 0;
  }

  @HostListener('document:keydown.escape')
  onEscapeCloseLightbox(): void {
    if (this.imageLightboxOpen()) {
      this.closeImageLightbox();
    }
  }

  onDocsContentClick(event: MouseEvent): void {
    const trigger = (event.target as HTMLElement | null)?.closest?.('[data-doc-image-lightbox]');
    if (!trigger) return;
    const src = trigger.getAttribute('data-doc-image-lightbox');
    const alt = trigger.getAttribute('data-doc-image-alt') ?? '';
    if (!src) return;
    event.preventDefault();
    event.stopPropagation();
    this.imageLightboxSrc.set(src);
    this.imageLightboxAlt.set(alt);
    this.imageLightboxOpen.set(true);
  }

  closeImageLightbox(): void {
    this.imageLightboxOpen.set(false);
    this.imageLightboxSrc.set('');
    this.imageLightboxAlt.set('');
  }

  private scheduleTocRefresh(): void {
    if (!this.isBrowser) return;
    // Headings come from routed views (e.g. `[innerHTML]` on doc-topic). NavigationEnd can fire
    // before that DOM exists; afterNextRender runs after the next completed render pass.
    afterNextRender(
      () => {
        this.refreshTocFromDom();
        setTimeout(() => this.refreshTocFromDom(), 120);
        setTimeout(() => this.refreshTocFromDom(), 400);
      },
      { injector: this.injector }
    );
  }

  /** Fires when a lazy route component is attached — innerHTML topics often land right after. */
  onDocsOutletActivate(): void {
    if (!this.isBrowser) return;
    this.scheduleTocRefresh();
  }

  private getScrollRoot(): HTMLElement | null {
    return (
      this.docsScrollRootEl()?.nativeElement ?? (document.querySelector('.docs-content') as HTMLElement | null)
    );
  }

  private getContentInner(): HTMLElement | null {
    return document.querySelector('.docs-content-inner') as HTMLElement | null;
  }

  private disposeInnerContentObserver(): void {
    this.contentMutationObserver?.disconnect();
    this.contentMutationObserver = null;
    this.contentObserverRoot = null;
    if (this.tocMutationDebounce) {
      clearTimeout(this.tocMutationDebounce);
      this.tocMutationDebounce = null;
    }
  }

  private ensureInnerContentObserver(inner: HTMLElement): void {
    if (!this.isBrowser) return;
    if (this.contentObserverRoot === inner && this.contentMutationObserver) {
      return;
    }
    this.contentMutationObserver?.disconnect();
    this.contentObserverRoot = inner;
    this.contentMutationObserver = new MutationObserver(() => this.queueTocRefreshFromDomMutation());
    this.contentMutationObserver.observe(inner, { childList: true, subtree: true });
  }

  private queueTocRefreshFromDomMutation(): void {
    if (!this.isBrowser) return;
    if (this.tocMutationDebounce) {
      clearTimeout(this.tocMutationDebounce);
    }
    this.tocMutationDebounce = setTimeout(() => {
      this.tocMutationDebounce = null;
      this.refreshTocFromDom();
    }, 80);
  }

  private slugifyHeading(text: string): string {
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return base || 'section';
  }

  private refreshTocFromDom(): void {
    if (!this.isBrowser) return;
    const root = this.getContentInner();
    if (!root) {
      this.tocScrollCleanup?.();
      this.tocScrollCleanup = null;
      this.tocIntersectionObserver?.disconnect();
      this.tocIntersectionObserver = null;
      this.disposeInnerContentObserver();
      this.tocEntries.set([]);
      this.activeTocId.set('top');
      return;
    }

    this.ensureInnerContentObserver(root);

    const headings = root.querySelectorAll('h2, h3');
    const used = new Set<string>();
    const entries: TocEntry[] = [];

    headings.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const tag = node.tagName;
      if (tag !== 'H2' && tag !== 'H3') return;

      let id = node.id?.trim();
      const label = (node.textContent ?? '').trim();
      if (!label) return;

      if (!id) {
        let base = this.slugifyHeading(label);
        id = base;
        let n = 2;
        while (used.has(id) || root.querySelector(`[id="${CSS.escape(id)}"]`)) {
          id = `${base}-${n++}`;
        }
        node.id = id;
      }
      used.add(id);
      entries.push({ id, label, level: tag === 'H2' ? 2 : 3 });
    });

    this.tocScrollCleanup?.();
    this.tocScrollCleanup = null;
    this.tocIntersectionObserver?.disconnect();
    this.tocIntersectionObserver = null;

    if (entries.length === 0) {
      this.tocEntries.set([]);
      this.activeTocId.set('top');
      return;
    }

    this.tocEntries.set(entries.slice(0, 40));
    this.activeTocId.set('top');
    this.setupTocScrollSpy();
  }

  private setupTocScrollSpy(): void {
    if (!this.isBrowser) return;
    this.tocScrollCleanup?.();
    this.tocScrollCleanup = null;
    this.tocIntersectionObserver?.disconnect();
    this.tocIntersectionObserver = null;

    const scrollRoot = this.getScrollRoot();
    const inner = this.getContentInner();
    if (!scrollRoot || !inner || this.tocEntries().length === 0) {
      return;
    }

    let frame = 0;
    const tick = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => this.updateActiveTocFromScroll(scrollRoot, inner));
    };

    scrollRoot.addEventListener('scroll', tick, { passive: true });
    const onResize = () => tick();
    window.addEventListener('resize', onResize, { passive: true });

    const thresholds = [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1];
    this.tocIntersectionObserver = new IntersectionObserver(tick, {
      root: scrollRoot,
      rootMargin: '-96px 0px -62% 0px',
      threshold: thresholds,
    });

    for (const { id } of this.tocEntries()) {
      const h = inner.querySelector(`#${CSS.escape(id)}`);
      if (h) {
        this.tocIntersectionObserver.observe(h);
      }
    }

    this.tocScrollCleanup = () => {
      scrollRoot.removeEventListener('scroll', tick);
      window.removeEventListener('resize', onResize);
      this.tocIntersectionObserver?.disconnect();
      this.tocIntersectionObserver = null;
      cancelAnimationFrame(frame);
    };
    tick();
  }

  private updateActiveTocFromScroll(scrollRoot: HTMLElement, inner: HTMLElement): void {
    const rootRect = scrollRoot.getBoundingClientRect();
    const marker = rootRect.top + 96;
    let current: string | null = 'top';
    for (const { id } of this.tocEntries()) {
      const el = inner.querySelector(`#${CSS.escape(id)}`);
      if (!(el instanceof HTMLElement)) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= marker) {
        current = id;
      } else {
        break;
      }
    }
    this.activeTocId.set(current);
  }

  scrollDocTop(event: Event): void {
    event.preventDefault();
    this.getScrollRoot()?.scrollTo({ top: 0, behavior: 'auto' });
    this.activeTocId.set('top');
  }

  scrollToHeading(event: Event, id: string): void {
    event.preventDefault();
    const inner = this.getContentInner();
    if (!inner) return;
    let el = inner.querySelector(`#${CSS.escape(id)}`);
    if (!(el instanceof HTMLElement)) {
      this.refreshTocFromDom();
      el = inner.querySelector(`#${CSS.escape(id)}`);
    }
    if (!(el instanceof HTMLElement)) return;

    el.scrollIntoView({ behavior: 'auto', block: 'start' });
    this.activeTocId.set(id);
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
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

  private sectionCollapseKey(sectionId: string): string {
    return `${this.navMode()}:${sectionId}`;
  }

  /** Initialise section open/closed from `NavSection.expanded` in config. */
  initSectionCollapseState(): void {
    const next = new Set<string>();
    const sections = this.navMode() === 'guides' ? this.guidesNavSections : this.apiNavSections;
    for (const sec of sections) {
      if (sec.expanded === false) {
        next.add(this.sectionCollapseKey(sec.id));
      }
    }
    this.collapsedSectionKeys.set(next);
  }

  isSectionCollapsed(sectionId: string): boolean {
    return this.collapsedSectionKeys().has(this.sectionCollapseKey(sectionId));
  }

  toggleSectionCollapse(sectionId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const key = this.sectionCollapseKey(sectionId);
    this.collapsedSectionKeys.update((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  /** True when this leaf is the single active nav target (path + fragment exact rules). */
  isNavLeafActive(leaf: NavLeaf): boolean {
    if (!leaf.route) return false;
    const urlPath = this.pathOnly(this.router.url).toLowerCase();
    const routePath = this.pathOnly(leaf.route).toLowerCase();
    if (this.normalizeNavPath(urlPath) !== this.normalizeNavPath(routePath)) {
      return false;
    }
    const tree = this.router.parseUrl(this.router.url);
    const urlFrag = (tree.fragment ?? '').trim();
    const wantFrag = (leaf.fragment ?? '').trim();
    if (wantFrag) {
      return urlFrag === wantFrag;
    }
    return urlFrag === '';
  }

  private normalizeNavPath(p: string): string {
    const s = (p.startsWith('/') ? p : `/${p}`).toLowerCase().replace(/\/+$/, '');
    return s === '' ? '/' : s;
  }

  /** Expand the section and API subgroup that contain the current URL. */
  private expandNavForCurrentUrl(): void {
    const sections = this.navMode() === 'guides' ? this.guidesNavSections : this.apiNavSections;
    for (const sec of sections) {
      for (const item of sec.items) {
        if (item.children?.length) {
          for (const sub of item.children) {
            if (sub.route && this.isNavLeafActive(sub)) {
              this.collapsedNavBranchIds.update((s) => {
                const n = new Set(s);
                n.delete(item.id);
                return n;
              });
              this.collapsedSectionKeys.update((s) => {
                const n = new Set(s);
                n.delete(this.sectionCollapseKey(sec.id));
                return n;
              });
              return;
            }
          }
        } else if (item.route && this.isNavLeafActive(item)) {
          this.collapsedSectionKeys.update((s) => {
            const n = new Set(s);
            n.delete(this.sectionCollapseKey(sec.id));
            return n;
          });
          return;
        }
      }
    }
  }

  selectGuidesTab(): void {
    const path = this.pathOnly(this.router.url);
    if (path.startsWith('/api/')) {
      void this.router.navigateByUrl('/');
    }
    this.navMode.set('guides');
    this.resetNavClones();
    this.initSectionCollapseState();
    this.expandNavForCurrentUrl();
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
    this.initSectionCollapseState();
    this.expandNavForCurrentUrl();
    this.searchQuery = '';
    this.focusedItemIndex = -1;
    this.onSearchChange();
  }

  private scrollDocsPanesToTop(): void {
    this.getScrollRoot()?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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

  isNavBranchCollapsed(itemId: string): boolean {
    return this.collapsedNavBranchIds().has(itemId);
  }

  toggleNavBranch(itemId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.collapsedNavBranchIds.update((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
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

    this.collapsedNavBranchIds.set(new Set());
    this.collapsedSectionKeys.set(new Set());

    this.flattenedItems = [];
    sections.forEach((section) => {
      const sectionMatches = section.label.toLowerCase().includes(query);
      let sectionHasVisible = false;

      section.items.forEach((item) => {
        const itemMatches = item.label.toLowerCase().includes(query);

        if (item.children?.length) {
          let groupHasVisible = false;
          item.children.forEach((sub) => {
            const routeHit = sub.route?.toLowerCase().includes(query) ?? false;
            const subMatches = sub.label.toLowerCase().includes(query) || routeHit;
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
          const routeHit = item.route?.toLowerCase().includes(query) ?? false;
          const leafMatches = item.label.toLowerCase().includes(query) || routeHit;
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
    this.focusedItemIndex = -1;
    this.onSearchChange();
  }

  isItemFocused(item: NavLeaf): boolean {
    if (this.focusedItemIndex < 0 || this.flattenedItems.length === 0) return false;
    return this.flattenedItems[this.focusedItemIndex] === item;
  }
}
