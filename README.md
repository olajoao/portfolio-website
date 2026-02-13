# João Küster — Portfolio

Retro CRT-themed portfolio built with AstroJS. Features a 3D voxel Dark Magician character (Three.js), scroll animations, and a neon terminal aesthetic.

## Stack

- **AstroJS** — static site generation, strict TypeScript
- **Three.js** — 3D voxel character with drag-to-rotate interaction
- **Google Fonts** — Press Start 2P, VT323, IBM Plex Mono

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview production build |

## Project Structure

```
src/
├── layouts/BaseLayout.astro
├── pages/index.astro
├── components/
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Character.astro
│   ├── Skills.astro
│   ├── Experience.astro
│   ├── Projects.astro
│   ├── Hobbies.astro
│   ├── Education.astro
│   ├── Contact.astro
│   ├── Footer.astro
│   ├── SectionHeader.astro
│   └── RetroDivider.astro
├── scripts/
│   ├── character-scene.ts
│   └── scroll-animations.ts
└── styles/
    └── global.css
```
