/**
 * Timeline Student Interaction Analytics
 * Tracks student engagement with interactive timelines including:
 * - Category filtering
 * - Event exploration
 * - Reference link clicks
 * - Session summaries for cohort analysis
 */

import type { TimelineCategory, TimelineEvent } from '../data/timelines/shared';

export interface TimelineSession {
  sessionId: string;
  timelineKey: string;
  timelineTitle: string;
  startTime: number;
  categoriesFiltered: Set<string>;
  eventsOpened: Map<string, number>; // event_id => open_count
  linksClicked: number;
}

/**
 * Initialize a new timeline session with unique ID
 */
export function initTimelineSession(
  timelineKey: string,
  timelineTitle: string
): TimelineSession {
  return {
    sessionId: crypto.randomUUID?.() || `session-${Date.now()}`,
    timelineKey,
    timelineTitle,
    startTime: Date.now(),
    categoriesFiltered: new Set(),
    eventsOpened: new Map(),
    linksClicked: 0,
  };
}

/**
 * Track when student filters by category
 */
export function trackCategoryFilter(
  session: TimelineSession,
  selectedCategory: TimelineCategory | 'all',
  previousCategory: TimelineCategory | 'all' | undefined,
  visibleEventCount: number
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  const previousCat =
    previousCategory === undefined ? 'all' : previousCategory;

  window.gtag('event', 'timeline_category_filter', {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    selected_category: selectedCategory,
    previous_category: previousCat,
    event_count_visible: visibleEventCount,
    session_id: session.sessionId,
  });

  session.categoriesFiltered.add(
    selectedCategory === 'all' ? 'all' : selectedCategory
  );
}

/**
 * Track when student expands/pins an event
 */
export function trackEventOpened(
  session: TimelineSession,
  event: TimelineEvent,
  interactionType: 'pin' | 'hover'
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'timeline_event_opened', {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    event_id: event.id,
    event_title: event.title,
    event_year: event.sortYear,
    event_category: event.categories[0] || 'uncategorized',
    event_significance: event.significance,
    has_links: Boolean(event.links?.length),
    link_count: event.links?.length ?? 0,
    interaction_type: interactionType,
    session_id: session.sessionId,
  });

  const current = session.eventsOpened.get(event.id) ?? 0;
  session.eventsOpened.set(event.id, current + 1);
}

/**
 * Track when student clicks a reference link within an event
 */
export function trackEventLinkClicked(
  session: TimelineSession,
  event: TimelineEvent,
  linkText: string,
  linkUrl: string,
  linkPosition: number
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'timeline_event_link_clicked', {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    event_id: event.id,
    event_title: event.title,
    event_category: event.categories[0] || 'uncategorized',
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
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  const durationSeconds = Math.round((Date.now() - session.startTime) / 1000);
  const eventIds = Array.from(session.eventsOpened.keys());

  // Find most engaged event
  const mostEngagedEventId = eventIds.reduce(
    (max, id) =>
      (session.eventsOpened.get(id) ?? 0) >
      (session.eventsOpened.get(max) ?? 0)
        ? id
        : max,
    eventIds[0] || ''
  );

  // Find most engaged category
  const categories = Array.from(session.categoriesFiltered);
  const mostEngagedCategory =
    categories.length > 0 ? categories[categories.length - 1] : 'all';

  // Determine engagement intensity based on interaction patterns
  let engagementIntensity = 'low';
  if (session.eventsOpened.size >= 5 && session.linksClicked >= 3) {
    engagementIntensity = 'high';
  } else if (session.eventsOpened.size >= 3 || session.linksClicked >= 1) {
    engagementIntensity = 'medium';
  }

  window.gtag('event', 'timeline_session_summary', {
    timeline_key: session.timelineKey,
    timeline_title: session.timelineTitle,
    session_id: session.sessionId,
    session_duration_seconds: durationSeconds,
    categories_filtered: categories.length,
    unique_categories_visited: categories.join(','),
    events_opened: session.eventsOpened.size,
    links_clicked: session.linksClicked,
    most_engaged_category: mostEngagedCategory,
    most_engaged_event_id: mostEngagedEventId,
    engagement_intensity: engagementIntensity,
  });
}
