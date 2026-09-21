/**
 * Compatibility shim.
 *
 * The timeline types and helpers now live with the components in
 * `src/components/timeline/`, which is what makes that directory liftable into
 * another project. This module keeps the old import path working for the
 * datasets and `src/content/config.ts`; remove it once nothing imports it.
 */

export type {
  CategoryMeta,
  TimelineCategory,
  TimelineConfig,
  TimelineEra,
  TimelineEventData as TimelineEvent,
  TimelineEventImage,
  TimelineLink,
} from "../../components/timeline";

export { filterEvents } from "../../components/timeline";
export { chronicleCategoryMeta as timelineCategoryMeta } from "./chronicleCategoryMeta";
