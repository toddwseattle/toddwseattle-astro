# Workitems Supporting Stories

## For Story 1: Define Top-Level Navigation
1. Inventory current navigation and header components to remove Gatsby-era menu items while preserving route integrity.
2. Implement the six-link navigation (Home, Teaching, Writing, AutoSoft Today, Consulting, About) in shared layout(s) for desktop and mobile.
3. Update internal links to point to new/realigned pages or collections without changing existing slugs.

## For Story 2: Create Teaching Section
1. Draft Teaching landing page structure and content model to highlight Corporate Innovation and Software Engineering.
2. Define course frontmatter schema (philosophy, topics/frameworks, example projects, public artifacts/links) using content collections.
3. Create course subpages under the Teaching collection and link them from the Teaching landing page.
4. Ensure routing avoids year-based paths and remains consistent with locked constraints.

## For Story 3: Consolidate Blog → Writing
1. Create or update a Writing collection that supersedes the blog while preserving existing post slugs.
2. Map current categories to the target tag set (innovation & org design, software engineering, teaching reflections, cycling, guitar & music); plan retagging without deleting markdown.
3. Update the Writing index to use PostCard-style listings with optional images and tag chips.
4. Validate that existing blog routes resolve and redirect appropriately if needed without breaking URLs.

## For Story 4: AutoSoft Today Landing Page
1. Draft a concise landing page describing AutoSoft Today’s purpose and current status.
2. Add prominent external links to autosofttoday.com and representative content highlights without importing that content.
3. Integrate the page into navigation and ensure layout consistency.

## For Story 5: Consulting Page
1. Outline consulting positioning (problems solved, connection to teaching/writing) in a restrained tone.
2. Add a lightweight contact or next-step element that fits existing routing patterns.
3. Ensure styling aligns with the calm, writing-forward aesthetic (no heavy marketing elements).

## For Story 6: About Page Refresh
1. Rewrite bio content to foreground current focus areas in present tense and add sections for boards/advisory roles and seasonal location (Seattle/Park City).
2. Include a CV link placeholder and ensure link handling matches site conventions.
3. Verify the page uses shared layouts and appears correctly in navigation.

## For Story 7: Content Audit & Triage
1. Inventory existing posts/pages and categorize them as migrate-as-is, retag, or archive/omit while preserving slugs for kept items.
2. Document retagging/collection changes needed to align with the new IA and locked constraints.
3. Capture follow-up implementation tasks and potential redirects (if any) while avoiding deletion of markdown/MDX.
