import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  template: `
    <section id="experience" class="section">
      <header class="section-head" appReveal>
        <span class="index">// 03</span>
        <h2>{{ i18n.t('experience.h1') }} <span class="gradient-text">{{ i18n.t('experience.h2') }}</span></h2>
        <div class="line"></div>
      </header>

      <div class="timeline" #timeline>
        <div class="rail"><div class="beam" [style.transform]="'scaleY(' + progress() + ')'"></div></div>

        @for (job of jobs(); track $index; let odd = $odd) {
          <article class="entry" [class.right]="odd" appReveal>
            <div class="node"></div>
            <div class="card glass">
              <div class="period">{{ job.period }}</div>
              <h3>{{ job.role }}</h3>
              <div class="company">
                &#64; {{ job.company }}
                @if (job.location) {
                  <span class="loc">· {{ job.location }}</span>
                }
              </div>
              <p class="summary">{{ job.summary }}</p>
              <ul>
                @for (h of job.highlights; track $index) {
                  <li>{{ h }}</li>
                }
              </ul>
              <div class="tech">
                @for (t of job.tech; track t) {
                  <span class="chip">{{ t }}</span>
                }
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .timeline {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    .rail {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.06);
    }
    .beam {
      height: 100%;
      transform-origin: top;
      background: linear-gradient(var(--accent), var(--accent-2));
      transition: transform 0.1s linear;
    }
    .entry {
      position: relative;
      width: 50%;
      padding-right: 48px;
      &.right {
        align-self: flex-end;
        padding-right: 0;
        padding-left: 48px;
        .node {
          left: -9px;
          right: auto;
        }
      }
    }
    .node {
      position: absolute;
      top: 28px;
      right: -9px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--bg);
      border: 2px solid var(--accent);
    }
    .card {
      padding: 28px;
      transition:
        transform 0.4s var(--ease),
        border-color 0.4s,
        box-shadow 0.4s;
      &:hover {
        transform: translateY(-4px);
        border-color: rgba(var(--accent-rgb), 0.4);
      }
    }
    .period {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--accent);
      letter-spacing: 0.1em;
    }
    h3 {
      margin: 6px 0 2px;
      font-size: 1.3rem;
    }
    .company {
      color: var(--accent-2);
      font-weight: 500;
    }
    .loc {
      color: var(--muted);
      font-weight: 400;
    }
    .summary {
      color: var(--muted);
      margin: 14px 0 10px;
    }
    ul {
      margin: 0 0 18px;
      padding: 0;
      list-style: none;
      li {
        position: relative;
        padding-left: 22px;
        margin-bottom: 6px;
        font-size: 0.95rem;
        &::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent);
        }
      }
    }
    .tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    @media (max-width: 800px) {
      .rail {
        left: 8px;
      }
      .entry,
      .entry.right {
        width: 100%;
        padding: 0 0 0 36px;
        .node {
          left: 0;
          right: auto;
        }
      }
    }
  `,
})
export class ExperienceSection {
  protected readonly i18n = inject(I18n);
  protected readonly jobs = computed(() => this.i18n.resume().experience);
  protected readonly progress = signal(0);
  private readonly timeline = viewChild.required<ElementRef<HTMLElement>>('timeline');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => {
        const rect = this.timeline().nativeElement.getBoundingClientRect();
        const anchor = window.innerHeight * 0.6;
        const p = (anchor - rect.top) / rect.height;
        this.progress.set(Math.max(0, Math.min(1, p)));
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
