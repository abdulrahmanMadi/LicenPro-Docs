import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mermaid-chart',
  standalone: true,
  template: `<div class="mermaid-chart" #host [attr.data-chart-id]="chartId"></div>`,
  styles: [
    `
      .mermaid-chart {
        margin: 1.5rem 0;
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--background);
        overflow-x: auto;
      }
    `,
  ],
})
export class MermaidChartComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;

  /** Mermaid diagram definition (without fences). */
  @Input({ required: true }) definition!: string;

  /** Unique id for mermaid.init idempotency */
  @Input() chartId = 'diagram';

  private rendered = false;

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser || !this.definition?.trim()) return;
    const theme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'default';
    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: theme === 'dark' ? 'dark' : 'neutral',
    });
    const id = `mermaid-${this.chartId}-${Math.random().toString(36).slice(2, 9)}`;
    const { svg } = await mermaid.render(id, this.definition);
    this.host.nativeElement.innerHTML = svg;
    this.rendered = true;
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.rendered) {
      this.host.nativeElement.innerHTML = '';
    }
  }
}
