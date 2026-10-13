import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/** Fades / slides an element in the first time it scrolls into view. */
@Directive({
  selector: '[appReveal]',
  host: { '[style.--reveal-delay]': 'revealDelay() + "ms"' },
})
export class RevealDirective implements OnDestroy {
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              this.observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 },
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
