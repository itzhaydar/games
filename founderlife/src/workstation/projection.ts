export type Point = { x: number; y: number };
/** Homography maps the CSS rectangle onto the monitor's projected four corners.
 * Corner order: top-left, top-right, bottom-right, bottom-left.
 */
export function screenMatrix(
  [p0, p1, p2, p3]: Point[],
  width: number,
  height: number,
) {
  const dx1 = p1.x - p2.x,
    dx2 = p3.x - p2.x,
    dx3 = p0.x - p1.x + p2.x - p3.x;
  const dy1 = p1.y - p2.y,
    dy2 = p3.y - p2.y,
    dy3 = p0.y - p1.y + p2.y - p3.y;
  const denominator = dx1 * dy2 - dx2 * dy1;
  if (Math.abs(denominator) < 0.00001) return null;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator,
    h = (dx1 * dy3 - dx3 * dy1) / denominator;
  return [
    (p1.x - p0.x + g * p1.x) / width,
    (p1.y - p0.y + g * p1.y) / width,
    0,
    g / width,
    (p3.x - p0.x + h * p3.x) / height,
    (p3.y - p0.y + h * p3.y) / height,
    0,
    h / height,
    0,
    0,
    1,
    0,
    p0.x,
    p0.y,
    0,
    1,
  ];
}
