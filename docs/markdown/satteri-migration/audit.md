# Moving the Markdown pipeline to Sätteri — audit plan

**Status:** Not started — remark/rehype pinned in `astro.config.mjs`
**Owner:** Todd Warren
**Last updated:** 2026-09-22

Astro 7 replaced remark/rehype with [Sätteri](https://github.com/withastro/astro), its
own native Markdown pipeline, as the default processor for `.md`. The dependency
upgrade PR pinned the old pipeline rather than take the new default, so that a
two-major framework upgrade would not also silently re-render every post. This
document is the worklist for taking that default deliberately, later, on its own.

---

## Contents

- [What is pinned, and how](#what-is-pinned-and-how)
- [Why it was pinned](#why-it-was-pinned)
- [What is actually at risk](#what-is-actually-at-risk)
- [Method](#method)
- [Feature checklist](#feature-checklist)
- [Exit criteria](#exit-criteria)
- [Todo list](#todo-list)
- [Decision log](#decision-log)

---

## What is pinned, and how

`astro.config.mjs` carries an explicit processor:

```js
import { unified } from "@astrojs/markdown-remark";

export default defineConfig({
  markdown: {
    processor: unified(),
    shikiConfig: { theme: "github-dark" },
  },
});
```

`@astrojs/markdown-remark` is a direct dependency (`^7.3.1`). Astro no longer installs
it by default; without both the dependency and the `processor` line, `.md` files render
through Sätteri.

The cost of the pin is one extra dependency and a slower Markdown build, and that the
project sits on a pipeline Astro now treats as opt-in — so it will see less attention
over time than the default path.

## Why it was pinned

The dependency upgrade moved Astro 5.18 → 7.3, Tailwind 3 → 4, and the content
collections API all at once, to clear a critical `astro` advisory. Each of those was
verified by diffing the built site against a pre-upgrade build. Changing the Markdown
processor in the same pass would have changed the rendered HTML of every post at the
same time, which would have destroyed that baseline — there would have been no way to
tell an upgrade regression from an expected Markdown difference.

## What is actually at risk

79 Markdown files, but the audit surface is smaller than that number suggests.

| Collection         | `.md` files | Notes                                      |
| ------------------ | ----------: | ------------------------------------------ |
| `blog`             |          18 | 14 published routes under `/writing/`      |
| `course-materials` |          16 | 2 of these are reveal.js decks — see below |
| `experiences`      |           9 |                                            |
| `skills`           |           8 |                                            |
| `activities`       |           4 |                                            |
| `nonprofit`        |           4 |                                            |
| `projects`         |           4 |                                            |
| `services`         |           4 |                                            |
| `contacts`         |           3 |                                            |
| `teaching`         |           3 |                                            |
| `testimonials`     |           2 |                                            |
| `education`        |           1 |                                            |
| `hero`             |           1 |                                            |
| `investments`      |           1 |                                            |
| `newsletter`       |           1 |                                            |
| **Total**          |      **79** |                                            |

**The two reveal.js decks are out of scope.** `course-materials/testing-overview.md` and
`course-materials/reveal-introduction-to-software-engineering.md` are `type: slides`.
`SlidesLayout.astro` injects `entry.body` — the _raw_ Markdown — into a
`<textarea data-template>`, and reveal.js parses it client-side with its own Markdown
plugin. Astro's processor never touches their bodies. This matters because those two
files are the heaviest users of tables and raw HTML in the whole repo; excluding them
removes most of the apparent risk.

That leaves the features that genuinely differ between pipelines, and the files carrying
them:

| Feature         | Files                                                                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GFM tables      | `blog/2020-04-07-NUvention-Web+Media-2020-Q1.md`, `blog/2024-01-08-Software-Related-Recalls.md`, `blog/2024-01-17-Automotive-Software-Recalls-2023.md`, `blog/2025-27-05-Vitetest-with-CoPilot.md` |
| Raw HTML blocks | `blog/2019-01-15-Your-Idea-Is-Terrible.md`, `blog/2025-27-05-Vitetest-with-CoPilot.md`                                                                                                             |
| Footnotes       | `blog/2020-01-06-Book-Review-Testing-Business-Ideas.md`, `course-materials/developing-a-prototype-in-github-copilot.md`                                                                            |
| Fenced code     | 80 fences across the corpus — 58 `bash`, 11 `typescript`, 4 `tsx`, 4 `json`, 1 each `yaml`, `powershell`, `markdown`                                                                               |

The other 60-odd files are frontmatter-plus-prose and should be indistinguishable
between pipelines. They still get diffed — they are free to check — but they are not
where a problem will be.

## Method

Diff the built HTML, per route, rather than reading pages. The upgrade PR used exactly
this approach and it is what caught the `compressHTML` whitespace regression that no
test covered.

```bash
# 1. Baseline on the pinned pipeline
npm run build
cp -r dist /tmp/md-before

# 2. Switch to Sätteri: drop `processor: unified()` from astro.config.mjs
#    and remove @astrojs/markdown-remark
npm run build

# 3. Diff the rendered article bodies, ignoring asset hashes
diff -r /tmp/md-before dist
```

Two checks matter more than the raw diff:

- **Route parity.** `find dist -name '*.html' | sed 's|^dist||' | sort` must be
  unchanged. Heading-id generation feeds `TutorialLayout.astro`'s table of contents,
  so an id change is a broken in-page anchor, not just different markup.
- **Rendered text.** Load each route in a real browser and compare
  `document.body.innerText`. HTML that differs only in whitespace can still read
  differently — that is precisely how the `compressHTML` bug surfaced.

## Feature checklist

- [ ] **GFM tables** — header alignment, column alignment markers, and whether a table
      immediately following a paragraph line (no blank line) still parses as a table
- [ ] **Footnotes** — rendered markers, the generated footnote section, and the
      `id`/`href` pairs used for the backlinks
- [ ] **Raw HTML passthrough** — block-level HTML in Markdown, and whether it is
      sanitised, escaped, or passed through unchanged
- [ ] **Inline HTML** — `<br/>`, `<kbd>`, inline `<a>` inside paragraphs
- [ ] **Autolinks** — bare URLs, and `<https://…>` angle-bracket autolinks
- [ ] **Smartypants** — curly quotes, em/en dashes, ellipses. If Sätteri's defaults
      differ, every post's punctuation changes at once
- [ ] **Heading id generation** — must match the `github-slugger` semantics Astro 6
      adopted, including trailing hyphens on headings ending in punctuation
- [ ] **`headings` array** — `render()` returns it and `TutorialLayout.astro` builds its
      table of contents from `depth === 2`; confirm depth, slug and text all survive
- [ ] **Shiki** — `shikiConfig.theme: "github-dark"` must still apply, and all 7
      fence languages must still highlight
- [ ] **`entry.body`** — reading time on `/writing/` is computed from the raw body
      (`calculateReadingTime`); confirm it is unchanged
- [ ] **Slide decks** — confirm both `type: slides` files still bypass the processor
      entirely and render identically
- [ ] **RSS** — `/rss.xml` item descriptions come from frontmatter, not rendered
      Markdown, so they should be unaffected; verify rather than assume

## Exit criteria

- All 58 routes build, with identical paths
- Browser-rendered text identical on every route, or each difference explained and
  accepted in the decision log below
- `npm run test:run`, `npx astro check` and `npm run test:e2e` clean
- `@astrojs/markdown-remark` removed from `package.json` and the `processor` line
  removed from `astro.config.mjs`
- Any deliberate rendering change is called out in the PR, with before/after

## Todo list

- [ ] Capture the pinned-pipeline baseline (`dist` copy + route list + rendered text)
- [ ] Remove the `processor` pin and the `@astrojs/markdown-remark` dependency
- [ ] Build and diff routes
- [ ] Build and diff rendered text per route
- [ ] Walk the feature checklist above against the four table posts, two raw-HTML posts
      and two footnote files specifically
- [ ] Check the `TutorialLayout` table of contents on all 4 `type: tutorial` materials
- [ ] Decide on, and record, any accepted rendering differences
- [ ] Update `CLAUDE.md` / `AGENTS.md` if the authoring rules change

## Decision log

| Date       | Decision                                                                  | Why                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-09-22 | Pin remark/rehype during the Astro 5 → 7 upgrade rather than take Sätteri | The upgrade was verified by diffing against a pre-upgrade build; changing the Markdown processor at the same time would have invalidated that baseline |
| 2026-09-22 | Audit the two `type: slides` decks as out of scope                        | Their bodies are handed to reveal.js as raw Markdown and parsed client-side; Astro's processor never sees them                                         |
