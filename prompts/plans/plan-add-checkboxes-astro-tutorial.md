# Plan (Updated): Tutorial Layout with Heading-Based Gutter + Checkboxes

## Goal

Extend the tutorial gutter to include **per-step checkboxes** that let readers manually mark steps as completed.

Checkbox state:

- Is **independent of scroll-based “active step”**
- Persists via `localStorage`
- Is scoped per tutorial slug

This gives:

- Scroll-based progress (where am I?)
- Learner-controlled progress (what have I done?)

---

## Key Design Principle

> **Scroll position determines “active step”**
> **Checkboxes determine “completed by learner”**

They are related but **not the same thing**.

---

## Step 1: Data model for checkbox state

### Storage key

Use a deterministic, per-tutorial key:

```ts
tutorial-progress:${slug}
```

### Stored shape (localStorage)

```ts
{
  "setup-project": true,
  "define-schema": true,
  "write-queries": false
}
```

- Keys correspond to heading `id` / slug
- Missing key = unchecked
- No timestamps (keep it simple)

---

## Step 2: Extend `TutorialProgress.tsx`

### Component responsibilities (expanded)

- Track **active step** (IntersectionObserver)
- Track **checked steps** (localStorage-backed state)
- Render step list with:
  - Checkbox
  - Label (anchor link)
  - Active styling

---

## Step 3: Checkbox behavior rules

### On initial load

1. Read `localStorage[tutorial-progress:${slug}]`
2. Initialize checkbox state
3. Do **not** auto-check anything based on scroll

---

### On checkbox toggle

```ts
function toggleStep(stepId: string) {
  setChecked((prev) => {
    const next = { ...prev, [stepId]: !prev[stepId] };
    localStorage.setItem(storageKey, JSON.stringify(next));
    return next;
  });
}
```

Rules:

- User action always wins
- No auto-unchecking
- Scroll does not modify checkbox state

---

## Step 4: Rendering logic (checkbox + scroll state)

Each step has **two independent states**:

| Concern | Derived from    |
| ------- | --------------- |
| Active  | Scroll position |
| Checked | localStorage    |

### Status derivation

```ts
const isChecked = checkedSteps[step.id] === true;
const isActive = index === activeIndex;
```

### Visual precedence (important)

1. **Active step** → highlighted (even if unchecked)
2. **Checked step** → checkmark + muted label
3. **Unchecked + inactive** → default

Active ≠ checked.

---

## Step 5: Gutter UI structure

### Suggested markup

```tsx
<li className={cx({ active: isActive })}>
  <label>
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => toggleStep(step.id)}
    />
    <a href={`#${step.id}`}>{step.label}</a>
  </label>
</li>
```

### Accessibility requirements

- Checkbox is keyboard focusable
- Clicking label text toggles checkbox
- Anchor still navigates

---

## Step 6: Optional auto-check enhancement (safe default = OFF)

**Optional behavior (feature-flagged):**

> Auto-check a step when the _next_ step becomes active

If implemented:

- Only auto-check if the user has not interacted yet
- Never uncheck

This should be behind a constant:

```ts
const AUTO_CHECK_ON_SCROLL = false;
```

Leave it disabled for v1.

---

## Step 7: Progress summary (optional but recommended)

At top of gutter:

```ts
const completedCount = Object.values(checkedSteps).filter(Boolean).length;
```

Display:

```
Progress: 2 / 5 steps completed
```

This reflects **learner progress**, not scroll position.

---

## Step 8: Reset behavior

Add a subtle “Reset” control at bottom of gutter:

- Clears localStorage key
- Resets all checkboxes
- Does NOT affect scroll state

This is extremely helpful for:

- Re-doing labs
- Teaching demos
- Students revisiting material

---

## Step 9: Mobile considerations (unchanged)

- On mobile, checkbox list may be:
  - Hidden behind “Steps” toggle
  - Or rendered inline at top

- Checkbox logic remains identical

---

## Step 10: Acceptance criteria (updated)

- Tutorial pages render a left gutter
- Gutter shows checkboxes per `##` heading
- Checkbox state persists across reloads
- Scroll highlights active step independently
- Non-tutorial content unaffected
- No author changes beyond writing `##` headings

---

## Authoring rule (update documentation)

create authoring docs to explain how to use the new tutorial layout with checkboxes.

place in `docs/tutorial-layout-authoring.md`:

> **Tutorial steps are defined by `##` headings.**
>
> The left gutter automatically:
>
> - Builds navigation
> - Tracks scroll position
> - Allows learners to check off completed steps
>
> No extra frontmatter is required.

---
