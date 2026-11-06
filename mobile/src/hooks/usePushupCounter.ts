import { useCallback, useRef, useState } from "react";
import { extractLandmarks, extractWorldLandmarks } from "../utils/pose";
import { Landmark, TrackingStatus } from "../types/pose";
import { PushupState, updatePushup } from "../exercises/pushup";

// Everything a screen needs to show push-ups. Screens only read these values;
// the counting rules live in src/exercises/pushup.ts.
export function usePushupCounter() {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [status, setStatus] = useState<TrackingStatus>("searching");
  const [reps, setReps] = useState(0);
  const [state, setState] = useState<PushupState>("up");
  const [elbowAngle, setElbowAngle] = useState<number | null>(null);

  const stateRef = useRef<PushupState>("up");
  const repsRef = useRef(0);

  // Pass this to the camera component's onLandmark prop.
  const onLandmark = useCallback((data: unknown) => {
    const flat = extractLandmarks(data);

    if (flat.length === 0) {
      setStatus("searching");
      return;
    }

    setLandmarks(flat);
    setStatus("tracking");

    // Count with the 3D positions when the camera sends them (the elbow angle is not
    // distorted by how the phone is angled). Otherwise fall back to the flat positions.
    const world = extractWorldLandmarks(data);
    const forCounting = world.length >= 33 ? world : flat;

    const result = updatePushup(forCounting, stateRef.current, repsRef.current);

    stateRef.current = result.state;
    repsRef.current = result.repetitions;

    setState(result.state);
    setReps(result.repetitions);

    if (typeof result.primaryAngle === "number") {
      setElbowAngle(result.primaryAngle);
    }
  }, []);

  const reset = useCallback(() => {
    stateRef.current = "up";
    repsRef.current = 0;
    setState("up");
    setReps(0);
    setElbowAngle(null);
  }, []);

  return { reps, state, elbowAngle, status, landmarks, onLandmark, reset };
}
