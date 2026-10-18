import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
const practice = readFileSync("public/workstation/practice.html", "utf8");
async function enter(page: Page) {
  await page.addInitScript(() => {
    if (window.top !== window.self) return;
    if (!localStorage.getItem("founderlife.v1"))
      localStorage.setItem(
        "founderlife.v1",
        JSON.stringify({
          continent: "Europe",
          gender: "Non-binary",
          complete: true,
          quality: "low",
          reducedMotion: true,
        }),
      );
  });
  await page.goto("/journey");
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Approach workstation" }).click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "viewing",
  );
}
const consolePanel = (page: Page) => page.locator(".browser-console");
test("practice iframe supports input, clicks, links, scrolling and persistent enlarged view", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await enter(page);
  const iframe = page.locator("iframe");
  await expect(iframe).toHaveCSS("pointer-events", "none");
  await consolePanel(page)
    .getByRole("button", { name: "Activate Keyboard for Work" })
    .click();
  await expect(iframe).toHaveCSS("pointer-events", "auto");
  const frame = page.frameLocator("iframe");
  await frame
    .getByRole("textbox", { name: "Your idea", exact: true })
    .fill("A better way to learn");
  await frame
    .getByRole("textbox", { name: "Your idea", exact: true })
    .press("Tab");
  await expect(
    frame.getByRole("textbox", { name: "Scratchpad" }),
  ).toBeFocused();
  await frame
    .getByRole("textbox", { name: "Scratchpad" })
    .pressSequentially("E is typing, not a game shortcut.");
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "working",
  );
  await frame
    .getByRole("button", { name: "Test a button" })
    .scrollIntoViewIfNeeded();
  await frame.getByRole("button", { name: "Test a button" }).click();
  await expect(frame.getByRole("status")).toHaveText(
    "Button interaction works.",
  );
  await frame.getByRole("link", { name: /Jump to checklist/ }).click();
  await frame.getByRole("checkbox").first().check();
  await expect(frame.getByRole("checkbox").first()).toBeChecked();
  await expect(page.locator(".monitor-overlay")).toHaveClass(/enlarged/);
  await expect(page.locator(".monitor-overlay")).toHaveClass(/enlarged/);
  await expect(
    frame.getByRole("textbox", { name: "Your idea", exact: true }),
  ).toHaveValue("A better way to learn");
  await page
    .locator(".monitor-chrome")
    .getByRole("button", { name: "Restore monitor view" })
    .click();
  await expect(iframe).toHaveCSS("pointer-events", "none");
  await consolePanel(page)
    .getByRole("button", { name: "Activate Keyboard for Work" })
    .click();
  await expect(iframe).toHaveCSS("pointer-events", "auto");
  await expect(
    frame.getByRole("textbox", { name: "Your idea", exact: true }),
  ).toHaveValue("A better way to learn");
  await page.screenshot({
    path: `test-results/workstation-${test.info().project.name}.png`,
    fullPage: true,
  });
  await page
    .locator(".monitor-chrome")
    .getByRole("button", { name: "Exit Work Mode" })
    .click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "exploring",
  );
  await expect(
    page.getByRole("button", { name: "Approach workstation" }),
  ).toBeFocused();
  await expect(page.locator("iframe")).toHaveCount(0);
  expect(errors).toEqual([]);
});
test("HTTPS frame interaction, validation, address history and saved URL", async ({
  page,
}) => {
  await page.route("https://compatible.example/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/html", body: practice }),
  );
  await enter(page);
  await page.getByLabel("Website URL").fill("javascript:alert(1)");
  await page.getByRole("button", { name: "Load Website" }).click();
  await expect(page.getByRole("alert")).toContainText("Only HTTPS");
  await page.getByLabel("Website URL").fill("compatible.example/desk");
  await page.getByRole("button", { name: "Load Website" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://compatible.example/desk",
  );
  await consolePanel(page)
    .getByRole("button", { name: "Activate Keyboard for Work" })
    .click();
  await expect(page.locator(".monitor-overlay")).toHaveClass(/enlarged/);
  await page
    .frameLocator("iframe")
    .getByRole("textbox", { name: "Your idea", exact: true })
    .fill("Real cross-origin input");
  await page
    .frameLocator("iframe")
    .getByRole("button", { name: "Test a button" })
    .click();
  await expect(page.frameLocator("iframe").getByRole("status")).toHaveText(
    "Button interaction works.",
  );
  await page
    .locator(".monitor-chrome")
    .getByRole("button", { name: "Restore monitor view" })
    .click();
  await page
    .getByRole("button", { name: "Previous submitted address" })
    .click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "/workstation/practice.html",
  );
  await page.getByRole("button", { name: "Next submitted address" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://compatible.example/desk",
  );
  await page.reload();
  await page.getByRole("button", { name: "Approach workstation" }).click();
  await expect(page.getByLabel("Website URL")).toHaveValue(
    "https://compatible.example/desk",
  );
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "/workstation/practice.html",
  );
});
test("deliberately denied embedding offers honest manual fallback", async ({
  page,
}) => {
  const refusals: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") refusals.push(m.text());
  });
  await page.route("https://blocked.example/**", (route) =>
    route.fulfill({
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "X-Frame-Options": "DENY",
        "Content-Security-Policy": "frame-ancestors 'none'",
      },
      body: "<h1>Not embeddable</h1>",
    }),
  );
  await enter(page);
  await page.getByLabel("Website URL").fill("https://blocked.example/");
  await page.getByRole("button", { name: "Load Website" }).click();
  await expect
    .poll(() => refusals.some((v) => /frame|ancestor/i.test(v)))
    .toBe(true);
  await expect(page.locator("#embed-notice")).toContainText(
    "cannot be verified",
  );
  await consolePanel(page)
    .getByRole("button", { name: "Website not visible?" })
    .click();
  await expect(
    page.getByRole("region", { name: "Website embedding help" }),
  ).toContainText("This website cannot be displayed inside FounderLife.");
  await expect(
    page.getByRole("link", { name: "Open in Browser" }),
  ).toHaveAttribute("href", "https://blocked.example/");
  await expect(
    page.getByRole("link", { name: "Open in Browser" }),
  ).toHaveAttribute("rel", "noopener noreferrer");
  await page.getByRole("button", { name: "Try Another URL" }).click();
  await expect(page.getByLabel("Website URL")).toBeFocused();
  await consolePanel(page)
    .getByRole("button", { name: "Exit Work Mode", exact: true })
    .click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "exploring",
  );
});
test("browser back cleans up work mode, narrow layout retains touch exit", async ({
  page,
}) => {
  await enter(page);
  await page.getByRole("button", { name: "Main menu", exact: true }).click();
  await page.getByRole("button", { name: /^Continue/ }).click();
  await page.getByRole("button", { name: "Approach workstation" }).click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "viewing",
  );
  await consolePanel(page)
    .getByRole("button", { name: "Activate Keyboard for Work" })
    .click();
  await page.goBack();
  await expect(
    page.getByRole("navigation", { name: "Main menu" }),
  ).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: /^Continue/ }).click();
  await page.setViewportSize({ width: 320, height: 740 });
  await page.getByRole("button", { name: "Approach workstation" }).click();
  await expect(page.getByLabel("Website URL")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await consolePanel(page)
    .getByRole("button", { name: "Exit Work Mode", exact: true })
    .click();
  await expect(page.locator("[data-work-state]")).toHaveAttribute(
    "data-work-state",
    "exploring",
  );
});
