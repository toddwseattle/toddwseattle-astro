import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders children content", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("applies primary variant styles", () => {
    render(<Button primary>Primary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-indigo-600", "text-white");
  });

  it("applies secondary variant styles by default", () => {
    render(<Button>Secondary Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-200", "text-indigo-900");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
