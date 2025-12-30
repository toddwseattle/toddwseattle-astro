# Epic: Astro Migration – IA Refresh

## Objective
Recenter the ongoing Gatsby-to-Astro migration around a modern, writing-forward personal site that mirrors the target information architecture and priorities (teaching, writing, AutoSoft Today, consulting, and a refreshed bio) without restarting the project or breaking existing routes.

## Context & Intent
- Migration is a strategic information architecture refresh, not a 1:1 port of the legacy Gatsby site.
- The site should feature fewer top-level sections, strong writing posture, clean content collections, and long-term maintainability.
- Navigation should align to the six-item structure: Home, Teaching, Writing, AutoSoft Today, Consulting, About.

## Constraints
- Do not restart the project or re-import content.
- Preserve existing markdown/MDX, slugs, URLs, and content collections; avoid year-based routing.
- Keep routing stable; focus on layout, navigation, and content modeling realignment.
- Prefer tags/collections over deep folder nesting; avoid heavy marketing tone.

## Success Criteria
- Navigation matches the target IA and remains consistent across layouts.
- Teaching pages feel evergreen with clearly modeled course content for Corporate Innovation and Software Engineering.
- Writing is the primary content stream, consolidated into a clean collection with tag-driven discoverability (innovation, software engineering, teaching reflections, cycling, guitar/music).
- AutoSoft Today, Consulting, and About pages present concise, current narratives with outbound links or placeholders where appropriate.
- Architecture and content modeling support long-term evolution in Astro while honoring locked constraints.
