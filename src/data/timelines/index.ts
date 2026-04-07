import { smartphoneRevolutionTimeline } from "./smartphone-revolution";
import { softwareEngineeringHistoryTimeline } from "./software-engineering-history";
import type { TimelineConfig } from "./shared";

export const timelineKeys = [
  "software-engineering-history",
  "smartphone-revolution",
] as const;

export type TimelineKey = (typeof timelineKeys)[number];

export const timelines: Record<TimelineKey, TimelineConfig<TimelineKey>> = {
  "software-engineering-history": softwareEngineeringHistoryTimeline,
  "smartphone-revolution": smartphoneRevolutionTimeline,
};

export const getTimelineByKey = (key: TimelineKey) => timelines[key];

export type {
  CategoryMeta,
  TimelineCategory,
  TimelineConfig,
  TimelineEvent,
  TimelineEventImage,
  TimelineLink,
} from "./shared";
export { filterEvents, timelineCategoryMeta } from "./shared";
