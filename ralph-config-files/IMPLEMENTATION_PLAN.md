# Implementation Plan

## toddwseattle-astro

Last Updated: 2026-01-30

## Active Tasks

### TODO: Add Reading Time to Blog Posts

- **Priority:** High
- **Spec:** `specs/blog-enhancements/reading-time.md`
- **Acceptance Criteria:**
  - [ ] Calculate reading time from post content (200 wpm average)
  - [ ] Display "X min read" on post cards
  - [ ] Display on post detail page
  - [ ] Unit tests for calculation logic
  - [ ] All TypeScript compiles
  - [ ] Build succeeds
- **Status:** TODO
- **Assigned:** Ralph
- **Attempts:** 0

### TODO: Improve SEO Metadata

- **Priority:** High
- **Spec:** `specs/seo-improvements/meta-tags.md`
- **Acceptance Criteria:**
  - [ ] Add canonical URLs to all pages
  - [ ] Complete OpenGraph tags (title, description, image, url)
  - [ ] Add Twitter Card support
  - [ ] Generate proper meta descriptions
  - [ ] All builds pass
  - [ ] Verify with Facebook/Twitter debuggers
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

_None yet - Ralph will update this section after completing tasks_

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

1. Start with reading time (straightforward calculation)
2. Move to SEO improvements (site-wide benefit)
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
