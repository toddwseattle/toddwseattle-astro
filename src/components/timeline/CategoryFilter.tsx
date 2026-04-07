import type { TimelineCategory } from "../../data/se-timeline";
import { timelineCategoryMeta } from "../../data/se-timeline";

interface CategoryFilterProps {
  categories: TimelineCategory[];
  selected: TimelineCategory | "all";
  onSelect: (category: TimelineCategory | "all") => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  const options: Array<{ value: TimelineCategory | "all"; label: string }> = [
    { value: "all", label: "All" },
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
            onClick={() => onSelect(option.value)}
            className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite-400 ${
              isSelected
                ? "bg-ink-800 text-paper-50 border-ink-800 dark:bg-paper-100 dark:text-ink-800 dark:border-paper-100"
                : "bg-paper-50 text-ink-700 border-graphite-600/30 hover:bg-paper-200 dark:bg-surface-dark dark:text-paper-200 dark:border-graphite-600 dark:hover:bg-graphite-700"
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
