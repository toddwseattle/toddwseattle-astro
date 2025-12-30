# Stories for Astro Migration – IA Refresh

## Story 1: Define Top-Level Navigation
Replace the legacy Gatsby navigation with the six-item IA (Home, Teaching, Writing, AutoSoft Today, Consulting, About) and ensure consistency across layouts.

### Acceptance Criteria
- Navigation renders the exact six links in all layouts (desktop and mobile if applicable).
- Existing routes remain functional; new navigation points to the intended pages/collections.
- No residual Gatsby-era nav items remain.

## Story 2: Create Teaching Section
Introduce a Teaching landing page plus course subpages for Corporate Innovation and Software Engineering with clear frontmatter for philosophy, topics, example projects, and public artifacts.

### Acceptance Criteria
- Teaching landing page highlights both courses and links to subpages.
- Each course page supports defined frontmatter fields and renders them cleanly.
- Content fits the evergreen tone and avoids year-based URLs.

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
