# Plan: Tutorial Layout with Heading-Based Gutter Navigation (Astro)

## Goal

Add a **left-gutter outline + progress indicator** for tutorial content in Astro, generated automatically from Markdown headings.

Applies only to content in the **`course-materials` content collection** where frontmatter includes:

Content collection is defined in 'src/content/config.ts' as courseMaterialsCollection

```yaml
type: "tutorial"
```

for example see `src/content/course-materials/building-scalable-apis.md`.

The gutter:

- Lists tutorial steps derived from `##` headings
- Allows click-to-jump navigation
- Highlights the active step as the user scrolls
- Indicates completed vs active vs upcoming steps

No frontmatter step definitions; headings are the single source of truth.

---

## Assumptions

- Astro project using content collections
- Markdown (not MDX)
- Slugs are routed via `[slug].astro`
- `course-materials` collection already exists
- Styling via Tailwind see '/docs/04-style-guide.md'

---

## Step 1: Ensure headings are available from content rendering

### Requirement

Use Astro’s Markdown rendering API so heading metadata is available.

### Expected behavior

`post.render().headings` returns an array like:

```ts
{
  depth: 2,
  slug: "step-1-design-the-api",
  text: "Step 1: Design the API"
}
```

### Constraint

- Only `depth === 2` (`##`) headings are considered tutorial steps
- `#` is reserved for title
- `###` and below are ignored for the gutter

---

## Step 2: Route tutorial pages through a dedicated layout

### Files to create

```
src/layouts/TutorialLayout.astro
src/pages/course-materials/[slug].astro
```

### `[slug].astro` responsibilities

- Load the `course-materials` collection entry by slug
- If `entry.data.type !== "tutorial"`, fall back to a normal article layout
- If `type === "tutorial"`, render via `TutorialLayout`

#### Pseudocode

```astro
---
import TutorialLayout from '@/layouts/TutorialLayout.astro';
import DefaultLayout from '@/layouts/DefaultLayout.astro';
import { getCollection } from 'astro:content';

const { slug } = Astro.params;
const entries = await getCollection('course-materials');
const entry = entries.find(e => e.slug === slug);

if (!entry) throw new Error('Not found');

const rendered = await entry.render();
---
{entry.data.type === 'tutorial' ? (
  <TutorialLayout entry={entry} rendered={rendered} />
) : (
  <DefaultLayout entry={entry} rendered={rendered} />
)}
```

---

## Step 3: Extract tutorial steps from headings

### In `TutorialLayout.astro`

Derive steps from the rendered headings:

```ts
const steps = rendered.headings
  .filter((h) => h.depth === 2)
  .map((h) => ({
    id: h.slug,
    label: h.text,
  }));
```

### Validation rules

- If `steps.length < 2`, do not render the gutter
- Log a warning in dev mode

---

## Step 4: Layout structure (desktop-first)

### Required layout structure

```
┌───────────────┬────────────────────────────┐
│               │                            │
│  Gutter       │  Tutorial content          │
│  (sticky)     │  (Markdown)                │
│               │                            │
└───────────────┴────────────────────────────┘
```

### HTML skeleton

```astro
<div class="tutorial-layout">
  <aside class="tutorial-gutter">
    <TutorialProgress client:load steps={steps} />
  </aside>

  <main class="tutorial-content">
    <article>
      <rendered.Content />
    </article>
  </main>
</div>
```

---

## Step 5: Implement progress logic (client-side island)

### Create

```
src/components/TutorialProgress.tsx
```

### Responsibilities

- Observe all step heading elements by ID
- Track the _currently active step_
- Derive:
  - completed steps
  - active step
  - upcoming steps

- Update UI reactively

### IntersectionObserver rules

- Observe elements with IDs matching `steps[].id`
- Use:

```ts
rootMargin: "-30% 0px -60% 0px";
threshold: 0;
```

- When a heading intersects, set it as active

---

## Step 6: Step state derivation (no per-step state storage)

Given:

```ts
const activeIndex = steps.findIndex((s) => s.id === activeId);
```

Define:

- completed → `index < activeIndex`
- active → `index === activeIndex`
- upcoming → `index > activeIndex`

No manual mutation per step.

---

## Step 7: Gutter UI requirements

### Required features

- Ordered list of steps
- Clickable anchors (`#step-id`)
- Visual states:
  - completed → ✔ or muted style
  - active → bold + accent color
  - upcoming → normal

### Optional (but recommended)

- Vertical progress bar behind steps
- “Step X of Y” label at top

---

## Step 8: Mobile behavior

### Rules

- Gutter hidden by default on small screens
- Replace with:
  - “Steps” dropdown OR
  - Horizontal progress indicator at top

Agent may defer mobile behavior to CSS only (acceptable v1).

---

## Step 9: Styling constraints

- Gutter must be `position: sticky`
- Offset accounts for header height
- Max width ~240px
- Content remains readable at 65–75ch

---

## Step 10: Non-goals (explicitly out of scope)

- Frontmatter-defined steps
- Checkboxes or manual completion
- LocalStorage persistence
- MDX
- Scroll snapping

---

## Acceptance criteria

- Tutorial pages render a left gutter
- Gutter links jump correctly
- Active step updates as user scrolls
- Non-tutorial content is unaffected
- No hydration errors
- No author action beyond writing `##` headings

---

## Example authoring rule (for documentation)

> **Tutorials must use `##` headings for each step.**
> These headings define the navigation and progress indicator automatically.

---

If you want next:

- I can convert this into a **single prompt block** optimized for Codex
- Or generate a **minimal implementation** (Astro + React island)
- Or add instructor/lab extensions cleanly

Just say which format you want.
