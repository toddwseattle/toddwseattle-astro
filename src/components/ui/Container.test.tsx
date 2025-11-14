import React from "react";
import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Container", () => {
  it("renders children content", () => {
    render(<Container>Test content</Container>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies base container classes", () => {
    const { container } = render(<Container>Content</Container>);
    const div = container.firstElementChild as HTMLElement;
    expect(div).toHaveClass("container", "mx-auto", "px-4");
  });

  it("applies section padding when section=true", () => {
    const { container } = render(<Container section>Content</Container>);
    const div = container.firstElementChild as HTMLElement;
    expect(div).toHaveClass("py-12", "md:py-16");
  });

  it("does not apply section padding by default", () => {
    const { container } = render(<Container>Content</Container>);
    const div = container.firstElementChild as HTMLElement;
    expect(div).not.toHaveClass("py-12");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Container className="custom-class">Content</Container>
    );
    const div = container.firstElementChild as HTMLElement;
    expect(div).toHaveClass("custom-class");
  });
});
