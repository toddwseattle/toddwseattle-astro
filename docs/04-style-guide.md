# ToddWSeattle Astro Migration – Strategy & Style Guide

Use this guide to keep future work aligned with the IA refresh and writing-first posture. Apply alongside locked constraints (no restart, preserve slugs/routes/content collections, no re-imports).

## Information Architecture Guardrails
- **Navigation (fixed):** Home, Teaching, Writing, AutoSoft Today, Consulting, About.
- **Collections (recommended):** `content/writing`, `content/teaching/corporate-innovation`, `content/teaching/software-engineering`, `content/pages`.
- Prefer tags over deep folder nesting; avoid year-based routing.
- Writing is the primary stream; hobbies (cycling, guitar) belong as tags under Writing.

## Tone & Content Principles
- Calm, modern, readable; writing-forward over visual gimmicks.
- Consulting tone is advisory, not salesy; emphasize credibility from teaching/writing.
- Teaching pages feel evergreen: philosophy, topics/frameworks, example projects, public artifacts.
- About is present-tense, current roles, seasonal location (Seattle/Park City), includes CV link placeholder.

## Layout & Styling Notes
- Maintain shared layouts (Base/Page/Post) with consistent navigation and footer.
- Favor card-based indexes for Writing with optional imagery; avoid heavy shadows.
- Typography: Inter for body/headings, JetBrains Mono for code; comfortable prose width (~700px) and line height.
- Color tokens: background `#FAFAFA`, surface `#FFFFFF`, primary text `#0F172A`, secondary text `#475569`, accent `#4F46E5`.
- Keep styles declarative; avoid inline hex when Tailwind tokens can be used.

## Content Modeling Checklist
- Define frontmatter schemas for Teaching courses (philosophy, topics/frameworks, example projects, public artifacts/links).
- Tag set to standardize Writing: innovation & org design, software engineering, teaching reflections, cycling, guitar & music.
- When migrating legacy posts, preserve slugs and URLs; retag instead of relocating unless required by IA.

## Validation Expectations
- Navigation matches the fixed IA; no stray Gatsby-era items.
- Site builds successfully; routes remain intact; posts render with updated typography and cards.
- AutoSoft Today page links externally without duplicated content.

## Working Practices
- Document audit decisions (migrate/retag/archive) without deleting markdown/MDX.
- Keep diffs focused; prefer small, composable components and declarative styles.
- If conflicts arise between legacy structure and this guide, refactor toward this plan while honoring locked constraints.
