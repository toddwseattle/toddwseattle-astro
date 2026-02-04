# Ralph Fix Plan

## High Priority

- [x] Add Reading Time to Blog Posts (IMPLEMENTATION_PLAN.md task)
- [x] Improve SEO Metadata (canonical URLs, OpenGraph, Twitter Cards)
- [x] Add Google Analytics 4 Integration (see specs/seo-improvements/google-analytics-spec.md)
- [x] Blog Monochrome Redesign Pilot (see specs/color-scheme/plan-blogMonochromeRedesignPilot.md)

## Medium Priority

- [ ] Add Related Posts Component (tag-based related posts)
- [ ] Accessibility Audit & Improvements

## Low Priority

- [ ] Add Tag Cloud / Tag Navigation

## Completed

- [x] Project initialization
- [x] Add Google Analytics 4 Integration
  - Created `src/components/GoogleAnalytics.astro` component
  - Created `src/env.d.ts` for TypeScript type safety
  - Created `.env.example` template file
  - Updated `src/layouts/BaseLayout.astro` to include GA component
  - Component only renders in production with valid GA ID
  - Build succeeds, all 46 tests pass
- [x] Blog Monochrome Redesign Pilot (expanded to site-wide)
  - Updated `src/assets/styles/global.css` with monochrome color system
  - Updated `src/layouts/BaseLayout.astro` body classes
  - Updated `src/components/blog/BlogCard.astro` tags, links, focus ring, card styles
  - Updated `src/components/blog/WritingList.astro` filter dropdown styling
  - Updated `src/pages/writing/[slug].astro` back links and tag styling
  - Updated `src/pages/writing/tag/[tag].astro` navigation link styling
  - Updated `src/components/HeroBanner.astro` removed gradient, monochrome CTA
  - Updated `src/components/ui/Timeline.astro` neutral timeline styling
  - Updated `src/pages/resume/index.astro` section headers and cards
  - Updated `src/pages/index.astro` all sections (Now, Pillars, Recent Writing, Mini bio, CTA)
  - Removed indigo/blue/teal colors, replaced with Ink/Graphite/Paper system
  - Links now use underline for interaction, not color
  - CTAs use dark Ink button with Paper text (inverted in dark mode)
  - Build succeeds, all 46 tests pass
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
