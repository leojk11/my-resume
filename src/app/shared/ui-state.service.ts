import { Injectable, signal } from '@angular/core';

/** App-wide UI state: command palette, toasts. */
@Injectable({ providedIn: 'root' })
export class UiStateService {
  readonly paletteOpen = signal(false);
  readonly toast = signal<string | null>(null);

  private toastTimer?: ReturnType<typeof setTimeout>;

  notify(message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(null), 2400);
  }

  async copy(text: string, label = 'Copied to clipboard'): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.notify(label);
    } catch {
      this.notify('Copy failed');
    }
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
