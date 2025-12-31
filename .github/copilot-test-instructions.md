# GitHub Copilot Test Generation Instructions

## Core Testing Rules

Always use Vitest and never Jest.

Mock sub components using `vi.mock` and not `jest.mock`.

Create mock sub components rather than using the real ones unless specified otherwise.

Place all tests in a describe block. Create sub describe blocks for specific methods or functionality within the component.

Indicate you are using these copilot test instructions in the first line of your test file.

## Incremental Test Development (CRITICAL)

**DON’T** generate all tests at once with `/tests` command.
**DO** build tests incrementally:

1. Start with a basic render test
1. Add one test case at a time
1. Fix errors immediately before proceeding
1. Verify each test passes before adding next
1. Build up complexity gradually

**Why Incremental?**

- Prevents mixed Jest/Chai matchers
- Avoids testing non-existent functionality
- Prevents cascade of errors
- Makes debugging easier

## Test File Structure

```typescript
// Copilot test instructions: Using vitest, mock subcomponents with vi.mock, and group tests in describe blocks

import { describe, it, expect, vi } from ‘vitest’
import { render, screen, fireEvent } from ‘@testing-library/react’
import ‘@testing-library/jest-dom’
import { ComponentName } from ‘./ComponentName’

// Mock child components
vi.mock(‘../ChildComponent/ChildComponent’, () => ({
  default: () => <div data-testid=“mock-child” />
}))

describe(‘ComponentName’, () => {
  describe(‘when given empty props’, () => {
    it(‘renders the default state’, () => {
      render(<ComponentName />)
      expect(screen.getByTestId(‘component-name’)).toBeInTheDocument()
    })
  })

  describe(‘when user interacts’, () => {
    it(‘calls the callback’, () => {
      const mockCallback = vi.fn()
      render(<ComponentName onAction={mockCallback} />)
      
      const button = screen.getByRole(‘button’)
      fireEvent.click(button)
      
      expect(mockCallback).toHaveBeenCalledTimes(1)
    })
  })

  // Add more test groups incrementally
})
```

## Required Test Libraries

```typescript
import { describe, it, expect, vi } from ‘vitest’
import { render, screen, fireEvent } from ‘@testing-library/react’
import ‘@testing-library/jest-dom’
```

## Common Test Pitfalls

### ❌ Don’t:

- Assume `data-testid` exists (add them to components first)
- Use `jest.fn()` (use `vi.fn()` instead)
- Use `jest.mock()` (use `vi.mock()` instead)
- Test CSS exact values (React Testing Library returns computed styles like `rgb(255,0,0)` for `color: red`)
- Generate all tests at once
- Test implementation details

### ✅ Do:

- Mock child components with `vi.mock()`
- Place tests in describe blocks
- Use sub-describe blocks for different scenarios
- Test behavior, not implementation
- Build tests incrementally
- Add `data-testid` to components for testing
- Use vi.fn() for all mocks
- Verify matchers exist in Vitest

## Mocking Patterns

### Mock Child Components

```typescript
vi.mock(‘../ChildComponent/ChildComponent’, () => ({
  default: () => <div data-testid=“mock-child” />
}))

// For components with props
vi.mock(‘../ChildComponent/ChildComponent’, () => ({
  default: (props: any) => (
    <div data-testid=“mock-child”>
      <button onClick={() => props.onSave([‘test’])}>Save</button>
      {props.items?.map((item: string, idx: number) => (
        <div key={idx}>{item}</div>
      ))}
    </div>
  )
}))
```

### Mock Functions

```typescript
const mockCallback = vi.fn()

// After action
expect(mockCallback).toHaveBeenCalledTimes(1)
expect(mockCallback).toHaveBeenCalledWith(expectedArgs)
```

## Incremental Testing Example

### Step 1: List Test Cases

```
Tests to add:
- It should render the component when passed empty array
- It should render with a single item
- It should render with multiple items
- It should call callback when user clicks button
```

### Step 2: Start with Basic Test

```typescript
describe(‘ComponentName’, () => {
  describe(‘when passed empty array’, () => {
    it(‘renders the no items message’, () => {
      render(<ComponentName items={[]} />)
      expect(screen.getByText(/no items/i)).toBeInTheDocument()
    })
  })
})
```

### Step 3: Add One Test at a Time

```typescript
describe(‘when passed single item’, () => {
  it(‘renders the item’, () => {
    render(<ComponentName items={[‘Item 1’]} />)
    expect(screen.getByText(‘Item 1’)).toBeInTheDocument()
  })
})
```

### Step 4: Build Up Complexity

```typescript
describe(‘when user clicks button’, () => {
  it(‘calls the callback with correct arguments’, () => {
    const mockCallback = vi.fn()
    render(<ComponentName onAction={mockCallback} />)
    
    fireEvent.click(screen.getByRole(‘button’))
    
    expect(mockCallback).toHaveBeenCalledWith(expectedData)
  })
})
```

## Testing Best Practices

1. **One assertion per test** (when possible)
1. **Descriptive test names** - “it should render error message when API fails”
1. **Arrange-Act-Assert** pattern
1. **Test user behavior**, not implementation
1. **Use Testing Library queries** in order of preference:
- getByRole (most accessible)
- getByLabelText
- getByPlaceholderText
- getByText
- getByTestId (last resort)

## Coverage Goals

Use the Vitest extension’s coverage report (play with timer icon) to ensure:

- All component states tested
- All user interactions tested
- All conditional rendering tested
- Edge cases covered

## Error Handling

When errors occur:

1. Describe the error to Copilot
1. Check if issue is in component, not test
1. Verify imports are correct
1. Check for Vitest vs Jest confusion
1. Ensure component has expected attributes

## Example: Full Test File

```typescript
// Copilot test instructions: Using vitest, mock subcomponents with vi.mock, and group tests in describe blocks

import { describe, it, expect, vi } from ‘vitest’
import { render, screen, fireEvent } from ‘@testing-library/react’
import ‘@testing-library/jest-dom’
import { ColorBlocks, ColorBlocksProps } from ‘./ColorBlocks’

// Mock child components
vi.mock(‘../BulletBlock/BulletBlock’, () => ({
  default: (props: any) => (
    <div data-testid=“mock-bullet-block”>
      <button onClick={() => props.onSave([‘new’])}>Save</button>
    </div>
  )
}))

describe(‘ColorBlocks’, () => {
  describe(‘when passed empty array’, () => {
    it(‘renders the no blocks message’, () => {
      const props: ColorBlocksProps = {
        blocks: [],
        updateColorBlocks: vi.fn()
      }
      
      render(<ColorBlocks {...props} />)
      expect(screen.getByText(/no blocks/i)).toBeInTheDocument()
    })
  })

  describe(‘when passed single block’, () => {
    it(‘renders the block with correct color’, () => {
      const props: ColorBlocksProps = {
        blocks: [{ color: ‘red’, content: [‘Item 1’] }],
        updateColorBlocks: vi.fn()
      }
      
      render(<ColorBlocks {...props} />)
      const block = screen.getByTestId(‘color-block’)
      expect(block).toHaveStyle({ backgroundColor: ‘red’ })
    })
  })

  describe(‘when user saves changes’, () => {
    it(‘calls updateColorBlocks with new data’, () => {
      const mockUpdate = vi.fn()
      const props: ColorBlocksProps = {
        blocks: [{ color: ‘blue’, content: [‘Old’] }],
        updateColorBlocks: mockUpdate
      }
      
      render(<ColorBlocks {...props} />)
      fireEvent.click(screen.getByText(‘Save’))
      
      expect(mockUpdate).toHaveBeenCalledWith([
        { color: ‘blue’, content: [‘new’] }
      ])
    })
  })
})
```

## Quick Reference

**Vitest Functions:**

- `describe()` - group tests
- `it()` or `test()` - individual test
- `expect()` - assertion
- `vi.fn()` - mock function
- `vi.mock()` - mock module

**Common Matchers:**

- `.toBeInTheDocument()`
- `.toHaveTextContent()`
- `.toHaveStyle()`
- `.toBeDisabled()`
- `.toHaveBeenCalled()`
- `.toHaveBeenCalledWith()`
- `.toHaveBeenCalledTimes()`

**Testing Library Queries:**

- `screen.getByRole()`
- `screen.getByText()`
- `screen.getByTestId()`
- `screen.queryBy*()` - returns null if not found
- `screen.findBy*()` - async, waits for element

——

**For more context, see:**

- Project-wide testing guidelines: `/AGENTS.md`
- Blog post: https://toddwseattle.com/blog/2025-27-05-Vitetest-with-CoPilot/