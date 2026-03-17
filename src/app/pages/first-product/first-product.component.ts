import { Component } from '@angular/core';

@Component({
  selector: 'app-first-product',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>Create Your First Product</h1>
      <p class="lead">Learn how to define and configure a product in LicenPro.</p>
      
      <h2>What is a Product?</h2>
      <p>A product represents your software application that you want to license. Each product has its own set of features, RSA keys, and license configurations.</p>
      
      <h2>Creating a Product</h2>
      <ol>
        <li>Go to Dashboard → Products</li>
        <li>Click "Add New Product"</li>
        <li>Enter product name and description</li>
        <li>Configure product features</li>
        <li>Generate RSA key pairs</li>
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
    ol { color: var(--foreground, #0f172a); padding-left: 1.5rem; }
    [data-bs-theme="dark"] ol { color: #cbd5e1; }
    li { margin-bottom: 0.5rem; }
  `]
})
export class FirstProductComponent {}
