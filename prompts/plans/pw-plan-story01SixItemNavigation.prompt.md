# Plan: Implement Six-Item Navigation for Story 1

Complete the navigation infrastructure by creating missing pages, aligning blog/writing routes, and ensuring consistent Header/Footer rendering across all navigation destinations.

## Current State Analysis

### ✅ Already Complete

- Header component with six-item navigation (desktop + mobile)
- Header tests verify all six links render correctly
- Clean, Gatsby-free navigation code
- Professional design matching style guide (Tailwind, indigo colors)
- Homepage with Header/Footer already rendering

### ❌ Incomplete

- **5 of 6 navigation destinations don't exist** (only Home and Blog pages exist)
- **Blog/Writing route inconsistency** (Header links to `/writing/` but content at `/blog/`)
- **Header not consistently rendered** (only on homepage, not blog pages)
- **No content collections for teaching or pages**

### Missing Routes

1. `/teaching/` - Landing page for courses (Teaching)
2. `/writing/` - Primary content stream (Writing, replaces Blog)
3. `/autosoft-today/` - Links to external site (AutoSoft Today)
4. `/consulting/` - Advisory services overview (Consulting)
5. `/about/` - Bio and current roles (About)

## Implementation Steps

### Step 1: Create Writing Index Page

**File:** `src/pages/writing/index.astro`
**Action:** Create new file copying pattern from `src/pages/blog/index.astro`

**Requirements:**

- Import and render Header/Footer components with `client:load`
- Change title from "Blog" to "Writing"
- Use `getCollection('blog')` to fetch posts
- Use `BlogGrid` and `TitleSection` components
- Match layout pattern from homepage (`BaseLayout` wrapper)
- Add subtitle: "Thoughts on innovation, software, teaching, cycling, and music"

**Pattern to follow:**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TitleSection from '../../components/ui/TitleSection';
import BlogGrid from '../../components/blog/BlogGrid.astro';
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const publishedPosts = allPosts
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

const seo = {
  title: 'Writing',
  description: 'Thoughts on innovation, software, teaching, cycling, and music'
};
---

<BaseLayout seo={seo}>
  <Header client:load />
  <main class="py-16">
    <TitleSection
      client:load
      title="Writing"
      subtitle="Thoughts on innovation, software, teaching, cycling, and music"
      center
    />
    <div class="mt-12">
      <BlogGrid posts={publishedPosts} />
    </div>
  </main>
  <Footer client:load />
</BaseLayout>
```

### Step 2: Redirect Blog to Writing

**File:** `src/pages/blog/index.astro`
**Action:** Replace entire content with redirect

**Requirements:**

- Use `Astro.redirect('/writing/', 301)` for permanent redirect
- Preserves SEO value
- Establishes `/writing/` as canonical route
- Individual blog posts at `/blog/[slug]/` remain unchanged

**Pattern:**

```astro
---
return Astro.redirect('/writing/', 301);
---
```

### Step 3: Update RSS Feed URLs

**File:** `src/pages/rss.xml.ts`
**Action:** Change all `/blog/` URLs to `/writing/`

**Requirements:**

- Update `site` property to use `/writing/` as base
- Individual item links should point to `/blog/[slug]/` (unchanged)
- Update feed title from "Blog" to "Writing" if present
- Maintain all other RSS functionality

**Find and update:**

- Look for any hardcoded `/blog/` references
- Ensure feed description reflects "Writing" terminology

### Step 4: Create Teaching Landing Page

**File:** `src/pages/teaching/index.astro`
**Action:** Create placeholder page with structure for Story 2

**Requirements:**

- Import Header/Footer with `client:load`
- Use `BaseLayout` wrapper
- Add `Container` component for content width
- Title: "Teaching"
- Placeholder sections for:
  - Introduction paragraph about teaching focus
  - Corporate Innovation course overview
  - Software Engineering course overview
  - Links to course detail pages (to be created in Story 2)

**Pattern:**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/ui/Container';
import TitleSection from '../../components/ui/TitleSection';

const seo = {
  title: 'Teaching',
  description: 'Courses on corporate innovation and software engineering'
};
---

<BaseLayout seo={seo}>
  <Header client:load />
  <main class="py-16">
    <Container>
      <TitleSection
        client:load
        title="Teaching"
        subtitle="Courses on corporate innovation and software engineering"
        center
      />
      <div class="mt-12 prose prose-lg max-w-prose mx-auto">
        <p>Course content will be added here as part of Story 2.</p>
        <!-- Placeholder for course sections -->
      </div>
    </Container>
  </main>
  <Footer client:load />
</BaseLayout>
```

### Step 5: Create AutoSoft Today Page

**File:** `src/pages/autosoft-today/index.astro`
**Action:** Create landing page with external links

**Requirements:**

- Import Header/Footer with `client:load`
- Use `BaseLayout` wrapper
- Brief description of AutoSoft Today
- Clear external link to autosofttoday.com
- No duplicate content from external site
- Keep simple and concise (Story 4)

**Pattern:**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/ui/Container';
import TitleSection from '../../components/ui/TitleSection';

const seo = {
  title: 'AutoSoft Today',
  description: 'Exploring the intersection of automotive technology and software'
};
---

<BaseLayout seo={seo}>
  <Header client:load />
  <main class="py-16">
    <Container>
      <TitleSection
        client:load
        title="AutoSoft Today"
        subtitle="Exploring the intersection of automotive technology and software"
        center
      />
      <div class="mt-12 prose prose-lg max-w-prose mx-auto">
        <p>Content will be added here as part of Story 4.</p>
        <p>
          <a href="https://autosofttoday.com" target="_blank" rel="noopener noreferrer"
             class="text-indigo-600 hover:text-indigo-800">
            Visit AutoSoft Today →
          </a>
        </p>
      </div>
    </Container>
  </main>
  <Footer client:load />
</BaseLayout>
```

### Step 6: Create Consulting Page

**File:** `src/pages/consulting/index.astro`
**Action:** Create placeholder page for Story 5

**Requirements:**

- Import Header/Footer with `client:load`
- Use `BaseLayout` wrapper
- Restrained, advisory tone (not sales-heavy)
- Connect to teaching and writing credibility
- Lightweight contact/next-step cue
- Content to be filled in Story 5

**Pattern:**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/ui/Container';
import TitleSection from '../../components/ui/TitleSection';

const seo = {
  title: 'Consulting',
  description: 'Advisory services for innovation and software engineering'
};
---

<BaseLayout seo={seo}>
  <Header client:load />
  <main class="py-16">
    <Container>
      <TitleSection
        client:load
        title="Consulting"
        subtitle="Advisory services for innovation and software engineering"
        center
      />
      <div class="mt-12 prose prose-lg max-w-prose mx-auto">
        <p>Content will be added here as part of Story 5.</p>
      </div>
    </Container>
  </main>
  <Footer client:load />
</BaseLayout>
```

### Step 7: Create About Page

**File:** `src/pages/about/index.astro`
**Action:** Create placeholder page for Story 6

**Requirements:**

- Import Header/Footer with `client:load`
- Use `BaseLayout` wrapper
- Structure for bio (present tense, current focus)
- Sections for boards/advisory roles
- Seasonal location info (Seattle/Park City)
- CV link placeholder
- Content to be filled in Story 6

**Pattern:**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/ui/Container';
import TitleSection from '../../components/ui/TitleSection';

const seo = {
  title: 'About',
  description: 'About Todd Warren - software leader, educator, advisor'
};
---

<BaseLayout seo={seo}>
  <Header client:load />
  <main class="py-16">
    <Container>
      <TitleSection
        client:load
        title="About"
        subtitle="Software leader, educator, advisor"
        center
      />
      <div class="mt-12 prose prose-lg max-w-prose mx-auto">
        <p>Bio and current roles will be added here as part of Story 6.</p>
        <!-- Placeholder sections:
          - Current focus/work
          - Boards and advisory roles
          - Location (Seattle/Park City)
          - CV link
        -->
      </div>
    </Container>
  </main>
  <Footer client:load />
</BaseLayout>
```

### Step 8: Add Header/Footer to Existing Blog Pages

**File:** `src/pages/blog/[slug].astro` (if needed)
**Action:** Verify Header/Footer are present, add if missing

**Requirements:**

- Check if individual blog post pages have Header/Footer
- Add if missing to maintain consistency
- Use same pattern as other pages

### Step 9: Testing & Validation

**Actions:**

1. Start dev server: `npm run dev`
2. Manually test all six navigation links from Header (desktop)
3. Test mobile menu functionality and all six links
4. Verify redirect from `/blog/` to `/writing/` works (301)
5. Verify individual blog posts at `/blog/[slug]/` still work
6. Check RSS feed generates without errors
7. Check for 404s or broken links
8. Verify responsive design on mobile
9. Check console for errors/warnings

**Checklist:**

- [ ] Home (/) works and shows Header/Footer
- [ ] Teaching (/teaching/) loads with placeholder content
- [ ] Writing (/writing/) shows blog posts with Header/Footer
- [ ] Blog (/blog/) redirects to /writing/
- [ ] AutoSoft Today (/autosoft-today/) loads with placeholder
- [ ] Consulting (/consulting/) loads with placeholder
- [ ] About (/about/) loads with placeholder
- [ ] Individual blog posts (/blog/[slug]/) still work
- [ ] RSS feed (/rss.xml) generates successfully
- [ ] Mobile navigation menu works on all pages
- [ ] No console errors
- [ ] No 404 pages

## Story 1 Acceptance Criteria Verification

From `docs/02-stories.md`:

1. ✅ **Navigation renders the exact six links in all layouts (desktop and mobile if applicable)**
   - Verified by: Header component already implements this
   - Test: Check Header renders on all new pages

2. ✅ **Existing routes remain functional; new navigation points to the intended pages/collections**
   - Verified by: Blog posts remain at `/blog/[slug]/`, Writing uses `blog` collection
   - Test: Individual blog post URLs don't break

3. ✅ **No residual Gatsby-era nav items remain**
   - Verified by: Research found no Gatsby navigation code
   - Test: Search codebase for Gatsby references

## Design Tokens Reference

From `docs/04-style-guide.md`:

**Colors:**

- Background: `bg-gray-50` (#FAFAFA)
- Surface: `bg-white` (#FFFFFF)
- Primary text: `text-gray-900` (#0F172A)
- Secondary text: `text-gray-600` (#475569)
- Accent: `bg-indigo-600` (#4F46E5)

**Typography:**

- Body/Headings: Inter
- Code: JetBrains Mono
- Comfortable reading width: `max-w-prose` (~700px)

**Spacing:**

- Use Tailwind spacing scale
- Mobile-first responsive design

## Further Considerations

### 1. Layout Consolidation

**Question:** Should we create a `PageLayout.astro` wrapper that includes Header/Footer automatically?

**Pros:**

- DRY - avoid repeating Header/Footer imports on every page
- Easier to maintain consistent layout
- Single place to update Header/Footer integration

**Cons:**

- Adds abstraction layer
- Less explicit about what's rendered
- Might complicate pages that need different layouts

**Recommendation:** Consider for Phase 2 after Story 1 is complete. Current explicit approach is clearer for initial implementation.

### 2. Blog Collection Naming

**Question:** Keep collection named `blog` with `/writing/` routes, or rename to `writing` collection?

**Current State:**

- Collection: `blog` (in `src/content/config.ts`)
- Folder: `src/content/blog/`
- Routes: `/blog/[slug]/` for posts, `/writing/` for index

**Option A: Keep `blog` collection (Recommended)**

- Pros: No breaking changes, fewer files to update
- Cons: Slight name mismatch with route
- Implementation: No changes needed

**Option B: Rename to `writing` collection**

- Pros: Name matches route and IA
- Cons: Must update all `getCollection('blog')` calls
- Impact: Multiple component files, RSS feed, etc.

**Recommendation:** Keep `blog` collection name for now. The internal name doesn't need to match the public route.

### 3. Content Depth for Placeholder Pages

**Question:** How much content should be added now vs. later iterations?

**Current Plan:**

- Story 1: Basic structure with placeholders and navigation
- Story 2-6: Fill in real content per story

**Recommendation:** Minimal placeholders now (as shown in steps 4-7). This allows:

- Story 1 to be completed and tested independently
- Each subsequent story to focus on its specific content
- Easier review of incremental changes

### 4. Header/Footer in BaseLayout

**Question:** Should we integrate Header/Footer into `BaseLayout.astro` for consistency?

**Current State:**

- Homepage explicitly includes Header/Footer
- Blog pages don't include Header/Footer
- New pages will explicitly include Header/Footer

**Option A: Explicit per-page (Current plan)**

- Each page imports and renders Header/Footer
- Pros: Explicit, flexible, easy to understand
- Cons: Repetitive code

**Option B: Integrated in BaseLayout**

- Modify `BaseLayout.astro` to always include Header/Footer
- Pros: DRY, consistent, easier to maintain
- Cons: Less flexible for pages that don't want Header/Footer

**Recommendation:** Start with explicit inclusion (Option A) for Story 1. Consider consolidation in future refactoring after all pages are working.

## Implementation Order

**Priority 1 (Story 1 Completion):**

1. Create `/writing/` index page
2. Redirect `/blog/` to `/writing/`
3. Update RSS feed URLs
4. Create placeholder pages (teaching, autosoft-today, consulting, about)
5. Test all navigation links
6. Verify acceptance criteria

**Priority 2 (Future Stories):** 7. Create teaching content (Story 2) 8. Add consulting content (Story 5) 9. Write about page content (Story 6) 10. Add AutoSoft Today content (Story 4) 11. Content audit and tagging (Story 7)

**Priority 3 (Enhancements):** 12. Consider PageLayout abstraction 13. Add site navigation to Footer 14. Evaluate blog collection rename 15. Add more comprehensive tests

## Files Referenced

**Key Implementation Files:**

- `src/components/Header.tsx` - Navigation component (already complete)
- `src/pages/index.astro` - Homepage pattern reference
- `src/pages/blog/index.astro` - Blog index pattern reference
- `src/layouts/BaseLayout.astro` - Base layout wrapper
- `src/content/config.ts` - Content collections schema
- `src/pages/rss.xml.ts` - RSS feed generator

**Documentation:**

- `docs/01-epic.md` - Migration strategy and constraints
- `docs/02-stories.md` - User stories and acceptance criteria
- `docs/04-style-guide.md` - IA, design tokens, tone guidelines
- `docs/story-01-progress.md` - Story 1 progress tracking

## Success Metrics

**Story 1 Complete When:**

- [x] All six Header navigation links work (no 404s)
- [x] Header renders consistently on all pages (desktop and mobile)
- [x] Blog redirects to Writing with 301
- [x] Individual blog posts still accessible
- [x] RSS feed generates without errors
- [x] No console errors or warnings
- [x] Mobile navigation tested and working
- [x] Acceptance criteria from Story 1 verified
- [x] Code follows existing patterns (no technical debt)
- [x] Build succeeds (`npm run build`)
- [x] Preview works (`npm run preview`)

**Status: ✅ COMPLETE** (January 6, 2026)

All acceptance criteria met:
1. ✅ Navigation renders the exact six links in all layouts (desktop and mobile)
2. ✅ Existing routes remain functional; new navigation points to intended pages/collections
3. ✅ No residual Gatsby-era nav items remain

**Next Steps After Story 1:**

- Update `docs/story-01-progress.md` with completion status ✅ (DONE)
- Move to Story 2: Create Teaching Section
- Begin content collection for teaching courses
- Fill in placeholder content for new pages
