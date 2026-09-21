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
      <h2 className="text-3xl font-bold tracking-tight text-[color:var(--tl-text)]">
        {timeline.title}
      </h2>
      <p className="mt-3 text-lg text-[color:var(--tl-text-muted)]">
        {timeline.subtitle}
      </p>
      <p className="mt-3 text-[color:var(--tl-text-muted)]">
        {timeline.framing}
      </p>
    </div>
  );
}
