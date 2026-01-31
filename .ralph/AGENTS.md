# Agent Learnings
## Patterns and Gotchas for toddwseattle-astro

> This file is updated by Ralph and humans as patterns emerge.
> It serves as institutional knowledge for autonomous development.

---

## Patterns That Work

### Testing Astro Components

**Pattern:**
Astro components (`.astro` files) cannot be unit tested directly with Vitest.

**Solution:**
- Extract logic to TypeScript utilities (test these)
- Extract interactive parts to React components (test these)
- Use Playwright for integration tests if needed

**Example:**
```typescript
// ✅ Good: Testable
// src/utils/readingTime.ts
export function calculateReadingTime(content: string): number {
  // ... pure function
}

// ✅ Good: Can test
// src/components/BlogCard.test.tsx
import { render } from '@testing-library/react';

// ❌ Bad: Cannot easily test
// BlogCard.astro with complex logic inline
```

### Content Collection Updates

**Pattern:**
When changing content collection schemas, multiple steps are required.

**Procedure:**
1. Update schema in `src/content/config.ts`
2. Restart development server (`npm run dev`)
3. Run build to validate: `npm run build`
4. Check type generation in `.astro/types.d.ts`
5. Update any content files that don't match new schema

**Common Gotcha:**
Old dev server won't pick up schema changes. Always restart.

### Tailwind Custom Spacing

**Pattern:**
We avoid custom CSS classes. Use Tailwind utilities.

**When spacing doesn't exist in Tailwind:**
```tsx
// ✅ Use arbitrary values
<div className="p-[17px]">

// ✅ Or extend in tailwind.config.js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '17': '4.25rem',
      }
    }
  }
}

// ❌ Don't create custom CSS
// styles.css
.custom-padding { padding: 17px; }
```

### TypeScript Import Paths

**Pattern:**
Always use the `@/` alias for imports from `src/`.

**Examples:**
```typescript
// ✅ Good
import Layout from '@/layouts/BaseLayout.astro';
import { calculateReadingTime } from '@/utils/readingTime';

// ❌ Bad - relative paths
import Layout from '../../layouts/BaseLayout.astro';
```

---

## Common Gotchas

### Astro Islands & React

**Issue:**
React components in Astro need client directives.

**Solution:**
```astro
---
import InteractiveComponent from '@/components/Interactive.tsx';
---

<!-- ✅ Interactive -->
<InteractiveComponent client:load />

<!-- ❌ Static, JavaScript won't run -->
<InteractiveComponent />
```

**Directive Options:**
- `client:load` - Load immediately
- `client:idle` - Load when page idle
- `client:visible` - Load when visible
- `client:only="react"` - Only render on client

**Reference:** https://docs.astro.build/en/reference/directives-reference/#client-directives

### Build vs Dev Differences

**Issue:**
Some issues only appear in production build, not dev server.

**Solution:**
Always test with `npm run build` before marking task complete.

**Examples of build-only issues:**
- Content collection schema validation
- Image optimization errors
- Missing dependencies
- Route conflicts

### TypeScript Strict Mode

**Issue:**
TypeScript strict mode catches issues that might be missed otherwise.

**Pattern:**
When fixing TypeScript errors, fix from bottom-up (most specific first).

```bash
# See all errors
npx tsc --noEmit

# Watch mode for iterative fixing
npx tsc --noEmit --watch
```

**Common fixes:**
- Add explicit return types to functions
- Handle `null` and `undefined` cases
- Don't use `any` - use `unknown` if type truly unknown

---

## Testing Best Practices

### React Component Tests

**Pattern:**
Test user behavior, not implementation details.

```typescript
// ✅ Good: Test what user sees/does
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('clicking button increments counter', async () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  await userEvent.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

// ❌ Bad: Testing implementation
test('onClick calls setState', () => {
  const wrapper = shallow(<Counter />);
  wrapper.find('button').simulate('click');
  expect(wrapper.state('count')).toBe(1);
});
```

### Coverage Target

**Guideline:**
Aim for 80%+ coverage on new code.

**Focus on:**
- Happy path (main use case)
- Error cases
- Edge cases (empty input, very large input, etc.)

**Don't obsess over:**
- 100% coverage on trivial code
- Unreachable error handlers
- Third-party library code

---

## Content & Styling

### Prose Width

**Pattern:**
All long-form content should have max-width ~700px.

**Implementation:**
```tsx
// ✅ Good
<article className="prose prose-lg max-w-[700px] mx-auto">
  {children}
</article>

// ❌ Bad: Too wide
<article className="w-full">
  {children}
</article>
```

### Design Token Reference

From `docs/04-style-guide.md`:

```typescript
// Typography
body: 'Inter'
code: 'JetBrains Mono'

// Colors
bg: 'bg-gray-50 (#FAFAFA)'
surface: 'bg-white (#FFFFFF)'
text-primary: 'text-gray-900 (#0F172A)'
text-secondary: 'text-gray-500 (#475569)'
accent: 'text-indigo-600 (#4F46E5)'

// Spacing
content-width: 'max-w-[700px]'
```

### Writing First

**Principle:**
Favor readability over visual complexity.

**Examples:**
- Clean typography over decorative fonts
- Whitespace over density
- Subtle animations over flashy effects
- Fast load times over heavy assets

---

## Debugging Strategies

### When TypeScript Won't Compile

1. Run `npx tsc --noEmit` to see ALL errors
2. Fix errors from bottom of list upward
3. After each fix, run again to see progress
4. Don't assume one fix resolves multiple errors
5. Restart dev server if changes not picked up

### When Tests Fail

1. Read the full error message carefully
2. Check the failing test's expectations
3. Run only that test: `npm run test:watch -- --grep "test name"`
4. Add `console.log` in test to debug
5. Check if component props changed
6. Verify test setup and mocks are correct

### When Build Fails

1. Check the error message for the file/line
2. Common causes:
   - Content schema mismatch
   - Missing imports
   - Type errors
   - Image optimization failures
3. Try clearing build cache: `rm -rf dist .astro`
4. Rebuild: `npm run build`

---

## Performance Notes

### Image Optimization

**Pattern:**
Use Astro's Image component for optimized images.

```astro
---
import { Image } from 'astro:assets';
import myImage from '@/assets/image.jpg';
---

<Image src={myImage} alt="Description" />
```

**Benefits:**
- Automatic format conversion (WebP, AVIF)
- Responsive srcset generation
- Lazy loading by default

### Build Time

**Observation:**
Build time should be under 30 seconds for current site size.

**If build is slow:**
- Check for large unoptimized images
- Look for expensive computations during build
- Consider caching strategies

---

## Project-Specific Conventions

### Commit Messages

**Format:**
```
type(scope): message

feat(blog): add reading time calculation
fix(seo): correct canonical URL generation
docs(readme): update setup instructions
test(utils): add edge case tests for readingTime
```

**Types:** feat, fix, docs, style, refactor, test, chore

### File Naming

- Components: PascalCase (e.g., `BlogCard.astro`)
- Utils: camelCase (e.g., `readingTime.ts`)
- Tests: Match source file (e.g., `readingTime.test.ts`)
- Content: kebab-case (e.g., `my-blog-post.md`)

### Documentation

**When to update /docs:**
- New features that affect IA
- Changes to design system
- New content collections
- Major refactors

**Don't document:**
- Minor bug fixes
- Internal implementation details
- Temporary workarounds

---

## Blockers & Known Issues

### Current Blockers

_None currently - update this section when blockers arise_

### Future Enhancements

Ideas that came up during development but are out of scope:

- [ ] Dark mode support
- [ ] Full-text search
- [ ] RSS feed generation
- [ ] Newsletter subscription
- [ ] Comment system

---

## Ralph Tuning Notes

### Observations

_This section will be populated as Ralph runs and patterns emerge_

**Pattern:** Ralph tends to...
**Solution:** Added explicit instruction to PROMPT.md about...

---

## Resources

- **Astro Docs:** https://docs.astro.build/
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Vitest Docs:** https://vitest.dev/
- **Testing Library:** https://testing-library.com/
- **Project Docs:** `/docs/` directory

---

Last Updated: 2026-01-30
Update this file as new patterns and learnings emerge during development.
