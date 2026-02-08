# Firebase Hosting Configuration

## Overview

This project deploys a **static** Astro build (`dist/`) to Firebase Hosting with two targets:

- `hosting:staging`
- `hosting:prod`

Both targets share the same static asset configuration, caching headers, and redirect rules. See `firebase.json` and `.firebaserc`.

## Build output

Astro’s default build output is `dist/`. The existing `npm run build` script uses `astro build`, which writes to `dist/`.

## Hosting targets

The repo uses Firebase Hosting targets to support staging and production. Update `.firebaserc` with your actual Firebase project ID and targets if needed.

## Caching headers

Headers are configured to balance performance and freshness:

- `/_astro/**`: fingerprinted build assets are cached aggressively with `immutable`.
- `**/*.html`: HTML is cached with `max-age=0, must-revalidate` to ensure content updates propagate.

## Redirects

Redirects previously handled with `Astro.redirect()` are now handled at the edge via Firebase Hosting:

- `/blog` and `/blog/` → `/writing/` (301)
- `/blog/**` → `/writing/:splat/` (301)

This preserves old blog URLs without requiring SSR.
