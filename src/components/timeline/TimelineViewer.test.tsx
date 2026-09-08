import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TimelineViewer from "./TimelineViewer";
import type { TimelineConfig } from "./types";
import "./testSetup";

/**
 * Deliberately uses a category vocabulary that exists nowhere in this repo —
 * if this suite passes, the component tree carries no knowledge of the site's
 * own slugs.
 */
const timeline: TimelineConfig = {
  key: "supply-chains",
  title: "Supply Chain Shocks",
  subtitle: "A borrowed vocabulary",
  framing: "Filter to focus discussion.",
  categoryOrder: ["regulation", "logistics"],
  categoryMeta: {
    regulation: { label: "Regulation", pillClassName: "pill-regulation" },
    logistics: { label: "Logistics", pillClassName: "pill-logistics" },
  },
  events: [
    {
      id: "containerisation",
      yearDisplay: "1956",
      sortYear: 1956,
      title: "Containerisation",
      description: "Intermodal shipping containers standardise freight.",
      categories: ["logistics"],
      significance: "major",
    },
    {
      id: "deregulation",
      yearDisplay: "1980",
      sortYear: 1980,
      title: "Deregulation",
      description: "Freight deregulation reshapes carriers.",
      categories: ["regulation"],
      significance: "notable",
    },
  ],
};

describe("TimelineViewer", () => {
  it("renders a timeline whose categories are unknown to this site", () => {
    render(<TimelineViewer timeline={timeline} />);

    expect(
      screen.getByRole("heading", { name: "Supply Chain Shocks" }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("timeline-filter-regulation"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("timeline-filter-logistics")).toBeInTheDocument();
  });

  it("renders exactly one level-2 heading across both views", () => {
    render(<TimelineViewer timeline={timeline} />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
  });

  it("renders no heading of its own when header is null", () => {
    render(<TimelineViewer timeline={timeline} header={null} />);

    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("reports category filtering through onEvent", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();

    render(<TimelineViewer timeline={timeline} onEvent={onEvent} />);
    await user.click(screen.getByTestId("timeline-filter-logistics"));

    expect(onEvent).toHaveBeenCalledWith(
      "category_filter",
      expect.objectContaining({
        timeline_key: "supply-chains",
        selected_category: "logistics",
        previous_category: "all",
      }),
    );
  });

  it("emits a single session summary on unmount", () => {
    const onEvent = vi.fn();
    const { unmount } = render(
      <TimelineViewer timeline={timeline} onEvent={onEvent} />,
    );

    unmount();

    const summaries = onEvent.mock.calls.filter(
      ([name]) => name === "session_summary",
    );
    expect(summaries).toHaveLength(1);
  });

  it("renders without an onEvent handler", () => {
    expect(() => render(<TimelineViewer timeline={timeline} />)).not.toThrow();
  });
});
