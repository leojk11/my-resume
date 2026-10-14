import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { I18n } from '../i18n/i18n.service';
import { StringKey } from '../i18n/strings';
import { SECTIONS } from '../components/nav';
import { RevealDirective } from '../shared/reveal.directive';
import { UiStateService } from '../shared/ui-state.service';

interface Line {
  /** When set, the text is a translatable UI string and re-renders on language change. */
  key?: StringKey;
  params?: Record<string, string>;
  kind: 'in' | 'out' | 'err' | 'accent';
  text: string;
}


/** A tiny shell visitors can play with to explore the résumé. */
@Component({
  selector: 'app-terminal',
  imports: [RevealDirective],
  template: `
    <section id="terminal" class="section">
      <header class="section-head" appReveal>
        <span class="index">// 05</span>
        <h2>{{ i18n.t('terminal.h1') }} <span class="gradient-text">{{ i18n.t('terminal.h2') }}</span></h2>
        <div class="line"></div>
      </header>

      <div class="term" appReveal (click)="focus()">
        <div class="bar">
          <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
          <span class="title">{{ handle }}&#64;portfolio: ~</span>
        </div>
        <div class="body" #body>
          @for (l of lines(); track $index) {
            <div class="l" [class]="l.kind">
              @if (l.kind === 'in') {
                <span class="ps">{{ handle }}&#64;portfolio:~$</span>
              }
              {{ l.key ? i18n.t(l.key, l.params) : l.text }}
            </div>
          }
          <div class="l in prompt-line">
            <span class="ps">{{ handle }}&#64;portfolio:~$</span>
            <input
              #input
              spellcheck="false"
              autocomplete="off"
              [attr.aria-label]="i18n.t('term.input')"
              [value]="draft()"
              (input)="draft.set(input.value)"
              (keydown)="onKey($event)"
            />
          </div>
        </div>
      </div>
      <p class="tip" appReveal>
        {{ i18n.t('term.try') }} <code>help</code>, <code>skills</code>, <code>contact</code> {{ i18n.t('term.or') }} <code>goto projects</code>.
      </p>
    </section>
  `,
  styles: `
    .term {
      border-radius: var(--radius);
      overflow: hidden;
      border: 1px solid rgba(var(--accent-rgb), 0.3);
      background: rgba(3, 5, 14, 0.85);
      box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.5),
        0 0 40px rgba(var(--accent-rgb), 0.1);
      font-family: var(--font-mono);
      font-size: 0.9rem;
      cursor: text;
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid var(--border);
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      &.r { background: #ff5f57; }
      &.y { background: #febc2e; }
      &.g { background: #28c840; }
    }
    .title {
      margin-left: 12px;
      color: var(--muted);
      font-size: 0.8rem;
    }
    .body {
      height: 360px;
      overflow-y: auto;
      padding: 18px 20px;
    }
    .l {
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.6;
      &.out { color: var(--text); }
      &.err { color: #ff6b8b; }
      &.accent { color: var(--accent); }
    }
    .ps {
      color: #7dffb3;
      margin-right: 8px;
    }
    .prompt-line {
      display: flex;
      align-items: center;
    }
    input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      color: var(--text);
      font: inherit;
      caret-color: var(--accent);
    }
    .tip {
      margin-top: 16px;
      color: var(--muted);
      font-size: 0.9rem;
      code {
        color: var(--accent);
        font-family: var(--font-mono);
      }
    }
    @media (max-width: 600px) {
      .ps { display: none; }
      .body { height: 300px; }
    }
  `,
})
export class Terminal {
  protected readonly i18n = inject(I18n);
  protected readonly handle = this.i18n.resume().profile.name.toLowerCase().split(' ')[0] || 'guest';
  protected readonly lines = signal<Line[]>([
    { kind: 'accent', key: 'term.welcome', params: { name: this.i18n.resume().profile.name }, text: '' },
    { kind: 'out', key: 'term.hint', text: '' },
  ]);
  protected readonly draft = signal('');

  private readonly ui = inject(UiStateService);
  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private history: string[] = [];
  private historyIndex = 0;

  /** Command output is produced in the language active when the command runs. */
  private readonly commands: Record<string, { desc: StringKey | null; run: (args: string[]) => string[] | void }> = {
    help: {
      desc: 'term.cmd.help',
      run: () => Object.entries(this.commands).map(([k, v]) => `  ${k.padEnd(12)} ${v.desc ? this.i18n.t(v.desc) : '¯\\_(ツ)_/¯'}`),
    },
    whoami: {
      desc: 'term.cmd.whoami',
      run: () => {
        const { name, roles, location } = this.i18n.resume().profile;
        return [name, roles[0], location];
      },
    },
    about: { desc: 'term.cmd.about', run: () => this.i18n.resume().about },
    skills: {
      desc: 'term.cmd.skills',
      run: () =>
        this.i18n.resume().skillGroups.flatMap((g) => [
          `[${g.category}]`,
          ...g.skills.map((s) => `  ${s.name.padEnd(16)} ${'█'.repeat(Math.round(s.level / 10)).padEnd(10, '░')} ${s.level}%`),
        ]),
    },
    experience: {
      desc: 'term.cmd.experience',
      run: () => this.i18n.resume().experience.map((e) => `${e.period.padEnd(18)} ${e.role} @ ${e.company}`),
    },
    projects: {
      desc: 'term.cmd.projects',
      run: () => this.i18n.resume().projects.map((p) => `• ${p.title} — ${p.description}`),
    },
    contact: {
      desc: 'term.cmd.contact',
      run: () => {
        const { profile, socials } = this.i18n.resume();
        return [`email: ${profile.email}`, ...socials.map((s) => `${s.label.toLowerCase()}: ${s.url}`)];
      },
    },
    goto: {
      desc: 'term.cmd.goto',
      run: ([target]) => {
        const s = SECTIONS.find((x) => x.id === target?.toLowerCase());
        if (!s) return [this.i18n.t('term.usage', { list: SECTIONS.map((x) => x.id).join('|') })];
        setTimeout(() => this.ui.scrollTo(s.id), 300);
        return [this.i18n.t('term.navigating', { name: this.i18n.t(s.labelKey) })];
      },
    },
    date: { desc: 'term.cmd.date', run: () => [new Date().toString()] },
    echo: { desc: 'term.cmd.echo', run: (args) => [args.join(' ')] },
    sudo: { desc: null, run: () => [this.i18n.t('term.sudo')] },
    clear: {
      desc: 'term.cmd.clear',
      run: () => {
        this.lines.set([]);
      },
    },
  };

  focus(): void {
    this.input().nativeElement.focus({ preventScroll: true });
  }

  onKey(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.submit();
    } else if (e.key === 'ArrowUp' && this.history.length) {
      e.preventDefault();
      this.historyIndex = Math.max(0, this.historyIndex - 1);
      this.draft.set(this.history[this.historyIndex]);
    } else if (e.key === 'ArrowDown' && this.history.length) {
      e.preventDefault();
      this.historyIndex = Math.min(this.history.length, this.historyIndex + 1);
      this.draft.set(this.history[this.historyIndex] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(this.commands).find((c) => c.startsWith(this.draft().trim()));
      if (match) this.draft.set(match + ' ');
    }
  }

  private submit(): void {
    const raw = this.draft().trim();
    this.draft.set('');
    this.lines.update((l) => [...l, { kind: 'in', text: raw }]);
    if (raw) {
      this.history.push(raw);
      this.historyIndex = this.history.length;
      const [name, ...args] = raw.split(/\s+/);
      const cmd = this.commands[name.toLowerCase()];
      const out = cmd ? cmd.run(args) : [this.i18n.t('term.notFound', { name })];
      if (out) {
        this.lines.update((l) => [...l, ...out.map((text) => ({ kind: cmd ? 'out' : 'err', text }) as Line)]);
      }
    }
    requestAnimationFrame(() => {
      const el = this.body().nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  }
}
