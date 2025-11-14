# Todd Warren Portfolio Site

This is the personal portfolio website for Todd Warren, migrated from Gatsby to [Astro](https://astro.build/) with TypeScript, Tailwind CSS, and Framer Motion. The project showcases professional experience, projects, blog posts, and more, using modern web development best practices.

**Migration Note:**
This site is a migration of the original Gatsby-based portfolio, which can be found at [toddwseattle/toddwseattle-gb](https://github.com/toddwseattle/toddwseattle-gb).

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
├── prompts/                   # Migration documentation and planning
└── README.md                  # Project documentation (this file)
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
- **Tailwind CSS**: For rapid, consistent styling
- **Testing**: All React components are tested with Vitest and Testing Library
- **Prettier**: Enforced code style via `npm run format`
- **Migration Documentation**: All migration steps and planning are documented in `prompts/`

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

All migration steps, audit summaries, and planning documents are in the `prompts/` folder. See `prompts/start-migration.md` for the initial migration plan and progress.

## 📄 Content & Data

Content is managed in Markdown files under `src/content/` and structured by type (blog, activities, experiences, etc.). Data sources are in `src/data/` and referenced in content collections.

## 🧪 Testing

React components are tested using Vitest and Testing Library. Test files are colocated with components and use the `.test.tsx` extension.

## 🖌️ Formatting

Code style is enforced with Prettier. Run `npm run format` to auto-format all supported files.

---

For more details, see the migration documentation in `prompts/` or contact Todd Warren.
