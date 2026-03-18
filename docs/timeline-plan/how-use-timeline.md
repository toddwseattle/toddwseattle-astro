# How to Use the Timeline

## Overview

The software engineering history timeline is implemented as a **specialized course material entry** in the existing `course-materials` collection.

## Authoring a Timeline Entry

1. Create a markdown file in `src/content/course-materials/`.
2. Set frontmatter:

```yaml
title: "Your Timeline Title"
description: "Short summary"
courses: ["software-engineering"]
type: "resource"
date: "2026-03-18"
timelineKey: "software-engineering-history"
draft: false
```

3. Add optional markdown intro content below frontmatter.

## How Rendering Works

- `src/pages/course-materials/[slug].astro` checks `entry.data.timelineKey`.
- If present, it renders `src/layouts/materials/TimelineLayout.astro`.
- `TimelineLayout` loads timeline data from `src/data/se-timeline.ts` and mounts the interactive React island (`TimelineExplorer`).

## Editing Timeline Data

Update `src/data/se-timeline.ts` to:

- add or remove events
- change categories
- adjust wording for course framing
- include external links
- include optional event images

All events are strongly typed and sorted by `sortYear`.

## Adding Timeline Images

Store timeline image assets in `public/se-timeline/`.

Reference them from `src/data/se-timeline.ts` with the optional `image` field on each event:

```ts
{
	id: "agile-manifesto",
	yearDisplay: "2001",
	sortYear: 2001,
	title: "Agile Manifesto reorients delivery",
	description: "...",
	categories: ["teamwork-process"],
	significance: "major",
	image: {
		src: "/se-timeline/agile-manifesto.jpg",
		alt: "Agile Manifesto signatories at Snowbird",
	},
}
```

Notes:

- Use paths rooted at `/se-timeline/` because assets in `public/` are served from the site root.
- Prefer horizontal images when possible because the timeline card uses a cropped editorial image panel.
- Keep `alt` text descriptive when the image adds context.

## Testing and Validation

Run:

```bash
npm run test:run -- src/components/timeline/*.test.tsx
npm run build
```

These commands validate component behavior and ensure schema/types pass production build checks.
