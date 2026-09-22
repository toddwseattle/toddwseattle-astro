# Dependency Upgrade — September 2026

**Outcome:** `npm audit` 42 vulnerabilities (1 critical, 16 high) → 0
**PR:** [#25](https://github.com/toddwseattle/toddwseattle-astro/pull/25)
**Last updated:** 2026-09-22

`npm audit` had drifted to 42 advisories and CI gates on `--audit-level=high`, so every
PR against `main` was failing that step. The critical was `astro` itself — 10 advisories
including RCE through AVIF image optimization, host-header SSRF, a base-path
authorization bypass and six XSS vectors — with no backport to the 5.x line. Astro 7.3.3
was the only fix, and everything else followed from that.

---

## Contents

- [Versions](#versions)
- [Why it could not be a lockfile bump](#why-it-could-not-be-a-lockfile-bump)
- [The Tailwind v4 cascade-layer trap](#the-tailwind-v4-cascade-layer-trap)
- [Astro 7: compressHTML](#astro-7-compresshtml)
- [Content Layer migration](#content-layer-migration)
- [Zod 3 → 4](#zod-3--4)
- [What was deliberately not upgraded](#what-was-deliberately-not-upgraded)
- [Verification method](#verification-method)
- [Open items](#open-items)

---

## Versions

| Package                    | Before | After                     |
| -------------------------- | ------ | ------------------------- |
| `astro`                    | 5.18.1 | 7.3.3                     |
| `@astrojs/react`           | 4.4.2  | 6.0.6                     |
| `@astrojs/tailwind`        | 5.1.5  | _removed_                 |
| `@tailwindcss/vite`        | —      | 4.3.3                     |
| `tailwindcss`              | 3.4    | 4.3.3                     |
| `@astrojs/markdown-remark` | —      | 7.3.1 (added, pinned)     |
| `vitest`                   | 4.0.8  | 5.0.1                     |
| `jsdom`                    | 27.2.0 | 30.1.1                    |
| `lighthouse`               | 13.0.1 | 13.5.0                    |
| `@playwright/test`         | 1.57.0 | 1.63.0                    |
| `prettier`                 | 3.1.0  | 3.9.8                     |
| `prettier-plugin-astro`    | 0.12.0 | 0.14.1 (held — see below) |
| `@types/node`              | 20     | 26                        |
| `@fortawesome/*`           | 6      | 7                         |
| `react` / `react-dom`      | 18     | 18 (held)                 |

Also **dropped**: `react-slick`, `@types/react-slick` (no imports anywhere — Gatsby-era
leftovers) and the stale `yaml-language-server` override. **Added**: `@astrojs/check` and
`typescript` as explicit devDependencies; they used to arrive transitively through
`astro-seo` 1.1, so after upgrading it `npx astro check` prompts to install them mid-run,
which would hang CI.

The CI audit gate moved from `--audit-level=high` to `moderate`, in both
`.github/workflows/ci.yml` and the `ci` script.

## Why it could not be a lockfile bump

| Coupling                             | Why                                                                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@astrojs/tailwind` had to go        | Peers on `astro: ^3 \|\| ^4 \|\| ^5` and `tailwindcss: ^3.0.24`, unmaintained since 2025-09-18. Replacing it with `@tailwindcss/vite` forces Tailwind 3 → 4 |
| Legacy content collections removed   | Astro 6 removed `src/content/config.ts` and `type: 'content'` with **no** backwards-compat flag                                                             |
| `entry.slug` / `entry.render()` gone | Content Layer makes `id` the slug and moves rendering to a free function                                                                                    |
| Default Markdown processor changed   | Astro 7 ships Sätteri; `@astrojs/markdown-remark` is no longer installed by default                                                                         |

## The Tailwind v4 cascade-layer trap

**This is the one to remember.** Tailwind v3's `@layer` was a build-time grouping that
emitted plain, _unlayered_ CSS. Tailwind v4 emits **real CSS cascade layers**, and in the
cascade, layer membership is evaluated _before_ specificity:

> Unlayered CSS always wins over layered CSS, no matter how specific the layered rule is.

So every rule in a `@layer` block silently changed its weight relative to vendor CSS and
to Tailwind's own utilities. None of it showed up in the built HTML — the markup was
byte-identical. It only appeared in a browser. Three things broke here, in both
directions:

**Layered rule lost to unlayered vendor CSS** — slide decks rendered blank.
`.slides-layout .reveal { height: 100vh }` sat in `@layer components` and lost to
reveal.css's unlayered `.reveal { height: 100% }`, collapsing every deck to zero height
against an auto-height parent.

**Layered rule lost to a later layer** — prose lost its editorial link styling.
`.prose a`'s teal underline lost to `@tailwindcss/typography`, whose output lands in a
later layer; `.prose ul` / `.prose li` margins reverted to plugin defaults too.

**Unlayered rule beat a utility** — the resume's teal nav buttons turned near-black on
teal. `BaseLayout.astro`'s `<style is:global>` is unlayered, so its element-level
`a { @apply text-ink-800 }` beat the `text-paper-50` utility class on those buttons.

### The rule of thumb that came out of it

| What the rule is                                                                           | Where it goes | Why                                                                              |
| ------------------------------------------------------------------------------------------ | ------------- | -------------------------------------------------------------------------------- |
| Element-level defaults (`a`, `body`, `button`)                                             | `@layer base` | So utilities can still override them                                             |
| Preflight compatibility shims                                                              | `@layer base` | Unlayered, the universal `border-color` rule would beat every `border-*` utility |
| Component overrides that must beat vendor CSS or a plugin (`.prose *`, `.slides-layout *`) | **unlayered** | Restores v3 behaviour, where specificity decided                                 |

`src/assets/styles/global.css` carries comments at each of these explaining why, so the
next person does not "tidy" them back into a layer.

### Other v4 changes handled

Preflight defaults that changed and were pinned back to v3 values in `@layer base`:
border colour (`currentColor` → `gray-200`), placeholder colour, button cursor.

Utilities whose scale shifted, renamed to preserve rendered values:
`outline-none` → `outline-hidden`, `rounded-sm` → `rounded-xs`, bare `rounded` →
`rounded-sm`, `backdrop-blur-sm` → `backdrop-blur-xs`.

`tailwind.config.js` is **kept**, loaded explicitly with `@config` — v4 no longer
auto-discovers it. The Chronicle Data System tokens, `darkMode: "class"` and the
typography plugin all still live there. A CSS-first `@theme` migration is a separate
job.

## Astro 7: compressHTML

Astro 7 changed the `compressHTML` default from `true` to `'jsx'`, which strips
whitespace around elements using JSX rules. On this site that glued inline links to the
preceding word:

- "through _Envorso_" → "through**Envorso**"
- "Northwestern University's _Farley Center_" → "University's**Farley Center**"
- "see the _resume_" → "see the**resume**"

`astro.config.mjs` now sets `compressHTML: true` explicitly, which is Astro 5's
HTML-aware compression. Revisit only alongside a formatter that emits JSX whitespace
conventions consistently (see [below](#what-was-deliberately-not-upgraded)).

## Content Layer migration

- `src/content/config.ts` → **`src/content.config.ts`** (the only path Astro 6+ accepts)
- Every collection drops `type: "content"` and gains a `glob()` loader from
  `astro/loaders`
- `z` now imported from `astro/zod`, not `astro:content` (deprecated in v6)
- `entry.slug` → `entry.id` at the 6 sites that build URLs
- `await entry.render()` → `await render(entry)`, with `render` imported from
  `astro:content`, at all 9 sites
- Prop types using `Awaited<ReturnType<CollectionEntry[...]["render"]>>` → the
  `RenderResult` type that `astro:content` exports
- `entry.body` is now optional — guard it

**The glob pattern matters.** `blog/`, `projects/` and `testimonials/` keep images
alongside the posts, so the pattern is `**/[^_]*.md` — otherwise the images become
collection entries.

**Slug parity held.** Legacy slugs were the slugified filename; Content Layer ids are
the slugified path relative to `base`. For flat directories these land identically, and
no post carried a `slug:` frontmatter override. All 58 routes were unchanged — but this
was _verified_, not assumed, and is the thing to check first in any similar migration.

One latent bug surfaced: `src/pages/rss.xml.ts` never sorted, inheriting whatever order
the legacy loader returned. The loader change reordered the feed. It now sorts
newest-first, matching `pages/writing/index.astro`.

## Zod 3 → 4

Came with Astro 7. `astro/zod` resolves to Zod 4.6.5 (Astro's nested copy).

- `z.string().url()` → `z.url()` — the string formats moved to the top-level `z`
  namespace
- Not applicable here, but the other two breaking patterns to look for: custom error
  messages (`{ message: ... }` → `{ error: ... }`) and `.default()` on a transform,
  where the default must now match the _output_ type (use `.prefault()` for the old
  behaviour)

`astro check` surfaces Zod deprecations as TypeScript hints, so `- 0 hints` is a
meaningful all-clear.

## What was deliberately not upgraded

**`prettier-plugin-astro` held at 0.14.1.** 1.0.1 puts a newline between `</a>` and
following punctuation, and HTML renders that newline as a space — a formatter silently
rewriting prose. Four configurations were tested:

| Plugin | `compressHTML` | Result                                         |
| ------ | -------------- | ---------------------------------------------- |
| 0.14.1 | `true`         | ✅ correct — **shipped**                       |
| 0.14.1 | `'jsx'`        | ❌ "through**Envorso**"                        |
| 1.0.1  | `true`         | ❌ "Envorso **,** and"                         |
| 1.0.1  | `'jsx'`        | ❌ fixes the comma, still "through**Envorso**" |

1.0.1 emits `{" "}` for _some_ inline boundaries but not those before links, so pairing
it with JSX compression does not rescue it. `htmlWhitespaceSensitivity`
(`css` / `strict` / `ignore`) makes no difference. There is no config-level escape.
Re-test the matrix above when upstream ships a fix.

**Markdown pinned to remark/rehype.** Astro 7's Sätteri would have re-rendered every
post at the same time that baseline was the thing being verified. See
[`docs/markdown/satteri-migration/audit.md`](../markdown/satteri-migration/audit.md).

**React held at 18.** `@astrojs/react` 6 and `framer-motion` 13 both support it; nothing
in the audit required 19.

## Verification method

The plan was to diff built HTML against a pre-upgrade build. **That turned out to be
insufficient** — all three cascade-layer bugs produce byte-identical markup, and the
`compressHTML` bug changes only whitespace. Three layers were needed:

1. **Route parity.** `find dist -name '*.html' | sed 's|^dist||' | sort`, diffed against
   a build of `main`. This is the gate for "no slug moved" and it is cheap.
2. **Browser-rendered text.** Serve both builds, load every route in Chromium, compare
   `document.body.innerText`. This is what caught `compressHTML`. Naive tag-stripping
   does _not_ work — replacing tags with a space hides exactly the glued-word bug you
   are looking for.
3. **Full visual sweep.** Screenshot all 58 routes in both builds, light and dark, and
   compare pixels. This is what caught all three cascade bugs. Expect a low-percentage
   floor of sub-pixel text antialiasing from Tailwind v4's `calc()`-based spacing
   (24px vs 23.9999px) — triage by cropping and looking, not by the percentage alone.

Plus the standing checks: `npm run ci` (install, audit, `astro check`, 70 unit tests)
and `npm run test:e2e` (9 Playwright tests).

**A pre-existing dev-server outage blocked step 3's e2e half.** `npm run dev` returned
HTTP 500 on every page on `main` too. The content config transitively imported the
timeline barrel — `src/content.config.ts` → `data/timelines/index.ts` →
`data/timelines/shared.ts` (a **value** re-export) → `components/timeline/index.ts` →
`import "./timeline.css"` plus the whole React tree. Astro loads the content config in a
plain module context, which cannot do that. Fixed by moving `timelineKeys` into
`src/data/timelines/keys.ts` with no imports of its own.

> **Lesson:** anything `src/content.config.ts` reaches transitively is loaded in Astro's
> config context. Keep that import graph tiny, and prefer a leaf module over a barrel.

## Open items

- [ ] Re-test `prettier-plugin-astro` 1.0.x when upstream fixes the inline-whitespace
      bug; the matrix above is the test
- [ ] Take the Sätteri default — see
      [`docs/markdown/satteri-migration/audit.md`](../markdown/satteri-migration/audit.md)
- [ ] Retire `src/data/timelines/shared.ts`; its own comment says to remove it once
      nothing imports it, and its value re-export from the timeline barrel is what broke
      the dev server
- [ ] `npm run format` is not idempotent on
      `src/content/course-materials/reveal-introduction-to-software-engineering.md` —
      prettier 3.9 wants to align a table and add a blank line before it. Renders
      identically either way (verified in a browser); left alone because it is content
- [ ] Consider the CSS-first `@theme` migration to retire `tailwind.config.js` and the
      `@config` bridge
- [ ] Consider React 19
- [ ] Dark mode is unreachable at runtime — the `dark:` variants are styled throughout
      but nothing ever adds the `.dark` class. Noticed while testing; not addressed here
