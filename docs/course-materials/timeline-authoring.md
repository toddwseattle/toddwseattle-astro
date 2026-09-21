# Course Materials Timeline Authoring Guide

This guide explains how to author a new interactive timeline for the course materials collection.

## Where timeline wiring lives

- Data files: src/data/timelines/
- Registry and timeline keys: src/data/timelines/index.ts
- Site category vocabulary: src/data/timelines/chronicleCategoryMeta.ts
- Timeline layout: src/layouts/materials/TimelineLayout.astro
- Analytics binding: src/components/CourseTimeline.tsx + src/lib/timelineGtagAdapter.ts
- Timeline UI components: src/components/timeline/
- Portable types/helpers: src/components/timeline/{types,helpers}.ts
- Palette: src/components/timeline/timeline.css
- Content schema: src/content/config.ts
- Timeline material markdown entries: src/content/course-materials/

`src/data/timelines/shared.ts` is now a compatibility shim that re-exports from
`src/components/timeline/`. Prefer importing from `src/components/timeline`
directly in new code.

Everything under `src/components/timeline/` is deliberately portable: it imports
nothing else from this site, only `react` and `framer-motion`. See
[../timeline/make-generic/overview.md](../timeline/make-generic/overview.md) for
why, and do not reintroduce site-specific imports there.

## Authoring a new timeline

1. Add a new timeline data file in src/data/timelines/.
1. Export one typed timeline config object with:

- key
- title
- subtitle
- framing
- categoryOrder
- categoryMeta
- events

1. Register the new timeline in src/data/timelines/index.ts.
1. Add the timeline key to timelineKeys in src/data/timelines/index.ts.
1. Create a course material markdown file in src/content/course-materials/ with:

- type: resource
- timelineKey: your new key
- title, description, courses, date

## Required event shape

Each event must include:

- id
- yearDisplay
- sortYear
- title
- description
- categories
- significance

Optional event fields:

- links
- image
- isToolingSpine

## Category rules

Categories are per-timeline data, not a fixed list in the component library. A
timeline declares its own vocabulary through `categoryMeta`, so two timelines on
this site can use entirely different category sets.

- Use `chronicleCategoryMeta` for course timelines so filter styling stays
  consistent across the site.
- To add a category to that shared vocabulary, add an entry to
  src/data/timelines/chronicleCategoryMeta.ts.
- To give one timeline its own vocabulary, pass a different `categoryMeta`
  record in that timeline's config.
- Every category used in events should have a matching metadata entry. A missing
  entry is not fatal — the slug renders as its own label with no pill styling —
  but it looks wrong, so treat it as a bug.

Narrow the category type locally to keep authoring autocomplete:

```ts
export type ExampleCategory = "regulation" | "logistics";

export const exampleTimeline: TimelineConfig<"example", ExampleCategory> = {
  key: "example",
  categoryOrder: ["regulation", "logistics"],
  categoryMeta: chronicleCategoryMeta,
  // ...
};
```

## Colours

The components carry no design tokens. Every colour resolves through a `--tl-*`
custom property declared in src/components/timeline/timeline.css, whose defaults
reproduce the Chronicle Data System palette. To restyle a timeline, redeclare
those properties — do not add Tailwind token classes to component source.

## Analytics

The components emit generic, unprefixed events (`category_filter`,
`event_opened`, `event_link_clicked`, `session_summary`) through the `onEvent`
prop. src/lib/timelineGtagAdapter.ts is the only place that knows they end up in
Google Analytics, prefixed with `timeline_`.

Astro island props must be JSON-serializable, so the handler cannot be passed
from `.astro` frontmatter. src/components/CourseTimeline.tsx binds it instead.

## Frontmatter example

```yaml
---
title: "Example Timeline"
description: "A timeline resource for class discussion."
courses: ["software-engineering"]
type: "resource"
date: "2026-04-06"
timelineKey: "example-timeline"
draft: false
---
```

## Validation checklist

1. Run npm run test:run.
1. Run npm run build.
1. Confirm no stale legacy imports: rg "se-timeline" src
1. Confirm the component directory stayed portable:
   rg -n "\.\./\.\./" src/components/timeline/ (should return nothing)
1. Open the course material route and verify:

- timeline renders
- category filtering works
- event links render correctly
- image alt text is present when images are used

## Common failures

- timelineKey exists in markdown but is not in timelineKeys.
- timeline exists but was not added to timelines registry.
- event category is missing from the timeline's categoryMeta.
- duplicate event ids create unstable UI behavior.
- invalid sortYear causes chronological order issues.
