import { describe, it, expect } from "vitest";
import { validateWebsite } from "../src/workstation/url";
import { transition } from "../src/workstation/machine";
import { screenMatrix } from "../src/workstation/projection";
describe("website validation", () => {
  it("normalizes public HTTPS addresses", () => {
    expect(validateWebsite("example.com/path?q=hello").url).toBe(
      "https://example.com/path?q=hello",
    );
    expect(validateWebsite(" https://example.com ").url).toBe(
      "https://example.com/",
    );
  });
  it.each([
    "",
    "javascript:alert(1)",
    "data:text/html,hello",
    "http://example.com",
    "file:///etc/passwd",
    "https://user:secret@example.com",
    "https://127.0.0.1",
    "https://[::1]",
    "https://2130706433",
    "https://localhost",
    "https://router.local",
    "https://host.internal",
    "https://example.com:8443",
    "https://hello world.com",
    "https://example.com\n/path",
  ])("rejects unsafe or unsupported input: %s", (input) => {
    expect(validateWebsite(input).error).toBeTruthy();
  });
});
describe("workstation input ownership", () => {
  it("requires the seating sequence before accepting work input", () => {
    let s = transition("exploring", "ACTIVATE");
    expect(s).toBe("exploring");
    s = transition(s, "APPROACH");
    s = transition(s, "ARRIVED");
    s = transition(s, "SEATED");
    expect(s).toBe("viewing");
    s = transition(s, "ACTIVATE");
    expect(s).toBe("working");
    s = transition(s, "EXIT");
    expect(s).toBe("exiting");
    expect(transition(s, "FINISHED")).toBe("exploring");
  });
  it("supports canceling a transition", () => {
    expect(transition("approaching", "EXIT")).toBe("exiting");
    expect(transition("sitting", "EXIT")).toBe("exiting");
  });
});
describe("monitor perspective", () => {
  it("maps all four corners onto the rendered display", () => {
    const points = [
      { x: 100, y: 80 },
      { x: 700, y: 120 },
      { x: 650, y: 500 },
      { x: 120, y: 460 },
    ];
    const m = screenMatrix(points, 1280, 720)!;
    [
      [0, 0],
      [1280, 0],
      [1280, 720],
      [0, 720],
    ].forEach(([x, y], i) => {
      const w = m[3] * x + m[7] * y + m[15];
      expect((m[0] * x + m[4] * y + m[12]) / w).toBeCloseTo(points[i].x, 6);
      expect((m[1] * x + m[5] * y + m[13]) / w).toBeCloseTo(points[i].y, 6);
    });
  });
  it("rejects a collapsed surface", () => {
    expect(screenMatrix(Array(4).fill({ x: 0, y: 0 }), 1280, 720)).toBeNull();
  });
});
import { budgetDpr } from "../src/game/quality";
describe("adaptive render budget", () => {
  it("caps mobile DPR without allocating full high-density buffers", () => {
    expect(budgetDpr("low", 390, 844, 3)).toBe(1);
    expect(budgetDpr("high", 390, 844, 3)).toBe(1.6);
  });
  it("reduces the buffer on large displays", () => {
    expect(budgetDpr("medium", 3840, 2160, 2)).toBeLessThan(1);
    expect(budgetDpr("medium", 3840, 2160, 2) ** 2 * 3840 * 2160).toBeCloseTo(
      2_000_000,
    );
  });
});
