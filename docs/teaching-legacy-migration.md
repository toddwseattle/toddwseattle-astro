# Legacy Gatsby Repository - Teaching Content Migration Guide

This guide provides instructions for auditing and migrating teaching content from the legacy Gatsby repository ([gb-toddwseattle](https://github.com/toddwseattle/toddwseattle-gb)) to the new Astro-based teaching section.

---

## Overview

**Purpose:** Extract and migrate teaching-related content from the legacy Gatsby site while updating it to align with the new information architecture and evergreen content principles.

**Key Principle:** This is an IA refresh, not a 1:1 port. Content should be updated, refined, and reorganized to fit the new teaching section structure.

---

## 1. Repository Access & Setup

### Accessing the Legacy Repository

1. **Clone the repository:**
   ```bash
   git clone https://github.com/toddwseattle/toddwseattle-gb.git
   cd toddwseattle-gb
   ```

2. **Review repository structure:**
   ```bash
   ls -la
   find . -name "*teach*" -o -name "*course*" -o -name "*class*"
   ```

3. **Check for content directories:**
   - Look for `/content`, `/src/pages`, `/src/markdown-pages`, or similar
   - Identify teaching-related routes (e.g., `/teaching`, `/courses`)
   - Note any data files (JSON, YAML) with course information

---

## 2. Content Audit Checklist

### Teaching Pages to Locate

- [ ] **Teaching landing page** - Overview and philosophy
- [ ] **Course pages** - Software Engineering, Corporate Innovation, NUvention Web, etc.
- [ ] **Module/lesson pages** - Individual teaching units
- [ ] **Project showcases** - Example student projects
- [ ] **Resource libraries** - Syllabi, slides, templates
- [ ] **Teaching blog posts** - Reflections and insights

### Content Inventory Template

Create a spreadsheet or markdown file with:

| Content Title | Current URL | Content Type | Status | New Location | Notes |
|---------------|-------------|--------------|--------|--------------|-------|
| Teaching Home | /teaching | landing | migrate | /teaching | Update philosophy |
| SE Course | /teaching/software-engineering | course | migrate | /teaching/software-engineering | Add frameworks |
| Agile Module | /teaching/se/agile | module | migrate | teaching/software-engineering/module-agile.md | - |
| Project: TaskApp | /projects/taskapp | project | migrate | teaching/software-engineering/project-taskapp.md | Check link |

---

## 3. Content Types & Migration Strategy

### 3.1 Teaching Landing Page

**What to Extract:**
- Teaching philosophy statement
- Years of experience and institutions
- Course summaries
- Notable achievements (e.g., NUvention Web awards)
- Teaching approach and methodology

**How to Migrate:**
- Copy philosophy text; edit for evergreen tone
- Remove year-specific references (unless in context)
- Update institution information if needed
- Ensure consistency with new IA (three primary courses)

**Destination:** Use for content in `/src/pages/teaching/index.astro`

---

### 3.2 Course Pages

**What to Extract:**
- Course title and description
- Learning objectives
- Topics and frameworks covered
- Syllabi and course materials
- Example projects
- Student testimonials (if available)

**How to Migrate:**
1. Create course overview markdown file:
   - `src/content/teaching/software-engineering/overview.md`
   - `src/content/teaching/corporate-innovation/overview.md`
   - `src/content/teaching/invention/overview.md`

2. Use frontmatter template from [teaching-quick-reference.md](./teaching-quick-reference.md)

3. Update content:
   - Remove outdated information
   - Add missing fields (philosophy, frameworks, artifacts)
   - Ensure evergreen language

**Example Transformation:**

**Legacy Gatsby:**
```markdown
# Software Engineering - Fall 2023

This course, taught at Northwestern in Fall 2023, covers...
```

**New Astro:**
```yaml
---
title: 'Software Engineering'
courses: ['software-engineering']
contentType: 'course-overview'
date: '2023-09-01'
lastUpdated: '2024-09-15'
---

# Software Engineering

This course covers modern software engineering practices...
```

---

### 3.3 Modules/Lessons

**What to Extract:**
- Module titles and descriptions
- Learning objectives
- Topics covered
- Assignments or exercises
- Resources and readings

**How to Migrate:**
1. Create module files in course subdirectory
2. Add `contentType: 'module'` and `order` field
3. Preserve instructional content
4. Update links and references

**File Naming Convention:**
- `module-01-foundations.md`
- `module-02-design.md`
- `module-03-testing.md`

---

### 3.4 Example Projects

**What to Extract:**
- Project titles and descriptions
- Student names (if appropriate and with permission)
- GitHub repositories or demo links
- Technologies used
- Year/term for context

**How to Migrate:**
1. Add to `exampleProjects` array in course overview frontmatter
2. OR create dedicated project content files:
   - `src/content/teaching/software-engineering/project-taskapp.md`
   - Include `contentType: 'project'`

**Privacy Considerations:**
- Verify student consent for public showcasing
- Use project titles instead of student names if unsure
- Link only to publicly accessible repositories

---

### 3.5 Public Artifacts

**What to Extract:**
- Syllabi (PDF or markdown)
- Slide decks (Google Slides, PowerPoint, PDF)
- Course repositories (GitHub)
- Video lectures (YouTube, Vimeo)
- Framework templates (Lean Canvas, etc.)

**How to Migrate:**
1. Verify all links are publicly accessible
2. Update broken or expired links
3. Add to `publicArtifacts` array in frontmatter
4. Categorize by type (syllabus, slides, video, repository)

**Artifact Checklist:**
- [ ] Test all links - do they still work?
- [ ] Are they publicly accessible or require login?
- [ ] Do they contain sensitive information?
- [ ] Are they up-to-date or outdated?

---

### 3.6 Teaching Blog Posts / Reflections

**What to Extract:**
- Blog posts about teaching methodology
- Course retrospectives
- Teaching insights and lessons learned
- Pedagogical reflections

**How to Migrate:**

**Option 1: Keep in Writing Collection**
- Retag existing blog posts with `teaching-reflections` tag
- Link from teaching pages as "Related Content"

**Option 2: Migrate to Teaching Collection**
- Create new teaching content with `contentType: 'reflection'`
- Reference from course pages
- Cross-link with Writing collection

**Recommended:** Option 1 for general teaching reflections, Option 2 for course-specific content

---

## 4. URL Mapping & Redirects

### Identifying Legacy URLs

**Find all teaching-related URLs:**
```bash
# In legacy Gatsby repo
grep -r "teaching" src/pages/
grep -r "course" src/pages/
find . -name "*.md" -path "*/teaching/*"
```

### URL Mapping Template

| Legacy URL | New URL | Redirect Needed? | Notes |
|------------|---------|------------------|-------|
| /teaching | /teaching | No | Same path |
| /teaching/software-engineering | /teaching/software-engineering | No | Same path |
| /teaching/nuvention-web | /teaching/corporate-innovation | Yes | Course renamed |
| /teaching/2023/fall/course | /teaching/software-engineering | Yes | Remove year-based |

### Implementing Redirects

If URL changes are necessary:

1. **Option A: Netlify redirects** (if using Netlify)
   ```
   # public/_redirects
   /teaching/nuvention-web /teaching/corporate-innovation 301
   /teaching/2023/* /teaching/:splat 301
   ```

2. **Option B: Astro redirects**
   ```typescript
   // astro.config.mjs
   export default defineConfig({
     redirects: {
       '/teaching/nuvention-web': '/teaching/corporate-innovation',
     }
   });
   ```

3. **Option C: Client-side redirect pages**
   ```astro
   ---
   // src/pages/teaching/nuvention-web.astro
   ---
   <script>
     window.location.href = '/teaching/corporate-innovation';
   </script>
   ```

---

## 5. Content Transformation Examples

### Example 1: Course Page Transformation

**Legacy Gatsby (simplified):**
```markdown
---
path: "/teaching/software-engineering"
title: "Software Engineering - Fall 2023"
date: "2023-09-01"
---

# Software Engineering

Welcome to Software Engineering, Fall 2023!

## About the Course
This graduate-level course focuses on...

## Topics
- Agile Development
- Testing
- CI/CD

## Projects
Students will build a task management app.
```

**New Astro:**
```yaml
---
category: 'teaching'
title: 'Software Engineering'
description: 'Modern software engineering practices, design patterns, and collaborative development.'
courses: ['software-engineering']
contentType: 'course-overview'
philosophy: 'Emphasize practical, hands-on learning through real-world projects. Balance theory with industry best practices.'
topics:
  - 'Agile/Scrum methodologies'
  - 'Test-driven development'
  - 'CI/CD pipelines'
frameworks:
  - 'Scrum'
  - 'Git/GitHub'
exampleProjects:
  - title: 'Task Management Application'
    description: 'Team collaboration app with real-time features'
    url: 'https://github.com/example/task-manager'
    year: '2023'
publicArtifacts:
  - title: 'Course Syllabus Fall 2023'
    type: 'syllabus'
    url: 'https://example.com/syllabus-fall-2023.pdf'
tags: ['software-engineering', 'agile', 'web-development']
date: '2023-09-01'
lastUpdated: '2024-09-15'
published: true
---

# Software Engineering

This graduate-level course focuses on modern software engineering practices...

## About the Course
[Content updated to evergreen language]

## Learning Objectives
- Master Agile/Scrum methodologies
- Implement test-driven development
- Build and deploy production-ready applications
```

**Key Changes:**
- Removed year from title
- Added rich frontmatter (philosophy, frameworks, projects, artifacts)
- Converted topics to structured array
- Added contentType and courses fields
- Updated content to evergreen tone

---

### Example 2: Blog Post Re-tagging

**Legacy Gatsby:**
```markdown
---
title: "Reflections on Teaching Software Engineering"
category: "Blog"
tags: ["teaching", "software"]
---
```

**New Astro (Writing Collection):**
```yaml
---
title: "Reflections on Teaching Software Engineering"
category: "blog"
tags: ["teaching-reflections", "software-engineering", "pedagogy"]
---
```

**Changes:**
- Standardized tag: `teaching-reflections` (matches new taxonomy)
- More specific tag: `software-engineering` (enables filtering)
- Added pedagogical tag: `pedagogy`

---

## 6. Step-by-Step Migration Process

### Phase 1: Audit & Inventory

1. **Clone legacy repository**
   ```bash
   git clone https://github.com/toddwseattle/toddwseattle-gb.git
   cd toddwseattle-gb
   ```

2. **Locate teaching content**
   ```bash
   find . -name "*.md" -path "*teaching*"
   find . -name "*.md" -path "*course*"
   grep -r "teaching" src/pages/
   ```

3. **Create content inventory**
   - Document all teaching pages, blog posts, and resources
   - Note current URLs and content types
   - Identify content to migrate vs. archive

4. **Extract metadata**
   - Copy all frontmatter to reference document
   - List all external links (syllabi, repos, etc.)
   - Note any embedded media (images, videos)

### Phase 2: Content Preparation

5. **Gather external resources**
   - Verify all syllabus PDFs are accessible
   - Test GitHub repository links
   - Check slide deck permissions
   - Download or bookmark all artifacts

6. **Organize by course**
   - Group content by Software Engineering, Corporate Innovation, Invention
   - Identify multi-course content
   - Flag content that doesn't fit new structure

7. **Update and refine**
   - Edit for evergreen tone (remove year-specific language)
   - Fill in missing frontmatter fields
   - Update outdated information
   - Improve clarity and consistency

### Phase 3: Migration

8. **Create teaching collection structure**
   ```bash
   mkdir -p src/content/teaching/software-engineering
   mkdir -p src/content/teaching/corporate-innovation
   mkdir -p src/content/teaching/invention
   mkdir -p src/content/teaching/shared
   ```

9. **Migrate course overviews**
   - Create `overview.md` for each course
   - Use frontmatter template from quick reference
   - Paste and edit legacy content

10. **Migrate modules and projects**
    - Create module files with appropriate naming
    - Add project files or frontmatter arrays
    - Preserve instructional content

11. **Update Writing collection tags**
    - Find teaching blog posts: `grep -r "teaching" src/content/blog/`
    - Add `teaching-reflections` tag
    - Update other tags to match new taxonomy

### Phase 4: Validation

12. **Test content builds**
    ```bash
    npm run build
    ```

13. **Verify all links**
    - Check internal links (between pages)
    - Test external links (syllabi, repos, slides)
    - Fix or remove broken links

14. **Review for consistency**
    - Check frontmatter follows schema
    - Verify evergreen language throughout
    - Ensure tone matches style guide

15. **Implement redirects (if needed)**
    - Add redirect rules for changed URLs
    - Test redirects work correctly

### Phase 5: Documentation

16. **Document migration decisions**
    - What was migrated, updated, or archived
    - URL mappings and redirects
    - Content gaps or future additions

17. **Update content inventory**
    - Mark items as "migrated", "updated", or "deferred"
    - Note any content requiring future review

---

## 7. Common Challenges & Solutions

### Challenge: Outdated Content

**Problem:** Course materials reference old technologies, dates, or information.

**Solution:**
- Update technology names to current versions (or remove versions)
- Replace specific dates with general timeframes
- Remove references to past semesters/years
- Add `lastUpdated` field to track content freshness

### Challenge: Student Privacy

**Problem:** Student names, emails, or projects may be displayed without consent.

**Solution:**
- Use project titles instead of student names
- Link only to publicly accessible repositories
- Anonymize or aggregate student feedback
- Seek consent before showcasing individual work

### Challenge: Broken Links

**Problem:** External links to syllabi, slides, or repos are broken.

**Solution:**
- Find updated links or replacements
- Remove links if content no longer available
- Host critical documents locally (with permission)
- Use Internet Archive for historical content

### Challenge: Inconsistent Structure

**Problem:** Legacy content doesn't fit new schema or has inconsistent formatting.

**Solution:**
- Create mapping from old fields to new schema
- Standardize frontmatter using templates
- Extract unstructured data into proper fields
- Document exceptions or special cases

### Challenge: Multiple Versions

**Problem:** Same course content exists for multiple years/semesters.

**Solution:**
- Consolidate into single evergreen version
- Reference year-specific materials in frontmatter only
- Create separate artifact entries for each term's syllabus
- Keep most recent and relevant content

---

## 8. Quality Assurance Checklist

Before considering migration complete:

**Content Quality:**
- [ ] All content uses evergreen language (no specific years in titles)
- [ ] Frontmatter follows teaching collection schema
- [ ] Descriptions are clear and concise
- [ ] Tone is professional and accessible
- [ ] No spelling or grammar errors

**Links & Resources:**
- [ ] All external links tested and functional
- [ ] Internal links point to correct new routes
- [ ] Public artifacts are accessible without login
- [ ] GitHub repositories are public
- [ ] No sensitive information exposed

**Schema Compliance:**
- [ ] Required fields populated (title, description, courses, contentType)
- [ ] Arrays formatted correctly (topics, frameworks, tags)
- [ ] Dates in correct format (YYYY-MM-DD)
- [ ] Content types match allowed values
- [ ] Course associations are accurate

**Integration:**
- [ ] Teaching content builds without errors
- [ ] Pages render correctly
- [ ] Navigation includes teaching section
- [ ] Tags connect to Writing collection
- [ ] Related content displays properly

**Accessibility:**
- [ ] All images have alt text
- [ ] Headings are properly structured
- [ ] Links have descriptive text
- [ ] Color contrast is sufficient
- [ ] Keyboard navigation works

---

## 9. Post-Migration Tasks

### Immediate (Week 1)

- [ ] Monitor for broken links or errors
- [ ] Collect user feedback
- [ ] Fix any display issues
- [ ] Verify analytics tracking

### Short-term (Month 1)

- [ ] Review content accuracy and freshness
- [ ] Update any outdated information
- [ ] Add missing content identified post-launch
- [ ] Gather and incorporate stakeholder feedback

### Ongoing

- [ ] Regular content review (quarterly or annually)
- [ ] Update lastUpdated dates when changes made
- [ ] Add new courses, modules, or projects
- [ ] Archive or remove obsolete content
- [ ] Maintain link hygiene (test and fix broken links)

---

## 10. Resources & References

**Documentation:**
- [Teaching Section Design](./teaching-section-design.md) - Comprehensive design document
- [Teaching Quick Reference](./teaching-quick-reference.md) - Quick implementation guide
- [Story 2 Enhanced](./02-stories.md) - Enhanced story with acceptance criteria
- [Style Guide](./04-style-guide.md) - Tone and content principles

**Legacy Repository:**
- [gb-toddwseattle](https://github.com/toddwseattle/toddwseattle-gb) - Legacy Gatsby repository

**Tools:**
- [Link Checker](https://validator.w3.org/checklink) - Validate external links
- [Markdown Lint](https://github.com/DavidAnson/markdownlint) - Check markdown quality
- [Internet Archive](https://archive.org/) - Find archived versions of broken links

---

## Appendix: Frontmatter Migration Mapping

Legacy Gatsby to New Astro frontmatter field mappings:

| Legacy Field | New Field | Transformation | Example |
|--------------|-----------|----------------|---------|
| `path` | Derived from filename/route | Remove `.md`, use as route | `/teaching/course.md` → `/teaching/course` |
| `title` | `title` | Remove year/semester | "SE - Fall 2023" → "Software Engineering" |
| `date` | `date` | Keep for context | "2023-09-01" → "2023-09-01" |
| `category` | `category`, `contentType` | Split into two fields | "teaching" → category: "teaching", contentType: "course-overview" |
| `tags` | `tags` | Standardize to new taxonomy | ["teaching", "SE"] → ["teaching-reflections", "software-engineering"] |
| (none) | `courses` | Add based on content | N/A → `courses: ["software-engineering"]` |
| (none) | `philosophy` | Extract from content | N/A → Add philosophy statement |
| (none) | `topics` | Extract from content | N/A → Convert bulleted list to array |
| (none) | `frameworks` | Extract from content | N/A → Identify and list frameworks |
| (none) | `exampleProjects` | Extract from content | N/A → Structure project info |
| (none) | `publicArtifacts` | Extract from links | N/A → Organize external resources |

---

**Document Version:** 1.0  
**Last Updated:** 2024-12-31  
**Author:** GitHub Copilot  
**Status:** Ready for Use
