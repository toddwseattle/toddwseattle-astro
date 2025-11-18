# Timeline UI Component Migration

## Component Type: UI Component

## Priority: High (Required by Experience, NonProfit, Education)

## Recommended Format: `.astro` (No interactivity needed)

## Original Gatsby Component

**Location:** `/home/toddwseattle/pw-toddwseattle-gb/src/components/ui/Timeline/index.tsx`

### Original Code Structure

```tsx
interface Props {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  startDate: string;
  endDate: string;
}

const Timeline: React.FC<Props> = ({
  title,
  subtitle,
  content,
  startDate,
  endDate,
}) => (
  <Styled.Timeline>
    <Styled.Point />
    <Styled.Details>
      <Styled.Date>
        {startDate} - {endDate}
      </Styled.Date>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Subtitle>{subtitle}</Styled.Subtitle>
    </Styled.Details>
    <Styled.Content>{content}</Styled.Content>
  </Styled.Timeline>
);
```

### Styled Components (from styles.ts)

Uses styled-components for styling - needs conversion to Tailwind CSS.

## Migration Plan

### 1. Component Structure

- Convert to astro component
- Convert styled-components to Tailwind CSS classes
- No client-side interactivity needed, so can be used without client directive

### 2. Props Interface

```typescript
interface Props {
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
}
// Content will be passed via <slot />
```

### 3. Visual Design Requirements

- Vertical timeline with point indicator
- Date display (startDate - endDate)
- Title (company/institution name)
- Subtitle (position/degree)
- Content area for HTML/markdown content
- Responsive layout

### 4. Tailwind CSS Class Structure

```
- Timeline container: vertical line, spacing
- Point: circular indicator on the left
- Details section: date, title, subtitle
- Content area: formatted content
```

### 5. Usage Examples

Will be used by:

1. **Experience Component** - Work history
2. **NonProfit Component** - Board positions
3. **Education Component** - Academic history

### 6. Implementation Steps

1. Create `/src/components/ui/Timeline.astro`
2. Define TypeScript interface for props in frontmatter
3. Implement component with Tailwind classes
4. Use <slot /> for content area
5. Test visual appearance
6. Ensure responsive design works
7. Update usage in parent components

### 7. Testing Checklist

- [ ] Component renders with all props
- [ ] Visual timeline appearance matches design
- [ ] Responsive layout works on mobile
- [ ] Content area displays HTML properly
- [ ] Date formatting is clear
- [ ] Works with multiple timeline items in sequence

## Target Location

`/home/toddwseattle/pw-toddwseattle-astro/src/components/ui/Timeline.astro`

## Dependencies

- None (pure presentational component)

## Blocked Components

- Experience component
- NonProfit component
- Education component

All three components are waiting for Timeline to be migrated.
