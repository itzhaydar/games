import type { Quality } from "../state/store";
/** Adapt to viewport area and device DPR within a bounded pixel budget.
 * These are quality budgets, not a measured FPS prediction.
 */
export function budgetDpr(
  quality: Quality,
  width: number,
  height: number,
  deviceDpr: number,
) {
  const cap = quality === "low" ? 1 : quality === "medium" ? 1.2 : 1.6;
  const pixels =
    quality === "low"
      ? 1_500_000
      : quality === "medium"
        ? 2_000_000
        : 3_000_000;
  return Math.max(
    0.25,
    Math.min(
      deviceDpr || 1,
      cap,
      Math.sqrt(pixels / Math.max(1, width * height)),
    ),
  );
}
