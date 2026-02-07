---
title: Verification To-Do - Blog to Writing Redirects
status: Ready
owner: Todd Warren
last_updated: 2026-02-07
---

# Verification To-Do - Blog to Writing Redirects

## Quick commands

- Check redirect for a single post:
  - curl -I https://toddwseattle.com/blog/2019-01-08-NUvention-Web-2019/
- Expected headers:
  - HTTP/2 301
  - Location: https://toddwseattle.com/writing/2019-01-08-NUvention-Web-2019/

## Batch check script (optional)

```bash
slugs=(
  2019-01-08-NUvention-Web-2019
  2019-01-15-Your-Idea-Is-Terrible
  2019-02-05-Coding-Bootcamp
  2020-01-06-Book-Review-Testing-Business-Ideas
  2020-04-07-NUvention-Web+Media-2020-Q1
  2020-04-10-NUventon-Web-Spring-2020
  2023-04-05-ChatGPT-Outlook-AddIn-Tutorial-Intro
  2024-01-08-Software-Related-Recalls
  2024-01-17-Automotive-Software-Recalls-2023
  2024-02-05-CS394-Spring-Software-Engineering-Course
  2024-04-10-AI-Software-Dev-Tooll-Roundup
  2025-02-05-CS394-2025-Spring-Software-Engineering-Course
  2025-03-15-VSCode-Setup-Recomendations
  2025-03-24-React-Typescript-Template
  2025-27-05-Vitetest-with-CoPilot
)

for slug in "${slugs[@]}"; do
  echo "Checking $slug"
  curl -sI "https://toddwseattle.com/blog/$slug/" | awk '/HTTP|Location/'
  echo
 done
```

## Checklist

- [ ] /blog/ returns 301 -> /writing/
- [ ] Sample unpublished post redirects (example: 2023-04-05-ChatGPT-Outlook-AddIn-Tutorial-Intro)
- [ ] /writing/ index loads and links are /writing/{slug}/
- [ ] /writing/tag/{tag}/ pages render without /blog links
- [ ] /rss.xml contains /writing URLs

## Post-by-post verification table

| Slug                                                     | Published | 301 | Location correct | Assets load |
| -------------------------------------------------------- | --------- | --- | ---------------- | ----------- |
| 2019-01-08-NUvention-Web-2019                            | true      | [ ] | [ ]              | [ ]         |
| 2019-01-15-Your-Idea-Is-Terrible                         | true      | [ ] | [ ]              | [ ]         |
| 2019-02-05-Coding-Bootcamp                               | true      | [ ] | [ ]              | [ ]         |
| 2020-01-06-Book-Review-Testing-Business-Ideas            | true      | [ ] | [ ]              | [ ]         |
| 2020-04-07-NUvention-Web+Media-2020-Q1                   | true      | [ ] | [ ]              | [ ]         |
| 2020-04-10-NUventon-Web-Spring-2020                      | true      | [ ] | [ ]              | [ ]         |
| 2023-04-05-ChatGPT-Outlook-AddIn-Tutorial-Intro          | false     | [ ] | [ ]              | [ ]         |
| 2024-01-08-Software-Related-Recalls                      | true      | [ ] | [ ]              | [ ]         |
| 2024-01-17-Automotive-Software-Recalls-2023              | true      | [ ] | [ ]              | [ ]         |
| 2024-02-05-CS394-Spring-Software-Engineering-Course      | true      | [ ] | [ ]              | [ ]         |
| 2024-04-10-AI-Software-Dev-Tooll-Roundup                 | false     | [ ] | [ ]              | [ ]         |
| 2025-02-05-CS394-2025-Spring-Software-Engineering-Course | true      | [ ] | [ ]              | [ ]         |
| 2025-03-15-VSCode-Setup-Recomendations                   | true      | [ ] | [ ]              | [ ]         |
| 2025-03-24-React-Typescript-Template                     | false     | [ ] | [ ]              | [ ]         |
| 2025-27-05-Vitetest-with-CoPilot                         | true      | [ ] | [ ]              | [ ]         |
