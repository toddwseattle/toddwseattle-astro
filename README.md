# Todd Warren Portfolio Site

This is the personal portfolio website for Todd Warren, migrated from Gatsby to [Astro](https://astro.build/) with TypeScript, Tailwind CSS, and Framer Motion. The project showcases professional experience, projects, blog posts, and more, using modern web development best practices.

> **Migration in Progress:** This site is being migrated from Gatsby to Astro. See [`/docs/`](docs/) for strategic goals and [`/prompts/`](prompts/) for implementation details. Original Gatsby site: [toddwseattle/toddwseattle-gb](https://github.com/toddwseattle/toddwseattle-gb).

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
├── docs/                      # **STRATEGIC DOCUMENTATION** - Project goals, IA, and principles
└── prompts/                   # **TACTICAL IMPLEMENTATION** - Migration planning and execution
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
- **Tailwind CSS**: For rapid, consistent styling following the design tokens in `docs/04-style-guide.md`
- **Testing**: All React components are tested with Vitest and Testing Library
- **Prettier**: Enforced code style via `npm run format`
- **Strategic Documentation**: Project goals, information architecture, and style guidelines are in `docs/` (see below)
- **Migration Tracking**: Tactical implementation plans and progress are documented in `prompts/`

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

## 📋 Project Strategy & Documentation

### Strategic Documentation (`/docs/`)

The `/docs/` directory is the **primary source of truth** for project goals, architecture, and design principles:

- **[`docs/01-epic.md`](docs/01-epic.md)** - Migration objectives, IA refresh goals, constraints, and success criteria
- **[`docs/02-stories.md`](docs/02-stories.md)** - User stories for navigation, Teaching, Writing, and other sections
- **[`docs/03-workitems.md`](docs/03-workitems.md)** - Detailed work items supporting each story
- **[`docs/04-style-guide.md`](docs/04-style-guide.md)** - Information architecture, tone, content principles, layout, and styling guidelines

**Key Principles:**
- Six-item navigation: Home, Teaching, Writing, AutoSoft Today, Consulting, About
- Writing-forward, modern, readable aesthetic
- Calm, advisory tone (not marketing-heavy)
- Tag-driven content discovery over deep folder nesting
- Preserve existing routes and slugs (no breaking changes)

### Tactical Implementation (`/prompts/`)

The `/prompts/` directory contains **tactical migration planning and execution details**:

- **[`prompts/migrate-components.md`](prompts/migrate-components.md)** - Comprehensive component migration plan and tracking
- **[`prompts/start-migration.md`](prompts/start-migration.md)** - Initial migration bootstrap steps (historical reference)
- **[`prompts/components/`](prompts/components/)** - Individual component migration specifications

All implementation work in `/prompts/` aligns with and references the strategic goals defined in `/docs/`.

## 📝 Migration Status

This site is an active migration from a Gatsby-based portfolio to Astro. The original Gatsby site can be found at [toddwseattle/toddwseattle-gb](https://github.com/toddwseattle/toddwseattle-gb).

Current focus areas align with Stories 1-7 in [`docs/02-stories.md`](docs/02-stories.md):
- Navigation implementation (six-item IA)
- Teaching section development
- Blog → Writing consolidation
- AutoSoft Today, Consulting, About pages
- Component migration (see [`prompts/migrate-components.md`](prompts/migrate-components.md))

## 📄 Content & Data

Content is managed in Markdown files under `src/content/` and structured by type (blog, activities, experiences, etc.). Data sources are in `src/data/` and referenced in content collections.

## 🧪 Testing

React components are tested using Vitest and Testing Library. Test files are colocated with components and use the `.test.tsx` extension.

## 🖌️ Formatting

Code style is enforced with Prettier. Run `npm run format` to auto-format all supported files.

---

For strategic direction, see `/docs/`. For tactical implementation details, see `/prompts/`. Questions? Contact Todd Warren.
