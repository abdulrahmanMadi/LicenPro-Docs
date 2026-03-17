import { Component } from '@angular/core';

@Component({
  selector: 'app-sessions-activations',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>Sessions & Activations</h1>
      <p class="lead">Track license usage across your customer base.</p>
      <h2>Overview</h2>
      <p>Monitor how licenses are being used with session tracking and activation management.</p>
    </div>
  `,
  styles: [`.doc-page { max-width: 800px; } h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h1 { color: #f1f5f9; } h2 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h2 { color: #e2e8f0; } .lead { font-size: 1.125rem; color: var(--muted-foreground, #64748b); margin-bottom: 2rem; } p { color: var(--foreground, #0f172a); line-height: 1.6; margin-bottom: 1rem; } [data-bs-theme="dark"] p { color: #cbd5e1; }`]
})
export class SessionsActivationsComponent {}
