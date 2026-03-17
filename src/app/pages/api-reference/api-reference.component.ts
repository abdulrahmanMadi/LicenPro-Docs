import { Component } from '@angular/core';

@Component({
  selector: 'app-api-reference',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>API Reference</h1>
      <p class="lead">Complete API documentation for LicenPro.</p>
      <h2>Authentication</h2>
      <p>All API requests require an API key in the header.</p>
      <h2>Endpoints</h2>
      <ul>
        <li>GET /api/products - List all products</li>
        <li>POST /api/licenses - Create a license</li>
        <li>GET /api/licenses/:id - Get license details</li>
      </ul>
    </div>
  `,
  styles: [`.doc-page { max-width: 800px; } h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h1 { color: #f1f5f9; } h2 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h2 { color: #e2e8f0; } .lead { font-size: 1.125rem; color: var(--muted-foreground, #64748b); margin-bottom: 2rem; } p { color: var(--foreground, #0f172a); line-height: 1.6; margin-bottom: 1rem; } [data-bs-theme="dark"] p { color: #cbd5e1; } ul { color: var(--foreground, #0f172a); padding-left: 1.5rem; } [data-bs-theme="dark"] ul { color: #cbd5e1; } li { margin-bottom: 0.5rem; font-family: monospace; }`]
})
export class ApiReferenceComponent {}
