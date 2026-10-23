export type WorkoutSummary = {
  exercise: string;
  repetitions: number;
  durationSeconds: number;
};

export async function saveWorkout(
  baseUrl: string,
  workout: WorkoutSummary
): Promise<void> {
  const response = await fetch(`${baseUrl}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout)
  });

  if (!response.ok) {
    throw new Error(`Workout save failed: ${response.status}`);
  }
}
