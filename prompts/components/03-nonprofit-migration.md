# NonProfit Component Migration

## Component Type: Content Display Component

## Priority: High (Core content section)

## Recommended Format: `.astro`

## Original Gatsby Component

**Location:** `/home/toddwseattle/pw-toddwseattle/src/components/NonProfit/index.tsx`

### Original Code

```tsx
const NonProfit: React.FC = () => {
  const { markdownRemark, allMarkdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "non-profit section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "non-profit" } } }
        sort: { order: [ASC], fields: [frontmatter___title] }
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              company
              position
              startDate
              endDate
            }
          }
        }
      }
    }
  `);

  return (
    <Container section>
      <TitleSection
        title={sectionTitle.title}
        subtitle={sectionTitle.subtitle}
      />
      {nonProfit.map((item) => (
        <Timeline
          key={id}
          title={company}
          subtitle={position}
          content={<FormatHtml content={html} />}
          startDate={startDate}
          endDate={endDate}
        />
      ))}
    </Container>
  );
};
```

## Content Collection Schema

Already defined in `src/content/config.ts`:

```typescript
const nonprofit = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    company: z.string().optional(),
    position: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});
```

## Migration Plan

### 1. Component Type Decision

**Recommendation: `.astro` file**

- No client-side interactivity needed
- Pure content display from collection
- Better performance

### 2. Data Fetching Conversion

```astro
---
import { getCollection } from 'astro:content';

// Original: GraphQL query with filter and sort
// New: Astro content collection
const nonprofits = await getCollection('nonprofit');
// Sort by company name (title) ascending
const sortedNonprofits = nonprofits.sort((a, b) =>
  (a.data.company || '').localeCompare(b.data.company || '')
);
---
```

### 3. Component Structure

```astro
---
import { getCollection } from 'astro:content';
import Container from './ui/Container';
import TitleSection from './ui/TitleSection';
import Timeline from './ui/Timeline';

const nonprofits = await getCollection('nonprofit');
const sortedNonprofits = nonprofits.sort((a, b) =>
  (a.data.company || '').localeCompare(b.data.company || '')
);
---

<section class="bg-gray-50 py-12 md:py-16">
  <Container section client:load>
    <TitleSection
      title="Non-Profit & Board Service"
      subtitle="Community involvement and advisory roles"
      client:load
    />
    <div class="mt-8">
      {sortedNonprofits.map(async (nonprofit) => {
        const { Content } = await nonprofit.render();
        return (
          <Timeline
            title={nonprofit.data.company || 'Organization'}
            subtitle={nonprofit.data.position || 'Board Member'}
            content={<Content />}
            startDate={nonprofit.data.startDate || ''}
            endDate={nonprofit.data.endDate || 'Present'}
            client:load
          />
        );
      })}
    </div>
  </Container>
</section>
```

### 4. Content Files

Check existing content in `/src/content/nonprofit/`:

- ashesi.md
- northwestern-1.md
- northwestern-2.md
- venturewell.md

### 5. Section Title/Subtitle

Options:

1. Hardcode in component (simplest)
2. Create a configuration file
3. Add to a general site config

For now, recommend hardcoding with clear, descriptive values.

### 6. Sorting Strategy

Original sorts by company name (title) ascending. This groups organizations together if there are multiple roles.

Alternative: Could sort by startDate descending (most recent first) if preferred.

## Implementation Steps

1. **Ensure Timeline component exists**
   - Migrate Timeline UI component first (see 01-timeline-migration.md)

2. **Create NonProfit.astro**
   - Location: `/src/components/NonProfit.astro`
   - Implement data fetching from nonprofit collection
   - Sort by company name (ascending)
   - Map through items and render Timeline components

3. **Verify Content Files**
   - Check all nonprofit/\*.md files have correct frontmatter
   - Ensure company, position, startDate, endDate are present
   - Verify markdown content exists

4. **Add to Page**
   - Import in relevant page (index, resume, or about page)
   - Add with proper spacing and section styling

5. **Test**
   - Visual appearance
   - Timeline rendering
   - Content display
   - Sorting order

## Testing Checklist

- [ ] Timeline component exists and works
- [ ] NonProfit component fetches data from collection
- [ ] Items are sorted by company name
- [ ] All nonprofit items render
- [ ] Content (markdown) displays correctly
- [ ] Dates format properly (handle "Present" for current positions)
- [ ] Section title and subtitle display
- [ ] Responsive layout works
- [ ] Styling matches site theme (gray background)
- [ ] No console errors

## Target Location

`/home/toddwseattle/pw-toddwseattle-astro/src/components/NonProfit.astro`

## Dependencies

- ✅ Container (exists)
- ✅ TitleSection (exists)
- ❌ Timeline (needs migration - see 01-timeline-migration.md)
- ✅ Content collection: nonprofit (defined)

## Content Files to Verify

- `/src/content/nonprofit/ashesi.md`
- `/src/content/nonprofit/northwestern-1.md`
- `/src/content/nonprofit/northwestern-2.md`
- `/src/content/nonprofit/venturewell.md`

## Styling Notes

- Use gray background (`bg-gray-50`) to differentiate from other sections
- Matches typical resume section styling
- Timeline should have consistent spacing with other timeline sections
