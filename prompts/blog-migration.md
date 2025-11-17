# Blog Migration Plan (Old Gatsby → New Astro)

Date: 2025-11-15 (Updated)
Owner: toddwseattle
Status: Not Started (0% Complete - HIGH PRIORITY)

## Overview

- Source components: `/home/toddwseattle/pw-toddwseattle-gb/src/pages/blog.tsx` and `/home/toddwseattle/pw-toddwseattle-gb/src/components/Posts/*`
- Source content: `/home/toddwseattle/pw-toddwseattle-gb/src/data/blog/*`
  - Structure: one directory per post (`blog-post-N/` with `index.md` and `cover.jpg`), plus top-level `index.md` with the section title/subtitle
- Target framework: Astro content collections + new `/blog` page
- Goal: replicate the Blog list page UI/functionality using Astro, migrate posts into the `blog` content collection with valid frontmatter, and create the `/blog` listing page + individual post detail pages
- Current Status: 5 example posts exist in `src/content/blog/` but need verification against old site

## Quick Findings

- ✅ Old blog page (`blog.tsx`) uses Gatsby GraphQL and a `Posts` component (card grid with image, date, title, description, tags).
- ✅ Old post frontmatter fields observed:
  - `category`, `cover`, `title`, `description`, `date`, `tags`, `published`
- ✅ New Astro project already has a `blog` content collection (`src/content/config.ts`) with schema:
  - `category: string`, `cover?: string`, `title: string`, `description: string`, `date: string`, `tags?: string[]`, `published: boolean = true`
- ⚠️ New repo already includes 5 example posts under `src/content/blog/blog-post-*.md` matching this schema, but need verification against old site content
- ❌ No `/blog` page yet; we will add `src/pages/blog/index.astro`
- ❌ No blog detail page yet; we will add `src/pages/blog/[slug].astro`

**Critical Issue:** `src/pages/rss.xml.ts` currently expects `post.data.pubDate` but our schema uses `date`. We MUST fix this during blog migration to ensure RSS feed works correctly.

## Target Structure

- Content (Markdown + images)
  - `src/content/blog/<slug>.md` (1 file per post)
  - Co-located cover images allowed, referenced via `cover: './<filename>'`
- Components
  - `src/components/blog/BlogCard.astro` (renders a single card)
  - `src/components/blog/BlogGrid.astro` (renders cards in a responsive grid)
- Page
  - `src/pages/blog/index.astro` (listing page: title/subtitle + card grid)

Optional (for post detail pages):

- `src/pages/blog/[slug].astro` to render a single post using the same content collection. Not required to ship the list page, but recommended so links work.

## Field Mapping (Old → New)

- `category` → `category` (keep `blog`)
- `cover` → `cover` (relative path, co-located image OK)
- `title` → `title`
- `description` → `description`
- `date` → `date` (use `YYYY-MM-DD` strings as in old content)
- `tags` → `tags`
- `published` → `published`

The old top-level `src/data/blog/index.md` contains the landing section copy:

- `title: 'Blog'`, `subtitle: 'All my posts'`
  We will surface this as literals in the `/blog` page or (optionally) add a `hero` entry (e.g., `src/content/hero/blog.md`) and read it there. To keep this change small, we’ll hardcode the two strings in the page initially.

## Implementation Plan (Sequential Steps)

### Step 1: Content Audit & Validation (FIRST)

**Priority:** Critical  
**Status:** Not Started

- [ ] elminate existing 5 example posts in `src/content/blog/`
- [ ] use actual content from old site at `/home/toddwseattle/pw-toddwseattle-gb/src/data/blog/`
- [ ] Create list of posts that need migration
- [ ] Verify frontmatter fields match between old and new
- [ ] Normalize `date` format to `YYYY-MM-DD` strings
- [ ] Make sure new slug matches the slug from the old site.

### Step 2: Content Migration

**Priority:** Critical  
**Status:** Not Started

For each directory under `/home/toddwseattle/pw-toddwseattle-gb/src/data/blog/blog-post-*/`:

- [ ] Copy `index.md` → `src/content/blog/<slug>.md` (slug from folder name)
- [ ] Copy `cover.jpg` (or equivalent) next to the new markdown file, or to `src/assets/images/` if shared
- [ ] Ensure frontmatter keys match the Astro schema exactly
- [ ] Keep `published: true` for all posts (or migrate actual published status)
- [ ] Normalize `date` to `YYYY-MM-DD` format (e.g., `2020-02-03`)
- [ ] Preserve existing `category: 'blog'` and `tags` arrays
- [ ] Validate markdown body content (check image paths, etc.)

**Note:** Old site has one directory per post; new site expects flat structure with co-located images.

### Step 3: Create Blog Components

**Priority:** Critical  
**Status:** Not Started

- [ ] **BlogCard.astro** - Single blog post card
  - Display cover image (with fallback if missing)
  - Format and display date (e.g., "February 3, 2020")
  - Display title, description
  - Display tags as badges
  - Link to `/blog/<slug>/` for detail page
  - Use existing Tailwind styles, align with `ui/` components
  - Responsive design (mobile/tablet/desktop)

- [ ] **BlogGrid.astro** - Grid layout for blog cards
  - Responsive grid (1 col mobile, 2-3 cols tablet/desktop)
  - Accept array of blog posts as prop
  - Consistent spacing/gaps
  - Use existing Container/layout patterns

### Step 4: Create Blog Listing Page

**Priority:** Critical  
**Status:** Not Started

- [ ] Create `src/pages/blog/index.astro`
  - Import `getCollection` from `astro:content`
  - Fetch all blog posts: `getCollection('blog')`
  - Filter by `published === true`
  - Sort by `date` descending (newest first)
  - Render page using BaseLayout
  - Add SEO meta tags (title, description)
  - Render `TitleSection` with hardcoded title: "Blog" and subtitle: "All my posts"
  - Render `BlogGrid` with filtered/sorted posts
  - Ensure responsive design

### Step 5: Create Blog Detail Page

**Priority:** Critical (needed for card links to work)  
**Status:** Not Started

- [ ] Create `src/pages/blog/[slug].astro`
  - Use `getStaticPaths()` to generate paths from blog collection
  - Fetch single post by slug
  - Render using BaseLayout
  - Add comprehensive SEO meta tags (title, description, og:image from cover)
  - Display cover image (full width or hero style)
  - Display formatted date
  - Display title as H1
  - Display description/excerpt
  - Display tags
  - Render markdown body using `<Content />` component
  - Style markdown content (headings, paragraphs, lists, code blocks, images)
  - Consider adding "Back to Blog" link
  - Ensure responsive design

### Step 6: Fix RSS Feed (CRITICAL BUG FIX)

**Priority:** High  
**Status:** Not Started

- [ ] Open `src/pages/rss.xml.ts`
- [ ] Change all references from `post.data.pubDate` to `post.data.date`
- [ ] Test RSS feed generation works correctly
- [ ] Verify RSS feed shows blog posts in correct order

### Step 7: Testing & Validation

**Priority:** High  
**Status:** Not Started

- [ ] Run `npm run dev` and test locally
- [ ] Verify `/blog` listing page displays all posts correctly
- [ ] Verify posts are sorted newest first
- [ ] Verify published/unpublished filtering works
- [ ] Click each blog card link and verify detail page loads
- [ ] Verify detail page renders markdown content correctly
- [ ] Verify images load correctly (covers and inline images)
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Verify RSS feed at `/rss.xml` works
- [ ] Check for console errors
- [ ] Run `npm run build` to ensure no build errors
- [ ] Verify SEO meta tags on both listing and detail pages

## Example Conversion

From: `/src/data/blog/blog-post-5/index.md`

Frontmatter (unchanged keys, new location):

```md
---
category: "blog"
cover: "./cover.jpg"
title: "Blog Post 5"
description: "Mauris neque libero, aliquet vel mollis nec, euismod sed tellus. Mauris convallis dictum elit id volutpat."
date: "2020-02-03"
tags: ["Mobile", "React Native", "Lorem Ipsum"]
published: true
---
```

Destination files:

- Markdown: `src/content/blog/blog-post-5.md`
- Image: `src/content/blog/cover.jpg` (same directory as the MD file)
- Body content copied verbatim (image references like `![...](./cover.jpg)` remain valid)
- Insure

## New Files To Be Created

- ❌ `src/components/blog/BlogCard.astro` - Blog post card component
- ❌ `src/components/blog/BlogGrid.astro` - Grid layout for blog cards
- ❌ `src/pages/blog/index.astro` - Blog listing page
- ❌ `src/pages/blog/[slug].astro` - Blog post detail page (REQUIRED for links to work)

## Files To Be Modified

## Acceptance Criteria (Definition of Done)

- [ ] Visiting `/blog` shows a titled list of cards for all `published` posts, sorted newest first
- [ ] Each card displays cover image, formatted date, title, description, and tags
- [ ] Each card is clickable and links to the correct detail page
- [ ] Visiting `/blog/<slug>` renders the full blog post with markdown content
- [ ] Blog detail pages have proper SEO meta tags (title, description, og:image)
- [ ] Images display correctly (both cover images and inline markdown images)
- [ ] Frontmatter validates against the `blog` collection schema
- [ ] `npm run build` succeeds with no errors
- [ ] RSS feed at `/rss.xml` works and includes blog posts
- [ ] No console errors in browser
- [ ] Responsive design works on mobile, tablet, and desktop

## Time Estimates

- **Step 1 (Content Audit):** 30 minutes
- **Step 2 (Content Migration):** 1-2 hours (depending on number of posts)
- **Step 3 (Components):** 1.5-2 hours
- **Step 4 (Listing Page):** 1 hour
- **Step 5 (Detail Page):** 1.5 hours
- **Step 6 (RSS Fix):** 15 minutes
- **Step 7 (Testing):** 1 hour

**Total Estimated Time:** 6-8 hours

## Dependencies & Blockers

**Required Before Starting:**

- ✅ Astro project set up with React integration
- ✅ Tailwind CSS configured
- ✅ Blog content collection schema defined
- ✅ BaseLayout component exists
- ✅ Existing UI components (TitleSection, Container, Icon) available
- ✅ Access to old Gatsby site at `/home/toddwseattle/pw-toddwseattle-gb`

**No Blockers:** Ready to start immediately

## Decision Log

**November 15, 2025:**

- ✅ **Decision:** Hardcode title/subtitle as "Blog" / "All my posts" initially
  - Rationale: Matches old site, simplest approach, can refactor to use `hero` collection later if needed
- ✅ **Decision:** Include post detail pages (`[slug].astro`) in this phase (not optional)
  - Rationale: Required for card links to work, better user experience, matches old site functionality
- ✅ **Decision:** Fix RSS feed `pubDate`→`date` issue during this migration
  - Rationale: Critical bug, simple fix, affects same files we're working on

## Migration Context

This blog migration is part of a larger Gatsby→Astro migration that is ~60% complete. Other sections already migrated:

- ✅ Core infrastructure (100%)
- ✅ Homepage sections (100%): Hero, Activities, Projects, Experience, NonProfit
- ✅ Navigation (Header/Footer) (100%)
- ✅ Most UI components (85%)

Blog is the **highest priority** remaining section as it's a major feature of the site.

## Success Metrics

After completion, verify:

- [ ] All blog posts from old site are present in new site
- [ ] Image quality/optimization is maintained or improved
- [ ] Page load performance is as good or better than old site (run Lighthouse)
- [ ] SEO meta tags are present and correct (check with browser dev tools)
- [ ] No broken links
- [ ] RSS feed validates (use RSS validator tool)

3. **Image Migration** - Need to verify images are migrated correctly
   - **Impact:** Broken images on blog posts
   - **Fix:** Systematically copy images during content migration (Step 2)

### Design Decisions

- **Title/subtitle source:** Hardcoded as "Blog" / "All my posts" initially (matches old site top-level `index.md`)
- **Image paths:** Co-located with markdown files using relative paths (e.g., `./cover.jpg`)
- **Post detail pages:** REQUIRED (not optional) - needed for card links to work
- **Date format:** Use existing `YYYY-MM-DD` string format from old site (Astro can parse this)
- (If detail pages included) Each card links to a working `/blog/<slug>` page rendering the markdown.

## Risks / Notes

- RSS page expects `pubDate` but blog schema uses `date`. If we want RSS accurate immediately, we’ll update RSS to use `date` or add a derived `pubDate`.
- Image paths: we’ll keep images co-located with markdown and reference via relative paths in `cover`. This matches current examples.
- Title/subtitle source for `/blog`: hardcoded initially; optional follow‑up to read from a `hero` entry if desired.

## Rollout Steps

- Copy and convert posts (script or manual; ~5 items)
- Add components and `/blog` page
- Run dev, validate layout and links
- (Optional) add `[slug].astro` for detail pages
- (Optional) adjust RSS `pubDate` vs `date`

## Next Actions

1. It is OK to hardcode the `/blog` title/subtitle for now?
2. Please Include post detail pages (`[slug].astro]`) in this pass?
