/**
 * Timeline keys, deliberately in their own module with no imports.
 *
 * `src/content.config.ts` needs this vocabulary for its `timelineKey` schema
 * field. Astro loads the content config in a plain module context, so anything
 * the config reaches transitively is loaded there too — and importing these
 * from `./index` pulled in `./shared`, which value-re-exports the timeline
 * component barrel, which imports `timeline.css` and the React tree. That
 * fails the config load outright. Keep this file dependency-free.
 */
export const timelineKeys = [
  "software-engineering-history",
  "smartphone-revolution",
] as const;

export type TimelineKey = (typeof timelineKeys)[number];
