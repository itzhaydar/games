import { test, expect } from "@playwright/test";
test("game menu, real world and saved onboarding navigation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (window.top !== window.self) return;
    if (!localStorage.getItem("founderlife.v1"))
      localStorage.setItem(
        "founderlife.v1",
        JSON.stringify({ quality: "low", reducedMotion: true }),
      );
  });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "New Game", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /^Continue/ })).toHaveCount(0);
  await expect(page.locator("canvas")).toBeVisible();
  await page.screenshot({
    path: `test-results/title-${test.info().project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "New Game", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Continue", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: /01 Africa/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Female", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Start FounderLife" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("menu arrow navigation and renderer quality survive a settings change", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (window.top === window.self)
      localStorage.setItem(
        "founderlife.v1",
        JSON.stringify({ quality: "low", reducedMotion: true }),
      );
  });
  await page.goto("/");
  await page.getByRole("button", { name: "New Game", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("button", { name: "Settings", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await page.getByRole("combobox").selectOption("medium");
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  const metrics = await page
    .locator("canvas")
    .evaluate((c: HTMLCanvasElement) => ({
      buffer: [c.width, c.height],
      css: [c.clientWidth, c.clientHeight],
    }));
  expect(metrics.buffer[0] / metrics.css[0]).toBeLessThanOrEqual(1.21);
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByRole("combobox").selectOption("low");
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  expect(
    await page
      .locator("canvas")
      .evaluate((c: HTMLCanvasElement) => c.width / c.clientWidth),
  ).toBeLessThanOrEqual(1.01);
});
