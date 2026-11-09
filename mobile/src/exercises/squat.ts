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

  if (kneeAngle > 150) {
    state = "standing";
  } else if (kneeAngle < 110) {
    state = "bottom";
  } else if (previousState === "bottom" || previousState === "ascending") {
    state = "ascending";
  } else {
    state = "descending";
  }

  if ((previousState === "bottom" || previousState === "ascending") && kneeAngle > 150) {
    nextRepetitions += 1;
    state = "standing";
  }

  return { state, repetitions: nextRepetitions, kneeAngle };
}
