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
  description?: string;
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
  eras?: TimelineEra[];
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
};

export const filterEvents = (
  events: TimelineEvent[],
  category: TimelineCategory | "all",
  era?: TimelineEra | null,
): TimelineEvent[] => {
  let filtered =
    category === "all"
      ? [...events]
      : events.filter((event) => event.categories.includes(category));

  if (era) {
    filtered = filtered.filter(
      (e) => e.sortYear >= era.startYear && e.sortYear <= era.endYear,
    );
  }

  return filtered.sort((a, b) => a.sortYear - b.sortYear);
};
