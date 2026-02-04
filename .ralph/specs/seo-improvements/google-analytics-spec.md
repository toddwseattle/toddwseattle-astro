# Spec: Google Analytics 4 (GA4) Integration

## Job to Be Done

When visitors use the site, I want to understand which pages they visit, how they navigate, and what content resonates so I can make data-driven decisions about content and UX improvements.

## Success Criteria

- GA4 tracking script loads on all pages
- Pageviews are tracked automatically
- No tracking in development environment (localhost)
- GA Measurement ID configurable via environment variable
- No console errors or warnings
- No measurable impact on page load performance
- TypeScript type safety for environment variables

## Constraints

- Must work with Astro's static site generation
- Use environment variables for configuration (not hard-coded IDs)
- Only load in production (not dev mode)
- No new npm dependencies (use native GA4 script)
- Must pass build and type checking
- Privacy-friendly: basic tracking, no PII collection
- Framework: Google Analytics 4 (GA4) only, not Universal Analytics

## Implementation Notes

### GA4 Overview

Google Analytics 4 is the current analytics platform. Key differences from Universal Analytics:

- **Event-based model** (not session-based)
- **Enhanced measurement** auto-tracks: page views, scrolls, outbound links, site search, file downloads
- **No cookies required** for basic tracking (privacy-friendly)
- **gtag.js library** for implementation

### Architecture

**Component:** Create `src/components/GoogleAnalytics.astro`

This component:

- Checks for GA Measurement ID from environment variable
- Only renders in production mode
- Loads gtag.js script asynchronously
- Configures GA4 with the Measurement ID
- Stays silent if ID not configured (no errors in dev)

**Integration:** Update `src/layouts/BaseLayout.astro`

- Import GoogleAnalytics component
- Add before closing `</head>` tag
- No props needed (reads from environment)

### Environment Variable Setup

**File: `.env` (create at project root)**

```bash
# Google Analytics 4 Measurement ID
# Get this from GA4 Admin > Data Streams > Web > Measurement ID
# Format: G-XXXXXXXXXX
PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Why PUBLIC\_ prefix?**

- Makes variable available to client-side code (required for gtag.js)
- Astro convention for browser-accessible env vars
- Still safe (GA IDs are meant to be public)

### Files to Create/Modify

**Create:**

1. `.env` - Environment variables (add to .gitignore!)
2. `src/components/GoogleAnalytics.astro` - GA4 tracking component

**Modify:**

1. `.gitignore` - Ensure .env files excluded
2. `src/env.d.ts` - Add TypeScript types for env var (may need to create)
3. `src/layouts/BaseLayout.astro` - Add GoogleAnalytics component

## Acceptance Criteria

- [ ] `.env` file created with `PUBLIC_GA_ID=G-XXXXXXXXXX`
- [ ] `.gitignore` includes `.env` files
- [ ] `src/env.d.ts` created/updated with PUBLIC_GA_ID type
- [ ] `src/components/GoogleAnalytics.astro` created
- [ ] Component only renders in production
- [ ] `src/layouts/BaseLayout.astro` includes GoogleAnalytics component
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`
- [ ] Dev mode has no GA tracking
- [ ] Preview mode has GA tracking
- [ ] Real-time data appears in GA4 dashboard within 60 seconds

## Reference Resources

- [Google Analytics 4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [gtag.js Reference](https://developers.google.com/analytics/devguides/collection/gtagjs)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)
