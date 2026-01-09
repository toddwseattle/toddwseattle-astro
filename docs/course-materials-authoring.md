# Course Materials Authoring Guide

This guide explains how to author entries in the `course-materials` content collection. Entries power the materials listed under each teaching course and render via type-specific layouts.

## Content Location

- Path: `src/content/course-materials/`
- Each entry is a Markdown (`.md` or `.mdx`) file with frontmatter.

## Common Frontmatter

- `title`: string — display title
- `description`: string — short summary
- `courses`: string[] — course slugs this material belongs to (e.g., `software-engineering`)
- `type`: one of `tutorial | resource | example | exercise | post | student work`
- `date`: ISO date string (YYYY-MM-DD)
- `cover` (optional): image path or ImageMetadata
- `difficulty` (optional): `beginner | intermediate | advanced` (used for exercises)

## Type-Specific Guidance

### Tutorial

- Use clear H2 steps (##) so the Tutorial layout can derive a progress sidebar.
- Keep steps small; each step should have a single outcome.
- Example: `docs/course-material-examples/tutorial.md`

### Resource

- Author normal post content in the body.
- Add a `resources` array in frontmatter:
  - `resources: [{ title: string, url: string, description?: string }]`
- The layout renders your post first, then a Resource/Description table.
- Example: `src/content/course-materials/sample-resource.md`

### Example

- Focus on a concrete, minimal demonstration (inputs → outputs).
- Prefer showing code snippets and a short outcome section.
- Example: `docs/course-material-examples/example.md`

### Exercise

- Present the problem statement, constraints, and expected deliverables.
- Use `difficulty` to indicate level: `beginner | intermediate | advanced`.
- Consider including prerequisites and time estimates in the body.
- Example: `docs/course-material-examples/exercise.md`

### Post

- Long-form prose for insights or reflections.
- Include date and optional cover; no special fields required.
- Example: `docs/course-material-examples/post.md`

### Student Work

- Showcase selected student projects or artifacts.
- Ensure any external links have permission to share.
- Example: `docs/course-material-examples/student-work.md`

## Slugs and URLs

- Slugs are derived from filenames; avoid changing filenames to preserve URLs.
- Route: `/course-materials/:slug`.

## Styling and Assets

- Use standard Markdown/MDX; code fences for snippets.
- Images: prefer `astro:assets` when authoring MDX; otherwise use relative paths.

## Validation

- Run `npm run build` to validate schema and routes.
- Verify entries appear under the correct course page and navigate correctly.
