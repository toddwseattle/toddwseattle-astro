# Making the Course Timeline Reusable — Full Plan

**Status:** Not started
**Owner:** Todd Warren
**Last updated:** 2026-09-07

Goal: extract the course-materials timeline (currently ~1,150 LOC of React interaction
code in `src/components/timeline/`) so it can be used in another Astro project without
forking a copy that immediately drifts.

---

## Contents

- [What exists today](#what-exists-today)
- [Why it can't just be copied](#why-it-cant-just-be-copied)
- [Alternatives considered](#alternatives-considered)
- [The plan](#the-plan)
- [Master todo list](#master-todo-list)
- [Decision log](#decision-log)

---

## What exists today

Two unrelated components share the name. `src/components/ui/Timeline.astro` (38 lines) is
a simple vertical résumé band and is **out of scope**. The course timeline is a React
island stack:

| File | LOC | Role |
| --- | ---: | --- |
| `src/components/timeline/TimelineViewer.tsx` | 123 | Orchestrator — owns category/era state and the list↔interactive view toggle |
| `src/components/timeline/InteractiveTimeline.tsx` | 596 | Horizontal scrolling track: era bands, year ticks, dots, detail panel |
| `src/components/timeline/TimelineExplorer.tsx` | 111 | Vertical list view (also the mobile fallback) |
| `src/components/timeline/TimelineEvent.tsx` | 189 | Expandable list card |
| `src/components/timeline/CategoryFilter.tsx` | 58 | Category pill radiogroup |
| `src/components/timeline/EraFilter.tsx` | 65 | Era pill radiogroup |
| `src/data/timelines/shared.ts` | ~130 | Types, `timelineCategoryMeta`, `filterEvents` |
| `src/lib/timelineAnalytics.ts` | 259 | gtag session/event tracking |
| `src/components/timeline/*.test.tsx` | 216 | Vitest suites (3 files) |

Datasets live in `src/data/timelines/` (~87 KB of TypeScript across
`software-engineering-history.ts` and `smartphone-revolution.ts`).

Site-specific glue that will **not** be extracted — it is trivial to rewrite per project:

- `src/layouts/materials/TimelineLayout.astro` (31 lines)
- `timelineKey: z.enum(timelineKeys).optional()` in `src/content/config.ts:209`
- the branch in `src/pages/course-materials/[slug].astro:50`

## Why it can't just be copied

Five coupling points, in rough order of pain:

1. **Closed category union.** `TimelineCategory` in `src/data/timelines/shared.ts` is a
   hardcoded union of nine slugs that already mixes two domains (`practices-tools`,
   `teamwork-process`, … alongside `devices`, `startups`, `market`). `timelineCategoryMeta`
   is an exhaustive `Record<TimelineCategory, CategoryMeta>`. Any third timeline requires
   editing the library's own type — which is exactly what makes a shared copy
   un-shareable.
2. **Baked-in Tailwind tokens.** 208 references to `paper-*`, `ink-*`, `graphite-*`,
   `surface-dark`, `accent-teal`, `accent-soft` across the components *and* inside
   `pillClassName` in the data layer. Also assumes `darkMode: "class"` and `font-sans` →
   Manrope. A consumer must copy the Chronicle colour block from `tailwind.config.js` or
   nothing renders correctly.
3. **Hardcoded dark track.** `InteractiveTimeline.tsx:38-51` holds literal colours —
   `TRACK_BACKGROUND = "rgb(13 13 15)"`, `DOT_MAJOR`, `ACCENT_TEAL`, and
   `rgba(255,255,255,…)` era fills. The interactive view has no light mode at all.
4. **Analytics is an import, not a seam.** `TimelineExplorer` and `TimelineEvent` import
   `src/lib/timelineAnalytics` directly and reach for `window.gtag`. It no-ops safely
   without GA, but cannot be pointed at Plausible/PostHog without editing components.
5. **Relative imports.** `../../data/timelines`, `../../lib/timelineAnalytics` — the tree
   layout is load-bearing, and `tsconfig.json` defines no path alias.

Secondary issues worth fixing in passing:

- `TimelineViewer` mounts `TimelineExplorer` even when it is hidden behind `md:hidden`, so
  on desktop the DOM carries a duplicate `<h2>` and a second analytics session init.
- Both view components render their own header block, so the host page cannot control the
  document outline.
- Raw `<img>` tags violate the repo's "always `<Image />`" rule — but they are also what
  makes the component portable. **Keep them**; note the exception rather than fixing it.

Runtime prerequisites for any consumer: React 18, `framer-motion ^11`, Tailwind 3.4.

## Alternatives considered

| # | Option | Verdict |
| --- | --- | --- |
| A | Copy-paste fork | Rejected as the endpoint. Hours of work, but the fork must edit the category union, so bugfixes can never merge back. |
| B | Git submodule / subtree | Rejected. Solves neither tokens nor the closed union, and submodules are miserable for a Tailwind-dependent component. |
| C | Private npm package (`@toddwseattle/timeline`, GitHub Packages) | **Chosen destination.** Real versioning; one bugfix lands everywhere. Costs a lib build, a release chore, and the Tailwind purge glob. |
| D | npm-workspaces monorepo | Rejected for now. Best DX for co-development, but restructuring two repos with separate deploy targets for one component is a large bet. Revisit if 3+ components end up shared. |
| E | Harden in place, copy deliberately (shadcn-style) | **Chosen as the path.** No infrastructure; the refactor is the real value regardless of distribution mechanism. |

Key observation: **C, D and E all need the same refactor first.** Distribution is the
cheap part; decoupling is the work. Picking a mechanism before doing the refactor is
backwards.

## The plan

### Stage 1 — Harden in place

**Where:** this repo. **Effort:** ~half a day. **Visible change:** none.

Open the category type, move colours to CSS custom properties, inject analytics, lift the
header out, add a barrel export, fix the hidden-mount bug. Detailed in
[`step-1-harden.md`](./step-1-harden.md).

Exit criteria: `npm run test:run` and `npm run build` both pass; both existing timeline
pages render identically; no `paper-*`/`ink-*`/`graphite-*`/`accent-*` class remains inside
`src/components/timeline/`.

### Stage 2 — Copy into the second project and validate

**Where:** the target Astro project. **Effort:** ~2 hours.

Copy the hardened `src/components/timeline/` + the types module + `timeline.css`. Write a
fresh ~10-line `.astro` wrapper and a fresh dataset with its own category vocabulary. Wire
the target's own analytics through `onEvent`.

The point of this stage is to find what Stage 1 got wrong while changing the contract is
still free. One consumer is a bad teacher for an API; two is enough.

Exit criteria: the second site renders a timeline with categories that do **not** exist in
this repo, and with its own colour palette, using unmodified component source.

### Stage 3 — Extract to a package

**Where:** new repo `toddwseattle/timeline`. **Effort:** ~1 day.

Publish `@toddwseattle/timeline@0.1.0` to GitHub Packages. Ships components, types,
`filterEvents`, `timeline.css`, and a Tailwind preset. Peer deps on `react`, `react-dom`,
`framer-motion`. Both sites switch to the dependency.

Explicitly **not** shipped: the `.astro` wrapper, the gtag adapter, the datasets, the
content-collection schema.

Exit criteria: both sites build from the published package; a deliberate bugfix released as
`0.1.1` reaches both with only a version bump.

---

## Master todo list

Update the checkboxes in place as work lands. Stage-1 detail lives in
[`step-1-harden.md`](./step-1-harden.md) — this list tracks it at one line per task.

### Stage 1 — Harden in place

- [ ] **1.1** Open the category type; move `timelineCategoryMeta` into `TimelineConfig`
- [ ] **1.2** Extract colours to CSS custom properties in `timeline.css`; give the interactive track a light mode
- [ ] **1.3** Replace direct analytics imports with an `onEvent` callback prop
- [ ] **1.4** Lift the header block out of `TimelineExplorer` and `InteractiveTimeline`
- [ ] **1.5** Fix the hidden-mount duplicate `<h2>` / duplicate analytics session
- [ ] **1.6** Add a barrel `index.ts`; remove cross-tree relative imports
- [ ] **1.7** Update tests to cover a custom category vocabulary
- [ ] **1.8** Update `docs/course-materials/timeline-authoring.md` for the new config shape

### Stage 2 — Copy and validate

- [ ] **2.1** Identify the target project and its Tailwind/React/framer-motion versions
- [ ] **2.2** Copy hardened components + types + `timeline.css` into the target
- [ ] **2.3** Author a dataset there with a category vocabulary unique to that project
- [ ] **2.4** Write the target's `.astro` wrapper and page wiring
- [ ] **2.5** Wire the target's analytics through `onEvent`
- [ ] **2.6** Override the CSS custom properties to the target's palette; verify light + dark
- [ ] **2.7** Log every source edit that was required — each one is a Stage-1 defect
- [ ] **2.8** Fold those defects back into this repo before Stage 3

### Stage 3 — Package

- [ ] **3.1** Create `toddwseattle/timeline` repo; decide GitHub Packages vs. npm private
- [ ] **3.2** Set up the lib build (tsup or Vite lib mode), ESM-only, `.d.ts` emitted
- [ ] **3.3** Declare peer deps: `react`, `react-dom`, `framer-motion`
- [ ] **3.4** Ship `tailwind-preset.js` and document the consumer `content` glob for `node_modules/**/dist`
- [ ] **3.5** Port the Vitest suites into the package repo; add CI
- [ ] **3.6** Publish `0.1.0`
- [ ] **3.7** Switch this repo to the dependency; delete the local copy
- [ ] **3.8** Switch the second project to the dependency
- [ ] **3.9** Prove the loop: ship a real fix as `0.1.1` and consume it in both

---

## Decision log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-09-07 | Destination is a private npm package (option C), reached via harden-then-copy (option E) | Two timelines already exist here and a third consumer is arriving; that is the count at which fork drift costs more than a package does. The refactor is required either way, so it goes first. |
| 2026-09-07 | Monorepo (option D) deferred, not rejected | Revisit if `ui/`, the reveal.js slide machinery, or other components also end up wanted in the second project. |
| 2026-09-07 | Raw `<img>` retained instead of `astro:assets` `<Image />` | Portability beats the house rule here — the component must run outside Astro's asset pipeline. Documented as a deliberate exception. |
| 2026-09-07 | The `.astro` wrapper stays out of the package | Ten lines, and the most site-specific part of the whole thing. |

---

## Related documents

- [`step-1-harden.md`](./step-1-harden.md) — detailed Stage 1 worklist
- [`../../course-materials/timeline-authoring.md`](../../course-materials/timeline-authoring.md) — current authoring guide (needs updating in task 1.8)
- [`../../timeline-plan/how-use-timeline.md`](../../timeline-plan/how-use-timeline.md) — original design notes (stale: still references `src/data/se-timeline.ts`)
