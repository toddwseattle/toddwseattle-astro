import { test, expect } from "@playwright/test";

const screenshotPath = "test-results/homepage.png";

test("homepage loads and captures a screenshot", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Todd/);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: screenshotPath, fullPage: true });
});
