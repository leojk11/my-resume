import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RESUME } from '../../data/resume.data';
import { Icon } from '../../shared/icon';
import { UiStateService } from '../../shared/ui-state.service';

@Component({
  selector: 'app-hero',
  imports: [Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly ui = inject(UiStateService);
  protected readonly profile = RESUME.profile;
  protected readonly socials = RESUME.socials;
  protected readonly initials = this.profile.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  /** Currently typed text of the rotating role. */
  protected readonly typed = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const roles = this.profile.roles;
      let role = 0;
      let char = 0;
      let deleting = false;
      let timer: ReturnType<typeof setTimeout>;

      const tick = () => {
        const word = roles[role];
        char += deleting ? -1 : 1;
        this.typed.set(word.slice(0, char));

        let delay = deleting ? 40 : 85;
        if (!deleting && char === word.length) {
          deleting = true;
          delay = 1800;
        } else if (deleting && char === 0) {
          deleting = false;
          role = (role + 1) % roles.length;
          delay = 350;
        }
        timer = setTimeout(tick, delay);
      };
      timer = setTimeout(tick, 900);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
