import { useState } from "react";
import type {
  TimelineConfig,
  TimelineCategory,
  TimelineEra,
} from "../../data/timelines";
import CategoryFilter from "./CategoryFilter";
import EraFilter from "./EraFilter";
import TimelineExplorer from "./TimelineExplorer";
import InteractiveTimeline from "./InteractiveTimeline";

type ViewMode = "list" | "interactive";

interface TimelineViewerProps {
  timeline: TimelineConfig;
}

const TOGGLE_BASE =
  "px-3 py-1.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite-400";
const TOGGLE_ACTIVE =
  "bg-ink-800 text-paper-50 border-ink-800 dark:bg-paper-100 dark:text-ink-800 dark:border-paper-100";
const TOGGLE_INACTIVE =
  "bg-paper-50 text-ink-700 border-graphite-600/30 hover:bg-paper-200 dark:bg-surface-dark dark:text-paper-200 dark:border-graphite-600 dark:hover:bg-graphite-700";

export default function TimelineViewer({ timeline }: TimelineViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    TimelineCategory | "all"
  >("all");
  const [selectedEra, setSelectedEra] = useState<TimelineEra | null>(null);
  const [activeView, setActiveView] = useState<ViewMode>("list");

  const eras = timeline.eras ?? [];

  function handleCategoryChange(cat: TimelineCategory | "all") {
    setSelectedCategory(cat);
  }

  function handleEraChange(era: TimelineEra | null) {
    setSelectedEra(era);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Shared filter bar */}
      <div className="flex flex-col gap-3">
        {/* View toggle — desktop only */}
        <div className="hidden md:flex items-center justify-end gap-2">
          <span className="mr-2 text-xs text-graphite-400 uppercase tracking-widest font-semibold">
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

        <CategoryFilter
          categories={timeline.categoryOrder}
          selected={selectedCategory}
          onSelect={handleCategoryChange}
        />

        {eras.length > 0 && (
          <EraFilter
            eras={eras}
            selected={selectedEra}
            onSelect={handleEraChange}
          />
        )}
      </div>

      {/* List view — always visible on mobile; hidden on desktop when interactive is active */}
      <div className={activeView === "interactive" ? "md:hidden" : undefined}>
        <TimelineExplorer
          timeline={timeline}
          selectedCategory={selectedCategory}
          selectedEra={selectedEra}
          onCategoryChange={handleCategoryChange}
          hideFilters
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
