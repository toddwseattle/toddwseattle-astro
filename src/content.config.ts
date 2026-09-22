import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { timelineKeys } from "./data/timelines";

/**
 * Content Layer collections.
 *
 * Every collection is a flat directory of Markdown under `src/content/`, so
 * they share one loader shape. The `[^_]*.md` pattern matters: `blog/`,
 * `projects/` and `testimonials/` keep their images alongside the posts, and
 * only the `.md` files are entries.
 *
 * Entry ids are the slugified filename, which is what the legacy `slug`
 * property resolved to as well — that is what keeps existing URLs stable.
 */
const contentLoader = (dir: string) =>
  glob({ pattern: "**/[^_]*.md", base: `./src/content/${dir}` });

const blog = defineCollection({
  loader: contentLoader("blog"),
  schema: ({ image }) =>
    z.object({
      category: z
        .enum([
          "innovation",
          "software-engineering",
          "teaching",
          "automotive-software",
          "cycling",
          "music",
        ])
        .optional(),
      cover: image().optional(),
      title: z.string(),
      description: z.string(),
      date: z.string(),
      updatedDate: z.string().optional(),
      featured: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

const experiences = defineCollection({
  loader: contentLoader("experiences"),
  schema: z.object({
    category: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: contentLoader("projects"),
  schema: z.object({
    category: z.string(),
    cover: z.string().optional(),
    title: z.string(),
    draft: z.boolean().default(false),
  }),
});

const skills = defineCollection({
  loader: contentLoader("skills"),
  schema: z.object({
    category: z.string(),
    title: z.string(),
    percentage: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const activities = defineCollection({
  loader: contentLoader("activities"),
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const contacts = defineCollection({
  loader: contentLoader("contacts"),
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    content: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const education = defineCollection({
  loader: contentLoader("education"),
  schema: z.object({
    category: z.string(),
    university: z.string().optional(),
    degree: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: contentLoader("services"),
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: contentLoader("testimonials"),
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const nonprofit = defineCollection({
  loader: contentLoader("nonprofit"),
  schema: z.object({
    category: z.string(),
    company: z.string().optional(),
    position: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const investments = defineCollection({
  loader: contentLoader("investments"),
  schema: z.object({
    category: z.string(),
    company: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const hero = defineCollection({
  loader: contentLoader("hero"),
  schema: z.object({
    category: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    content: z.string().optional(),
    linkTo: z.string().optional(),
    linkText: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const newsletter = defineCollection({
  loader: contentLoader("newsletter"),
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const teaching = defineCollection({
  loader: contentLoader("teaching"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    philosophy: z.string(),
    topics: z.array(z.string()),
    exampleProjects: z.array(z.string()).optional(),
    publicArtifacts: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    date: z.string(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const courseMaterialsCollection = defineCollection({
  loader: contentLoader("course-materials"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    courses: z.array(z.string()),
    type: z.enum([
      "exercise",
      "resource",
      "post",
      "tutorial",
      "slides",
      "examples",
      "student work",
    ]),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    date: z.string(),
    cover: z.string().optional(),
    resources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    timelineKey: z.enum(timelineKeys).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  experiences,
  projects,
  skills,
  activities,
  contacts,
  education,
  services,
  testimonials,
  nonprofit,
  investments,
  hero,
  newsletter,
  teaching,
  "course-materials": courseMaterialsCollection,
};
