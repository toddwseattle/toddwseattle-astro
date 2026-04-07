import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimelineEvent from "./TimelineEvent";
import type { TimelineEvent as TimelineEventType } from "../../data/timelines";

const event: TimelineEventType = {
  id: "event-1",
  yearDisplay: "2001",
  sortYear: 2001,
  title: "Agile Manifesto",
  description: "A major shift in team process and iterative delivery.",
  categories: ["teamwork-process", "practices-tools"],
  significance: "major",
  links: [{ label: "Read more", url: "https://example.com" }],
  image: {
    src: "/ashesi-Ashesi_University_Logo.jpg",
    alt: "Decorative archival placeholder",
  },
};

describe("TimelineEvent", () => {
  it("renders only the headline content by default", () => {
    render(<TimelineEvent event={event} />);

    expect(screen.getByText("2001")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Agile Manifesto" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "A major shift in team process and iterative delivery.",
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Teamwork & Process")).not.toBeInTheDocument();
  });

  it("reveals description, categories, links, and image on hover", async () => {
    const user = userEvent.setup();
    render(<TimelineEvent event={event} />);

    await user.hover(screen.getByTestId("timeline-event-toggle-event-1"));

    expect(
      await screen.findByText(
        "A major shift in team process and iterative delivery.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Teamwork & Process")).toBeInTheDocument();
    expect(screen.getByText("Practices & Tools")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Read more →" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(
      screen.getByAltText("Decorative archival placeholder"),
    ).toBeInTheDocument();
  });

  it("toggles the expanded content on click for tap interactions", async () => {
    render(<TimelineEvent event={event} />);

    const toggle = screen.getByTestId("timeline-event-toggle-event-1");

    fireEvent.click(toggle);
    expect(
      await screen.findByText(
        "A major shift in team process and iterative delivery.",
      ),
    ).toBeInTheDocument();

    fireEvent.click(toggle);
    await waitFor(() => {
      expect(
        screen.queryByText(
          "A major shift in team process and iterative delivery.",
        ),
      ).not.toBeInTheDocument();
    });
  });
});
