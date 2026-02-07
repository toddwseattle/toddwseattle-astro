---
title: Work Items - Blog to Writing Redirects
status: Planned
owner: Todd Warren
last_updated: 2026-02-07
---

# Work Items - Blog to Writing Redirects

## WI-1: Verify all post redirects (automated)

- Goal: confirm every /blog/{slug}/ returns 301 and points to /writing/{slug}/.
- Inputs: slug list in [docs/redirect-blog-posts/story.md](docs/redirect-blog-posts/story.md).
- Acceptance:
  - Status is 301 for each slug.
  - Location header equals the /writing URL.

## WI-2: Verify blog index redirect

- Goal: confirm /blog/ redirects to /writing/ with 301.
- Acceptance:
  - Status 301.
  - Location header is https://toddwseattle.com/writing/.

## WI-3: Spot-check browser navigation

- Goal: ensure UX is clean for humans (no loops, no dead ends).
- Scope: pick 5 posts (include 1 unpublished).
- Acceptance:
  - Old URL loads and lands at /writing/{slug}/.
  - The writing page renders content and images.

## WI-4: Verify RSS feed still reflects writing posts

- Goal: ensure /rss.xml uses /writing URLs and includes expected posts.
- Acceptance:
  - Feed entries use /writing/{slug}/.
  - Sample entries exist for at least 3 known posts.

## WI-5: Validate tags and index pages

- Goal: confirm /writing index and tag pages render without /blog references.
- Acceptance:
  - /writing/ lists posts with /writing links.
  - /writing/tag/{tag}/ links do not reference /blog.

## WI-6: Document maintenance guardrails

- Goal: keep future content in /writing and preserve redirect policy.
- Acceptance:
  - Story notes updated if new slugs are added.
  - No new /blog links appear in navigation or content.
