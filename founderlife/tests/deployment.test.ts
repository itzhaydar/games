import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
const config = JSON.parse(
  readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
);
describe("Vercel SPA routing", () => {
  it("rewrites all application routes including nested refreshes", () => {
    const route = new RegExp("^" + config.rewrites[0].source + "$");
    for (const path of ["/", "/journey", "/begin/founder", "/hangar"])
      expect(route.test(path)).toBe(true);
    expect(config.rewrites[0].destination).toBe("/index.html");
  });
  it("leaves static asset requests intact", () => {
    const route = new RegExp("^" + config.rewrites[0].source + "$");
    for (const path of [
      "/assets/game.js",
      "/assets/font.woff2",
      "/favicon.svg",
    ])
      expect(route.test(path)).toBe(false);
    expect(config.outputDirectory).toBe("dist");
  });
});
