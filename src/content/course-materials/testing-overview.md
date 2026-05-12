---
title: "Testing Overview 2026"
description: "Unit testing with Vitest, E2E with Playwright, Testing Library, Canon TDD, and creating tests with GenAI"
courses: ["software-engineering"]
type: "slides"
date: "2026-05-12"
draft: false
---

<!-- ─────────────────────────────────────────────
     NAVIGATION:
     →  (horizontal) moves to the next major concept
     ↓  (vertical)   drills into technical detail
     ───────────────────────────────────────────── -->

# Testing Overview

## The most important thing you're not doing

---

## Readings

<div style="text-align: left;">

- These slides
- [The Agile Samurai](https://pragprog.com/titles/jtrap/the-agile-samurai/) — Ch. 12, 14, 15
- Fowler: [Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)
- Kent Dodds: [Common Testing Library Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Vitest docs](https://vitest.dev) · [Playwright docs](https://playwright.dev) · [Testing Library docs](https://testing-library.com)
- Kent Beck: [Canon TDD](https://tidyfirst.substack.com/p/canon-tdd)

</div>

---

## The Cost of Bugs

<div style="text-align: left;">

**The Zune Bug (2008)** — 31 million devices bricked on Dec 31. A leap-year loop ran forever. No test caught it.

**Boeing 737 MAX** — MCAS software was inadequately tested. 346 lives lost.

These aren't hypotheticals. Every untested line is a timebomb.

</div>

---

## Why We Don't Test

<div style="text-align: left;">

**The excuses**

- Client wants new features _now_
- Writing tests will delay delivery
- We'll add tests later _(we won't)_

**The root causes**

- By end of sprint, no time remains
- Manual testing is tedious and gets skipped
- Pain compounds as the project grows

**Solution:** Automate running tests — build the forcing function in.

</div>

---

## Types of Testing

The Testing Trophy — Kent Dodds' model

<div style="text-align: left;">

| Layer                   | Volume   | Speed          | Value                        |
| ----------------------- | -------- | -------------- | ---------------------------- |
| **E2E**                 | Few      | Slow (seconds) | High confidence              |
| **Integration** ⭐      | Moderate | Fast           | Highest ROI                  |
| **Unit**                | Many     | Very fast (ms) | Precise isolation            |
| **Static (TypeScript)** | —        | Instant        | Catch types & typos for free |

The sweet spot is **integration tests** — multiple units working together, without a full browser.

</div>

---

## Five Types of Testing

<div style="text-align: left;">

| Type                   | Purpose                                     | Who            |
| ---------------------- | ------------------------------------------- | -------------- |
| **User testing**       | _Detect_ UX problems with real people       | Designers / PM |
| **Acceptance testing** | _Define_ story requirements just-in-time    | Client + devs  |
| **Unit testing**       | _Define_ & verify behavior of code units    | Developers     |
| **End-to-end (E2E)**   | _Detect_ inter-module failures in a browser | Developers     |
| **Stress testing**     | _Detect_ scale, load, attack failures       | Devs / ops     |

We focus on **unit**, **integration**, and **E2E** — the ones you'll write every sprint.

</div>

---

## E2E Failure → Missing Unit Test

<div style="text-align: left;">

If an E2E test fails when component A calls component B, one of these is true:

- **A sent bad data to B** → add a unit test on `A`
- **A failed to handle B's response** → add a unit test on `A`
- **B failed to handle valid data** → add a unit test on `B`
- **B returned bad data** → add a unit test on `B`

An E2E failure almost always reveals a _missing_ unit test.
Write the unit test first — don't just fix the code.

</div>

---

## The 2026 Testing Stack

<div style="text-align: left;">

These are the current standards for TypeScript + React projects.
Your Tribe 2 project uses this stack.

| Tool                      | Role                                                          |
| ------------------------- | ------------------------------------------------------------- |
| **Vitest**                | Unit & integration tests — Vite-native, fast, Jest-compatible |
| **React Testing Library** | Component tests — query by role, test behavior                |
| **Playwright**            | End-to-end tests — cross-browser, auto-waits                  |
| **GitHub Actions**        | CI — runs all tests on every push                             |

Use the arrows below to drill into each tool ↓

</div>

---

## Vitest

Unit & integration testing for Vite + TypeScript

↓ for setup and usage

--

## Vitest Setup

<div style="text-align: left;">

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add a `test` block to `vite.config.ts` — no separate config file needed:

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: { provider: "v8", reporter: ["text", "html"] },
  },
});
```

```typescript
// src/test/setup.ts
import "@testing-library/jest-dom";
```

```bash
npx vitest          # watch mode
npx vitest run      # single pass (CI)
npx vitest run --coverage
```

</div>

--

## Your First Vitest Test

<div style="text-align: left;">

```typescript
// src/utils/formatDate.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats a date as YYYY-MM-DD", () => {
    expect(formatDate(new Date("2026-03-15"))).toBe("2026-03-15");
  });

  it("handles leap year correctly", () => {
    expect(formatDate(new Date("2024-02-29"))).toBe("2024-02-29");
  });

  it("throws on invalid input", () => {
    expect(() => formatDate(null as any)).toThrow("Invalid date");
  });
});
```

Name files `*.test.ts` or `*.spec.ts` — Vitest finds them automatically.

</div>

--

## Key Vitest APIs

<div style="text-align: left;">

**Structure:** `describe` · `it` · `beforeEach` · `afterEach` · `it.skip` · `it.only`

**Common matchers:**

```typescript
expect(value).toBe(exact);
expect(value).toEqual(deep);
expect(fn).toThrow("message");
expect(fn).toHaveBeenCalledWith(arg);

// @testing-library/jest-dom
expect(el).toBeInTheDocument();
expect(el).toHaveClass("active");
expect(el).not.toHaveClass("opacity-50"); // ← not.toHaveClass, not toNotHaveClass
```

**Mocking:**

```typescript
import { vi } from "vitest";
vi.mock("./api");
const spy = vi.fn().mockResolvedValue({ name: "Alice" });
```

</div>

---

## React Testing Library

Test the way your users interact with your app

↓ for principles and usage

--

## The Guiding Principle

> _"The more your tests resemble the way your software is used,_
> _the more confidence they can give you."_
>
> — Kent C. Dodds

<div style="text-align: left;">

**Don't** query by CSS class, reach into component state, or test implementation details.

**Do** query by role/label, assert on what the user _sees and does_.

</div>

--

## Query Priority

<div style="text-align: left;">

Prefer queries that match what users and screen readers experience:

1. `getByRole` — best; mirrors what screen readers see
2. `getByLabelText` — great for form inputs
3. `getByPlaceholderText` — inputs without labels
4. `getByText` — non-interactive elements
5. `getByTestId` — escape hatch, use sparingly
6. `.querySelector` — avoid; tests implementation, not behavior

If a query breaks when you refactor _without changing visible behavior_, it's testing the wrong thing.

</div>

--

## userEvent, not fireEvent

<div style="text-align: left;">

**`fireEvent`** fires a single synthetic event. It skips hover, focus, and keyboard sequences — tests may pass while real interactions fail.

**`userEvent`** simulates real browser event sequences:

```typescript
import userEvent from "@testing-library/user-event";

const user = userEvent.setup(); // once per test

await user.click(button); // pointer down → up → click → focus
await user.type(input, "hello"); // key by key
await user.keyboard("{Enter}");
```

The Testing Library docs are explicit: `userEvent` is the right choice.

</div>

--

## Component Test Example

<div style="text-align: left;">

```typescript
// TeamList.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TeamProvider } from './TeamContext'
import { TeamList } from './TeamList'

const renderTeamList = () =>
  render(<TeamProvider><TeamList /></TeamProvider>)

it('removes a member from rotation when clicked', async () => {
  renderTeamList()
  const user = userEvent.setup()

  // getByRole — not getByText — to get the interactive button
  const alice = screen.getByRole('button', { name: /alice/i })

  await user.click(alice)
  expect(alice).toHaveClass('opacity-50')

  await user.click(alice)
  expect(alice).not.toHaveClass('opacity-50')
})
```

Test `TeamList` directly — not the whole `App`.

</div>

---

## Playwright

End-to-end testing for the full user journey

↓ for setup and usage

--

## Playwright Setup

<div style="text-align: left;">

```bash
npm install -D @playwright/test
npx playwright install        # downloads browsers
```

`playwright.config.ts` lives separately from `vite.config.ts`. Keep E2E tests in `e2e/`.

```bash
npx playwright test           # run all E2E tests
npx playwright test --ui      # interactive UI mode
npx playwright codegen http://localhost:5173   # record clicks → code
```

</div>

--

## Your First Playwright Test

<div style="text-align: left;">

```typescript
// e2e/team-rotation.spec.ts
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("removes a member from rotation", async ({ page }) => {
  const alice = page.getByRole("button", { name: /alice/i });
  await expect(alice).toBeVisible();

  await alice.click();
  await expect(alice).toHaveClass(/opacity-50/);
});

test("member returns after clicking again", async ({ page }) => {
  const bob = page.getByRole("button", { name: /bob/i });
  await bob.click();
  await bob.click();
  await expect(bob).not.toHaveClass(/opacity-50/);
});
```

Same query style as Testing Library — prefer role and label over CSS.

</div>

--

## Playwright Auto-Waits

<div style="text-align: left;">

No `cy.wait(2000)` or arbitrary sleeps. Playwright retries until conditions are met:

```typescript
// Waits for button to be visible, enabled, and stable before clicking
await page.getByRole("button").click();

// Explicit timeout when you need it
await expect(page.getByText("Saved")).toBeVisible({ timeout: 5000 });
```

Tests are faster and less flaky because they wait exactly as long as needed — no more.

</div>

---

## Canon TDD

Kent Beck's definition

↓ for the five steps

--

## The Five Steps

<div style="text-align: left;">

1. **Write a list** of all the test scenarios you want to cover
2. **Turn exactly one** item into a real, runnable, asserting test
3. **Change the code** to make the test (and all previous tests) pass — add new discoveries to the list
4. **Optionally refactor** to improve the implementation design
5. **Until the list is empty**, go back to step 2

</div>

<small>_"If you're going to critique TDD, critique this — not a strawman."_ — Kent Beck</small>

--

## Step 1: Write the Test List

<div style="text-align: left;">

Before writing any code, list all the behavioral variants of the change you need to make.

_"There's the basic case — and what if the service times out — and what if the key isn't in the database yet — and…"_

This is **behavioral analysis only** — not implementation design.

**Common mistake:** mixing in implementation sketches. List the cases first. You'll do a better job of thinking about behavior when that's all you're thinking about.

</div>

--

## Step 2: Write One Test

<div style="text-align: left;">

Turn **one** item from the list into a real, automated test with setup, invocation, and assertions.

This is where interface design decisions happen — how behavior is _invoked_, not how it's implemented.

**Common mistakes:**

- Writing tests without assertions (for coverage only)
- Converting the _whole list_ into concrete tests at once — then test #1 causes you to rethink decisions baked into tests 2–6. Rework.
- Going six tests deep without seeing anything pass — boredom and doubt set in

Picking _which_ test to write next is a skill. It matters more than most people realize.

</div>

--

## Step 3: Make It Pass

<div style="text-align: left;">

Change the code so the test passes. Keep it simple — make it _run_, then make it _right_.

**Common mistakes:**

- Deleting assertions so the test _appears_ to pass — make it pass for real
- Pasting computed values into `expected` — that defeats the double-checking that makes TDD valuable
- Mixing refactoring into going green — **one hat at a time**

If you discover a needed test while going red → green, add it to the list. Don't code it yet. Mark this test off the list when it passes.

</div>

--

## Step 4: Optionally Refactor

<div style="text-align: left;">

_Now_ you make implementation design decisions — with a passing test as a safety net.

**Common mistakes:**

- Refactoring further than this session needs
- Abstracting too soon — _duplication is a hint, not a command_

Step 4 is genuinely optional. If the code is already clean, skip it and go back to step 2.

</div>

--

## 🔴 Red → 🟢 Green → 🔵 Refactor

One cycle at a time. Don't skip steps.

<div style="text-align: left;">

```
🔴  Write a failing test (one test — see it fail)
🟢  Write the minimum code to pass it
🔵  Refactor if needed, then back to 🔴
```

_"Keep testing and coding until your fear for the behavior of the code has been transmuted into boredom."_
— Kent Beck

</div>

---

## CI and Coverage

<div style="text-align: left;">

Every push runs your tests in a clean environment. PRs can't merge if they fail.

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run test:unit
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

**Coverage goal:** 100% line coverage on business logic. Any untested code is a timebomb.
`npx vitest run --coverage` → `open coverage/index.html`

</div>

--

## Keeping Tests Healthy

<div style="text-align: left;">

**Why tests break**

- UI changes break brittle selectors
- Schema changes break unit tests
- Live data shifts break integration tests

**How to keep them healthy**

- Query by role/label, not CSS class
- Test **public behavior** only — not implementation internals
- Never run tests on production data
- Delete flaky tests rather than `it.skip` them indefinitely

</div>

---

## GenAI and Testing

How AI fits into your testing workflow

---

## The Lab: You vs. Copilot

<div style="text-align: left;">

Before writing a test with AI, write it yourself first.

Then give the same prompt to Copilot and compare honestly:

- What did it get right that you missed?
- What did you get right that it missed?
- What would you add to the prompt so it matches your project's conventions?

See the lab doc for the full prompt, your starter code, and the comparison rubric.

</div>

---

## Creating Tests with GenAI

<div style="text-align: left;">

AI is good at structure and boilerplate. You are responsible for what gets tested.

1. Provide the **component source** as context
2. Specify your **stack** explicitly — Vitest, Testing Library, `userEvent`
3. Describe the **behavior** in user terms
4. Ask for **edge cases**
5. **Review** before running — don't trust without reading
6. **Iterate** — paste errors back, ask follow-ups

</div>

--

## A Good Test-Generation Prompt

<div style="text-align: left;">

```
Stack: Vitest + React Testing Library + userEvent (not fireEvent). TypeScript.

Component: [paste source here]

Tests to write:
1. A member is removed from rotation when clicked (opacity-50 class added)
2. Clicking again restores the member
3. At least one member always remains active

Rules:
- Query by role or label, not CSS class or data attributes
- Use userEvent.setup() and await user.click()
- Use not.toHaveClass, never toNotHaveClass
- Wrap renders in a renderTeamList() helper
```

Save as `.github/copilot-instructions.md` so VS Code applies it to every generation in the project.

</div>

--

## Iterating with AI

<div style="text-align: left;">

**When tests fail:** paste the error back.

> _"This fails with: [error]. Here's the component. What's wrong?"_

**When tests pass but feel brittle:**

> _"Could this test pass even if [specific behavior] broke? If so, strengthen it."_

**Don't let AI choose what to test** — that requires understanding the user story. AI tests what it _thinks_ matters. The list of scenarios (step 1 of Canon TDD) is yours to write.

</div>

---

## Start Small

<div style="text-align: left;">

1. Write an _ARE WE UP?_ test — does the app render without crashing?
2. Write _happy path_ tests — the thing users do most
3. Add a test for every bug that escapes to production
4. Add edge cases when you think "what if..."

One test is infinitely more than zero. High-performing teams (per DORA) deploy more frequently _and_ have lower failure rates — because of automated testing.

</div>

---

# Now go write some tests.

_"Any application code not covered by a test is a timebomb waiting to fail."_

<small>[vitest.dev](https://vitest.dev) · [playwright.dev](https://playwright.dev) · [testing-library.com](https://testing-library.com) · [Canon TDD](https://tidyfirst.substack.com/p/canon-tdd)</small>
