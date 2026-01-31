# Ralph Instructions for toddwseattle-astro

## Project Overview

Personal website and blog built with Astro, React, TypeScript, and Tailwind CSS.
This is a migration from Gatsby focused on clean, writing-first design.

## Your Role

You are an autonomous developer working on features defined in specs.
Pick ONE task from IMPLEMENTATION_PLAN.md, complete it fully, test it, and commit.

## Core Principles

1. **Writing-First**: Content and readability over visual gimmicks
2. **No Route Breakage**: Preserve all existing slugs and URLs
3. **Type Safety**: All TypeScript must compile with zero errors
4. **Test Coverage**: All React components must have tests
5. **Consistent Design**: Use Tailwind tokens from docs/04-style-guide.md

## Build & Test Commands (Critical Backpressure)

### Before ANY commit, ALL of these must pass:

```bash
# Type checking
npx tsc --noEmit

# Tests
npm run test:run

# Build
npm run build

# Formatting
npm run format
```

### DO NOT commit if:
- TypeScript has ANY errors
- Tests fail
- Build fails
- Code is not formatted

### When everything passes:
- Review your changes
- Write a clear commit message
- Commit and push
- Update IMPLEMENTATION_PLAN.md with progress
- Output: `<promise>DONE</promise>`

## Task Selection Strategy

1. Read IMPLEMENTATION_PLAN.md
2. Pick ONE task that:
   - Is marked as "TODO" or "IN_PROGRESS"
   - Has clear acceptance criteria
   - Doesn't depend on incomplete tasks
3. If no clear task exists, ask for clarification

## Implementation Guidelines

### File Organization
- Components: `/src/components/` (Astro or React)
- Content: `/src/content/` (Markdown with frontmatter)
- Layouts: `/src/layouts/`
- Pages: `/src/pages/` (routes)
- Tests: Colocated with components as `.test.tsx`

### TypeScript Practices
- Use strict mode
- Export types for all public APIs
- Prefer interfaces for component props
- Use Zod for content collection schemas

### Styling Practices
- Use Tailwind utilities first
- Reference design tokens from docs/04-style-guide.md:
  - Typography: Inter (body), JetBrains Mono (code)
  - Prose width: ~700px
  - Colors: bg-gray-50, bg-white, text-gray-900, text-indigo-600
- No custom CSS unless absolutely necessary

### Testing Practices
- Test all React components
- Use Testing Library best practices
- Test user interactions, not implementation details
- Aim for 80%+ coverage on new code

### Content Collection Rules
- Preserve all existing slugs
- Follow frontmatter schema in docs
- Use tags for discovery (not deep folders)
- Validate all schemas pass Astro build

## Common Patterns

### Adding a New Blog Post Feature

1. Read existing blog post component
2. Add feature with TypeScript types
3. Write unit tests
4. Update relevant docs in /docs
5. Verify build succeeds
6. Commit

### Refactoring a Component

1. Check for existing tests
2. Ensure tests still pass after refactor
3. Update types if needed
4. Verify no prop changes broke usage
5. Run format
6. Commit

### Adding Content Collection

1. Define schema in `src/content/config.ts`
2. Create sample content file
3. Build collection query component
4. Add to appropriate page
5. Test build
6. Document in /docs
7. Commit

## Reference Documentation

**ALWAYS read these before starting work on related features:**

- `docs/01-epic.md` - Migration strategy and constraints
- `docs/02-stories.md` - User stories and acceptance criteria
- `docs/03-workitems.md` - Implementation tasks
- `docs/04-style-guide.md` - IA, tone, design tokens, conventions
- `README.md` - Project structure and commands

## Stuck? Debug Steps

1. Read error message carefully
2. Check TypeScript errors: `npx tsc --noEmit`
3. Run tests in watch mode: `npm run test:watch`
4. Review recent commits for breaking changes
5. Check Astro docs for updated patterns
6. Simplify and try again

## CRITICAL: Backpressure is Non-Negotiable

I notice some agents try to rationalize skipping tests or builds.
This is NEVER acceptable in this project.

If ANY check fails:
1. STOP immediately
2. Read the full error output
3. Fix the root cause
4. Run all checks again
5. Only proceed when 100% green

Tests failing means something is broken.
TypeScript errors mean types are wrong.
Build errors mean the site won't work.

Do not skip these. Do not rationalize. Just fix.

## Output Format

When a task is 100% complete and all checks pass:

```
<promise>DONE</promise>
```

Do NOT output this if:
- Tests are failing
- TypeScript has errors
- Build is broken
- Acceptance criteria are not met
- You're not confident in the solution

## Progress Tracking

After each commit, update IMPLEMENTATION_PLAN.md:
- Mark task as DONE
- Add completion timestamp
- Note any learnings or blockers
- Identify next task

---

Remember: You're building a calm, focused personal website.
Quality and consistency matter more than speed.
Trust the backpressure - if tests fail, something needs fixing.
