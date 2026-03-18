import { render, screen } from "@testing-library/react";
import TimelineEvent from "./TimelineEvent";

const event = {
  id: "event-1",
  yearDisplay: "2001",
  sortYear: 2001,
  title: "Agile Manifesto",
  description: "A major shift in team process and iterative delivery.",
  categories: ["teamwork-process", "practices-tools"] as const,
  significance: "major" as const,
  links: [{ label: "Read more", url: "https://example.com" }],
};

describe("TimelineEvent", () => {
  it("renders year, title, description, and category pills", () => {
    render(<TimelineEvent event={event} />);

    expect(screen.getByText("2001")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Agile Manifesto" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A major shift in team process and iterative delivery."),
    ).toBeInTheDocument();
    expect(screen.getByText("Teamwork & Process")).toBeInTheDocument();
    expect(screen.getByText("Practices & Tools")).toBeInTheDocument();
  });

  it("renders external links when provided", () => {
    render(<TimelineEvent event={event} />);

    const link = screen.getByRole("link", { name: "Read more →" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
