import { Landmark } from "../types/pose";

export function smoothLandmarks(previous: Landmark[], current: Landmark[], alpha = 0.35): Landmark[] {
  if (previous.length !== current.length || previous.length === 0) return current;

  return current.map((point, index) => {
    const old = previous[index];
    return {
      ...point,
      x: old.x + (point.x - old.x) * alpha,
      y: old.y + (point.y - old.y) * alpha,
      z: old.z === undefined || point.z === undefined
        ? point.z
        : old.z + (point.z - old.z) * alpha
    };
  });
}
