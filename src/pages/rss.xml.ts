import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");
  // Sort explicitly: the feed previously inherited whatever order the legacy
  // collection loader happened to return, which is not newest-first and is not
  // stable across loaders. Matches the sort in pages/writing/index.astro.
  const publishedPosts = blog
    .filter((post) => post.data.draft !== true)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );

  return rss({
    title: `${siteConfig.title} Writing`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      link: `/writing/${post.id}/`,
    })),
    customData: `<language>${siteConfig.lang}</language>`,
  });
};
