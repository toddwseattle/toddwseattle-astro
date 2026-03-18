import type { TimelineEvent as TimelineEventType } from "../../data/se-timeline";
import { timelineCategoryMeta } from "../../data/se-timeline";

interface TimelineEventProps {
  event: TimelineEventType;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  return (
    <li className="relative pl-8" data-testid={`timeline-event-${event.id}`}>
      <span className="absolute left-0 top-2.5 w-3 h-3 rounded-full border border-graphite-600/40 bg-paper-50 dark:border-graphite-500 dark:bg-graphite-700" />

      <article
        className={`rounded-xl border p-5 bg-paper-50 dark:bg-surface-dark ${
          event.significance === "major"
            ? "border-graphite-600/40 dark:border-ink-600"
            : "border-graphite-600/20 dark:border-graphite-600"
        }`}
      >
        <time
          className="text-sm font-medium text-graphite-400"
          dateTime={event.sortYear.toString()}
        >
          {event.yearDisplay}
        </time>

        <h3 className="mt-2 text-xl font-semibold text-ink-800 dark:text-paper-100">
          {event.title}
        </h3>

        <p className="mt-3 text-ink-600 dark:text-paper-200">
          {event.description}
        </p>

        <ul
          className="mt-4 flex flex-wrap gap-2"
          data-testid={`timeline-event-categories-${event.id}`}
        >
          {event.categories.map((category) => (
            <li key={`${event.id}-${category}`}>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${timelineCategoryMeta[category].pillClassName}`}
              >
                {timelineCategoryMeta[category].label}
              </span>
            </li>
          ))}
        </ul>

        {event.links && event.links.length > 0 && (
          <ul className="mt-4 space-y-2">
            {event.links.map((link) => (
              <li key={`${event.id}-${link.url}`}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-800 underline decoration-graphite-400 hover:decoration-ink-800 dark:text-paper-100 dark:hover:decoration-paper-100"
                >
                  {link.label} →
                </a>
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}
