# Agent Build & Test Instructions

## Environment Setup

```bash
# Install dependencies (if needed)
npm install
```

## Type Checking

```bash
npx tsc --noEmit
```

**Expected:** Zero errors
**If errors:** Fix all TypeScript errors before proceeding

## Running Tests

```bash
# Run all tests
npm run test:run

# Run in watch mode (during development)
npm run test:watch
```

**Expected:** All tests pass
**Coverage Target:** 80%+ for new code

## Building

```bash
npm run build
```

**Expected:** Build succeeds with no errors
**Output:** `dist/` directory created

## Development Server

```bash
npm run dev
```

**Port:** http://localhost:4321
**Use for:** Manual verification of changes

## Code Formatting

```bash
npm run format
```

**Expected:** All files formatted consistently
**Run:** Before every commit

## Full Validation Sequence

Run these in order before any commit:

```bash
npx tsc --noEmit && \
npm run test:run && \
npm run build && \
npm run format
```

If ANY step fails, do NOT commit. Fix the issue first.

## Astro-Specific Commands

```bash
# Check for Astro issues
npx astro check

# View Astro help
npx astro --help
```

## Debugging

### TypeScript Errors

```bash
npx tsc --noEmit --watch
```

### Test Failures

```bash
npm run test:watch -- --reporter=verbose
```

### Build Issues

```bash
npm run build -- --verbose
```

## Content Collections

Astro validates content collections during build.
Schema errors will cause build to fail.
See `src/content/config.ts` for schemas.

## Common Build Errors

### "Cannot find module"

- Check import paths use `@/` for src/
- Verify file exists at specified path
- Check TypeScript path aliases in tsconfig.json

### "Type errors" during build

- Run `npx tsc --noEmit` to see full list
- Fix from bottom up (most specific first)
- Restart dev server after fixing

### "Content collection validation failed"

- Check frontmatter in content files
- Verify schema in `src/content/config.ts`
- Ensure required fields are present
