import { expect, test } from "@playwright/test";

test.describe("Whole-site coverage", () => {
  test("top-level pages render their primary content", async ({ page }) => {
    const pages = [
      {
        path: "/",
        heading: "Now",
        text: "Current focus across teaching, writing, consulting, and AutoSoftToday.",
      },
      {
        path: "/teaching/",
        heading: "Teaching",
        text: "All Course Materials & Resources",
      },
      {
        path: "/writing/",
        heading: "Writing",
        text: "Thoughts on innovation, software, teaching, cycling, and music",
      },
      {
        path: "/consulting/",
        heading: "Consulting",
        text: "Todd does consulting through",
      },
      {
        path: "/autosoft-today/",
        heading: "AutoSoftToday",
        text: "Visit AutoSoftToday",
      },
      {
        path: "/about/",
        heading: "About",
        text: "Software leader, educator, advisor",
      },
      {
        path: "/resume/",
        heading: "Todd Warren - Resume",
        text: "Nonprofit & Board Work",
      },
    ];

    for (const sitePage of pages) {
      const response = await page.goto(sitePage.path);

      expect(response?.status(), `${sitePage.path} should load`).toBeLessThan(
        400,
      );
      await expect(
        page.getByRole("heading", { name: sitePage.heading }).first(),
      ).toBeVisible();
      await expect(page.getByText(sitePage.text).first()).toBeVisible();
    }
  });

  test("primary navigation reaches the expected site sections", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    const sections = [
      { name: "Teaching", url: /\/teaching\/$/ },
      { name: "Writing", url: /\/writing\/$/ },
      { name: "AutoSoftToday", url: /\/autosoft-today\/$/ },
      { name: "Consulting", url: /\/consulting\/$/ },
      { name: "About", url: /\/about\/$/ },
    ];

    for (const section of sections) {
      await page.goto("/");
      await page
        .locator("header nav")
        .first()
        .getByRole("link", { name: section.name })
        .click();

      await expect(page).toHaveURL(section.url);
      await expect(
        page.getByRole("heading", { name: section.name }).first(),
      ).toBeVisible();
    }
  });

  test("writing supports index, detail, and tag discovery", async ({
    page,
  }) => {
    await page.goto("/writing/");

    const firstPost = page.locator(".post-card").first();
    const firstPostLink = firstPost.locator('a[href^="/writing/"]').first();
    const firstPostTitle = await firstPostLink.locator("h3").innerText();

    await firstPostLink.click();

    await expect(
      page.getByRole("heading", { name: firstPostTitle }).first(),
    ).toBeVisible();
    await expect(page.getByText(/Back to all posts/)).toBeVisible();

    await page.goto("/writing/");
    const tagLink = page.locator('.post-card a[href^="/writing/tag/"]').first();
    const tagLabel = await tagLink.innerText();
    await tagLink.click();

    await expect(
      page.getByRole("heading", { name: tagLabel.trim() }).first(),
    ).toBeVisible();
    await expect(page.getByText(/Posts tagged with/).first()).toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("teaching links to course detail and course materials", async ({
    page,
  }) => {
    await page.goto("/teaching/");

    await page
      .getByRole("link", { name: /Software Engineering/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/teaching\/software-engineering\/$/);
    await expect(
      page.getByRole("heading", { name: "Course Philosophy" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Course Materials & Resources" }),
    ).toBeVisible();

    await page
      .getByRole("link", {
        name: "Open Setting Up VS Code for Software Engineering",
      })
      .click();

    await expect(page).toHaveURL(
      /\/course-materials\/vscode-setup-tutorial\/?$/,
    );
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  });

  test("tutorial and timeline course materials render learning affordances", async ({
    page,
  }) => {
    await page.goto("/course-materials/vscode-setup-tutorial/");

    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Step 1: Install VS Code" }),
    ).toBeVisible();

    await page.goto("/course-materials/smartphone-revolution-timeline/");

    await expect(
      page.getByRole("heading", {
        name: "The Smartphone Revolution",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByTestId("timeline-era-filter-smartphone-disruption"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Smartphone Disruption" }),
    ).toBeVisible();
  });

  test("rss and robots routes return expected metadata", async ({ page }) => {
    const rssResponse = await page.goto("/rss.xml");
    expect(rssResponse?.status()).toBe(200);
    await expect(page.locator("rss > channel > title")).toContainText(
      "Todd Warren Writing",
    );
    expect(await page.locator("rss > channel > item").count()).toBeGreaterThan(
      0,
    );

    const robotsResponse = await page.goto("/robots.txt");
    expect(robotsResponse?.status()).toBe(200);
    await expect(page.locator("body")).toContainText("User-agent: *");
    await expect(page.locator("body")).toContainText(
      "Sitemap: https://toddwseattle.com/sitemap-index.xml",
    );
  });
});
