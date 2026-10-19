import { Landmark } from "../types/pose";
import { angle } from "../utils/pose";

export type LungeState = "standing" | "descending" | "bottom" | "ascending";

const LEFT_HIP = 23;
const LEFT_KNEE = 25;
const LEFT_ANKLE = 27;
const RIGHT_HIP = 24;
const RIGHT_KNEE = 26;
const RIGHT_ANKLE = 28;

export function updateLunge(
  landmarks: Landmark[],
  previousState: LungeState,
  repetitions: number
) {
  if (landmarks.length <= RIGHT_ANKLE) return { state: previousState, repetitions };

  const left = angle(landmarks[LEFT_HIP], landmarks[LEFT_KNEE], landmarks[LEFT_ANKLE]);
  const right = angle(landmarks[RIGHT_HIP], landmarks[RIGHT_KNEE], landmarks[RIGHT_ANKLE]);
  const kneeAngle = Math.min(left, right);

  let state = previousState;
  if (kneeAngle > 160) state = "standing";
  else if (kneeAngle > 115) state = "descending";
  else if (kneeAngle < 100) state = "bottom";
  else if (kneeAngle < 140) state = "ascending";

  const next = previousState === "bottom" && state === "standing" ? repetitions + 1 : repetitions;
  return { state, repetitions: next, primaryAngle: kneeAngle };
}
