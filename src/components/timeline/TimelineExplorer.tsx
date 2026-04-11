import { useMemo, useState } from "react";
import type {
  TimelineConfig,
  TimelineCategory,
  TimelineEra,
} from "../../data/timelines";
import { filterEvents } from "../../data/timelines";
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
}

export default function TimelineExplorer({
  timeline,
  selectedCategory: selectedCategoryProp,
  selectedEra,
  onCategoryChange,
  hideFilters = false,
}: TimelineExplorerProps) {
  // Uncontrolled fallback for category when no controlled prop is provided
  const [internalCategory, setInternalCategory] = useState<
    TimelineCategory | "all"
  >("all");
  const resolvedCategory = selectedCategoryProp ?? internalCategory;
  const handleCategory = onCategoryChange ?? setInternalCategory;

  const visibleEvents = useMemo(
    () => filterEvents(timeline.events, resolvedCategory, selectedEra ?? null),
    [timeline.events, resolvedCategory, selectedEra],
  );

  return (
    <section className="mt-8" data-testid="timeline-explorer">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-ink-800 dark:text-paper-100">
          {timeline.title}
        </h2>
        <p className="mt-3 text-lg text-ink-600 dark:text-paper-200">
          {timeline.subtitle}
        </p>
        <p className="mt-3 text-ink-600 dark:text-paper-200">
          {timeline.framing}
        </p>
      </div>

      {!hideFilters && (
        <CategoryFilter
          categories={timeline.categoryOrder}
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
          <TimelineEvent key={event.id} event={event} />
        ))}
      </ol>
    </section>
  );
}
