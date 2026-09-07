/**
 * Public surface of the timeline component tree.
 *
 * Everything below this directory is portable: it imports nothing from the rest
 * of this site, only `react` and `framer-motion`. Host projects supply their
 * category vocabulary through `TimelineConfig.categoryMeta`, their palette by
 * overriding the `--tl-*` custom properties from `timeline.css`, and their
 * analytics transport through `TimelineViewer`'s `onEvent` prop.
 */

export { default as TimelineViewer } from "./TimelineViewer";
export { default as TimelineExplorer } from "./TimelineExplorer";
export { default as InteractiveTimeline } from "./InteractiveTimeline";
export { default as TimelineEvent } from "./TimelineEvent";
export { default as TimelineHeader } from "./TimelineHeader";
export { default as CategoryFilter } from "./CategoryFilter";
export { default as EraFilter } from "./EraFilter";

export { filterEvents, resolveCategoryMeta } from "./helpers";
export {
  initTimelineSession,
  useTimelineSession,
  trackCategoryFilter,
  trackEventOpened,
  trackEventLinkClicked,
  trackSessionEnd,
  type TimelineSession,
} from "./analytics";

export type {
  CategoryMeta,
  TimelineCategory,
  TimelineConfig,
  TimelineEra,
  TimelineEvent as TimelineEventData,
  TimelineEventHandler,
  TimelineEventImage,
  TimelineEventName,
  TimelineLink,
} from "./types";
