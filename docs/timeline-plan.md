# Software Engineering History Timeline — Implementation Plan

## Context and Goal

This plan adapts the timeline concept to the **current repository architecture**, where course materials are rendered through `src/pages/course-materials/[slug].astro` and typed via the `course-materials` content collection schema. The outcome is an interactive, filterable timeline experience that fits the site’s writing-first visual style and does **not** require creating a new content collection.

## Repository-Aware Placement Strategy

### Primary entry point (required)

Use the existing dynamic route:

- `src/pages/course-materials/[slug].astro`

This file already routes all course-material entries and chooses layouts based on `entry.data.type`. The timeline should be introduced as a new rendering path inside this flow rather than as a standalone page under a new route.

### Content source placement

Use one new item in the existing collection:

- `src/content/course-materials/software-engineering-history-timeline.md`

Recommended frontmatter:

- `courses: ["software-engineering"]`
- `type: "resource"` **or** `type: "post"` (see decision note below)
- include a timeline-specific flag field (schema-backed) to trigger timeline rendering

### Course page discoverability

Add an explicit link in the software engineering teaching content (if needed) and ensure the card appears in `CourseMaterialsList` automatically because it already filters by `courses` and date.

## Decision: How to Identify Timeline Entries

Because we are not creating a new collection, use a typed flag in the existing schema and entry frontmatter.

### Recommended schema extension

In `src/content/config.ts` under `courseMaterialsCollection`:

- Add optional metadata field:
  - `timelineKey: z.enum(["software-engineering-history"]).optional()`

This keeps the collection stable while giving us a strict, typed switch for specialized rendering.

### Why not rely on slug string checks?

A slug-only check is brittle and not self-documenting. A typed frontmatter key is easier to maintain and safer for future timeline variants.

## Data Modeling (TypeScript, Static)

Create a typed data module:

- `src/data/se-timeline.ts`

### Types

Use strict types based on your idea, with one small repository-friendly extension (`sortYear` for mixed date formats):

```ts
export type TimelineCategory =
  | "practices-tools"
  | "teamwork-process"
  | "platforms-languages"
  | "ai-automation";

export interface TimelineLink {
  label: string;
  url: string;
}

export interface TimelineEvent {
  id: string;
  yearDisplay: string; // "1968", "Late 1970s", "1972–1980"
  sortYear: number; // numeric anchor for deterministic sort/filter ordering
  title: string;
  description: string; // student-readable, 2-4 sentences
  categories: TimelineCategory[];
  isToolingSpine?: boolean;
  significance: "major" | "notable";
  links?: TimelineLink[];
}

export interface TimelineConfig {
  key: "software-engineering-history";
  title: string;
  subtitle: string;
  framing: string;
  events: TimelineEvent[];
}
```

### Export pattern

- Export category metadata map (label + Tailwind class names)
- Export a timeline config object keyed by `timelineKey`
- Export helper utilities:
  - `getTimelineByKey(key)`
  - `filterEvents(events, category)`

No API calls, no runtime fetches.

## Rendering Architecture

## Phase 1 (core behavior)

1. **Entry routing update** in `src/pages/course-materials/[slug].astro`:
   - Detect `entry.data.timelineKey`
   - If present, render new timeline layout/component path
   - Else preserve current behavior exactly

2. **Astro wrapper layout** (recommended):
   - `src/layouts/materials/TimelineLayout.astro`
   - Responsibilities:
     - page frame consistent with existing material layouts
     - optional intro text from content entry
     - mounts React island

3. **React island for interactivity**:
   - `src/components/timeline/TimelineExplorer.tsx`
   - `client:load` from TimelineLayout

4. **Subcomponents**:
   - `src/components/timeline/CategoryFilter.tsx`
   - `src/components/timeline/TimelineEvent.tsx`

5. **Filter model**:
   - default state = `all`
   - single-select category filter in MVP

## Phase 2 (bonus enhancements)

- `src/components/timeline/SpineToggle.tsx`
- optional multi-select categories
- URL query state for sharable filtered views (optional)

## Styling Plan (aligned with existing site tokens)

Use existing Tailwind token classes and tonal patterns from current pages/components:

- Background/surfaces: `bg-paper-*`, `dark:bg-*`
- Text: `text-ink-*`, `dark:text-paper-*`
- Borders: `border-graphite-*`
- Accent emphasis should prefer configured tokens over hardcoded hex values

### Component-level style guidance

- Timeline container:
  - constrained width (`max-w-3xl` or similar)
  - generous vertical rhythm (`py-12`, `space-y-*`)
- Vertical axis:
  - subtle left rule (`border-l`) with tokenized color
- Event cards:
  - soft surface + light border
  - `major` events with stronger title weight and/or slightly stronger border
- Category pills:
  - low-contrast tints; readable text in light/dark mode
- Mobile:
  - stacked year badge above content
  - wrapping filter controls, touch-friendly hit targets

## Interaction and Accessibility

- Filter controls implemented as buttons (`aria-pressed`) or radios (`role="radiogroup"`)
- Keyboard-navigable controls and visible focus states
- Semantic timeline markup where practical:
  - `<ol>` / `<li>` for chronological entries
  - `<time>` for year labels where possible
- Keep animation minimal and respectful (`prefers-reduced-motion`)

## Content Seeding Strategy

Seed events from the supplied tables into `src/data/se-timeline.ts` with these rules:

1. Preserve chronology using `sortYear`
2. Keep `yearDisplay` human-readable for fuzzy periods
3. Allow multi-category mapping
4. Mark tooling backbone events with `isToolingSpine: true`
5. Write concise, student-centered descriptions (2–4 sentences)

## Course-Materials Integration Details

### Existing collection compatibility

Do not create a new collection. Reuse `course-materials` with:

- one new optional schema field (`timelineKey`)
- one content entry that points to timeline data

### `CourseMaterialsList` behavior

No mandatory logic changes required for listing. The timeline appears as a normal card and links to `/course-materials/:slug`.

Optional enhancement:

- add a subtle badge when `timelineKey` is present (e.g., “Interactive”)

## Testing Plan (incremental)

### Unit tests (Vitest + Testing Library)

Create colocated tests:

- `src/components/timeline/TimelineExplorer.test.tsx`
- `src/components/timeline/CategoryFilter.test.tsx`
- `src/components/timeline/TimelineEvent.test.tsx`

Incremental order:

1. renders timeline title/events
2. clicking category filter narrows visible events
3. “All” resets filtered state
4. event card shows year/title/description/category pills
5. (phase 2) tooling spine toggle behavior

Use `vi.mock()` for any child component isolation where needed.

### Integration checks

- `npm run build` validates content schema and route rendering
- manual check of:
  - `/teaching/software-engineering/` list section
  - `/course-materials/software-engineering-history-timeline/` page

## Implementation Task Breakdown

1. **Schema prep**
   - Update `src/content/config.ts` with optional `timelineKey`
2. **Data module**
   - Add `src/data/se-timeline.ts` with typed events + helper exports
3. **Component scaffold**
   - Add timeline React components under `src/components/timeline/`
4. **Layout integration**
   - Add `TimelineLayout.astro`
   - Branch in `src/pages/course-materials/[slug].astro` to render timeline path
5. **Content entry**
   - Add timeline markdown entry in `src/content/course-materials/`
6. **Course discoverability**
   - Verify visibility in teaching course materials list
7. **Tests and verification**
   - Add unit tests incrementally
   - Run format, test, build

## Risks and Mitigations

- **Risk:** route/layout complexity in `[slug].astro` grows.
  - **Mitigation:** isolate timeline rendering in a dedicated `TimelineLayout.astro`.
- **Risk:** timeline data grows large and noisy.
  - **Mitigation:** keep data in one typed module with clear category metadata.
- **Risk:** visual drift from site aesthetic.
  - **Mitigation:** rely on existing token classes and spacing patterns from teaching/material pages.

## Definition of Done

- Timeline accessible at a course-material slug route via existing `[slug].astro` entry point
- No new content collection introduced
- Timeline events sourced from typed TypeScript data module
- Category filtering works (single-select MVP)
- Styling matches existing writing-first, calm UI conventions
- Course page links/users can discover timeline through Course Materials
- Tests added for new React components and build passes

## Out of Scope (for first pass)

- New top-level route tree for timeline
- Server/API-backed timeline data
- Complex animations or heavy client-side visualization libraries
- Reworking global design tokens

## Suggested Initial Frontmatter Example

```yaml
---
title: "Software Engineering History Timeline"
description: "An interactive timeline for understanding how software engineering practices, tools, platforms, and AI evolved."
courses: ["software-engineering"]
type: "resource"
timelineKey: "software-engineering-history"
date: "2026-03-18"
---
This living reference helps students connect historical milestones to modern engineering choices.
```

This keeps the timeline aligned with current repository conventions while preserving flexibility for future interactive teaching artifacts.
