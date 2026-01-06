# Component Migration Plan: Gatsby to Astro

> **Strategic Context:** This tactical migration plan supports the overarching goals defined in `/docs/01-epic.md` (IA Refresh) and follows the principles in `/docs/04-style-guide.md`. See `/docs/02-stories.md` for user stories and `/docs/03-workitems.md` for detailed work items.

## Overview

This plan outlines the migration of components from the old Gatsby site (`/home/toddwseattle/pw-toddwseattle`) to the new Astro project (`/home/toddwseattle/pw-toddwseattle-astro`).

The migration aligns with the **six-item navigation structure** (Home, Teaching, Writing, AutoSoft Today, Consulting, About) and the **writing-forward, modern posture** described in the strategic documentation.

## Current State Assessment

### Already Migrated Components

- ✅ `Header.tsx` - React component (uses client:load for mobile menu)
- ✅ `Footer.tsx` - React component (static, could be .astro)
- ✅ `HeroBanner.astro` - Astro component
- ✅ `Activities.astro` - Astro component
- ✅ `Projects.astro` - Astro component
- ✅ `Experience.astro` - **NEW** - Work history section
- ✅ `NonProfit.astro` - **NEW** - Board/nonprofit service section
- ✅ UI Components:
  - `Button.tsx`
  - `Container.tsx`
  - `Icon.tsx`
  - `InfoBlock.tsx`
  - `TitleSection.tsx`
  - `Timeline.astro` - **NEW** - Timeline UI for experiences

### Layouts

- ✅ `BaseLayout.astro` - Main layout wrapper

## Migration Tasks

### Phase 1: Component Audit & Preparation

**Goal:** Understand what exists in the old Gatsby project and what needs migration

1. **Audit Gatsby Components**
   - [x] List all components from `/home/toddwseattle/pw-toddwseattle-gb/src/components/`
   - [x] Identify which are already migrated
   - [x] Identify which are missing
   - [x] Document component dependencies and prop interfaces
   - [x] Create Migration documents for each in prompts/components in markdown format for review

   **Completed:** Created comprehensive audit in `prompts/components/00-audit-summary.md`

   **Migration documents created:**
   - `01-timeline-migration.md` - Timeline UI component (High Priority)
   - `02-experience-migration.md` - Experience section (High Priority)
   - `03-nonprofit-migration.md` - NonProfit section (High Priority)
   - `04-seo-migration.md` - SEO/head management (High Priority)
   - `05-progressbar-migration.md` - ProgressBar UI component (Medium Priority)

2. **Review Existing Astro Components**
   - [x] Verify `Header.tsx` functionality and client interactivity needs
   - [x] Verify `Footer.tsx` functionality and client interactivity needs
   - [x] Check `HeroBanner.astro` for content collection integration
   - [x] Check `Activities.astro` for content collection integration
   - [x] Check `Projects.astro` for content collection integration
   - [x] Verify all UI components work correctly

   **Completed:** All existing components reviewed and verified working correctly.

### Phase 2: Content Collection Integration

**Goal:** Ensure components properly consume data from Astro content collections (aligns with Story 3 in `/docs/02-stories.md` for Writing consolidation and content architecture goals in `/docs/01-epic.md`)

3. **Update Components for Content Collections**
   - [ ] Verify content collections are properly defined in `src/content/config.ts`
   - [ ] Update `HeroBanner.astro` to use `hero` collection
   - [ ] Update `Activities.astro` to use `activities` collection
   - [ ] Update `Projects.astro` to use `projects` collection
   - [ ] Create additional components for other collections:
     - [ ] Blog posts component (uses `blog` collection)
     - [ ] Skills component (uses `skills` collection)
     - [ ] Experience/Resume component (uses `experiences` collection)
     - [ ] Education component (uses `education` collection)
     - [ ] Testimonials component (uses `testimonials` collection)
     - [ ] Services component (uses `services` collection)
     - [ ] Contact component (uses `contacts` collection)
     - [ ] Newsletter component (uses `newsletter` collection)
     - [ ] Nonprofit/Boards component (uses `nonprofit` collection)

### Phase 3: Missing Components Migration

**Goal:** Migrate any components that don't yet exist in the Astro project

4. **Identify and Migrate Missing Components**
   - [ ] Compare Gatsby component list with current Astro components
   - [ ] For each missing component:
     - [ ] Determine if it should be `.astro` (static) or `.tsx` (interactive)
     - [ ] Migrate JSX/TSX syntax to Astro syntax if needed
     - [ ] Update GraphQL queries to use Astro content collections
     - [ ] Update imports and paths
     - [ ] Add proper TypeScript types
     - [ ] Develop and add vitest unit tests for any tsx or ts components.
     - [ ] Test component rendering

### Phase 4: React Component Optimization

**Goal:** Optimize React components for Astro's partial hydration model

5. **Optimize Interactive Components**
   - [ ] Review `Header.tsx` for client-side interactivity requirements
     - [ ] Determine optimal client directive (`client:load`, `client:idle`, `client:visible`)
     - [ ] Extract static portions to `.astro` if possible
   - [ ] Review `Footer.tsx` for client-side interactivity requirements
     - [ ] Determine optimal client directive
     - [ ] Extract static portions to `.astro` if possible
   - [ ] Review all UI components in `components/ui/`:
     - [ ] Determine which need client-side JavaScript
     - [ ] Consider converting purely presentational components to `.astro`

### Phase 5: Style Migration

**Goal:** Ensure all components use Tailwind CSS consistently

6. **Verify Styling**
   - [ ] Check that Tailwind classes work in all components
   - [ ] Migrate any styled-components or emotion CSS to Tailwind
   - [ ] Review `src/assets/styles/` files:
     - [ ] `global.css` - ensure it's imported in `BaseLayout.astro`
     - [ ] `globalStyles.ts` - convert to CSS or Tailwind config if needed
     - [ ] `variables.ts` - integrate with Tailwind config
   - [ ] Verify responsive design works across all components

### Phase 6: Image Optimization

**Goal:** Use Astro's Image component for optimized images

7. **Update Image Handling**
   - [ ] Replace Gatsby Image with Astro Image component
   - [ ] Update image imports and paths
   - [ ] Migrate images from `/home/toddwseattle/pw-toddwseattle-gb/src/images/` to `src/assets/images/`
   - [ ] Ensure alt text and accessibility features are preserved

### Phase 7: Layout & Page Migration

**Goal:** Ensure all pages and layouts are properly migrated

8. **Review and Update Layouts**
   - [ ] Compare `BaseLayout.astro` with Gatsby layout(s)
   - [ ] Ensure SEO meta tags are properly set
   - [ ] Verify head management (title, description, og tags)
   - [ ] Add any missing layout components

9. **Page Migration**
   - [ ] Review all pages from Gatsby project
   - [ ] Verify `index.astro` matches Gatsby homepage
   - [ ] Create any missing pages in `src/pages/`
   - [ ] Update routing to match original site structure

### Phase 8: Testing & Validation

**Goal:** Ensure all components work correctly

10. **Component Testing**
    - [ ] Visual regression testing (compare with Gatsby site)
    - [ ] Test responsive breakpoints
    - [ ] Test interactive elements (navigation, buttons, forms)
    - [ ] Verify all content collection data renders correctly
    - [ ] Check for console errors
    - [ ] Test build process (`npm run build`)
    - [ ] Test preview (`npm run preview`)

11. **Performance Validation**
    - [ ] Run Lighthouse audit
    - [ ] Compare bundle size with Gatsby version
    - [ ] Verify partial hydration is working (check bundle size per page)
    - [ ] Test loading performance

### Phase 9: Documentation

**Goal:** Document the new component structure

12. **Create Documentation**
    - [ ] Document component architecture
    - [ ] Create README for component usage
    - [ ] Document content collection schemas
    - [ ] Add inline comments for complex components
    - [ ] Document any breaking changes from Gatsby version

## Migration Strategy Notes

### Astro Component Best Practices

**Alignment with Strategic Goals** (see `/docs/04-style-guide.md`):

- Use `.astro` components for static content (no client-side interactivity)
- Use `.tsx` with client directives only when client-side JavaScript is needed
- Prefer `client:idle` or `client:visible` over `client:load` for better performance
- Use content collections instead of GraphQL for data fetching
- Leverage Astro's built-in Image component for optimization
- Follow Tailwind CSS patterns and color tokens from style guide
- Maintain calm, modern, readable aesthetic (writing-forward over visual gimmicks)

### Key Differences: Gatsby vs Astro

1. **Data Fetching:** GraphQL → Content Collections API
2. **Images:** gatsby-image → @astrojs/image or astro:assets
3. **Component Model:** All React → Mix of Astro + React (partial hydration)
4. **Routing:** File-based (both, but different structure)
5. **Styling:** CSS-in-JS → Scoped CSS or Tailwind (preferred)

## Success Criteria

- [ ] All components from Gatsby site are migrated or have Astro equivalents
- [ ] Site renders correctly and matches original design
- [ ] All content from collections displays properly
- [ ] Interactive features work as expected
- [ ] Build completes without errors
- [ ] Performance metrics meet or exceed Gatsby version
- [ ] Lighthouse score: 90+ across all metrics

## Next Steps After Completion

1. Set up CI/CD pipeline
2. Configure deployment (Netlify, Vercel, etc.)
3. Set up analytics
4. Add sitemap and robots.txt
5. Configure RSS feed for blog
