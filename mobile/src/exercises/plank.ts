import { Landmark } from "../types/pose";
import { angle } from "../utils/pose";

const LEFT_SHOULDER = 11;
const LEFT_HIP = 23;
const LEFT_KNEE = 25;
const RIGHT_SHOULDER = 12;
const RIGHT_HIP = 24;
const RIGHT_KNEE = 26;

export function getPlankAngle(landmarks: Landmark[]): number | undefined {
  if (landmarks.length <= RIGHT_KNEE) return undefined;

  const left = angle(landmarks[LEFT_SHOULDER], landmarks[LEFT_HIP], landmarks[LEFT_KNEE]);
  const right = angle(landmarks[RIGHT_SHOULDER], landmarks[RIGHT_HIP], landmarks[RIGHT_KNEE]);
  return (left + right) / 2;
}
