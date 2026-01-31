# Spec: Comprehensive SEO Meta Tags

## Job to Be Done

When my content is shared on social media or indexed by search engines, it should have rich, accurate metadata for better discovery and presentation.

## Success Criteria

- Proper OpenGraph tags on all pages
- Twitter Card support for rich link previews
- Canonical URLs set correctly on every page
- Meta descriptions for all content types
- No duplicate or conflicting tags
- Validated with social media debuggers

## Constraints

- Must work with Astro's static site generation
- Preserve existing URLs (no changes to routing)
- No external services or APIs needed
- Must pass build and type checking
- Performance: No measurable impact on build time

## Implementation Notes

### Required Meta Tags

#### Basic SEO (Every Page)

```html
<meta name="description" content="Page-specific description" />
<link rel="canonical" href="https://toddwseattle.com/exact-path" />
```

#### OpenGraph (Every Page)

```html
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:url" content="https://toddwseattle.com/exact-path" />
<meta property="og:type" content="website" />
<!-- or "article" for blog posts -->
<meta property="og:image" content="https://toddwseattle.com/og-image.jpg" />
<meta property="og:site_name" content="Todd Warren" />
```

#### Twitter Cards (Every Page)

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@toddwseattle" />
<!-- if Twitter handle exists -->
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://toddwseattle.com/og-image.jpg" />
```

#### Blog Post Specific (Articles Only)

```html
<meta property="article:published_time" content="2026-01-30T00:00:00Z" />
<meta property="article:author" content="Todd Warren" />
<meta property="article:tag" content="tag1" />
<meta property="article:tag" content="tag2" />
```

### Component Architecture

**Create:** `src/components/SEO.astro`

```typescript
// Component props interface
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  canonicalUrl?: string;
}
```

**Features:**

- Accept props for all meta tag values
- Use site config for defaults (from astro.config.mjs)
- Generate all required meta tags
- Handle missing optional fields gracefully
- Support both page and article types
- Use Astro's canonical URL helper

### Integration Points

1. **Update:** `src/layouts/BaseLayout.astro`
   - Import SEO component
   - Add to `<head>` section
   - Pass site-wide defaults

2. **Update:** Blog post layout (check existing layouts)
   - Pass article-specific props
   - Include publish date
   - Pass tags array

3. **Update:** Page layouts
   - Pass page-specific props
   - Use "website" type

4. **Create:** Default OG image
   - Create or identify existing: `public/og-image.jpg`
   - Dimensions: 1200x630px (recommended)
   - Simple, professional design
   - Include site branding

### Default Values Strategy

**Site Config** (reference astro.config.mjs):

```typescript
const siteConfig = {
  title: "Todd Warren - Tech Consultant & Educator",
  description: "Technology consultant, software developer, and educator...",
  url: "https://toddwseattle.com",
  defaultImage: "/og-image.jpg",
  twitter: "@toddwseattle", // if exists
};
```

**Fallback Logic:**

- Title: Use page title, fallback to site title
- Description: Use page description, fallback to site description
- Image: Use page image, fallback to default OG image
- URL: Always use Astro's canonical URL helper
- Type: "article" for blog posts, "website" for everything else

### Content Type Matrix

| Page Type      | og:type | Extra Tags           |
| -------------- | ------- | -------------------- |
| Home           | website | -                    |
| About          | website | -                    |
| Blog List      | website | -                    |
| Blog Post      | article | published_time, tags |
| Teaching       | website | -                    |
| AutoSoft Today | website | -                    |

### Testing Strategy

#### Automated

- TypeScript must compile
- Build must succeed
- Verify HTML output includes meta tags

#### Manual Verification

1. **Build the site:** `npm run build`
2. **Check HTML output:** Inspect `dist/` files
3. **Social Media Debuggers:**
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/
4. **Browser DevTools:** View page source, check `<head>`

#### Test Pages

- Home page: `/`
- Blog post: `/blog/[any-post]`
- About page: `/about`
- Blog listing: `/blog`

### Files to Create/Modify

**Create:**

1. `src/components/SEO.astro` - Main SEO component
2. `public/og-image.jpg` - Default social sharing image (or identify existing)

**Modify:**

1. `src/layouts/BaseLayout.astro` - Add SEO component
2. Blog post layout - Pass article props
3. Other page layouts as needed

**Optional:**

- Update `astro.config.mjs` if site config needs tweaking

## Acceptance Criteria

- [ ] `src/components/SEO.astro` created
- [ ] SEO component accepts all required props with TypeScript types
- [ ] All layouts include SEO component with appropriate props
- [ ] OpenGraph tags complete on all pages
- [ ] Twitter Card tags complete on all pages
- [ ] Canonical URLs set correctly on all pages
- [ ] Meta descriptions on all content types
- [ ] Article-specific tags on blog posts (published_time, tags)
- [ ] Default OG image exists and is referenced
- [ ] No duplicate meta tags (verify with browser DevTools)
- [ ] TypeScript compiles: `npx tsc --noEmit`
- [ ] Build succeeds: `npm run build`
- [ ] Manual verification in Facebook Sharing Debugger
- [ ] Manual verification in Twitter Card Validator
- [ ] Documentation updated in appropriate /docs file

## Reference Resources

### External Documentation

- [OpenGraph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Astro SEO Guide](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

### Project Files

- `docs/04-style-guide.md` - Site information
- `astro.config.mjs` - Site configuration
- `src/layouts/BaseLayout.astro` - Main layout
- Existing blog post layout

## Example Output

After implementation, viewing page source should show:

```html
<head>
  <!-- Basic SEO -->
  <title>Building with Astro | Todd Warren</title>
  <meta name="description" content="A deep dive into migrating..." />
  <link
    rel="canonical"
    href="https://toddwseattle.com/blog/building-with-astro"
  />

  <!-- OpenGraph -->
  <meta property="og:title" content="Building with Astro" />
  <meta property="og:description" content="A deep dive into migrating..." />
  <meta
    property="og:url"
    content="https://toddwseattle.com/blog/building-with-astro"
  />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://toddwseattle.com/og-image.jpg" />
  <meta property="og:site_name" content="Todd Warren" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Building with Astro" />
  <meta name="twitter:description" content="A deep dive into migrating..." />
  <meta name="twitter:image" content="https://toddwseattle.com/og-image.jpg" />

  <!-- Article Specific -->
  <meta property="article:published_time" content="2026-01-30T00:00:00Z" />
  <meta property="article:author" content="Todd Warren" />
  <meta property="article:tag" content="software engineering" />
  <meta property="article:tag" content="web development" />
</head>
```

## Success Verification Checklist

```bash
# 1. TypeScript clean
npx tsc --noEmit

# 2. Build succeeds
npm run build

# 3. Check generated HTML
cat dist/index.html | grep -A 20 '<head>'
cat dist/blog/[some-post]/index.html | grep -A 20 '<head>'

# 4. Development server
npm run dev

# 5. Manual checks
# - View source on home page
# - View source on blog post
# - Verify all meta tags present
# - Copy URL and test in debuggers:
#   * https://developers.facebook.com/tools/debug/
#   * https://cards-dev.twitter.com/validator

# 6. Format code
npm run format
```

All automated checks must pass. Manual verification must confirm tags are correct.

## Notes

- OG image should be visually appealing when shared
- Descriptions should be engaging and accurate (not just stuffed keywords)
- Canonical URLs prevent duplicate content issues
- These tags significantly improve social media link previews
- This is site-wide infrastructure - benefits all current and future content
