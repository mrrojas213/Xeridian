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
import { useState } from "react";
import { useExerciseTracker } from "../hooks/useExerciseTracker";
import { DetectedExercise } from "../exercises/classifier";

const { width, height } = Dimensions.get("window");

const fmt = (a: number | null) => (a === null ? "--" : `${Math.round(a)}°`);

let RNMediapipe: any = null;
let switchCamera: (() => void) | null = null;
try {
  const mediapipe = require("@thinksys/react-native-mediapipe");
  RNMediapipe = mediapipe.RNMediapipe;
  switchCamera = mediapipe.switchCamera;
} catch {
  // Native module missing (Expo Go)
}

const isAndroid = Platform.OS === "android";
const ComponentName = isAndroid ? "TsMediapipeViewManager" : "TsMediapipeView";
const isLinked = RNMediapipe != null && UIManager.getViewManagerConfig(ComponentName) != null;

export default function TrackerScreen({ onBack }: { onBack?: () => void }) {
  const [selectedMode, setSelectedMode] = useState<DetectedExercise | "auto">("auto");

  const {
    exercise,
    reps,
    state,
    elbowAngle,
    status,
    landmarks,
    onLandmark,
    repsMap
  } = useExerciseTracker(selectedMode);

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
        onLandmark={onLandmark}
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

      {/* Exercise Mode Selector */}
      <View style={styles.modeRow}>
        {(["auto", "pushup", "squat", "lunge"] as const).map(mode => (
          <TouchableOpacity
            key={mode}
            style={[styles.modeBtn, selectedMode === mode && styles.modeBtnActive]}
            onPress={() => setSelectedMode(mode)}
          >
            <Text style={[styles.modeText, selectedMode === mode && styles.modeTextActive]}>
              {mode.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View pointerEvents="none" style={styles.topPanel}>
        <Text style={styles.title}>Motion Fitness Tracker</Text>
        <Text style={styles.status}>
          {status === "tracking"
            ? `Tracking ${landmarks.length} body points | Mode: ${selectedMode.toUpperCase()}`
            : "Looking for a person..."}
        </Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={[styles.statLabel, exercise === "pushup" && styles.activeLabel]}>PUSH-UPS</Text>
            <Text style={styles.statValue}>{repsMap.pushup}</Text>
          </View>

          <View>
            <Text style={[styles.statLabel, exercise === "squat" && styles.activeLabel]}>SQUATS</Text>
            <Text style={styles.statValue}>{repsMap.squat}</Text>
          </View>

          <View>
            <Text style={[styles.statLabel, exercise === "lunge" && styles.activeLabel]}>LUNGES</Text>
            <Text style={styles.statValue}>{repsMap.lunge}</Text>
          </View>
        </View>
      </View>

      <View pointerEvents="none" style={styles.debugPanel}>
        <Text style={styles.debugText}>
          TRACKING: {exercise.toUpperCase()}
        </Text>
        <Text style={styles.debugText}>
          Angle: {fmt(elbowAngle)}
        </Text>
      </View>

      <View pointerEvents="none" style={styles.stateBadge}>
        <Text style={styles.stateText}>
          {state.toUpperCase()}
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
  modeRow: {
    position: "absolute",
    top: 45,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
    gap: 8
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center"
  },
  modeBtnActive: {
    backgroundColor: "#a6ffff"
  },
  modeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700"
  },
  modeTextActive: {
    color: "#000"
  },
  topPanel: {
    position: "absolute",
    top: 95,
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
    gap: 24,
    marginTop: 14
  },
  statLabel: {
    color: "#aaa",
    fontSize: 11,
    fontWeight: "700"
  },
  activeLabel: {
    color: "#8effff",
    fontWeight: "800"
  },
  statValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2
  },
  debugPanel: {
    position: "absolute",
    top: 260,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    alignItems: "center"
  },
  debugText: {
    color: "#8effff",
    fontSize: 12,
    fontWeight: "600"
  },
  stateBadge: {
    position: "absolute",
    top: 310,
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
