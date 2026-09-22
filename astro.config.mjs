// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  site: "https://toddwseattle.com", // REQUIRED for sitemap
  // Astro 7 defaults this to "jsx", which strips whitespace around elements
  // using JSX rules. On this site that glued inline links to the text before
  // them ("through<a>Envorso</a>" rendering as "throughEnvorso") and stripped
  // indentation inside the <textarea data-template> the slides layout feeds to
  // reveal.js. `true` is Astro 5's HTML-aware compression.
  compressHTML: true,
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/admin/"), // Exclude admin pages if any
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // Astro 7 defaults .md to Sätteri. Pin remark/rehype so the 79 existing
    // Markdown files keep rendering through the pipeline they were written
    // against. Moving to Sätteri is its own change — see
    // docs/markdown/satteri-migration/audit.md.
    processor: unified(),
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
