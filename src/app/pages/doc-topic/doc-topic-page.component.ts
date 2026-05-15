import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getPlatformTopic } from '../../docs/content/platform-guides.content';
import { getApiTopic } from '../../docs/content/api-topics.content';
import { getSdkTopic } from '../../docs/content/sdk-topics.content';

@Component({
  selector: 'app-doc-topic-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-topic-page.component.html',
  styleUrls: ['./doc-topic-page.component.scss'],
})
export class DocTopicPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  readonly title = signal('');
  readonly leadSafe = signal<SafeHtml | null>(null);
  readonly bodySafe = signal<SafeHtml | null>(null);
  readonly notFound = signal(false);

  readonly imageLightboxOpen = signal(false);
  readonly imageLightboxSrc = signal('');
  readonly imageLightboxAlt = signal('');

  constructor() {
    this.applyRoute();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.applyRoute());
  }

  @HostListener('document:keydown.escape')
  onEscapeCloseLightbox(): void {
    if (this.imageLightboxOpen()) {
      this.closeImageLightbox();
    }
  }

  private applyRoute(): void {
    this.closeImageLightbox();
    const kind = this.route.snapshot.data['docKind'] as 'platform' | 'api' | 'sdk';
    const slug = this.route.snapshot.paramMap.get('topic') ?? '';
    const topic =
      kind === 'platform' ? getPlatformTopic(slug) : kind === 'api' ? getApiTopic(slug) : getSdkTopic(slug);
    if (!topic) {
      this.title.set('Page not found');
      this.leadSafe.set(null);
      this.bodySafe.set(null);
      this.notFound.set(true);
      return;
    }
    this.notFound.set(false);
    this.title.set(topic.title);
    this.leadSafe.set(topic.lead ? this.sanitizer.bypassSecurityTrustHtml(topic.lead) : null);
    this.bodySafe.set(this.sanitizer.bypassSecurityTrustHtml(topic.body));
  }

  onArticleClick(event: MouseEvent): void {
    const trigger = (event.target as HTMLElement | null)?.closest?.('[data-doc-image-lightbox]');
    if (trigger) {
      const src = trigger.getAttribute('data-doc-image-lightbox');
      const alt = trigger.getAttribute('data-doc-image-alt') ?? '';
      if (src) {
        event.preventDefault();
        event.stopPropagation();
        this.imageLightboxSrc.set(src);
        this.imageLightboxAlt.set(alt);
        this.imageLightboxOpen.set(true);
        return;
      }
    }
    this.onAnchorClick(event);
  }

  closeImageLightbox(): void {
    this.imageLightboxOpen.set(false);
    this.imageLightboxSrc.set('');
    this.imageLightboxAlt.set('');
  }

  private onAnchorClick(event: MouseEvent): void {
    const el = (event.target as HTMLElement | null)?.closest?.('a');
    if (!el) return;
    const href = el.getAttribute('href');
    if (!href || href.startsWith('//')) return;
    if (href.startsWith('/assets/')) return;
    if (!href.startsWith('/')) return;
    event.preventDefault();
    void this.router.navigateByUrl(href);
  }

  goHome(event: Event): void {
    event.preventDefault();
    void this.router.navigateByUrl('/');
  }
}
