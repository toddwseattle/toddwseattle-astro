# Agent Instructions for Todd Warren’s Astro Portfolio

## Quick Reference Documents

**For GitHub Copilot users:**

- **Component patterns & Astro guidelines:** `.github/copilot-instructions.md`
- **Testing patterns & examples:** `.github/copilot-test-instructions.md`

**This document (AGENTS.md):**

- Comprehensive project overview
- Strategic development guidelines
- Workflow and processes
- Quality standards

## Project Overview

This is a personal portfolio website built with Astro, migrated from Gatsby. The site showcases professional experience, teaching materials, blog posts, and consulting services. This is a **writing-first, content-focused** site with a calm, professional aesthetic.

**Key Context:**

- Migration from Gatsby to Astro (see `/docs` for epic, stories, and work items)
- Information architecture refresh focusing on teaching, writing, AutoSoft Today, and consulting
- Original Gatsby version: https://github.com/toddwseattle/toddwseattle-gb
- Live site: https://toddwseattle.com

## Tech Stack

- **Astro**: Static site generator (primary framework)
- **React**: Interactive UI components
- **TypeScript**: Type safety throughout
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Vitest**: Unit testing framework
- **Testing Library**: React component testing (@testing-library/react, @testing-library/jest-dom)
- **Framer Motion**: Animation library
- **FontAwesome**: Icon library
- **Prettier**: Code formatting

## Astro Development Standards

**For detailed Astro patterns, component examples, and code snippets, see `.github/copilot-instructions.md`**

### Quick Reference

**Core Principles:**

- **Astro-First**: Prefer `.astro` over React unless interactivity is required
- **Zero-JS Default**: Ship no JavaScript unless necessary
- **Islands Architecture**: Use `client:*` directives properly (load, idle, visible, media, only)
- **Build vs Runtime**: No browser APIs in frontmatter (build-time code)

**Key Technologies:**

- **Styling**: Tailwind CSS exclusively (no CSS modules or inline styles)
- **Images**: Always use `<Image />` from `astro:assets` for optimization
- **Data Fetching**: Top-level `await` in frontmatter for build-time data
- **Content**: Use Content Collections with Zod schemas via `getCollection`/`getEntry`
- **Types**: TypeScript with type-only imports (`import type { ... }`)

**Critical Requirements:**

- Layouts must include `<slot />` for child content
- Dynamic routes must implement `getStaticPaths()` in SSG mode
- Ask about interactivity before implementing Islands

**Decision Framework:**

1. Can it be done with HTML/CSS? → Use `.astro`
1. Needs simple interactivity? → Use `.astro` with `<script>` tag
1. Needs complex state/interactivity? → Use React with `client:*` directive

**→ See `.github/copilot-instructions.md` for complete Astro patterns, component templates, and code examples**

## Project Structure

```
/
├── astro.config.mjs           # Astro configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest test configuration
├── docs/                      # Strategic documentation (epic, stories, style guide)
├── prompts/                   # Technical migration docs and planning
├── public/                    # Static assets (images, etc.)
├── src/
│   ├── assets/                # Images and global styles
│   ├── components/            # Astro and React components
│   ├── content/               # Content collections (blog, activities, etc.)
│   ├── data/                  # Data sources for content collections
│   ├── layouts/               # Astro layout components
│   ├── lib/                   # Utility libraries
│   ├── pages/                 # Astro pages (routes)
│   └── test/                  # Test setup and utilities
└── test/                      # Additional test files
```

## Design System & Tokens

**Typography:**

- Body/Headings: Inter
- Code: JetBrains Mono
- Prose width: ~700px for comfortable reading

**Colors:**

- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Primary text: `#0F172A`
- Secondary text: `#475569`
- Accent: `#4F46E5`

**Design Principles:**

- Writing-first, calm aesthetic
- Clean, readable content over visual gimmicks
- Avoid over-formatting (minimize excessive headers, lists, bolding)
- Mobile-first, responsive design

## Information Architecture

**Six-Item Navigation:**

1. Home – Landing page
1. Teaching – Corporate Innovation and Software Engineering courses
1. Writing – Primary content stream (replaces “blog”)
1. AutoSoft Today – Overview with links to autosofttoday.com
1. Consulting – Advisory services overview
1. About – Current bio, roles, and location

**Content Organization:**

- Uses collections rather than deep folder nesting
- Tag-based discovery instead of categories
- Tags: innovation & org design, software engineering, teaching reflections, cycling, guitar & music
- **Preserve existing slugs and URLs** (no route breakage)
- Avoid year-based routing

## Development Workflow

### Available Commands

```bash
npm install           # Install dependencies
npm run dev           # Start dev server (http://localhost:4321)
npm run build         # Build for production
npm run preview       # Preview production build
npm run format        # Format code with Prettier
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:run      # Run tests (CI-friendly)
```

### Component Development

**For component templates, code examples, and Islands Architecture patterns, see `.github/copilot-instructions.md`**

**Astro Components:**

- Use `.astro` extension
- Server-side rendered by default
- Minimize client-side JavaScript
- Use `client:*` directives only when interactivity is needed

**React Components:**

- Use `.tsx` extension
- For interactive UI elements
- Located in `src/components/`
- Colocate tests as `ComponentName.test.tsx`

**Decision Framework: Astro vs React**

Use `.astro` when:

- Content is static (no user interaction needed)
- Component is layout/structural
- SEO is critical
- Zero JavaScript is preferred
- Can be done with HTML/CSS

Use React when:

- Component needs client-side state
- Requires user interaction (forms, toggles, modals)
- Needs React hooks or lifecycle methods
- Complex state management required
- Real-time updates needed

**Ask before implementing:**

1. Can this be done with static HTML/CSS? → Use `.astro`
1. Needs simple interactivity? → Use `.astro` with `<script>` tag
1. Needs complex state/interactivity? → Use React with `client:*` directive

**Component Patterns:**

- Keep components small and focused
- Use TypeScript interfaces for props
- Prefer composition over inheritance
- Use Tailwind classes for styling (no CSS-in-JS)
- Colocate tests with React components

**→ See `.github/copilot-instructions.md` for full component templates and styling patterns**

## Testing Guidelines

**For detailed testing patterns, examples, and rules, see `.github/copilot-test-instructions.md`**

### Testing Philosophy

All React components must be tested using Vitest and Testing Library. Follow the **incremental testing approach** documented in:

- Blog post: https://toddwseattle.com/blog/2025-27-05-Vitetest-with-CoPilot/
- Detailed instructions: `.github/copilot-test-instructions.md`

### Core Testing Principles

**Always:**

- Use Vitest (never Jest)
- Build tests incrementally (one at a time)
- Use `vi.mock()` for mocking child components
- Test behavior, not implementation
- Add `data-testid` attributes to components

**Never:**

- Generate all tests at once
- Use Jest functions (`jest.fn()`, `jest.mock()`)
- Test implementation details
- Assume attributes exist without checking

### Test File Location

- Colocate tests with components: `ComponentName.test.tsx`
- Run tests: `npm run test` or `npm run test:watch`
- Check coverage with Vitest extension in VSCode

### Incremental Testing Strategy

1. List test cases using Kent Beck’s “canon TDD” approach
1. Start with basic render test
1. Add one test at a time
1. Fix errors before proceeding
1. Build up to complex scenarios

**→ See `.github/copilot-test-instructions.md` for complete testing guidelines, patterns, mock examples, and full test file examples**

## Content Management

### Content Collections

Content is managed in Markdown files under `src/content/`:

- **Writing**: Blog posts and articles (tag-based organization)
- **Teaching**: Course materials
- **Pages**: Static content (About, Consulting, etc.)

**Frontmatter Requirements:**

```yaml
—
title: “Post Title”
date: 2025-01-15
description: “Brief description”
tags: [“tag1”, “tag2”]
slug: “url-friendly-slug”
—
```

**Constraints:**

- Preserve existing slugs (no URL breakage)
- Keep markdown/MDX files intact
- Use tags for discoverability, not deep folder structure

### Data Sources

Located in `src/data/` and referenced in content collections. Use TypeScript for type safety.

## Migration Documentation

**Strategic Planning** (`/docs`):

- `01-epic.md` – Migration strategy, objectives, constraints
- `02-stories.md` – User stories for features
- `03-workitems.md` – Implementation tasks
- `04-style-guide.md` – IA guardrails, tone principles, layout conventions

**Technical Details** (`/prompts`):

- Migration steps and audit summaries
- Component migration plans
- Session notes and progress tracking

**Key Principles:**

- Start with documentation in `/docs` to understand context
- Maintain writing-first aesthetic
- Keep diffs focused and composable
- Preserve existing routes and slugs

## Working with AI Coding Assistants

### Quick Start

**GitHub Copilot users:**

- Use `.github/copilot-instructions.md` for component patterns and Astro guidelines
- Use `.github/copilot-test-instructions.md` for testing patterns

**All AI assistants:**

- Start with `/docs/04-style-guide.md` for IA and content guidelines
- Reference existing patterns in `src/components/`
- Check existing routes before creating new pages

### Best Practices

1. **Documentation First**: Check `/docs/04-style-guide.md` for IA, tone, and layout
1. **Testing**: Use incremental approach (see `.github/copilot-test-instructions.md`)
1. **Components**: Follow patterns in `.github/copilot-instructions.md`
1. **Astro-First**: Prefer `.astro` over React unless interactivity required
1. **Styling**: Use Tailwind design tokens exclusively

### Example Prompts

**For Astro Component Development:**

```
Create an Astro component for [feature] following these requirements:
- Use .astro file (not React) unless interactivity is required
- Ship zero JavaScript if possible
- Use TypeScript for props interface
- Style with Tailwind classes using design tokens
- If data fetching needed, use top-level await in frontmatter
- Reference similar components in src/components/
```

**For Interactive Component:**

```
Create a React component for [interactive feature]:
- Use client:load (or appropriate directive)
- Add TypeScript interfaces for props
- Include data-testid attributes for testing
- Style with Tailwind design tokens
- Create colocated test file
- Explain why React is needed vs .astro with <script>
```

**For Content Collections:**

```
Set up a new content collection for [type]:
- Define Zod schema in src/content/config.ts
- Use proper TypeScript types
- Add example markdown files
- Show how to query with getCollection
- Ensure frontmatter matches schema
```

**For Testing:**

```
Help me write tests for #file:ComponentName.tsx following the incremental approach:
1. First, create a basic render test
2. Then test [specific behavior]
3. Use vi.mock for child components
4. Follow the patterns in .github/copilot-test-instructions.md
```

**For Page Development:**

```
Create a new page for [purpose]:
- Use .astro file in src/pages/
- Fetch data in frontmatter if needed
- Use appropriate layout from src/layouts/
- Ensure mobile responsive with Tailwind
- Follow IA structure from /docs/04-style-guide.md
- Verify route doesn’t conflict with existing routes
```

**For Content:**

```
Create a new blog post about [topic] in src/content/writing/:
- Use proper frontmatter with title, date, description, tags, slug
- Write in a clear, professional tone
- Keep paragraphs focused and readable
- Use code blocks with syntax highlighting where appropriate
```

## Common Tasks

### Adding a New React Component

1. Create `ComponentName.tsx` in appropriate folder under `src/components/`
1. Define TypeScript interface for props
1. Implement component with Tailwind styling
1. Add `data-testid` attributes for testing
1. Create `ComponentName.test.tsx` with incremental tests
1. Export from index file if needed

### Adding a New Page

1. Create `.astro` file in `src/pages/`
1. Use appropriate layout from `src/layouts/`
1. Follow IA structure (check `/docs/04-style-guide.md`)
1. Ensure route doesn’t conflict with existing routes
1. Add to navigation if needed

### Adding a Blog Post

1. Create markdown file in `src/content/writing/`
1. Add proper frontmatter (title, date, description, tags, slug)
1. Use existing slugs as reference (check for conflicts)
1. Tag appropriately for discoverability
1. Preview with `npm run dev`

### Debugging Tests

1. Run `npm run test:watch` for interactive mode
1. Check for common pitfalls (Jest vs Vitest, mock issues)
1. Verify component has expected attributes
1. Use Vitest extension in VSCode for coverage
1. Ask AI assistant to explain failures

## Important Constraints

1. **No URL Breaking**: Preserve all existing slugs and routes
1. **No Year-Based Routing**: Avoid date-based URL structures
1. **Writing-First**: Content over visual complexity
1. **Component Colocate Tests**: Keep tests next to components
1. **Format Before Commit**: Run `npm run format`
1. **Type Safety**: Use TypeScript properly, no `any` types

## Quality Checklist

Before submitting code:

- [ ] Tests pass (`npm run test`)
- [ ] Code is formatted (`npm run format`)
- [ ] TypeScript compiles without errors
- [ ] No broken links or routes
- [ ] Responsive on mobile
- [ ] Follows design tokens
- [ ] Component has tests (if React)
- [ ] Documentation updated if needed

## Links and References

### Project Documentation

- Epic: `/docs/01-epic.md`
- User Stories: `/docs/02-stories.md`
- Work Items: `/docs/03-workitems.md`
- Style Guide: `/docs/04-style-guide.md`
- Technical Prompts: `/prompts/`

### External Resources

- [Astro Documentation](https://docs.astro.build/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Blog Posts

- [Using Vitest with GitHub Copilot for React Components](https://toddwseattle.com/blog/2025-27-05-Vitetest-with-CoPilot/)

## Contributing

For new contributors or AI coding assistants:

1. Read `/docs/04-style-guide.md` first
1. Review migration documentation in `/docs/`
1. Check `/prompts/` for technical details
1. Follow testing guidelines from blog post
1. Maintain consistency with existing patterns
1. Keep commits focused and well-described

——

**Last Updated**: December 2024
**Maintainer**: Todd Warren (@toddwseattle)
**Repository**: https://github.com/toddwseattle/toddwseattle-astro

## Quick Reference for AI Coding Assistants

### When Writing Tests

1. Always use Vitest (never Jest)
1. Start with one basic test
1. Build incrementally
1. Use `vi.mock()` for child components
1. Add `data-testid` to components

### When Creating Components

1. Use TypeScript interfaces
1. Add `data-testid` attributes
1. Style with Tailwind classes
1. Create colocated test file
1. Follow existing patterns in `src/components/`

### When Adding Content

1. Check existing slugs (no conflicts)
1. Use proper frontmatter
1. Tag appropriately
1. Preview locally
1. No year-based routing