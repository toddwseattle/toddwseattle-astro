# Step 1 — Harden the Timeline in Place

**Status:** Complete
**Effort:** ~half a day
**Prerequisite:** none
**Next step:** Stage 2 in [`overview.md`](./overview.md#stage-2--copy-into-the-second-project-and-validate)
**Last updated:** 2026-09-07 (implemented)

Decouple the timeline components from this site's design tokens, category vocabulary, and
analytics stack — **without changing what either timeline page looks like**. This is the
prerequisite for every distribution option (copy, package, or monorepo), so it happens
first and independently of the decision about how to ship.

---

## Definition of done

- [x] `npm run test:run` passes (70 tests, 21 of them timeline)
- [x] `npm run build` passes (`astro check` included via `npm run ci`)
- [x] `/course-materials/software-engineering-history-timeline` and
      `/course-materials/smartphone-revolution-timeline` render identically to `main` in
      light and dark, desktop and mobile
- [x] `grep -rE '(paper|ink|graphite)-[0-9]|accent-teal|accent-soft|surface-dark' src/components/timeline/` returns nothing
- [x] No file under `src/components/timeline/` imports from `src/lib/` or `src/data/`
- [x] A timeline can be rendered with a category slug that does not appear anywhere in this repo

## Non-goals

- Do **not** create a package, repo, or workspace — that is Stage 3.
- Do **not** move the datasets out of `src/data/timelines/`.
- Do **not** convert `<img>` to `astro:assets` `<Image />`. Raw `<img>` is what lets the
  component run outside Astro; keep it and note the exception.
- Do **not** redesign the interaction. Behaviour parity is the point.

---

## Tasks

Ordered so each task leaves the tree green. 1.1 and 1.2 are the substantive ones.

### 1.1 — Open the category type

**Problem.** `src/data/timelines/shared.ts` declares a closed nine-member union mixing two
domains, and `timelineCategoryMeta` is an exhaustive `Record` over it. A third timeline
cannot be authored without editing the library's own type.

**Change.** Make the vocabulary data, not type.

```ts
// before
export type TimelineCategory = "practices-tools" | "teamwork-process" | /* …7 more… */;
export const timelineCategoryMeta: Record<TimelineCategory, CategoryMeta> = { /* … */ };

// after
export type TimelineCategory = string;

export interface CategoryMeta {
  label: string;
  /** Class string applied to the category pill. Host-supplied. */
  pillClassName: string;
}

export interface TimelineConfig<TKey extends string = string> {
  key: TKey;
  title: string;
  subtitle: string;
  framing: string;
  categoryOrder: TimelineCategory[];
  /** Display metadata for every slug used in categoryOrder. */
  categoryMeta: Record<TimelineCategory, CategoryMeta>;
  events: TimelineEvent[];
  eras?: TimelineEra[];
}
```

**Migration.** Keep today's nine-entry map in this repo as
`src/data/timelines/chronicleCategoryMeta.ts` and spread it into both existing configs:
`categoryMeta: chronicleCategoryMeta`. Nothing about the two datasets changes otherwise.

**Callers to update.** Every `timelineCategoryMeta[cat]` lookup becomes
`timeline.categoryMeta[cat]`:

- `CategoryFilter.tsx` — needs `categoryMeta` as a prop (it currently only receives `categories`)
- `InteractiveTimeline.tsx` — uncontrolled filter buttons, and the detail-panel pills
- `TimelineEvent.tsx` — the category pills

**Guard.** Missing slug should degrade, not crash. Fall back to the raw slug as the label
and an empty `pillClassName` rather than throwing on `undefined.label`.

**Verify.** `npx vitest run src/components/timeline/` plus a scratch config using a slug
like `"totally-made-up"`.

---

### 1.2 — Extract colours to CSS custom properties

**Problem.** 208 Tailwind token references across the components and inside
`pillClassName`, plus a hardcoded dark-only track in `InteractiveTimeline.tsx:38-51`.

**Change.** Add `src/components/timeline/timeline.css` declaring the full variable set with
this site's Chronicle values as defaults, then reference `var(--tl-*)` from the components.

```css
/* timeline.css — defaults match the Chronicle Data System tokens */
[data-timeline-root] {
  --tl-surface: #ffffff; /* paper-50    */
  --tl-surface-raised: #f4f3f2; /* paper-100   */
  --tl-surface-sunken: #ecebec; /* paper-200   */
  --tl-text: #1a1a1c; /* ink-800     */
  --tl-text-muted: #5c5b5e; /* ink-600     */
  --tl-text-faint: #8a898d; /* graphite-400 */
  --tl-border: rgb(74 73 76 / 0.3); /* graphite-600/30 */
  --tl-accent: #008080; /* accent-teal */
  --tl-accent-soft: #e0f2f2; /* accent-soft */

  /* interactive track */
  --tl-track-bg: rgb(13 13 15);
  --tl-track-line: rgb(255 255 255 / 0.14);
  --tl-dot-major: rgb(209 213 219);
  --tl-dot-notable: rgb(107 114 128);
  --tl-dot-selected: rgb(255 255 255);
  --tl-dot-border: rgb(156 163 175);
  --tl-era-a: rgb(255 255 255 / 0.025);
  --tl-era-b: rgb(255 255 255 / 0.055);
  --tl-era-active: rgb(255 255 255 / 0.1);
  --tl-era-dim: rgb(255 255 255 / 0.01);
}

.dark [data-timeline-root] {
  --tl-surface: #2e2d30; /* surface-dark  */
  --tl-surface-raised: #403f41; /* graphite-700  */
  --tl-text: #f4f3f2; /* paper-100     */
  --tl-text-muted: #ecebec; /* paper-200     */
  --tl-border: #4a494c; /* graphite-600  */
}
```

**Applying it.** In markup use arbitrary-value Tailwind (`bg-[var(--tl-surface)]`,
`text-[var(--tl-text)]`, `border-[var(--tl-border)]`) so the utility model is preserved,
and swap the `InteractiveTimeline` constants from literals to `var(--tl-*)` strings. Add
`data-timeline-root` to the outermost element of `TimelineViewer` so the variables scope
cleanly.

**Bonus fix.** Once the track reads `var(--tl-track-bg)`, the interactive view can finally
have a light mode — set light values under the non-`.dark` selector. Do this as a separate
commit after parity is confirmed, so a visual regression is easy to bisect.

**Watch out.** Arbitrary values must be literal strings in the source for Tailwind's
scanner to emit them; do not build class names by interpolation.

**Verify.** Screenshot both timeline pages before and after, light and dark, at 375px and
1440px.

---

### 1.3 — Inject analytics instead of importing it

**Problem.** `TimelineExplorer.tsx` and `TimelineEvent.tsx` import
`src/lib/timelineAnalytics` directly and reach for `window.gtag`.

**Change.** Add one optional prop, threaded from `TimelineViewer` down:

```ts
export type TimelineEventName =
  | "category_filter"
  | "event_opened"
  | "event_link_clicked"
  | "session_summary";

export interface TimelineAnalytics {
  onEvent?: (name: TimelineEventName, params: Record<string, unknown>) => void;
}
```

The session bookkeeping in `timelineAnalytics.ts` (session id, device type, referrer,
engagement intensity, the `beforeunload`/unmount summary) is genuinely useful and should
**stay in the component** — it is generic. Only the `window.gtag(...)` calls move out, into
a thin adapter in this repo:

```ts
// src/lib/timelineGtagAdapter.ts
export const gtagAdapter = (
  name: TimelineEventName,
  params: Record<string, unknown>,
) => {
  window.gtag?.("event", `timeline_${name}`, params as never);
};
```

`TimelineLayout.astro` passes `onEvent={gtagAdapter}`. With no `onEvent`, tracking is inert
— same as today's behaviour when GA is absent.

**Verify.** A test asserting `onEvent` fires with `"category_filter"` on a pill click, and
that rendering without `onEvent` does not throw.

---

### 1.4 — Lift the header out of the view components

**Problem.** `TimelineExplorer` renders `<h2>{title}</h2>` plus subtitle and framing;
`InteractiveTimeline` renders its own `<h2>` and subtitle. The host page cannot control its
own document outline, and the two blocks disagree.

**Change.** Delete both header blocks. Add `header?: ReactNode` to `TimelineViewer`,
rendered once above the filter bar. Provide a `TimelineHeader` component exporting today's
markup so callers who want the default get it in one line.

**Verify.** Exactly one `<h2>` in the rendered DOM on desktop and on mobile.

---

### 1.5 — Fix the hidden-mount duplication

**Problem.** `TimelineViewer.tsx` wraps `TimelineExplorer` in `md:hidden` when the
interactive view is active — CSS-hidden but still mounted. Its `useEffect` fires
`initTimelineSession`, so desktop visitors start two sessions, and the DOM carries a second
(hidden) heading.

**Change.** 1.4 removes the duplicate heading. For the session, hoist session
initialisation into `TimelineViewer` and pass the session down, so exactly one exists per
mounted timeline regardless of which views are rendered.

Do not switch to a JS media query to unmount the list view — the current CSS approach is
what makes the mobile fallback work without hydration flicker. Keep it.

**Verify.** A test asserting one `session_summary` on unmount when both views are rendered.

---

### 1.6 — Barrel export and import hygiene

**Change.** Create `src/components/timeline/index.ts` exporting the components, the types,
`filterEvents`, and `TimelineHeader`. Move `shared.ts` to
`src/components/timeline/types.ts` so the component directory is self-contained; re-export
from `src/data/timelines/shared.ts` for one release so the datasets and
`src/content/config.ts:2` keep working unchanged.

After this task, `src/components/timeline/` imports nothing outside itself except `react`
and `framer-motion` — that property is the whole point of Stage 1, and is worth an explicit
grep in CI later.

**Verify.** `grep -rn "\.\./\.\./" src/components/timeline/` returns nothing.

---

### 1.7 — Extend the tests

The three existing suites (`TimelineEvent`, `TimelineExplorer`, `CategoryFilter`,
`EraFilter`) all build fixtures from the real slug vocabulary. Add:

- a fixture using invented slugs with its own `categoryMeta`, proving 1.1
- an `onEvent` spy assertion, proving 1.3
- a single-`<h2>` assertion, proving 1.4 and 1.5

Per house style: `vi.fn()` / `vi.mock()`, never Jest equivalents; build the tests one at a
time.

---

### 1.8 — Update the authoring docs

`docs/course-materials/timeline-authoring.md` documents the current config shape and needs
the new `categoryMeta` field plus the CSS-variable story.
`docs/timeline-plan/how-use-timeline.md` is already stale (it still points at
`src/data/se-timeline.ts`, which no longer exists) — either refresh it or mark it
historical and link to this directory.

---

## Risks

| Risk                                                           | Mitigation                                                                                                                                    |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Tailwind purges arbitrary `var()` classes                      | Keep class strings literal in source; verify against the built CSS in `dist/`, not just dev                                                   |
| Silent visual regression from the token swap                   | Screenshot both pages, both themes, two widths, before and after; commit 1.2's light-mode track separately from the parity change             |
| `TimelineCategory = string` loses autocomplete on the datasets | Each dataset keeps a local `as const` union and passes it as `TimelineConfig`'s type argument — narrowing stays local, the library stays open |
| Import re-export shim in 1.6 lingers forever                   | Track its removal as part of task 3.7                                                                                                         |

## Todo list

Update in place as work lands. Mirrors the Stage-1 block in
[`overview.md`](./overview.md#stage-1--harden-in-place).

- [x] **1.1** Open the category type
  - [x] `TimelineCategory` → `string`; add `categoryMeta` to `TimelineConfig`
  - [x] Extract today's map to `chronicleCategoryMeta.ts`; wire into both datasets
  - [x] Update lookups in `CategoryFilter`, `InteractiveTimeline`, `TimelineEvent`
  - [x] Add the unknown-slug fallback
- [x] **1.2** Colours to CSS custom properties
  - [x] Write `timeline.css` with Chronicle defaults + `.dark` overrides
  - [x] Add `data-timeline-root` to `TimelineViewer`
  - [x] Replace the 208 token classes with `var(--tl-*)` arbitrary values
  - [x] Replace the `InteractiveTimeline.tsx:38-51` literals
  - [ ] Confirm parity, then add the light-mode track (deferred — see note below)
- [x] **1.3** Analytics injection
  - [x] Add `onEvent` to `TimelineViewer` and thread it down
  - [x] Strip `window.gtag` from the shared analytics module
  - [x] Add `src/lib/timelineGtagAdapter.ts`; wire in `TimelineLayout.astro`
- [x] **1.4** Lift the header
  - [x] Remove both internal header blocks
  - [x] Add `header` prop + default `TimelineHeader` export
- [x] **1.5** Fix hidden-mount duplication
  - [x] Hoist session init to `TimelineViewer`; pass session down
- [x] **1.6** Barrel + import hygiene
  - [x] `index.ts` barrel
  - [x] `shared.ts` → `types.ts` with a re-export shim
  - [x] Confirm zero cross-tree relative imports
- [x] **1.7** Tests
  - [x] Invented-vocabulary fixture
  - [x] Local `testFixtures.ts` so the tests do not import site data either
  - [x] `onEvent` spy
  - [x] Single-`<h2>` assertion
- [x] **1.8** Docs
  - [x] Refresh `docs/course-materials/timeline-authoring.md`
  - [x] Refresh or retire `docs/timeline-plan/how-use-timeline.md`
- [x] **Done** — run the [definition of done](#definition-of-done) checklist

### Verification record

Production build compared against production build (dev-server output is not
comparable — asset hashing and CSS ordering differ), both timeline pages, light
and dark, at 1440px and 375px:

| Shot                                                 | Differing pixels |
| ---------------------------------------------------- | ---------------- |
| se-desktop-light                                     | 0                |
| se-mobile-light                                      | 0                |
| phone-mobile-light                                   | 0                |
| phone-desktop-light                                  | 449 (0.024%)     |
| se-desktop-dark / se-mobile-dark / phone-mobile-dark | 220-222 (~0.01%) |
| phone-desktop-dark                                   | 314 (0.017%)     |

The light-mode `phone-desktop` difference is framer-motion pulse-ring phase on
the interactive track, not styling — the animation is JS-driven, so it lands at a
different point between runs. The dark-mode differences are all the same two
"FILTER BY:"/"ERAS:" labels, from the one deliberate merge noted below.

### Deviations from the plan

1. **Two near-duplicate variables merged.** The plan implied a 1:1 mapping.
   `dark:text-paper-200/70` and `dark:text-paper-200/75` were collapsed into a
   single `--tl-text-faint-on-surface` (75%). A 5% alpha difference on two
   uppercase labels, dark-mode only.
2. **Light-mode interactive track deferred.** The track is still dark in both
   themes, now via `--tl-track-bg` rather than a literal. It is a one-line
   override whenever wanted, but it is a real visual change and did not belong
   in a parity commit.
3. **`box-shadow` glow uses its own variables** (`--tl-accent-glow`,
   `--tl-accent-glow-soft`) rather than relative colour syntax
   (`rgb(from var(--tl-accent) ...)`), which is newer than this component needs
   to require.
4. **Two defects fixed that the plan did not anticipate** — see the Findings
   section in the Stage 1 entry of [`overview.md`](./overview.md).

### Note for whoever picks up dark mode

`darkMode: "class"` is configured in `tailwind.config.js`, but nothing in this
repo ever adds the `dark` class to an element. Every `dark:` variant on the site
is currently inert. Dark-mode values in `timeline.css` were preserved faithfully
anyway, so a future theme toggle will light them up — but they are untested in
production because they have never rendered.
