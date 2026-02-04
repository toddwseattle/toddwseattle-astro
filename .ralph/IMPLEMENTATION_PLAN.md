# Implementation Plan

## toddwseattle-astro

Last Updated: 2026-01-30

## Active Tasks

### TODO: Google Analytics 4 Integration
- **Priority:** High
- **Spec:** `specs/seo-improvements/google-analytics-spec.md`
- **Acceptance Criteria:**
  - [ ] GA4 script loads on all pages
  - [ ] Pageviews tracked automatically
  - [ ] No tracking in development environment
  - [ ] GA Measurement ID configurable via env variable
  - [ ] No console errors or warnings
  - [ ] No measurable impact on page load performance
  - [ ] TypeScript type safety for env variables
- **Status:** TODO
- **Attempts:** 0

### TODO: Blog Monochrome Redesign Pilot
- **Priority:** High
- **Spec:** `specs/color-scheme/plan-blogMonochromeRedesignPilot.md`
- **Acceptance Criteria:**
  - [ ] Update blog components to monochrome color scheme
  - [ ] Update blog pages to monochrome color scheme
  - [ ] Update global CSS for monochrome colors
  - [ ] Verify no color accents remain
  - [ ] Ensure readability and accessibility
  - [ ] Build passes without errors
- **Status:** TODO
- **Attempts:** 0 

### TODO: Add Related Posts Component

- **Priority:** Medium
- **Spec:** `specs/blog-enhancements/related-posts.md`
- **Acceptance Criteria:**
  - [ ] Find posts with similar tags
  - [ ] Display 3-5 related posts at bottom of post
  - [ ] Responsive design (mobile/desktop)
  - [ ] Link to related posts works
  - [ ] Unit tests for tag matching logic
  - [ ] Build passes
- **Status:** TODO
- **Attempts:** 0

### TODO: Accessibility Audit & Improvements

- **Priority:** Medium
- **Spec:** `specs/accessibility/audit.md`
- **Acceptance Criteria:**
  - [ ] Run Lighthouse accessibility audit on 5 key pages
  - [ ] All images have descriptive alt text
  - [ ] Proper heading hierarchy (no skipped levels)
  - [ ] Color contrast meets WCAG AA
  - [ ] Keyboard navigation works
  - [ ] Lighthouse score 95+ on tested pages
- **Status:** TODO
- **Attempts:** 0

### TODO: Add Tag Cloud / Tag Navigation

- **Priority:** Low
- **Spec:** `specs/blog-enhancements/tag-cloud.md`
- **Acceptance Criteria:**
  - [ ] Display all tags with post counts
  - [ ] Link to tag filter pages
  - [ ] Show popular tags prominently
  - [ ] Responsive design
  - [ ] Build succeeds
- **Status:** TODO
- **Attempts:** 0

## Completed Tasks

### ✅ DONE: Add Reading Time to Blog Posts

- **Completed:** 2026-01-30 17:13
- **Files Created:**
  - `src/lib/readingTime.ts` - Pure utility function (200 wpm calculation)
  - `src/lib/readingTime.test.ts` - 13 unit tests with 100% coverage
- **Files Modified:**
  - `src/components/blog/BlogCard.astro` - Shows "X min read" after date
  - `src/pages/writing/[slug].astro` - Shows reading time in post header
  - `src/pages/blog/[slug].astro` - Fixed missing getStaticPaths for redirects
  - `src/pages/writing/tag/[tag].astro` - Fixed slugify scope in getStaticPaths
- **Tests Added:** 13 new tests in readingTime.test.ts
- **Notes:** Reading time calculation uses 200 wpm average with Math.ceil rounding. Fixed two pre-existing build issues discovered during implementation.
- **Attempts:** 1

### ✅ DONE: Improve SEO Metadata

- **Completed:** 2026-01-30 21:07
- **Files Modified:**
  - `src/layouts/BaseLayout.astro` - Added `tags` prop for article:tag meta tags
  - `src/pages/writing/[slug].astro` - Pass tags to BaseLayout
  - `src/config/site.ts` - Updated defaultImage to use existing image
- **Tests Added:** None (existing SEO infrastructure already tested by build)
- **Notes:** SEO infrastructure was already well-implemented using `astro-seo` package. Added article tags support. Verified all meta tags present in build output: canonical URLs, OpenGraph (title, type, image, url, description, locale, site_name), article-specific (published_time, author, tags), and Twitter Cards (card, site, title, image, imageAlt, description, creator).
- **Attempts:** 1

## Blocked Tasks

_None currently_

## Notes

### Project Constraints (from docs/01-epic.md)

- Preserve all existing URLs (no route breakage)
- No year-based routing
- Keep existing markdown/MDX files intact
- Maintain writing-first aesthetic

### Design Tokens (from docs/04-style-guide.md)

- Typography: Inter (body), JetBrains Mono (code)
- Prose width: ~700px
- Colors: bg-gray-50, bg-white, text-gray-900, text-indigo-600

### Current Status

- TypeScript: ✅ Configured
- Testing: ✅ Vitest setup
- Build: ✅ Working
- Content Collections: ✅ Configured

### Next Session Planning

1. ~~Start with reading time (straightforward calculation)~~ ✅ DONE
2. ~~Move to SEO improvements (site-wide benefit)~~ ✅ DONE
3. Then related posts (more complex logic)
4. Accessibility audit can run in parallel
5. Tag cloud is nice-to-have

---

## Task Completion Template

When marking a task complete, use this format:

```markdown
### ✅ DONE: [Task Name]

- **Completed:** 2026-01-30 14:23
- **Commits:** abc1234, def5678
- **Tests Added:** 5 new tests in BlogCard.test.tsx
- **Notes:** Reading time calculation works well. Used 200 wpm average.
- **Attempts:** 3
```
