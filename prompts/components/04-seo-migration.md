# SEO Component Migration

> **Strategic Context:** SEO implementation should support the content architecture and navigation priorities defined in `/docs/01-epic.md` and align with the writing-forward posture emphasized throughout `/docs/04-style-guide.md`.

## Component Type: Head/Meta Management

## Priority: High (Critical for search optimization)

## Recommended Approach: Hybrid Strategy

Use **astro-seo** package for comprehensive SEO management + Astro native integrations for sitemap and RSS.

## Original Gatsby Component

**Location:** `/home/toddwseattle/pw-toddwseattle/src/components/SEO/index.tsx`

Uses React Helmet for head management with:

- Page title with template
- Meta description
- Open Graph tags (og:title, og:description, og:type)
- Twitter card tags
- Custom meta tags support

## Migration Strategy

### Best Practice: Use astro-seo Package

The `astro-seo` package (142K+ weekly downloads) is the industry-standard solution for SEO in Astro projects. It provides a comprehensive, type-safe API for managing all SEO tags.

**Why astro-seo?**

- ✅ Most popular SEO solution in Astro ecosystem (142K+ weekly downloads)
- ✅ Comprehensive support for all meta tags, Open Graph, Twitter Cards
- ✅ Type-safe TypeScript API
- ✅ Inspired by Next SEO (proven patterns)
- ✅ Easy to use and maintain
- ✅ Actively maintained with 1.2k+ stars on GitHub

### 1. Install Required Packages

```bash
# Core SEO package
npm install astro-seo

# Official Astro integrations for sitemap and RSS
npm install @astrojs/sitemap @astrojs/rss
```

### 2. Configure Site Metadata

**Create: `/src/config/site.ts`**

```typescript
export const siteConfig = {
  title: "Todd Warren",
  description:
    "Technology leader, educator, and startup advisor specializing in consulting, teaching, and assisting impact-driven organizations",
  author: {
    name: "Todd Warren",
    twitter: "@toddwseattle",
  },
  siteUrl: "https://toddwarren.com", // Update with your actual domain
  defaultImage: "/og-image.jpg", // Default Open Graph image
  lang: "en",
  locale: "en_US",
};
```

### 3. Update BaseLayout.astro

Import and use the SEO component:

```astro
---
import { SEO } from 'astro-seo';
import { siteConfig } from '../config/site';
import '../assets/styles/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const {
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.defaultImage,
  article = false,
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
} = Astro.props;

// Construct full title with site name
const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.title}`;

// Get canonical URL
const canonicalURL = new URL(Astro.url.pathname, Astro.site ?? siteConfig.siteUrl).href;

// Construct full image URL
const fullImageURL = new URL(image, Astro.site ?? siteConfig.siteUrl).href;
---

<!doctype html>
<html lang={siteConfig.lang}>
  <head>
    <SEO
      title={fullTitle}
      description={description}
      canonical={canonicalURL}
      noindex={noindex}
      nofollow={nofollow}
      charset="UTF-8"
      openGraph={{
        basic: {
          title: fullTitle,
          type: article ? "article" : "website",
          image: fullImageURL,
          url: canonicalURL,
        },
        optional: {
          description: description,
          locale: siteConfig.locale,
          siteName: siteConfig.title,
        },
        ...(article && publishedTime && {
          article: {
            publishedTime,
            modifiedTime,
            authors: [siteConfig.author.name],
          }
        })
      }}
      twitter={{
        card: "summary_large_image",
        site: siteConfig.author.twitter,
        creator: siteConfig.author.twitter,
        title: fullTitle,
        description: description,
        image: fullImageURL,
        imageAlt: `${title} cover image`,
      }}
      extend={{
        link: [
          { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
          { rel: "sitemap", href: "/sitemap-index.xml" },
        ],
        meta: [
          { name: "viewport", content: "width=device-width, initial-scale=1.0" },
          { name: "generator", content: Astro.generator },
          { name: "author", content: siteConfig.author.name },
        ],
      }}
    />
  </head>
  <body class="m-0 text-indigo-900 bg-white">
    <div class="flex flex-col min-h-screen">
      <slot />
    </div>
  </body>
</html>

<style is:global>
  a {
    @apply text-indigo-600 hover:text-indigo-700;
  }

  p + p {
    @apply mt-3;
  }
</style>
```

### 4. Configure astro.config.mjs

Add sitemap integration:

```javascript
// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://toddwarren.com", // REQUIRED for sitemap
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes("/admin/"), // Exclude admin pages
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
```

### 5. Create robots.txt

**Option A: Static file (Create `/public/robots.txt`)**

```txt
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://toddwarren.com/sitemap-index.xml
```

**Option B: Dynamic file (Create `/src/pages/robots.txt.ts`)** - Recommended

```typescript
import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) =>
  `
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
```

### 6. Add RSS Feed (Optional, for blog)

**Create: `/src/pages/rss.xml.ts`**

```typescript
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");

  return rss({
    title: `${siteConfig.title} Blog`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>${siteConfig.lang}</language>`,
    stylesheet: "/rss/styles.xsl", // Optional: custom RSS styling
  });
};
```

### 7. Update Page Usage

**Example: Homepage**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Home"
  description="Todd Warren - Technology leader, educator, and startup advisor"
>
  <!-- Page content -->
</BaseLayout>
```

**Example: Blog Post**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const { entry } = Astro.props;
---

<BaseLayout
  title={entry.data.title}
  description={entry.data.description}
  image={entry.data.coverImage}
  article={true}
  publishedTime={entry.data.pubDate.toISOString()}
  modifiedTime={entry.data.updatedDate?.toISOString()}
>
  <!-- Article content -->
</BaseLayout>
```

### 8. Add JSON-LD Structured Data (Advanced)

For enhanced rich snippets, create a reusable component:

**Create: `/src/components/StructuredData.astro`**

```astro
---
import { siteConfig } from '../config/site';

interface Props {
  type?: 'Person' | 'Organization' | 'Article' | 'WebSite';
  data?: Record<string, any>;
}

const { type = 'WebSite', data = {} } = Astro.props;

const baseData = {
  '@context': 'https://schema.org',
  '@type': type,
};

const schemas = {
  WebSite: {
    ...baseData,
    name: siteConfig.title,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  },
  Person: {
    ...baseData,
    name: siteConfig.author.name,
    url: siteConfig.siteUrl,
  },
  Article: {
    ...baseData,
    headline: data.title,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.title,
    },
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime,
    ...data,
  },
};

const schema = { ...schemas[type], ...data };
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

Usage in BaseLayout or pages:

```astro
<StructuredData type="WebSite" />
```

## Implementation Steps

1. **Install packages**

   ```bash
   npm install astro-seo @astrojs/sitemap @astrojs/rss
   ```

2. **Create site config**
   - Create `/src/config/site.ts` with site metadata

3. **Update astro.config.mjs**
   - Add `site` URL (REQUIRED)
   - Add sitemap integration
   - Configure sitemap options

4. **Update BaseLayout.astro**
   - Import and configure SEO component
   - Add all meta tags via astro-seo
   - Support optional article/blog props

5. **Create robots.txt**
   - Choose static or dynamic approach
   - Reference sitemap URL
   - Configure crawler rules

6. **Add RSS feed** (if blog exists)
   - Create `/src/pages/rss.xml.ts`
   - Configure feed metadata
   - Map blog posts to RSS items

7. **Create OG image**
   - Design and add `/public/og-image.jpg` (1200x630px)
   - Consider per-page OG images

8. **Update all pages**
   - Pass SEO props to BaseLayout
   - Customize title and description per page

9. **Add structured data** (optional)
   - Create StructuredData component
   - Add to relevant pages

10. **Test thoroughly**
    - Use testing checklist below

## Testing Checklist

### Meta Tags

- [ ] Page titles display correctly in browser tabs
- [ ] Unique title for each page with site name
- [ ] Meta description appears in view-source (150-160 characters)
- [ ] Canonical URLs are correct and absolute
- [ ] Charset is UTF-8
- [ ] Viewport meta tag present
- [ ] Generator tag shows Astro

### Open Graph

- [ ] og:title present and correct
- [ ] og:description present and descriptive
- [ ] og:type is "website" or "article" as appropriate
- [ ] og:image is absolute URL and exists (1200x630px)
- [ ] og:url is canonical URL
- [ ] og:site_name present
- [ ] og:locale set to en_US (or appropriate)
- [ ] Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### Twitter Cards

- [ ] twitter:card set to "summary_large_image"
- [ ] twitter:site and twitter:creator present
- [ ] twitter:title present
- [ ] twitter:description present
- [ ] twitter:image is absolute URL
- [ ] twitter:image:alt descriptive
- [ ] Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Technical SEO

- [ ] Sitemap generates at /sitemap-index.xml
- [ ] robots.txt accessible at /robots.txt
- [ ] robots.txt references sitemap
- [ ] RSS feed works (if applicable)
- [ ] No duplicate meta tags
- [ ] All images have alt text
- [ ] Favicon loads correctly

### Structured Data (if implemented)

- [ ] JSON-LD validates with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Schema.org types are correct
- [ ] Required properties present

### Performance

- [ ] No client-side JavaScript for SEO (all static)
- [ ] Meta tags render in initial HTML (view-source)
- [ ] Page load time optimal

## Tools for Testing

- **Meta Tags**: [Meta Tags Inspector](https://metatags.io/)
- **Open Graph**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter Cards**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Structured Data**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Schema Validator**: [Schema.org Validator](https://validator.schema.org/)
- **Sitemap**: Check directly at `/sitemap-index.xml`
- **robots.txt**: Check directly at `/robots.txt`
- **General SEO**: [Lighthouse](https://pagespeed.web.dev/)
- **View Source**: Right-click → View Page Source (verify server-side rendering)

## Target Locations

- `/src/config/site.ts` (new file)
- `/src/layouts/BaseLayout.astro` (update existing)
- `/src/components/StructuredData.astro` (new file, optional)
- `/src/pages/robots.txt.ts` (new file)
- `/src/pages/rss.xml.ts` (new file, optional)
- `/public/og-image.jpg` (add default image)
- `/astro.config.mjs` (update existing)

## Dependencies

### Required

- ✅ `astro-seo` - Comprehensive SEO component
- ✅ `@astrojs/sitemap` - Automatic sitemap generation
- ✅ BaseLayout.astro (exists, needs update)

### Optional

- 🔄 `@astrojs/rss` - RSS feed generation (for blogs)
- 🔄 `sanitize-html` - If including full post content in RSS

## Benefits Over Gatsby Helmet

- ✅ **No client-side JavaScript** - All meta tags are static
- ✅ **Better performance** - Faster page loads, no hydration needed
- ✅ **Better SEO** - Search engines see meta tags immediately
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Simpler** - One component instead of complex HOCs
- ✅ **Battle-tested** - Used by 8.6k+ projects
- ✅ **Active maintenance** - Regular updates and bug fixes
- ✅ **Comprehensive** - All SEO features in one package

## Best Practices

1. **Unique titles and descriptions** - Every page should have unique, descriptive metadata
2. **Optimal lengths**:
   - Title: 50-60 characters
   - Description: 150-160 characters
3. **Image optimization**:
   - OG images: 1200x630px
   - File size < 1MB
   - Use JPG or PNG format
4. **Canonical URLs** - Always use absolute URLs
5. **Structured data** - Add JSON-LD for better rich snippets
6. **Mobile-first** - Ensure viewport meta tag is set
7. **Language declarations** - Set lang attribute on <html>
8. **Sitemap** - Keep it updated and reference in robots.txt
9. **RSS feed** - Provide for blog/news content
10. **Test regularly** - Use validation tools after changes

## Notes

- Astro automatically handles head deduplication
- astro-seo component is fully type-safe with TypeScript
- Static generation means perfect SEO (no JS required)
- All meta tags render server-side
- Sitemap automatically includes all routes
- Dynamic robots.txt allows reuse of site config
- Open Graph images should be absolute URLs
- JSON-LD structured data improves rich snippets
- RSS feeds improve content discovery
- Test with real social media preview tools

## References

- [astro-seo Documentation](https://github.com/jonasmerlin/astro-seo)
- [@astrojs/sitemap Documentation](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [@astrojs/rss Documentation](https://docs.astro.build/en/guides/rss/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search/docs)
