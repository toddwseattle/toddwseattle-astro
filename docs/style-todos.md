# Style Migration: Design Token Refactoring

## Overview

Migrating from hardcoded colors (indigo, blue, teal, raw hex values) to centralized design tokens defined in `tailwind.config.js`.

**Design System Reference:** `docs/Visual-style/short-color-brief.md`

## Design Tokens (tailwind.config.js)

```js
const colors = {
  ink: { 950: "#0D0D0F", 800: "#1A1A1C", 600: "#5C5B5E" },
  graphite: { 700: "#403F41", 600: "#4A494C", 400: "#8A898D" },
  paper: { 50: "#FFFFFF", 100: "#F4F3F2", 200: "#ECEBEC" },
  surface: { light: "#FFFFFF", dark: "#2E2D30" },
};
```

## Status: COMPLETE

All files have been migrated to use the design token system. Build passes (71 pages), all 46 tests pass.

---

## Color Mapping Guide

| Old Class               | New Class                  | Purpose              |
| ----------------------- | -------------------------- | -------------------- |
| `text-indigo-900`       | `text-ink-800`             | Primary text         |
| `text-indigo-600`       | `text-ink-600`             | Secondary text       |
| `text-gray-900`         | `text-ink-800`             | Primary text         |
| `text-gray-700`         | `text-ink-600`             | Body text            |
| `text-gray-600`         | `text-graphite-400`        | Muted text           |
| `text-gray-500`         | `text-graphite-400`        | Muted text           |
| `bg-indigo-600`         | `bg-ink-800`               | Primary button       |
| `bg-indigo-900`         | `bg-ink-950`               | Footer/dark sections |
| `bg-white`              | `bg-paper-50`              | Card surfaces        |
| `bg-gray-50`            | `bg-paper-100`             | Page background      |
| `bg-gray-100`           | `bg-paper-200`             | Subtle backgrounds   |
| `border-indigo-*`       | `border-graphite-600`      | Borders              |
| `border-gray-200`       | `border-graphite-600/20`   | Borders (light)      |
| `dark:bg-[#403F41]`     | `dark:bg-graphite-700`     | Dark mode background |
| `dark:bg-[#2E2D30]`     | `dark:bg-surface-dark`     | Dark mode surfaces   |
| `dark:text-[#F2F2F2]`   | `dark:text-paper-100`      | Dark mode text       |
| `dark:text-[#E5E5E5]`   | `dark:text-paper-200`      | Dark mode secondary  |
| `dark:text-[#8A898D]`   | `dark:text-graphite-400`   | Dark mode muted      |
| `dark:border-[#4A494C]` | `dark:border-graphite-600` | Dark mode borders    |

---

## Completed Files

### Core Components

- [x] **src/components/Header.tsx** - Logo, nav links, hamburger menu
- [x] **src/components/Footer.tsx** - Footer section
- [x] **src/components/ui/TitleSection.tsx** - Page titles (H2)
- [x] **src/layouts/BaseLayout.astro** - Base layout

### UI Components

- [x] **src/components/ui/Button.tsx** - Button component
- [x] **src/components/ui/InfoBlock.tsx** - Info blocks
- [x] **src/components/ui/ProgressBar.astro** - Progress indicator
- [x] **src/components/ui/Timeline.astro** - Resume timeline
- [x] **src/components/TutorialProgress.tsx** - Tutorial progress
- [x] **src/components/HeroBanner.astro** - Homepage hero
- [x] **src/components/Projects.astro** - Projects component
- [x] **src/components/NonProfit.astro** - Nonprofit section

### Blog Components

- [x] **src/components/blog/BlogCard.astro** - Blog cards
- [x] **src/components/blog/WritingList.astro** - Writing list

### Teaching Components

- [x] **src/components/teaching/CourseMaterialsList.astro** - Course materials (monochrome badges)

### Layout Files

- [x] **src/layouts/materials/ResourceLayout.astro** - Resource layout
- [x] **src/layouts/materials/PostLayout.astro** - Post layout

### Pages

- [x] **src/pages/index.astro** - Homepage
- [x] **src/pages/resume/index.astro** - Resume page
- [x] **src/pages/autosoft-today/index.astro** - AutoSoftToday
- [x] **src/pages/teaching/index.astro** - Teaching index
- [x] **src/pages/teaching/[slug].astro** - Teaching detail
- [x] **src/pages/course-materials/[slug].astro** - Course material detail
- [x] **src/pages/writing/[slug].astro** - Blog post detail
- [x] **src/pages/writing/tag/[tag].astro** - Tag pages

### CSS Files

- [x] **src/assets/styles/global.css** - Global styles with design tokens

### Test Files

- [x] **src/components/ui/Button.test.tsx** - Updated test expectations
- [x] **src/components/ui/InfoBlock.test.tsx** - Updated test expectations

---

## Documentation Created

- [x] `docs/Visual-style/using-styles.md` - Practical guide with code examples
- [x] `docs/Visual-style/README.md` - Updated with quick links
- [x] This tracking document

---

## Notes

- **Link Treatment**: Per design brief, links use underline for interaction, not color change
- **Dark Mode**: All components support dark mode using `dark:` prefix with token classes
- **No Gradients**: Removed all gradient backgrounds
- **No Colored Badges**: Converted all colored badges (blue, teal, indigo) to monochrome
- **Unused File**: `src/assets/styles/variables.ts` is unused and can be removed
