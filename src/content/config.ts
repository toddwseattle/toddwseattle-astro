import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    cover: z.string().optional(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(true),
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
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    cover: z.string().optional(),
    title: z.string(),
  }),
});

const skills = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string(),
    percentage: z.number().optional(),
  }),
});

const activities = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
  }),
});

const contacts = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    content: z.string().optional(),
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
  }),
});

const services = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    cover: z.string().optional(),
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
  }),
});

const investments = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    company: z.string().optional(),
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
  }),
});

const newsletter = defineCollection({
  type: "content",
  schema: z.object({
    category: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
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
        })
      )
      .optional(),
    date: z.string(),
    cover: z.string().optional(),
  }),
});

const courseMaterials = defineCollection({
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
      "examples",
      "student work",
    ]),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    date: z.string(),
    cover: z.string().optional(),
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
  courseMaterials,
};
