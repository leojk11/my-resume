import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section id="skills" class="section">
      <header class="section-head" appReveal>
        <span class="index">// 02</span>
        <h2 class="gradient-text">{{ i18n.t('skills.h2') }}</h2>
        <div class="line"></div>
      </header>

      <div class="tabs" appReveal role="tablist">
        @for (g of groups(); track $index; let i = $index) {
          <button role="tab" [class.active]="i === selected()" [attr.aria-selected]="i === selected()" (click)="selected.set(i)">
            {{ g.category }}
          </button>
        }
        <span class="indicator" [style.--i]="selected()" [style.--n]="groups().length"></span>
      </div>

      <div class="panel glass" appReveal>
        @for (s of current().skills; track s.name + selected(); let i = $index) {
          <div class="skill" [style.--delay]="i * 90 + 'ms'">
            <div class="meta">
              <span class="name">{{ s.name }}</span>
              <span class="pct">{{ s.level }}%</span>
            </div>
            <div class="track">
              <div class="fill" [style.--level]="s.level / 100"></div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .tabs {
      position: relative;
      display: inline-grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      padding: 5px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: var(--surface);
      margin-bottom: 28px;
      max-width: 100%;
      button {
        position: relative;
        z-index: 1;
        padding: 10px 22px;
        border: none;
        background: none;
        color: var(--muted);
        font-family: var(--font-mono);
        font-size: 0.85rem;
        cursor: pointer;
        white-space: nowrap;
        transition: color 0.3s;
        &.active {
          color: var(--bg);
        }
      }
    }
    .indicator {
      position: absolute;
      top: 5px;
      bottom: 5px;
      left: 5px;
      width: calc((100% - 10px) / var(--n));
      border-radius: 10px;
      background: linear-gradient(100deg, var(--accent), var(--accent-2));
      transform: translateX(calc(var(--i) * 100%));
      transition: transform 0.45s var(--ease);
    }
    .panel {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px 48px;
      padding: 36px;
    }
    .skill {
      animation: in 0.6s var(--ease) both;
      animation-delay: var(--delay);
    }
    .meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .name {
      font-weight: 500;
    }
    .pct {
      font-family: var(--font-mono);
      color: var(--accent);
      font-size: 0.85rem;
    }
    .track {
      height: 6px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }
    .fill {
      height: 100%;
      border-radius: 6px;
      background: linear-gradient(90deg, var(--accent-2), var(--accent));
      transform-origin: left;
      transform: scaleX(var(--level));
      animation: grow 1.2s var(--ease) both;
      animation-delay: var(--delay);
    }
    @keyframes grow {
      from {
        transform: scaleX(0);
      }
    }
    @keyframes in {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
    }
    @media (max-width: 700px) {
      .panel {
        grid-template-columns: 1fr;
        padding: 24px;
      }
      .tabs button {
        padding: 10px 12px;
      }
    }
  `,
})
export class Skills {
  protected readonly i18n = inject(I18n);
  protected readonly groups = computed(() => this.i18n.resume().skillGroups);
  protected readonly selected = signal(0);
  protected readonly current = computed(() => this.groups()[this.selected()]);
}
