import { Landmark } from "../types/pose";

export function createStraightLegPose(): Landmark[] {
  const points: Landmark[] = Array.from({ length: 33 }, () => ({ x: 0, y: 0, z: 0, visibility: 1 }));
  points[23] = { x: 0.4, y: 0.4, z: 0, visibility: 1 };
  points[25] = { x: 0.4, y: 0.6, z: 0, visibility: 1 };
  points[27] = { x: 0.4, y: 0.8, z: 0, visibility: 1 };
  points[24] = { x: 0.6, y: 0.4, z: 0, visibility: 1 };
  points[26] = { x: 0.6, y: 0.6, z: 0, visibility: 1 };
  points[28] = { x: 0.6, y: 0.8, z: 0, visibility: 1 };
  return points;
}
