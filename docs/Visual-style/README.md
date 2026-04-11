## UI & Style Constraints (Read Before Making Changes)

This site uses the **Chronicle Data System**: an editorial, writing-first color system with a restrained teal accent for interaction, filtering, and data visualization.

### Quick Links

- **[How to Use Styles](./using-styles.md)** - Practical guide with code examples
- [Short Color Brief](./short-color-brief.md) - Visual reference for the palette
- [Full Color Tone Creative Brief](./color-tone-creative-brief.md) - Design rationale
- [Typography Brief](./typography-brief.md) - Font and text guidelines

### Design Tokens

All colors are defined in `tailwind.config.js` as custom tokens:

- `ink-*` - Text colors
- `graphite-*` - Structure/borders
- `paper-*` - Backgrounds
- `surface-*` - Card surfaces
- `accent-*` - Interactive and data-layer emphasis

**Always use token classes** (e.g., `text-ink-800`, `bg-paper-100`), never raw hex values.

### Core Rules

- Neutral, slightly warm tones remain the base system
- Use teal only for functional emphasis: links, active states, CTAs, filters, and data visualization
- No gradients
- No decorative shadows
- No visual noise
- Never rely on color alone; pair accent color with underline, weight, icons, or shape

### Design Priority

Writing > layout > components > color

### Color Model

- Ink = text
- Graphite = structure
- Paper = background
- Teal = interactive and data layer

### Interaction

- Links use underline plus `accent-teal`
- Active states use structure plus color: underline, weight change, icon, or `accent-soft`
- No animated color effects
- Interactive targets should have a minimum 44px hit area

### Decision Rule

If unsure, choose the quieter option and preserve readability.

If a UI change makes the site feel more expressive,
marketing-oriented, or “designed” —
**revert it**.

The goal is durability, calm, clarity, and accessible interaction cues.
