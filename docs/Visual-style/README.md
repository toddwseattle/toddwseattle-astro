## UI & Style Constraints (Read Before Making Changes)

This site uses a **strict monochrome editorial color system** with design tokens.

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

**Always use token classes** (e.g., `text-ink-800`, `bg-paper-100`), never raw hex values.

### Core Rules

- Only neutral, slightly warm tones are allowed
- No accent colors
- No gradients
- No decorative shadows
- No visual noise

### Design Priority

Writing > layout > components > color

### Color Model

- Ink = text
- Graphite = structure
- Paper = background

### Interaction

- Links use underline, not color
- Active states use opacity or tone
- No animated color effects

### Decision Rule

If unsure, choose the quieter option.

If a UI change makes the site feel more expressive,
marketing-oriented, or “designed” —
**revert it**.

The goal is durability, calm, and clarity.
