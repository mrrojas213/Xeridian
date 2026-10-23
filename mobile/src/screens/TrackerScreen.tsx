import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  UIManager,
  Platform
} from "react-native";
import {
  RNMediapipe,
  switchCamera
} from "@thinksys/react-native-mediapipe";
import { useCallback, useRef, useState } from "react";
import { extractLandmarks } from "../utils/pose";
import { Landmark, TrackingStatus } from "../types/pose";
import { PushupState, updatePushup } from "../exercises/pushup";

const { width, height } = Dimensions.get("window");

const isAndroid = Platform.OS === "android";
const ComponentName = isAndroid ? "TsMediapipeViewManager" : "TsMediapipeView";
const isLinked = UIManager.getViewManagerConfig(ComponentName) != null;

export default function TrackerScreen({ onBack }: { onBack?: () => void }) {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [status, setStatus] = useState<TrackingStatus>("searching");
  const [repetitions, setRepetitions] = useState(0);
  const [pushupState, setPushupState] =
    useState<PushupState>("up");
  const [elbowAngle, setElbowAngle] = useState<number | null>(null);

  const pushupStateRef = useRef<PushupState>("up");
  const repetitionsRef = useRef(0);

  const handleLandmark = useCallback((data: unknown) => {
    const nextLandmarks = extractLandmarks(data);

    if (nextLandmarks.length === 0) {
      setStatus("searching");
      return;
    }

    setLandmarks(nextLandmarks);
    setStatus("tracking");

    const result = updatePushup(
      nextLandmarks,
      pushupStateRef.current,
      repetitionsRef.current
    );

    pushupStateRef.current = result.state;
    repetitionsRef.current = result.repetitions;

    setPushupState(result.state);
    setRepetitions(result.repetitions);

    if (typeof result.primaryAngle === "number") {
      setElbowAngle(result.primaryAngle);
    }
  }, []);

  const handleSwitchCamera = () => {
    try {
      if (typeof switchCamera === "function") {
        switchCamera();
      } else {
        Alert.alert("Camera", "Switch camera is not available in this environment.");
      }
    } catch (error) {
      console.warn("Failed to switch camera", error);
      Alert.alert("Camera", "Unable to switch camera.");
    }
  };

  if (!isLinked) {
    return (
      <View style={[styles.container, styles.fallbackContainer]}>
        <Text style={styles.fallbackTitle}>Native Module Not Linked</Text>
        <Text style={styles.fallbackText}>
          @thinksys/react-native-mediapipe requires a native development build and cannot run in Expo Go.
        </Text>
        <Text style={styles.fallbackInstruction}>
          Please build a development client:{"\n"}
          • npx expo run:android{"\n"}
          • npx expo run:ios
        </Text>
        {onBack && (
          <TouchableOpacity style={styles.fallbackBtn} onPress={onBack}>
            <Text style={styles.fallbackBtnText}>Go Back</Text>
          </TouchableOpacity>
        )}
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNMediapipe
        width={width}
        height={height}
        onLandmark={handleLandmark}
        face={true}
        leftArm={true}
        rightArm={true}
        leftWrist={true}
        rightWrist={true}
        torso={true}
        leftLeg={true}
        rightLeg={true}
        leftAnkle={true}
        rightAnkle={true}
        frameLimit={25}
      />

      <View pointerEvents="none" style={styles.topPanel}>
        <Text style={styles.title}>Motion Fitness Tracker</Text>
        <Text style={styles.status}>
          {status === "tracking"
            ? `Tracking ${landmarks.length} body points`
            : "Looking for a person..."}
        </Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>PUSH-UPS</Text>
            <Text style={styles.statValue}>{repetitions}</Text>
          </View>

          <View>
            <Text style={styles.statLabel}>ELBOW ANGLE</Text>
            <Text style={styles.statValue}>
              {elbowAngle === null
                ? "--"
                : `${Math.round(elbowAngle)}°`}
            </Text>
          </View>
        </View>
      </View>

      <View pointerEvents="none" style={styles.stateBadge}>
        <Text style={styles.stateText}>
          {pushupState.toUpperCase()}
        </Text>
      </View>

      <View style={styles.bottomPanel}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSwitchCamera}
          style={styles.flipButton}
        >
          <Text style={styles.flipText}>Flip Camera</Text>
        </TouchableOpacity>
        {onBack && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBack}
            style={[styles.flipButton, { marginTop: 10, backgroundColor: "#333" }]}
          >
            <Text style={[styles.flipText, { color: "#fff" }]}>Log Out / Back</Text>
          </TouchableOpacity>
        )}
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  fallbackContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  fallbackTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  fallbackText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  fallbackInstruction: {
    color: "#8effff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  fallbackBtn: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  fallbackBtnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  topPanel: {
    position: "absolute",
    top: 48,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.68)"
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700"
  },
  status: {
    color: "#ddd",
    marginTop: 6,
    fontSize: 14
  },
  statsRow: {
    flexDirection: "row",
    gap: 36,
    marginTop: 14
  },
  statLabel: {
    color: "#aaa",
    fontSize: 11,
    fontWeight: "700"
  },
  statValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 2
  },
  stateBadge: {
    position: "absolute",
    top: 235,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.68)"
  },
  stateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700"
  },
  bottomPanel: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 35,
    alignItems: "center"
  },
  flipButton: {
    minWidth: 160,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  flipText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700"
  }
});
