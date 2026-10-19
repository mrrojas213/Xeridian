import { Landmark } from "../types/pose";
import { angle } from "../utils/pose";

export type SquatState =
  | "standing"
  | "descending"
  | "bottom"
  | "ascending";

export type SquatResult = {
  state: SquatState;
  repetitions: number;
  kneeAngle?: number;
};

const LEFT_HIP = 23;
const LEFT_KNEE = 25;
const LEFT_ANKLE = 27;
const RIGHT_HIP = 24;
const RIGHT_KNEE = 26;
const RIGHT_ANKLE = 28;

export function updateSquat(
  landmarks: Landmark[],
  previousState: SquatState,
  repetitions: number
): SquatResult {
  if (
    landmarks.length <= RIGHT_ANKLE ||
    !landmarks[LEFT_HIP] ||
    !landmarks[LEFT_KNEE] ||
    !landmarks[LEFT_ANKLE] ||
    !landmarks[RIGHT_HIP] ||
    !landmarks[RIGHT_KNEE] ||
    !landmarks[RIGHT_ANKLE]
  ) {
    return { state: previousState, repetitions };
  }

  const leftKnee = angle(
    landmarks[LEFT_HIP],
    landmarks[LEFT_KNEE],
    landmarks[LEFT_ANKLE]
  );

  const rightKnee = angle(
    landmarks[RIGHT_HIP],
    landmarks[RIGHT_KNEE],
    landmarks[RIGHT_ANKLE]
  );

  const kneeAngle = (leftKnee + rightKnee) / 2;

  let state = previousState;
  let nextRepetitions = repetitions;

  if (kneeAngle > 160) {
    state = "standing";
  } else if (kneeAngle > 120) {
    state = "descending";
  } else if (kneeAngle < 100) {
    state = "bottom";
  } else if (kneeAngle < 140) {
    state = "ascending";
  }

  if (previousState === "bottom" && state === "standing") {
    nextRepetitions += 1;
  }

  return { state, repetitions: nextRepetitions, kneeAngle };
}