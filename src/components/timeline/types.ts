/**
 * Portable timeline types.
 *
 * Nothing in this module knows about the host site. Category slugs are open
 * strings supplied per timeline, and every colour decision is delegated to the
 * host — through `CategoryMeta.pillClassName` and the `--tl-*` custom
 * properties declared in `timeline.css`.
 */

export interface TimelineEra {
  id: string;
  /** Short label displayed inside the era band */
  label: string;
  startYear: number;
  endYear: number;
}

/**
 * A category slug.
 *
 * Deliberately open: each timeline defines its own vocabulary and supplies the
 * matching display metadata through `TimelineConfig.categoryMeta`. Datasets that
 * want autocomplete narrow it locally by passing their own union as the
 * `TCategory` argument to `TimelineConfig`.
 */
export type TimelineCategory = string;

export interface TimelineLink {
  label: string;
  url: string;
  description?: string;
}

export interface TimelineEventImage {
  src: string;
  alt: string;
}

export interface TimelineEvent<
  TCategory extends TimelineCategory = TimelineCategory,
> {
  id: string;
  yearDisplay: string;
  sortYear: number;
  title: string;
  description: string;
  categories: TCategory[];
  isToolingSpine?: boolean;
  significance: "major" | "notable";
  links?: TimelineLink[];
  image?: TimelineEventImage;
}

export interface CategoryMeta {
  label: string;
  /** Classes applied to the category pill. Host-supplied, so the component
   *  never needs to know the host's design tokens. */
  pillClassName: string;
}

export interface TimelineConfig<
  TKey extends string = string,
  TCategory extends TimelineCategory = TimelineCategory,
> {
  key: TKey;
  title: string;
  subtitle: string;
  framing: string;
  categoryOrder: TCategory[];
  /** Display metadata for every slug used in `categoryOrder` and in events. */
  categoryMeta: Record<TCategory, CategoryMeta>;
  events: TimelineEvent<TCategory>[];
  eras?: TimelineEra[];
}

/**
 * Analytics events emitted by the timeline. The host decides what, if anything,
 * to do with them — see `TimelineViewer`'s `onEvent` prop.
 */
export type TimelineEventName =
  | "category_filter"
  | "event_opened"
  | "event_link_clicked"
  | "session_summary";

export type TimelineEventHandler = (
  name: TimelineEventName,
  params: Record<string, unknown>,
) => void;
