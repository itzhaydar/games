import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    () =>
      window.top === window.self &&
      !localStorage.getItem("founderlife.v1") &&
      localStorage.setItem(
        "founderlife.v1",
        JSON.stringify({ quality: "low", reducedMotion: true }),
      ),
  );
});
test("full journey, persistence, navigation, settings and restart", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.screenshot({
    path: `test-results/welcome-${test.info().project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "New Game" }).click();
  await expect(
    page.getByRole("button", { name: "Continue", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: /01 Africa/ }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Continue", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Non-binary", exact: true }).click();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("button", { name: /01 Africa/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Non-binary", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Start FounderLife" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Start FounderLife" }).click();
  await expect(
    page.getByRole("heading", { name: "Founder House studio" }),
  ).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
  await page.screenshot({
    path: `test-results/studio-${test.info().project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Approach workstation" }).click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "viewing",
  );
  await page
    .locator(".browser-console")
    .getByRole("button", { name: "Exit Work Mode", exact: true })
    .click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "exploring",
  );
  await page.getByRole("button", { name: "Main menu", exact: true }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: /^Continue/ })).toBeVisible();
  await page.getByRole("button", { name: "Open settings" }).click();
  await page.getByRole("combobox").selectOption("low");
  await page.getByRole("checkbox").check();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "New Game" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "New Game" })
    .click();
  await expect(
    page.getByRole("button", { name: "Continue", exact: true }),
  ).toBeDisabled();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("founderlife.v1")!).quality,
    ),
  ).toBe("low");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(await page.locator(".app").evaluate((el) => el.scrollLeft)).toBe(0);
  expect(errors).toEqual([]);
});
test("corrupted save and deep links recover safely, keyboard selects", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("founderlife.v1", "{broken"),
  );
  await page.goto("/journey");
  await expect(page.getByRole("button", { name: "New Game" })).toBeVisible();
  await page.getByRole("button", { name: "New Game" }).click();
  await page.getByRole("button", { name: /02 Asia/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: /02 Asia/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.screenshot({
    path: `test-results/region-${test.info().project.name}.png`,
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("WebGL-unavailable devices retain a functional entry", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (window.top !== window.self) return;
    localStorage.setItem(
      "founderlife.v1",
      JSON.stringify({
        continent: "Oceania",
        gender: "Female",
        complete: true,
        quality: "low",
      }),
    );
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl2") return null;
      return original.apply(this, [type, ...args] as never);
    } as typeof original;
  });
  await page.goto("/journey");
  await expect(
    page.getByText("3D is unavailable on this device.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Approach workstation" }).click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "viewing",
  );
  await expect(page.getByLabel("Website URL")).toBeVisible();
});
test("narrow phone screens remain within the viewport at each step", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const fits = async () => {
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(await page.locator(".app").evaluate((el) => el.scrollLeft)).toBe(0);
  };
  await fits();
  await page.getByRole("button", { name: "New Game" }).click();
  await page.getByRole("button", { name: /06 Oceania/ }).click();
  await fits();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Female", exact: true }).click();
  await fits();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await fits();
  await expect(
    page.getByRole("button", { name: "Start FounderLife" }),
  ).toBeVisible();
});
