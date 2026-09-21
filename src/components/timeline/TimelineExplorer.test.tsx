import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimelineExplorer from "./TimelineExplorer";
import type { TimelineConfig } from "./types";
import { testCategoryMeta } from "./testFixtures";
import "./testSetup";

const timeline: TimelineConfig = {
  key: "software-engineering-history",
  title: "Test Timeline",
  subtitle: "Testing timeline filters",
  framing: "Use filters to narrow events.",
  categoryOrder: ["teamwork-process", "platforms-languages"],
  categoryMeta: testCategoryMeta,
  events: [
    {
      id: "agile",
      yearDisplay: "2001",
      sortYear: 2001,
      title: "Agile",
      description: "Agile process milestone",
      categories: ["teamwork-process"],
      significance: "major",
    },
    {
      id: "k8s",
      yearDisplay: "2014",
      sortYear: 2014,
      title: "Kubernetes",
      description: "Container orchestration milestone",
      categories: ["platforms-languages"],
      significance: "notable",
    },
  ],
};

describe("TimelineExplorer", () => {
  it("renders all events by default", () => {
    render(<TimelineExplorer timeline={timeline} />);

    expect(
      screen.getByText("Hover or tap an event to reveal context and sources."),
    ).toBeInTheDocument();
    expect(screen.getByText("Agile")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
  });

  it("leaves the heading to the host rather than rendering its own", () => {
    render(<TimelineExplorer timeline={timeline} />);

    expect(
      screen.queryByRole("heading", { name: "Test Timeline" }),
    ).not.toBeInTheDocument();
  });

  it("filters events by category and resets with All", async () => {
    const user = userEvent.setup();
    render(<TimelineExplorer timeline={timeline} />);

    await user.click(screen.getByTestId("timeline-filter-teamwork-process"));

    expect(screen.getByText("Agile")).toBeInTheDocument();
    expect(screen.queryByText("Kubernetes")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("timeline-filter-all"));

    expect(screen.getByText("Agile")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
  });

  it("renders untracked when no session is supplied", async () => {
    const user = userEvent.setup();
    render(<TimelineExplorer timeline={timeline} />);

    await expect(
      user.click(screen.getByTestId("timeline-filter-teamwork-process")),
    ).resolves.not.toThrow();
  });
});
