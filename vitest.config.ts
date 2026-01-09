import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
  },
  plugins: [
    {
      name: "set-node-env-for-progressbar",
      configureVitest(ctx) {
        // If running ProgressBar test file, switch environment to node
        const files = ctx.project.glob;
        if (
          files?.some((f: string) =>
            f.includes("src/components/ui/ProgressBar.test.tsx"),
          )
        ) {
          ctx.project.config.environment = "node";
        }
      },
    },
  ],
});
