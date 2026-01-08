# Story 2.1 Progress: Course Materials List Component

## Objective

Display filterable course materials on each course detail page with type-specific badge colors and a dropdown to filter by material type.

## Work Items and Todos

- [x] Create `CourseMaterialsList.astro` component in `src/components/teaching/`
- [x] Implement component logic to filter materials by `courseSlug` prop
- [x] Extract unique material types from filtered results for dropdown options
- [x] Render responsive card grid (1-col mobile, 2-col tablet, 3-col desktop)
- [x] Add type badge to each card with color-coded styling
- [x] Add difficulty badge to cards (if present in frontmatter)
- [x] Implement dropdown filter control above card grid
- [x] Add `data-type` attributes to cards for filtering
- [x] Implement `<script>` tag with event listener for client-side filtering
- [x] Style dropdown with focus states and accessibility patterns
- [x] Add `aria-label` and `sr-only` labels for accessibility
- [x] Update `src/pages/teaching/[slug].astro` to import and use component
- [x] Add "Course Materials & Resources" section to course detail pages
- [x] Test filtering works for all three courses
- [x] Test keyboard navigation and accessibility
- [x] Verify no TypeScript errors
- [x] Test responsive layout on mobile/tablet/desktop

## Implementation Summary

### Completed Changes

1. **Created CourseMaterialsList.astro component** (`src/components/teaching/CourseMaterialsList.astro`)
   - Accepts `courseSlug` prop and filters materials where `courses` array includes that slug
   - Sorts materials by date descending (newest first)
   - Extracts unique material types for dropdown filter
   - Renders responsive card grid (1-col mobile, 2-col tablet, 3-col desktop)
   - Displays "No materials yet" state when no materials found
   - Each card shows: title (2-line clamp), description (3-line clamp), type badge, difficulty badge (optional), date, cover image (optional)
   - Implements client-side filtering with inline `<script>` tag
   - Adds `data-type` attribute to each card for filtering

2. **Badge Color System**
   - **Exercise**: Blue badges (`bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`)
   - **Resource**: Green badges (`bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`)
   - **Post**: Purple badges (`bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`)
   - **Tutorial**: Amber badges (`bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200`)
   - **Examples**: Pink badges (`bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200`)
   - **Student Work**: Teal badges (`bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200`)
   - **Difficulty badges**: Emerald (beginner), Orange (intermediate), Red (advanced)

3. **Dropdown Filter**
   - Styled with Tailwind form patterns and focus states
   - Shows "All Materials" option plus all available types for that course
   - Uses `aria-label` and `sr-only` label for accessibility
   - Only displays when course has materials with multiple types

4. **Updated teaching/[slug].astro page**
   - Imported `CourseMaterialsList` component
   - Added "Course Materials & Resources" section after course content
   - Passes `course.slug` as prop to component

### Technical Details

- **Architecture**: Astro component with inline `<script>` tag (zero React dependencies)
- **Data Fetching**: Uses `getCollection('courseMaterials')` at build time
- **Filtering**: Client-side JavaScript toggles `hidden` class based on `data-type` attribute
- **Styling**: Follows BlogCard patterns with hover effects, shadow, scale transitions
- **Dark Mode**: Full dark mode support throughout
- **Progressive Enhancement**: Cards render server-side, filtering enhances client-side
- **Type Safety**: TypeScript interfaces for props, typed collection access

### Architecture Decision

**Why Astro with `<script>` instead of React?**

1. **Simplicity**: Single filter value doesn't require complex state management
2. **Performance**: Ships minimal JavaScript, no React runtime
3. **Alignment**: Follows project's Copilot instructions for simple interactivity
4. **Progressive Enhancement**: Works without JavaScript (cards still render)
5. **Pattern Setting**: Establishes pattern for future simple interactive components

## Expected Materials by Course

**Corporate Innovation** (`/teaching/corporate-innovation/`):

- Design Thinking Workshop (tutorial, beginner)
- Innovation Portfolio Management (resource)
- Market Validation Framework (resource)

**Software Engineering** (`/teaching/software-engineering/`):

- Building Scalable APIs (tutorial, intermediate)
- Testing Best Practices (tutorial)

**NUvention Web** (`/teaching/nuvention-web/`):

- Design Thinking Workshop (tutorial, beginner)
- Market Validation Framework (resource)
- Rapid Prototyping Techniques (tutorial)

## Testing Checklist

### Functionality

- [x] Corporate Innovation page displays filtered materials (3 materials)
- [x] Software Engineering page displays filtered materials (2 materials)
- [x] NUvention Web page displays filtered materials (3 materials)
- [x] "All Materials" option included in dropdown
- [x] Materials sorted by date descending (newest first)
- [x] Filter dropdown only shows when multiple types available
- [x] Component gracefully handles no materials state

### Visual/Styling

- [x] Type badges display correct colors for each material type
- [x] Difficulty badges display when present in frontmatter
- [x] Cards follow BlogCard styling patterns
- [x] Responsive grid: 1-col mobile, 2-col tablet, 3-col desktop
- [x] Hover effects work (shadow, scale, color transitions)
- [x] Dark mode styling implemented throughout
- [x] Dropdown styled with focus ring

### Accessibility

- [x] Dropdown has proper `aria-label` attribute
- [x] Label uses `sr-only` class for screen readers
- [x] Focus states visible on dropdown
- [x] Cards maintain proper semantic HTML structure

### Technical

- [x] No TypeScript errors in component
- [x] No TypeScript errors in page integration
- [x] Component follows Astro best practices
- [x] Client-side script properly scoped
- [x] Date formatting consistent with site patterns

## Completion Status

**Status:** ✅ **COMPLETE** (January 7, 2026)

All acceptance criteria from Story 2.1 have been met:

- ✅ Course materials display on each course detail page
- ✅ Materials filtered to show only those relevant to current course
- ✅ Type filter dropdown works with "All Materials" + individual type options
- ✅ Type badges render with distinct colors for each material type
- ✅ Materials sorted by date descending
- ✅ Dropdown styled with Tailwind form patterns and focus states
- ✅ Accessibility labels present with `sr-only` class
- ✅ Keyboard navigation works
- ✅ "No materials yet" state displays appropriately
- ✅ No TypeScript errors in new code

### Key Features Delivered

1. **Reusable Astro Component**: `CourseMaterialsList.astro` can be used on any course page
2. **Type-Based Filtering**: Client-side dropdown filter with "All Materials" option
3. **Color-Coded Badges**: 6 distinct colors for material types, 3 for difficulty levels
4. **Responsive Design**: Mobile-first grid layout matching site patterns
5. **Accessibility**: Screen reader labels, keyboard navigation, focus states
6. **Progressive Enhancement**: Works without JavaScript, enhanced with it
7. **Dark Mode**: Full support throughout component
8. **Performance**: Minimal JavaScript shipped (no React overhead)

## Notes

- Component uses Astro-first philosophy with inline `<script>` for simple interactivity
- Sets pattern for future components requiring lightweight client-side behavior
- Badge colors provide clear visual distinction between material types
- Filter dropdown only appears when course has materials with multiple types
- Component gracefully handles edge cases (no materials, single type, missing data)
- Date sorting ensures newest materials appear first
- Multi-course linking works correctly (materials can appear on multiple course pages)

## Next Steps

1. Monitor JavaScript bundle size impact (expected to be minimal)
2. Gather user feedback on filtering UX
3. Consider extracting badge utility if pattern repeats 3+ times
4. Consider adding difficulty filter if materials grow significantly
5. Add more course materials over time to populate all courses
6. Proceed to **Story 3: Consolidate Blog → Writing** with tag-driven discovery
