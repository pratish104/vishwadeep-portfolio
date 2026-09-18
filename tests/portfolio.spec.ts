import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const width of [1440, 1280, 1024, 768, 390, 360]) {
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");

    for (const id of [
      "home",
      "about",
      "skills",
      "projects",
      "experience",
      "work",
      "contact",
    ]) {
      const section = page.locator(`#${id}`);
      await expect(section).toBeVisible();
      await section.scrollIntoViewIfNeeded();

      const hasOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
      );

      expect(hasOverflow, `Overflow in section ${id}`).toBe(false);
    }

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".project-card")).toHaveCount(3);
  });
}

test("desktop navigation targets real sections and updates the active state", async ({
  page,
}) => {
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Main navigation" });

  for (const label of [
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Contact",
    "Home",
  ]) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await link.click();
    await expect(link).toHaveAttribute("aria-current", "location");
  }
});

test("mobile navigation opens, scrolls, closes, and supports Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const openButton = page.getByRole("button", { name: "Open navigation" });
  await openButton.click();

  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav).toBeVisible();

  await nav.getByRole("link", { name: "Projects", exact: true }).click();

  await expect(page).toHaveURL(/#projects$/);
  await expect(openButton).toHaveAttribute("aria-expanded", "false");

  await openButton.click();
  await page.keyboard.press("Escape");

  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await expect(openButton).toBeFocused();
});

test("every project opens a complete case study and restores focus", async ({
  page,
}) => {
  await page.goto("/");

  const cards = page.locator(".project-card");

  for (let index = 0; index < 3; index++) {
    const trigger = cards.nth(index).getByRole("button", {
      name: /^Read .* case study$/,
    });

    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    for (const heading of [
      "Problem",
      "Approach",
      "Data",
      "Processing",
      "Solution",
      "Result / Impact",
      "Tech Stack",
    ]) {
      await expect(
        dialog.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    }

    await page.keyboard.press("Escape");

    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test("mobile dialog remains inside the viewport and closes with its button", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  await page
    .getByRole("button", { name: /^Read DigiPath .* case study$/ })
    .click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);

  await dialog.getByRole("button", { name: "Close project details" }).click();
  await expect(dialog).toHaveCount(0);
});

test("contact form validates inputs and never claims an unconnected delivery", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Send message", exact: true }).click();

  await expect(page.getByLabel("Name", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Message", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  await page.getByLabel("Name", { exact: true }).fill("Portfolio Visitor");
  await page.getByLabel("Email", { exact: true }).fill("visitor@example.com");
  await page
    .getByLabel("Message", { exact: true })
    .fill("I would like to discuss a data analytics project.");

  await page.getByRole("button", { name: "Send message", exact: true }).click();

  await expect(
    page.getByText(/Your message has not been sent because/),
  ).toBeVisible();

  await expect(page.getByLabel("Message", { exact: true })).toHaveValue(
    "I would like to discuss a data analytics project.",
  );
});

test("theme toggle persists after reloading", async ({ page }) => {
  await page.goto("/");

  const before = await page.locator("html").getAttribute("data-theme");
  await page.getByRole("button", { name: /^Switch to .* theme$/ }).click();

  const expected = before === "dark" ? "light" : "dark";

  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
});

test("page has no broken placeholder links or runtime errors", async ({ page }) => {
  const errors: string[] = [];

  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();

  await page
    .getByRole("button", { name: /^Read DigiPath .* case study$/ })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(page.locator('a[href*="YOUR_"]')).toHaveCount(0);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);

  expect(errors).toEqual([]);
});
