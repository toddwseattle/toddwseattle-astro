import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect, beforeEach } from "vitest";
import ProgressBar from "./ProgressBar.astro";

describe("ProgressBar", () => {
  let container: AstroContainer;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  it("renders with title and percentage", async () => {
    const result = await container.renderToString(ProgressBar, {
      props: { title: "JavaScript", percentage: 85 },
    });

    expect(result).toContain("JavaScript");
    expect(result).toContain("85%");
  });

  it("sets correct width style for progress bar", async () => {
    const result = await container.renderToString(ProgressBar, {
      props: { title: "React", percentage: 90 },
    });

    expect(result).toContain("width: 90%");
  });

  it("includes accessibility attributes", async () => {
    const result = await container.renderToString(ProgressBar, {
      props: { title: "TypeScript", percentage: 75 },
    });

    expect(result).toContain('role="progressbar"');
    expect(result).toContain('aria-valuenow="75"');
    expect(result).toContain('aria-valuemin="0"');
    expect(result).toContain('aria-valuemax="100"');
    expect(result).toContain('aria-label="TypeScript: 75%"');
  });

  it("handles 0% correctly", async () => {
    const result = await container.renderToString(ProgressBar, {
      props: { title: "New Skill", percentage: 0 },
    });

    expect(result).toContain("0%");
    expect(result).toContain("width: 0%");
  });

  it("handles 100% correctly", async () => {
    const result = await container.renderToString(ProgressBar, {
      props: { title: "Expert Skill", percentage: 100 },
    });

    expect(result).toContain("100%");
    expect(result).toContain("width: 100%");
  });

  it("applies correct CSS classes", async () => {
    const result = await container.renderToString(ProgressBar, {
      props: { title: "Python", percentage: 80 },
    });

    expect(result).toContain("progress-bar");
    expect(result).toContain("mb-6");
    expect(result).toContain("flex justify-between items-center mb-2");
    expect(result).toContain("text-sm font-medium text-gray-700");
    expect(result).toContain("text-sm font-semibold text-indigo-600");
    expect(result).toContain(
      "w-full h-2 bg-gray-200 rounded-full overflow-hidden"
    );
    expect(result).toContain("progress-fill");
  });
});
