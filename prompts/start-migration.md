# Initial Migration Setup: Gatsby to Astro

> **⚠️ Status:** This document captured the initial migration bootstrap steps. Most tasks are now complete. For current strategic direction, see `/docs/01-epic.md`. For ongoing tactical work, see `migrate-components.md`.

1. Read /home/toddwseattle/pw-toddwseattle-gb/package.json and create an equivalent package.json for Astro with the right dependencies (replace Gatsby packages with Astro equivalents)
2. Read /home/toddwseattle/pw-toddwseattle-gb/tailwind.config.js and /home/toddwseattle/pw-toddwseattle-gb/tsconfig.json - copy these over
3. Create astro.config.mjs with React and Tailwind integrations
4. Create src/content/config.ts to define content collections based on the structure in src/data/
5. Install all dependencies
> **Strategic Context:** 
> - **Epic & Objectives:** `/docs/01-epic.md` - IA Refresh goals and constraints
> - **User Stories:** `/docs/02-stories.md` - Navigation, Teaching, Writing, etc.
> - **Style Guide:** `/docs/04-style-guide.md` - Tone, architecture, and design principles
> - **Work Items:** `/docs/03-workitems.md` - Detailed implementation tasks

## Original Bootstrap Tasks (Completed)

The following initial setup tasks were completed to establish the Astro project:

1. ✅ Created package.json with Astro dependencies (replacing Gatsby packages)
2. ✅ Copied and configured tailwind.config.js and tsconfig.json
3. ✅ Created astro.config.mjs with React and Tailwind integrations
4. ✅ Created src/content/config.ts for content collections
5. ✅ Installed all dependencies

## Current Migration Status

For the current state of component migration and ongoing work, refer to:

- **`migrate-components.md`** - Comprehensive component migration tracking
- **`migration-session-2025-11-13.md`** - Recent progress summary
- **`components/`** - Individual component migration plans

## Next Steps

The migration is now focused on:

1. **Navigation Alignment** - Implementing the six-item IA (Story 1 in `/docs/02-stories.md`)
2. **Content Collections** - Teaching, Writing sections (Stories 2-3)
3. **Page Development** - AutoSoft Today, Consulting, About pages (Stories 4-6)
4. **Component Migration** - Remaining components per `migrate-components.md`

All work should align with the strategic goals in `/docs/` while respecting the locked constraints (no restart, preserve slugs/routes, no re-imports).
