# Reveal Slide Markdown Guide

This project supports a `slides` course-material type powered by Reveal.js.

Author slide decks in `src/content/course-materials/` using ordinary Markdown frontmatter plus Reveal slide separators.

## Basic Structure

```md
---
title: "My Slide Deck"
description: "Short summary"
courses: ["software-engineering"]
type: "slides"
date: "2026-03-26"
draft: false
---

# Slide One Title

Your opening text goes here.

---

## Slide Two

- First point
- Second point

--

### Vertical Slide

This slide is nested under Slide Two.
```

## Slide Separators

- Use `---` for a new horizontal slide.
- Use `--` for a vertical slide under the current horizontal slide.

## Default Styling

By default, this site’s slide theme:

- centers ordinary slide text
- makes paragraph text larger than normal prose
- keeps headings large and centered
- keeps lists readable with real bullets and more spacing

That means plain Markdown like this:

```md
# Introduction to Software Engineering

A quiet sample deck for the new slides course-material type.
```

will render centered automatically.

## Can I Change Alignment?

Yes, but not with plain Markdown alone.

Standard Markdown does not have built-in alignment controls. Since Reveal is rendering Markdown into HTML, the simplest options are:

1. Use inline HTML for one-off alignment.
2. Add a class or inline style to a small HTML wrapper inside the slide.

Example:

```md
<div style="text-align: left;">

## Left-aligned content

This paragraph and list will align left.

- One
- Two

</div>
```

If you want reusable alignment helpers such as `.align-left` or `.align-right`, that should be added in the slide theme CSS.

## Can I Change Text Size?

Yes, but again not through plain Markdown syntax by itself.

Use inline HTML when you need a one-off size adjustment:

```md
<div style="font-size: 1.25em;">

Important supporting text

</div>
```

Or:

```md
<small>Smaller secondary note</small>
```

For consistent results across many slides, the better approach is to add reusable CSS classes in the theme and apply them via HTML wrappers.

## Practical Patterns

### Large centered title

```md
# Release Planning

What we need to decide today
```

### Left-aligned list on one slide

```md
## Agenda

<div style="text-align: left;">

- Review goals
- Check constraints
- Choose next step

</div>
```

### Smaller note

```md
## Main Point

Keep the primary statement short.

<small>Use the note for context, caveats, or reminders.</small>
```

## Recommendation

Use plain Markdown for most slides.

Use small HTML wrappers only when you need:

- left or right alignment
- one-off font size changes
- special layout within a single slide

If those patterns become common, move them into CSS classes instead of repeating inline styles.
