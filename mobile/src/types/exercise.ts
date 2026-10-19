export type ExerciseId = "squat" | "pushup" | "lunge" | "plank";

export type ExerciseResult = {
  state: string;
  repetitions: number;
  primaryAngle?: number;
  holdSeconds?: number;
};
