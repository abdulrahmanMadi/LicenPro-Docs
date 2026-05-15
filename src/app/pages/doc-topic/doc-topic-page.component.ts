import { Component, DestroyRef, inject, signal } from '@angular/core';
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

  constructor() {
    this.applyRoute();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.applyRoute());
  }

  private applyRoute(): void {
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

  onAnchorClick(event: MouseEvent): void {
    const el = (event.target as HTMLElement | null)?.closest?.('a');
    if (!el) return;
    const href = el.getAttribute('href');
    if (!href || !href.startsWith('/') || href.startsWith('//')) return;
    event.preventDefault();
    void this.router.navigateByUrl(href);
  }

  goHome(event: Event): void {
    event.preventDefault();
    void this.router.navigateByUrl('/');
  }
}
