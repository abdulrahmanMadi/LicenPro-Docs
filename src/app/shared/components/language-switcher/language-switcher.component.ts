import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { LocaleService } from '../../../core/i18n/locale.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { AppLocale } from '../../../core/i18n/locale.types';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [NgClass, TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly localeService = inject(LocaleService);
  readonly open = signal(false);

  toggle(event: Event): void {
    event.stopPropagation();
    this.open.update((v) => !v);
  }

  select(code: AppLocale, event: Event): void {
    event.stopPropagation();
    this.localeService.setLocale(code);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }
    const target = event.target;
    if (target instanceof Node && !this.host.nativeElement.contains(target)) {
      this.open.set(false);
    }
  }
}
