import { Component, OnInit, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-openapi-embed',
  standalone: true,
  template: `
    <div class="openapi-embed">
      <div class="openapi-toolbar">
        <div class="openapi-meta">
          <span class="openapi-label">OpenAPI</span>
          <code class="openapi-url">{{ specUrl() }}</code>
        </div>
        <div class="openapi-actions">
          <a class="doc-btn" [href]="specUrl()" target="_blank" rel="noopener">Download JSON</a>
          <a class="doc-btn doc-btn-primary" [href]="swaggerUi()" target="_blank" rel="noopener">Open Swagger UI</a>
        </div>
      </div>
      @if (iframeSafe()) {
        <iframe
          class="openapi-frame"
          title="Swagger UI"
          [src]="iframeSafe()!"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      }
      <div class="help-callout warning openapi-note">
        <i class="ki-outline ki-information"></i>
        <div>
          <span class="callout-title">CORS &amp; framing</span>
          <p>
            The iframe loads your Swagger UI page. If the API sets <code>X-Frame-Options</code> or CSP blocks embedding,
            use the <strong>Open Swagger UI</strong> button. For static docs hosting, copy <code>swagger/v1/swagger.json</code>
            into <code>src/assets/openapi/</code> per release and point <code>environment.openApiSpecUrl</code> at that file.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .openapi-embed {
        margin-top: 1.5rem;
      }
      .openapi-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .openapi-meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .openapi-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--muted-foreground);
      }
      .openapi-url {
        font-size: 0.8rem;
        word-break: break-all;
      }
      .openapi-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .doc-btn {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        border-radius: 8px;
        border: 1px solid var(--border);
        font-size: 0.875rem;
        text-decoration: none;
        color: var(--foreground);
      }
      .doc-btn-primary {
        background: var(--primary);
        color: var(--primary-foreground, #fff);
        border-color: transparent;
      }
      .openapi-frame {
        width: 100%;
        min-height: 520px;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--background);
      }
      .openapi-note {
        margin-top: 12px;
      }
    `,
  ],
})
export class OpenapiEmbedComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly sanitizer = inject(DomSanitizer);

  readonly specUrl = signal(environment.openApiSpecUrl);
  readonly swaggerUi = signal(environment.swaggerUiUrl);
  readonly iframeSafe = signal<SafeResourceUrl | null>(null);

  ngOnInit(): void {
    if (!this.isBrowser) return;
    const ui = environment.swaggerUiUrl;
    this.iframeSafe.set(this.sanitizer.bypassSecurityTrustResourceUrl(ui));
  }
}
