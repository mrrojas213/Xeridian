import { useCallback, useRef, useState } from "react";
import { extractLandmarks, extractWorldLandmarks, parseLandmarkEvent } from "../utils/pose";
import { Landmark, TrackingStatus } from "../types/pose";
import { PushupState, elbowAngleOf, updatePushup } from "../exercises/pushup";

// Everything a screen needs to show push-ups. Screens only read these values;
// the counting rules live in src/exercises/pushup.ts.
export function usePushupCounter() {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [status, setStatus] = useState<TrackingStatus>("searching");
  const [reps, setReps] = useState(0);
  const [state, setState] = useState<PushupState>("up");
  const [elbowAngle, setElbowAngle] = useState<number | null>(null);
  // For the on-screen debug line: the same elbow angle measured both ways, and the lowest
  // value reached since the last time the arms were straight.
  const [flatAngle, setFlatAngle] = useState<number | null>(null);
  const [worldAngle, setWorldAngle] = useState<number | null>(null);
  const [lowAngle, setLowAngle] = useState<number | null>(null);
  const lowRef = useRef<number | null>(null);
  // What the camera library last sent: how many events, in what form, how many points.
  const [eventInfo, setEventInfo] = useState("no events yet");
  const eventCount = useRef(0);

  const stateRef = useRef<PushupState>("up");
  const repsRef = useRef(0);

  // Pass this to the camera component's onLandmark prop.
  const onLandmark = useCallback((rawData: unknown) => {
    const data = parseLandmarkEvent(rawData);
    const flat = extractLandmarks(data);

    eventCount.current += 1;
    setEventInfo(
      `events ${eventCount.current} | sent ${typeof rawData} | points ${flat.length} | 3D points ${extractWorldLandmarks(data).length}`
    );

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
      if (result.state === "up" || lowRef.current === null) {
        lowRef.current = result.primaryAngle;
      } else {
        lowRef.current = Math.min(lowRef.current, result.primaryAngle);
      }
      setLowAngle(lowRef.current);
    }
    setFlatAngle(elbowAngleOf(flat));
    setWorldAngle(world.length >= 33 ? elbowAngleOf(world) : null);
  }, []);

  const reset = useCallback(() => {
    stateRef.current = "up";
    repsRef.current = 0;
    setState("up");
    setReps(0);
    setElbowAngle(null);
    setLowAngle(null);
    lowRef.current = null;
  }, []);

  return {
    reps, state, elbowAngle, status, landmarks, onLandmark, reset,
    flatAngle, worldAngle, lowAngle, eventInfo
  };
}
