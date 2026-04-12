# Timeline Student Interaction Tracking Plan

## Overview

Track student behavior within interactive timelines (e.g., smartphone-revolution-timeline) to understand learning journeys: which categories interest them, which events they explore, and whether they engage with referenced materials.

**Goal:** Build a learning analytics dataset that reveals:
- Which content threads students follow
- Time spent exploring specific topics
- Engagement intensity (categories filtered, events expanded, links clicked)
- Correlation between interaction patterns and learning outcomes

---

## Current Timeline Structure

**Timeline Components:**
- `TimelineExplorer.tsx` — manages category filtering and event list
- `TimelineEvent.tsx` — individual event with expand/collapse, links
- `TimelineViewer.tsx` — wrapper that loads timeline data
- `TimelineLayout.astro` — course material layout for timelines

**Key Interactions:**
1. **Category Filter** — student clicks category (e.g., "Platforms & Ecosystems")
2. **Event Expand/Pin** — student clicks event to reveal details and links
3. **Event Link Click** — student clicks reference link within expanded event
4. **Hover** — student hovers over event (mobile: tap to expand)

---

## GA4 Custom Events Design

### Event 1: `timeline_category_filter`
**When:** Student selects or changes category filter

```json
{
  "event": "timeline_category_filter",
  "parameters": {
    "timeline_key": "smartphone-revolution",
    "timeline_title": "The Smartphone Revolution Timeline",
    "selected_category": "Platforms & Ecosystems",
    "previous_category": "all",
    "event_count_visible": 14,
    "session_id": "[auto-generated UUID]"
  }
}
```

**Rationale:** Category changes indicate shift in focus. Counting visible events shows filtering scope.

---

### Event 2: `timeline_event_opened`
**When:** Student expands/pins an event

```json
{
  "event": "timeline_event_opened",
  "parameters": {
    "timeline_key": "smartphone-revolution",
    "timeline_title": "The Smartphone Revolution Timeline",
    "event_id": "iphone-release-2007",
    "event_title": "iPhone Release",
    "event_year": 2007,
    "event_category": "Devices",
    "event_significance": "major",
    "has_links": true,
    "link_count": 3,
    "interaction_type": "pin",
    "session_id": "[auto-generated UUID]"
  }
}
```

**Rationale:** Event opens = stronger interest. Significance and link count help contextualize engagement depth.

---

### Event 3: `timeline_event_link_clicked`
**When:** Student clicks a reference link within an expanded event

```json
{
  "event": "timeline_event_link_clicked",
  "parameters": {
    "timeline_key": "smartphone-revolution",
    "timeline_title": "The Smartphone Revolution Timeline",
    "event_id": "iphone-release-2007",
    "event_title": "iPhone Release",
    "event_category": "Devices",
    "link_text": "Steve Jobs keynote video",
    "link_url": "https://example.com/steve-jobs-2007",
    "link_position": 1,
    "session_id": "[auto-generated UUID]"
  }
}
```

**Rationale:** Link clicks = students drilling down into source material. URL helps identify which resources are most valued.

---

### Event 4: `timeline_session_summary`
**When:** Student leaves timeline (at unmount or on page change)

```json
{
  "event": "timeline_session_summary",
  "parameters": {
    "timeline_key": "smartphone-revolution",
    "timeline_title": "The Smartphone Revolution Timeline",
    "session_id": "[auto-generated UUID]",
    "session_duration_seconds": 420,
    "categories_filtered": 3,
    "unique_categories_visited": ["Devices", "Corporate Strategy", "Platforms & Ecosystems"],
    "events_opened": 8,
    "links_clicked": 5,
    "most_engaged_category": "Devices",
    "most_engaged_event_id": "iphone-release-2007",
    "engagement_intensity": "high"
  }
}
```

**Rationale:** Session summary rolls up interaction patterns for cohort analysis. Provides single aggregate metric without querying individual events.

---

## Implementation Approach

### 1. Create Analytics Utility (`src/lib/timelineAnalytics.ts`)

```typescript
// Utility for dispatching timeline-specific GA4 events
interface TimelineSession {
  sessionId: string;
  timelineKey: string;
  timelineTitle: string;
  startTime: number;
  categoriesFiltered: Set<string>;
  eventsOpened: Map<string, number>; // event_id => open_count
  linksClicked: number;
}

export function initTimelineSession(
  timelineKey: string,
  timelineTitle: string
): TimelineSession {
  return {
    sessionId: crypto.randomUUID(),
    timelineKey,
    timelineTitle,
    startTime: Date.now(),
    categoriesFiltered: new Set(),
    eventsOpened: new Map(),
    linksClicked: 0,
  };
}

export function trackCategoryFilter(
  session: TimelineSession,
  selectedCategory: string,
  previousCategory: string,
  visibleEventCount: number
) {
  if (window.gtag) {
    window.gtag('event', 'timeline_category_filter', {
      timeline_key: session.timelineKey,
      timeline_title: session.timelineTitle,
      selected_category: selectedCategory,
      previous_category: previousCategory,
      event_count_visible: visibleEventCount,
      session_id: session.sessionId,
    });
  }
  session.categoriesFiltered.add(selectedCategory);
}

export function trackEventOpened(
  session: TimelineSession,
  event: TimelineEvent,
  interactionType: 'pin' | 'hover'
) {
  if (window.gtag) {
    window.gtag('event', 'timeline_event_opened', {
      timeline_key: session.timelineKey,
      timeline_title: session.timelineTitle,
      event_id: event.id,
      event_title: event.title,
      event_year: event.sortYear,
      event_category: event.category,
      event_significance: event.significance,
      has_links: Boolean(event.links?.length),
      link_count: event.links?.length ?? 0,
      interaction_type: interactionType,
      session_id: session.sessionId,
    });
  }
  const current = session.eventsOpened.get(event.id) ?? 0;
  session.eventsOpened.set(event.id, current + 1);
}

export function trackEventLinkClicked(
  session: TimelineSession,
  event: TimelineEvent,
  linkText: string,
  linkUrl: string,
  linkPosition: number
) {
  if (window.gtag) {
    window.gtag('event', 'timeline_event_link_clicked', {
      timeline_key: session.timelineKey,
      timeline_title: session.timelineTitle,
      event_id: event.id,
      event_title: event.title,
      event_category: event.category,
      link_text: linkText,
      link_url: linkUrl,
      link_position: linkPosition,
      session_id: session.sessionId,
    });
  }
  session.linksClicked += 1;
}

export function trackSessionEnd(
  session: TimelineSession
) {
  const durationSeconds = Math.round(
    (Date.now() - session.startTime) / 1000
  );
  const eventIds = Array.from(session.eventsOpened.keys());
  const mostEngagedEventId = eventIds.reduce(
    (max, id) =>
      (session.eventsOpened.get(id) ?? 0) >
      (session.eventsOpened.get(max) ?? 0)
        ? id
        : max,
    eventIds[0]
  );

  const categories = Array.from(session.categoriesFiltered);
  const mostEngagedCategory =
    categories.length > 0 ? categories[categories.length - 1] : 'all';

  // Determine engagement intensity
  let engagementIntensity = 'low';
  if (
    session.eventsOpened.size >= 5 &&
    session.linksClicked >= 3
  ) {
    engagementIntensity = 'high';
  } else if (
    session.eventsOpened.size >= 3 ||
    session.linksClicked >= 1
  ) {
    engagementIntensity = 'medium';
  }

  if (window.gtag) {
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
      most_engaged_event_id: mostEngagedEventId ?? '',
      engagement_intensity: engagementIntensity,
    });
  }
}
```

### 2. Instrument `TimelineExplorer.tsx`

Add session tracking and event dispatch:

```typescript
import { useEffect, useState, useRef } from 'react';
import {
  initTimelineSession,
  trackCategoryFilter,
  trackSessionEnd,
} from '../../lib/timelineAnalytics';

export default function TimelineExplorer({ timeline, ... }) {
  const sessionRef = useRef(initTimelineSession(timeline.key, timeline.title));

  useEffect(() => {
    return () => {
      // On unmount, track session end
      trackSessionEnd(sessionRef.current);
    };
  }, []);

  const handleCategory = (cat: TimelineCategory | 'all') => {
    const previousCategory = resolvedCategory;
    setInternalCategory(cat);
    trackCategoryFilter(
      sessionRef.current,
      cat === 'all' ? 'all' : cat,
      previousCategory === 'all' ? 'all' : previousCategory,
      visibleEvents.length
    );
  };

  return (
    // ... rest of component
  );
}
```

### 3. Instrument `TimelineEvent.tsx`

Add event open and link tracking:

```typescript
import { trackEventOpened, trackEventLinkClicked } from '../../lib/timelineAnalytics';

export default function TimelineEvent({ event, session }) {
  const handleToggle = () => {
    const newState = !isPinned;
    setIsPinned(newState);
    if (newState) {
      trackEventOpened(session, event, 'pin');
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    trackEventOpened(session, event, 'hover');
  };

  const handleLinkClick = (e: React.MouseEvent, link: Link, index: number) => {
    trackEventLinkClicked(
      session,
      event,
      link.text,
      link.url,
      index + 1
    );
    // Continue to link navigation
  };

  return (
    // ... component JSX
  );
}
```

### 4. Update `TimelineViewer.tsx`

Pass session context down to child components:

```typescript
import { useRef } from 'react';
import { initTimelineSession } from '../../lib/timelineAnalytics';

export default function TimelineViewer({ timeline }) {
  const session = useRef(
    initTimelineSession(timeline.key, timeline.title)
  );

  return (
    <TimelineExplorer
      timeline={timeline}
      session={session.current}
      client:load
    />
  );
}
```

---

## GA4 Data Analysis & Reporting

### Query 1: Engagement by Category
**Question:** Which content threads are students most interested in?

```sql
-- Pseudocode for GA4/BigQuery
SELECT
  event_parameters.selected_category,
  COUNT(DISTINCT session_id) AS student_count,
  AVG(event_count_visible) AS avg_visible_events,
FROM events
WHERE event_name = 'timeline_category_filter'
  AND timeline_key = 'smartphone-revolution'
GROUP BY selected_category
ORDER BY student_count DESC;
```

### Query 2: Event Engagement Ranking
**Question:** Which specific events get the most attention?

```sql
SELECT
  event_parameters.event_id,
  event_parameters.event_title,
  COUNT(*) AS open_count,
  COUNT(DISTINCT session_id) AS unique_students,
FROM events
WHERE event_name = 'timeline_event_opened'
  AND timeline_key = 'smartphone-revolution'
GROUP BY event_id, event_title
ORDER BY open_count DESC
LIMIT 20;
```

### Query 3: Student Journey Depth
**Question:** How deep do students drill into referenced materials?

```sql
SELECT
  engagement_intensity,
  COUNT(*) AS student_count,
  AVG(events_opened) AS avg_events_explored,
  AVG(links_clicked) AS avg_links_clicked,
  AVG(session_duration_seconds) AS avg_time_seconds,
FROM events
WHERE event_name = 'timeline_session_summary'
  AND timeline_key = 'smartphone-revolution'
GROUP BY engagement_intensity;
```

### Query 4: Resource Popularity (Link Tracking)
**Question:** Which source materials are most valuable to students?

```sql
SELECT
  event_parameters.link_url,
  event_parameters.link_text,
  COUNT(*) AS click_count,
  COUNT(DISTINCT session_id) AS unique_students,
FROM events
WHERE event_name = 'timeline_event_link_clicked'
  AND timeline_key = 'smartphone-revolution'
GROUP BY link_url, link_text
ORDER BY click_count DESC;
```

---

## Dashboard Recommendations

**Real-Time Dashboard:**
- Active users viewing timeline right now
- Top 5 most-engaged categories (last 24h)
- Top 5 most-opened events (last 24h)
- Event link click heatmap

**Weekly Report:**
- Engagement distribution (% high/medium/low by session)
- Most popular content thread per cohort
- Average session duration vs. event exploration
- Link click-through rate by event

**Cohort Analysis:**
- Compare engagement across course sections or student groups
- Identify "stalled" students (low engagement_intensity)
- Correlate timeline engagement with activity in other course materials

---

## Phase Implementation

### Phase 1: Core Tracking (2-3 hours)
✅ Build `timelineAnalytics.ts` utility  
✅ Instrument TimelineExplorer (category filtering)  
✅ Instrument TimelineEvent (event opens and link clicks)  
✅ Deploy and monitor basic events in GA4

### Phase 2: Enhanced Context (1-2 hours)
✅ Add student cohort/section context to session_summary  
✅ Implement referrer source tracking (how students arrived at timeline)  
✅ Add device/interaction type classification (touch vs. pointer)

### Phase 3: Dashboard & Analysis (ongoing)
✅ Create GA4 dashboard showing top engaging categories/events  
✅ Build weekly summary report with engagement distribution  
✅ Correlate timeline engagement with course completion via data export

### Phase 4: Iteration (ongoing)
✅ A/B test category ordering to see if order affects exploration  
✅ Add "time to first interaction" metric  
✅ Build student-level journey export for case study analysis

---

## Privacy & Consent Considerations

**Current State:**
- GA4 is already deployed and consented
- Custom events do not capture PII (no names, IDs in event details)
- Timeline interaction is educational use, aligned with learning analytics

**Recommendations:**
- Include timeline engagement metrics in course analytics consent
- Allow students to opt out of detailed timeline tracking if needed
- Document retention: timeline event data should follow same retention as GA4 (typically 14 months)

---

## Success Metrics

| Metric | Target | Purpose |
|--------|--------|---------|
| Timeline session adoption | >70% of students view at least one timeline | Baseline engagement |
| Avg events explored per session | >3 | Content discovery depth |
| Avg links clicked per session | >1.5 | External resource engagement |
| High engagement session %age | >40% | Deep learning signal |
| Category filter adoption | >60% | Feature usage awareness |

---

## Questions to Answer with Data (6-12 weeks in)

1. **Are certain topics more "sticky"?** Which categories get repeated filtering?
2. **Do students follow a learning path?** Is there a natural progression through categories?
3. **Which events act as gateways?** Do early event opens predict later exploration?
4. **What's the "just right" event density?** Do students get overwhelmed or underwhelmed by event count?
5. **How does timeline engagement correlate with exam performance?** (if available)

---

## Related Docs

- `/docs/analytics-seo-plan.md` — GA4 core configuration (completed)
- `src/lib/timelineAnalytics.ts` — tracking utility (to implement)
- GA4 Property: `toddwseattle-astro` (523733032)

