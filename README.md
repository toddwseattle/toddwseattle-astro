# Todd Warren Portfolio Site

This is the personal portfolio website for Todd Warren, migrated from Gatsby to [Astro](https://astro.build/) with TypeScript, Tailwind CSS, and Framer Motion. The project showcases professional experience, projects, blog posts, and more, using modern web development best practices.

**Migration Note:**
This site is a strategic migration from Gatsby to Astro, recentering around a modern, writing-forward personal site. Key aspects:
- Not a 1:1 port, but an information architecture refresh
- Focuses on: teaching, writing, AutoSoft Today, consulting, and refreshed bio
- Original Gatsby-based portfolio: [toddwseattle/toddwseattle-gb](https://github.com/toddwseattle/toddwseattle-gb)

## 📚 Documentation

Comprehensive project documentation is available in the [`/docs`](./docs) folder:

- **[Epic: Astro Migration – IA Refresh](./docs/01-epic.md)** – Overall migration strategy, objectives, constraints, and success criteria
- **[User Stories](./docs/02-stories.md)** – Detailed stories for navigation, teaching section, writing consolidation, and more
- **[Work Items](./docs/03-workitems.md)** – Implementation tasks supporting each user story
- **[Style Guide](./docs/04-style-guide.md)** – IA guardrails, tone principles, layout/styling notes, and working practices

**For Contributors:** Start with the [Style Guide](./docs/04-style-guide.md) to understand the project's information architecture, content principles, and coding conventions.

## 🗂️ Project Structure

```
/
├── astro.config.mjs           # Astro configuration with React and Tailwind integrations
├── package.json               # Project metadata, scripts, and dependencies
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest test runner configuration
├── public/                    # Static assets (images, etc.)
├── src/
│   ├── assets/                # Images and global styles
│   ├── components/            # Astro and React components (UI, layouts, etc.)
│   ├── content/               # Content collections (MD files for blog, activities, etc.)
│   ├── data/                  # Data sources for content collections
│   ├── layouts/               # Astro layout components
│   ├── lib/                   # Utility libraries (e.g., FontAwesome setup)
│   ├── pages/                 # Astro pages (routes)
│   └── test/                  # Test setup and utilities
├── docs/                      # Strategic documentation (Epic, Stories, Work Items, Style Guide)
└── prompts/                   # Technical migration planning and execution details
```

## 📦 Major Packages & Integrations

- **Astro**: Static site generator and framework
- **React**: For interactive UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **FontAwesome**: Icon library
- **Vitest**: Unit testing framework
- **Testing Library**: For React component testing
- **Prettier**: Code formatting

## 🛠️ Development Practices & Patterns

- **Component-Driven**: UI is built from reusable Astro and React components in `src/components/`
- **Content Collections**: Content is organized in `src/content/` and `src/data/` using Markdown and TypeScript config
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: For rapid, consistent styling with custom design tokens
- **Testing**: All React components are tested with Vitest and Testing Library
- **Prettier**: Enforced code style via `npm run format`
- **Writing-First**: Focus on clean, readable content over visual gimmicks
- **Migration Documentation**: Strategic planning in [`/docs`](./docs), technical details in [`/prompts`](./prompts)

See [`docs/04-style-guide.md`](docs/04-style-guide.md) for complete design tokens (typography, colors, spacing).

## 🚀 Available Commands

All commands are run from the root of the project:

| Command              | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `npm install`        | Install all dependencies                                        |
| `npm run dev`        | Start local development server (default: http://localhost:4321) |
| `npm run build`      | Build the site for production in `./dist/`                      |
| `npm run preview`    | Preview the production build locally                            |
| `npm run astro`      | Run Astro CLI commands                                          |
| `npm run format`     | Format code with Prettier                                       |
| `npm run test`       | Run all unit tests with Vitest                                  |
| `npm run test:watch` | Run tests in watch mode                                         |
| `npm run test:run`   | Run tests (non-interactive, CI-friendly)                        |

## 📝 Migration & Planning

This project follows a structured migration approach documented in two key locations:

- **[`/docs`](./docs)** – Strategic documentation including the migration epic, user stories, work items, and style guide (see [Documentation](#-documentation) above)
- **[`/prompts`](./prompts)** – Technical migration steps, audit summaries, component migration plans, and session notes

**Key Documents:**
- [Epic: Astro Migration – IA Refresh](./docs/01-epic.md) – High-level migration strategy
- [Style Guide](./docs/04-style-guide.md) – IA, tone, layout, and working practices
- [`prompts/start-migration.md`](./prompts/start-migration.md) – Initial technical migration plan and progress
- [`prompts/components/`](./prompts/components/) – Component-specific migration documentation

All implementation work in `/prompts/` aligns with and references the strategic goals defined in `/docs/`.

## 🏗️ Information Architecture

The site follows a six-item navigation structure (defined in [`docs/01-epic.md`](docs/01-epic.md)):
- **Home** – Landing page
- **Teaching** – Corporate Innovation and Software Engineering courses
- **Writing** – Primary content stream (formerly blog) with tag-driven discovery
- **AutoSoft Today** – Overview with links to autosofttoday.com
- **Consulting** – Advisory services overview
- **About** – Current bio, roles, and location

Content is organized using collections rather than deep folder nesting, with tags for discoverability (innovation & org design, software engineering, teaching reflections, cycling, guitar & music).

## 📄 Content & Data

Content is managed in Markdown files under `src/content/` and structured by type. Data sources are in `src/data/` and referenced in content collections.

**Content Organization:**
- **Writing Collection**: Primary content stream with tag-based discovery (replaces traditional blog categories)
- **Teaching Content**: Course materials for Corporate Innovation and Software Engineering
- **Pages**: Static content for AutoSoft Today, Consulting, and About
- **Tags**: Used for discoverability instead of deep folder nesting

**Constraints (from [`docs/01-epic.md`](docs/01-epic.md)):**
- Preserve existing slugs and URLs (no route breakage)
- Avoid year-based routing
- Keep existing markdown/MDX files intact

## 🧪 Testing

React components are tested using Vitest and Testing Library. Test files are colocated with components and use the `.test.tsx` extension.

## 🖌️ Formatting

Code style is enforced with Prettier. Run `npm run format` to auto-format all supported files.

---

## 🤝 Contributing

**For New Contributors:**
1. Read the [Style Guide](./docs/04-style-guide.md) to understand the project's information architecture, tone principles, and layout conventions
2. Review the [Epic](./docs/01-epic.md) for the overall migration strategy and constraints
3. Check [User Stories](./docs/02-stories.md) and [Work Items](./docs/03-workitems.md) for current priorities
4. Follow the established patterns in `src/components/` and maintain consistency with Tailwind design tokens
5. Test React components with Vitest and format code with Prettier before submitting

**Key Principles (from [`docs/04-style-guide.md`](docs/04-style-guide.md)):**
- Maintain writing-first, calm aesthetic
- Preserve existing slugs and routes (no breakage)
- Use tags over deep folder nesting
- Keep diffs focused and components composable

For more details, see the migration documentation in [`/docs`](./docs) and [`/prompts`](./prompts) or contact Todd Warren.
