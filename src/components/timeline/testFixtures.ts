import type { CategoryMeta } from "./types";

/**
 * Test vocabulary, deliberately local: keeping the component directory free of
 * imports from the rest of the site is the property Stage 1 exists to create,
 * and the tests should not be the thing that breaks it.
 */
export const testCategoryMeta: Record<string, CategoryMeta> = {
  "practices-tools": { label: "Practices & Tools", pillClassName: "pill-pt" },
  "teamwork-process": { label: "Teamwork & Process", pillClassName: "pill-tp" },
  "platforms-languages": {
    label: "Platforms & Languages",
    pillClassName: "pill-pl",
  },
  "ai-automation": { label: "AI & Automation", pillClassName: "pill-ai" },
};
