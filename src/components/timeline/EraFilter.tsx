import type { TimelineEra } from "../../data/timelines";

interface EraFilterProps {
  eras: TimelineEra[];
  selected: TimelineEra | null;
  onSelect: (era: TimelineEra | null) => void;
  showAll?: boolean;
}

export default function EraFilter({
  eras,
  selected,
  onSelect,
  showAll = true,
}: EraFilterProps) {
  if (eras.length === 0) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Filter timeline by era"
      className="flex flex-wrap gap-2"
      data-testid="timeline-era-filter"
    >
      {showAll && (
        <button
          type="button"
          role="radio"
          aria-checked={selected === null}
          aria-pressed={selected === null}
          onClick={() => onSelect(null)}
          className={`rounded-sm border px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite-400 ${
            selected === null
              ? "border-[#155e5a] bg-[#155e5a] text-paper-50 dark:border-paper-100 dark:bg-paper-100 dark:text-ink-800"
              : "border-paper-200 bg-paper-200/85 text-ink-600 hover:border-graphite-400 hover:bg-paper-100 dark:border-graphite-600 dark:bg-surface-dark dark:text-paper-200 dark:hover:bg-graphite-700"
          }`}
          data-testid="timeline-era-filter-all"
        >
          All Eras
        </button>
      )}
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
            className={`rounded-sm border px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite-400 ${
              isSelected
                ? "border-[#155e5a] bg-[#155e5a] text-paper-50 dark:border-paper-100 dark:bg-paper-100 dark:text-ink-800"
                : "border-paper-200 bg-paper-200/85 text-ink-600 hover:border-graphite-400 hover:bg-paper-100 dark:border-graphite-600 dark:bg-surface-dark dark:text-paper-200 dark:hover:bg-graphite-700"
            }`}
            data-testid={`timeline-era-filter-${era.id}`}
          >
            {era.label}
          </button>
        );
      })}
    </div>
  );
}
