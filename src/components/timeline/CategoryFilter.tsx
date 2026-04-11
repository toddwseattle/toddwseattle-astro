import type { TimelineCategory } from "../../data/timelines";
import { timelineCategoryMeta } from "../../data/timelines";

interface CategoryFilterProps {
  categories: TimelineCategory[];
  selected: TimelineCategory | "all";
  onSelect: (category: TimelineCategory | "all") => void;
  showAll?: boolean;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  showAll = true,
}: CategoryFilterProps) {
  const options: Array<{ value: TimelineCategory | "all"; label: string }> = [
    ...(showAll ? [{ value: "all" as const, label: "All" }] : []),
    ...categories.map((category) => ({
      value: category,
      label: timelineCategoryMeta[category].label,
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
            className={`rounded-sm border px-4 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal ${
              isSelected
                ? "border-accent-teal bg-accent-teal text-paper-50 underline decoration-paper-50 decoration-2 underline-offset-4 dark:border-accent-teal dark:bg-accent-teal dark:text-paper-50"
                : "border-paper-200 bg-paper-200/85 text-ink-600 hover:border-graphite-400 hover:bg-paper-100 dark:border-graphite-600 dark:bg-surface-dark dark:text-paper-200 dark:hover:bg-graphite-700"
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
