# Course Materials Timeline Authoring Guide

This guide explains how to author a new interactive timeline for the course materials collection.

## Where timeline wiring lives

- Data files: src/data/timelines/
- Registry and timeline keys: src/data/timelines/index.ts
- Shared timeline types/meta: src/data/timelines/shared.ts
- Timeline layout: src/layouts/materials/TimelineLayout.astro
- Timeline UI components: src/components/timeline/
- Content schema: src/content/config.ts
- Timeline material markdown entries: src/content/course-materials/

## Authoring a new timeline

1. Add a new timeline data file in src/data/timelines/.
1. Export one typed timeline config object with:

- key
- title
- subtitle
- framing
- categoryOrder
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

- Use existing categories when possible for filter consistency.
- If you add a category, update timelineCategoryMeta in src/data/timelines/shared.ts.
- Each category used in events must have a matching metadata entry.

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
1. Open the course material route and verify:

- timeline renders
- category filtering works
- event links render correctly
- image alt text is present when images are used

## Common failures

- timelineKey exists in markdown but is not in timelineKeys.
- timeline exists but was not added to timelines registry.
- event category is missing from timelineCategoryMeta.
- duplicate event ids create unstable UI behavior.
- invalid sortYear causes chronological order issues.
