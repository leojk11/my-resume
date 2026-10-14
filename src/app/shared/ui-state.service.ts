import { Injectable, inject, signal } from '@angular/core';
import { I18n } from '../i18n/i18n.service';

/** App-wide UI state: command palette, toasts. */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  private readonly i18n = inject(I18n);

  readonly paletteOpen = signal(false);
  readonly toast = signal<string | null>(null);

  private toastTimer?: ReturnType<typeof setTimeout>;

  notify(message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(null), 2400);
  }

  async copy(text: string, label = this.i18n.t('toast.copied')): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.notify(label);
    } catch {
      this.notify(this.i18n.t('toast.copyFailed'));
    }
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
