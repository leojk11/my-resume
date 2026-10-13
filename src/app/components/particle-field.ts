import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/** Full-screen canvas: a drifting neural-network constellation that reacts to the pointer. */
@Component({
  selector: 'app-particle-field',
  template: `
    <canvas #canvas></canvas>
    <div class="aurora a1"></div>
    <div class="aurora a2"></div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
      background: radial-gradient(ellipse at top, var(--bg-2), var(--bg) 70%);
    }
    canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .aurora {
      position: absolute;
      width: 60vmax;
      height: 60vmax;
      border-radius: 50%;
      opacity: 0.1;
      will-change: transform;
      animation: drift 26s ease-in-out infinite alternate;
    }
    .a1 {
      background: radial-gradient(circle, var(--accent), transparent 65%);
      top: -20vmax;
      left: -15vmax;
    }
    .a2 {
      background: radial-gradient(circle, var(--accent-2), transparent 65%);
      bottom: -25vmax;
      right: -15vmax;
      animation-delay: -13s;
    }
    @keyframes drift {
      to {
        transform: translate(12vmax, 8vmax) scale(1.2);
      }
    }
  `,
})
export class ParticleField {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private readonly color = '0, 240, 255';
  private readonly color2 = '255, 43, 214';

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => destroyRef.onDestroy(this.start()));
  }

  private start(): () => void {
    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let scrollY = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(80, (w * h) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onScroll = () => (scrollY = window.scrollY);

    const LINK = 130;
    const MOUSE_LINK = 180;

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const parallax = (scrollY * 0.15) % h;

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Gentle pull towards the pointer.
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_LINK && d > 1) {
          n.x += (dx / d) * 0.15;
          n.y += (dy / d) * 0.15;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ay = (a.y - parallax + h) % h;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const by = (b.y - parallax + h) % h;
          const dist = Math.hypot(a.x - b.x, ay - by);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(${this.color}, ${(1 - dist / LINK) * 0.12})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, by);
            ctx.stroke();
          }
        }

        const md = Math.hypot(a.x - mouse.x, ay - mouse.y);
        if (md < MOUSE_LINK) {
          ctx.strokeStyle = `rgba(${this.color2}, ${(1 - md / MOUSE_LINK) * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${this.color}, 0.5)`;
        ctx.beginPath();
        ctx.arc(a.x, ay, a.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }
}
