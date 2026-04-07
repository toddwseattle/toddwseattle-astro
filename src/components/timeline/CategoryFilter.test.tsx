import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CategoryFilter from "./CategoryFilter";

describe("CategoryFilter", () => {
  const seCategories = [
    "practices-tools",
    "teamwork-process",
    "platforms-languages",
    "ai-automation",
  ] as const;

  it("renders all expected filter options", () => {
    render(
      <CategoryFilter
        categories={[...seCategories]}
        selected="all"
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByTestId("timeline-filter-all")).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Practices & Tools" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Teamwork & Process" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Platforms & Languages" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "AI & Automation" }),
    ).toBeInTheDocument();
  });

  it("calls onSelect with selected category when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <CategoryFilter
        categories={[...seCategories]}
        selected="all"
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByTestId("timeline-filter-ai-automation"));

    expect(onSelect).toHaveBeenCalledWith("ai-automation");
  });
});
