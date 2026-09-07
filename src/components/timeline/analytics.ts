/**
 * Timeline interaction analytics.
 *
 * Session bookkeeping (ids, device type, referrer class, engagement intensity,
 * the on-unmount summary) lives here because it is generic. The transport is
 * not: the host supplies a `TimelineEventHandler` and decides whether those
 * events reach Google Analytics, Plausible, PostHog, or nothing at all.
 */

import { useEffect, useRef } from "react";
import type {
  TimelineCategory,
  TimelineEvent,
  TimelineEventHandler,
} from "./types";

export interface TimelineSession {
  sessionId: string;
  timelineKey: string;
  timelineTitle: string;
  startTime: number;
  categoriesFiltered: Set<string>;
  eventsOpened: Map<string, number>; // event_id => open_count
  linksClicked: number;
  deviceType: "touch" | "pointer" | "unknown";
  referrerSource: string; // 'direct', 'internal', 'external', 'search'
  onEvent?: TimelineEventHandler;
}

/**
 * Detect if user is using touch or pointer (mouse) device
 */
function detectDeviceType(): "touch" | "pointer" | "unknown" {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const nav = navigator as Navigator & { msMaxTouchPoints?: number };

  const hasTouch = () =>
    !!window.matchMedia?.("(pointer:coarse)").matches ||
    "ontouchstart" in window ||
    (nav.maxTouchPoints || nav.msMaxTouchPoints || 0) > 0;

  return hasTouch() ? "touch" : "pointer";
}

/**
 * Detect referrer source (direct, internal, external, search)
 */
function detectReferrerSource(): string {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "unknown";
  }

  const referrer = document.referrer;

  if (!referrer) {
    return "direct";
  }

  try {
    const currentDomain = window.location.hostname;
    const referrerDomain = new URL(referrer).hostname;

    if (referrerDomain === currentDomain) {
      return "internal";
    }

    if (
      referrer.includes("google.") ||
      referrer.includes("bing.") ||
      referrer.includes("duckduckgo.") ||
      referrer.includes("yahoo.")
    ) {
      return "search";
    }
  } catch {
    // If URL parsing fails, treat as external
  }

  return "external";
}

/**
 * Initialize a new timeline session with unique ID
 */
export function initTimelineSession(
  timelineKey: string,
  timelineTitle: string,
  onEvent?: TimelineEventHandler,
): TimelineSession {
  return {
    sessionId: crypto.randomUUID?.() || `session-${Date.now()}`,
    timelineKey,
    timelineTitle,
    startTime: Date.now(),
    categoriesFiltered: new Set(),
    eventsOpened: new Map(),
    linksClicked: 0,
    deviceType: detectDeviceType(),
    referrerSource: detectReferrerSource(),
    onEvent,
  };
}

/**
 * Track when a visitor filters by category
 */
export function trackCategoryFilter(
  session: TimelineSession,
  selectedCategory: TimelineCategory | "all",
  previousCategory: TimelineCategory | "all" | undefined,
  visibleEventCount: number,
): void {
  session.onEvent?.("category_filter", {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    selected_category: selectedCategory,
    previous_category: previousCategory ?? "all",
    event_count_visible: visibleEventCount,
    session_id: session.sessionId,
  });

  session.categoriesFiltered.add(selectedCategory);
}

/**
 * Track when a visitor expands or pins an event
 */
export function trackEventOpened(
  session: TimelineSession,
  event: TimelineEvent,
  interactionType: "pin" | "hover",
): void {
  session.onEvent?.("event_opened", {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    event_id: event.id,
    event_title: event.title,
    event_year: event.sortYear,
    event_category: event.categories[0] || "uncategorized",
    event_significance: event.significance,
    has_links: Boolean(event.links?.length),
    link_count: event.links?.length ?? 0,
    interaction_type: interactionType,
    device_type: session.deviceType,
    session_id: session.sessionId,
  });

  const current = session.eventsOpened.get(event.id) ?? 0;
  session.eventsOpened.set(event.id, current + 1);
}

/**
 * Track when a visitor clicks a reference link within an event
 */
export function trackEventLinkClicked(
  session: TimelineSession,
  event: TimelineEvent,
  linkText: string,
  linkUrl: string,
  linkPosition: number,
): void {
  session.onEvent?.("event_link_clicked", {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    event_id: event.id,
    event_title: event.title,
    event_category: event.categories[0] || "uncategorized",
    link_text: linkText,
    link_url: linkUrl,
    link_position: linkPosition,
    session_id: session.sessionId,
  });

  session.linksClicked += 1;
}

/**
 * Track session end with aggregate metrics
 */
export function trackSessionEnd(session: TimelineSession): void {
  if (!session.onEvent) {
    return;
  }

  const durationSeconds = Math.round((Date.now() - session.startTime) / 1000);
  const eventIds = Array.from(session.eventsOpened.keys());

  const mostEngagedEventId = eventIds.reduce(
    (max, id) =>
      (session.eventsOpened.get(id) ?? 0) > (session.eventsOpened.get(max) ?? 0)
        ? id
        : max,
    eventIds[0] || "",
  );

  const categories = Array.from(session.categoriesFiltered);
  const mostEngagedCategory =
    categories.length > 0 ? categories[categories.length - 1] : "all";

  let engagementIntensity = "low";
  if (session.eventsOpened.size >= 5 && session.linksClicked >= 3) {
    engagementIntensity = "high";
  } else if (session.eventsOpened.size >= 3 || session.linksClicked >= 1) {
    engagementIntensity = "medium";
  }

  session.onEvent("session_summary", {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    session_id: session.sessionId,
    session_duration_seconds: durationSeconds,
    categories_filtered: categories.length,
    unique_categories_visited: categories.join(","),
    events_opened: session.eventsOpened.size,
    links_clicked: session.linksClicked,
    most_engaged_category: mostEngagedCategory,
    most_engaged_event_id: mostEngagedEventId,
    engagement_intensity: engagementIntensity,
    device_type: session.deviceType,
    referrer_source: session.referrerSource,
  });
}

/**
 * Owns exactly one session for the lifetime of a mounted timeline, and reports
 * the summary on unmount. Held in a ref rather than state so that reading it
 * from an event handler never triggers a re-render.
 */
export function useTimelineSession(
  timelineKey: string,
  timelineTitle: string,
  onEvent?: TimelineEventHandler,
) {
  const sessionRef = useRef<TimelineSession | null>(null);
  // Held in a ref so an inline `onEvent` arrow does not restart the session on
  // every render of the host component.
  const handlerRef = useRef(onEvent);

  useEffect(() => {
    handlerRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    sessionRef.current = initTimelineSession(
      timelineKey,
      timelineTitle,
      (name, params) => handlerRef.current?.(name, params),
    );

    return () => {
      if (sessionRef.current) {
        trackSessionEnd(sessionRef.current);
        sessionRef.current = null;
      }
    };
  }, [timelineKey, timelineTitle]);

  return sessionRef;
}
