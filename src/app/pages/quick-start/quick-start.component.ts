import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MermaidChartComponent } from '../../components/mermaid-chart/mermaid-chart.component';
import { TranslateService } from '../../core/i18n/translate.service';
import { getQuickStartParts } from '../../docs/content/static-pages.registry';

@Component({
  selector: 'app-quick-start',
  standalone: true,
  imports: [MermaidChartComponent],
  template: `
    <div class="help-page" (click)="onClick($event)">
      <div [innerHTML]="beforeSafe()"></div>
      <app-mermaid-chart chartId="activation-vs-session" [definition]="activationSessionDef" />
      <div [innerHTML]="afterSafe()"></div>
    </div>
  `,
})
export class QuickStartComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly i18n = inject(TranslateService);
  private readonly router = inject(Router);

  readonly beforeSafe = signal<SafeHtml>('');
  readonly afterSafe = signal<SafeHtml>('');

  readonly activationSessionDef = `flowchart TB
    subgraph online [Online_validation]
      V[POST_Licenses_validate]
    end
    subgraph offline [Offline_validation]
      O[RSA_verify_license_bin]
    end
    subgraph seats [Seat_models]
      A[Activations_table]
      S[Sessions_heartbeat]
    end
    V --> A
    V --> S`;

  constructor() {
    effect(() => {
      void this.i18n.tick();
      const parts = getQuickStartParts(this.i18n.locale());
      this.beforeSafe.set(this.sanitizer.bypassSecurityTrustHtml(parts.beforeMermaid));
      this.afterSafe.set(this.sanitizer.bypassSecurityTrustHtml(parts.afterMermaid));
    });
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
