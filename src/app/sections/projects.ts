import { Component, computed, inject, signal } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, Icon],
  template: `
    <section id="projects" class="section">
      <header class="section-head" appReveal>
        <span class="index">// 04</span>
        <h2>{{ i18n.t('projects.h1') }} <span class="gradient-text">{{ i18n.t('projects.h2') }}</span></h2>
        <div class="line"></div>
      </header>

      <div class="filters" appReveal>
        @for (c of categories(); track $index) {
          <button [class.active]="$index === filter()" (click)="filter.set($index)">
            {{ c }}
            <span class="count">{{ countFor($index) }}</span>
          </button>
        }
      </div>

      <div class="grid">
        @for (p of visible(); track p.title; let i = $index) {
          <article class="card glass" [class.featured]="p.featured" [style.--d]="i * 70 + 'ms'">
            <div class="top">
              <span class="cat">{{ p.category }}</span>
              @if (p.featured) {
                <span class="star">{{ i18n.t('projects.featured') }}</span>
              }
            </div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
            <div class="tech">
              @for (t of p.tech; track t) {
                <span>{{ t }}</span>
              }
            </div>
            <div class="links">
              @if (p.repo) {
                <a [href]="p.repo" target="_blank" rel="noopener"><app-icon name="github" [size]="16" /> {{ i18n.t('projects.code') }}</a>
              }
              @if (p.link) {
                <a [href]="p.link" target="_blank" rel="noopener"><app-icon name="arrow" [size]="16" /> {{ i18n.t('projects.live') }}</a>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 32px;
      button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: var(--surface);
        color: var(--muted);
        font-family: var(--font-mono);
        font-size: 0.82rem;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: var(--text);
          border-color: rgba(var(--accent-rgb), 0.4);
        }
        &.active {
          color: var(--bg);
          background: var(--accent);
          border-color: var(--accent);
        }
      }
      .count {
        font-size: 0.7rem;
        opacity: 0.7;
      }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 22px;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 28px;
      animation: pop 0.5s var(--ease) both;
      animation-delay: var(--d);
      transition:
        transform 0.25s var(--ease),
        border-color 0.25s;
      &:hover {
        transform: translateY(-4px);
        border-color: rgba(var(--accent-rgb), 0.4);
      }
      &.featured {
        border-color: rgba(var(--accent-rgb), 0.3);
      }
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: translateY(24px) scale(0.97);
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .cat {
      color: var(--accent);
    }
    .star {
      color: var(--accent-2);
    }
    h3 {
      margin: 16px 0 8px;
      font-family: var(--font-display);
      font-size: 1.2rem;
      letter-spacing: 0.03em;
    }
    p {
      margin: 0 0 20px;
      color: var(--muted);
      flex: 1;
    }
    .tech {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--muted);
      span::before {
        content: '#';
        color: var(--accent);
      }
    }
    .links {
      display: flex;
      gap: 18px;
      margin-top: 20px;
      a {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;
        transition: color 0.3s;
        &:hover {
          color: var(--accent);
        }
      }
    }
    @media (max-width: 400px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Projects {
  protected readonly i18n = inject(I18n);
  private readonly projects = computed(() => this.i18n.resume().projects);
  protected readonly categories = computed(() => [
    this.i18n.t('projects.all'),
    ...new Set(this.projects().map((p) => p.category)),
  ]);
  /** Index into `categories` (0 = all). An index, not a name, so it survives a language switch. */
  protected readonly filter = signal(0);
  protected readonly visible = computed(() => {
    const category = this.categories()[this.filter()];
    return this.filter() === 0 || !category ? this.projects() : this.projects().filter((p) => p.category === category);
  });

  countFor(index: number): number {
    const category = this.categories()[index];
    return index === 0 ? this.projects().length : this.projects().filter((p) => p.category === category).length;
  }
}
