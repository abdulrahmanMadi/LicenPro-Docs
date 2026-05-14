import { Component, inject, PLATFORM_ID, signal, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  fragment?: string;
  children?: NavItem[];
  expanded?: boolean;
  visible?: boolean;
  matchedText?: string;
}

@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './docs-layout.component.html',
  styleUrls: ['./docs-layout.component.scss']
})
export class DocsLayoutComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);

  isSidebarOpen = true;
  searchQuery = '';
  focusedItemIndex = -1;
  flattenedItems: NavItem[] = [];

  // Theme management
  currentTheme = signal<'light' | 'dark'>('dark');

  constructor() {
    if (this.isBrowser) {
      const savedTheme = (localStorage.getItem('docs-theme') as 'light' | 'dark') || 'dark';
      this.currentTheme.set(savedTheme);

      // Watch for theme changes and apply
      effect(() => {
        const theme = this.currentTheme();
        document.documentElement.setAttribute('data-bs-theme', theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
      });

      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          takeUntilDestroyed()
        )
        .subscribe(() => {
          queueMicrotask(() => this.scrollDocsPanesToTop());
        });
    }
  }

  /** Main column keeps scroll position between routes; reset so each page starts at the top. */
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

  navItems: NavItem[] = [
    {
      id: 'getting-started',
      label: 'Get Started',
      icon: 'ki-outline ki-rocket',
      expanded: true,
      children: [
        { id: 'quick-start', label: 'Quick Start', icon: 'ki-outline ki-flag', route: '/quick-start' },
        { id: 'vendor-workflow', label: 'Dashboard workflow', icon: 'ki-outline ki-route', route: '/quick-start', fragment: 'vendor-workflow' },
        { id: 'first-product', label: 'Create your first product', icon: 'ki-outline ki-abstract-26', route: '/first-product' },
        { id: 'first-license', label: 'Generate your first license', icon: 'ki-outline ki-key', route: '/first-license' },
        { id: 'rsa-keys', label: 'RSA keys', icon: 'ki-outline ki-shield-tick', route: '/rsa-keys' }
      ]
    },
    {
      id: 'license-models',
      label: 'License models',
      icon: 'ki-outline ki-key-square',
      expanded: true,
      children: [
        { id: 'perpetual', label: 'Perpetual license', icon: 'ki-outline ki-users', route: '/perpetual-license' },
        { id: 'trial', label: 'Trial license', icon: 'ki-outline ki-timer', route: '/trial-license' },
        { id: 'subscription', label: 'Subscription license', icon: 'ki-outline ki-calendar-tick', route: '/subscription-license' },
        { id: 'floating', label: 'Floating license', icon: 'ki-outline ki-people', route: '/floating-license' },
        { id: 'node-locked', label: 'Node-locked license', icon: 'ki-outline ki-lock', route: '/node-locked-license' }
      ]
    },
    {
      id: 'sdk',
      label: 'SDK & integration',
      icon: 'ki-outline ki-programming-browser',
      expanded: false,
      children: [
        { id: 'sdk-dotnet', label: '.NET SDK', icon: 'ki-outline ki-microsoft', route: '/sdk-dotnet' },
        { id: 'sdk-winforms', label: 'WinForms', icon: 'ki-outline ki-windows', route: '/sdk-winforms' },
        { id: 'sdk-wpf', label: 'WPF', icon: 'ki-outline ki-element-11', route: '/sdk-wpf' },
        { id: 'sessions-activations', label: 'Sessions & activations', icon: 'ki-outline ki-chart-line', route: '/sessions-activations' },
        { id: 'webhooks', label: 'Webhooks', icon: 'ki-outline ki-arrow-mix', route: '/webhooks' },
        { id: 'api-reference', label: 'API reference', icon: 'ki-outline ki-data', route: '/api-reference' }
      ]
    },
    {
      id: 'changelog',
      label: 'Changelog',
      icon: 'ki-outline ki-notepad-edit',
      expanded: false,
      children: [
        { id: 'changelog-page', label: 'Releases', icon: 'ki-outline ki-tag', route: '/changelog' }
      ]
    }
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleCategory(item: NavItem) {
    item.expanded = !item.expanded;
  }

  onNavItemClick() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }

  onSearchChange() {
    const query = this.searchQuery.toLowerCase().trim();
    this.focusedItemIndex = -1;

    if (!query) {
      this.navItems.forEach(category => {
        category.visible = true;
        category.matchedText = undefined;
        if (category.children) {
          category.children.forEach(child => {
            child.visible = true;
            child.matchedText = undefined;
          });
        }
      });
      this.flattenedItems = [];
      return;
    }

    this.flattenedItems = [];
    this.navItems.forEach(category => {
      const categoryMatches = category.label.toLowerCase().includes(query);
      let hasVisibleChildren = false;

      if (category.children) {
        category.children.forEach(child => {
          const childMatches = child.label.toLowerCase().includes(query);
          child.visible = childMatches || categoryMatches;
          child.matchedText = child.visible ? this.highlightMatch(child.label, query) : undefined;

          if (child.visible) {
            hasVisibleChildren = true;
            this.flattenedItems.push(child);
          }
        });
      }

      category.visible = categoryMatches || hasVisibleChildren;
      category.matchedText = category.visible ? this.highlightMatch(category.label, query) : undefined;

      if (category.visible && hasVisibleChildren) {
        category.expanded = true;
      }
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
            const link = document.querySelector(`a[href="${item.route}"]`) as HTMLAnchorElement;
            if (link) {
              link.click();
              this.clearSearch();
            }
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
      const focusedElement = document.querySelector('.docs-nav-link.keyboard-focused');
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    }, 0);
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearchChange();
  }

  isItemFocused(item: NavItem): boolean {
    if (this.focusedItemIndex < 0 || this.flattenedItems.length === 0) return false;
    return this.flattenedItems[this.focusedItemIndex] === item;
  }
}
