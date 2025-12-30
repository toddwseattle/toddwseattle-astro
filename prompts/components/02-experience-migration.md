# Experience Component Migration

> **Note:** This component displays work history and aligns with the professional presentation goals in `/docs/04-style-guide.md`. The component should maintain a calm, modern aesthetic with clear chronological organization.

## Component Type: Content Display Component

## Priority: High (Core resume content)

## Recommended Format: `.astro`

## Original Gatsby Component

**Location:** `/home/toddwseattle/pw-toddwseattle/src/components/Experience/index.tsx`

### Original Code Pattern

```tsx
const Experience: React.FC = () => {
  const { markdownRemark, allMarkdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "experiences section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "experiences" } } }
        sort: { order: DESC, fields: [frontmatter___startDate] }
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
      {experiences.map((item) => (
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
const experiences = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
  }),
});
```

## Migration Plan

### 1. Component Type Decision

**Recommendation: `.astro` file**

- No client-side interactivity needed
- Pure content display
- Better performance with Astro component

### 2. Data Fetching Conversion

```typescript
// Gatsby GraphQL
const { allMarkdownRemark } = useStaticQuery(graphql`...`);

// Convert to Astro
const experiences = await getCollection("experiences");
const sortedExperiences = experiences.sort(
  (a, b) =>
    new Date(b.data.startDate).getTime() - new Date(a.data.startDate).getTime()
);
```

### 3. Component Structure

```astro
---
import { getCollection } from 'astro:content';
import Container from './ui/Container';
import TitleSection from './ui/TitleSection';
import Timeline from './ui/Timeline';

const experiences = await getCollection('experiences');
const sortedExperiences = experiences.sort((a, b) =>
  new Date(b.data.startDate).getTime() - new Date(a.data.startDate).getTime()
);
---

<section class="bg-white py-12 md:py-16">
  <Container section client:load>
    <TitleSection
      title="Experience"
      subtitle="Professional work history"
      client:load
    />
    <div class="mt-8">
      {sortedExperiences.map(async (experience) => {
        const { Content } = await experience.render();
        return (
          <Timeline
            title={experience.data.company}
            subtitle={experience.data.position}
            content={<Content />}
            startDate={experience.data.startDate}
            endDate={experience.data.endDate || 'Present'}
            client:load
          />
        );
      })}
    </div>
  </Container>
</section>
```

### 4. Content Files

Check existing content in `/src/content/experiences/`:

- experience-1a.md
- experience-1b.md
- experience-1c.md
- experience-2.md
- experience-3.md
- experience-4a.md
- experience-5.md
- experience-6.md

### 5. Section Title/Metadata

May need to add a section configuration file or frontmatter for the section title and subtitle.

### 6. HTML Content Rendering

Instead of `FormatHtml` utility:

```astro
const { Content } = await experience.render();
<Content />
```

Astro handles this natively!

## Implementation Steps

1. **Ensure Timeline component exists**
   - Migrate Timeline UI component first (see 01-timeline-migration.md)

2. **Create Experience.astro**
   - Location: `/src/components/Experience.astro`
   - Implement data fetching from content collection
   - Sort by startDate (descending - most recent first)
   - Map through experiences and render Timeline components

3. **Verify Content Files**
   - Check all experience-\*.md files have correct frontmatter
   - Ensure dates are in sortable format (YYYY-MM-DD recommended)
   - Verify content renders properly

4. **Add to Page**
   - Import in relevant page (likely a resume or about page)
   - Add to layout with proper spacing

5. **Test**
   - Visual appearance
   - Timeline layout
   - Content rendering
   - Date sorting
   - Responsive design

## Testing Checklist

- [ ] Timeline component exists and works
- [ ] Experience component fetches data from collection
- [ ] Experiences are sorted by date (newest first)
- [ ] All experience items render
- [ ] Content (markdown/HTML) displays correctly
- [ ] Dates format properly (handle "Present" for current positions)
- [ ] Section title and subtitle display
- [ ] Responsive layout works
- [ ] No console errors

## Target Location

`/home/toddwseattle/pw-toddwseattle-astro/src/components/Experience.astro`

## Dependencies

- ✅ Container (exists)
- ✅ TitleSection (exists)
- ❌ Timeline (needs migration - see 01-timeline-migration.md)
- ✅ Content collection: experiences (defined)

## Blocks

- Resume page completion
- Full site content display
