# my-resume

A futuristic, animated personal résumé / portfolio built with Angular 22 (standalone components + signals).

## Run

```bash
npm start          # dev server on http://localhost:4200
npm run build      # production build in dist/my-resume
```

## Make it yours

All content lives in **`src/app/data/resume.data.ts`**: name, roles, bio, stats, skills, experience, projects, education, and social links.

- **Photo:** put an image in `public/` (e.g. `public/me.jpg`) and set `avatar: 'me.jpg'`.
- **CV download:** put a PDF in `public/` and set `resumeUrl: 'resume.pdf'`.
- **Colours:** the accent palettes are defined at the top of `src/styles.scss`.

## Features

- Boot-sequence intro (shown once per browser session)
- Interactive particle-network background that reacts to the cursor
- Custom glowing cursor, glitch headline, typewriter roles, holographic avatar
- Scroll-reveal animations, 3D tilt cards, animated counters and skill bars
- Scroll-progress bar, scroll-spy navigation, and a timeline that fills as you scroll
- Project filtering by category
- **Command palette** (`Ctrl/⌘ + K`) to jump to sections, switch themes, copy your email, and open links
- **Interactive terminal** (`help`, `whoami`, `skills`, `projects`, `goto <section>`, `theme <name>`, and more), with history and tab-completion
- Four accent themes (cyan, magenta, lime, amber), remembered between visits
- Responsive layout, and `prefers-reduced-motion` is respected
