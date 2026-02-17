# Plan: Blog Monochrome Redesign Pilot

**TL;DR**: Convert the blog/writing section to use the monochrome color system defined in your creative briefs. This means removing saturated colors (indigo, blue) and replacing them with neutral tones: Ink (#1A1A1C), Graphite (#403F41), and Paper (#F4F3F2) for light mode; charcoal and graphite for dark. The blog is the ideal pilot because it's isolated from the main navigation and will demonstrate the aesthetic before rolling out site-wide.

## use '/docs/Visual-Style/README.md' for reference on the monochrome system.

## Color Mapping (Light → Monochrome)

| Element                 | Current                         | Monochrome                      | Purpose                        |
| ----------------------- | ------------------------------- | ------------------------------- | ------------------------------ |
| Body text               | `text-indigo-900`               | `text-gray-900` (Ink 800)       | Primary text                   |
| Body background         | `bg-white`                      | `bg-gray-50` (Paper 100)        | Reading surface                |
| Links                   | `text-blue-600` hover underline | `text-gray-900` hover underline | Same as body, underline signal |
| Card background         | `bg-white`                      | `bg-white` (Paper 50)           | Card surface                   |
| Card borders/separation | None                            | Use `border-gray-200` sparingly | Subtle structure               |
| Tags/badges             | `bg-blue-100` `text-blue-800`   | `bg-gray-200` `text-gray-900`   | Metadata containers            |
| Focus ring              | `ring-blue-400`                 | `ring-gray-400`                 | Accessibility                  |
| Hover effects           | Color change                    | Underline + subtle darken       | Interactive feedback           |

---

## Dark Mode Mapping

| Element    | Current                                 | Monochrome                                |
| ---------- | --------------------------------------- | ----------------------------------------- |
| Background | `dark:bg-gray-900` (too dark)           | `dark:bg-[#403F41]` (Graphite 700)        |
| Card       | `dark:bg-gray-800`                      | `dark:bg-[#2E2D30]` (deep graphite)       |
| Text       | `dark:text-white`                       | `dark:text-[#F2F2F2]` (warm off-white)    |
| Links      | `dark:text-blue-400`                    | `dark:text-[#F2F2F2]` with underline      |
| Tags       | `dark:bg-blue-900` `dark:text-blue-200` | `dark:bg-[#4A494C]` `dark:text-[#F2F2F2]` |

---

## Files to Modify

### Blog Components (3 files)

1. **src/components/blog/BlogCard.astro** (85 lines)
   - Link colors: `group-hover:text-blue-600 dark:group-hover:text-blue-400` → remove color, keep underline
   - Tag styling: `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200` → monochrome
   - Focus ring: `ring-blue-400` → `ring-gray-400`
   - Card: `bg-white dark:bg-gray-800` → `bg-white dark:bg-[#2E2D30]`

2. **src/components/blog/WritingList.astro** (60 lines)
   - Filter dropdown: `border-gray-300 dark:border-gray-600` → keep (neutral)
   - Focus ring: `focus:ring-blue-500 focus:border-blue-500` → `focus:ring-gray-500`
   - Text: `text-gray-700 dark:text-gray-300` → update dark to monochrome

3. **src/components/blog/BlogGrid.astro** (14 lines)
   - No direct color changes needed (uses BlogCard)

### Blog Pages (3 files)

4. **src/pages/writing/[slug].astro** (105 lines)
   - Back link: `text-blue-600 hover:underline` → `text-gray-900 hover:underline`
   - Title: `text-gray-900` → keep (already correct)
   - Description: `text-gray-600` → keep
   - Any tags/metadata styling

5. **src/pages/writing/index.astro** (31 lines)
   - Text colors already use grays, but verify consistency
   - Ensure TitleSection inherits correct colors

6. **src/pages/writing/tag/[tag].astro** (109 lines)
   - Tag filtering UI styling
   - Text colors in title section

### Global Files (2 files)

7. **src/assets/styles/global.css** (50 lines) — **Highest priority**
   - Body: `text-indigo-900 bg-white` → `text-gray-900 bg-gray-50`
   - Prose links: `text-blue-600 dark:text-blue-400` → `text-gray-900 dark:text-[#F2F2F2]` + underline always
   - Prose blockquote: `border-blue-600 dark:border-blue-400` → `border-gray-400 dark:border-gray-500`
   - Prose code bg: `bg-gray-100 dark:bg-gray-800` → `bg-gray-100 dark:bg-[#2E2D30]`
   - **Key**: Update to use exact hex values from briefs for dark mode

8. **src/layouts/BaseLayout.astro** (line 94)
   - Body element: `text-indigo-900 bg-white` → `text-gray-900 bg-gray-50`
   - This affects entire site, but blog will visibly show the system working

---

## Implementation Strategy

**Phase 1: Foundation (Global CSS)**

1. Update src/assets/styles/global.css with monochrome colors
2. This cascades to prose content automatically

**Phase 2: Blog Components** 3. Update src/components/blog/BlogCard.astro tag colors and links 4. Update src/components/blog/WritingList.astro filter styling 5. Verify src/components/blog/BlogGrid.astro (minimal changes)

**Phase 3: Blog Pages** 6. Update src/pages/writing/[slug].astro back link and any interactive elements 7. Update src/pages/writing/index.astro and src/pages/writing/tag/[tag].astro styling

**Phase 4: Layout Alignment** 8. Update src/layouts/BaseLayout.astro body classes (site-wide impact, but now consistent)

---

## Verification

**Manual checks:**

- [ ] Light mode: Blog cards on warm paper background (#F4F3F2), text in Ink (#1A1A1C), links remain gray with underline on hover
- [ ] Dark mode: Cards on charcoal (#2E2D30), text in warm off-white (#F2F2F2), tags appear as subtle boundaries not colored badges
- [ ] Links in prose: Same color as body text, underline persistent (not just on hover)
- [ ] Tags/badges: No blue backgrounds, use neutral with graphite text
- [ ] Focus states: Gray rings, not blue
- [ ] Responsive: Reading comfort maintained on mobile

**Automated checks:**

```bash
npm run build     # Verify no Tailwind errors
npm run test      # Check existing tests pass
```

---

## Decisions Made

- **Color palettes**: Using exact hex values from briefs (`#1A1A1C`, `#403F41`, etc.) via Tailwind custom colors OR `dark:bg-[#403F41]` syntax
- **Link treatment**: Remove "blue means link" convention; rely on underline + same-color text
- **Tags**: Convert from categorical colors to neutral style (quiet badges)
- **Gradients**: Remove any gradients in blog header (stick to solids from briefs)
- **Contrast**: Maintain WCAG AA for accessibility—verified in dark mode with warm off-white
