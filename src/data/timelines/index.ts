import { smartphoneRevolutionTimeline } from "./smartphone-revolution";
import { softwareEngineeringHistoryTimeline } from "./software-engineering-history";
import type { TimelineConfig } from "./shared";
import type { TimelineKey } from "./keys";

export { timelineKeys } from "./keys";
export type { TimelineKey } from "./keys";

export const timelines: Record<TimelineKey, TimelineConfig<TimelineKey>> = {
  "software-engineering-history": softwareEngineeringHistoryTimeline,
  "smartphone-revolution": smartphoneRevolutionTimeline,
};

export const getTimelineByKey = (key: TimelineKey) => timelines[key];

export type {
  CategoryMeta,
  TimelineCategory,
  TimelineConfig,
  TimelineEra,
  TimelineEvent,
  TimelineEventImage,
  TimelineLink,
} from "./shared";
export { filterEvents, timelineCategoryMeta } from "./shared";
