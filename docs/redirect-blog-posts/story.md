---
title: Blog to Writing Redirects
status: Implemented
owner: Todd Warren
last_updated: 2026-02-07
---

# Blog to Writing Redirects

## Why this exists

The site consolidated the old /blog section into /writing while preserving all legacy URLs. The goal is to keep backlinks and bookmarks intact, avoid SEO regressions, and make /writing the canonical home for all long-form content.

## How redirects work

Astro handles the redirects at build time using two route files:

- [src/pages/blog/index.astro](src/pages/blog/index.astro) returns a 301 redirect to /writing/.
- [src/pages/blog/[slug].astro](src/pages/blog/%5Bslug%5D.astro) returns a 301 redirect to /writing/{slug}/ using the slug list from [src/content/blog](src/content/blog).

This keeps the old /blog URLs alive while ensuring search engines treat /writing as the canonical destination.

## Scope of migrated posts

All posts that previously lived under /blog on the Gatsby site are now in [src/content/blog](src/content/blog). The slug is derived from the filename, and redirects map directly from /blog/{slug}/ to /writing/{slug}/.

## Redirect mapping (old to new)

| Slug | Title (frontmatter) | Published | Old URL | New URL |
| --- | --- | --- | --- | --- |
| 2019-01-08-NUvention-Web-2019 | A look at NUvention Web 2019: Year 10 | true | https://toddwseattle.com/blog/2019-01-08-NUvention-Web-2019/ | https://toddwseattle.com/writing/2019-01-08-NUvention-Web-2019/ |
| 2019-01-15-Your-Idea-Is-Terrible | Your Idea is Terrible: Ideation in NUvention Web | true | https://toddwseattle.com/blog/2019-01-15-Your-Idea-Is-Terrible/ | https://toddwseattle.com/writing/2019-01-15-Your-Idea-Is-Terrible/ |
| 2019-02-05-Coding-Bootcamp | The Coding Bootcamp in NUvention Web | true | https://toddwseattle.com/blog/2019-02-05-Coding-Bootcamp/ | https://toddwseattle.com/writing/2019-02-05-Coding-Bootcamp/ |
| 2020-01-06-Book-Review-Testing-Business-Ideas | Book Review: Testing Business Ideas | true | https://toddwseattle.com/blog/2020-01-06-Book-Review-Testing-Business-Ideas/ | https://toddwseattle.com/writing/2020-01-06-Book-Review-Testing-Business-Ideas/ |
| 2020-04-07-NUvention-Web+Media-2020-Q1 | NUvention Web+Media 2020 | true | https://toddwseattle.com/blog/2020-04-07-NUvention-Web%2BMedia-2020-Q1/ | https://toddwseattle.com/writing/2020-04-07-NUvention-Web%2BMedia-2020-Q1/ |
| 2020-04-10-NUventon-Web-Spring-2020 | NUvention Web+Media 2020 Q2: Entrepreneurship Ed in the time of COVID-19 | true | https://toddwseattle.com/blog/2020-04-10-NUventon-Web-Spring-2020/ | https://toddwseattle.com/writing/2020-04-10-NUventon-Web-Spring-2020/ |
| 2023-04-05-ChatGPT-Outlook-AddIn-Tutorial-Intro | ChatGPT / Open AI Outlook AddIn Tutorial Intro Part 1 | false | https://toddwseattle.com/blog/2023-04-05-ChatGPT-Outlook-AddIn-Tutorial-Intro/ | https://toddwseattle.com/writing/2023-04-05-ChatGPT-Outlook-AddIn-Tutorial-Intro/ |
| 2024-01-08-Software-Related-Recalls | Software-Related Vehicle Recalls: A Reflection on the Evolution in Automotive Industry to Becoming Software Powered | true | https://toddwseattle.com/blog/2024-01-08-Software-Related-Recalls/ | https://toddwseattle.com/writing/2024-01-08-Software-Related-Recalls/ |
| 2024-01-17-Automotive-Software-Recalls-2023 | The Year in Automotive Software Related Recalls 2023 | true | https://toddwseattle.com/blog/2024-01-17-Automotive-Software-Recalls-2023/ | https://toddwseattle.com/writing/2024-01-17-Automotive-Software-Recalls-2023/ |
| 2024-02-05-CS394-Spring-Software-Engineering-Course | Northwestern CS394 Spring Software Engineering Course | true | https://toddwseattle.com/blog/2024-02-05-CS394-Spring-Software-Engineering-Course/ | https://toddwseattle.com/writing/2024-02-05-CS394-Spring-Software-Engineering-Course/ |
| 2024-04-10-AI-Software-Dev-Tooll-Roundup | Roundup of current AI Software Assistance tools for VS Code | false | https://toddwseattle.com/blog/2024-04-10-AI-Software-Dev-Tooll-Roundup/ | https://toddwseattle.com/writing/2024-04-10-AI-Software-Dev-Tooll-Roundup/ |
| 2025-02-05-CS394-2025-Spring-Software-Engineering-Course | Northwestern CS394 Spring Software Engineering Course for 2025 | true | https://toddwseattle.com/blog/2025-02-05-CS394-2025-Spring-Software-Engineering-Course/ | https://toddwseattle.com/writing/2025-02-05-CS394-2025-Spring-Software-Engineering-Course/ |
| 2025-03-15-VSCode-Setup-Recomendations | VSCode Setup Recommendations for CS394 Spring 2025 | true | https://toddwseattle.com/blog/2025-03-15-VSCode-Setup-Recomendations/ | https://toddwseattle.com/writing/2025-03-15-VSCode-Setup-Recomendations/ |
| 2025-03-24-React-Typescript-Template | VSCode Setup Recommendations for CS394 Spring 2025 | false | https://toddwseattle.com/blog/2025-03-24-React-Typescript-Template/ | https://toddwseattle.com/writing/2025-03-24-React-Typescript-Template/ |
| 2025-27-05-Vitetest-with-CoPilot | Using Vitest with GitHub Copilot for React Components 2025 | true | https://toddwseattle.com/blog/2025-27-05-Vitetest-with-CoPilot/ | https://toddwseattle.com/writing/2025-27-05-Vitetest-with-CoPilot/ |

## Notes and constraints

- Slugs are preserved as-is to avoid breaking backlinks.
- Redirects are 301 (permanent), not 302.
- Unpublished posts still receive redirects because their slugs exist in the content collection.
- /writing is the canonical route; /blog should never be linked in new content.
