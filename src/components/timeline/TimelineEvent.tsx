import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type {
  CategoryMeta,
  TimelineCategory,
  TimelineEvent as TimelineEventType,
} from "./types";
import { resolveCategoryMeta } from "./helpers";
import {
  trackEventOpened,
  trackEventLinkClicked,
  type TimelineSession,
} from "./analytics";

interface TimelineEventProps {
  event: TimelineEventType;
  /** Display metadata for the slugs in `event.categories`. */
  categoryMeta: Record<TimelineCategory, CategoryMeta>;
  session: TimelineSession | null;
}

export default function TimelineEvent({
  event,
  categoryMeta,
  session,
}: TimelineEventProps) {
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
    linkText: string,
    linkUrl: string,
    linkPosition: number,
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
        className="mb-2 block font-sans text-sm font-medium text-[color:var(--tl-text-faint)] md:absolute md:right-[calc(100%+1.25rem)] md:top-1.5 md:mb-0 md:w-28 md:text-right"
        dateTime={event.sortYear.toString()}
      >
        {event.yearDisplay}
      </time>

      <span className="absolute left-0 top-2.5 h-3 w-3 rounded-full border border-[color:var(--tl-border-strong)] bg-[var(--tl-surface-dot)]" />

      <article
        className={`rounded-lg border bg-[var(--tl-surface)] p-5 transition-colors duration-200 ${
          event.significance === "major"
            ? "border-[color:var(--tl-border-major)]"
            : "border-[color:var(--tl-border-subtle)]"
        } ${isExpanded ? "bg-[var(--tl-surface-expanded)]" : ""}`}
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
            <h3 className="text-xl font-semibold text-[color:var(--tl-text)]">
              {event.title}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--tl-border-subtle)] text-lg text-[color:var(--tl-text-faint)] transition-transform duration-200 ${
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
                  <p className="text-[color:var(--tl-text-muted)]">
                    {event.description}
                  </p>

                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    data-testid={`timeline-event-categories-${event.id}`}
                  >
                    {event.categories.map((category) => {
                      const meta = resolveCategoryMeta(categoryMeta, category);
                      return (
                        <li key={`${event.id}-${category}`}>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-xs font-medium ${meta.pillClassName}`}
                          >
                            {meta.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {hasLinks && (
                    <ul className="mt-4 space-y-2">
                      {event.links?.map((link, index) => (
                        <li key={`${event.id}-${link.url}`}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[color:var(--tl-text)] underline decoration-[color:var(--tl-accent)] underline-offset-4 hover:decoration-[color:var(--tl-text)]"
                            onClick={() =>
                              handleLinkClick(link.label, link.url, index + 1)
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
                    className="overflow-hidden rounded-lg border border-[color:var(--tl-border-subtle)] bg-[var(--tl-surface-image)]"
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
