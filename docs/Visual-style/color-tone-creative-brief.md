---
title: Creative Brief — Monochrome Color System
purpose: Define the visual direction and constraints for the site’s neutral color palette
status: Canonical
audience:
  - Designers
  - Developers
  - AI coding agents
---

# Creative Brief: Monochrome Color System

## Background

This site is a personal, writing-forward space that blends teaching, analysis, and reflective work.  
It is not a marketing site, startup homepage, or product UI.

The color system must support:

- Long-form reading
- Calm focus
- Durability over trends

The logo establishes a near-monochrome identity: **graphite on charcoal**.  
This brief expands that visual language into a complete light and dark theme system.

---

## Design Objective

Create a color system that feels like:

- **Light mode:** ink on warm paper
- **Dark mode:** graphite on charcoal

The palette should recede into the background, allowing typography, structure, and ideas to lead.

Success is measured by _absence of distraction_, not visual novelty.

---

## Core Principles

1. **Monochrome Discipline**
   - Use only neutral, slightly warm tones
   - No saturated accent colors

2. **Editorial, Not Product**
   - Avoid UI patterns associated with SaaS dashboards
   - Favor subtle hierarchy over visual emphasis

3. **Durability**
   - The palette should feel appropriate in 2026 and 2036
   - No trend-driven color choices

4. **Tone Over Contrast**
   - Prefer tonal shifts instead of borders or decorations
   - Depth comes from lightness, not color

---

## Color Vocabulary

The system is conceptual, not decorative.

- **Ink** — primary text and meaning
- **Graphite** — structure, headers, logo, emphasis
- **Paper** — reading surfaces and background

No other color roles should be introduced.

---

## Dark Theme

The dark theme is the canonical expression of the brand.

````css
--bg-primary:    #403F41; /* charcoal */
--bg-secondary:  #2E2D30; /* deep graphite */
--text-primary:  #F2F2F2; /* warm off-white */
--text-muted:    #B8B7BA;
--accent-strong: #0D0D0F; /* near-black ink */
--accent-soft:   #6A696D;
--border-subtle: #4A494C;
Intent

Calm, focused, slightly warm

Never pure black or pure white

Comfortable for extended reading

Light Theme

Light mode is intentionally paper-like, not stark white.

```css
--bg-primary:    #F4F3F2; /* warm paper */
--bg-secondary:  #FFFFFF;
--text-primary:  #1A1A1C; /* graphite ink */
--text-muted:    #5C5B5E;
--accent-strong: #403F41; /* charcoal */
--accent-soft:   #8A898D;
--border-subtle: #E1E0E2;
````

Intent

Feels printed, not digital

Gentle contrast suitable for essays and notes

Avoids the “white canvas” effect

Usage Guidelines
Backgrounds

Use bg-primary for reading surfaces

Use bg-secondary for cards, nav, and section breaks

Avoid decorative backgrounds

Text

Body text: text-primary

Metadata, captions: text-muted

Headings: darker tone, not heavier weight

Links

Same color as body text

Hover: underline + subtle darkening

No color-coded link states

Dividers & Structure

Prefer spacing and background shifts

Borders should be rare and subtle

Explicit Non-Goals

This color system must not:

Introduce brand colors (blue, green, purple, etc.)

Use gradients or color overlays

Rely on shadows for separation

Signal “startup”, “portfolio”, or “marketing site”

If something looks expressive or flashy, it is likely incorrect.

Accessibility

Maintain WCAG AA contrast for body text

Avoid low-contrast decorative text

Prioritize readability over stylistic subtlety

Accessibility is part of durability.

Success Criteria

The color system is successful if:

The site feels calm and serious

Readers forget about the UI and focus on content

Screenshots still look appropriate years later

New components naturally fit without inventing new colors

Guiding Question

When making a decision, ask:

“Does this help the writing disappear less?”

If the answer is no, simplify.

---

