# GitHub Copilot Instructions for Todd Warren’s Astro Portfolio

## Project Context

This is an Astro personal website with React components, TypeScript, Tailwind CSS, and Vitest testing. Follow writing-first, content-focused design principles.

## Core Technologies

- **Astro** (.astro files) for pages and layouts
- **React + TypeScript** (.tsx files) for interactive components
- **Tailwind CSS** for styling (use design tokens)
- **Vitest + Testing Library** for React component tests
- **Prettier** for code formatting

## Astro-Specific Standards

### Astro-First Architecture

**Default to .astro components:**

- Use `.astro` files unless client-side interactivity is required
- Ship zero JavaScript to browser by default
- Only use React/framework components when necessary

**When to use React vs Astro:**

```astro
<!— ✅ GOOD - Static content in .astro —>
—
const posts = await getCollection(‘blog’)
—
<ul>
  {posts.map(post => <li>{post.data.title}</li>)}
</ul>

<!— ❌ AVOID - React for static content —>
<PostList client:load posts={posts} />
```

### Islands Architecture

**Always specify client:* directives for React components:**

```astro
<!— Interactive immediately —>
<Counter client:load />

<!— Load when visible —>
<Gallery client:visible />

<!— Load when idle —>
<Analytics client:idle />

<!— Client-only rendering —>
<BrowserOnlyComponent client:only=“react” />
```

**Ask before implementing:**

- “Does this need to be an Island or is HTML/JS sufficient?”
- Prefer simpler solutions when possible

### Data Fetching

**In Astro frontmatter (build-time):**

```astro
—
// ✅ CORRECT - top-level await
const response = await fetch(‘https://api.example.com/data’)
const data = await response.json()
—

<div>{data.title}</div>
```

**In client-side script:**

```astro
<script>
  // ✅ CORRECT - runs in browser
  fetch(‘/api/data’)
    .then(res => res.json())
    .then(data => console.log(data))
</script>
```

### Images

**Always use Image component:**

```astro
—
import { Image } from ‘astro:assets’
import hero from ‘../assets/hero.jpg’
—

<!— ✅ GOOD - Optimized —>
<Image src={hero} alt=“Hero” />

<!— ❌ BAD - Not optimized —>
<img src=“/hero.jpg” alt=“Hero” />
```

### Content Collections

**Use typed collections:**

```typescript
// src/content/config.ts
import { z, defineCollection } from ‘astro:content’

const blog = defineCollection({
  type: ‘content’,
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string())
  })
})

export const collections = { blog }
```

**Fetch content:**

```astro
—
import { getCollection, getEntry } from ‘astro:content’

const posts = await getCollection(‘blog’)
const post = await getEntry(‘blog’, ‘post-slug’)
—
```

### Critical Constraints

**Build-time vs Runtime:**

```astro
—
// ❌ WRONG - browser APIs not available
const width = window.innerWidth

// ✅ CORRECT - build-time only
const buildDate = new Date()
—

<script>
  // ✅ CORRECT - runs in browser
  const width = window.innerWidth
</script>
```

**Layouts need <slot />:**

```astro
—
// Layout.astro
—
<html>
  <body>
    <slot /> <!— Required for child content —>
  </body>
</html>
```

**Dynamic routes need getStaticPaths:**

```astro
—
// [slug].astro
export async function getStaticPaths() {
  return [
    { params: { slug: ‘post-1’ } },
    { params: { slug: ‘post-2’ } }
  ]
}
—
```

## Testing Requirements

**For detailed testing instructions, see `.github/copilot-test-instructions.md`**

### Key Testing Rules (Quick Reference)

- Always use **Vitest**, never Jest
- Use `vi.mock()` not `jest.mock()`
- Use `vi.fn()` not `jest.fn()`
- Build tests **incrementally** (one at a time)
- Mock child components with `vi.mock()`
- Add `data-testid` to components for testing

### Test File Header

```typescript
// Copilot test instructions: Using vitest, mock subcomponents with vi.mock, and group tests in describe blocks

import { describe, it, expect, vi } from ‘vitest’
import { render, screen } from ‘@testing-library/react’
import ‘@testing-library/jest-dom’
```

**→ See `.github/copilot-test-instructions.md` for complete testing guidelines, patterns, and examples**

## Component Development

### React Components

```typescript
// ComponentName.tsx
interface ComponentNameProps {
  title: string
  onAction?: () => void
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  title, 
  onAction 
}) => {
  return (
    <div data-testid=“component-name” className=“bg-white p-4”>
      <h2 className=“text-xl font-semibold text-gray-900”>{title}</h2>
      {onAction && (
        <button
          onClick={onAction}
          className=“mt-2 px-4 py-2 bg-indigo-600 text-white rounded”
        >
          Action
        </button>
      )}
    </div>
  )
}
```

**Requirements:**

- TypeScript interfaces for props
- `data-testid` attributes for testing
- Tailwind classes for styling
- Colocated test file (`.test.tsx`)

### Astro Components

```astro
—
// ComponentName.astro
interface Props {
  title: string
  description?: string
}

const { title, description } = Astro.props
—

<div class=“bg-white p-4”>
  <h2 class=“text-xl font-semibold text-gray-900”>{title}</h2>
  {description && <p class=“text-gray-600 mt-2”>{description}</p>}
</div>
```

**Use Astro for:**

- Static content (default choice)
- Layout components
- Server-side rendering
- Content-heavy pages
- SEO-optimized pages
- Anything that doesn’t need client-side interactivity

**Use React for:**

- Interactive UI elements (forms, toggles, modals)
- Components with state management
- Client-side interactivity (dropdowns, tabs, accordions)
- Real-time updates
- Complex user interactions

**Decision Framework:**

1. Can it be done with HTML/CSS? → Use `.astro`
1. Needs simple interactivity? → Use `.astro` with `<script>` tag
1. Needs complex state/interactivity? → Use React with `client:*` directive

**Ask yourself:**

- Does this component need to update based on user input?
- Does it need to maintain state in the browser?
- Does it need React hooks or lifecycle methods?
- If no to all → Use `.astro`, not React

## Styling Guidelines

### Tailwind Design Tokens

**Colors:**

- Background: `bg-gray-50` (#FAFAFA)
- Surface: `bg-white` (#FFFFFF)
- Text Primary: `text-gray-900` (#0F172A)
- Text Secondary: `text-gray-600` (#475569)
- Accent: `bg-indigo-600` (#4F46E5)

**Typography:**

- Body: `font-sans` (Inter)
- Code: `font-mono` (JetBrains Mono)
- Prose width: `max-w-prose` (~700px)

**Spacing:**

- Use Tailwind spacing scale (4, 6, 8, 12, 16, etc.)
- Mobile-first responsive design

### Style Patterns

```typescript
// ✅ Good - Use Tailwind classes
<div className=“bg-white p-6 rounded-lg shadow-md”>

// ❌ Bad - Avoid inline styles
<div style={{ backgroundColor: ‘#fff’, padding: ‘24px’ }}>

// ✅ Good - Responsive
<div className=“grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6”>

// ❌ Bad - Fixed
<div className=“grid grid-cols-3 gap-6”>
```

## Content & Routes

### File Locations

- Pages: `src/pages/*.astro`
- Components: `src/components/**/*.tsx` or `*.astro`
- Content: `src/content/writing/*.md`
- Layouts: `src/layouts/*.astro`

### URL Structure

**IMPORTANT:** Preserve existing slugs and routes. No year-based routing.

```
✅ /blog/post-title/
✅ /writing/post-title/
❌ /blog/2024/01/post-title/  (No year-based)
```

### Blog Post Frontmatter

```yaml
—
title: “Post Title”
date: 2025-01-15
description: “Brief description for SEO”
tags: [“software-engineering”, “teaching”]
slug: “url-friendly-slug”
—
```

**Available Tags:**

- innovation & org design
- software engineering
- teaching reflections
- cycling
- guitar & music

## Code Quality

### Before Committing

```bash
npm run format    # Format with Prettier
npm run test      # Run all tests
npm run build     # Verify production build
```

**Checklist:**

- [ ] Tests pass
- [ ] Code formatted
- [ ] TypeScript compiles
- [ ] No broken routes
- [ ] Mobile responsive

### TypeScript

```typescript
// ✅ Good - Proper typing
interface User {
  name: string
  email: string
}

const user: User = { name: ‘Todd’, email: ‘todd@example.com’ }

// ❌ Bad - Avoid any
const data: any = fetchData()
```

## Common Patterns

### Loading States

```typescript
export const DataComponent: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    fetchData().then(result => {
      setData(result)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>
  if (!data) return <div>No data</div>

  return <div>{/* render data */}</div>
}
```

### Form Handling

```typescript
const [formData, setFormData] = useState({ name: ‘’, email: ‘’ })

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Handle form submission
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}
```

## Documentation References

- Testing Guide: https://toddwseattle.com/blog/2025-27-05-Vitetest-with-CoPilot/
- Style Guide: `/docs/04-style-guide.md`
- Project Epic: `/docs/01-epic.md`
- Astro Docs: https://docs.astro.build/
- Vitest Docs: https://vitest.dev/
- Testing Library: https://testing-library.com/

## Key Reminders

1. **Astro-First** - Prefer .astro over React unless interactivity required
1. **Zero-JS Default** - Ship no JavaScript unless necessary
1. **Islands Architecture** - Always use client:* directives for framework components
1. **Vitest, not Jest** - Always use `vi` not `jest`
1. **Incremental tests** - Build one test at a time
1. **Tailwind only** - Use design tokens, no inline styles or CSS modules
1. **Image component** - Use `<Image />` from astro:assets for optimization
1. **Build vs Runtime** - No browser APIs in frontmatter (build-time code)
1. **Preserve routes** - Never break existing URLs
1. **Type safety** - Use TypeScript properly, type-only imports
1. **Content Collections** - Use getCollection with Zod schemas
1. **Mobile-first** - Always responsive

——

**For detailed instructions, see `/AGENTS.md`**