---
title: Creative Brief — Chronicle Data System
purpose: Define the visual direction and constraints for the site’s editorial palette and functional accent
status: Canonical
audience:
  - Designers
  - Developers
  - AI coding agents
---

# Creative Brief: Chronicle Data System

## Background

This site is a personal, writing-forward space that blends teaching, analysis, and reflective work.  
It is not a marketing site, startup homepage, or product UI.

The color system must support:

- Long-form reading
- Calm focus
- Durability over trends
- Clear cues for timelines, filters, links, and other interactive data views

The logo establishes a near-monochrome identity: **graphite on charcoal**.  
This brief expands that visual language into a complete light and dark theme system with one high-contrast functional accent: **teal**.

---

## Design Objective

Create a color system that feels like:

- **Light mode:** ink on warm paper
- **Dark mode:** graphite on charcoal
- **Interactive data layer:** teal used sparingly to reveal affordance and state

The palette should recede into the background, allowing typography, structure, and ideas to lead. The accent exists to make interaction clearer, not to decorate the page.

Success is measured by _clarity without distraction_, not visual novelty.

---

## Core Principles

1. **Monochrome Discipline**
   - Use neutral, slightly warm tones as the base system
   - Do not introduce additional brand colors

2. **Editorial, Not Product**
   - Avoid UI patterns associated with SaaS dashboards
   - Favor subtle hierarchy over visual emphasis

3. **Durability**
   - The palette should feel appropriate in 2026 and 2036
   - No trend-driven color choices

4. **Accessible Contrast**
   - Teal must meet WCAG AA contrast when used for text or controls
   - State must remain legible in grayscale and for color-blind users

5. **Tone Over Decoration**
   - Prefer spacing, typography, and tonal shifts before borders
   - Depth comes from lightness, not shadows or effects

---

## Color Vocabulary

The system is conceptual, not decorative.

- **Ink** — primary text and meaning
- **Graphite** — structure, headers, logo, emphasis
- **Paper** — reading surfaces and background
- **Teal** — interaction, filtering, active state, and data visualization

No other color roles should be introduced.

---

## Token Palette

### Base Tones: Paper & Ink

| Token          | Hex       | Role                                |
| -------------- | --------- | ----------------------------------- |
| `paper-50`     | `#FFFFFF` | Primary surface                     |
| `paper-100`    | `#F4F3F2` | Warm page background                |
| `ink-800`      | `#1A1A1C` | Primary text for headings and body  |
| `graphite-700` | `#403F41` | Dark background and structural tone |
| `graphite-600` | `#4A494C` | Borders and secondary structure     |

### Accent: Data Layer

| Token         | Hex       | Role                                      |
| ------------- | --------- | ----------------------------------------- |
| `accent-teal` | `#008080` | Links, active states, CTAs, data emphasis |
| `accent-soft` | `#E0F2F2` | Subtle highlights, tags, active regions   |

---

## Theme Snapshots

### Dark Theme

The dark theme is the canonical expression of the brand.

```css
--bg-primary: #403f41; /* charcoal */
--bg-secondary: #2e2d30; /* deep graphite */
--text-primary: #f2f2f2; /* warm off-white */
--text-muted: #b8b7ba;
--accent-strong: #0d0d0f; /* near-black ink */
--accent-soft: #6a696d; /* neutral muted accent */
--interactive-accent: #008080; /* teal data layer */
--border-subtle: #4a494c;
```

Intent:

- Calm, focused, slightly warm
- Never pure black or pure white
- Comfortable for extended reading

### Light Theme

Light mode is intentionally paper-like, not stark white.

```css
--bg-primary: #f4f3f2; /* warm paper */
--bg-secondary: #ffffff;
--text-primary: #1a1a1c; /* graphite ink */
--text-muted: #5c5b5e;
--accent-strong: #403f41; /* charcoal */
--accent-soft: #e0f2f2; /* teal-tinted active region */
--interactive-accent: #008080; /* teal data layer */
--border-subtle: #e1e0e2;
```

Intent:

- Feels printed, not digital
- Gentle contrast suitable for essays and notes
- Avoids the "white canvas" effect

---

## Usage Guidelines

### Backgrounds

- Use `bg-primary` for reading surfaces
- Use `bg-secondary` for cards, nav, and section breaks
- Avoid decorative backgrounds

### Text

- Body text: `text-primary`
- Metadata, captions: `text-muted`
- Headings: darker tone, not heavier weight

### Links

- Underline inline links with the teal accent
- Hover: retain underline and increase structural emphasis, such as decoration thickness or text weight
- Do not rely on color alone for link state

### Buttons

- Primary action: solid teal background with white text
- Secondary action: ghost style with graphite or teal border
- Avoid decorative fills, gradients, glows, and heavy shadows

### Filters, Tabs, and Chips

- Inactive: graphite text on transparent or paper background
- Active: teal text plus a bold underline, weight change, icon, or soft teal background
- The active state must be visible without color perception

### Dividers & Structure

- Prefer spacing and background shifts
- Borders should be rare and subtle

---

## Typography

The preferred pairing is:

- **Newsreader** for narrative headings and body text
- **Manrope** or **Public Sans** for buttons, filters, metadata, and data labels

If the font stack is not yet implemented, keep the current site font stack rather than adding ad hoc font loading in a component.

---

## Explicit Non-Goals

This color system must not:

- Introduce additional brand colors such as blue, purple, red, or orange
- Use gradients or color overlays
- Rely on shadows for separation
- Signal "startup", "portfolio", or "marketing site"

If something looks expressive or flashy, it is likely incorrect.

---

## Accessibility

- Maintain WCAG AA contrast for body text
- Avoid low-contrast decorative text
- Prioritize readability over stylistic subtlety
- Never rely on color alone; use underlines, weight changes, icons, or shape changes to signal state
- Use a minimum 44px hit area for interactive controls

Accessibility is part of durability.

---

## Success Criteria

The color system is successful if:

- The site feels calm and serious
- Readers forget about the UI and focus on content
- Screenshots still look appropriate years later
- New components naturally fit without inventing new colors
- Interactive states remain visible in grayscale

## Guiding Question

When making a decision, ask:

"Does this help the writing and interaction become clearer?"

If the answer is no, simplify.

---
