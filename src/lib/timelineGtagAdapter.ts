/**
 * Site-specific transport for timeline analytics.
 *
 * The timeline components emit generic, unprefixed event names; this adapter is
 * the only place that knows they end up in Google Analytics. Keeping it here
 * rather than in `src/components/timeline/` is what lets the component tree be
 * lifted into another project unchanged.
 */

import type {
  TimelineEventHandler,
  TimelineEventName,
} from "../components/timeline";

type GtagFn = (
  command: "event",
  action: string,
  params?: Record<string, string | number | boolean>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export const timelineGtagAdapter: TimelineEventHandler = (
  name: TimelineEventName,
  params: Record<string, unknown>,
) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag(
    "event",
    `timeline_${name}`,
    params as Record<string, string | number | boolean>,
  );
};
