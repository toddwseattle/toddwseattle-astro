import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CategoryFilter from "./CategoryFilter";
import { testCategoryMeta } from "./testFixtures";
import "./testSetup";

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
        categoryMeta={testCategoryMeta}
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
        categoryMeta={testCategoryMeta}
        selected="all"
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByTestId("timeline-filter-ai-automation"));

    expect(onSelect).toHaveBeenCalledWith("ai-automation");
  });

  it("renders a category vocabulary the component library has never seen", () => {
    render(
      <CategoryFilter
        categories={["regulation", "supply-chain"]}
        categoryMeta={{
          regulation: { label: "Regulation", pillClassName: "pill-a" },
          "supply-chain": { label: "Supply Chain", pillClassName: "pill-b" },
        }}
        selected="all"
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("radio", { name: "Regulation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Supply Chain" }),
    ).toBeInTheDocument();
  });

  it("falls back to the raw slug when metadata is missing", () => {
    render(
      <CategoryFilter
        categories={["undocumented-slug"]}
        categoryMeta={{}}
        selected="all"
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("radio", { name: "undocumented-slug" }),
    ).toBeInTheDocument();
  });
});
