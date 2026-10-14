import { Component, inject, input } from '@angular/core';
import { I18n, LANGS, Lang } from '../i18n/i18n.service';

/**
 * Inline SVG flags — emoji flags don't render on Windows, so draw them.
 * Both use a 2:1 box and are clipped by the host's rounded corners.
 */
@Component({
  selector: 'app-flag',
  template: `
    <svg viewBox="0 0 60 30" aria-hidden="true" focusable="false">
      @switch (code()) {
        @case ('en') {
          <rect width="60" height="30" fill="#012169" />
          <path d="M0 0 60 30M60 0 0 30" stroke="#fff" stroke-width="6" />
          <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" stroke-width="2" />
          <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" />
          <path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6" />
        }
        @case ('mk') {
          <rect width="60" height="30" fill="#d20000" />
          <g fill="#ffe600">
            <path d="M30 15 26 0h8ZM30 15 26 30h8ZM30 15 0 11v8ZM30 15 60 11v8Z" />
            <path d="M30 15 6 0h-6v3ZM30 15 54 0h6v3ZM30 15 0 27v3h6ZM30 15 60 27v3h-6Z" />
            <circle cx="30" cy="15" r="7" />
          </g>
          <circle cx="30" cy="15" r="5.3" fill="#d20000" />
          <circle cx="30" cy="15" r="3.8" fill="#ffe600" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 24px;
      height: 12px;
      border-radius: 2px;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.18);
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Flag {
  readonly code = input.required<Lang>();
}

@Component({
  selector: 'app-lang-switcher',
  imports: [Flag],
  template: `
    <div class="switch" role="group" [attr.aria-label]="i18n.t('lang.label')">
      @for (l of langs; track l.code) {
        <button
          [class.active]="i18n.lang() === l.code"
          [attr.aria-pressed]="i18n.lang() === l.code"
          [title]="l.name"
          (click)="i18n.set(l.code)"
        >
          <app-flag [code]="l.code" />
          <span>{{ l.code }}</span>
        </button>
      }
    </div>
  `,
  styles: `
    .switch {
      display: inline-flex;
      gap: 2px;
      padding: 3px;
      height: 34px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.03);
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0 8px;
      border: none;
      border-radius: 7px;
      background: none;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      text-transform: uppercase;
      cursor: pointer;
      transition:
        color 0.3s,
        background 0.3s;
      app-flag {
        opacity: 0.55;
        transition: opacity 0.3s;
      }
      &:hover {
        color: var(--text);
        app-flag {
          opacity: 0.9;
        }
      }
      &.active {
        color: var(--accent);
        background: rgba(var(--accent-rgb), 0.12);
        app-flag {
          opacity: 1;
        }
      }
    }
    @media (max-width: 420px) {
      button span {
        display: none;
      }
    }
  `,
})
export class LangSwitcher {
  protected readonly i18n = inject(I18n);
  protected readonly langs = LANGS;
}
