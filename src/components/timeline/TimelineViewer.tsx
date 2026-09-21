import { useState, type ReactNode } from "react";
import type {
  TimelineConfig,
  TimelineCategory,
  TimelineEra,
  TimelineEventHandler,
} from "./types";
import { trackCategoryFilter, useTimelineSession } from "./analytics";
import { filterEvents } from "./helpers";
import CategoryFilter from "./CategoryFilter";
import EraFilter from "./EraFilter";
import TimelineExplorer from "./TimelineExplorer";
import InteractiveTimeline from "./InteractiveTimeline";
import TimelineHeader from "./TimelineHeader";
import "./timeline.css";

type ViewMode = "list" | "interactive";

interface TimelineViewerProps {
  timeline: TimelineConfig;
  /**
   * Heading block rendered above the filters. Defaults to `TimelineHeader`;
   * pass `null` to own the page outline entirely.
   */
  header?: ReactNode;
  /** Receives interaction analytics. Omit to render untracked. */
  onEvent?: TimelineEventHandler;
}

const TOGGLE_BASE =
  "rounded-lg border px-3 py-1.5 font-sans text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--tl-accent)]";
const TOGGLE_ACTIVE =
  "border-[color:var(--tl-accent)] bg-[var(--tl-accent)] text-[color:var(--tl-on-accent)] underline decoration-[color:var(--tl-on-accent)] decoration-2 underline-offset-4";
const TOGGLE_INACTIVE =
  "border-[color:var(--tl-border)] bg-[var(--tl-surface)] text-[color:var(--tl-text-muted)] hover:bg-[var(--tl-surface-toggle-hover)]";

export default function TimelineViewer({
  timeline,
  header,
  onEvent,
}: TimelineViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    TimelineCategory | "all"
  >("all");
  const [selectedEra, setSelectedEra] = useState<TimelineEra | null>(null);
  const [activeView, setActiveView] = useState<ViewMode>("interactive");

  // One session per mounted timeline, regardless of how many views are rendered.
  const sessionRef = useTimelineSession(timeline.key, timeline.title, onEvent);

  const eras = timeline.eras ?? [];

  function handleCategoryChange(cat: TimelineCategory | "all") {
    const previousCategory = selectedCategory;
    setSelectedCategory(cat);

    if (sessionRef.current) {
      trackCategoryFilter(
        sessionRef.current,
        cat,
        previousCategory,
        filterEvents(timeline.events, cat, selectedEra).length,
      );
    }
  }

  function handleEraChange(era: TimelineEra | null) {
    setSelectedEra(era);
  }

  return (
    <div className="flex flex-col gap-4" data-timeline-root>
      {header === undefined ? <TimelineHeader timeline={timeline} /> : header}

      {/* Shared filter bar */}
      <div className="flex flex-col gap-3">
        {/* View toggle — desktop only */}
        <div className="hidden md:flex items-center justify-end gap-2">
          <span className="mr-2 text-xs text-[color:var(--tl-text-faint)] uppercase tracking-widest font-semibold">
            View
          </span>
          <button
            type="button"
            aria-pressed={activeView === "list"}
            onClick={() => setActiveView("list")}
            className={`${TOGGLE_BASE} ${activeView === "list" ? TOGGLE_ACTIVE : TOGGLE_INACTIVE}`}
          >
            List
          </button>
          <button
            type="button"
            aria-pressed={activeView === "interactive"}
            onClick={() => setActiveView("interactive")}
            className={`${TOGGLE_BASE} ${activeView === "interactive" ? TOGGLE_ACTIVE : TOGGLE_INACTIVE}`}
          >
            Interactive
          </button>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-[color:var(--tl-border-faint)] bg-[var(--tl-surface-bar)] px-4 py-3 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <span className="shrink-0 font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-[color:var(--tl-text-faint-on-surface)]">
              Filter By:
            </span>
            <CategoryFilter
              categories={timeline.categoryOrder}
              categoryMeta={timeline.categoryMeta}
              selected={selectedCategory}
              onSelect={handleCategoryChange}
              showAll={false}
            />
          </div>

          {eras.length > 0 && (
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <span className="shrink-0 font-sans text-[0.65rem] font-semibold uppercase tracking-widest text-[color:var(--tl-text-faint-on-surface)]">
                Eras:
              </span>
              <EraFilter
                eras={eras}
                selected={selectedEra}
                onSelect={handleEraChange}
                showAll={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* List view — always visible on mobile; hidden on desktop when interactive is active */}
      <div className={activeView === "interactive" ? "md:hidden" : undefined}>
        <TimelineExplorer
          timeline={timeline}
          selectedCategory={selectedCategory}
          selectedEra={selectedEra}
          onCategoryChange={handleCategoryChange}
          hideFilters
          session={sessionRef.current}
        />
      </div>

      {/* Interactive view — desktop only, mounted only when active to avoid layout cost */}
      {activeView === "interactive" && (
        <div className="hidden md:block">
          <InteractiveTimeline
            timeline={timeline}
            selectedCategory={selectedCategory}
            selectedEra={selectedEra}
            onCategoryChange={handleCategoryChange}
            onEraChange={handleEraChange}
          />
        </div>
      )}
    </div>
  );
}
