import { Landmark } from "../types/pose";
import { elbowAngleOf } from "./pushup";
import { angle } from "../utils/pose";

const LEFT_SHOULDER = 11;
const RIGHT_SHOULDER = 12;
const LEFT_HIP = 23;
const RIGHT_HIP = 24;
const LEFT_KNEE = 25;
const RIGHT_KNEE = 26;
const LEFT_ANKLE = 27;
const RIGHT_ANKLE = 28;

export type DetectedExercise = "pushup" | "squat" | "lunge";

export function classifyExercise(landmarks: Landmark[], currentExercise?: DetectedExercise): DetectedExercise {
  if (landmarks.length <= RIGHT_ANKLE) return currentExercise || "squat";

  const shoulderY = (landmarks[LEFT_SHOULDER].y + landmarks[RIGHT_SHOULDER].y) / 2;
  const hipY = (landmarks[LEFT_HIP].y + landmarks[RIGHT_HIP].y) / 2;

  const verticalSpan = Math.abs(shoulderY - hipY);
  const elbow = elbowAngleOf(landmarks);

  // Push-up check: horizontal body orientation
  if (verticalSpan < 0.35 && elbow !== null && elbow < 160) {
    return "pushup";
  }

  const leftKnee = angle(landmarks[LEFT_HIP], landmarks[LEFT_KNEE], landmarks[LEFT_ANKLE]);
  const rightKnee = angle(landmarks[RIGHT_HIP], landmarks[RIGHT_KNEE], landmarks[RIGHT_ANKLE]);
  const kneeDiff = Math.abs(leftKnee - rightKnee);

  // Lunge check: asymmetric knee bend (one leg significantly more bent than the other)
  if (kneeDiff > 25 && (leftKnee < 130 || rightKnee < 130)) {
    return "lunge";
  }

  // Maintain continuity if already performing lunge or pushup
  if (currentExercise === "lunge" && kneeDiff > 20) {
    return "lunge";
  }
  if (currentExercise === "pushup" && verticalSpan < 0.4) {
    return "pushup";
  }

  return "squat";
}
