import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { TimelineConfig, TimelineCategory } from "../../data/timelines";
import { timelineCategoryMeta } from "../../data/timelines";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

export interface TimelineEra {
  id: string;
  /** Short label shown inside the era band */
  label: string;
  startYear: number;
  endYear: number;
}

interface InteractiveTimelineProps {
  timeline: TimelineConfig;
  eras?: TimelineEra[];
}

// ──────────────────────────────────────────────────────────────────────────────
// Layout constants
// ──────────────────────────────────────────────────────────────────────────────

const PX_PER_YEAR = 26;
const PAD_LEFT = 48;
const PAD_RIGHT = 48;

// Y positions within the fixed-height track
const TRACK_H = 180;
const LINE_Y = 130;       // horizontal axis
const MAJOR_DOT_Y = 68;   // dot centre for major events (above the line)
const MAJOR_DOT_R = 7;    // radius (px)
const NOTABLE_DOT_R = 4;  // radius (px)

// Alternating subtle fills for era bands (dark background)
const ERA_FILLS = [
  "rgba(255,255,255,0.025)",
  "rgba(255,255,255,0.055)",
];

// ──────────────────────────────────────────────────────────────────────────────
// Dot colours — designed to read on the dark (#0D0D0F) track background
// ──────────────────────────────────────────────────────────────────────────────

const CAT_COLORS: Record<TimelineCategory, string> = {
  "practices-tools": "#9CA3AF",
  "teamwork-process": "#D1D5DB",
  "platforms-languages": "#6B7280",
  "ai-automation": "#F9FAFB",
  platforms: "#818CF8",
  devices: "#34D399",
  strategy: "#FBBF24",
  market: "#F87171",
  startups: "#4ADE80",
};

function dotColor(categories: TimelineCategory[]): string {
  return CAT_COLORS[categories[0]] ?? "#9CA3AF";
}

// ──────────────────────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────────────────────

export default function InteractiveTimeline({
  timeline,
  eras = [],
}: InteractiveTimelineProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    TimelineCategory | "all"
  >("all");
  const shouldReduceMotion = useReducedMotion();

  // Chronological master list
  const allEvents = useMemo(
    () => [...timeline.events].sort((a, b) => a.sortYear - b.sortYear),
    [timeline.events],
  );

  // Filtered subset shown as dots
  const visibleEvents = useMemo(
    () =>
      selectedCategory === "all"
        ? allEvents
        : allEvents.filter((e) => e.categories.includes(selectedCategory)),
    [allEvents, selectedCategory],
  );

  // Year bounds with a small buffer
  const minYear = useMemo(
    () => Math.min(...allEvents.map((e) => e.sortYear)) - 2,
    [allEvents],
  );
  const maxYear = useMemo(() => {
    const lastEvent = Math.max(...allEvents.map((e) => e.sortYear));
    const lastEra = eras.length
      ? Math.max(...eras.map((e) => e.endYear))
      : lastEvent;
    return Math.max(lastEvent, lastEra) + 3;
  }, [allEvents, eras]);

  const trackWidth = PAD_LEFT + (maxYear - minYear) * PX_PER_YEAR + PAD_RIGHT;

  const yearToX = useCallback(
    (year: number) => PAD_LEFT + (year - minYear) * PX_PER_YEAR,
    [minYear],
  );

  // Every 5 years
  const yearTicks = useMemo(() => {
    const ticks: number[] = [];
    const start = Math.ceil(minYear / 5) * 5;
    for (let y = start; y <= maxYear; y += 5) ticks.push(y);
    return ticks;
  }, [minYear, maxYear]);

  const selectedEvent = useMemo(
    () => allEvents.find((e) => e.id === selectedId) ?? null,
    [allEvents, selectedId],
  );

  const hoveredEvent = useMemo(
    () => allEvents.find((e) => e.id === hoveredId) ?? null,
    [allEvents, hoveredId],
  );

  function toggleSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-ink-800 dark:text-paper-100">
          {timeline.title}
        </h2>
        <p className="mt-1 text-sm text-graphite-400">{timeline.subtitle}</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory("all");
            setSelectedId(null);
          }}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-150 ${
            selectedCategory === "all"
              ? "border-ink-800 bg-ink-800 text-paper-50 dark:border-paper-100 dark:bg-paper-100 dark:text-ink-800"
              : "border-graphite-600/40 text-ink-600 hover:border-graphite-600 dark:border-graphite-600 dark:text-paper-200"
          }`}
        >
          All
        </button>
        {timeline.categoryOrder.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedId(null);
            }}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-150 ${
              selectedCategory === cat
                ? "border-ink-800 bg-ink-800 text-paper-50 dark:border-paper-100 dark:bg-paper-100 dark:text-ink-800"
                : "border-graphite-600/40 text-ink-600 hover:border-graphite-600 dark:border-graphite-600 dark:text-paper-200"
            }`}
          >
            {timelineCategoryMeta[cat].label}
          </button>
        ))}
      </div>

      {/* Status / hover info bar */}
      <div className="h-8 flex items-center">
        <AnimatePresence mode="wait">
          {hoveredEvent ? (
            <motion.p
              key={hoveredEvent.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="text-sm font-medium text-ink-800 dark:text-paper-100"
            >
              <span className="mr-1.5 text-graphite-400">
                {hoveredEvent.yearDisplay} ·
              </span>
              {hoveredEvent.title}
              {hoveredEvent.significance === "major" && (
                <span className="ml-2 inline-flex items-center rounded-full bg-ink-800 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-paper-50 dark:bg-paper-200 dark:text-ink-800">
                  Big Shift
                </span>
              )}
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="text-xs text-graphite-400"
            >
              {selectedId
                ? "Click the dot again to close · hover any dot to preview"
                : "Hover to preview · click a dot to reveal full detail"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Timeline track ──────────────────────────────────────────────────── */}
      <div
        className="overflow-x-auto rounded-xl"
        style={{ background: "#0D0D0F" }}
        role="region"
        aria-label="Interactive timeline — scroll horizontally to explore"
      >
        <div
          style={{
            position: "relative",
            width: `${trackWidth}px`,
            height: `${TRACK_H}px`,
          }}
        >
          {/* Era bands */}
          {eras.map((era, idx) => {
            const x = yearToX(era.startYear);
            const w = (era.endYear - era.startYear) * PX_PER_YEAR;
            return (
              <div
                key={era.id}
                style={{
                  position: "absolute",
                  left: x,
                  top: 0,
                  width: w,
                  height: "100%",
                  background: ERA_FILLS[idx % 2],
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {era.label}
                </span>
              </div>
            );
          })}

          {/* Main horizontal axis */}
          <div
            style={{
              position: "absolute",
              left: PAD_LEFT,
              top: LINE_Y,
              width: (maxYear - minYear) * PX_PER_YEAR,
              height: 1,
              background: "rgba(255,255,255,0.14)",
            }}
          />

          {/* Year tick marks */}
          {yearTicks.map((year) => {
            const x = yearToX(year);
            return (
              <div
                key={year}
                style={{ position: "absolute", left: x, top: LINE_Y }}
              >
                <div
                  style={{
                    width: 1,
                    height: 6,
                    background: "rgba(255,255,255,0.18)",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    marginTop: 4,
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.22)",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {year}
                </span>
              </div>
            );
          })}

          {/* Event dots */}
          {visibleEvents.map((event) => {
            const x = yearToX(event.sortYear);
            const isMajor = event.significance === "major";
            const isSelected = selectedId === event.id;
            const isHovered = hoveredId === event.id;
            const color = dotColor(event.categories);
            const dotR = isMajor ? MAJOR_DOT_R : NOTABLE_DOT_R;
            const dotY = isMajor ? MAJOR_DOT_Y : LINE_Y;

            return (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: x,
                  top: 0,
                  width: 0,
                  height: 0,
                }}
              >
                {/* Vertical stem: major events float above the line */}
                {isMajor && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: MAJOR_DOT_Y + dotR,
                      width: 1,
                      height: LINE_Y - (MAJOR_DOT_Y + dotR),
                      background: `linear-gradient(to bottom, ${color}70, rgba(255,255,255,0.06))`,
                    }}
                  />
                )}

                {/* Pulsing ring for major events */}
                {isMajor && !shouldReduceMotion && (
                  <motion.div
                    style={{
                      position: "absolute",
                      left: -dotR,
                      top: dotY - dotR,
                      width: dotR * 2,
                      height: dotR * 2,
                      borderRadius: "50%",
                      border: `1px solid ${color}`,
                      pointerEvents: "none",
                    }}
                    animate={{ scale: [1, 2.6, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* The dot itself */}
                <motion.button
                  type="button"
                  style={{
                    position: "absolute",
                    left: -dotR,
                    top: dotY - dotR,
                    width: dotR * 2,
                    height: dotR * 2,
                    borderRadius: "50%",
                    backgroundColor: isSelected ? "#fff" : color,
                    border: isSelected
                      ? `2px solid #fff`
                      : `1px solid ${color}88`,
                    cursor: "pointer",
                    outline: "none",
                    zIndex: 1,
                  }}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: isSelected ? 1.9 : isHovered ? 1.5 : 1,
                          boxShadow: isSelected
                            ? `0 0 0 3px ${color}50, 0 0 14px ${color}70`
                            : isHovered
                              ? `0 0 0 2px ${color}35`
                              : "none",
                        }
                  }
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  onClick={() => toggleSelect(event.id)}
                  onHoverStart={() => setHoveredId(event.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  aria-label={`${event.yearDisplay}: ${event.title}${isMajor ? " (Big Shift)" : ""}`}
                  aria-pressed={isSelected}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-graphite-400">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-full"
            style={{
              width: 14,
              height: 14,
              background: "#D1D5DB",
              border: "1px solid #6B7280",
            }}
          />
          Major event
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-full"
            style={{
              width: 8,
              height: 8,
              background: "#6B7280",
              border: "1px solid #4B5563",
            }}
          />
          Notable event
        </span>
        <span className="ml-auto hidden sm:block">
          ← scroll to explore →
        </span>
      </div>

      {/* ── Detail panel ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key={selectedEvent.id}
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: -10, height: 0 }
            }
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={
              shouldReduceMotion ? false : { opacity: 0, y: -10, height: 0 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-graphite-600/40 bg-paper-50 p-6 dark:border-graphite-600 dark:bg-surface-dark">
              {/* Detail header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <time className="text-xs font-semibold uppercase tracking-widest text-graphite-400">
                      {selectedEvent.yearDisplay}
                    </time>
                    {selectedEvent.significance === "major" && (
                      <span className="inline-flex items-center rounded-full bg-ink-800 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-paper-50 dark:bg-paper-200 dark:text-ink-800">
                        Big Shift
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-xl font-bold text-ink-800 dark:text-paper-100">
                    {selectedEvent.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-graphite-600/30 text-lg leading-none text-graphite-400 transition-colors hover:border-graphite-600 hover:text-ink-800 dark:hover:text-paper-100"
                  aria-label="Close detail panel"
                >
                  ×
                </button>
              </div>

              {/* Description + optional image */}
              <div
                className={`mt-4 ${
                  selectedEvent.image
                    ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_12rem] md:items-start"
                    : ""
                }`}
              >
                <p className="leading-relaxed text-ink-600 dark:text-paper-200">
                  {selectedEvent.description}
                </p>
                {selectedEvent.image && (
                  <img
                    src={selectedEvent.image.src}
                    alt={selectedEvent.image.alt}
                    className="h-40 w-full rounded-lg border border-graphite-600/20 object-cover grayscale md:h-full"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Category pills */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {selectedEvent.categories.map((cat) => (
                  <li key={cat}>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${timelineCategoryMeta[cat].pillClassName}`}
                    >
                      {timelineCategoryMeta[cat].label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Links */}
              {selectedEvent.links && selectedEvent.links.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {selectedEvent.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-800 underline decoration-graphite-400 underline-offset-4 hover:decoration-ink-800 dark:text-paper-100 dark:hover:decoration-paper-100"
                      >
                        {link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
