import { useMemo, useState } from "react";
import type { TimelineConfig, TimelineCategory, TimelineEra } from "./types";
import { filterEvents } from "./helpers";
import { trackCategoryFilter, type TimelineSession } from "./analytics";
import CategoryFilter from "./CategoryFilter";
import TimelineEvent from "./TimelineEvent";

interface TimelineExplorerProps {
  timeline: TimelineConfig;
  /** Controlled: category filter. When omitted the component manages it internally. */
  selectedCategory?: TimelineCategory | "all";
  /** Controlled: era filter. When omitted no era filtering is applied. */
  selectedEra?: TimelineEra | null;
  onCategoryChange?: (cat: TimelineCategory | "all") => void;
  /** When true, the CategoryFilter UI is suppressed (parent renders it). */
  hideFilters?: boolean;
  /** Analytics session owned by the parent. Omit to render untracked. */
  session?: TimelineSession | null;
}

export default function TimelineExplorer({
  timeline,
  selectedCategory: selectedCategoryProp,
  selectedEra,
  onCategoryChange,
  hideFilters = false,
  session = null,
}: TimelineExplorerProps) {
  // Uncontrolled fallback for category when no controlled prop is provided
  const [internalCategory, setInternalCategory] = useState<
    TimelineCategory | "all"
  >("all");
  const resolvedCategory = selectedCategoryProp ?? internalCategory;

  const visibleEvents = useMemo(
    () => filterEvents(timeline.events, resolvedCategory, selectedEra ?? null),
    [timeline.events, resolvedCategory, selectedEra],
  );

  const handleCategory = (cat: TimelineCategory | "all") => {
    const previousCategory = resolvedCategory;
    (onCategoryChange ?? setInternalCategory)(cat);
    if (session) {
      trackCategoryFilter(session, cat, previousCategory, visibleEvents.length);
    }
  };

  return (
    <section className="mt-8" data-testid="timeline-explorer">
      {!hideFilters && (
        <CategoryFilter
          categories={timeline.categoryOrder}
          categoryMeta={timeline.categoryMeta}
          selected={resolvedCategory}
          onSelect={handleCategory}
        />
      )}

      <p className="mt-3 text-sm text-graphite-400 dark:text-paper-200/75">
        Hover or tap an event to reveal context and sources.
      </p>

      <ol
        className="mt-8 space-y-6 border-l border-graphite-600/30 pl-4 dark:border-graphite-600"
        data-testid="timeline-events-list"
      >
        {visibleEvents.map((event) => (
          <TimelineEvent
            key={event.id}
            event={event}
            categoryMeta={timeline.categoryMeta}
            session={session}
          />
        ))}
      </ol>
    </section>
  );
}
