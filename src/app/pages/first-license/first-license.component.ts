import { Component } from '@angular/core';

@Component({
  selector: 'app-first-license',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>Generate Your First License</h1>
      <p class="lead">Create and distribute licenses to your customers.</p>
      
      <h2>License Types</h2>
      <p>LicenPro supports multiple license types:</p>
      <ul>
        <li><strong>Perpetual</strong> - One-time purchase, lifetime access</li>
        <li><strong>Trial</strong> - Time-limited evaluation licenses</li>
        <li><strong>Subscription</strong> - Recurring billing with expiration</li>
        <li><strong>Floating</strong> - Shared licenses across multiple machines</li>
        <li><strong>Node-locked</strong> - Tied to specific hardware</li>
      </ul>
      
      <h2>Creating a License</h2>
      <ol>
        <li>Select a product</li>
        <li>Choose license type</li>
        <li>Configure features and constraints</li>
        <li>Set expiration (if applicable)</li>
        <li>Generate and download</li>
      </ol>
    </div>
  `,
  styles: [`
    .doc-page { max-width: 800px; }
    h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: var(--foreground, #0f172a); }
    [data-bs-theme="dark"] h1 { color: #f1f5f9; }
    h2 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: var(--foreground, #0f172a); }
    [data-bs-theme="dark"] h2 { color: #e2e8f0; }
    .lead { font-size: 1.125rem; color: var(--muted-foreground, #64748b); margin-bottom: 2rem; }
    p { color: var(--foreground, #0f172a); line-height: 1.6; margin-bottom: 1rem; }
    [data-bs-theme="dark"] p { color: #cbd5e1; }
    ul, ol { color: var(--foreground, #0f172a); padding-left: 1.5rem; }
    [data-bs-theme="dark"] ul, [data-bs-theme="dark"] ol { color: #cbd5e1; }
    li { margin-bottom: 0.5rem; }
  `]
})
export class FirstLicenseComponent {}
