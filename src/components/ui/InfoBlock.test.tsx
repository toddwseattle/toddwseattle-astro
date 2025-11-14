import React from "react";
import { render, screen } from "@testing-library/react";
import InfoBlock from "./InfoBlock";

// Mock the Icon component to avoid FontAwesome rendering in tests
vi.mock("./Icon", () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <span data-testid="icon" className={className} />
  ),
}));

describe("InfoBlock", () => {
  const title = "Test Title";
  const content = "This is some content.";

  it("renders title and content", () => {
    const { container } = render(
      <InfoBlock icon={{} as any} title={title} content={content} />
    );

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("flex");
    expect(root).toHaveClass("gap-4");
    expect(root).not.toHaveClass("flex-col");
  });

  it("applies centered layout when center=true", () => {
    const { container } = render(
      <InfoBlock icon={{} as any} title={title} content={content} center />
    );

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("flex", "flex-col", "items-center", "text-center");
    expect(root).not.toHaveClass("gap-4");

    // icon wrapper gets margin-bottom when centered
    const iconEl = screen.getByTestId("icon");
    const iconWrapper = iconEl.parentElement as HTMLElement;
    expect(iconWrapper).toHaveClass("text-indigo-600", "text-3xl", "mb-4");
  });
});
