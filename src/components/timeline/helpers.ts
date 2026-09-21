import type {
  CategoryMeta,
  TimelineCategory,
  TimelineEra,
  TimelineEvent,
} from "./types";

/**
 * Look up display metadata for a category slug.
 *
 * Degrades rather than throwing: an unknown slug renders as its own raw text
 * with no pill styling, so a typo in a dataset is visible but not fatal.
 */
export const resolveCategoryMeta = (
  categoryMeta: Record<TimelineCategory, CategoryMeta>,
  category: TimelineCategory,
): CategoryMeta =>
  categoryMeta[category] ?? { label: category, pillClassName: "" };

export const filterEvents = <TEvent extends TimelineEvent>(
  events: TEvent[],
  category: TimelineCategory | "all",
  era?: TimelineEra | null,
): TEvent[] => {
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
