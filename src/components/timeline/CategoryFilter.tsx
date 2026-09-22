import type { CategoryMeta, TimelineCategory } from "./types";
import { resolveCategoryMeta } from "./helpers";

interface CategoryFilterProps {
  categories: TimelineCategory[];
  /** Display metadata for the slugs in `categories`. */
  categoryMeta: Record<TimelineCategory, CategoryMeta>;
  selected: TimelineCategory | "all";
  onSelect: (category: TimelineCategory | "all") => void;
  showAll?: boolean;
}

export default function CategoryFilter({
  categories,
  categoryMeta,
  selected,
  onSelect,
  showAll = true,
}: CategoryFilterProps) {
  const options: Array<{ value: TimelineCategory | "all"; label: string }> = [
    ...(showAll ? [{ value: "all" as const, label: "All" }] : []),
    ...categories.map((category) => ({
      value: category,
      label: resolveCategoryMeta(categoryMeta, category).label,
    })),
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Filter timeline by category"
      className="flex flex-wrap gap-2"
      data-testid="timeline-category-filter"
    >
      {options.map((option) => {
        const isSelected = option.value === selected;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-pressed={isSelected}
            onClick={() =>
              onSelect(!showAll && isSelected ? "all" : option.value)
            }
            className={`rounded-xs border px-4 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-widest transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[color:var(--tl-accent)] ${
              isSelected
                ? "border-[color:var(--tl-accent)] bg-[var(--tl-accent)] text-[color:var(--tl-on-accent)] underline decoration-[color:var(--tl-on-accent)] decoration-2 underline-offset-4"
                : "border-[color:var(--tl-border-idle)] bg-[var(--tl-surface-pill-idle)] text-[color:var(--tl-text-muted)] hover:border-[color:var(--tl-border-hover)] hover:bg-[var(--tl-surface-pill-hover)]"
            }`}
            data-testid={`timeline-filter-${option.value}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
