# toddwseattle-astro

Source code for **[toddwseattle.com](https://toddwseattle.com)** — Todd Warren's personal website. Built with [Astro](https://docs.astro.build/), React, TypeScript, and Tailwind CSS, and deployed to [Firebase Hosting](https://firebase.google.com/docs/hosting).

---

## Overview

This repository powers a writing-first personal site that showcases professional experience, teaching materials, blog posts, and consulting services. It was migrated from Gatsby and rebuilt as an Astro project with a calm, professional aesthetic — prioritizing readable content over visual complexity.

**Live site:** [https://toddwseattle.com](https://toddwseattle.com)

### Tech stack

| Technology                                                   | Role                                |
| ------------------------------------------------------------ | ----------------------------------- |
| [Astro](https://docs.astro.build/)                           | Static site generator               |
| [React](https://react.dev/)                                  | Interactive UI components (Islands) |
| [TypeScript](https://www.typescriptlang.org/)                | Type safety throughout              |
| [Tailwind CSS](https://tailwindcss.com/)                     | Utility-first styling               |
| [Framer Motion](https://www.framer.com/motion/)              | Animations                          |
| [Font Awesome](https://fontawesome.com/)                     | Icons                               |
| [Vitest](https://vitest.dev/)                                | Unit testing                        |
| [Playwright](https://playwright.dev/)                        | End-to-end testing                  |
| [Firebase Hosting](https://firebase.google.com/docs/hosting) | Deployment (staging + production)   |

---

## Project Structure

```
/
├── astro.config.mjs           # Astro configuration
├── tailwind.config.js         # Tailwind + design tokens
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest unit test config
├── playwright.config.ts       # Playwright e2e test config
├── firebase.json              # Firebase Hosting config (staging + prod targets, redirects, cache headers)
├── .firebaserc                # Firebase project & hosting target mappings
├── .env.example               # Environment variable template
│
├── docs/                      # Project documentation
│   ├── 01-epic.md             # Migration strategy and objectives
│   ├── 02-stories.md          # User stories
│   ├── 03-workitems.md        # Implementation tasks
│   ├── 04-style-guide.md      # IA, tone, layout, and color guidelines ← start here
│   ├── firebase-hosting.md    # Firebase Hosting setup guide
│   ├── build-resume-page.md   # Resume page implementation notes
│   ├── course-materials-authoring.md
│   └── ...                    # Additional progress notes and migration docs
│
├── public/                    # Static assets (images, favicons, etc.)
│
└── src/
    ├── assets/                # Processed images and global styles
    ├── components/            # Astro and React components
    ├── content/               # Content collections (Markdown/MDX)
    │   ├── writing/           # Blog posts and articles
    │   ├── teaching/          # Course materials
    │   └── pages/             # Static page content (About, Consulting, etc.)
    ├── data/                  # Structured data sources
    ├── layouts/               # Shared Astro layouts (Base, Page, Post)
    ├── lib/                   # Utility libraries
    └── pages/                 # File-based routes
```

### Key configuration files

- **`firebase.json`** — Defines two hosting targets (`staging` and `prod`), sets long-lived cache headers for hashed `/_astro/**` assets, forces HTML revalidation, and configures 301 redirects from legacy `/blog/**` URLs to `/writing/**`.
- **`.firebaserc`** — Maps the Firebase project ID (`toddwseattle-astro`) to hosting site IDs: `toddwseattle-astro-staging` (staging) and `toddwseattle-astro` (production). See `example.firebaserc` for a template.
- **`.env.example`** — Template for the `PUBLIC_GA_ID` environment variable used by Google Analytics 4.

---

## Navigation & Information Architecture

The site has six top-level navigation items (fixed):

| Route            | Purpose                                                 |
| ---------------- | ------------------------------------------------------- |
| `/`              | Home / landing page                                     |
| `/teaching`      | Corporate innovation and software engineering courses   |
| `/writing`       | Primary content stream (replaces `/blog`)               |
| `/autosofttoday` | Links to [autosofttoday.com](https://autosofttoday.com) |
| `/consulting`    | Advisory services overview                              |
| `/about`         | Current bio, roles, and CV                              |

Content is organized into collections under `src/content/` and discovered via tags rather than deep folder nesting. Tag taxonomy: `innovation & org design`, `software engineering`, `teaching reflections`, `cycling`, `guitar & music`.

---

## Style Guide

Visual consistency is maintained by **[`docs/04-style-guide.md`](docs/04-style-guide.md)**. Key highlights:

### Typography

- **Body / Headings:** Inter
- **Code:** JetBrains Mono
- **Prose width:** ~700 px; comfortable line height

### Color tokens

| Token          | Value     | Use                |
| -------------- | --------- | ------------------ |
| Background     | `#FAFAFA` | Page background    |
| Surface        | `#FFFFFF` | Cards, panels      |
| Primary text   | `#0F172A` | Body copy          |
| Secondary text | `#475569` | Captions, metadata |
| Accent         | `#4F46E5` | Links, CTAs        |

Use Tailwind CSS utility classes mapped to these tokens — avoid raw hex values in component code.

### Tone

- Calm, modern, and readable; writing-forward over visual gimmicks.
- Consulting copy is advisory and credibility-focused, not salesy.
- Teaching pages feel evergreen; about page is present-tense.

---

## Development

### Prerequisites

- Node.js 18.x or 20.x (LTS)
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Available scripts

```bash
npm run dev          # Start local dev server at http://localhost:4321
npm run build        # Production build → dist/
npm run preview      # Preview the production build locally
npm run format       # Format all files with Prettier
npm run test         # Run unit tests (Vitest, interactive)
npm run test:watch   # Watch mode for unit tests
npm run test:run     # Run unit tests once (CI-friendly)
npm run test:e2e     # Run Playwright end-to-end tests
npm run test:e2e:ui  # Run Playwright tests with interactive UI
```

---

## Build & Deploy (Firebase Hosting)

The site deploys to Firebase Hosting with separate **staging** and **production** environments. Full setup instructions are in **[`docs/firebase-hosting.md`](docs/firebase-hosting.md)**.

### First-time setup

#### 1. Install Firebase CLI and log in

```bash
npm install -g firebase-tools
firebase login
```

#### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set your Google Analytics 4 Measurement ID:

```dotenv
# .env
PUBLIC_GA_ID=G-XXXXXXXXXX   # staging ID for local dev / staging deploys
```

> GA only loads in production builds (`npm run build`). It does **not** load during `npm run dev`. The `npm run preview` command serves the production build, so GA will also load there — useful for verifying the measurement ID before deploying.

#### 3. Map hosting targets (one-time)

```bash
firebase target:apply hosting staging toddwseattle-astro-staging
firebase target:apply hosting prod toddwseattle-astro
```

Verify the mapping:

```bash
firebase target
```

### Deploying

#### Build once

```bash
npm run build
```

#### Deploy to staging

```bash
npm run deploy:staging
# or: firebase deploy --only hosting:staging
```

#### Deploy to production

Set `PUBLIC_GA_ID` to the **production** Measurement ID, then:

```bash
npm run deploy:prod
# or: firebase deploy --only hosting:prod
```

#### Full staging ship (tests + format + build + deploy)

```bash
npm run ship:staging
```

### Redirects

Legacy `/blog/**` URLs are automatically redirected to `/writing/**` via `firebase.json` (HTTP 301). No action required — these are preserved for SEO.

### Local emulator

```bash
firebase emulators:start --only hosting
# Preview at http://localhost:5001
```

---

## Contributing

1. Run `npm run test:run` and `npm run build` to confirm everything passes before opening a PR.
2. Format code with `npm run format`.
3. Keep diffs small and composable — prefer focused, single-purpose changes.
4. Follow the IA and style conventions in [`docs/04-style-guide.md`](docs/04-style-guide.md).
5. Preserve all existing slugs and routes — do not break legacy URLs.

---

## License

MIT
