import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="doc-page">
      <h1 class="text-accent">LicenPro Documentation</h1>
      <p class="lead">Everything you need to integrate professional software licensing into your applications.</p>
      
      <div class="doc-cards">
        <a routerLink="/quick-start" class="doc-card">
          <i class="ki-outline ki-rocket"></i>
          <h3>Quick Start</h3>
          <p>Get up and running in minutes</p>
        </a>
        <a routerLink="/first-product" class="doc-card">
          <i class="ki-outline ki-abstract-26"></i>
          <h3>First Product</h3>
          <p>Learn how to define products</p>
        </a>
        <a routerLink="/perpetual-license" class="doc-card">
          <i class="ki-outline ki-key"></i>
          <h3>Models</h3>
          <p>Explore licensing strategies</p>
        </a>
        <a routerLink="/sdk-dotnet" class="doc-card">
          <i class="ki-outline ki-microsoft"></i>
          <h3>SDKs</h3>
          <p>Integrate with your codebase</p>
        </a>
      </div>

      <div class="getting-help">
        <h2>Need help?</h2>
        <p>Our technical team is available to help you with your integration requirements.</p>
        <div class="help-links">
          <a href="https://licenpro.tech/support" class="help-item">
            <i class="ki-outline ki-support"></i>
            <span>Support Center</span>
          </a>
          <a href="https://github.com/LicenPro" class="help-item">
            <i class="ki-outline ki-github"></i>
            <span>GitHub Community</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doc-page {
      animation: fadeIn 0.4s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .lead {
      font-size: 1.25rem;
      color: var(--muted-foreground);
      margin-bottom: 3rem;
      max-width: 600px;
    }

    .doc-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
      margin-bottom: 4rem;
    }

    .doc-card {
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        border-color: var(--primary);
        transform: translateY(-4px);
        box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        
        [data-bs-theme="dark"] & {
           box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }
      }

      i {
        font-size: 1.75rem;
        color: var(--primary);
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: var(--foreground);
      }

      p {
        font-size: 0.875rem;
        color: var(--muted-foreground);
        margin: 0;
        line-height: 1.4;
      }
    }

    .getting-help {
      padding: 2rem;
      background: var(--sidebar-bg);
      border-radius: 12px;
      border: 1px solid var(--border);

      h2 { margin-top: 0; }
      
      .help-links {
        display: flex;
        gap: 2rem;
        margin-top: 1.5rem;
      }

      .help-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9375rem;

        &:hover { text-decoration: underline; }
      }
    }
  `]
})
export class HomeComponent {}
