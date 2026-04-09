export interface TimelineEra {
  id: string;
  /** Short label displayed inside the era band */
  label: string;
  startYear: number;
  endYear: number;
}

export type TimelineCategory =
  | "practices-tools"
  | "teamwork-process"
  | "platforms-languages"
  | "ai-automation"
  | "platforms"
  | "devices"
  | "strategy"
  | "market"
  | "startups";

export interface TimelineLink {
  label: string;
  url: string;
}

export interface TimelineEventImage {
  src: string;
  alt: string;
}

export interface TimelineEvent {
  id: string;
  yearDisplay: string;
  sortYear: number;
  title: string;
  description: string;
  categories: TimelineCategory[];
  isToolingSpine?: boolean;
  significance: "major" | "notable";
  links?: TimelineLink[];
  image?: TimelineEventImage;
}

export interface TimelineConfig<TKey extends string = string> {
  key: TKey;
  title: string;
  subtitle: string;
  framing: string;
  categoryOrder: TimelineCategory[];
  events: TimelineEvent[];
}

export interface CategoryMeta {
  label: string;
  pillClassName: string;
}

export const timelineCategoryMeta: Record<TimelineCategory, CategoryMeta> = {
  "practices-tools": {
    label: "Practices & Tools",
    pillClassName:
      "bg-paper-200 text-ink-800 dark:bg-graphite-700 dark:text-paper-100",
  },
  "teamwork-process": {
    label: "Teamwork & Process",
    pillClassName:
      "bg-paper-100 text-ink-700 dark:bg-graphite-600 dark:text-paper-100",
  },
  "platforms-languages": {
    label: "Platforms & Languages",
    pillClassName:
      "bg-paper-200 text-ink-700 dark:bg-graphite-700 dark:text-paper-100",
  },
  "ai-automation": {
    label: "AI & Automation",
    pillClassName:
      "bg-paper-100 text-ink-800 dark:bg-graphite-600 dark:text-paper-50",
  },
  platforms: {
    label: "Platforms & Ecosystems",
    pillClassName:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  },
  devices: {
    label: "Devices",
    pillClassName:
      "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  },
  strategy: {
    label: "Corporate Strategy",
    pillClassName:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  market: {
    label: "Market Shifts",
    pillClassName:
      "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  },
  startups: {
    label: "Startups & New Entrants",
    pillClassName:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
};

export const filterEvents = (
  events: TimelineEvent[],
  category: TimelineCategory | "all",
): TimelineEvent[] => {
  if (category === "all") {
    return [...events].sort((a, b) => a.sortYear - b.sortYear);
  }

  return events
    .filter((event) => event.categories.includes(category))
    .sort((a, b) => a.sortYear - b.sortYear);
};
