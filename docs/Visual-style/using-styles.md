# Using the Monochrome Design System

This document explains how to use the design token system for consistent styling across the site.

## Design Tokens

All colors are defined as Tailwind CSS custom colors in `tailwind.config.js`. **Never use raw hex values** - always use the token classes.

### Available Tokens

#### Ink (Text & Content)

| Token     | Hex       | Usage                             |
| --------- | --------- | --------------------------------- |
| `ink-950` | `#0D0D0F` | Darkest text, footer background   |
| `ink-800` | `#1A1A1C` | **Primary text** (headings, body) |
| `ink-600` | `#5C5B5E` | Secondary text, body copy         |

#### Graphite (Structure)

| Token          | Hex       | Usage                       |
| -------------- | --------- | --------------------------- |
| `graphite-700` | `#403F41` | **Dark mode background**    |
| `graphite-600` | `#4A494C` | Borders, dividers           |
| `graphite-400` | `#8A898D` | Muted text, link underlines |

#### Paper (Backgrounds)

| Token       | Hex       | Usage                 |
| ----------- | --------- | --------------------- |
| `paper-50`  | `#FFFFFF` | Card surfaces         |
| `paper-100` | `#F4F3F2` | **Page background**   |
| `paper-200` | `#ECEBEC` | Secondary backgrounds |

#### Surface (Cards)

| Token           | Hex       | Usage               |
| --------------- | --------- | ------------------- |
| `surface-light` | `#FFFFFF` | Light mode cards    |
| `surface-dark`  | `#2E2D30` | **Dark mode cards** |

---

## Common Patterns

### Text Colors

```html
<!-- Primary text -->
<h1 class="text-ink-800 dark:text-paper-100">Heading</h1>

<!-- Secondary/body text -->
<p class="text-ink-600 dark:text-paper-200">Body copy</p>

<!-- Muted text (dates, metadata) -->
<span class="text-graphite-400">Jan 1, 2024</span>
```

### Backgrounds

```html
<!-- Page background -->
<body class="bg-paper-100 dark:bg-graphite-700">
  <!-- Card/surface -->
  <div class="bg-paper-50 dark:bg-surface-dark">
    <!-- Subtle section -->
    <section class="bg-paper-200 dark:bg-graphite-700"></section>
  </div>
</body>
```

### Borders

```html
<!-- Light border -->
<div class="border border-graphite-600/20 dark:border-graphite-600">
  <!-- Hover state -->
  <div
    class="border-graphite-600/20 hover:border-graphite-400 dark:hover:border-ink-600"
  ></div>
</div>
```

### Links

**Important:** Links use underline for interaction, not color change.

```html
<!-- Standard link -->
<a
  class="text-ink-800 dark:text-paper-100 underline decoration-graphite-400 hover:decoration-ink-800 dark:hover:decoration-paper-100"
>
  Link text
</a>
```

### Buttons

```html
<!-- Primary button -->
<button
  class="bg-ink-800 text-paper-50 hover:bg-ink-950 dark:bg-paper-100 dark:text-ink-800 dark:hover:bg-paper-200"
>
  Primary
</button>

<!-- Secondary button -->
<button
  class="bg-paper-200 text-ink-800 hover:bg-graphite-400/20 dark:bg-graphite-600 dark:text-paper-100"
>
  Secondary
</button>
```

### Tags/Badges

```html
<!-- Monochrome badge -->
<span
  class="bg-paper-200 text-ink-800 dark:bg-graphite-600 dark:text-paper-100 px-2.5 py-0.5 rounded-full text-xs font-medium"
>
  Tag
</span>
```

### Cards

```html
<article
  class="bg-paper-50 dark:bg-surface-dark rounded-lg border border-graphite-600/20 dark:border-graphite-600 hover:border-graphite-400 dark:hover:border-ink-600"
>
  <h3 class="text-ink-800 dark:text-paper-100">Title</h3>
  <p class="text-ink-600 dark:text-paper-200">Description</p>
</article>
```

---

## What NOT to Do

❌ **Don't use raw hex values:**

```html
<!-- BAD -->
<div class="dark:bg-[#403F41] dark:text-[#F2F2F2]"></div>
```

✅ **Use design tokens:**

```html
<!-- GOOD -->
<div class="dark:bg-graphite-700 dark:text-paper-100"></div>
```

❌ **Don't use color for links:**

```html
<!-- BAD -->
<a class="text-blue-600 hover:text-blue-800"></a>
```

✅ **Use underline for links:**

```html
<!-- GOOD -->
<a
  class="text-ink-800 underline decoration-graphite-400 hover:decoration-ink-800"
></a>
```

❌ **Don't use colored badges:**

```html
<!-- BAD -->
<span class="bg-blue-100 text-blue-800"></span>
```

✅ **Use monochrome badges:**

```html
<!-- GOOD -->
<span
  class="bg-paper-200 text-ink-800 dark:bg-graphite-600 dark:text-paper-100"
></span>
```

---

## Dark Mode

All components should support dark mode using the `dark:` prefix:

```html
<div
  class="bg-paper-100 dark:bg-graphite-700 text-ink-800 dark:text-paper-100"
></div>
```

**Dark mode token mapping:**

- Background: `graphite-700`
- Surface/cards: `surface-dark`
- Primary text: `paper-100`
- Secondary text: `paper-200`
- Muted text: `graphite-400`
- Borders: `graphite-600`

---

## Files Reference

- **Token definitions:** `tailwind.config.js`
- **Global prose styles:** `src/assets/styles/global.css`
- **Design brief:** `docs/Visual-style/short-color-brief.md`
- **Migration tracking:** `docs/style-todos.md`
