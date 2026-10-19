import { Landmark } from "../types/pose";

export function visibleLandmark(point?: Landmark, threshold = 0.5): boolean {
  if (!point) return false;
  if (point.visibility === undefined) return true;
  return point.visibility >= threshold;
}

export function hasBodyLandmarks(landmarks: Landmark[], required: number[], threshold = 0.5): boolean {
  return required.every((index) => visibleLandmark(landmarks[index], threshold));
}
