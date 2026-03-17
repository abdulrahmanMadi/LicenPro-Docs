import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-start',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>Quick Start</h1>
      <p class="lead">Get up and running with LicenPro in just a few minutes.</p>
      
      <h2>Prerequisites</h2>
      <ul>
        <li>A LicenPro account</li>
        <li>.NET 6.0 or later (for SDK integration)</li>
      </ul>
      
      <h2>Step 1: Create a Product</h2>
      <p>Navigate to the Products section in your dashboard and click "Add Product".</p>
      
      <h2>Step 2: Generate RSA Keys</h2>
      <p>Each product needs RSA key pairs for license signing.</p>
      
      <h2>Step 3: Create a License</h2>
      <p>Generate licenses for your customers with the desired features and constraints.</p>
      
      <h2>Step 4: Integrate the SDK</h2>
      <p>Add the LicenPro SDK to your application and validate licenses.</p>
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
    ul { color: var(--foreground, #0f172a); padding-left: 1.5rem; }
    [data-bs-theme="dark"] ul { color: #cbd5e1; }
    li { margin-bottom: 0.5rem; }
  `]
})
export class QuickStartComponent {}
