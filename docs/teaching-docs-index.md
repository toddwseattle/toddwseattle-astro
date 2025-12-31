# Teaching Section Documentation - Index

This index provides navigation to all documentation related to implementing the Teaching section (Story 2) for the Astro portfolio migration.

---

## 📚 Documentation Overview

### Purpose
Create comprehensive documentation for implementing the teaching section with flexible schema design, course landing pages, and clear implementation guidance—**without writing any code at this stage**.

### Status
✅ **Documentation Complete** - Ready for implementation phase

---

## 📖 Documentation Files

### 1. **Comprehensive Design Document** ⭐
**File:** [`teaching-section-design.md`](./teaching-section-design.md)

**Contents:**
- Complete schema design for teaching content collection (Zod/TypeScript)
- Detailed definitions for three courses: Software Engineering, Corporate Innovation, Invention
- Landing page and course page content requirements
- 25 detailed work items organized into 7 implementation phases
- Component patterns and query examples
- Success criteria and validation checklist
- Future enhancement roadmap
- Open questions and decisions needed

**Use When:** Planning implementation, designing schema, creating content, building components

**Length:** ~36,000 characters (comprehensive)

---

### 2. **Quick Reference Guide** ⚡
**File:** [`teaching-quick-reference.md`](./teaching-quick-reference.md)

**Contents:**
- Schema overview with code examples
- File structure recommendations
- Content templates (course overview, module, multi-course)
- Component reference (props and usage)
- URL routing patterns
- Key decisions and pre-implementation checklist
- Query examples for common operations

**Use When:** Quick lookups during implementation, schema reference, template examples

**Length:** ~10,000 characters (concise reference)

---

### 3. **Legacy Migration Guide** 🔄
**File:** [`teaching-legacy-migration.md`](./teaching-legacy-migration.md)

**Contents:**
- Instructions for auditing Gatsby repository ([gb-toddwseattle](https://github.com/toddwseattle/toddwseattle-gb))
- Content audit checklist and inventory template
- Migration strategies for different content types
- URL mapping and redirect guidance
- Content transformation examples (Gatsby → Astro)
- Step-by-step migration process (6 phases)
- Quality assurance checklist
- Common challenges and solutions

**Use When:** Migrating content from legacy repository, preserving URLs, transforming legacy frontmatter

**Length:** ~19,000 characters (detailed guide)

---

### 4. **Enhanced Story 2** 📋
**File:** [`02-stories.md`](./02-stories.md#story-2-create-teaching-section-enhanced)

**Contents:**
- Refined story objective and scope
- User stories (students, educators, corporate partners)
- Comprehensive acceptance criteria
- Technical requirements
- Design specifications
- Content guidelines
- Dependencies and constraints
- Success metrics

**Use When:** Understanding story requirements, defining acceptance criteria, planning sprints

**Length:** ~2,000 characters (story format)

---

### 5. **Work Items Breakdown** ✅
**File:** [`03-workitems.md`](./03-workitems.md#for-story-2-create-teaching-section)

**Contents:**
- High-level work items (7 phases)
- References to detailed work items in comprehensive design
- Phase organization: Schema, Content, Components, Pages, Integration, Testing, Launch

**Use When:** Sprint planning, task assignment, progress tracking

**Length:** ~1,500 characters (task list)

---

## 🗺️ Documentation Map

```
Teaching Section Documentation
│
├── 📘 teaching-section-design.md (COMPREHENSIVE)
│   ├── 1. Schema Design (with code)
│   ├── 2. Course Definitions (SE, CI, Invention)
│   ├── 3. Landing Page Requirements
│   ├── 4. Enhanced Story Definition
│   ├── 5. Work Items (25 detailed tasks)
│   ├── 6. Legacy Repository Reference
│   ├── 7. Design Patterns & Best Practices
│   ├── 8. Success Criteria & Validation
│   ├── 9. Future Enhancements
│   ├── 10. Timeline Estimate
│   └── 11. Open Questions
│
├── ⚡ teaching-quick-reference.md (QUICK LOOKUPS)
│   ├── Schema Overview
│   ├── File Structure
│   ├── Content Templates
│   ├── Component Reference
│   ├── URL Routing
│   ├── Key Decisions
│   └── Query Examples
│
├── 🔄 teaching-legacy-migration.md (MIGRATION GUIDE)
│   ├── Repository Access & Setup
│   ├── Content Audit Checklist
│   ├── Migration Strategies by Content Type
│   ├── URL Mapping & Redirects
│   ├── Content Transformation Examples
│   ├── Step-by-Step Process (6 phases)
│   ├── Common Challenges & Solutions
│   ├── Quality Assurance Checklist
│   └── Post-Migration Tasks
│
├── 📋 02-stories.md (STORY DEFINITION)
│   └── Story 2: Enhanced with objectives, user stories, acceptance criteria
│
└── ✅ 03-workitems.md (TASK LIST)
    └── High-level work items + reference to detailed tasks
```

---

## 🚀 Getting Started

### For Implementation Planning
1. **Read:** [teaching-section-design.md](./teaching-section-design.md) - Full context and design
2. **Review:** [02-stories.md](./02-stories.md) - Story requirements and acceptance criteria
3. **Plan:** [03-workitems.md](./03-workitems.md) - Break down into sprint tasks

### For Schema Design
1. **Reference:** [teaching-quick-reference.md](./teaching-quick-reference.md#schema-overview) - Schema code
2. **Details:** [teaching-section-design.md](./teaching-section-design.md#1-teaching-content-collection-schema) - Schema rationale

### For Content Migration
1. **Start:** [teaching-legacy-migration.md](./teaching-legacy-migration.md) - Complete migration guide
2. **Audit:** Legacy repository following checklist
3. **Transform:** Use content transformation examples

### For Component Development
1. **Reference:** [teaching-quick-reference.md](./teaching-quick-reference.md#component-reference) - Component props
2. **Patterns:** [teaching-section-design.md](./teaching-section-design.md#72-component-patterns) - Design patterns

---

## 📂 Related Documentation

### Project-Level Documentation
- **[Epic: Astro Migration](./01-epic.md)** - Overall migration strategy and constraints
- **[All Stories](./02-stories.md)** - Complete user stories for migration
- **[All Work Items](./03-workitems.md)** - Work items for all stories
- **[Style Guide](./04-style-guide.md)** - IA, tone, layout, and working practices

### Repository Documentation
- **[README.md](../README.md)** - Project overview and setup
- **[Content Config](../src/content/config.ts)** - Current content collection schemas
- **[Legacy Repository](https://github.com/toddwseattle/toddwseattle-gb)** - Original Gatsby site

---

## ✅ Implementation Phases

### Phase 1: Schema Design & Setup
**Docs:** [Design §1](./teaching-section-design.md#1-teaching-content-collection-schema), [Quick Reference](./teaching-quick-reference.md#schema-overview)

**Tasks:**
- Define teaching collection schema
- Create content directory structure

---

### Phase 2: Content Development
**Docs:** [Design §2](./teaching-section-design.md#2-course-definitions), [Migration Guide](./teaching-legacy-migration.md)

**Tasks:**
- Draft course overviews (SE, CI, Invention)
- Gather example projects and artifacts
- Write teaching philosophy

---

### Phase 3: Component Development
**Docs:** [Quick Reference §4](./teaching-quick-reference.md#component-reference), [Design §7](./teaching-section-design.md#72-component-patterns)

**Tasks:**
- Create CourseCard component
- Create ProjectShowcase component
- Create ArtifactList component
- Write unit tests

---

### Phase 4: Page Implementation
**Docs:** [Design §3](./teaching-section-design.md#3-landing-page-requirements), [Quick Reference §5](./teaching-quick-reference.md#url-routing)

**Tasks:**
- Teaching landing page
- Three course landing pages
- Responsive design

---

### Phase 5: Integration & Navigation
**Docs:** [Story 2](./02-stories.md#story-2-create-teaching-section-enhanced), [Design §4](./teaching-section-design.md#4-enhanced-story-2-definition)

**Tasks:**
- Update site navigation
- Tag teaching content
- Implement related content logic

---

### Phase 6: Testing & Refinement
**Docs:** [Design §8](./teaching-section-design.md#8-success-criteria--validation), [Migration QA](./teaching-legacy-migration.md#8-quality-assurance-checklist)

**Tasks:**
- Content review and editing
- Responsive design testing
- Accessibility audit
- Performance testing
- Cross-browser testing

---

### Phase 7: Documentation & Launch
**Docs:** [Design §5 Work Items](./teaching-section-design.md#5-work-items-breakdown)

**Tasks:**
- Update documentation
- Pre-launch checklist
- Deploy to production
- Post-launch monitoring

---

## 🎯 Key Design Decisions

### ✅ Confirmed Decisions

1. **Three Primary Courses:**
   - Software Engineering
   - Corporate Innovation
   - Invention

2. **Flexible Multi-Course Association:**
   - Content can belong to multiple courses via `courses` array
   - Example: "Project-Based Learning" relevant to all three

3. **Content Type Differentiation:**
   - `course-overview` - Landing page for course
   - `module` - Teaching unit
   - `project` - Example project
   - `resource` - Reading/tool
   - `reflection` - Teaching insight

4. **Evergreen Content Strategy:**
   - No year-based routing (e.g., `/teaching/2024/course`)
   - Dates for context only, not prominent display
   - Present/continuous tense ("teaches", "focuses on")

5. **Rich Metadata:**
   - Philosophy statements
   - Topics and frameworks arrays
   - Example projects with structured data
   - Public artifacts categorized by type

6. **Tag Integration:**
   - Connect teaching content to Writing collection
   - Use `teaching-reflections` tag consistently

---

## ❓ Open Questions

These questions should be answered before implementation:

1. **Course Prioritization:**
   - Should Invention be in MVP or Phase 2?
   - Are there other courses to include (NUvention Web)?

2. **Content Depth:**
   - Should modules have dedicated pages now or later?
   - How detailed should course content be initially?

3. **Resources:**
   - Which materials are suitable for public sharing?
   - Are existing syllabi/slides available?
   - Do we have example projects to showcase?

4. **Design:**
   - Should courses have distinct colors or icons?
   - Grid vs. list preference for projects?

5. **Technical:**
   - Dynamic routing vs. individual course pages?
   - Should we reuse PostCard for teaching modules?

---

## 📊 Success Metrics

### Content Quality
- [ ] All three courses documented with complete information
- [ ] Teaching philosophy is clear and authentic
- [ ] Example projects are well-described with context
- [ ] Public artifacts are organized and accessible

### Technical Quality
- [ ] Schema validates and builds without errors
- [ ] Components are tested with Vitest
- [ ] Accessibility score >90 (Lighthouse)
- [ ] Performance score >85 (Lighthouse)

### User Experience
- [ ] Teaching section discoverable via navigation
- [ ] Mobile experience is smooth
- [ ] External links work and open in new tabs
- [ ] Tags enable content discovery

---

## 🔗 Quick Links

### Internal Documentation
- [Comprehensive Design](./teaching-section-design.md)
- [Quick Reference](./teaching-quick-reference.md)
- [Migration Guide](./teaching-legacy-migration.md)
- [Enhanced Story 2](./02-stories.md#story-2-create-teaching-section-enhanced)
- [Work Items](./03-workitems.md#for-story-2-create-teaching-section)

### Project Documentation
- [Epic](./01-epic.md)
- [All Stories](./02-stories.md)
- [Style Guide](./04-style-guide.md)
- [README](../README.md)

### External Resources
- [Legacy Gatsby Repository](https://github.com/toddwseattle/toddwseattle-gb)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Zod Schema Validation](https://zod.dev/)

---

## 📝 Documentation Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-12-31 | Initial documentation suite created | GitHub Copilot |

---

## 🤝 Contributing

When adding or updating teaching documentation:

1. **Keep this index updated** with new files and changes
2. **Cross-reference** between documents for easy navigation
3. **Maintain consistency** in terminology and structure
4. **Version updates** when making significant changes
5. **Follow style guide** principles in all documentation

---

## 💡 Tips for Using This Documentation

### For Developers
- Start with Quick Reference for immediate implementation needs
- Consult Comprehensive Design for context and rationale
- Use Migration Guide when working with legacy content

### For Content Creators
- Review Course Definitions in Comprehensive Design
- Use Content Templates from Quick Reference
- Follow Migration Guide for legacy content transformation

### For Project Managers
- Review Enhanced Story 2 for requirements
- Track progress using Work Items
- Reference Timeline Estimate in Comprehensive Design

### For Stakeholders
- Read Course Definitions for content overview
- Review Landing Page Requirements for UX expectations
- Check Success Criteria for quality standards

---

**Document Version:** 1.0  
**Last Updated:** 2024-12-31  
**Status:** Complete and Ready for Implementation

---

**Remember:** This is a documentation-only phase. **No code should be written at this stage.** All implementation should follow the design and guidelines provided in these documents.
