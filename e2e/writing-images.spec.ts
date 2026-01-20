import { test, expect } from '@playwright/test';

test.describe('Writing page images', () => {
  test('blog cards display images correctly', async ({ page }) => {
    await page.goto('/writing/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Get all blog card images
    const cardImages = page.locator('.post-card img');
    const imageCount = await cardImages.count();

    // Verify we have images on the page (posts with covers)
    expect(imageCount).toBeGreaterThan(0);

    // Check each image loads successfully
    for (let i = 0; i < imageCount; i++) {
      const img = cardImages.nth(i);

      // Verify image is visible
      await expect(img).toBeVisible();

      // Verify image has loaded (naturalWidth > 0 means image loaded)
      const naturalWidth = await img.evaluate(
        (el: HTMLImageElement) => el.naturalWidth
      );
      expect(naturalWidth).toBeGreaterThan(0);

      // Verify image has a src attribute
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();

      // Verify image src points to Astro's image processing
      // Dev mode: /_image?... Production: /_astro/*.webp
      expect(src).toMatch(/^\/_(?:astro\/.*\.webp|image\?)/);
    }
  });

  test('blog cards have alt text for accessibility', async ({ page }) => {
    await page.goto('/writing/');
    await page.waitForLoadState('networkidle');

    const cardImages = page.locator('.post-card img');
    const imageCount = await cardImages.count();

    for (let i = 0; i < imageCount; i++) {
      const img = cardImages.nth(i);
      const alt = await img.getAttribute('alt');

      // Every image should have alt text
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
    }
  });

  test('category filter works and maintains images', async ({ page }) => {
    await page.goto('/writing/');
    await page.waitForLoadState('networkidle');

    // Get initial image count
    const initialImages = page.locator('.post-card:not(.hidden) img');
    const initialCount = await initialImages.count();

    // Select a specific category (innovation has multiple posts)
    const filterSelect = page.locator('#category-filter');
    if (await filterSelect.isVisible()) {
      await filterSelect.selectOption('innovation');

      // Wait for filter to apply
      await page.waitForTimeout(100);

      // Get filtered image count
      const filteredImages = page.locator('.post-card:not(.hidden) img');
      const filteredCount = await filteredImages.count();

      // Should have fewer or equal images after filtering
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
      expect(filteredCount).toBeGreaterThan(0);

      // Verify filtered images still load correctly
      for (let i = 0; i < filteredCount; i++) {
        const img = filteredImages.nth(i);
        await expect(img).toBeVisible();

        const naturalWidth = await img.evaluate(
          (el: HTMLImageElement) => el.naturalWidth
        );
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });
});
