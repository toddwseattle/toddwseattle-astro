import { vi } from "vitest";

/**
 * Test environment the timeline suites depend on.
 *
 * framer-motion measures layout during height animations, which reaches for
 * window.scrollTo. jsdom does not implement it and logs an uncaught error for
 * every animated expand. This lived in the site's root test setup, which made
 * the suites look self-contained when they were not — it belongs with the
 * components that need it, so it travels with them.
 */
export function installTimelineTestEnvironment() {
  if (typeof window === "undefined") return;
  Object.defineProperty(window, "scrollTo", {
    value: vi.fn(),
    writable: true,
  });
}

installTimelineTestEnvironment();
