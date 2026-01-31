# Spec: Reading Time Calculation

## Job to Be Done

When visitors browse blog posts, they want to know how long it will take to read so they can decide if they have time right now.

## Success Criteria

- Display "X min read" on all blog post cards
- Display on individual post pages
- Calculation accurate to ±1 minute
- Works for all existing posts
- Responsive styling matches design system

## Constraints

- Use existing Tailwind design tokens from docs/04-style-guide.md
- No new dependencies if possible (use built-in JavaScript)
- Must pass TypeScript compilation
- Must have unit tests with 80%+ coverage

## Implementation Notes

### Calculation Algorithm

```typescript
// Pseudocode
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average adult reading speed
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}
```

**Details:**

- Average reading speed: 200 words per minute
- Count words in post content only (exclude frontmatter)
- Round UP to nearest minute (ceiling)
- Show "1 min read" for very short posts (don't show "< 1 min")
- Exclude code blocks from word count (optional enhancement)

### Where to Display

1. **Blog post list cards** (`src/components/BlogCard.astro`)
   - Place after post date, before description
   - Use existing text styling: `text-gray-500 text-sm`

2. **Individual post pages** (`src/layouts/BlogPost.astro`)
   - Display in post metadata section
   - Near publish date and author info

### Styling Guidelines

From docs/04-style-guide.md:

- Text color: `text-gray-500` (secondary text)
- Font size: `text-sm`
- Icon (optional): Clock icon from FontAwesome library

**Example layout:**

```
Published Jan 30, 2026 · 5 min read
```

### Files to Create/Modify

1. **Create:** `src/utils/readingTime.ts`
   - Export `calculateReadingTime(content: string): number`
   - Pure function, easy to test

2. **Create:** `src/utils/readingTime.test.ts`
   - Test word counting
   - Test minute calculation
   - Test edge cases (empty content, very long posts)

3. **Modify:** `src/components/BlogCard.astro`
   - Import and use calculateReadingTime
   - Display reading time in metadata section

4. **Modify:** `src/layouts/BlogPost.astro`
   - Import and use calculateReadingTime
   - Display reading time near other metadata

### Testing Requirements

Unit tests must cover:

- Empty string returns 1 minute
- 200 words returns 1 minute
- 201 words returns 2 minutes
- 1000 words returns 5 minutes
- Multiple spaces handled correctly
- Newlines and tabs counted as word separators

Integration verification:

- Check at least 3 existing blog posts manually
- Verify reading time appears on list page
- Verify reading time appears on detail page
- Test responsive layout on mobile

## Acceptance Criteria

- [ ] `src/utils/readingTime.ts` created with function
- [ ] `src/utils/readingTime.test.ts` created with tests
- [ ] All unit tests pass (100% coverage of readingTime.ts)
- [ ] Reading time appears on all blog post cards
- [ ] Reading time appears on post detail pages
- [ ] Calculation is accurate (verified on 3+ posts)
- [ ] Styling matches design system (gray-500, text-sm)
- [ ] TypeScript compiles with no errors
- [ ] Build succeeds: `npm run build`
- [ ] No console errors or warnings
- [ ] Responsive on mobile and desktop

## Reference Files

- `src/content/blog/` - Existing blog posts for testing
- `docs/04-style-guide.md` - Design tokens and styling conventions
- `src/components/BlogCard.astro` - Post card component
- `src/layouts/BlogPost.astro` - Post detail layout
- `README.md` - Project structure

## Example Output

After implementation, blog cards should show:

```
How I Built This Site
Jan 30, 2026 · 5 min read
A deep dive into migrating from Gatsby to Astro...
```

## Potential Enhancements (Future Specs)

- Exclude code blocks from word count
- Account for images (add ~12 seconds per image)
- Display range for very long posts: "10-12 min read"
- Make WPM configurable per content type

## Success Verification

Run this checklist before marking complete:

```bash
# 1. Tests pass
npm run test:run

# 2. TypeScript clean
npx tsc --noEmit

# 3. Build succeeds
npm run build

# 4. Manual verification
npm run dev
# Visit http://localhost:4321/blog
# Check reading time shows on cards
# Click into a post
# Verify reading time shows on detail page
# Test on mobile viewport

# 5. Code formatted
npm run format
```

All checks must pass. If any fail, fix before marking done.
