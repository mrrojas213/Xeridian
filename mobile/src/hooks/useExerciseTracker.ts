import { useCallback, useRef, useState } from "react";
import { extractLandmarks, extractWorldLandmarks, parseLandmarkEvent } from "../utils/pose";
import { Landmark, TrackingStatus } from "../types/pose";
import { updatePushup, PushupState } from "../exercises/pushup";
import { updateSquat, SquatState } from "../exercises/squat";
import { updateLunge, LungeState } from "../exercises/lunge";
import { classifyExercise, DetectedExercise } from "../exercises/classifier";

export function useExerciseTracker(forcedExercise: DetectedExercise | "auto" = "auto") {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [status, setStatus] = useState<TrackingStatus>("searching");
  const [exercise, setExercise] = useState<DetectedExercise>(forcedExercise === "auto" ? "squat" : forcedExercise);

  // Reps and states for each exercise
  const [repsMap, setRepsMap] = useState<Record<DetectedExercise, number>>({
    pushup: 0,
    squat: 0,
    lunge: 0
  });

  const [stateMap, setStateMap] = useState<{
    pushup: PushupState;
    squat: SquatState;
    lunge: LungeState;
  }>({
    pushup: "up",
    squat: "standing",
    lunge: "standing"
  });

  const [primaryAngle, setPrimaryAngle] = useState<number | null>(null);

  const repsRef = useRef(repsMap);
  repsRef.current = repsMap;

  const stateRef = useRef(stateMap);
  stateRef.current = stateMap;

  const exerciseRef = useRef(exercise);
  exerciseRef.current = exercise;

  const onLandmark = useCallback((data: unknown) => {
    const event = parseLandmarkEvent(data);
    const flat = extractLandmarks(event);

    if (flat.length === 0 || flat.every(p => (p.visibility ?? 1) < 0.3)) {
      setStatus("searching");
      setLandmarks([]);
      setPrimaryAngle(null);
      return;
    }

    setLandmarks(flat);
    setStatus("tracking");

    // Determine exercise: forced or auto-classified
    const detected: DetectedExercise = forcedExercise === "auto"
      ? classifyExercise(flat, exerciseRef.current ?? "squat")
      : forcedExercise;

    setExercise(detected);

    const world = extractWorldLandmarks(event);
    const forCounting = world.length >= 33 ? world : flat;

    let currentReps = repsRef.current[detected];
    let angleVal: number | null = null;

    if (detected === "pushup") {
      const res = updatePushup(flat, stateRef.current.pushup, currentReps);
      setStateMap(prev => ({ ...prev, pushup: res.state }));
      setRepsMap(prev => ({ ...prev, pushup: res.repetitions }));
      angleVal = res.primaryAngle ?? null;
    } else if (detected === "squat") {
      const res = updateSquat(forCounting, stateRef.current.squat, currentReps);
      setStateMap(prev => ({ ...prev, squat: res.state }));
      setRepsMap(prev => ({ ...prev, squat: res.repetitions }));
      angleVal = res.kneeAngle ?? null;
    } else if (detected === "lunge") {
      const res = updateLunge(forCounting, stateRef.current.lunge, currentReps);
      setStateMap(prev => ({ ...prev, lunge: res.state }));
      setRepsMap(prev => ({ ...prev, lunge: res.repetitions }));
      angleVal = res.primaryAngle ?? null;
    }

    if (angleVal !== null) {
      setPrimaryAngle(angleVal);
    }
  }, [forcedExercise]);

  const reset = useCallback(() => {
    setRepsMap({ pushup: 0, squat: 0, lunge: 0 });
    setStateMap({ pushup: "up", squat: "standing", lunge: "standing" });
    setPrimaryAngle(null);
  }, []);

  const currentReps = repsMap[exercise];
  const currentState = status === "searching" ? "Searching..." : stateMap[exercise];

  return {
    exercise,
    reps: currentReps,
    state: currentState,
    elbowAngle: primaryAngle,
    status,
    landmarks,
    onLandmark,
    reset,
    repsMap
  };
}
