import { Component, inject } from '@angular/core';
import { UiStateService } from '../shared/ui-state.service';

@Component({
  selector: 'app-toast',
  template: `
    @if (ui.toast(); as message) {
      <div class="toast glass" role="status">
        <span class="dot"></span>{{ message }}
      </div>
    }
  `,
  styles: `
    .toast {
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      background: var(--surface-strong);
      box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.25);
      animation: up 0.35s var(--ease);
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
    }
    @keyframes up {
      from {
        opacity: 0;
        transform: translate(-50%, 20px);
      }
    }
  `,
})
export class Toast {
  protected readonly ui = inject(UiStateService);
}
