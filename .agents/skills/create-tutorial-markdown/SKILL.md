---
name: create-course-tutorial-markdown
description: Creates a complete course tutorial markdown post in src/content/course-materials/ that works with the existing course-materials [slug] route and TutorialLayout progress navigation.
author: Todd Warren
version: 1.0.0
keywords:
  - astro
  - course-materials
  - tutorial
  - markdown
  - frontmatter
  - teaching
tags:
  - content
  - workflow
  - documentation
---

# Create Course Tutorial Markdown

Creates a new tutorial-style markdown post for `src/content/course-materials/` that matches the site's content conventions and renders correctly in the tutorial experience.

This skill is specifically aligned to:

- `src/pages/course-materials/[slug].astro` route behavior
- `src/layouts/TutorialLayout.astro` progress-sidebar behavior
- Existing tutorial writing style in `src/content/course-materials/vscode-setup-tutorial.md`

## Outcome

Produce a ready-to-publish tutorial markdown file that:

1. Uses valid frontmatter for course materials.
2. Sets `type: "tutorial"` so the page selects `TutorialLayout`.
3. Includes enough `##` sections for tutorial step progress.
4. Provides practical, student-friendly setup and troubleshooting guidance.
5. Is clear, scannable, and command-accurate.

## Required Inputs

Ask for these before generating if missing:

- Tutorial topic
- Intended audience/course (`courses` value)
- Desired slug (or permission to auto-generate one)
- Target filename
- Publish status (draft or published)
- Any required tools/platform constraints (Mac/Windows, Node version, etc.)

## Workflow

### 1. Confirm Route/Layout Compatibility

Design content so it will render through tutorial layout logic:

- Ensure frontmatter has `type: "tutorial"`.
- Ensure body includes at least **2 or more H2 headings (`##`)**.
- Prefer numbered step sections to match learning flow.

Why: `TutorialLayout.astro` builds progress steps from headings where depth is 2 (`##`). If there are fewer than 2 H2 headings, tutorial progress UI will not appear.

### 2. Build Frontmatter

Use this template:

```yaml
---
title: "Your Tutorial Title"
description: "One-sentence summary of what students will accomplish."
courses: ["software-engineering"]
type: "tutorial"
date: "YYYY-MM-DD"
slug: "your-slug-if-needed"
draft: false
---
```

Rules:

- `type` must be `"tutorial"`.
- `courses` should be an array.
- Use ISO date format (`YYYY-MM-DD`).
- Keep title and description concise and outcomes-oriented.
- Add `draft: true` if not ready to publish.

### 3. Write Tutorial Body Structure

Recommended structure:

1. `## Overview`
2. `## Step 1: ...`
3. `## Step 2: ...`
4. `## Step 3: ...` (as needed)
5. `## Troubleshooting`
6. `## Next Steps`

Guidelines:

- Use H3 (`###`) for OS-specific or optional subsections.
- Use fenced code blocks with language identifiers (`bash`, `json`, `powershell`).
- Keep paragraphs short and instructional.
- Include verification checkpoints after major setup steps.
- Prefer concrete commands over abstract guidance.

### 4. Apply Style and Clarity Checks

Ensure the draft is:

- Student-friendly and direct
- Specific about expected output/results
- Free of ambiguous "maybe/sometimes" instructions
- Consistent in command formatting and terminology
- Structured for skim reading (lists, headings, short sections)

### 5. Validate Before Finalizing

Run this checklist:

- Frontmatter present and well-formed
- `type: "tutorial"` included
- At least 2 H2 sections (`##`)
- Commands are syntactically valid
- Links appear correct and relevant
- Troubleshooting section included for common failure modes
- "Next Steps" gives clear continuation path

## Decision Points

### Draft vs Publish

- Use `draft: true` if prerequisites or command versions are uncertain.
- Use `draft: false` when commands and links are validated.

### Cross-Platform Scope

- If both Mac and Windows matter, include clearly labeled subsections under each step.
- If only one platform is in scope, state that explicitly in Overview.

### Tool Version Specificity

- Include minimum versions when required for course success.
- If versions vary by class term, note acceptable range and verification command.

## File Placement

Create files in:

- `src/content/course-materials/<slug>.md`

Filename best practices:

- Kebab-case
- Topic-first naming
- Match or align with slug if slug is present

## Output Format for Agent Responses

When generating, return:

1. Proposed filename
2. Complete markdown content
3. Quick validation summary:
   - Frontmatter valid
   - Tutorial type set
   - H2 count
   - Any assumptions to confirm

## Example Prompts

- "Create a tutorial markdown post for setting up Astro + TypeScript for software engineering students."
- "Draft a tutorial for installing Firebase CLI and validating login on Mac and Windows."
- "Generate a course tutorial for configuring Vitest in a React TypeScript project, marked as draft."

## Completion Criteria

The skill is complete when:

1. A full markdown tutorial is produced.
2. It is saved to `src/content/course-materials/` (or provided ready to save).
3. It satisfies route/layout compatibility constraints.
4. It passes the validation checklist above.
5. Any assumptions are clearly listed for instructor review.
