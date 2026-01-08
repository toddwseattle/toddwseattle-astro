# Story 02 Progress

## Objective

Create a Teaching section with landing page and course subpages for Corporate Innovation, NUvention Web, and Software Engineering with clear frontmatter for philosophy, topics, example projects, and public artifacts.

## Work Items and Todos

- [x] Define teaching collection schema with Zod validation
- [x] Define course-materials collection schema with Zod validation
- [x] Create three course markdown files
- [x] Create placeholder course-materials
- [x] Build course subpage template
- [x] Update teaching landing page with course grid
- [x] Test all teaching routes locally

## Implementation Summary

### Completed Changes

1. **Created teaching content collection** (`src/content/config.ts`)
   - Schema includes: title, description, philosophy, topics (array), exampleProjects (array), publicArtifacts (array), date, optional cover
   - Supports evergreen course pages without year-based routing

2. **Created course-materials content collection** (`src/content/config.ts`)
   - Schema includes: title, description, courses (array), type (enum), optional difficulty, date, optional cover
   - Type enum supports: "exercise", "resource", "post", "tutorial", "examples", "student work"
   - Materials can link to multiple courses via courses array

3. **Created three course files** (`src/content/teaching/`)
   - `corporate-innovation.md` - Building innovation capabilities within established organizations
   - `software-engineering.md` - Fundamentals and best practices for building scalable, maintainable software
   - `nuvention-web.md` - Building web and mobile startups from concept to launch

4. **Created course-materials examples** (`src/content/course-materials/`)
   - `design-thinking-workshop.md` - Links to corporate-innovation + nuvention-web
   - `testing-best-practices.md` - Links to software-engineering + nuvention-web
   - `market-validation-framework.md` - Links to corporate-innovation + nuvention-web

5. **Built course subpage template** (`src/pages/teaching/[slug].astro`)
   - Uses `getStaticPaths()` for static generation
   - Renders philosophy, topics, example projects, public artifacts
   - Clean semantic HTML with bulleted lists and proper sections
   - Ready to display related course materials (infrastructure in place)

6. **Updated teaching landing page** (`src/pages/teaching/index.astro`)
   - Fetches all courses from teaching collection
   - Displays courses as responsive grid (1-col mobile, 2-col tablet, 3-col desktop)
   - Card-based layout with hover effects
   - Links to individual course pages
   - Includes "Why These Courses?" overview section

### Technical Details

- All pages use `BaseLayout` with proper title/description props
- Header and Footer components loaded with `client:load` directive
- TitleSection component for consistent page headers
- Consistent styling with Tailwind design tokens
- No TypeScript errors
- Evergreen URL structure: `/teaching/[slug]/` (no year-based routing)

### Architecture Decisions

**Hybrid Collection Approach (Option C):**

- `teaching` collection holds course overview pages only
- `course-materials` collection holds reusable resources, exercises, tutorials
- Materials reference multiple courses via `courses: ["software-engineering", "nuvention-web"]`
- Scales well for rich course content without bloating course pages
- Clean separation of concerns

**Schema Design:**

- Teaching courses have dedicated fields for philosophy, topics, projects, artifacts
- Course materials support type categorization and difficulty levels
- Both collections support optional cover images for visual appeal

## Notes

- This story is part of improving the overall Information Architecture (IA) during the migration to Astro
- Acceptance criteria: Teaching landing page highlights courses with links to subpages, each course page renders frontmatter cleanly, content fits evergreen tone

## Completion Status

**Status:** ✅ **COMPLETE** (January 6, 2026)

All acceptance criteria from Story 2 have been met:

- ✅ Teaching landing page highlights both courses and links to subpages
- ✅ Each course page supports defined frontmatter fields and renders them cleanly
- ✅ Content fits evergreen tone and avoids year-based URLs
- ✅ Course-materials can be associated with multiple courses

### Testing Checklist

- [x] Teaching landing page (/) loads with course grid
- [x] Corporate Innovation (/teaching/corporate-innovation/) renders correctly
- [x] Software Engineering (/teaching/software-engineering/) renders correctly
- [x] NUvention Web (/teaching/nuvention-web/) renders correctly
- [x] Philosophy, topics, example projects, public artifacts display properly
- [x] Course materials collection schema validates
- [x] Multi-course linking works (materials can reference multiple courses)
- [x] No TypeScript errors
- [x] All routes use clean, evergreen URLs

### Next Steps

Proceed to **Story 3: Consolidate Blog → Writing** to:

- Migrate blog feed into Writing collection with tag-driven discovery
- Ensure hobbies (cycling, guitar/music) live naturally under Writing
- Implement tag system: innovation & org design, software engineering, teaching reflections, cycling, guitar & music
- Use strong post cards with optional images
