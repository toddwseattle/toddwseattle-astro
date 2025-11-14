import React from "react";
import { render } from "@testing-library/react";
import Icon from "./Icon";

describe("Icon", () => {
  it("renders without crashing with valid icon", () => {
    const { container } = render(<Icon icon="laptop-code" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Icon icon="laptop-code" className="custom-icon-class" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("custom-icon-class");
  });

  it("accepts size prop", () => {
    const { container } = render(<Icon icon="laptop-code" size="2x" />);
    const svg = container.querySelector("svg");
    // FontAwesome applies size as a class like fa-2x
    expect(svg).toHaveClass("fa-2x");
  });

  it("renders brand icons", () => {
    const { container } = render(<Icon icon={["fab", "github"]} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
