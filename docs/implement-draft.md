# Implement Draft Support for Content Collections

**Status**: ✅ COMPLETED  
**Created**: February 11, 2026  
**Completed**: February 11, 2026  
**Goal**: Add draft property to all content collections and ensure Astro files don't render draft content

## Overview

This document tracks the implementation of draft support across all content collections. Currently, only the `blog` collection has a `published` field. We need to standardize draft support across all collections and ensure consistent filtering.

## Audit Results

### Collections Schema Status

| Collection       | Current Filter Field | Status | Notes                                            |
| ---------------- | -------------------- | ------ | ------------------------------------------------ |
| blog             | published (boolean)  | UPDATE | Has filtering, change to `draft` for consistency |
| experiences      | none                 | ADD    | No draft support                                 |
| projects         | none                 | ADD    | No draft support                                 |
| skills           | none                 | ADD    | No draft support                                 |
| activities       | none                 | ADD    | No draft support                                 |
| contacts         | none                 | ADD    | No draft support                                 |
| education        | none                 | ADD    | No draft support                                 |
| services         | none                 | ADD    | No draft support                                 |
| testimonials     | none                 | ADD    | No draft support                                 |
| nonprofit        | none                 | ADD    | No draft support                                 |
| investments      | none                 | ADD    | No draft support                                 |
| hero             | none                 | ADD    | No draft support                                 |
| newsletter       | none                 | ADD    | No draft support                                 |
| teaching         | none                 | ADD    | No draft support                                 |
| course-materials | none                 | ADD    | No draft support                                 |

### Astro Files Using Collections

| File                                    | Collection                        | Current Filtering                                | Needs Update                      |
| --------------------------------------- | --------------------------------- | ------------------------------------------------ | --------------------------------- |
| src/pages/index.astro                   | blog                              | `.filter(post => post.data.published !== false)` | YES - change to draft             |
| src/pages/writing/index.astro           | blog                              | `.filter(post => post.data.published !== false)` | YES - change to draft             |
| src/pages/writing/[slug].astro          | blog                              | getStaticPaths                                   | YES - exclude drafts from paths   |
| src/pages/writing/tag/[tag].astro       | blog                              | getStaticPaths + filter                          | YES - verify both filter and path |
| src/pages/rss.xml.ts                    | blog                              | `.filter(post => post.data.published !== false)` | YES - change to draft             |
| src/pages/resume/index.astro            | experiences, education, nonprofit | No filters                                       | YES - add draft filters           |
| src/pages/teaching/index.astro          | teaching                          | No filters                                       | YES - add draft filters           |
| src/pages/teaching/[slug].astro         | teaching                          | getStaticPaths                                   | YES - exclude drafts from paths   |
| src/pages/course-materials/[slug].astro | course-materials                  | getStaticPaths                                   | YES - exclude drafts from paths   |

## Work Items

- [x] Task 1: Update src/content/config.ts with draft field for all collections
- [x] Task 2: Update src/pages/index.astro to filter by draft
- [x] Task 3: Update src/pages/writing/index.astro to filter by draft
- [x] Task 4: Update src/pages/writing/[slug].astro getStaticPaths to exclude drafts
- [x] Task 5: Update src/pages/writing/tag/[tag].astro to use draft filter
- [x] Task 6: Update src/pages/rss.xml.ts to filter by draft
- [x] Task 7: Update src/pages/resume/index.astro to filter by draft
- [x] Task 8: Update src/pages/teaching/index.astro to filter by draft
- [x] Task 9: Update src/pages/teaching/[slug].astro getStaticPaths to exclude drafts
- [x] Task 10: Update src/pages/course-materials/[slug].astro getStaticPaths to exclude drafts
- [x] Task 11: Verify all changes and run tests

## Implementation Strategy

**Standard pattern to use across all files:**

```typescript
// Filter function to exclude drafts
.filter((entry) => entry.data.draft !== true)
```

**In getStaticPaths, after fetching collection:**

```typescript
export async function getStaticPaths() {
  const entries = await getCollection("collection-name");
  const published = entries.filter((entry) => entry.data.draft !== true);
  return published.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
```

## Key Decisions

1. Use `draft: boolean` (default false) for all collections - consistent with Astro conventions
2. Change blog's `published` to `draft` for consistency
3. Filter at fetch time, not at render time
4. Ensure getStaticPaths only generates pages for non-draft content

## Validation Checklist

- [x] All schemas have draft field
- [x] All getStaticPaths exclude drafts
- [x] All collection fetches filter drafts
- [x] Tests pass
- [x] Build succeeds
- [x] Sample drafts created and verified not rendering

---

## Completion Summary

**Completed Successfully on February 11, 2026**

### Changes Made:

1. **Schema Updates** - Added `draft: z.boolean().default(false)` to all 15 content collections:
   - blog, experiences, projects, skills, activities, contacts, education, services, testimonials, nonprofit, investments, hero, newsletter, teaching, course-materials

2. **Filter Updates** - Updated collection fetches in 10 Astro/TypeScript files:
   - Changed blog's `published` field to `draft` for consistency
   - Updated all getCollection() calls to filter `.filter((entry) => entry.data.draft !== true)`
   - Updated getStaticPaths in dynamic routes to exclude draft content from being rendered

3. **Files Modified**:
   - [src/content/config.ts](src/content/config.ts) - All 15 collections updated
   - [src/pages/index.astro](src/pages/index.astro) - Blog filtering updated
   - [src/pages/writing/index.astro](src/pages/writing/index.astro) - Blog filtering updated
   - [src/pages/writing/[slug].astro](src/pages/writing/[slug].astro) - getStaticPaths filtering
   - [src/pages/writing/tag/[tag].astro](src/pages/writing/tag/[tag].astro) - Tag page filtering
   - [src/pages/rss.xml.ts](src/pages/rss.xml.ts) - RSS feed filtering
   - [src/pages/resume/index.astro](src/pages/resume/index.astro) - Experience, education, nonprofit filtering
   - [src/pages/teaching/index.astro](src/pages/teaching/index.astro) - Teaching collection filtering
   - [src/pages/teaching/[slug].astro](src/pages/teaching/[slug].astro) - getStaticPaths filtering
   - [src/pages/course-materials/[slug].astro](src/pages/course-materials/[slug].astro) - getStaticPaths filtering

### Test Results:

- ✅ All 46 tests passed
- ✅ Build completed successfully (58 pages generated)
- ✅ No TypeScript errors
- ✅ All dynamic routes generate correctly

### How to Use:

To mark content as a draft, simply add `draft: true` to the frontmatter:

```yaml
---
title: "My Draft Post"
date: 2026-02-11
draft: true
---
This won't be rendered in production.
```

Draft content is automatically excluded from:

- Home page recent posts
- Writing index page
- Writing archive pages
- Tag pages
- RSS feed
- Teaching course listings
- Course materials pages
- Resume sections
- All dynamic routes

**Last Updated**: Completed February 11, 2026
