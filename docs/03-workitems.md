# Workitems Supporting Stories

## For Story 1: Define Top-Level Navigation
1. Inventory current navigation and header components to remove Gatsby-era menu items while preserving route integrity.
2. Implement the six-link navigation (Home, Teaching, Writing, AutoSoft Today, Consulting, About) in shared layout(s) for desktop and mobile.
3. Update internal links to point to new/realigned pages or collections without changing existing slugs.

## For Story 2: Create Teaching Section

**Note:** For comprehensive implementation guidance, see [Teaching Section - Comprehensive Design Documentation](./teaching-section-design.md), which includes 25 detailed work items organized into 7 phases.

### High-Level Work Items

1. **Schema Design & Setup**
   - Define teaching collection schema in `src/content/config.ts` with flexible course associations
   - Create content directory structure (`src/content/teaching/` with course subdirectories)
   - Document schema and organizational principles

2. **Content Development**
   - Draft course overview content for Software Engineering, Corporate Innovation, and Invention
   - Gather example projects and descriptions with links
   - Compile public artifacts (syllabi, slides, templates, repositories)
   - Write teaching philosophy statements (overall and course-specific)

3. **Component Development**
   - Create CourseCard component for featured course display
   - Create ProjectShowcase component for example projects
   - Create ArtifactList component for public resources
   - Write unit tests for all new components

4. **Page Implementation**
   - Create Teaching landing page (`/src/pages/teaching/index.astro`)
   - Create Software Engineering course page
   - Create Corporate Innovation course page
   - Create Invention course page
   - Implement responsive design and navigation

5. **Integration & Navigation**
   - Add "Teaching" link to primary site navigation
   - Tag teaching content for cross-collection discovery
   - Link teaching content from Consulting and About pages
   - Implement related content logic (teaching-tagged Writing posts)

6. **Testing & Refinement**
   - Review and edit all content for tone, clarity, and accuracy
   - Test responsive design on mobile, tablet, and desktop
   - Conduct accessibility audit (ARIA labels, keyboard navigation, screen reader)
   - Run performance testing (Lighthouse, page load times)
   - Cross-browser testing (Chrome, Firefox, Safari, Edge)

7. **Documentation & Launch**
   - Update project documentation (README, style guide)
   - Complete pre-launch checklist (broken links, alt text, etc.)
   - Deploy to production and monitor for issues
   - Collect feedback for iteration

### Detailed Work Items
The [Teaching Section Design Documentation](./teaching-section-design.md) contains 25 detailed work items (WI-01 through WI-25) with specific tasks, acceptance criteria, and dependencies. Key phases include:

- **Phase 1:** Schema Design & Setup (WI-01 to WI-02)
- **Phase 2:** Content Development (WI-03 to WI-06)
- **Phase 3:** Component Development (WI-07 to WI-09)
- **Phase 4:** Page Implementation (WI-10 to WI-13)
- **Phase 5:** Integration & Navigation (WI-14 to WI-16)
- **Phase 6:** Testing & Refinement (WI-17 to WI-21)
- **Phase 7:** Documentation & Launch (WI-22 to WI-25)

## For Story 3: Consolidate Blog → Writing
1. Create or update a Writing collection that supersedes the blog while preserving existing post slugs.
2. Map current categories to the target tag set (innovation & org design, software engineering, teaching reflections, cycling, guitar & music); plan retagging without deleting markdown.
3. Update the Writing index to use PostCard-style listings with optional images and tag chips.
4. Validate that existing blog routes resolve and redirect appropriately if needed without breaking URLs.

## For Story 4: AutoSoft Today Landing Page
1. Draft a concise landing page describing AutoSoft Today’s purpose and current status.
2. Add prominent external links to autosofttoday.com and representative content highlights without importing that content.
3. Integrate the page into navigation and ensure layout consistency.

## For Story 5: Consulting Page
1. Outline consulting positioning (problems solved, connection to teaching/writing) in a restrained tone.
2. Add a lightweight contact or next-step element that fits existing routing patterns.
3. Ensure styling aligns with the calm, writing-forward aesthetic (no heavy marketing elements).

## For Story 6: About Page Refresh
1. Rewrite bio content to foreground current focus areas in present tense and add sections for boards/advisory roles and seasonal location (Seattle/Park City).
2. Include a CV link placeholder and ensure link handling matches site conventions.
3. Verify the page uses shared layouts and appears correctly in navigation.

## For Story 7: Content Audit & Triage
1. Inventory existing posts/pages and categorize them as migrate-as-is, retag, or archive/omit while preserving slugs for kept items.
2. Document retagging/collection changes needed to align with the new IA and locked constraints.
3. Capture follow-up implementation tasks and potential redirects (if any) while avoiding deletion of markdown/MDX.
