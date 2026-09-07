import type { TimelineConfig } from "./types";

interface TimelineHeaderProps {
  timeline: TimelineConfig;
}

/**
 * Default heading block. Rendered by `TimelineViewer` unless the host passes its
 * own `header` — pass `header={null}` to take full control of the page outline.
 */
export default function TimelineHeader({ timeline }: TimelineHeaderProps) {
  return (
    <div data-testid="timeline-header">
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
  );
}
