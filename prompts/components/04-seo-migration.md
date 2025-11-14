# SEO Component Migration

## Component Type: Head/Meta Management

## Priority: High (Critical for search optimization)

## Recommended Format: Integrate into `BaseLayout.astro` (Astro-native approach, no separate component)

## Original Gatsby Component

**Location:** `/home/toddwseattle/pw-toddwseattle/src/components/SEO/index.tsx`

Uses React Helmet for head management with:

- Page title with template
- Meta description
- Open Graph tags (og:title, og:description, og:type)
- Twitter card tags
- Custom meta tags support

## Migration Strategy

### Astro Approach: No Separate Component Needed

Astro handles SEO through built-in `<head>` management. Migrate this functionality directly into `BaseLayout.astro`.

### 1. Site Metadata

Create a site config file for metadata:

**Create: `/src/config/site.ts`**

```typescript
export const siteConfig = {
  title: "Todd Warren",
  description: "Technology leader, educator, and startup advisor",
  author: "@toddwseattle",
  siteUrl: "https://toddwarren.com", // Update with actual URL
  lang: "en",
};
```

### 2. Update BaseLayout.astro

Add comprehensive head management:

```astro
---
import { siteConfig } from '../config/site';

interface Props {
  title: string;
  description?: string;
  image?: string;
  canonicalURL?: string;
}

const {
  title,
  description = siteConfig.description,
  image = '/og-image.jpg', // Default OG image
  canonicalURL = new URL(Astro.url.pathname, Astro.site).href
} = Astro.props;

const pageTitle = `${title} | ${siteConfig.title}`;
---

<!doctype html>
<html lang={siteConfig.lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta Tags -->
    <title>{pageTitle}</title>
    <meta name="title" content={pageTitle} />
    <meta name="description" content={description} />
    <meta name="author" content={siteConfig.author} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site).href} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonicalURL} />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(image, Astro.site).href} />
    <meta name="twitter:creator" content={siteConfig.author} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### 3. Usage in Pages

Update pages to pass SEO props:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="About Me"
  description="Learn about Todd Warren's experience in technology and education"
>
  <!-- Page content -->
</BaseLayout>
```

### 4. Additional SEO Features

Consider adding:

1. **Sitemap** - Use `@astrojs/sitemap` integration
2. **RSS Feed** - For blog posts
3. **robots.txt** - For crawler control
4. **JSON-LD structured data** - For rich snippets

## Implementation Steps

1. **Create site config file**
   - Location: `/src/config/site.ts`
   - Define site metadata constants
   - Export configuration object

2. **Update BaseLayout.astro**
   - Add Props interface for title, description, image, canonicalURL
   - Import site config
   - Add comprehensive head tags
   - Ensure proper meta tag formatting

3. **Add default OG image**
   - Create or add open graph image to `/public/og-image.jpg`
   - Size: 1200x630px (standard OG image size)

4. **Update all pages**
   - Add title and description props to BaseLayout usage
   - Customize per page for better SEO

5. **Add sitemap integration**

   ```bash
   npm install @astrojs/sitemap
   ```

   Update `astro.config.mjs`:

   ```javascript
   import sitemap from "@astrojs/sitemap";

   export default defineConfig({
     site: "https://toddwarren.com",
     integrations: [sitemap()],
   });
   ```

6. **Add robots.txt**
   Create `/public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://toddwarren.com/sitemap-index.xml
   ```

## Testing Checklist

- [ ] Site config file created with correct metadata
- [ ] BaseLayout.astro updated with head management
- [ ] Page titles display correctly in browser tab
- [ ] Meta description appears in view-source
- [ ] Open Graph tags present and correct
- [ ] Twitter card tags present and correct
- [ ] Test with Facebook Sharing Debugger
- [ ] Test with Twitter Card Validator
- [ ] Canonical URLs are correct
- [ ] All pages have unique titles and descriptions
- [ ] Default OG image exists
- [ ] Sitemap generates correctly
- [ ] robots.txt is accessible

## Tools for Testing

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- View page source to verify meta tags

## Target Locations

- `/src/config/site.ts` (new file)
- `/src/layouts/BaseLayout.astro` (update existing)
- `/public/og-image.jpg` (add default image)
- `/public/robots.txt` (new file)

## Dependencies

- ✅ BaseLayout.astro (exists, needs update)
- 🔄 @astrojs/sitemap (needs installation)

## Benefits Over Gatsby Helmet

- No client-side JavaScript needed
- Faster page loads
- Better SEO (static meta tags)
- Built into Astro framework
- Type-safe with TypeScript
- Easier to maintain

## Notes

- Astro automatically handles head deduplication
- No need for a separate SEO component
- Each page can customize its meta tags via props
- Static generation means search engines see meta tags immediately
