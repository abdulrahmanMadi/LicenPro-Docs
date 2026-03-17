import { Component } from '@angular/core';

@Component({
  selector: 'app-sdk-dotnet',
  standalone: true,
  template: `
    <div class="doc-page">
      <h1>.NET SDK</h1>
      <p class="lead">Integrate license validation into your .NET applications.</p>
      <h2>Installation</h2>
      <p>Install via NuGet:</p>
      <code>dotnet add package LicenPro.SDK</code>
      <h2>Quick Start</h2>
      <pre><code>using LicenPro.SDK;

var validator = new LicenseValidator(publicKey);
var license = validator.Validate(licenseFile);</code></pre>
    </div>
  `,
  styles: [`.doc-page { max-width: 800px; } h1 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h1 { color: #f1f5f9; } h2 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: var(--foreground, #0f172a); } [data-bs-theme="dark"] h2 { color: #e2e8f0; } .lead { font-size: 1.125rem; color: var(--muted-foreground, #64748b); margin-bottom: 2rem; } p { color: var(--foreground, #0f172a); line-height: 1.6; margin-bottom: 1rem; } [data-bs-theme="dark"] p { color: #cbd5e1; } code { display: block; background: var(--muted, #f1f5f9); padding: 0.75rem 1rem; border-radius: 4px; font-family: monospace; margin: 1rem 0; } [data-bs-theme="dark"] code { background: rgba(30, 41, 59, 0.8); } pre { background: var(--muted, #f1f5f9); padding: 1rem; border-radius: 6px; overflow-x: auto; } [data-bs-theme="dark"] pre { background: rgba(30, 41, 59, 0.8); } pre code { background: transparent; padding: 0; margin: 0; }`]
})
export class SdkDotnetComponent {}
