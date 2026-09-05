import { Component, effect, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MermaidChartComponent } from '../../components/mermaid-chart/mermaid-chart.component';
import { TranslateService } from '../../core/i18n/translate.service';
import { getApiOverviewParts } from '../../docs/content/static-pages.registry';

@Component({
  selector: 'app-api-overview',
  standalone: true,
  imports: [MermaidChartComponent],
  template: `
    <div class="help-page" (click)="onClick($event)">
      <div [innerHTML]="beforeSafe()"></div>
      <app-mermaid-chart chartId="system-context" [definition]="systemContextDef" />
      <div [innerHTML]="midSafe()"></div>
      <app-mermaid-chart chartId="license-lifecycle" [definition]="licenseLifecycleDef" />
      <div [innerHTML]="afterSafe()"></div>
    </div>
  `,
})
export class ApiOverviewComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly i18n = inject(TranslateService);
  private readonly router = inject(Router);

  readonly beforeSafe = signal<SafeHtml>('');
  readonly midSafe = signal<SafeHtml>('');
  readonly afterSafe = signal<SafeHtml>('');

  readonly systemContextDef = `flowchart LR
    subgraph vendor [Vendor]
      Dash[LicenPro_Dashboard]
    end
    subgraph host [Hosted_API]
      API[LicenPro_API]
    end
    subgraph customer [Customer_app]
      SDK[DotNet_SDK]
    end
    Dash -->|Bearer_JWT| API
    SDK -->|X_API_KEY_or_JWT| API
    API -->|signed_artifacts| SDK`;

  readonly licenseLifecycleDef = `flowchart LR
    A[Create_license] --> B[Sign_license_bin]
    B --> C[Distribute_to_customer]
    C --> D[SDK_validate_online_or_offline]
    D --> E{Revoked_or_refreshed?}
    E -->|refresh| B
    E -->|revoke| F[Block_validation]`;

  constructor() {
    effect(() => {
      void this.i18n.tick();
      const parts = getApiOverviewParts(this.i18n.locale());
      this.beforeSafe.set(this.sanitizer.bypassSecurityTrustHtml(parts.beforeSystemChart));
      this.midSafe.set(this.sanitizer.bypassSecurityTrustHtml(parts.betweenCharts));
      this.afterSafe.set(this.sanitizer.bypassSecurityTrustHtml(parts.afterLifecycleChart));
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
