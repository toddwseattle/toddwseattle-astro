# Story 2.1: Course Materials List Component with Type Filter

## Objective

Display filterable course materials on each course detail page with type-specific badge colors and a dropdown to filter by material type. Uses Astro with inline `<script>` for lightweight client-side filtering.

## Acceptance Criteria

- Course materials display on each course detail page (Corporate Innovation, Software Engineering, NUvention Web)
- Materials filtered to show only those relevant to the current course
- Type filter dropdown works with "All Materials" + individual type options
- Type badges render with distinct colors for each material type
- Materials sorted by date descending (newest first)
- Dropdown styled with Tailwind form patterns including focus states
- Accessibility labels present with `sr-only` class for screen readers
- Keyboard navigation works for dropdown and cards
- "No materials yet" state displays when no materials found for a course
- No TypeScript errors

## Work Items and Todos

- [ ] Create `CourseMaterialsList.astro` component in `src/components/teaching/`
- [ ] Implement component logic to filter materials by `courseSlug` prop
- [ ] Extract unique material types from filtered results for dropdown options
- [ ] Render responsive card grid (1-col mobile, 2-col tablet, 3-col desktop)
- [ ] Add type badge to each card with color-coded styling
- [ ] Add difficulty badge to cards (if present in frontmatter)
- [ ] Implement dropdown filter control above card grid
- [ ] Add `data-type` attributes to cards for filtering
- [ ] Implement `<script>` tag with event listener for client-side filtering
- [ ] Style dropdown with focus states and accessibility patterns
- [ ] Add `aria-label` and `sr-only` labels for accessibility
- [ ] Update `src/pages/teaching/[slug].astro` to import and use component
- [ ] Add "Course Materials & Resources" section to course detail pages
- [ ] Test filtering works for all three courses
- [ ] Test keyboard navigation and accessibility
- [ ] Verify no TypeScript errors
- [ ] Test responsive layout on mobile/tablet/desktop

## Technical Details

### Component Architecture

**Approach:** Astro component with inline `<script>` tag

**Rationale:**

- Simple state management (single filter value)
- Aligns with Copilot instructions: "Needs simple interactivity? → Use .astro with `<script>` tag"
- Ships minimal JavaScript (no React overhead)
- Sets better pattern for future simple interactions
- Client-side filtering doesn't require React hooks or complex state

**Component Interface:**

```typescript
interface Props {
  courseSlug: string;
}
```

### Badge Color Mapping

Type badges use Tailwind color tokens with dark mode support:

- **Exercise**: `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`
- **Resource**: `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
- **Post**: `bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`
- **Tutorial**: `bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200`
- **Examples**: `bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200`
- **Student Work**: `bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200`

Badge pattern (following `BlogCard.astro`):

```html
<span
  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {colorClasses}"
>
  {type}
</span>
```

### Dropdown Styling

Form element styling with focus states:

```html
<select
  id="type-filter"
  class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
  aria-label="Filter materials by type"
></select>
```

### Card Layout

Following `BlogCard.astro` and `BlogGrid.astro` patterns:

- Responsive grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Card content: title (2-line clamp), description (3-line clamp), badges, date, optional cover image
- Hover effects: shadow, scale, color transitions
- Dark mode support throughout

### Filtering Logic

```javascript
<script>
  const filterSelect = document.getElementById('type-filter') as HTMLSelectElement;
  const materialCards = document.querySelectorAll('.material-card');

  filterSelect?.addEventListener('change', (e) => {
    const selectedType = (e.target as HTMLSelectElement).value;

    materialCards.forEach((card) => {
      if (selectedType === 'all' || card.getAttribute('data-type') === selectedType) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
</script>
```

### Data Fetching

```typescript
const allMaterials = await getCollection("courseMaterials");
const materials = allMaterials
  .filter((material) => material.data.courses.includes(courseSlug))
  .sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

const materialTypes = [...new Set(materials.map((m) => m.data.type))];
```

## Integration with Course Detail Page

Update `src/pages/teaching/[slug].astro`:

1. Import component:

```astro
import CourseMaterialsList from '../../components/teaching/CourseMaterialsList.astro';
```

2. Add section after existing content:

```astro
<section class="mt-16">
  <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
    Course Materials & Resources
  </h2>
  <CourseMaterialsList courseSlug={course.slug} />
</section>
```

## Testing Checklist

### Functionality

- [ ] Corporate Innovation page displays filtered materials (Design Thinking Workshop, Innovation Portfolio Management, Market Validation Framework)
- [ ] Software Engineering page displays filtered materials (Building Scalable APIs, Testing Best Practices)
- [ ] NUvention Web page displays filtered materials (Design Thinking Workshop, Market Validation Framework, Rapid Prototyping Techniques)
- [ ] "All Materials" option shows all course-relevant materials
- [ ] Each type filter option correctly filters cards
- [ ] Materials sorted by date descending (newest first)
- [ ] "No materials yet" state displays for courses with no materials

### Visual/Styling

- [ ] Type badges display correct colors for each material type
- [ ] Difficulty badges display when present in frontmatter
- [ ] Cards match BlogCard styling patterns
- [ ] Responsive grid works on mobile (1-col), tablet (2-col), desktop (3-col)
- [ ] Hover effects work on cards (shadow, scale, color)
- [ ] Dark mode styling renders correctly
- [ ] Dropdown styled with focus ring when selected

### Accessibility

- [ ] Dropdown has proper `aria-label` attribute
- [ ] Label uses `sr-only` class for screen readers
- [ ] Keyboard navigation works (Tab, Arrow keys, Enter)
- [ ] Focus states visible on dropdown and cards
- [ ] Links within cards keyboard accessible

### Technical

- [ ] No TypeScript errors in component
- [ ] No TypeScript errors in page integration
- [ ] Build completes successfully (`npm run build`)
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] All routes render correctly
- [ ] Console shows no JavaScript errors

## Expected Materials by Course

Based on existing course-materials with `courses` array:

**Corporate Innovation:**

- Design Thinking Workshop (tutorial)
- Innovation Portfolio Management (resource)
- Market Validation Framework (resource)

**Software Engineering:**

- Building Scalable APIs (tutorial)
- Testing Best Practices (tutorial)

**NUvention Web:**

- Design Thinking Workshop (tutorial)
- Market Validation Framework (resource)
- Rapid Prototyping Techniques (tutorial)

## Notes

- This story enhances Story 2 (Teaching Section) by adding course materials display
- Materials already defined in `courseMaterials` collection with proper schema
- Multi-course linking already supported via `courses` array in frontmatter
- Component follows Astro-first philosophy: minimal JavaScript, static-first rendering
- Progressive enhancement: cards render server-side, filtering enhances client-side
- Sets pattern for future simple interactive components using Astro with `<script>` tags

## Architectural Decisions

### Why Astro with `<script>` instead of React?

1. **Simplicity**: Single filter value doesn't require complex state management
2. **Performance**: Ships zero React runtime, minimal JavaScript
3. **Alignment**: Follows project's Copilot instructions for simple interactivity
4. **Progressive Enhancement**: Works without JavaScript (cards still render)
5. **Pattern Setting**: Establishes better pattern for future simple interactions

### Alternative Considered: React Component

**Pros:**

- Consistent with existing Header component pattern
- More testable with Vitest setup
- Familiar to maintainers using React

**Cons:**

- Heavier JavaScript bundle
- Overkill for simple dropdown filtering
- Doesn't follow "Astro-first" philosophy

**Decision:** Use Astro with inline script unless filtering logic becomes significantly more complex.

## Completion Status

**Status:** ✅ **IMPLEMENTED** (January 7, 2026)

Implementation complete! See [docs/story-02-1-progress.md](../../docs/story-02-1-progress.md) for full details.

### Files Created/Modified

- ✅ Created: `src/components/teaching/CourseMaterialsList.astro`
- ✅ Modified: `src/pages/teaching/[slug].astro`
- ✅ Created: `docs/story-02-1-progress.md`

## Next Steps After Completion

1. Consider extracting badge utility if pattern repeats 3+ times across components
2. Monitor JavaScript bundle size impact
3. Gather user feedback on filtering UX
4. Consider adding difficulty filter if materials grow significantly
5. Proceed to Story 3: Consolidate Blog → Writing with tag-driven discovery
