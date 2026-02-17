# npx astro check notes

Date: 2026-02-04

## Goal

Resolve `npx astro check` errors while keeping runtime behavior unchanged.

## Changes

- Converted Tailwind config to ESM for a `type: module` project (fixed `module.exports` error).
- Removed `environmentMatchGlobs` after type errors; rely on `@vitest-environment` in the ProgressBar test file.
- Removed unused legacy style files that referenced missing dependencies:
  - `src/assets/styles/globalStyles.ts`
  - `src/assets/styles/variables.ts`
- Hardened icon lookup in `Activities.astro` to avoid indexing with `undefined`.
- Cleaned up a few unused imports and inline script warnings.
- Removed nested anchor click handlers in BlogCard to avoid deprecated global `event` usage.

## Files Updated

- `tailwind.config.js`
- `vitest.config.ts`
- `src/components/Activities.astro`
- `src/components/GoogleAnalytics.astro`
- `src/components/StructuredData.astro`
- `src/components/blog/BlogCard.astro`
- `src/components/Projects.astro`
- `src/components/Header.test.tsx`
- `src/components/ui/Button.test.tsx`
- `src/components/ui/Container.test.tsx`
- `src/components/ui/Icon.test.tsx`
- `src/components/ui/InfoBlock.test.tsx`
- `src/components/ui/TitleSection.test.tsx`
- `src/layouts/TutorialLayout.astro`
- `src/layouts/materials/ExampleLayout.astro`
- `src/pages/course-materials/[slug].astro`
- `src/pages/teaching/[slug].astro`

## Files Removed

- `src/assets/styles/globalStyles.ts`
- `src/assets/styles/variables.ts`

## Follow-up

Run `npx astro check` to confirm the error count is zero.
