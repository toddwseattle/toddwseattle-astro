import type { TimelineEra } from "./types";

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
          className={`rounded-sm border px-4 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--tl-accent)] ${
            selected === null
              ? "border-[color:var(--tl-accent)] bg-[var(--tl-accent)] text-[color:var(--tl-on-accent)] underline decoration-[color:var(--tl-on-accent)] decoration-2 underline-offset-4"
              : "border-[color:var(--tl-border-idle)] bg-[var(--tl-surface-pill-idle)] text-[color:var(--tl-text-muted)] hover:border-[color:var(--tl-border-hover)] hover:bg-[var(--tl-surface-pill-hover)]"
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
            className={`rounded-sm border px-4 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--tl-accent)] ${
              isSelected
                ? "border-[color:var(--tl-accent)] bg-[var(--tl-accent)] text-[color:var(--tl-on-accent)] underline decoration-[color:var(--tl-on-accent)] decoration-2 underline-offset-4"
                : "border-[color:var(--tl-border-idle)] bg-[var(--tl-surface-pill-idle)] text-[color:var(--tl-text-muted)] hover:border-[color:var(--tl-border-hover)] hover:bg-[var(--tl-surface-pill-hover)]"
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
