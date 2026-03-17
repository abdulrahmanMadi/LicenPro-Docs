import { Component } from '@angular/core';

@Component({
  selector: 'app-rsa-keys',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>RSA Keys</h1>
      <p class="lead">Understanding RSA key management in LicenPro.</p>
      
      <h2>Key Pairs</h2>
      <p>Each product uses RSA key pairs for secure license signing:</p>
      <ul>
        <li><strong>Private Key</strong> - Stored securely on the server, used to sign licenses</li>
        <li><strong>Public Key</strong> - Embedded in your application, used to verify licenses</li>
      </ul>
      
      <h2>Generating Keys</h2>
      <p>Keys are automatically generated when you create a product. You can also regenerate keys if needed.</p>
      
      <h2>Key Security</h2>
      <p>Never expose your private key. The public key is safe to distribute with your application.</p>
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
export class RsaKeysComponent {}
