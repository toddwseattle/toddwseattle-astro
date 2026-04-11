// Copilot test instructions: Using vitest, mock subcomponents with vi.mock, and group tests in describe blocks

import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders the expected social links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/toddwseattle",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/toddwseattle",
    );
    expect(screen.getByRole("link", { name: "Twitter" })).toHaveAttribute(
      "href",
      "https://twitter.com/toddwseattle",
    );
  });

  it("opens external links in a new tab with noreferrer noopener", () => {
    render(<Footer />);

    screen.getAllByRole("link").forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
    });
  });
});
