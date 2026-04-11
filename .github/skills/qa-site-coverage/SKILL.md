---
name: qa-site-coverage
description: Reviews this Astro portfolio for whole-site QA coverage risks, then updates or adds Vitest unit tests and Playwright e2e tests for important pages, routes, content collections, shared components, navigation, and course-material scenarios. Use when asked to improve QA coverage, maintain overall site coverage goals, audit missing tests, or add regression tests across the site.
author: Todd Warren
version: 1.0.0
keywords:
  - qa
  - coverage
  - site-coverage
  - course-materials
  - vitest
  - playwright
  - astro
  - testing
tags:
  - testing
  - qa
  - workflow
---

# QA Site Coverage

Use this skill when the request is to review project quality, maintain overall site coverage goals, or add/update tests around important site journeys.

## Goal

Keep the site experience covered at the right level:

- Unit tests for React components, utilities, and behavior that can be isolated.
- Playwright e2e tests for real routes, content rendering, optimized images, navigation, filters, redirects, and critical user journeys.
- No duplicate coverage when a smaller unit test already proves the behavior and e2e would only repeat implementation details.

## Required Context

Read these files before choosing tests:

1. `.github/copilot-test-instructions.md` for Vitest and Playwright patterns.
2. `.github/copilot-instructions.md` for Astro, React, Tailwind, and component constraints.
3. `docs/04-style-guide.md` for information architecture and tone guardrails when test names or fixtures mention user-facing copy.
4. `src/content/config.ts` and the relevant `src/pages/*`, `src/layouts/*`, and `src/components/*` files for the routes or components under review.
5. `src/pages/course-materials/[slug].astro`, `src/layouts/materials/*`, and `src/layouts/TutorialLayout.astro` when course materials are in scope.

Only read more files after the first audit points to a specific route, component, or content collection.

## Workflow

### 1. Audit Existing Coverage

Use fast searches first:

```bash
rg --files src e2e | rg '(\.test\.(ts|tsx)|\.spec\.ts|pages/|layouts/|components/|content/)'
```

Then identify gaps by comparing:

- Top-level routes in `src/pages/`, including home, teaching, writing, AutoSoftToday, consulting, about, resume, RSS, and robots.
- Dynamic routes in `src/pages/`, including teaching detail, writing detail, writing tags, and course-material detail pages.
- Content collections in `src/content/`, especially writing, teaching, course materials, page content, projects, services, and experience data.
- Shared layouts in `src/layouts/` and shared UI/navigation components in `src/components/`.
- Course material routes in `src/content/course-materials/`.
- Interactive React components with `.tsx` files but no colocated `.test.tsx`.
- Existing e2e tests under `e2e/`.

Summarize the smallest useful test plan before editing if the change spans both unit and e2e tests.

### 2. Choose Unit vs E2E

Use Vitest unit tests for:

- React component props, state, callbacks, conditional rendering, and accessibility labels.
- Utilities such as slug, reading-time, filtering, grouping, or progress calculations.
- Edge cases that are awkward or slow in a browser.

Use Playwright e2e tests for:

- Real Astro routes, including `/`, `/teaching/`, `/teaching/<slug>/`, `/course-materials/<slug>/`, `/writing/`, writing detail and tag pages, `/consulting/`, `/autosoft-today/`, `/about/`, and `/resume/`.
- Tutorial progress behavior that depends on rendered page headings.
- Content collection rendering across multiple layouts.
- Optimized images, links, redirects, and navigation between pages.
- RSS and robots outputs when route behavior or metadata changes.
- Mobile or viewport-sensitive flows that cannot be trusted from component tests alone.

Avoid e2e tests for isolated prop variations that a unit test can cover more directly.

### 3. Unit Test Rules

Follow `.github/copilot-test-instructions.md` exactly:

- Vitest only: `vi.fn()` and `vi.mock()`, never Jest APIs.
- Colocate React component tests beside the component as `ComponentName.test.tsx`.
- Include the Copilot test-instructions header as the first line of new React test files.
- Prefer Testing Library queries in accessibility order: role, label, placeholder, text, then test id.
- Add `data-testid` only when accessible queries do not give a stable, user-facing hook.
- Mock child components when the parent behavior is the subject under test.

Run focused tests first:

```bash
npx vitest run path/to/file.test.tsx
```

Then run the full unit suite:

```bash
npm run test:run
```

### 4. Playwright Test Rules

Place e2e specs in `e2e/` with `feature-name.spec.ts`.

Use existing config defaults:

- Base URL: `http://localhost:4321`
- Dev server managed by Playwright via `playwright.config.ts`
- Chromium project by default

Prefer durable locators:

- `page.getByRole(...)` and `page.getByText(...)` for user-visible behavior.
- `page.locator(...)` only for stable structural hooks already present in Astro markup.
- Avoid selectors coupled to Tailwind class names unless the class is already the feature hook, such as an existing `.post-card` convention.

Good site coverage e2e scenarios include:

- Primary navigation links reach the expected sections without 404s.
- Home page renders the main identity, activity, project, and footer paths that users rely on.
- Writing index, writing detail, and tag pages render posts, tags, images, and preserved slugs.
- Consulting, AutoSoftToday, About, and Resume pages render their primary content and outbound links.
- Teaching pages list relevant course resources and link to course-material detail pages.
- Tutorial course materials render progress navigation when the markdown has multiple `##` headings.
- Each course material layout renders its core title/description content without console or page errors.
- Exercise, resource, slides, timeline, and post layouts render their expected core content.
- Optimized images on writing or course cards load with nonzero `naturalWidth` and meaningful alt text.

Run focused e2e tests first:

```bash
npx playwright test e2e/feature-name.spec.ts
```

Then run the full e2e suite if the change affects shared routing, layouts, or content:

```bash
npm run test:e2e
```

### 5. Coverage Goal Heuristics

The overall goal is meaningful site coverage, not line-count inflation.

Prioritize tests that protect:

- Top-level navigation and route availability.
- Dynamic route generation and slug stability for writing, teaching, and course materials.
- Content collection schemas and rendering assumptions.
- Course-materials route generation and slug stability.
- Tutorial progress and layout selection.
- Teaching-to-course navigation.
- Writing and tag routes that support course-adjacent content discovery.
- Consulting, AutoSoftToday, About, and Resume pages when their content or links change.
- RSS, robots, sitemap-adjacent behavior, and redirects when route metadata changes.
- Accessibility-critical navigation, headings, links, image alt text, and form controls.
- Regression-prone content rendering across multiple layouts and content types.

Do not add tests that only snapshot styling or assert Tailwind class lists.

### 6. Validation

Before finishing:

1. Run the narrowest affected unit/e2e tests.
2. Run `npm run test:run` when adding or changing unit tests.
3. Run `npm run test:e2e` when adding or changing e2e tests or shared route/layout behavior.
4. Run `npm run build` if changes touch Astro content schemas, dynamic routes, layouts, or image handling.
5. Report any test command that could not be run and why.

## Completion Criteria

The task is complete when:

- Gaps are addressed with the smallest effective mix of unit and e2e tests.
- New tests are placed in the existing repo conventions.
- Tests verify user-visible behavior and whole-site coverage risks.
- Relevant focused and broad validation commands have been run or explicitly reported as blocked.
