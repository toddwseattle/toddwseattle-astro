import type { TimelineConfig } from "./timeline";
import TimelineViewer from "./timeline/TimelineViewer";
import { timelineGtagAdapter } from "../lib/timelineGtagAdapter";

interface CourseTimelineProps {
  timeline: TimelineConfig;
}

/**
 * Site-specific wrapper around the portable `TimelineViewer`.
 *
 * Astro island props must be JSON-serializable, so the analytics handler cannot
 * be passed from `.astro` frontmatter — it is bound here instead. This file and
 * `src/lib/timelineGtagAdapter.ts` are the entire coupling between this site and
 * the timeline component tree.
 */
export default function CourseTimeline({ timeline }: CourseTimelineProps) {
  return <TimelineViewer timeline={timeline} onEvent={timelineGtagAdapter} />;
}
