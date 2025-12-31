# Stories for Astro Migration – IA Refresh

## Story 1: Define Top-Level Navigation
Replace the legacy Gatsby navigation with the six-item IA (Home, Teaching, Writing, AutoSoft Today, Consulting, About) and ensure consistency across layouts.

### Acceptance Criteria
- Navigation renders the exact six links in all layouts (desktop and mobile if applicable).
- Existing routes remain functional; new navigation points to the intended pages/collections.
- No residual Gatsby-era nav items remain.

## Story 2: Create Teaching Section (Enhanced)
Introduce a comprehensive Teaching section with a landing page and course subpages for Software Engineering, Corporate Innovation, and NUvention. Implement a flexible content collection schema that supports rich metadata for philosophy, topics, example projects, and public artifacts.

### Objective
Create a Teaching section that showcases Todd's teaching experience, philosophy, and course offerings through well-structured content and intuitive navigation. The section should serve prospective students, fellow educators, and potential corporate partners.

### User Stories
**As a prospective student, I want to:**
- Understand Todd's teaching philosophy and approach
- Explore available courses with clear descriptions and learning objectives
- Access public course materials and example projects

**As a fellow educator, I want to:**
- Learn about innovative teaching methodologies and frameworks
- Access publicly shared course materials and templates
- Read teaching reflections and insights

**As a corporate partner, I want to:**
- Understand how Todd's teaching applies to organizational challenges
- Review case studies and example projects
- Assess fit for corporate training or advisory work

### Acceptance Criteria

**Schema & Content Model:**
- Teaching collection schema supports flexible course associations via frontmatter array
- Posts can belong to multiple courses (e.g., a module relevant to both Software Engineering and Corporate Innovation)
- Schema includes philosophy, topics, frameworks, example projects, and public artifacts
- Content types differentiated: course-overview, module, project, resource, reflection

**Teaching Landing Page (`/teaching`):**
- Hero section with teaching philosophy statement and years of experience
- Featured cards for all three courses with descriptions and key topics
- Section highlighting teaching achievements (e.g., "Co-created award-winning NUvention Web")
- Links to public resources and teaching reflections from Writing collection
- Mobile-responsive design consistent with site aesthetic

**Course Landing Pages:**
- Dedicated pages for Software Engineering, Corporate Innovation, and NUvention
- Each page displays: overview, philosophy, topics & frameworks, example projects, public artifacts
- Related content from Writing collection (teaching-tagged posts) linked
- Professional, evergreen tone avoiding year-specific language
- Clear navigation between courses with breadcrumbs

**Integration & Navigation:**
- "Teaching" link in primary site navigation
- Tags connect teaching content to Writing collection
- Consulting page references teaching credibility
- About page mentions teaching experience

**Technical Requirements:**
- Routes follow `/teaching/*` pattern (no year-based URLs)
- Content collection builds without errors
- All images have alt text for accessibility
- Page load performance <3s on 3G
- Cross-browser compatibility verified

### Detailed Design Documentation
See [Teaching Section - Comprehensive Design Documentation](./teaching-section-design.md) for:
- Complete schema design with Zod examples
- Detailed course definitions (philosophy, topics, frameworks, projects)
- Landing page and course page content requirements
- Work items breakdown (25 detailed work items)
- Component patterns and query examples
- Legacy Gatsby repository migration guidance
- Success criteria and validation checklist

### Out of Scope
- Interactive course enrollment or registration systems
- Video hosting (link externally if needed)
- Student portal or grade management
- Real-time collaboration features

## Story 3: Consolidate Blog → Writing
Migrate the blog feed into a Writing collection with tag-driven discovery instead of category pages; ensure hobbies (cycling, guitar/music) live naturally under Writing.

### Acceptance Criteria
- Writing collection replaces/represents the blog without changing existing slugs.
- Tags include at least: innovation & org design, software engineering, teaching reflections, cycling, guitar & music.
- Writing index uses strong post cards with optional images.

## Story 4: AutoSoft Today Landing Page
Add a concise landing page describing AutoSoft Today, linking out to autosofttoday.com without duplicating content.

### Acceptance Criteria
- Page explains what AutoSoft Today is and why it matters.
- Clear external link to autosofttoday.com is present.
- No imported/duplicated articles from the external site.

## Story 5: Consulting Page
Create a restrained consulting overview that connects to teaching and writing without heavy sales language.

### Acceptance Criteria
- Page outlines problems helped with and connection to teaching/writing credibility.
- Tone remains calm and advisory rather than marketing-heavy.
- Provides a lightweight contact or next-step cue.

## Story 6: About Page Refresh
Refresh the bio to reflect current focus, include boards/advisory roles, seasonal location (Seattle/Park City), and a CV link placeholder.

### Acceptance Criteria
- Bio reads in present tense and foregrounds current work.
- Sections for roles and location are present; CV link placeholder exists.
- Page fits within the new navigation and layout system.

## Story 7: Content Audit & Triage
Audit existing posts/pages to decide what to migrate, retag, or archive while preserving slugs where kept.

### Acceptance Criteria
- Inventory documents which items migrate as-is, which need retagging, and which are archived/omitted.
- Recommendations respect locked constraints (no deleted markdown, no route breakage).
- Follow-up tasks captured for implementation.
