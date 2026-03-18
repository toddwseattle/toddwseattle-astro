import { useMemo, useState } from "react";
import type { TimelineConfig, TimelineCategory } from "../../data/se-timeline";
import { filterEvents } from "../../data/se-timeline";
import CategoryFilter from "./CategoryFilter";
import TimelineEvent from "./TimelineEvent";

interface TimelineExplorerProps {
  timeline: TimelineConfig;
}

export default function TimelineExplorer({ timeline }: TimelineExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    TimelineCategory | "all"
  >("all");

  const visibleEvents = useMemo(
    () => filterEvents(timeline.events, selectedCategory),
    [timeline.events, selectedCategory],
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

      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

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
