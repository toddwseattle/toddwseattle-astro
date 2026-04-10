import type { TimelineEra } from "../../data/timelines";

interface EraFilterProps {
  eras: TimelineEra[];
  selected: TimelineEra | null;
  onSelect: (era: TimelineEra | null) => void;
}

export default function EraFilter({
  eras,
  selected,
  onSelect,
}: EraFilterProps) {
  if (eras.length === 0) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Filter timeline by era"
      className="flex flex-wrap gap-2"
      data-testid="timeline-era-filter"
    >
      <button
        type="button"
        role="radio"
        aria-checked={selected === null}
        aria-pressed={selected === null}
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite-400 ${
          selected === null
            ? "bg-ink-800 text-paper-50 border-ink-800 dark:bg-paper-100 dark:text-ink-800 dark:border-paper-100"
            : "bg-paper-50 text-ink-700 border-graphite-600/30 hover:bg-paper-200 dark:bg-surface-dark dark:text-paper-200 dark:border-graphite-600 dark:hover:bg-graphite-700"
        }`}
        data-testid="timeline-era-filter-all"
      >
        All Eras
      </button>
      {eras.map((era) => {
        const isSelected = selected?.id === era.id;
        return (
          <button
            key={era.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-pressed={isSelected}
            onClick={() => onSelect(isSelected ? null : era)}
            className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite-400 ${
              isSelected
                ? "bg-ink-800 text-paper-50 border-ink-800 dark:bg-paper-100 dark:text-ink-800 dark:border-paper-100"
                : "bg-paper-50 text-ink-700 border-graphite-600/30 hover:bg-paper-200 dark:bg-surface-dark dark:text-paper-200 dark:border-graphite-600 dark:hover:bg-graphite-700"
            }`}
            data-testid={`timeline-era-filter-${era.id}`}
          >
            {era.label}
            <span className="ml-1.5 opacity-60 text-xs font-normal">
              {era.startYear}–{era.endYear}
            </span>
          </button>
        );
      })}
    </div>
  );
}
