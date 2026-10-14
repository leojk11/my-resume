import { Component, inject } from '@angular/core';
import { CommandPalette } from './components/command-palette';
import { Nav } from './components/nav';
import { ParticleField } from './components/particle-field';
import { Toast } from './components/toast';
import { I18n } from './i18n/i18n.service';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { ExperienceSection } from './sections/experience';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects';
import { Skills } from './sections/skills';
import { Terminal } from './sections/terminal';

@Component({
  selector: 'app-root',
  imports: [
    CommandPalette,
    Nav,
    ParticleField,
    Toast,
    Hero,
    About,
    Skills,
    ExperienceSection,
    Projects,
    Terminal,
    Contact,
  ],
  template: `
    <app-particle-field />

    <app-nav />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-terminal />
      <app-contact />
    </main>

    <app-command-palette />
    <app-toast />
  `,
  styles: `
    main {
      position: relative;
      z-index: 1;
    }
  `,
})
export class App {
  constructor() {
    // Instantiating the service applies the saved language to <html lang> and the page title.
    inject(I18n);
  }
}
