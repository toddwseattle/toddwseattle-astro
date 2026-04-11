# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Todd Warren's personal website ([toddwseattle.com](https://toddwseattle.com)) — a writing-first portfolio built with Astro, React, TypeScript, and Tailwind CSS, deployed to Firebase Hosting. Migrated from Gatsby.

## Commands

```bash
npm run dev           # Dev server at http://localhost:4321
npm run build         # Production build → dist/
npm run preview       # Preview production build
npm run format        # Format with Prettier
npm run test          # Vitest (interactive)
npm run test:run      # Vitest (CI-friendly, single run)
npm run test:watch    # Vitest watch mode
npm run test:e2e      # Playwright e2e tests
npm run test:e2e:ui   # Playwright with interactive UI
npm run ci            # Full CI check: install + audit + astro check + tests
npm run ship:staging  # test:run + format + build + deploy to staging
```

**Single test file:** `npx vitest run src/components/MyComponent/MyComponent.test.tsx`

## Architecture

**Astro Islands** — the dominant pattern. Pages and layout are `.astro` (zero JS shipped); interactive UI is React `.tsx` with `client:*` directives. Ask: "Does this need state or browser interaction?" before reaching for React.

```
src/
├── pages/        # File-based routes (.astro)
├── layouts/      # Base, Page, Post layouts (.astro) — all require <slot />
├── components/   # Astro + React components; React tests colocated (.test.tsx)
├── content/      # Content Collections (Markdown/MDX)
│   ├── writing/  # Blog posts — tag-based, no year folders
│   ├── teaching/ # Course materials
│   └── pages/    # Static page content
├── data/         # Typed data sources
├── assets/       # Processed images (use <Image /> from astro:assets)
└── lib/          # Utilities
```

**Content Collections** use Zod schemas defined in `src/content/config.ts`. Fetch with `getCollection` / `getEntry` from `astro:content`.

**Routing constraint:** Preserve all existing slugs. `/blog/**` redirects to `/writing/**` via `firebase.json`. Never introduce year-based routes.

**Deployment:** Two Firebase Hosting targets — `staging` (`toddwseattle-astro-staging`) and `prod` (`toddwseattle-astro`). See `firebase.json` and `.firebaserc`.

## Key Standards

Full component, styling, and Astro-specific patterns are in [.github/copilot-instructions.md](.github/copilot-instructions.md). Full testing patterns are in [.github/copilot-test-instructions.md](.github/copilot-test-instructions.md). Style and IA guidelines are in [docs/04-style-guide.md](docs/04-style-guide.md).

For whole-site QA coverage audits, regression work, and deciding when to add Vitest unit tests versus Playwright e2e tests, use the shared skill at [.github/skills/qa-site-coverage/SKILL.md](.github/skills/qa-site-coverage/SKILL.md).

**Summary of non-obvious rules:**

- **Astro-first decision tree:** HTML/CSS only → `.astro`; simple interactivity → `.astro` with `<script>`; complex state → React + `client:*`
- **No browser APIs in `.astro` frontmatter** — that code runs at build time, not in the browser
- **Tailwind only** — no inline styles, no CSS modules; use the design token classes (`bg-gray-50`, `text-gray-900`, `bg-indigo-600`, etc.)
- **Image optimization** — always `<Image />` from `astro:assets`, never raw `<img>`
- **Testing** — Vitest + Testing Library; always `vi.fn()` / `vi.mock()` (never Jest equivalents); build tests incrementally one at a time; mock child components
- **TypeScript** — no `any`; use `import type` for type-only imports
- **Commit style** — `(type): short summary` followed by bullet points; use the `/commit` skill

## Content Frontmatter

```yaml
---
title: "Post Title"
date: 2025-01-15
description: "Brief description for SEO"
tags: ["software-engineering", "teaching reflections"]
slug: "url-friendly-slug"
---
```

Available tags: `innovation & org design`, `software engineering`, `teaching reflections`, `cycling`, `guitar & music`
