import { describe, expect, it } from "vitest";
import { sanitize, defaults } from "../src/state/store";
describe("versioned progress validation", () => {
  it("recovers from malformed or missing data", () => {
    for (const value of [null, [], 42, "bad", {}])
      expect(sanitize(value)).toEqual(defaults);
  });
  it("does not accept invalid region, identity or completion", () => {
    expect(
      sanitize({
        continent: "Atlantis",
        gender: "unknown",
        complete: true,
        quality: "ultra",
      }),
    ).toEqual(defaults);
  });
  it("requires both selections before completing onboarding", () => {
    expect(sanitize({ continent: "Africa", complete: true }).complete).toBe(
      false,
    );
  });
  it("preserves valid independent selections and settings", () => {
    const p = {
      continent: "Oceania",
      gender: "Non-binary",
      complete: true,
      quality: "low",
      reducedMotion: true,
    };
    expect(sanitize(p)).toEqual(p);
  });
});
