import { Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { I18n, LANGS } from '../i18n/i18n.service';
import { UiStateService } from '../shared/ui-state.service';
import { SECTIONS } from './nav';

interface Command {
  label: string;
  group: string;
  hint?: string;
  run: () => void;
}

/** Ctrl/⌘ + K palette: jump to sections, copy email, open socials. */
@Component({
  selector: 'app-command-palette',
  template: `
    @if (ui.paletteOpen()) {
      <div class="backdrop" (click)="close()"></div>
      <div class="palette glass" role="dialog" [attr.aria-label]="i18n.t('nav.palette')">
        <div class="search">
          <span class="prompt">❯</span>
          <input
            #input
            [placeholder]="i18n.t('palette.placeholder')"
            [value]="query()"
            (input)="query.set(input.value); selected.set(0)"
            (keydown)="onKey($event)"
          />
          <kbd>esc</kbd>
        </div>
        <ul>
          @for (cmd of filtered(); track cmd.label; let i = $index) {
            <li [class.selected]="i === selected()" (mouseenter)="selected.set(i)" (click)="execute(cmd)">
              <span class="group">{{ cmd.group }}</span>
              <span class="label">{{ cmd.label }}</span>
              @if (cmd.hint) {
                <span class="hint">{{ cmd.hint }}</span>
              }
            </li>
          } @empty {
            <li class="empty">{{ i18n.t('palette.empty') }}</li>
          }
        </ul>
        <footer><kbd>↑</kbd><kbd>↓</kbd> {{ i18n.t('palette.navigate') }} <kbd>↵</kbd> {{ i18n.t('palette.run') }}</footer>
      </div>
    }
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 500;
      background: rgba(2, 3, 10, 0.6);
      backdrop-filter: blur(4px);
      animation: fade 0.2s ease-out;
    }
    .palette {
      position: fixed;
      z-index: 501;
      top: 14vh;
      left: 50%;
      width: min(620px, calc(100% - 32px));
      transform: translateX(-50%);
      background: var(--surface-strong);
      box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.6),
        0 0 0 1px rgba(var(--accent-rgb), 0.2),
        0 0 40px rgba(var(--accent-rgb), 0.15);
      overflow: hidden;
      animation: pop 0.25s var(--ease);
    }
    .search {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }
    .prompt {
      color: var(--accent);
      font-family: var(--font-mono);
    }
    input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      color: var(--text);
      font: inherit;
      font-size: 1.05rem;
    }
    kbd {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 6px;
      border: 1px solid var(--border);
      color: var(--muted);
      margin: 0 2px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 8px;
      max-height: 50vh;
      overflow-y: auto;
    }
    li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      cursor: pointer;
      &.selected {
        background: rgba(var(--accent-rgb), 0.1);
        box-shadow: inset 2px 0 0 var(--accent);
      }
      &.empty {
        color: var(--muted);
        cursor: default;
      }
    }
    .group {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      text-transform: uppercase;
      color: var(--accent);
      width: 70px;
    }
    .label {
      flex: 1;
    }
    .hint {
      color: var(--muted);
      font-size: 0.8rem;
    }
    footer {
      padding: 10px 20px;
      border-top: 1px solid var(--border);
      font-size: 0.75rem;
      color: var(--muted);
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-12px) scale(0.97);
      }
    }
  `,
  host: { '(window:keydown)': 'onGlobalKey($event)' },
})
export class CommandPalette {
  protected readonly ui = inject(UiStateService);
  protected readonly i18n = inject(I18n);
  protected readonly query = signal('');
  protected readonly selected = signal(0);
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  private readonly commands = computed<Command[]>(() => {
    const t = this.i18n.t.bind(this.i18n);
    const { profile, socials } = this.i18n.resume();
    return [
      ...SECTIONS.map((s) => ({ group: t('palette.goto'), label: t(s.labelKey), run: () => this.ui.scrollTo(s.id) })),
      { group: t('palette.goto'), label: t('palette.top'), run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      {
        group: t('palette.action'),
        label: t('palette.copyEmail'),
        hint: profile.email,
        run: () => this.ui.copy(profile.email, t('contact.copied')),
      },
      ...(profile.resumeUrl
        ? [{ group: t('palette.action'), label: t('palette.downloadResume'), run: () => window.open(profile.resumeUrl, '_blank') }]
        : []),
      ...LANGS.filter((l) => l.code !== this.i18n.lang()).map((l) => ({
        group: t('palette.language'),
        label: t('palette.switchTo', { name: l.name }),
        run: () => this.i18n.set(l.code),
      })),
      ...socials.map((s) => ({
        group: t('palette.link'),
        label: t('palette.open', { name: s.label }),
        run: () => window.open(s.url, '_blank', 'noopener'),
      })),
    ];
  });

  protected readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.commands();
    return this.commands().filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q));
  });

  constructor() {
    effect(() => {
      if (this.ui.paletteOpen()) {
        this.query.set('');
        this.selected.set(0);
        queueMicrotask(() => this.input()?.nativeElement.focus());
      }
    });
  }

  onGlobalKey(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.ui.paletteOpen.update((v) => !v);
    } else if (e.key === 'Escape' && this.ui.paletteOpen()) {
      this.close();
    }
  }

  onKey(e: KeyboardEvent): void {
    const count = this.filtered().length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selected.update((i) => (i + 1) % Math.max(count, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selected.update((i) => (i - 1 + count) % Math.max(count, 1));
    } else if (e.key === 'Enter') {
      const cmd = this.filtered()[this.selected()];
      if (cmd) this.execute(cmd);
    }
  }

  execute(cmd: Command): void {
    this.close();
    setTimeout(() => cmd.run(), 50);
  }

  close(): void {
    this.ui.paletteOpen.set(false);
  }
}
