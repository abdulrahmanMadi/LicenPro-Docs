import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslateService } from '../../core/i18n/translate.service';
import { getHomeCards, type HomeCard } from '../../docs/content/home.content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <div class="doc-page">
      <h1 class="text-accent">{{ 'docs.home.title' | t }}</h1>
      <p class="lead" [innerHTML]="leadHtml()"></p>

      <div class="doc-cards">
        @for (card of cards(); track card.route) {
          <a [routerLink]="card.route" class="doc-card">
            <i class="ki-outline {{ card.icon }}"></i>
            <h3>{{ card.titleKey | t }}</h3>
            <p>{{ card.descKey | t }}</p>
          </a>
        }
      </div>

      <div class="getting-help">
        <h2>{{ 'docs.home.help.title' | t }}</h2>
        <p>{{ 'docs.home.help.lead' | t }}</p>
        <div class="help-links">
          <a href="https://licenpro.tech/support" class="help-item">
            <i class="ki-outline ki-support"></i>
            <span>{{ 'docs.home.help.support' | t }}</span>
          </a>
          <a href="https://github.com/LicenPro" class="help-item">
            <i class="ki-outline ki-github"></i>
            <span>{{ 'docs.home.help.github' | t }}</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doc-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
      margin-bottom: 4rem;
    }

    @media (max-width: 480px) {
      .doc-cards {
        grid-template-columns: 1fr;
      }
    }

    .doc-card {
      display: grid;
      grid-template-columns: 48px 1fr;
      grid-template-rows: auto 1fr;
      column-gap: 1rem;
      row-gap: 0.3rem;
      align-items: start;
      min-width: 0;
      padding: 1.25rem 1.3rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      text-decoration: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          border-color: var(--primary);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
          transform: translateY(-2px);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }

      > i:first-of-type {
        grid-column: 1;
        grid-row: 1 / span 2;
        align-self: center;
        justify-self: center;
        width: 48px;
        height: 48px;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.35rem;
        line-height: 1;
        border-radius: 11px;
        background: color-mix(in srgb, var(--primary) 14%, transparent);
        border: 1px solid color-mix(in srgb, var(--primary) 28%, var(--border));
        color: var(--primary);
      }

      h3 {
        grid-column: 2;
        grid-row: 1;
        font-size: 1rem;
        font-weight: 600;
        margin: 0;
        padding-top: 2px;
        color: var(--foreground);
        letter-spacing: -0.02em;
        line-height: 1.3;
      }

      p {
        grid-column: 2;
        grid-row: 2;
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.5;
      }
    }

    .getting-help {
      padding: 2rem;
      background: var(--sidebar-bg);
      border-radius: 12px;
      border: 1px solid var(--border);

      h2 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        font-size: 1.1875rem;
        border-bottom: none;
        padding-bottom: 0;
      }

      p {
        margin: 0 0 0.5rem;
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.6;
      }

      .help-links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 2rem;
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
  `],
})
export class HomeComponent {
  private readonly i18n = inject(TranslateService);
  readonly cards = signal<HomeCard[]>(getHomeCards());
  readonly leadHtml = signal('');

  constructor() {
    effect(() => {
      void this.i18n.tick();
      this.leadHtml.set(this.i18n.t('docs.home.lead'));
    });
  }
}
