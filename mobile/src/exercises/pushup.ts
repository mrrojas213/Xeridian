import { Landmark } from "../types/pose";
import { angle } from "../utils/pose";

export type PushupState = "up" | "descending" | "bottom" | "ascending";

const LEFT_SHOULDER = 11;
const LEFT_ELBOW = 13;
const LEFT_WRIST = 15;
const RIGHT_SHOULDER = 12;
const RIGHT_ELBOW = 14;
const RIGHT_WRIST = 16;

const TOP_ANGLE = 145;
const BOTTOM_ANGLE = 95;

export function updatePushup(
  landmarks: Landmark[],
  previousState: PushupState,
  repetitions: number
) {
  if (landmarks.length <= RIGHT_WRIST) {
    return { state: previousState, repetitions };
  }

  const left = angle(landmarks[LEFT_SHOULDER], landmarks[LEFT_ELBOW], landmarks[LEFT_WRIST]);
  const right = angle(landmarks[RIGHT_SHOULDER], landmarks[RIGHT_ELBOW], landmarks[RIGHT_WRIST]);
  const elbowAngle = (left + right) / 2;

  let state: PushupState;
  if (elbowAngle > TOP_ANGLE) state = "up";
  else if (elbowAngle < BOTTOM_ANGLE) state = "bottom";
  else if (previousState === "bottom" || previousState === "ascending") state = "ascending";
  else state = "descending";

  const next = previousState === "ascending" && state === "up" ? repetitions + 1 : repetitions;
  return { state, repetitions: next, primaryAngle: elbowAngle };
}
