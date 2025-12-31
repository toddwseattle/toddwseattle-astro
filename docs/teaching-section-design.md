# Teaching Section - Comprehensive Design Documentation

## Overview

This document provides a comprehensive design for implementing the Teaching section as defined in Story 2 of the Astro Migration project. This is a planning and design document only—no code implementation should be done at this stage.

**Related Documents:**
- [Story 2: Create Teaching Section](./02-stories.md#story-2-create-teaching-section)
- [Work Items for Story 2](./03-workitems.md#for-story-2-create-teaching-section)
- [Epic: Astro Migration – IA Refresh](./01-epic.md)
- [Style Guide](./04-style-guide.md)

---

## 1. Teaching Content Collection Schema

### 1.1 Generic Teaching Post Schema

The teaching collection should support flexible post organization with the ability to:
- Segment posts by class using frontmatter
- Allow posts to belong to multiple classes
- Support evergreen, year-independent content
- Enable rich content modeling (philosophy, topics, projects, artifacts)

#### Proposed Schema (TypeScript/Zod)

```typescript
// src/content/config.ts additions

const teaching = defineCollection({
  type: "content",
  schema: z.object({
    // Core metadata
    category: z.string().default("teaching"),
    title: z.string(),
    description: z.string(),
    
    // Course/class associations (allows multiple)
    courses: z.array(z.enum([
      "software-engineering",
      "corporate-innovation", 
      "invention"
    ])),
    
    // Content type differentiation
    contentType: z.enum([
      "course-overview",    // Landing page for a course
      "module",             // Teaching module or unit
      "project",            // Example project or case study
      "resource",           // Reading, tool, or resource
      "reflection"          // Teaching reflection or insight
    ]),
    
    // Teaching-specific fields
    philosophy: z.string().optional(),
    topics: z.array(z.string()).optional(),
    frameworks: z.array(z.string()).optional(),
    
    // Project/artifact links
    exampleProjects: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      url: z.string().optional(),
      year: z.string().optional() // For context, not routing
    })).optional(),
    
    publicArtifacts: z.array(z.object({
      title: z.string(),
      type: z.enum(["syllabus", "slides", "video", "article", "repository", "other"]),
      url: z.string(),
      description: z.string().optional()
    })).optional(),
    
    // Organization and discovery
    tags: z.array(z.string()).optional(),
    order: z.number().optional(), // For ordered module sequences
    featured: z.boolean().default(false),
    
    // Publishing metadata
    date: z.string(),
    lastUpdated: z.string().optional(),
    published: z.boolean().default(true)
  })
});
```

### 1.2 Schema Rationale

**Flexibility:** The `courses` array allows a single post to appear in multiple course contexts (e.g., a project-based learning module relevant to both Software Engineering and Corporate Innovation).

**Content Types:** Differentiate between course overviews, teaching modules, projects, and reflections while keeping them in a unified collection.

**Evergreen Design:** Avoid year-based routing; use optional `year` field in projects for context only.

**Rich Metadata:** Support philosophy statements, topic lists, frameworks, and linked artifacts that make teaching materials discoverable and useful.

### 1.3 File Structure

```
src/content/teaching/
├── software-engineering/
│   ├── overview.md              # Course overview (contentType: course-overview)
│   ├── module-01-foundations.md # Teaching modules
│   ├── module-02-design.md
│   ├── project-task-manager.md  # Example project
│   └── reflection-agile.md      # Teaching reflection
├── corporate-innovation/
│   ├── overview.md
│   ├── module-01-discovery.md
│   ├── module-02-validation.md
│   └── project-lean-canvas.md
├── invention/
│   ├── overview.md
│   ├── module-01-ideation.md
│   └── project-patent-analysis.md
└── shared/
    └── project-based-learning.md # Multi-course content
```

**Note:** The folder structure is organizational only. Posts can belong to multiple courses via frontmatter, regardless of file location.

---

## 2. Course Definitions

### 2.1 Software Engineering

**Course Overview:**
- Focus: Modern software engineering practices, design patterns, and collaborative development
- Target Audience: Graduate and advanced undergraduate students
- Key Themes: Agile methodologies, software architecture, testing, deployment, team dynamics

**Philosophy:**
- Emphasize practical, hands-on learning through real-world projects
- Balance theory with industry best practices
- Foster collaborative, team-based development skills

**Topics & Frameworks:**
- Agile/Scrum methodologies
- Software design patterns and architecture
- Test-driven development (TDD)
- Continuous integration/deployment (CI/CD)
- Version control and collaborative workflows (Git/GitHub)
- API design and microservices
- Cloud platforms and deployment strategies

**Example Projects:**
- Task management application with team collaboration features
- RESTful API service with comprehensive testing
- Real-time collaborative editor
- Microservices-based e-commerce platform

**Public Artifacts:**
- Syllabus and course materials
- Project specifications and rubrics
- Code repositories and starter templates
- Guest lecture recordings (if available)

### 2.2 Corporate Innovation

**Course Overview:**
- Focus: Innovation methodologies within established organizations
- Target Audience: MBA students, executives, corporate innovators
- Key Themes: Lean Startup, design thinking, intrapreneurship, innovation ecosystems

**Philosophy:**
- Apply startup methodologies to corporate contexts
- Emphasize evidence-based decision making
- Bridge theory and practice through real corporate partnerships

**Topics & Frameworks:**
- Lean Startup methodology
- Customer discovery and validation
- Business model innovation (Business Model Canvas, Lean Canvas)
- Design thinking and human-centered design
- Innovation metrics and portfolio management
- Organizational barriers to innovation
- Building innovation culture

**Example Projects:**
- Customer discovery for corporate innovation initiative
- New business model validation for established company
- Internal innovation program design
- Corporate venture studio launch plan

**Public Artifacts:**
- Course syllabus
- Framework templates (Lean Canvas, Value Proposition Canvas)
- Case studies and teaching notes
- Corporate partnership examples

### 2.3 Invention

**Course Overview:**
- Focus: The invention process from ideation to commercialization
- Target Audience: Engineering and business students, aspiring entrepreneurs
- Key Themes: Creativity, prototyping, intellectual property, technology transfer

**Philosophy:**
- Encourage divergent thinking and creative problem-solving
- Connect technical innovation with market viability
- Navigate the path from idea to market-ready product

**Topics & Frameworks:**
- Ideation techniques and creative problem-solving
- Rapid prototyping and iteration
- Patent strategy and intellectual property fundamentals
- Technology assessment and validation
- Commercialization pathways (licensing, startup, corporate partnership)
- Pitch development and storytelling
- Funding strategies for early-stage innovations

**Example Projects:**
- Novel solution to identified technical challenge
- Patent landscape analysis and IP strategy
- Prototype development with user testing
- Technology commercialization plan

**Public Artifacts:**
- Course materials and syllabus
- Prototyping guides and resources
- Patent research tutorials
- Pitch deck templates and examples

---

## 3. Landing Page Requirements

### 3.1 Teaching Section Landing Page

**URL:** `/teaching`

**Purpose:** Primary entry point for teaching content; highlights courses and teaching philosophy

**Content Sections:**

1. **Hero/Introduction**
   - Brief statement of teaching philosophy and experience
   - Highlight years of experience and institutions (Northwestern, Ashesi University, etc.)
   - Tone: Professional, warm, accessible

2. **Featured Courses**
   - Visual cards for three primary courses:
     - Software Engineering
     - Corporate Innovation
     - Invention
   - Each card includes:
     - Course title
     - Brief description (1-2 sentences)
     - Key topics (3-5 tags)
     - Link to course page

3. **Teaching Philosophy**
   - Expanded statement (2-3 paragraphs)
   - Core principles:
     - Project-based, hands-on learning
     - Bridge theory and practice
     - Evidence-based methodologies
     - Prepare students for real-world challenges
     - Foster collaborative skills and creative problem-solving

4. **Highlights & Achievements**
   - Notable accomplishments (e.g., "Co-created award-winning NUvention Web program")
   - Guest lectures or workshops
   - Teaching awards or recognition
   - Published teaching materials or case studies

5. **Public Resources**
   - Links to syllabi, frameworks, or publicly available teaching materials
   - GitHub repositories with course code/examples
   - Teaching reflections or blog posts (tagged from Writing collection)

6. **Optional: Testimonials**
   - Student feedback or testimonials (if available and appropriate)
   - Brief quotes with attribution

**Design Considerations:**
- Clean, card-based layout consistent with site aesthetic
- Prominent course navigation
- Avoid year-based language ("Currently teaching..." rather than "In 2024...")
- Professional imagery (classroom, whiteboard, collaborative work)
- Responsive design for mobile

### 3.2 Course Landing Pages

**URLs:** 
- `/teaching/software-engineering`
- `/teaching/corporate-innovation`
- `/teaching/invention`

**Purpose:** Detailed overview of each course with navigation to modules, projects, and resources

**Content Sections:**

1. **Course Header**
   - Course title
   - Brief tagline or description
   - Course image or icon

2. **Overview**
   - Detailed course description (3-4 paragraphs)
   - Target audience
   - Learning objectives

3. **Philosophy**
   - Course-specific teaching approach
   - How this course fits into broader curriculum
   - Unique aspects or innovations

4. **Topics Covered**
   - Structured list or grid of key topics and frameworks
   - Group by theme if extensive
   - Visual hierarchy (primary vs. secondary topics)

5. **Example Projects**
   - Showcase 3-5 representative student projects
   - Project title, description, and link (if available)
   - Demonstrates learning outcomes

6. **Public Artifacts & Resources**
   - Downloadable syllabus
   - Framework templates
   - Code repositories
   - Slide decks or readings
   - Video lectures (if available)

7. **Modules/Units** (optional, if content exists)
   - Sequential listing of course modules
   - Brief description of each
   - Links to detailed module pages

8. **Related Content**
   - Links to teaching reflections (from Writing collection)
   - Blog posts about course topics
   - Related consulting work

**Design Considerations:**
- Consistent layout across all three course pages
- Clear navigation between courses (breadcrumbs or course selector)
- Emphasis on publicly accessible resources
- Professional, academic tone
- Visual distinction for different content types (overview, project, resource)

---

## 4. Enhanced Story 2 Definition

### Story 2: Create Teaching Section (Refined)

**Original Story:**
> Introduce a Teaching landing page plus course subpages for Corporate Innovation and Software Engineering with clear frontmatter for philosophy, topics, example projects, and public artifacts.

**Enhanced Story:**

#### Objective
Create a comprehensive Teaching section that showcases Todd's teaching experience, philosophy, and course offerings through a well-structured content collection and intuitive navigation.

#### Scope
- Design and implement a flexible teaching content collection schema
- Create a Teaching landing page highlighting three courses: Software Engineering, Corporate Innovation, and Invention
- Develop dedicated course landing pages with rich metadata and supporting content
- Enable content discoverability through tags and multi-course associations
- Maintain evergreen, year-independent content structure

#### User Stories

**As a prospective student, I want to:**
- Quickly understand Todd's teaching philosophy and approach
- Explore available courses with clear descriptions and learning objectives
- Access public course materials and example projects
- Discover related content across teaching, writing, and consulting

**As a fellow educator, I want to:**
- Learn about innovative teaching methodologies and frameworks
- Access publicly shared course materials and templates
- Read teaching reflections and insights
- Connect with Todd for potential collaboration or advice

**As a corporate partner, I want to:**
- Understand how Todd's teaching applies to organizational challenges
- Explore potential consulting connections
- Review case studies and example projects
- Assess fit for corporate training or advisory work

#### Acceptance Criteria

**Schema & Content Model:**
- [ ] Teaching collection schema supports flexible course associations
- [ ] Posts can belong to multiple courses via frontmatter array
- [ ] Schema includes philosophy, topics, frameworks, projects, and artifacts
- [ ] Content types differentiated (course overview, module, project, resource, reflection)

**Teaching Landing Page:**
- [ ] Hero section with teaching philosophy statement
- [ ] Featured cards for all three courses (Software Engineering, Corporate Innovation, Invention)
- [ ] Section highlighting teaching achievements and experience
- [ ] Links to public resources and teaching reflections
- [ ] Consistent with site navigation and design system

**Course Landing Pages:**
- [ ] Dedicated page for each course with detailed overview
- [ ] Philosophy, topics, and frameworks clearly presented
- [ ] Example projects showcased with descriptions and links
- [ ] Public artifacts organized and accessible
- [ ] Related content from Writing collection linked

**Content & Routing:**
- [ ] All routes follow `/teaching/*` pattern (no year-based URLs)
- [ ] Existing slugs preserved if any teaching content already exists
- [ ] Content tone is evergreen, professional, and accessible
- [ ] Mobile-responsive design

**Integration:**
- [ ] Teaching link in primary navigation
- [ ] Tags connect teaching content to Writing collection
- [ ] Consulting page references teaching credibility
- [ ] About page mentions teaching experience

#### Technical Requirements

**Content Collections:**
- Update `src/content/config.ts` with teaching collection schema
- Create content files in `src/content/teaching/` directory
- Organize by course subdirectory (organizational only)

**Pages:**
- Create `/src/pages/teaching/index.astro` (landing page)
- Create `/src/pages/teaching/[course].astro` or individual course pages
- Implement dynamic routing if needed for modules/posts

**Components:**
- CourseCard component for featured course display
- ProjectShowcase component for example projects
- ArtifactList component for public resources
- Reuse existing components where appropriate (PostCard, Tag, etc.)

**Data Access:**
- Implement collection queries to fetch teaching content
- Filter by course, content type, and tags
- Support featured content and ordering

#### Design Specifications

**Typography:**
- Headings: Inter font family (existing)
- Body: Inter, comfortable line height
- Code snippets: JetBrains Mono (if needed for technical content)

**Color Palette:**
- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Primary text: `#0F172A`
- Secondary text: `#475569`
- Accent: `#4F46E5`

**Layout:**
- Max content width: ~1200px for landing page
- Prose width: ~700px for course detail pages
- Grid layout for course cards (3 columns on desktop)
- Responsive breakpoints following site patterns

**Components:**
- Card-based design with subtle shadows
- Tag chips for topics/frameworks
- Clear CTAs for course pages and resources
- Image/icon support for visual interest

#### Content Guidelines

**Tone:**
- Professional and accessible, not overly academic
- Emphasize practical, real-world application
- Warm and inviting, reflecting teaching passion
- Evidence-based and credible

**Evergreen Principles:**
- Avoid specific years in titles or primary content
- Use present or continuous tense ("teaches", "focuses on")
- Date metadata for context, not routing
- Update regularly to maintain currency

**Frontmatter Best Practices:**
- Always include course associations (array)
- Specify content type for proper categorization
- Use tags generously for discoverability
- Link to external artifacts (GitHub, slides, syllabi)
- Keep descriptions concise and scannable

#### Dependencies & Constraints

**Dependencies:**
- Story 1 (Navigation) should be complete or in progress
- Design system and Tailwind tokens established
- Content collection infrastructure functional

**Constraints:**
- Preserve existing markdown files and slugs
- No year-based routing (e.g., avoid `/teaching/2024/course`)
- Maintain site build performance
- Ensure accessibility standards (ARIA labels, semantic HTML)

#### Out of Scope
- Interactive course enrollment or registration
- Video hosting (link externally if needed)
- Student portal or grade management
- Real-time collaboration features

#### Success Metrics
- Teaching section loads successfully with all three courses
- Content is discoverable through navigation, tags, and search
- Public artifacts are accessible and well-organized
- Mobile experience is smooth and content readable
- Page load performance meets site standards (<3s on 3G)

#### Future Enhancements (Post-MVP)
- Teaching blog/reflections archive
- Course module deep-dive pages
- Integration with Writing collection for teaching-tagged posts
- Student project gallery
- Teaching resources download center

---

## 5. Work Items Breakdown

### Phase 1: Schema Design & Setup

**WI-01: Define Teaching Collection Schema**
- [ ] Review existing content collections in `src/content/config.ts`
- [ ] Design Zod schema for teaching collection
- [ ] Include course array, content types, and rich metadata
- [ ] Test schema with sample frontmatter
- [ ] Document schema in this file

**WI-02: Create Content Directory Structure**
- [ ] Create `src/content/teaching/` directory
- [ ] Create course subdirectories (software-engineering, corporate-innovation, invention, shared)
- [ ] Add `.gitkeep` or initial README files
- [ ] Document organizational principles

### Phase 2: Content Development

**WI-03: Draft Course Overview Content**
- [ ] Write overview.md for Software Engineering
- [ ] Write overview.md for Corporate Innovation
- [ ] Write overview.md for Invention
- [ ] Include philosophy, topics, frameworks, projects, and artifacts
- [ ] Review and refine with Todd

**WI-04: Gather Example Projects**
- [ ] Collect descriptions and links for Software Engineering projects
- [ ] Collect descriptions and links for Corporate Innovation projects
- [ ] Collect descriptions and links for Invention projects
- [ ] Format as frontmatter arrays

**WI-05: Compile Public Artifacts**
- [ ] Gather syllabi, slides, templates, repositories
- [ ] Verify all links are publicly accessible
- [ ] Organize by course and type
- [ ] Add to course overview frontmatter

**WI-06: Write Teaching Philosophy Content**
- [ ] Draft overall teaching philosophy statement
- [ ] Draft course-specific philosophy statements
- [ ] Review tone and alignment with site style guide
- [ ] Edit for clarity and conciseness

### Phase 3: Component Development

**WI-07: Create CourseCard Component**
- [ ] Design component interface (props)
- [ ] Implement with Tailwind styling
- [ ] Support course icon, title, description, topics
- [ ] Add hover states and responsive design
- [ ] Write unit tests

**WI-08: Create ProjectShowcase Component**
- [ ] Design component for displaying example projects
- [ ] Support title, description, link, year (optional)
- [ ] Implement card or list layout
- [ ] Add responsive design
- [ ] Write unit tests

**WI-09: Create ArtifactList Component**
- [ ] Design component for public artifacts
- [ ] Support different artifact types (syllabus, slides, video, etc.)
- [ ] Include icons for artifact types
- [ ] Add download/external link handling
- [ ] Write unit tests

### Phase 4: Page Implementation

**WI-10: Create Teaching Landing Page**
- [ ] Create `/src/pages/teaching/index.astro`
- [ ] Implement hero section with teaching philosophy
- [ ] Add featured course cards (all three courses)
- [ ] Include highlights/achievements section
- [ ] Add links to public resources
- [ ] Ensure responsive design

**WI-11: Create Software Engineering Course Page**
- [ ] Create `/src/pages/teaching/software-engineering.astro`
- [ ] Fetch and render course overview content
- [ ] Display philosophy, topics, frameworks
- [ ] Showcase example projects
- [ ] List public artifacts
- [ ] Add navigation and breadcrumbs

**WI-12: Create Corporate Innovation Course Page**
- [ ] Create `/src/pages/teaching/corporate-innovation.astro`
- [ ] Fetch and render course overview content
- [ ] Display philosophy, topics, frameworks
- [ ] Showcase example projects
- [ ] List public artifacts
- [ ] Add navigation and breadcrumbs

**WI-13: Create Invention Course Page**
- [ ] Create `/src/pages/teaching/invention.astro`
- [ ] Fetch and render course overview content
- [ ] Display philosophy, topics, frameworks
- [ ] Showcase example projects
- [ ] List public artifacts
- [ ] Add navigation and breadcrumbs

### Phase 5: Integration & Navigation

**WI-14: Update Site Navigation**
- [ ] Add "Teaching" link to primary navigation
- [ ] Ensure Teaching link routes to `/teaching`
- [ ] Update mobile navigation if applicable
- [ ] Test navigation across all layouts

**WI-15: Tag Teaching Content for Cross-Collection Discovery**
- [ ] Add "teaching reflections" tag to relevant Writing posts
- [ ] Link teaching content from Consulting page
- [ ] Update About page to mention teaching experience
- [ ] Create tag index for teaching-related content

**WI-16: Implement Related Content Logic**
- [ ] Query Writing collection for teaching-tagged posts
- [ ] Display related content on course pages
- [ ] Add "More from Teaching" sections where appropriate
- [ ] Test dynamic content loading

### Phase 6: Testing & Refinement

**WI-17: Content Review & Editing**
- [ ] Review all teaching content for tone and clarity
- [ ] Check for spelling and grammar errors
- [ ] Verify all external links are functional
- [ ] Ensure evergreen language (no specific years)
- [ ] Get Todd's approval on content

**WI-18: Responsive Design Testing**
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on tablets
- [ ] Test on various desktop screen sizes
- [ ] Verify images and cards scale appropriately
- [ ] Fix any layout issues

**WI-19: Accessibility Audit**
- [ ] Run automated accessibility checker (axe, Lighthouse)
- [ ] Ensure proper heading hierarchy
- [ ] Add ARIA labels where needed
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Test with screen reader

**WI-20: Performance Testing**
- [ ] Run Lighthouse performance audit
- [ ] Optimize images if needed
- [ ] Check page load times on 3G
- [ ] Verify no unnecessary JavaScript loaded
- [ ] Test Astro build output

**WI-21: Cross-Browser Testing**
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Fix any browser-specific issues

### Phase 7: Documentation & Launch

**WI-22: Update Documentation**
- [ ] Update README with Teaching section info
- [ ] Document new components in style guide
- [ ] Add teaching schema to content collection docs
- [ ] Update work items as complete in 03-workitems.md

**WI-23: Pre-Launch Checklist**
- [ ] Verify all pages build successfully
- [ ] Check no broken links or 404s
- [ ] Ensure all images have alt text
- [ ] Test forms or interactive elements (if any)
- [ ] Review final content with Todd
- [ ] Get stakeholder sign-off

**WI-24: Launch**
- [ ] Merge teaching section into main branch
- [ ] Deploy to production
- [ ] Verify production deployment successful
- [ ] Monitor for any errors or issues
- [ ] Announce teaching section availability

**WI-25: Post-Launch Monitoring**
- [ ] Check analytics for page views and engagement
- [ ] Monitor for any user-reported issues
- [ ] Collect feedback for iteration
- [ ] Plan future enhancements

---

## 6. Legacy Gatsby Repository Reference

### 6.1 Gatsby Repository Context

The legacy Gatsby repository ([gb-toddwseattle](https://github.com/toddwseattle/toddwseattle-gb)) contains the previous version of Todd's portfolio site. While this Astro migration is an IA refresh (not a 1:1 port), the Gatsby repository may contain:

- Existing teaching content and course descriptions
- Teaching philosophy statements
- Example projects and student work
- Public artifacts (syllabi, slide decks, etc.)
- Blog posts about teaching ("teaching reflections" tag)
- Organizational patterns for course content

### 6.2 Content Audit Recommendations

When auditing the legacy Gatsby repository for teaching content:

**Look For:**
- Pages under `/teaching` or similar routes
- Blog posts tagged with teaching, education, or course names
- Course-specific directories or collections
- Markdown frontmatter patterns for courses
- Example projects or student showcases
- Downloadable resources (PDFs, templates, code repos)

**Extract:**
- Course descriptions and philosophies
- Topic lists and frameworks
- Project descriptions and links
- Teaching achievements and highlights
- Student testimonials or feedback
- Public artifact URLs

**Migrate:**
- Preserve any existing teaching URLs/slugs to avoid broken links
- Update content to evergreen language (remove year-specific references)
- Retag content for new tag taxonomy
- Ensure all external links are still functional
- Refresh outdated information

**Document:**
- Note which content is migrated as-is
- Flag content that needs updating or rewriting
- Identify content to archive or omit
- Track URL mappings for redirects if needed

### 6.3 Organizational Patterns to Consider

**From Legacy Gatsby:**
- How were courses organized? (separate pages, single page with tabs, etc.)
- How were teaching posts differentiated from blog posts?
- What metadata fields were used?
- How were example projects displayed?
- What navigation patterns were effective?

**Adapt for Astro:**
- Use content collections instead of page queries
- Leverage Zod schema for type safety
- Implement cleaner routing structure
- Improve mobile responsiveness
- Enhance discoverability through tags

### 6.4 Content Preservation Checklist

When reviewing the legacy Gatsby repository:

- [ ] Clone or access gb-toddwseattle repository
- [ ] Navigate to teaching-related pages/routes
- [ ] Export all teaching content (markdown files)
- [ ] Inventory existing teaching post slugs
- [ ] List all external links (syllabi, slides, projects)
- [ ] Capture student testimonials or quotes
- [ ] Note any embedded media (videos, images)
- [ ] Document existing tag/category structure
- [ ] Identify any interactive features to replicate
- [ ] Map old URLs to new IA structure

---

## 7. Design Patterns & Best Practices

### 7.1 Content Modeling Best Practices

**Flexible Multi-Course Association:**
```yaml
# Example: A post appearing in multiple courses
courses: ["software-engineering", "corporate-innovation"]
contentType: "module"
title: "Lean Development Principles"
```

**Clear Content Types:**
```yaml
# Course overview
contentType: "course-overview"

# Teaching module
contentType: "module"
order: 1

# Example project
contentType: "project"
exampleProjects: [...]

# Public resource
contentType: "resource"
publicArtifacts: [...]

# Teaching reflection
contentType: "reflection"
tags: ["teaching-reflections", "agile"]
```

**Evergreen Metadata:**
```yaml
# ❌ Avoid
title: "2024 Software Engineering Course"
date: "2024-09-01"

# ✅ Prefer
title: "Software Engineering"
date: "2024-09-01"  # For context only, not displayed prominently
lastUpdated: "2024-09-15"  # Shows content is current
```

### 7.2 Component Patterns

**CourseCard Component:**
- Displays course icon, title, description
- Shows 3-5 key topics as tags
- Links to course landing page
- Responsive grid layout (1 col mobile, 3 col desktop)

**ProjectShowcase Component:**
- Grid or list layout for projects
- Each project has title, description, optional link
- Optional year for context (not prominent)
- Visual distinction (card or list item)

**ArtifactList Component:**
- Grouped by type (syllabus, slides, video, code)
- Icons for each artifact type
- External link handling (open in new tab)
- Download icon for PDFs

### 7.3 Query Patterns

**Fetch All Courses:**
```typescript
const courses = await getCollection('teaching', (entry) => 
  entry.data.contentType === 'course-overview'
);
```

**Fetch Course Modules:**
```typescript
const modules = await getCollection('teaching', (entry) =>
  entry.data.courses.includes('software-engineering') &&
  entry.data.contentType === 'module'
);
```

**Fetch Multi-Course Content:**
```typescript
const sharedContent = await getCollection('teaching', (entry) =>
  entry.data.courses.length > 1
);
```

### 7.4 URL Structure

**Recommended Routes:**
- `/teaching` - Landing page
- `/teaching/software-engineering` - Course overview
- `/teaching/corporate-innovation` - Course overview
- `/teaching/invention` - Course overview
- `/teaching/[course]/[slug]` - Individual posts/modules (future)

**Avoid:**
- `/teaching/2024/software-engineering` - Year-based
- `/courses/software-engineering` - Different top-level
- `/teaching/se` - Unclear abbreviations

---

## 8. Success Criteria & Validation

### 8.1 Functional Success Criteria

- [ ] Teaching landing page renders with all three courses
- [ ] Each course page displays complete information (philosophy, topics, projects, artifacts)
- [ ] Navigation includes "Teaching" link and routes correctly
- [ ] All content is mobile-responsive
- [ ] External links open in new tabs and are functional
- [ ] Tags connect teaching content to Writing collection
- [ ] No year-based URLs exist
- [ ] All images have alt text
- [ ] Page load performance is acceptable (<3s on 3G)

### 8.2 Content Quality Criteria

- [ ] Teaching philosophy is clear and authentic
- [ ] Course descriptions accurately represent offerings
- [ ] Topics and frameworks are comprehensive
- [ ] Example projects are well-described with context
- [ ] Public artifacts are organized and accessible
- [ ] Tone is professional, warm, and accessible
- [ ] Language is evergreen (no specific years)
- [ ] No spelling or grammar errors

### 8.3 Design Quality Criteria

- [ ] Consistent with site design system
- [ ] Typography follows style guide
- [ ] Color usage aligns with design tokens
- [ ] Cards and components match site aesthetic
- [ ] Spacing and layout are balanced
- [ ] Visual hierarchy guides user attention
- [ ] Imagery is professional and relevant

### 8.4 Technical Quality Criteria

- [ ] Schema is type-safe and validates correctly
- [ ] Content collections build without errors
- [ ] Components are tested with Vitest
- [ ] Accessibility audit passes (Lighthouse score >90)
- [ ] Performance audit passes (Lighthouse score >85)
- [ ] Cross-browser compatibility verified
- [ ] No console errors or warnings

---

## 9. Future Enhancements

### 9.1 Post-MVP Features

**Enhanced Module Pages:**
- Detailed module/unit pages with learning objectives
- Sequential navigation between modules
- Progress tracking (if user auth added)

**Student Work Gallery:**
- Showcase exceptional student projects
- Filter by course, year, or category
- Optional student testimonials

**Teaching Resources Center:**
- Downloadable templates and frameworks
- Teaching guides and best practices
- Video tutorials or lectures

**Blog Integration:**
- Automatic display of teaching-tagged Writing posts
- Course-specific blog feeds
- Teaching reflections archive

### 9.2 Advanced Functionality

**Interactive Elements:**
- Embedded course demos or simulations
- Interactive frameworks (e.g., fillable Lean Canvas)
- Code playgrounds for software engineering

**Community Features:**
- Comments on teaching posts
- Q&A section for common questions
- Contact form for teaching inquiries

**Analytics & Insights:**
- Track which courses are most viewed
- Monitor popular resources
- Understand user journeys

---

## 10. Implementation Timeline Estimate

### Recommended Phases

**Phase 1: Foundation (1-2 weeks)**
- Schema design and content directory setup
- Content development (overviews, projects, artifacts)
- Component design (CourseCard, ProjectShowcase, ArtifactList)

**Phase 2: Core Implementation (2-3 weeks)**
- Teaching landing page
- Three course landing pages
- Navigation integration
- Basic styling and layout

**Phase 3: Content & Testing (1-2 weeks)**
- Content review and editing
- Responsive design testing
- Accessibility audit
- Performance optimization

**Phase 4: Launch & Refinement (1 week)**
- Final review and approval
- Production deployment
- Post-launch monitoring
- Bug fixes and refinement

**Total Estimate: 5-8 weeks** (depending on content availability and review cycles)

---

## 11. Open Questions & Decisions Needed

### Questions for Todd

1. **Content Priorities:**
   - Which course should be featured most prominently?
   - Are there existing syllabi, slides, or materials to include?
   - Do you have example projects to showcase?

2. **Course Scope:**
   - Should Invention course be included in MVP or deferred?
   - Are there other courses to include (e.g., NUvention Web)?
   - How detailed should module/unit pages be?

3. **Public Artifacts:**
   - Which materials are suitable for public sharing?
   - Are there any licensing or privacy concerns with student work?
   - Should GitHub repositories be linked or embedded?

4. **Design Preferences:**
   - Any specific visual style for teaching section?
   - Preference for grid vs. list layouts?
   - Should courses have distinct colors or icons?

5. **Future Features:**
   - Interest in student work gallery?
   - Plan for ongoing content updates?
   - Should teaching section be searchable?

### Technical Decisions

1. **Routing:**
   - Single dynamic route vs. individual course pages?
   - Should modules/posts have dedicated pages now or later?

2. **Component Reuse:**
   - Can we reuse PostCard for teaching modules?
   - Should CourseCard be generic for other uses?

3. **Image Handling:**
   - Stock images vs. custom photography?
   - Course icons or hero images needed?

4. **Performance:**
   - Should course overviews be pre-rendered or dynamically loaded?
   - Image optimization strategy?

---

## Conclusion

This comprehensive design document provides a complete blueprint for implementing the Teaching section as defined in Story 2. The design emphasizes:

- **Flexibility:** Multi-course content associations and rich metadata
- **Discoverability:** Tags, clear navigation, and related content
- **Evergreen Design:** Year-independent, maintainable content
- **User-Centric:** Clear information architecture for students, educators, and partners
- **Technical Excellence:** Type-safe schemas, tested components, performant pages

**Next Steps:**
1. Review this document with stakeholders
2. Gather existing teaching content from legacy Gatsby repository
3. Make decisions on open questions
4. Begin Phase 1: Schema Design & Setup

**No code should be written at this stage. This is a planning document only.**

---

**Document Version:** 1.0  
**Last Updated:** 2024-12-31  
**Author:** GitHub Copilot  
**Status:** Draft for Review
