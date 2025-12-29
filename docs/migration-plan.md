---
# Migration Plan: From Gatsby to Astro

## Overview
This document outlines the plan and progress for migrating the personal website from Gatsby to Astro.

---
## Checklist
- [x] Analyze the Gatsby repository (`toddwseattle-gb`) for reusable components, pages, and layouts.
- [x] Review existing work in `toddwseattle-astro` (e.g., prompts directory, test configurations).
- [ ] Convert identified components into `.astro` components.
- [ ] Migrate all pages from Gatsby to Astro.
- [ ] Transition all GraphQL data queries in Gatsby.
- [ ] Validate TailwindCSS configuration for styling.
- [ ] Ensure design consistency with the Gatsby site.
- [ ] Validate migration outputs with tests.
- [ ] Update this document and log progress for each section.

---
## Phase 1: Review and Analysis

1. Analyze the Gatsby repository (`toddwseattle-gb`):
   - Identify reusable components, pages, and layouts. 
2. Review existing work in `toddwseattle-astro`:
   - **Prompts Directory:**
       - `migrate-components.md`: Contains component-specific migration details.
       - `migration-session-2025-11-13.md`: Notes from a migration planning session.
       - `start-migration.md`: Early considerations and initial migration steps.
   - **Source Directories:**
       - `src/`, `public/`, and existing test configurations in Astro.
   
---
## Phase 2: Component and Page Migration

1. **Convert Components:**
   - Refactor reusable Gatsby components into `.astro` components.
   - Leverage Astro’s partial hydration for React-based components.

2. **Migrate Pages:**
   - Rebuild pages from Gatsby to Astro, ensuring consistent navigation logic.
   - Use guidance from `prompts/start-migration.md` and `migrate-components.md`.

3. **Transition Data Queries:**
   - Replace GraphQL queries with Astro’s `fetch()` where applicable.

---
## Phase 3: Styling and Validation

1. **TailwindCSS Configuration:**
   - Validate styling against the `tailwind.config.js` in `toddwseattle-astro`.
2. **Ensure Consistency:**
   - Align look and feel of components and pages to their Gatsby design.

---
## Phase 4: Testing and Documentation

1. Validate migration outputs with available testing configurations.
2. Update this document with section-wise progress.