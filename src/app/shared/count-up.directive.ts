import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

/** Animates a number from 0 to the target value when it scrolls into view. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements OnDestroy {
  readonly appCountUp = input.required<number>();
  readonly suffix = input('');
  readonly duration = input(1800);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.el.nativeElement.textContent = `0${this.suffix()}`;
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.run();
          this.observer?.disconnect();
        }
      });
      this.observer.observe(this.el.nativeElement);
    });
  }

  private run(): void {
    const target = this.appCountUp();
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / this.duration(), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      this.el.nativeElement.textContent = `${Math.round(target * eased)}${this.suffix()}`;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
