# Teaching Section Implementation - Quick Reference Guide

This guide provides a quick reference for implementing the teaching section. For comprehensive details, see [teaching-section-design.md](./teaching-section-design.md).

---

## Table of Contents
1. [Schema Overview](#schema-overview)
2. [File Structure](#file-structure)
3. [Content Templates](#content-templates)
4. [Component Reference](#component-reference)
5. [URL Routing](#url-routing)
6. [Key Decisions](#key-decisions)

---

## Schema Overview

### Teaching Collection Schema (Quick Reference)

```typescript
const teaching = defineCollection({
  type: "content",
  schema: z.object({
    // Core metadata
    category: z.string().default("teaching"),
    title: z.string(),
    description: z.string(),
    
    // Multi-course association (array allows flexibility)
    courses: z.array(z.enum([
      "software-engineering",
      "corporate-innovation", 
      "nuvention"
    ])),
    
    // Content type
    contentType: z.enum([
      "course-overview",
      "module",
      "project",
      "resource",
      "reflection"
    ]),
    
    // Teaching-specific fields
    philosophy: z.string().optional(),
    topics: z.array(z.string()).optional(),
    frameworks: z.array(z.string()).optional(),
    exampleProjects: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      url: z.string().optional(),
      year: z.string().optional()
    })).optional(),
    publicArtifacts: z.array(z.object({
      title: z.string(),
      type: z.enum(["syllabus", "slides", "video", "article", "repository", "other"]),
      url: z.string(),
      description: z.string().optional()
    })).optional(),
    
    // Discovery
    tags: z.array(z.string()).optional(),
    order: z.number().optional(),
    featured: z.boolean().default(false),
    
    // Publishing
    date: z.string(),
    lastUpdated: z.string().optional(),
    published: z.boolean().default(true)
  })
});
```

---

## File Structure

```
src/content/teaching/
├── software-engineering/
│   ├── overview.md              # contentType: "course-overview"
│   ├── module-01-foundations.md # contentType: "module"
│   ├── module-02-design.md
│   ├── project-task-manager.md  # contentType: "project"
│   └── reflection-agile.md      # contentType: "reflection"
├── corporate-innovation/
│   ├── overview.md
│   ├── module-01-discovery.md
│   └── project-lean-canvas.md
├── nuvention/
│   ├── overview.md
│   └── module-01-ideation.md
└── shared/
    └── project-based-learning.md # courses: ["software-engineering", "corporate-innovation"]
```

---

## Content Templates

### Course Overview Template

```yaml
---
category: 'teaching'
title: 'Software Engineering'
description: 'Modern software engineering practices, design patterns, and collaborative development for real-world applications.'
courses: ['software-engineering']
contentType: 'course-overview'
philosophy: 'Emphasize practical, hands-on learning through real-world projects. Balance theory with industry best practices while fostering collaborative, team-based development skills.'
topics:
  - 'Agile/Scrum methodologies'
  - 'Software design patterns'
  - 'Test-driven development'
  - 'CI/CD pipelines'
  - 'API design'
frameworks:
  - 'Scrum'
  - 'Git/GitHub'
  - 'REST/GraphQL'
exampleProjects:
  - title: 'Task Management Application'
    description: 'Team collaboration app with real-time features'
    url: 'https://github.com/example/task-manager'
    year: '2023'
  - title: 'RESTful API Service'
    description: 'Microservice with comprehensive testing'
publicArtifacts:
  - title: 'Course Syllabus'
    type: 'syllabus'
    url: 'https://example.com/syllabus.pdf'
  - title: 'Lecture Slides'
    type: 'slides'
    url: 'https://slides.com/deck'
  - title: 'Code Repository'
    type: 'repository'
    url: 'https://github.com/course/repo'
tags: ['software-engineering', 'agile', 'web-development']
featured: true
date: '2024-01-15'
lastUpdated: '2024-09-01'
published: true
---

## Course Overview

[Markdown content describing the course in detail...]
```

### Module Template

```yaml
---
category: 'teaching'
title: 'Foundations of Software Engineering'
description: 'Introduction to software engineering principles, version control, and collaborative development workflows.'
courses: ['software-engineering']
contentType: 'module'
topics:
  - 'Software development lifecycle'
  - 'Version control basics'
  - 'Code review practices'
order: 1
tags: ['software-engineering', 'fundamentals']
date: '2024-01-20'
published: true
---

## Module Content

[Markdown content for the module...]
```

### Multi-Course Content Template

```yaml
---
category: 'teaching'
title: 'Project-Based Learning Principles'
description: 'Core principles and best practices for implementing project-based learning in technical courses.'
courses: ['software-engineering', 'corporate-innovation', 'nuvention']
contentType: 'reflection'
tags: ['teaching-reflections', 'pedagogy', 'project-based-learning']
date: '2024-03-15'
published: true
---

## Reflection Content

[Markdown content relevant to multiple courses...]
```

---

## Component Reference

### CourseCard Component

**Purpose:** Display featured course on landing page

**Props:**
```typescript
interface CourseCardProps {
  title: string;
  description: string;
  topics: string[];
  url: string;
  icon?: string;
}
```

**Usage:**
```astro
<CourseCard
  title="Software Engineering"
  description="Modern practices and collaborative development"
  topics={['Agile', 'TDD', 'CI/CD']}
  url="/teaching/software-engineering"
/>
```

### ProjectShowcase Component

**Purpose:** Display example projects

**Props:**
```typescript
interface ProjectShowcaseProps {
  projects: Array<{
    title: string;
    description?: string;
    url?: string;
    year?: string;
  }>;
  layout?: 'grid' | 'list';
}
```

### ArtifactList Component

**Purpose:** Display public resources

**Props:**
```typescript
interface ArtifactListProps {
  artifacts: Array<{
    title: string;
    type: 'syllabus' | 'slides' | 'video' | 'article' | 'repository' | 'other';
    url: string;
    description?: string;
  }>;
}
```

---

## URL Routing

### Recommended Routes

| Page | URL | File Location |
|------|-----|---------------|
| Teaching Landing | `/teaching` | `src/pages/teaching/index.astro` |
| Software Engineering | `/teaching/software-engineering` | `src/pages/teaching/software-engineering.astro` |
| Corporate Innovation | `/teaching/corporate-innovation` | `src/pages/teaching/corporate-innovation.astro` |
| NUvention | `/teaching/nuvention` | `src/pages/teaching/nuvention.astro` |
| Module (future) | `/teaching/[course]/[slug]` | `src/pages/teaching/[course]/[slug].astro` |

### URL Patterns to Avoid

❌ `/teaching/2024/software-engineering` - Year-based  
❌ `/courses/software-engineering` - Different top-level  
❌ `/teaching/se` - Unclear abbreviations  
❌ `/software-engineering` - Missing teaching context

---

## Key Decisions

### ✅ Decisions Made

1. **Three Courses:** Software Engineering, Corporate Innovation, NUvention
2. **Multi-Course Posts:** Content can belong to multiple courses via `courses` array
3. **Content Types:** Differentiate course-overview, module, project, resource, reflection
4. **Evergreen Content:** Avoid year-based routing; use dates for context only
5. **Flexible Schema:** Rich metadata supports philosophy, topics, frameworks, projects, artifacts
6. **Tag Integration:** Connect teaching content to Writing collection via tags

### ❓ Questions for Review

1. Should NUvention course be in MVP or deferred?
2. Are there additional courses to include (e.g., NUvention Web)?
3. Should individual modules have dedicated pages now or later?
4. Preference for dynamic routing vs. individual course pages?
5. Should course cards use distinct colors or icons?

### 📋 Pre-Implementation Checklist

Before starting implementation:

- [ ] Review comprehensive design doc ([teaching-section-design.md](./teaching-section-design.md))
- [ ] Audit legacy Gatsby repository for existing teaching content
- [ ] Gather all public artifacts (syllabi, slides, repos)
- [ ] Compile example projects with descriptions and links
- [ ] Draft teaching philosophy statements
- [ ] Get Todd's approval on course list and content scope
- [ ] Verify all external links are publicly accessible
- [ ] Ensure design tokens and component patterns are established

---

## Query Examples

### Fetch All Course Overviews

```typescript
const courses = await getCollection('teaching', (entry) => 
  entry.data.contentType === 'course-overview' && 
  entry.data.published
);
```

### Fetch Modules for a Specific Course

```typescript
const modules = await getCollection('teaching', (entry) =>
  entry.data.courses.includes('software-engineering') &&
  entry.data.contentType === 'module' &&
  entry.data.published
).then(modules => modules.sort((a, b) => 
  (a.data.order || 0) - (b.data.order || 0)
));
```

### Fetch Multi-Course Content

```typescript
const sharedContent = await getCollection('teaching', (entry) =>
  entry.data.courses.length > 1 &&
  entry.data.published
);
```

### Fetch Teaching Reflections

```typescript
const reflections = await getCollection('teaching', (entry) =>
  entry.data.contentType === 'reflection' &&
  entry.data.published
);
```

---

## Additional Resources

- **Comprehensive Design:** [teaching-section-design.md](./teaching-section-design.md)
- **Story 2 (Enhanced):** [02-stories.md](./02-stories.md#story-2-create-teaching-section-enhanced)
- **Work Items:** [03-workitems.md](./03-workitems.md#for-story-2-create-teaching-section)
- **Style Guide:** [04-style-guide.md](./04-style-guide.md)
- **Epic:** [01-epic.md](./01-epic.md)

---

**Document Version:** 1.0  
**Last Updated:** 2024-12-31  
**Status:** Ready for Implementation
