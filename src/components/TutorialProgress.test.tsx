import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import TutorialProgress, { type Step } from "./TutorialProgress";

// Simple IntersectionObserver mock using vi.fn per project guidelines
class IOStub {
  callback: IntersectionObserverCallback;
  elements: Element[] = [];
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    // expose latest instance for tests
    (globalThis as any).__ioInstance = this;
  }
  observe = vi.fn((el: Element) => {
    this.elements.push(el);
  });
  disconnect = vi.fn(() => {
    this.elements = [];
  });
  // Helper to trigger intersection for a given element id
  triggerIntersect(id: string) {
    const entry: IntersectionObserverEntry = {
      isIntersecting: true,
      target: { id } as any,
      boundingClientRect: {} as any,
      intersectionRatio: 1,
      intersectionRect: {} as any,
      rootBounds: null,
      time: Date.now(),
    };
    this.callback([entry], this as unknown as IntersectionObserver);
  }
}

// Attach to global before tests
beforeEach(() => {
  vi.clearAllMocks();
  (globalThis as any).IntersectionObserver =
    IOStub as unknown as typeof IntersectionObserver;
});

const steps: Step[] = [
  { id: "step-1", label: "Step 1: Intro" },
  { id: "step-2", label: "Step 2: Setup" },
  { id: "step-3", label: "Step 3: Build" },
];

// Create heading elements in document to match IDs (as markdown would)
function injectHeadings(ids: string[]) {
  ids.forEach((id) => {
    const h2 = document.createElement("h2");
    h2.id = id;
    h2.textContent = id;
    document.body.appendChild(h2);
  });
}

describe("TutorialProgress", () => {
  it("renders steps in order with correct labels and anchors", () => {
    injectHeadings(steps.map((s) => s.id));
    render(<TutorialProgress steps={steps} />);

    const list = screen.getByTestId("tutorial-steps");
    expect(list).toBeInTheDocument();

    steps.forEach((s) => {
      const item = screen.getByTestId(`tutorial-step-${s.id}`);
      expect(item).toBeInTheDocument();
      const link = item.querySelector("a");
      expect(link).toBeTruthy();
      expect((link as HTMLAnchorElement).getAttribute("href")).toBe(`#${s.id}`);
      expect(item).toHaveTextContent(s.label);
    });
  });

  it("updates active step when IntersectionObserver triggers", async () => {
    injectHeadings(steps.map((s) => s.id));
    render(<TutorialProgress steps={steps} />);

    // Retrieve the IO stub instance constructed by the component
    const stub: IOStub = (globalThis as any).__ioInstance as IOStub;
    expect(stub).toBeTruthy();

    // Trigger intersection for step-2 (wrap in act for React updates)
    await act(async () => {
      stub.triggerIntersect("step-2");
    });

    // Active item should have aria-current="step" and active styles
    const activeItem = screen.getByTestId("tutorial-step-step-2");
    const link = activeItem.querySelector("a") as HTMLAnchorElement;
    expect(link.getAttribute("aria-current")).toBe("step");
  });

  it("clicking a step anchor does not throw and has correct href", async () => {
    injectHeadings(steps.map((s) => s.id));
    render(<TutorialProgress steps={steps} />);

    const user = userEvent.setup();
    const item = screen.getByTestId("tutorial-step-step-3");
    const link = item.querySelector("a") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("#step-3");
    await user.click(link);
    // No assertion on scroll; just ensure no crash
    expect(true).toBe(true);
  });
});
