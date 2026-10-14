import { Component, computed, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { CountUpDirective } from '../shared/count-up.directive';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, CountUpDirective],
  template: `
    <section id="about" class="section">
      <header class="section-head" appReveal>
        <span class="index">// 01</span>
        <h2>{{ i18n.t('about.h1') }} <span class="gradient-text">{{ i18n.t('about.h2') }}</span></h2>
        <div class="line"></div>
      </header>

      <div class="layout">
        <div class="bio">
          @for (p of about(); track $index) {
            <p appReveal [revealDelay]="$index * 120">{{ p }}</p>
          }
        </div>

        <div class="stats">
          @for (s of stats(); track $index) {
            <div class="stat glass" appReveal [revealDelay]="$index * 100">
              <div class="value gradient-text" [appCountUp]="s.value" [suffix]="s.suffix ?? ''"></div>
              <div class="label">{{ s.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 48px;
      align-items: start;
    }
    .bio p {
      margin: 0 0 20px;
      color: var(--muted);
      font-size: 1.08rem;
    }
    .stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .stat {
      position: relative;
      padding: 28px 22px;
      text-align: center;
    }
    .value {
      font-family: var(--font-display);
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1;
    }
    .label {
      margin-top: 10px;
      color: var(--muted);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    @media (max-width: 900px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class About {
  protected readonly i18n = inject(I18n);
  protected readonly about = computed(() => this.i18n.resume().about);
  protected readonly stats = computed(() => this.i18n.resume().stats);
}
