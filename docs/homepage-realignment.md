# Codex Prompt: ToddWSeattle Astro IA Realignment (Inventory + Plan)

You are working in repo: toddwseattle/toddwseattle-astro (Astro + TS + Tailwind + some React islands).
Goal: Realign homepage and IA toward the writing-first structure without deleting any content or files unless explicitly approved.

## Current Structure Snapshot (as of now)

Routes under `src/pages/**`:

- `/` (src/pages/index.astro)
- `/about` (src/pages/about/index.astro)
- `/consulting` (src/pages/consulting/index.astro)
- `/autosoft-today` (src/pages/autosoft-today/index.astro)
- `/writing` and `/writing/tag/[tag]` (src/pages/writing/\*)
- `/blog` and `/blog/[slug]` (src/pages/blog/\*)
- `/teaching` and `/teaching/[slug]` (src/pages/teaching/\*)
- `/course-materials/[slug]` (src/pages/course-materials/[slug].astro)
- `/rss.xml` and `/robots.txt` (utility routes)

Content and data sources exist in both `src/content/**` and `src/data/**` (legacy and current):

- Writing/blog content: `src/content/blog/**` plus legacy `src/data/blog/**`
- Teaching and course materials: `src/content/teaching/**`, `src/content/course-materials/**`
- Legacy resume/portfolio-style data: `src/content/projects/**`, `src/content/experiences/**`, `src/content/activities/**`, `src/content/skills/**`, `src/content/education/**`, `src/content/testimonials/**`, `src/content/nonprofit/**`, and corresponding `src/data/**` mirrors

Components that look portfolio/resume-oriented today include:

- `src/components/Projects.astro`
- `src/components/Experience.astro`
- `src/components/Activities.astro`
- `src/components/ui/Timeline.astro`
- `src/components/NonProfit.astro`
- Blog list/grid components in `src/components/blog/**`

## Target IA

Top-level nav (ONLY):

- Home
- Teaching
- Writing
- AutoSoft Today
- Consulting
- About

Principles:

- Writing-forward (primary content stream)
- Tags over deep nesting
- Evergreen over timeline/resume
- Home is curated, not a feed dump
- AutoSoft Today is a landing page that links out to autosofttoday.com; no duplicated content

## Task A — Inventory (No Deletions)

1. Enumerate all routes under `src/pages/**` and classify:
   - Primary IA routes
   - Legacy/compatibility routes (e.g., `/blog`)
   - Utility routes (rss/robots)
2. Enumerate content collections and data sources under `src/content/**` and `src/data/**` that support:
   - Projects/portfolio visuals
   - Experience timeline/resume sections
   - Activities or nonprofit sections
   - Testimonials or skills lists
3. Enumerate components that render portfolio/resume UI or data.
4. Enumerate assets under `public/**` and `src/content/projects/**` tied to portfolio views.

Deliverable: Create or update `docs/homepage-realignment.md` with a concise inventory list (no deletions).

### Inventory Results

Routes (primary IA):

- `/` (src/pages/index.astro)
- `/about` (src/pages/about/index.astro)
- `/consulting` (src/pages/consulting/index.astro)
- `/autosoft-today` (src/pages/autosoft-today/index.astro)
- `/writing` (src/pages/writing/index.astro)
- `/writing/tag/[tag]` (src/pages/writing/tag/[tag].astro)
- `/teaching` (src/pages/teaching/index.astro)
- `/teaching/[slug]` (src/pages/teaching/[slug].astro)

Routes (legacy or compatibility candidates):

- `/blog` (src/pages/blog/index.astro)
- `/blog/[slug]` (src/pages/blog/[slug].astro)
- `/course-materials/[slug]` (src/pages/course-materials/[slug].astro)

Routes (utility):

- `/rss.xml` (src/pages/rss.xml.ts)
- `/robots.txt` (src/pages/robots.txt.ts)

Content collections and data sources (current + legacy):

- Writing/blog:
  - `src/content/blog/**` (primary content store today)
  - `src/data/blog/**` (legacy data store)
- Teaching and course materials:
  - `src/content/teaching/**`
  - `src/content/course-materials/**`
- Consulting/services:
  - `src/content/services/**`
  - `src/data/services/**`
- Hero, newsletter, contacts:
  - `src/content/hero/**`, `src/content/newsletter/**`, `src/content/contacts/**`
  - `src/data/hero/**`, `src/data/newsletter/**`, `src/data/contacts/**`
- Legacy resume or portfolio style collections:
  - Projects: `src/content/projects/**`, `src/data/projects/**`
  - Experiences: `src/content/experiences/**`, `src/data/experiences/**`
  - Activities: `src/content/activities/**`, `src/data/activities/**`
  - Skills: `src/content/skills/**`, `src/data/skills/**`
  - Education: `src/content/education/**`, `src/data/education/**`
  - Testimonials: `src/content/testimonials/**`, `src/data/testimonials/**`
  - Nonprofit: `src/content/nonprofit/**`, `src/data/nonprofit/**`
  - Investments: `src/content/investments/**`, `src/data/investments/**`

Components that appear portfolio or resume oriented:

- `src/components/Projects.astro` (project grid or list)
- `src/components/Experience.astro` (timeline or experience blocks)
- `src/components/Activities.astro` (resume-style activity grouping)
- `src/components/ui/Timeline.astro` (timeline UI used by experience sections)
- `src/components/NonProfit.astro` (nonprofit list section)
- `src/components/ui/ProgressBar.astro` (skills style display)

Components used for writing lists and cards:

- `src/components/blog/BlogGrid.astro`
- `src/components/blog/BlogCard.astro`
- `src/components/blog/WritingList.astro`

Assets tied to portfolio/project visuals (non-exhaustive, based on filenames):

- `public/ashesi-Ashesi_University_Logo.jpg`
- `public/pitch-eval-logo_white_background.jpg`
- `public/envorso-envorso_logo.png`
- `public/farley-center-farley-center.png`
- `src/content/projects/*` (images embedded alongside project markdown)
- `src/data/projects/*` (images embedded alongside legacy project data)

## Task B — Realignment Plan (What To Change, Not What To Delete)

Enumerate what needs to be realigned to match the IA, including:

- Navigation: ensure only 6 primary items appear; decide how `/blog` behaves (redirect vs compatibility wrapper)
- Home page content structure and sequencing
- Consolidation of writing streams (`/writing` vs `/blog`)
- Placement of legacy resume/portfolio content (convert resume to `/resume` route; avoid projects grid on home)

### Realignment Checklist (No Deletes)

Navigation and route behavior:

- Confirm header/nav shows only the 6 primary IA items.
- Decide what `/course-materials/[slug]` should be:
  - Option A: keep as a support route linked from `/teaching`.
  - Option B: migrate visibility into `/teaching` detail pages and keep course-materials as compatibility only.
- Keep `/blog` routes, but make them thin wrappers that redirect to `/writing` (index) and `/writing/[slug]` (detail).
- Preserve existing slugs and routes; no year-based URLs.

Home page content and sequencing:

- Replace any portfolio or resume-driven sections with the target home structure.
- Verify "Now" bullets link to Teaching, Writing, Consulting, and AutoSoft Today.
- Limit writing on home to a curated set (featured or latest 3).
- Add a short "Mini About" block with Seattle/Park City.
- Ensure the home layout remains writing-first (no projects grid, no resume timeline).

Writing stream consolidation:

- Establish a single canonical writing stream (likely `/writing`).
- Confirm where `src/content/blog/**` feeds are used and align `/writing` to them.
- Decide whether `src/data/blog/**` is still used or should remain dormant for now.
- Align `/writing/tag/[tag]` to the same source as `/writing` (no split content sets).

Legacy portfolio and resume content:

- Keep projects, experiences, activities, skills, education, testimonials, nonprofit content as:
  - Compatibility pages (if they are still routed), or
  - Source material to be repurposed into writing, teaching artifacts, or consulting case studies.
- Avoid presenting a "projects grid" or "resume timeline" on the home page.
- Create a dedicated `/resume` route as the single surface for Experience, Skills, Education, Timeline content.

Tag UX:

- Ensure tags drive discovery in `/writing/tag/[tag]`.
- Keep personal topics (cycling, guitar, music) as tags, not top-level nav items.
- Keep tag URLs stable and linked from writing detail pages.

Implementation notes (non-destructive):

- Reuse existing components where possible by re-sequencing on the home page.
- If a new "Featured Writing" selector is needed, add minimal frontmatter like `featured: true` in `src/content/blog/**`.
- Prefer `.astro` for new sections; use React only if interactivity is required.

### Task 8 — Routing + Resume Consolidation

- Create a new `/resume` route and move Experience, Skills, Education, and Timeline content there.
- Do not add redirects for old experience/skills/education/timeline or projects pages.
- `/blog` should be a thin wrapper that redirects to `/writing`.

## Task C — Home Page Structure (Target)

Home sections (top to bottom):

1. Hero (positioning + 2 CTAs max)
2. “Now” (3–5 bullets, present tense, links into Teaching/Writing/Consulting/AutoSoft Today)
3. Four pillar cards (Teaching / Writing / AutoSoft Today / Consulting)
4. Recent writing (max 3 posts, curated; use frontmatter like `featured: true` or fallback to latest)
5. Mini About (present tense + Seattle/Park City)
6. Contact CTA

Rules:

- Do NOT reintroduce a Projects grid.
- Do NOT dump a full feed of posts on home.
- If there’s “Projects” content worth keeping, convert it into either:
  - a Writing post (essay: what/why/how)
  - or a Teaching artifact link on a course page
  - or a Consulting case-study style section on Consulting page

## Guardrails / Quality Gates

- Do not remove any content or files without asking.
- Preserve existing slugs and URLs unless approved.
- Keep diffs focused and composable.
