# Plan: Create Teaching Section with Course Subpages

**Overview:** Build a dedicated teaching content collection with extended frontmatter (philosophy, topics, example projects, public artifacts), create course subpages for Corporate Innovation, NUvention Web, and Software Engineering, then populate the teaching landing page with course links. Reuse the existing landing page pattern and blog card components for consistency.

## Steps

### Phase 1: Collection Schemas & Config

1. **Define teaching content collection schema** in `src/content/config.ts` with Zod validation:
   - Fields: title, description, philosophy, topics (array), exampleProjects (array), publicArtifacts (array), date, optional cover image, slug
   - Example course slugs: `software-engineering`, `nuvention-web`, `corporate-innovation`

2. **Define course-materials collection schema** in `src/content/config.ts` with Zod validation:
   - Fields: title, description, courses (array of course slugs), type (enum: "exercise" | "resource" | "post" | "tutorial" | "examples" | "student work"), difficulty (optional), date, optional cover image, slug
   - Example: `courses: ["software-engineering", "nuvention-web"]` allows one material to apply to multiple courses

### Phase 2: Content Creation

3. **Create three course markdown files** in `src/content/teaching/` (corporate-innovation.md, nuvention-web.md, software-engineering.md) with proper frontmatter and placeholder content for each course.

4. **Create placeholder course-materials** in `src/content/course-materials/` (optional: start with 1-2 example materials per course to demonstrate linking).

### Phase 3: Pages & Routing

5. **Build course subpage** at `src/pages/teaching/[slug].astro` with `getStaticPaths()` to render individual course pages:
   - Use BaseLayout, Header, and TitleSection components
   - Fetch course frontmatter and render philosophy, topics, example projects, public artifacts
   - Query and display related materials from course-materials collection filtered by course slug

6. **Update teaching landing page** at `src/pages/teaching/index.astro` to fetch and display the three courses as cards (using BlogCard or custom TeachingCard component), linking to subpages.

### Phase 4: Testing & Validation

7. **Test all teaching routes** locally (`npm run dev`) and verify:
   - Course pages render with frontmatter fields displayed cleanly
   - Related materials display correctly on course pages
   - All links function correctly (no 404s)
   - Multi-course materials render on all associated course pages

## Further Considerations

### 1. Collection Architecture: Hybrid Approach (Option C)

- **Teaching collection** (`src/content/teaching/`) holds course overview pages only
- **Course-materials collection** (`src/content/course-materials/`) holds reusable resources, exercises, and topical posts
- Materials reference multiple courses via `courses: ["software-engineering", "nuvention-web"]` in frontmatter
- Course pages query related materials by slug and render them as related content sections
- **Benefit:** Scales well; materials can be reused across courses; clean separation of concerns

### 2. Course-Materials Schema Design

- **Fields needed:** title, description, courses (array), type ("exercise" | "resource" | "post" | "tutorial" | "examples" | "student work"), difficulty (optional), date, optional cover image, slug
- **Query pattern:** On course page, filter materials where `courses` array includes current course slug
- **Display options:** Render as list, cards, or organized by type (tutorials, exercises, examples, student work, resources, posts)
- **Decision Needed:** How to organize materials on course page—flat list, grouped by type, or tabbed interface?

## Acceptance Criteria (from Story 2)

- [ ] Teaching landing page highlights both courses and links to subpages
- [ ] Each course page supports defined frontmatter fields and renders them cleanly
- [ ] Content fits evergreen tone and avoids year-based URLs
- [ ] Course-materials can be associated with multiple courses and appear on all related course pages
- [ ] Course pages display related materials organized clearly

## Implementation Sequence

1. Extend content collection schemas for both `teaching` and `course-materials` (Steps 1–2)
2. Create course markdown files (Step 3)
3. Create placeholder course-materials to demonstrate multi-course linking (Step 4)
4. Build dynamic course page template with material queries (Step 5)
5. Update landing page with course grid (Step 6)
6. Local testing and validation (Step 7)
7. Refine design/copy and material organization as needed
