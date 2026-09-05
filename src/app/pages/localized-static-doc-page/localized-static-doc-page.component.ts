import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '../../core/i18n/translate.service';
import { getStaticPageHtml } from '../../docs/content/static-pages.registry';

/** Renders locale-specific static documentation HTML from the content registry. */
@Component({
  selector: 'app-localized-static-doc-page',
  standalone: true,
  template: `<div class="help-page localized-static-doc" [innerHTML]="htmlSafe()" (click)="onClick($event)"></div>`,
})
export class LocalizedStaticDocPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly i18n = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly htmlSafe = signal<SafeHtml>('');

  constructor() {
    this.applyContent();
    effect(() => {
      void this.i18n.tick();
      this.applyContent();
    });
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.applyContent());
  }

  private applyContent(): void {
    const pageId = this.route.snapshot.data['pageId'] as string;
    const html = getStaticPageHtml(pageId, this.i18n.locale());
    this.htmlSafe.set(this.sanitizer.bypassSecurityTrustHtml(html));
  }

  onClick(event: MouseEvent): void {
    const el = (event.target as HTMLElement | null)?.closest?.('a');
    if (!el) return;
    const href = el.getAttribute('href');
    if (!href || href.startsWith('//') || href.startsWith('http')) return;
    if (href.startsWith('/assets/')) return;
    if (!href.startsWith('/')) return;
    event.preventDefault();
    void this.router.navigateByUrl(href);
  }
}
