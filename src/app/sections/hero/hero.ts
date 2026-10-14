import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { I18n } from '../../i18n/i18n.service';
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
  protected readonly i18n = inject(I18n);
  protected readonly profile = computed(() => this.i18n.resume().profile);
  protected readonly socials = computed(() => this.i18n.resume().socials);
  protected readonly initials = this.profile()
    .name.split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();

  /** Currently typed text of the rotating role. */
  protected readonly typed = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let role = 0;
      let char = 0;
      let deleting = false;
      let timer: ReturnType<typeof setTimeout>;

      const tick = () => {
        // Read the roles on every tick so a language switch is picked up mid-cycle.
        const roles = this.profile().roles;
        const word = roles[role % roles.length];
        char += deleting ? -1 : 1;
        this.typed.set(word.slice(0, char));

        let delay = deleting ? 40 : 85;
        if (!deleting && char >= word.length) {
          deleting = true;
          delay = 1800;
        } else if (deleting && char <= 0) {
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
