---
category: "software-engineering"
title: "Building toddwseattle.com in Astro"
date: "2026-05-12"
tags:
  [
    "software engineering",
    "Astro",
    "AI",
    "content collections",
    "personal site",
  ]
description: "Notes from rebuilding toddwseattle.com from Gatsby to Astro, including IA changes, content collections, design documents, and a few agentic tool experiments that worked better in theory than in practice."
draft: true
---

In early 2026 I moved this site from an older Gatsby codebase to Astro. The change started as a framework migration, but it quickly became something more useful: an information architecture refresh, a content modeling exercise, and a practical test bed for using agentic coding tools on a real, small, long-lived website.

The old site had served its purpose. It was a Gatsby site with React components, MarkdownRemark, Emotion and styled-components, Jest, Gatsby image plugins, feeds, offline support, Mailchimp integration, Google Tag Manager, and a collection of data-driven sections under `src/data`. It had a traditional personal-site structure: home, blog, resume, contact, work, and a set of componentized sections for activities, projects, experience, skills, testimonials, nonprofit work, and so on.

The old repo's history also showed a pattern I recognized from a lot of personal websites: it had evolved by maintenance and accretion. There were Gatsby upgrade commits in 2023, plugin and GitHub Actions fixes, new automotive software posts in 2024, and a run of 2025 posts around the software engineering course, VS Code setup, React templates, and Vitest with Copilot. That is a normal way for a personal site to grow. It also leaves behind a site whose technical shape reflects many moments in time rather than the current purpose of the site.

That structure was reasonable when the site was mostly a portfolio and resume. But by 2026 the work the site needed to do had changed. I wanted it to foreground teaching, writing, AutoSoftToday, consulting, and a current bio. The migration was less about rebuilding the old site exactly and more about deciding what the site should now be.

## From Gatsby Blog to Astro Writing Site

The Gatsby version stored blog posts in folders like `src/data/blog/2025-27-05-Vitetest-with-CoPilot/index.md`, with images colocated next to each `index.md`. Gatsby generated pages with `gatsby-node.js`, deriving slugs from `gatsby-source-filesystem` and `gatsby-transformer-remark`. That worked, but it tied the content model to Gatsby's GraphQL layer and the folder shape.

The Astro version moved that into content collections. The current `blog` collection defines frontmatter for `category`, `cover`, `title`, `description`, `date`, `updatedDate`, `featured`, `tags`, and `draft`. Instead of Gatsby creating MarkdownRemark nodes and page fields, Astro treats the collection as typed content and routes it through pages like `/writing/[slug].astro`.

The visible change is that "Blog" became "Writing." That sounds cosmetic, but it was a useful forcing function. Blog is a container. Writing is a posture. It let the site include software engineering notes, teaching reflections, AutoSoftToday-adjacent analysis, and lighter topics like cycling or music without building another category hierarchy.

The original Gatsby blog URLs still mattered, so one constraint in the migration was to preserve slugs and avoid year-based routing. The Astro site handles the new writing route while Firebase Hosting redirects `/blog`, `/blog/`, and `/blog/**` to `/writing/` equivalents. That kept the site static, avoided adding a server adapter, and reduced migration risk.

## The Structure Changed More Than the Framework

The biggest change was not JSX to Astro syntax. It was the top-level structure.

The migration documents in `docs/01-epic.md`, `docs/02-stories.md`, and `docs/03-workitems.md` reframed the project around a six-item navigation:

1. Home
2. Teaching
3. Writing
4. AutoSoftToday
5. Consulting
6. About

Those documents also turned vague intentions into testable work:

- Teaching needed a landing page plus course pages for Corporate Innovation, NUvention Web, and Software Engineering.
- Writing needed tag-driven discovery, not deep folders or category pages.
- AutoSoftToday needed a concise landing page with outbound links, not duplicated content.
- Consulting needed to sound advisory rather than salesy.
- About needed a current bio, boards and advisory roles, seasonal location, and a link to the resume.

That planning mattered because agentic tools are much better when the constraints are written down. "Migrate this site" is too broad. "Implement the six-link IA, preserve slugs, avoid year-based routing, use Astro content collections, keep the tone calm, and do not restart the project" is something a tool can actually help with.

The current site reflects that structure. The home page now has a "Now" section, an "Areas of Work" section, and recent writing. Teaching is its own collection and page family. Course materials have their own collection with typed resources, tutorial layouts, and a progress gutter for longer tutorials. Writing is a primary stream, with tags used as discovery rather than navigation clutter.

## Content Collections Became the Spine

Astro's content collections ended up being one of the best reasons to migrate.

The old site had a lot of content-like data in Markdown files under `src/data`: hero text, activities, projects, services, investments, education, contacts, newsletter copy, blog posts, and more. Gatsby made those queryable through GraphQL, but the data model was implicit. You often found out about a missing field when a query or template broke.

In Astro, the schema lives in `src/content/config.ts`. That gives the site a single place to say what a blog post is, what a teaching course is, and what a course material is. It also allowed the teaching material work to grow without turning every new content type into a bespoke page convention.

For example, course materials now support types like `exercise`, `resource`, `post`, `tutorial`, `slides`, `examples`, and `student work`. Tutorials can use a dedicated layout and a React island where interactivity is justified. The bulk of the site can still stay static and Astro-first.

That division fits the site better than the old setup. Most pages here are writing and structure. They should ship as plain HTML by default. React is still available, but it is used for genuinely interactive pieces like the timeline viewer or tutorial progress behavior, not as the default rendering model for everything.

## Design Docs Were Not Decoration

I also learned that design documents are not just for large teams.

The style guide in `docs/04-style-guide.md` describes the site as "writing-forward" and "calm." The later visual docs under `docs/Visual-style/` turned that into a more concrete system: Newsreader for narrative text, Manrope for UI labels, warm paper backgrounds, ink and graphite for text and structure, and teal only as a functional accent.

That system eventually became the Chronicle Data System. The rules are intentionally restrained: no gradients, no decorative shadows, no visual noise, no raw hex values when Tailwind tokens exist, and no color-only interaction states. The point is not to make the site look "designed" in a loud way. It is to make it durable and readable.

This mattered most when using AI coding tools. Without a design brief, agents tend to produce the default SaaS landing page vocabulary: cards, gradients, glowing accents, big hero blocks, and promotional copy. The docs gave the tools a smaller target: quieter pages, better typography, more consistent navigation, and content hierarchy over visual tricks.

## Agentic Tools Helped, But Only With Rails

This migration used several AI-assisted workflows: GitHub Copilot, Codex-style branches, Claude-assisted prototypes, and some experiments with OpenCode-based agent loops. The commit history makes that visible. There are branches and commits for story-based implementation, course material layouts, Firebase hosting, CI, timelines, SEO, QA coverage, and prototype cleanup.

The tools were useful in a few specific ways.

They were good at mechanical migrations: converting a section into an Astro page, adding a schema field, wiring a route, or translating a React component test to Vitest. They were good at drafting first-pass docs and expanding a plan into work items. They were also good at repetitive fixes after I had a stable command like `npm run test:run`, `npm run build`, or `npx astro check`.

They were less good when the task required taste. The question "what should this site be about now?" was not something I wanted a model to answer. The model could help implement the answer, but the answer had to come from the design and IA documents.

That distinction is why the project got more reliable as the docs improved. The better the harness, the better the agent.

## The Ralph Wiggum Experiment

There is still evidence in the repo of a failed or at least over-ambitious experiment: the Ralph Wiggum tooling.

The repository has an `npm run ralph` script, `scripts/ralph.sh`, `ralph-config.sh`, `opencode.json`, and a `ralph-config-files/` directory. The idea was interesting: set up a loop with planning, implementation, checking, fixing, testing, and committing. The script even split roles into an architect, worker, fixer, tester, and committer. In theory it was a small autonomous software factory.

In practice, the commit history shows the problem. There are long runs of commits named "Ralph iteration 1: Fixing errors" through "Ralph iteration 15: Fixing errors," repeated several times. There are also commits updating test execution logs with timing data over and over. That is a smell. A loop that keeps generating fixes can look productive while mainly producing churn.

This was a good reminder that backpressure has to be real. Running a type check or test suite is useful only if the loop can make a sensible decision when it fails. Otherwise, the agent optimizes for "make another change" rather than "understand the system." Ralph was a useful experiment, but it was not the workflow I would use unsupervised on a repo I care about.

The better pattern was smaller: write a story, keep the diff focused, run the deterministic tools, review the output, and commit intentionally. The agent helps. It does not get to own the judgment.

## Hosting, Analytics, and the Boring Work

The migration also included work that is easy to forget until it breaks: hosting, redirects, analytics, feeds, SEO metadata, and QA.

The hosting audit confirmed that the Astro site could remain static. Firebase Hosting became the place for redirects and environment-specific deployment targets. The analytics plan separated staging and production GA4 streams so local and staging traffic did not pollute the live site data. Later SEO work added details like `updatedDate` support and noindex handling for tag listing pages.

This was not glamorous, but it is the kind of work that makes a migration complete. A site is not migrated when the home page renders. It is migrated when old URLs work, metadata is sane, deployment is repeatable, and the site can be changed without rediscovering every decision.

## What I Would Keep

The parts I would keep from this process are straightforward.

First, write the strategy before asking agents to implement it. The epic, stories, style guide, visual brief, and migration docs did more than record decisions. They constrained the tools.

Second, move content into typed collections when the framework supports it. Astro content collections made the site's content model clearer and made future teaching materials easier to add.

Third, use React only where the page earns it. Astro's default static posture fits a writing-first site, and islands are enough for the interactive pieces.

Fourth, keep the loops short. Agentic tools are powerful, but long autonomous loops can turn uncertainty into churn. The most useful workflow was still human-directed: plan, implement, run checks, inspect, commit.

Finally, treat a migration as a chance to ask what the site is for now. The old Gatsby site was a functional portfolio. The Astro site is closer to the shape I need today: teaching, writing, software and innovation work, AutoSoftToday, consulting, and a current story about what I am doing.

That is a better outcome than a one-for-one port.
