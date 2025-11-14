# ProgressBar UI Component Migration

## Component Type: UI Component

## Priority: Medium (Required by Skills component)

## Recommended Format: `.tsx` or `.astro`

## Original Gatsby Component

**Location:** `/home/toddwseattle/pw-toddwseattle/src/components/ui/ProgressBar/index.tsx`

### Original Code

```tsx
interface Props extends Styled.StyledProps {
  title: string;
}

const ProgressBar: React.FC<Props> = ({ title, percentage }) => (
  <Styled.ProgressBar>
    <Styled.Content>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Percentage>{percentage}%</Styled.Percentage>
    </Styled.Content>
    <Styled.BarWrapper>
      <Styled.Bar percentage={percentage} />
    </Styled.BarWrapper>
  </Styled.ProgressBar>
);
```

### Visual Structure

- Title on left
- Percentage on right
- Progress bar below with filled portion based on percentage

## Migration Plan

### Option 1: React Component (.tsx)

**Pros:** Consistent with other UI components, easy to add animations
**Cons:** Requires client directive for animations

### Option 2: Astro Component (.astro) - RECOMMENDED

**Pros:** No JavaScript needed, pure CSS animations, better performance
**Cons:** None significant for this use case

### Recommended: `.astro` Component

## Implementation

### 1. Component Structure

```astro
---
interface Props {
  title: string;
  percentage: number;
}

const { title, percentage } = Astro.props;
---

<div class="progress-bar mb-6">
  <div class="flex justify-between items-center mb-2">
    <span class="text-sm font-medium text-gray-700">{title}</span>
    <span class="text-sm font-semibold text-indigo-600">{percentage}%</span>
  </div>
  <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      class="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out progress-fill"
      style={`width: ${percentage}%`}
    ></div>
  </div>
</div>

<style>
  .progress-fill {
    animation: fillBar 1s ease-out;
  }

  @keyframes fillBar {
    from {
      width: 0%;
    }
  }
</style>
```

### 2. Props Interface

```typescript
interface Props {
  title: string; // Skill name
  percentage: number; // Skill level (0-100)
}
```

### 3. Styling with Tailwind

- Container: spacing between bars
- Header row: flex layout, title left, percentage right
- Bar background: light gray, rounded
- Bar fill: indigo color, animated width
- Animation: CSS transition for smooth fill

### 4. Accessibility Considerations

Could add ARIA attributes:

```astro
<div
  role="progressbar"
  aria-valuenow={percentage}
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label={`${title}: ${percentage}%`}
>
```

## Usage Example

Will be used by Skills component:

```astro
---
import ProgressBar from './ui/ProgressBar.astro';

const skills = await getCollection('skills');
---

<div>
  {skills.map((skill) => (
    <ProgressBar
      title={skill.data.title}
      percentage={skill.data.percentage || 0}
    />
  ))}
</div>
```

## Implementation Steps

1. **Create ProgressBar.astro**
   - Location: `/src/components/ui/ProgressBar.astro`
   - Define Props interface
   - Implement component with Tailwind classes
   - Add CSS animation for bar fill

2. **Test Component**
   - Test with various percentages (0, 50, 100)
   - Verify animation works
   - Check responsive design
   - Verify accessibility

3. **Use in Skills Component**
   - Import in Skills component
   - Pass title and percentage props
   - Test multiple progress bars together

## Testing Checklist

- [ ] Component renders with title and percentage
- [ ] Progress bar fills to correct width
- [ ] Animation plays on load
- [ ] Multiple bars can be stacked
- [ ] Responsive design works on mobile
- [ ] Text is readable (contrast)
- [ ] Percentage values 0-100 work correctly
- [ ] Styling matches site theme

## Target Location

`/home/toddwseattle/pw-toddwseattle-astro/src/components/ui/ProgressBar.astro`

## Dependencies

- None (pure presentational component)

## Blocks

- Skills component completion

## Design Specifications

- Bar height: 8px (h-2)
- Bar background: light gray (#e5e7eb)
- Bar fill: indigo (#4f46e5)
- Border radius: full rounded
- Title font: medium weight
- Percentage font: semibold
- Animation duration: 1s ease-out
- Spacing between bars: 1.5rem (mb-6)

## Alternative: React Version

If you prefer React for consistency:

```tsx
import React from "react";

interface ProgressBarProps {
  title: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, percentage }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm font-semibold text-indigo-600">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
```

Use without client directive when used in static context, or with `client:visible` for animation on scroll.
