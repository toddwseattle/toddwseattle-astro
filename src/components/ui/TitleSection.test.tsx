import React from "react";
import { render, screen } from "@testing-library/react";
import TitleSection from "./TitleSection";

describe("TitleSection", () => {
  it("renders title", () => {
    render(<TitleSection title="Test Title" />);
    expect(
      screen.getByRole("heading", { name: "Test Title" })
    ).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<TitleSection title="Title" subtitle="This is a subtitle" />);
    expect(screen.getByText("This is a subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle element when not provided", () => {
    const { container } = render(<TitleSection title="Title" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(0);
  });

  it("applies center alignment when center=true", () => {
    const { container } = render(<TitleSection title="Title" center />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("text-center");
  });

  it("does not apply center alignment by default", () => {
    const { container } = render(<TitleSection title="Title" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveClass("text-center");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TitleSection title="Title" className="custom-title-class" />
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-title-class");
  });
});
