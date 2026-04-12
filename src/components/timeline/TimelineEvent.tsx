import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { TimelineEvent as TimelineEventType } from "../../data/timelines";
import { timelineCategoryMeta } from "../../data/timelines";
import {
  trackEventOpened,
  trackEventLinkClicked,
  type TimelineSession,
} from "../../lib/timelineAnalytics";

interface TimelineEventProps {
  event: TimelineEventType;
  session: TimelineSession | null;
}

export default function TimelineEvent({ event, session }: TimelineEventProps) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isExpanded = isPinned || isHovered;
  const hasLinks = Boolean(event.links && event.links.length > 0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (session && !isPinned) {
      trackEventOpened(session, event, "hover");
    }
  };

  const handleToggle = () => {
    const newState = !isPinned;
    setIsPinned(newState);
    if (newState && session) {
      trackEventOpened(session, event, "pin");
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent,
    linkText: string,
    linkUrl: string,
    linkPosition: number
  ) => {
    if (session) {
      trackEventLinkClicked(session, event, linkText, linkUrl, linkPosition);
    }
    // Allow normal link behavior
  };

  return (
    <li
      className="relative pl-8 md:pl-10 md:[&:not(:first-child)]:mt-1"
      data-testid={`timeline-event-${event.id}`}
    >
      <time
        className="mb-2 block font-sans text-sm font-medium text-graphite-400 md:absolute md:right-[calc(100%+1.25rem)] md:top-1.5 md:mb-0 md:w-28 md:text-right"
        dateTime={event.sortYear.toString()}
      >
        {event.yearDisplay}
      </time>

      <span className="absolute left-0 top-2.5 h-3 w-3 rounded-full border border-graphite-600/40 bg-paper-50 dark:border-graphite-600 dark:bg-graphite-700" />

      <article
        className={`rounded-lg border bg-paper-50 p-5 transition-colors duration-200 dark:bg-surface-dark ${
          event.significance === "major"
            ? "border-graphite-600/40 dark:border-ink-600"
            : "border-graphite-600/20 dark:border-graphite-600"
        } ${isExpanded ? "bg-paper-100 dark:bg-graphite-700/80" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          className="flex w-full items-start justify-between gap-4 text-left"
          onClick={handleToggle}
          data-testid={`timeline-event-toggle-${event.id}`}
        >
          <div>
            <h3 className="text-xl font-semibold text-ink-800 dark:text-paper-100">
              {event.title}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-graphite-600/20 text-lg text-graphite-400 transition-transform duration-200 dark:border-graphite-600 ${
              isExpanded ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>

          <span className="sr-only">
            {isExpanded ? "Collapse event details" : "Expand event details"}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { height: "auto", opacity: 1 }
              }
              exit={
                shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
              className="overflow-hidden"
            >
              <div
                className={`mt-4 ${
                  event.image
                    ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_12rem] md:items-start"
                    : ""
                }`}
              >
                <div>
                  <p className="text-ink-600 dark:text-paper-200">
                    {event.description}
                  </p>

                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    data-testid={`timeline-event-categories-${event.id}`}
                  >
                    {event.categories.map((category) => (
                      <li key={`${event.id}-${category}`}>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-xs font-medium ${timelineCategoryMeta[category].pillClassName}`}
                        >
                          {timelineCategoryMeta[category].label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {hasLinks && (
                    <ul className="mt-4 space-y-2">
                      {event.links?.map((link, index) => (
                        <li key={`${event.id}-${link.url}`}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-800 underline decoration-accent-teal underline-offset-4 hover:decoration-ink-800 dark:text-paper-100 dark:hover:decoration-paper-100"
                            onClick={(e) =>
                              handleLinkClick(
                                e,
                                link.label,
                                link.url,
                                index + 1
                              )
                            }
                          >
                            {link.label} →
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {event.image && (
                  <div
                    className="overflow-hidden rounded-lg border border-graphite-600/20 bg-paper-100 dark:border-graphite-600 dark:bg-graphite-700/40"
                    data-testid={`timeline-event-image-${event.id}`}
                  >
                    <img
                      src={event.image.src}
                      alt={event.image.alt}
                      className="h-40 w-full object-cover grayscale md:h-full"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </li>
  );
}
