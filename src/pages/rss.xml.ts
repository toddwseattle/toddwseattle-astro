import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");
  const publishedPosts = blog.filter((post) => post.data.published !== false);

  return rss({
    title: `${siteConfig.title} Writing`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>${siteConfig.lang}</language>`,
  });
};
