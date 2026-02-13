# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page portfolio site built with AstroJS. Component-based architecture, typed scripts, proper build tooling. CRT/retro terminal aesthetic with neon color scheme.

## Stack

- AstroJS (static SSG, strict TypeScript)
- Three.js for 3D voxel character (Dark Magician / Funko Pop style)
- Google Fonts: Press Start 2P, VT323, IBM Plex Mono
- pnpm as package manager

## Architecture

```
src/
├── layouts/BaseLayout.astro        # html shell, fonts CDN, global.css, scroll-animations
├── pages/index.astro               # composes all components
├── components/
│   ├── Nav.astro                   # fixed nav bar
│   ├── Hero.astro                  # terminal card, stats, CTAs
│   ├── Character.astro             # canvas + loads character-scene.ts
│   ├── RetroDivider.astro          # prop: pattern string
│   ├── SectionHeader.astro         # props: number, title
│   ├── Skills.astro
│   ├── Experience.astro
│   ├── Projects.astro
│   ├── Hobbies.astro
│   ├── Education.astro
│   ├── Contact.astro
│   └── Footer.astro
├── scripts/
│   ├── character-scene.ts          # Three.js scene (ES module, typed)
│   └── scroll-animations.ts        # IntersectionObserver, lang bars, smooth scroll
└── styles/
    └── global.css                  # CSS vars, reset, CRT effects, shared styles
```

## Key Design Tokens

CSS variables defined on `:root` in `global.css`: `--neon-green`, `--neon-cyan`, `--neon-pink`, `--neon-yellow`, `--neon-orange`, `--dark-bg`, `--panel-bg`, `--panel-border`, `--text-dim`, `--text-body`

## Development

```bash
pnpm dev      # start dev server
pnpm build    # production build → dist/
pnpm preview  # preview production build
```

## Notes

- Original single-file version backed up as `index.html.bak`
- Component styles are scoped via Astro `<style>` tags; shared styles in `global.css`
- Three.js imported as ES module (bundled by Astro/Vite), not CDN
