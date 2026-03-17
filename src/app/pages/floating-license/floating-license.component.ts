import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-license',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>Floating License</h1>
      <p class="lead">Shared licenses for concurrent usage across multiple machines.</p>
      <h2>Overview</h2>
      <p>Floating licenses allow a set number of concurrent users to share a pool of licenses.</p>
      <h2>Features</h2>
      <ul>
        <li>Concurrent user limits</li>
        <li>Automatic check-in/check-out</li>
        <li>Usage tracking</li>
      </ul>
    </div>
  `,
  styles: [`.doc-page { max-width: 800px; } h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h1 { color: #f1f5f9; } h2 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h2 { color: #e2e8f0; } .lead { font-size: 1.125rem; color: var(--muted-foreground, #64748b); margin-bottom: 2rem; } p { color: var(--foreground, #0f172a); line-height: 1.6; margin-bottom: 1rem; } [data-bs-theme="dark"] p { color: #cbd5e1; } ul { color: var(--foreground, #0f172a); padding-left: 1.5rem; } [data-bs-theme="dark"] ul { color: #cbd5e1; } li { margin-bottom: 0.5rem; }`]
})
export class FloatingLicenseComponent {}
