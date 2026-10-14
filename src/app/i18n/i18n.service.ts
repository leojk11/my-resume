import { Injectable, computed, effect, signal } from '@angular/core';
import { RESUME } from '../data/resume.data';
import { RESUME_MK } from '../data/resume.data.mk';
import { Resume } from '../data/resume.model';
import { EN, MK, StringKey } from './strings';

export type Lang = 'en' | 'mk';

export interface LangOption {
  code: Lang;
  /** Name written in its own language. */
  name: string;
}

/** English first — it is the default. */
export const LANGS: LangOption[] = [
  { code: 'en', name: 'English' },
  { code: 'mk', name: 'Македонски' },
];

const STORAGE_KEY = 'lang';
const STRINGS: Record<Lang, Record<StringKey, string>> = { en: EN, mk: MK };
const RESUMES: Record<Lang, Resume> = { en: RESUME, mk: RESUME_MK };

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly lang = signal<Lang>(this.stored());
  /** Résumé content in the active language. */
  readonly resume = computed(() => RESUMES[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      const { profile } = this.resume();
      document.title = `${profile.name} — ${profile.roles[0]}`;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* storage unavailable — preference just won't persist */
      }
    });
  }

  /** Translate a UI string. Reads the language signal, so templates update on switch. */
  t(key: StringKey, params?: Record<string, string>): string {
    const text = STRINGS[this.lang()][key];
    return params ? text.replace(/\{(\w+)\}/g, (m, k) => params[k] ?? m) : text;
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  private stored(): Lang {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value === 'en' || value === 'mk') return value;
    } catch {
      /* ignore */
    }
    return 'en';
  }
}
