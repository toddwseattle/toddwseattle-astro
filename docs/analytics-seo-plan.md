## Plan: GA4 Staging/Production + SEO Hardening

Use separate GA4 streams per environment to keep analytics clean, then close the highest-value SEO gaps already identified in the codebase. Staging will use Measurement ID G-Q3YWJT6RZ1, production will use its own stream ID (recommended: existing live-site ID G-0SGQ1Z8QJ1 if still valid for toddwseattle.com continuity).

**Steps**

1. Confirm stream mapping in GA4 Admin.
2. Map staging to stream astro-staging (Measurement ID G-Q3YWJT6RZ1, URL http://toddwseattle-astro-staging.web.app).
3. Map production to a separate web stream for https://toddwseattle.com (using existing ID G-0SGQ1Z8QJ1 if this is your historical live stream).
4. Local environment setup.
5. Keep /Users/toddwseattle/dev/toddwseattle-astro/.env as staging-default for local validation: PUBLIC_GA_ID=G-Q3YWJT6RZ1.
6. Remove PUBLIC_PROD from local env because runtime production detection already comes from import.meta.env.PROD in the app.
7. Add optional local override file strategy for production simulation when needed (for example, temporary env swap before build), but keep committed templates unchanged.
8. GitHub Actions secret wiring.
9. Set repository secret PUBLIC_GA_ID_STAGING=G-Q3YWJT6RZ1.
10. Set repository secret PUBLIC_GA_ID_PRODUCTION=<prod-id> (recommended G-0SGQ1Z8QJ1 if confirmed active for toddwseattle.com).
11. Verified: workflow files already consume these secrets during the build by mapping `PUBLIC_GA_ID_STAGING` and `PUBLIC_GA_ID_PRODUCTION` to the app's expected `PUBLIC_GA_ID`; no analytics code changes are required for secret wiring.
12. Validate staging analytics end-to-end.
13. Run staging deploy, open staging site, verify gtag network call includes id=G-Q3YWJT6RZ1, and confirm events in GA4 Realtime/DebugView under staging stream.
14. Validate production analytics end-to-end.
15. Run production deploy, open live site, verify gtag network call includes id=<prod-id>, and confirm events in GA4 Realtime under production stream.
16. Implement SEO fixes after GA config is stable.
17. Add Article structured data on writing post pages using existing StructuredData component.
18. Set noindex on writing tag listing pages.
19. Resolve course-materials article metadata mismatch (either provide published date metadata or stop marking those pages as article type).
20. Optionally add modifiedTime support for writing posts from content schema (updatedDate).

**Relevant files**

- /Users/toddwseattle/dev/toddwseattle-astro/.env — local staging Measurement ID, remove PUBLIC_PROD
- /Users/toddwseattle/dev/toddwseattle-astro/.env.example — template reference for PUBLIC_GA_ID only
- /Users/toddwseattle/dev/toddwseattle-astro/src/components/GoogleAnalytics.astro — GA script load logic and PROD gating
- /Users/toddwseattle/dev/toddwseattle-astro/src/layouts/BaseLayout.astro — global inclusion point for analytics and SEO
- /Users/toddwseattle/dev/toddwseattle-astro/.github/workflows/deploy-staging.yml — uses PUBLIC_GA_ID_STAGING
- /Users/toddwseattle/dev/toddwseattle-astro/.github/workflows/deploy-prod.yml — uses PUBLIC_GA_ID_PRODUCTION
- /Users/toddwseattle/dev/toddwseattle-astro/src/pages/writing/[slug].astro — article-level SEO and structured data target
- /Users/toddwseattle/dev/toddwseattle-astro/src/pages/writing/tag/[tag].astro — add noindex target
- /Users/toddwseattle/dev/toddwseattle-astro/src/pages/course-materials/[slug].astro — article metadata consistency target
- /Users/toddwseattle/dev/toddwseattle-astro/src/content/config.ts — optional updatedDate schema support

**Verification**

1. Local build check: npm run build then npm run preview; confirm GA script request contains staging ID when local env uses G-Q3YWJT6RZ1.
2. Staging deploy check: confirm staging stream receives hits and production stream does not.
3. Production deploy check: confirm production stream receives hits and staging stream does not.
4. SEO validation after code changes: run npm run build, validate rich results on writing post URL, validate OG/Twitter metadata on writing and primary pages.

**Decisions**

- Included: explicit two-stream GA strategy, local env configuration, GitHub secret mapping, staged verification, and follow-on SEO hardening.
- Excluded: creating new GA property from scratch unless existing production stream cannot be validated.
- Recommendation: preserve historical continuity by reusing G-0SGQ1Z8QJ1 for production if it is tied to toddwseattle.com.

**Further Considerations**

1. If you want strict data separation, keep a dedicated staging property/stream and filter internal traffic in both environments.
2. If production continuity is uncertain, verify old stream data recency before assigning it to PUBLIC_GA_ID_PRODUCTION.
