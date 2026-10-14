import { Component, computed, inject } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { Icon } from '../shared/icon';
import { RevealDirective } from '../shared/reveal.directive';
import { UiStateService } from '../shared/ui-state.service';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, Icon],
  template: `
    <section id="contact" class="section">
      <header class="section-head" appReveal>
        <span class="index">// 06</span>
        <h2>{{ i18n.t('contact.h1') }} <span class="gradient-text">{{ i18n.t('contact.h2') }}</span></h2>
        <div class="line"></div>
      </header>

      <div class="panel glass" appReveal>
        <p class="lead">
          {{ i18n.t('contact.lead1') }}<br />
          {{ i18n.t('contact.lead2') }}
        </p>
        <div class="email">
          <a [href]="'mailto:' + profile().email" class="address gradient-text">{{ profile().email }}</a>
          <button class="copy" [title]="i18n.t('contact.copy')" (click)="ui.copy(profile().email, i18n.t('contact.copied'))">
            <app-icon name="copy" [size]="18" />
          </button>
        </div>
        <a class="btn" [href]="'mailto:' + profile().email">{{ i18n.t('contact.hello') }} <app-icon name="arrow" [size]="16" /></a>
      </div>

      <div class="socials">
        @for (s of socials(); track s.url) {
          <a class="social glass" [href]="s.url" target="_blank" rel="noopener" appReveal [revealDelay]="$index * 80">
            <app-icon [name]="s.icon" [size]="22" />
            <span>{{ s.label }}</span>
            <app-icon class="arrow" name="arrow" [size]="16" />
          </a>
        }
      </div>
    </section>

    <footer>
      <span>© {{ year }} {{ profile().name }}</span>
    </footer>
  `,
  styles: `
    .panel {
      position: relative;
      overflow: hidden;
      padding: clamp(32px, 6vw, 64px);
      text-align: center;
    }
    .lead {
      position: relative;
      color: var(--muted);
      font-size: 1.15rem;
      margin: 0 0 28px;
    }
    .email {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-bottom: 36px;
    }
    .address {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: clamp(1.2rem, 4.5vw, 2.6rem);
      word-break: break-all;
    }
    .copy {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--muted);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: var(--accent);
        border-color: var(--accent);
      }
    }
    .socials {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
    .social {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 22px;
      transition:
        border-color 0.3s,
        transform 0.3s var(--ease),
        box-shadow 0.3s;
      span {
        flex: 1;
      }
      .arrow {
        color: var(--muted);
        transition: transform 0.3s var(--ease), color 0.3s;
      }
      &:hover {
        border-color: rgba(var(--accent-rgb), 0.5);
        transform: translateY(-3px);
        color: var(--accent);
        .arrow {
          color: var(--accent);
          transform: translate(3px, -3px);
        }
      }
    }
    footer {
      position: relative;
      max-width: 1180px;
      margin: 0 auto;
      padding: 32px 24px 48px;
      text-align: center;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.85rem;
      font-family: var(--font-mono);
    }
  `,
})
export class Contact {
  protected readonly ui = inject(UiStateService);
  protected readonly i18n = inject(I18n);
  protected readonly profile = computed(() => this.i18n.resume().profile);
  protected readonly socials = computed(() => this.i18n.resume().socials);
  protected readonly year = new Date().getFullYear();
}
