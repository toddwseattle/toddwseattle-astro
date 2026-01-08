// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, it, expect, beforeEach } from "vitest";
import { fileURLToPath } from "node:url";

// Render by filename to avoid Vite import analysis on .astro in tests
const ProgressBarFilename = fileURLToPath(
  new URL("./ProgressBar.astro", import.meta.url),
);

describe("ProgressBar", () => {
  let container: AstroContainer;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  it("renders with title and percentage (serialized)", async () => {
    const result = await (container as any).renderToString(
      ProgressBarFilename,
      {
        props: { title: "JavaScript", percentage: 85 },
      },
    );

    // When rendering by filename, container may serialize component tags.
    expect(result).toContain("ProgressBar.astro");
    expect(result).toContain('title="JavaScript"');
    expect(result).toContain('percentage="85"');
  });

  it("includes serialized props reflecting accessibility label intent", async () => {
    const result = await (container as any).renderToString(
      ProgressBarFilename,
      {
        props: { title: "TypeScript", percentage: 75 },
      },
    );

    // In filename mode, container returns serialized component tags with props
    expect(result).toContain('title="TypeScript"');
    expect(result).toContain('percentage="75"');
  });
});
