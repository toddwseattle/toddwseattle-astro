# Build Guide: Resume Page from Existing Content

Goal: create a new `/resume` route that consolidates Experience, Skills, Education, and Timeline content into a dedicated page, using a new content collection. Do not delete or redirect any existing content unless explicitly approved.

## 1) Create a New Content Collection

Add a `resume` collection in `src/content/config.ts` with sections for experience, skills, education, and timeline items.

Suggested shape:

- `type`: `experience | skills | education | timeline | non-profit`
- `title`: string
- `dateRange`: string (or start/end date if preferred)
- `summary`: string
- `details`: string[] (bullet points)
- `order`: number (for display ordering)
- `tags`: string[] (optional)
- `cta`: `{ label: string; href: string }` (optional)

Notes:

- Keep the schema flexible so you can map existing content without loss.
- Use `order` to avoid relying on dates for ordering.

## 2) Map Existing Content into the New Collection

Source materials:

- Experiences: `src/content/experiences/**` and `src/data/experiences/**`
- Skills: `src/content/skills/**` and `src/data/skills/**`
- Education: `src/content/education/**`ß and `src/data/education/**`
- Timeline UI: `src/components/ui/Timeline.astro` (presentation)

Create new markdown entries under `src/content/resume/**` by translating the existing frontmatter + body content into the new schema.

Guidelines:

- Start with Experiences and Education since they are the most structured.
- list non Profit work under education.
- Treat Skills as a section with grouped items (use `details` for skill lists).
- Timeline items can be a subset of Experiences or dedicated entries with `type: timeline`.
- Preserve any slugs if you expect external links, otherwise hoose new slugs for clarity.

## 3) Build the `/resume` Route

Add `src/pages/resume/index.astro` with:

- Layout: use the site’s standard layout (match `src/pages/about/index.astro` or similar).
- Data: `getCollection('resume')` in frontmatter.
- Rendering: group entries by `type` and render sections in this order:
  1. Experience
  2. Skills
  3. Education
  4. Non-Profit Work

Use existing components where possible:

- `src/components/Experience.astro` for experience list items.
- `src/components/ui/Timeline.astro` for timeline layout.
- Create a small `ResumeSection.astro` if you need a consistent header + list wrapper.

## 4) Ensure Navigation and IA Alignment

- Add `/resume` to the header only if explicitly desired (current IA is 6 items).
- If not in header, link to `/resume` from `/about` or `/consulting` as a secondary link.
  c

## 5) Testing and Verification

- Confirm `/resume` builds and renders with `npm run build`.
- Verify no runtime errors from missing fields.
- Check mobile layout for long timelines or dense skills lists.

## 6) Non-Destructive Migration Path

- Do not remove or redirect old experience/skills/education pages.
- Keep old content collections untouched until `/resume` is stable.
- After launch, decide if legacy pages should remain as hidden compatibility or be deprecated (explicit approval required).
