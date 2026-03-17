import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="doc-page">
      <h1>Welcome to LicenPro Documentation</h1>
      <p class="lead">Get started with LicenPro licensing system. Choose a topic from the sidebar or explore the quick links below.</p>
      
      <div class="doc-cards">
        <a routerLink="/quick-start" class="doc-card">
          <i class="ki-filled ki-rocket"></i>
          <h3>Quick Start</h3>
          <p>Get up and running in minutes</p>
        </a>
        <a routerLink="/first-product" class="doc-card">
          <i class="ki-filled ki-abstract-26"></i>
          <h3>Create Your First Product</h3>
          <p>Learn how to define products</p>
        </a>
        <a routerLink="/first-license" class="doc-card">
          <i class="ki-filled ki-key"></i>
          <h3>Generate Your First License</h3>
          <p>Create and distribute licenses</p>
        </a>
        <a routerLink="/sdk-dotnet" class="doc-card">
          <i class="ki-filled ki-microsoft"></i>
          <h3>.NET SDK</h3>
          <p>Integrate with your application</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .doc-page {
      max-width: 800px;
    }
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--foreground, #0f172a);
    }
    [data-bs-theme="dark"] h1 {
      color: #f1f5f9;
    }
    .lead {
      font-size: 1.125rem;
      color: var(--muted-foreground, #64748b);
      margin-bottom: 2rem;
    }
    .doc-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
    }
    .doc-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem;
      background: var(--card, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    [data-bs-theme="dark"] .doc-card {
      background: rgba(30, 41, 59, 0.6);
      border-color: rgba(51, 65, 85, 0.5);
    }
    .doc-card:hover {
      border-color: #6366f1;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
    }
    .doc-card i {
      font-size: 1.5rem;
      color: #6366f1;
      margin-bottom: 0.75rem;
    }
    .doc-card h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--foreground, #0f172a);
      margin: 0 0 0.25rem 0;
    }
    [data-bs-theme="dark"] .doc-card h3 {
      color: #f1f5f9;
    }
    .doc-card p {
      font-size: 0.875rem;
      color: var(--muted-foreground, #64748b);
      margin: 0;
    }
  `]
})
export class HomeComponent {}
