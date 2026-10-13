import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RESUME } from '../data/resume.data';
import { Icon } from '../shared/icon';
import { UiStateService } from '../shared/ui-state.service';

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
];

@Component({
  selector: 'app-nav',
  imports: [Icon],
  template: `
    <div class="progress" [style.transform]="'scaleX(' + progress() + ')'"></div>
    <nav class="glass" [class.scrolled]="scrolled()">
      <a class="logo" href="#top" (click)="go($event, 'top')">
        <span class="bracket">&lt;</span>{{ initials }}<span class="bracket">/&gt;</span>
      </a>

      <ul [class.open]="menuOpen()">
        @for (s of sections; track s.id; let i = $index) {
          <li>
            <a [href]="'#' + s.id" [class.active]="active() === s.id" (click)="go($event, s.id)">
              <span class="num">0{{ i + 1 }}.</span>{{ s.label }}
            </a>
          </li>
        }
      </ul>

      <div class="actions">
        <button class="kbd" title="Command palette" (click)="ui.paletteOpen.set(true)">
          <app-icon name="command" [size]="14" /> K
        </button>
        <button class="burger" [class.open]="menuOpen()" aria-label="Menu" (click)="menuOpen.set(!menuOpen())">
          <span></span><span></span>
        </button>
      </div>
    </nav>
  `,
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    .progress {
      height: 2px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      transform-origin: left;
    }
    nav {
      margin: 14px auto 0;
      width: min(1180px, calc(100% - 32px));
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      border-radius: 16px;
      background: transparent;
      border-color: transparent;
      backdrop-filter: none;
      transition:
        background 0.4s,
        border-color 0.4s,
        backdrop-filter 0.4s;
      &.scrolled {
        background: var(--surface-strong);
        border-color: var(--border);
        backdrop-filter: blur(16px);
      }
    }
    .logo {
      font-family: var(--font-display);
      font-weight: 700;
      letter-spacing: 0.08em;
      .bracket {
        color: var(--accent);
      }
    }
    ul {
      display: flex;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul a {
      position: relative;
      display: block;
      padding: 8px 12px;
      font-size: 0.88rem;
      color: var(--muted);
      transition: color 0.3s;
      .num {
        font-family: var(--font-mono);
        color: var(--accent);
        font-size: 0.72rem;
        margin-right: 4px;
      }
      &::after {
        content: '';
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 2px;
        height: 1px;
        background: var(--accent);
        transform: scaleX(0);
        transition: transform 0.35s var(--ease);
      }
      &:hover,
      &.active {
        color: var(--text);
      }
      &.active::after {
        transform: scaleX(1);
      }
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .kbd {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 34px;
      padding: 0 10px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.03);
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: var(--accent);
        border-color: rgba(var(--accent-rgb), 0.5);
      }
    }
    .burger {
      display: none;
      width: 34px;
      height: 34px;
      border: none;
      background: none;
      cursor: pointer;
      position: relative;
      span {
        position: absolute;
        left: 7px;
        right: 7px;
        height: 2px;
        background: var(--text);
        transition: transform 0.3s var(--ease);
        &:first-child {
          top: 12px;
        }
        &:last-child {
          top: 20px;
        }
      }
      &.open span:first-child {
        transform: translateY(4px) rotate(45deg);
      }
      &.open span:last-child {
        transform: translateY(-4px) rotate(-45deg);
      }
    }
    @media (max-width: 900px) {
      .burger {
        display: block;
      }
      .kbd {
        display: none;
      }
      ul {
        position: fixed;
        top: 80px;
        left: 16px;
        right: 16px;
        flex-direction: column;
        padding: 16px;
        border-radius: 16px;
        background: var(--surface-strong);
        border: 1px solid var(--border);
        backdrop-filter: blur(16px);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-10px);
        transition: all 0.35s var(--ease);
        &.open {
          opacity: 1;
          pointer-events: auto;
          transform: none;
        }
      }
    }
  `,
})
export class Nav {
  protected readonly ui = inject(UiStateService);
  protected readonly sections = SECTIONS;
  protected readonly initials = RESUME.profile.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  protected readonly progress = signal(0);
  protected readonly scrolled = signal(false);
  protected readonly active = signal('');
  protected readonly menuOpen = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        this.progress.set(max > 0 ? window.scrollY / max : 0);
        this.scrolled.set(window.scrollY > 40);

        const probe = window.innerHeight * 0.35;
        let current = '';
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= probe) current = s.id;
        }
        this.active.set(current);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  go(e: Event, id: string): void {
    e.preventDefault();
    this.menuOpen.set(false);
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else this.ui.scrollTo(id);
  }
}
