# Ralph Fix Plan

## High Priority

- [x] Add Reading Time to Blog Posts (IMPLEMENTATION_PLAN.md task)
- [x] Improve SEO Metadata (canonical URLs, OpenGraph, Twitter Cards)

## Medium Priority

- [ ] Add Related Posts Component (tag-based related posts)
- [ ] Accessibility Audit & Improvements

## Low Priority

- [ ] Add Tag Cloud / Tag Navigation

## Completed

- [x] Project initialization
- [x] Add Reading Time to Blog Posts
  - Created `src/lib/readingTime.ts` utility function
  - Created `src/lib/readingTime.test.ts` with 13 unit tests
  - Modified `src/components/blog/BlogCard.astro` to display "X min read"
  - Modified `src/pages/writing/[slug].astro` to display reading time
  - Fixed build issue in `src/pages/blog/[slug].astro` (missing getStaticPaths)
  - Fixed build issue in `src/pages/writing/tag/[tag].astro` (slugify scope)
  - All 46 tests pass, build succeeds
- [x] Improve SEO Metadata
  - SEO infrastructure already well-implemented using `astro-seo` package
  - Added `tags` prop to BaseLayout for article:tag meta tags
  - Updated blog post page to pass tags to BaseLayout
  - Updated site config to use existing image as fallback OG image
  - Verified canonical URLs, OpenGraph, Twitter Cards all present
  - All 46 tests pass, build succeeds

## Notes

- Focus on MVP functionality first
- Ensure each feature is properly tested
- Update this file after each major milestone
- See IMPLEMENTATION_PLAN.md for detailed task specifications
