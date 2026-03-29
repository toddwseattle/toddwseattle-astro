import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
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
      featured: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

const experiences = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    category: z.string(),
    cover: z.string().optional(),
    title: z.string(),
    draft: z.boolean().default(false),
  }),
});

const skills = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string(),
    percentage: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const activities = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const contacts = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    content: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const education = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const nonprofit = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    category: z.string(),
    company: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const hero = defineCollection({
  type: "content",
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
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const teaching = defineCollection({
  type: "content",
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
  type: "content",
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
    timelineKey: z.enum(["software-engineering-history"]).optional(),
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
