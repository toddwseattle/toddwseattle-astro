import type { CategoryMeta } from "../../components/timeline";

/**
 * Category vocabulary for this site's timelines, styled with Chronicle Data
 * System tokens. The timeline components no longer know these slugs exist —
 * each timeline config carries its own metadata, so another project can define
 * a completely different vocabulary without touching component source.
 */
export const chronicleCategoryMeta = {
  "practices-tools": {
    label: "Practices & Tools",
    pillClassName:
      "bg-paper-200 text-ink-800 dark:bg-graphite-700 dark:text-paper-100",
  },
  "teamwork-process": {
    label: "Teamwork & Process",
    pillClassName:
      "bg-paper-100 text-ink-800 dark:bg-graphite-600 dark:text-paper-100",
  },
  "platforms-languages": {
    label: "Platforms & Languages",
    pillClassName:
      "bg-paper-200 text-ink-800 dark:bg-graphite-700 dark:text-paper-100",
  },
  "ai-automation": {
    label: "AI & Automation",
    pillClassName:
      "bg-paper-100 text-ink-800 dark:bg-graphite-600 dark:text-paper-50",
  },
  platforms: {
    label: "Platforms & Ecosystems",
    pillClassName:
      "bg-paper-200 text-ink-800 dark:bg-graphite-700 dark:text-paper-100",
  },
  devices: {
    label: "Devices",
    pillClassName:
      "bg-paper-100 text-ink-800 dark:bg-graphite-600 dark:text-paper-100",
  },
  strategy: {
    label: "Corporate Strategy",
    pillClassName:
      "bg-paper-200 text-ink-800 dark:bg-graphite-700 dark:text-paper-100",
  },
  market: {
    label: "Market Shifts",
    pillClassName:
      "bg-paper-100 text-ink-800 dark:bg-graphite-600 dark:text-paper-100",
  },
  startups: {
    label: "Startups & New Entrants",
    pillClassName:
      "bg-paper-200 text-ink-800 dark:bg-graphite-700 dark:text-paper-100",
  },
} satisfies Record<string, CategoryMeta>;

export type ChronicleCategory = keyof typeof chronicleCategoryMeta;
