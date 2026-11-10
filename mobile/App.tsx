import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Modal, Dimensions, Switch, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

import WorkoutScreen from "./src/screens/WorkoutScreen";

const { width } = Dimensions.get("window");

const EXACT_IMAGES = {
  pushup: require("./src/screens/images/Push-ups.jpg"),
  lunge: require("./src/screens/images/Lunges.jpg"),
  crunch: require("./src/screens/images/Crunches.jpg"),
  squat: require("./src/screens/images/Squats.jpg"),
};

function HomeScreen({ navigation }: any) {
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const exercises = [
    { id: "1", name: "Push-ups", target: "Chest & Triceps", image: EXACT_IMAGES.pushup, steps: ["Place hands slightly wider than shoulders.", "Keep body straight from head to heels.", "Lower chest until arms are at 90 degrees.", "Push back up powerfully."], tips: ["Don't let your hips sag.", "Keep your core tight.", "Breathe out as you push up."] },
    { id: "2", name: "Lunges", target: "Legs & Glutes", image: EXACT_IMAGES.lunge, steps: ["Stand tall with feet hip-width apart.", "Take a big step forward.", "Lower your body until both knees are at 90 degrees.", "Push back up to the starting position."], tips: ["Keep your torso straight.", "Don't let your front knee pass your toes.", "Engage your core for balance."] },
    { id: "3", name: "Crunches", target: "Core & Abs", image: EXACT_IMAGES.crunch, steps: ["Lie on your back, knees bent.", "Place hands behind your head.", "Curl shoulders off the floor.", "Squeeze abs at the top, lower slowly."], tips: ["Keep lower back on floor.", "Exhale as you crunch up.", "Don't use momentum."] },
    { id: "4", name: "Squats", target: "Legs & Glutes", image: EXACT_IMAGES.squat, steps: ["Stand with feet shoulder-width apart.", "Lower hips back and down.", "Keep chest up and back straight.", "Push through heels to stand."], tips: ["Don't let knees cave inward.", "Go as deep as you can.", "Keep weight on your heels."] },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground source={require("./src/screens/images/Home.jpg")} style={styles.heroBanner}>
          <LinearGradient colors={["rgba(9, 9, 11, 0.3)", "rgba(9, 9, 11, 1)"]} style={StyleSheet.absoluteFill} />
          <SafeAreaView style={styles.heroContent} edges={["top"]}>
            <View style={styles.heroTopRow}>
              <View style={styles.logoPill}><Text style={styles.logoText}>XERIDIAN</Text></View>
              <Image source={require("./src/screens/images/Profile.jpg")} style={styles.heroAvatar} />
            </View>
            <Text style={styles.heroTitle}>Your AI{"\n"}Fitness Coach.</Text>
            <Text style={styles.heroSubTitle}>Camera tracking to perfect your form and maximize your results.</Text>
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Why Xeridian?</Text>
          <View style={styles.benefitRow}>
            <View style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: "rgba(59, 130, 246, 0.15)" }]}><Ionicons name="scan" size={24} color="#3B82F6" /></View>
              <Text style={styles.benefitTitle}>AI Form Check</Text>
              <Text style={styles.benefitText}>Real-time camera tracking ensures perfect reps.</Text>
            </View>
            <View style={styles.benefitCard}>
              <View style={[styles.benefitIcon, { backgroundColor: "rgba(139, 92, 246, 0.15)" }]}><Ionicons name="trending-up" size={24} color="#8B5CF6" /></View>
              <Text style={styles.benefitTitle}>Track Progress</Text>
              <Text style={styles.benefitText}>Log weight and see your body transform.</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}><Text style={styles.sectionHeader}>Choose a Workout</Text></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: "visible" }} contentContainerStyle={{ gap: 16, paddingRight: 24 }}>
            {exercises.map((ex) => (
              <Pressable key={ex.id} style={styles.exerciseCard} onPress={() => setSelectedExercise(ex)}>
                <Image source={ex.image} style={styles.exerciseImage} />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  <Text style={styles.exerciseTarget}>{ex.target}</Text>
                </View>
                <View style={styles.startIconBtn}><Ionicons name="information" size={16} color="#09090B" /></View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal visible={!!selectedExercise} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentManual}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedExercise?.name} Guide</Text>
              <Pressable onPress={() => setSelectedExercise(null)} style={styles.closeBtn}><Ionicons name="close" size={24} color="#fff" /></Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <Image source={selectedExercise?.image} style={styles.manualImage} />
              <Text style={styles.manualSectionTitle}>How to do it</Text>
              {selectedExercise?.steps.map((step: string, index: number) => (
                <View key={index} style={styles.manualStepRow}>
                  <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
                  <Text style={styles.manualStepText}>{step}</Text>
                </View>
              ))}
              <Text style={[styles.manualSectionTitle, { marginTop: 24 }]}>Pro Tips</Text>
              {selectedExercise?.tips.map((tip: string, index: number) => (
                <View key={index} style={styles.manualTipRow}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.manualTipText}>{tip}</Text>
                </View>
              ))}
              <Pressable style={styles.manualStartBtn} onPress={() => { setSelectedExercise(null); navigation.navigate("Workout", { exercise: selectedExercise }); }}>
                <Text style={styles.manualStartBtnText}>Start AI Tracking</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 2. ANALYTICS SCREEN
function AnalyticsScreen() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);

  const [diagnostics] = useState([
    { id: "1", name: "Push-ups", date: "Today, 8:30 AM", score: 92, status: "Good", suggestion: "Keep chest up.", color: "#10B981", image: EXACT_IMAGES.pushup },
    { id: "2", name: "Lunges", date: "Today, 8:15 AM", score: 75, status: "Needs Work", suggestion: "Keep torso straight.", color: "#EF4444", image: EXACT_IMAGES.lunge },
    { id: "3", name: "Crunches", date: "Yesterday", score: 88, status: "Good", suggestion: "Slow down the negative.", color: "#10B981", image: EXACT_IMAGES.crunch },
    { id: "4", name: "Squats", date: "Oct 24, 2026", score: 95, status: "Excellent", suggestion: "Perfect form!", color: "#10B981", image: EXACT_IMAGES.squat },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require("./src/screens/images/Profile.jpg")} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Analytics,</Text>
              <Text style={styles.name}>Alex Rivera</Text>
            </View>
          </View>
          <Pressable style={styles.iconBtn}><Ionicons name="options-outline" size={20} color="#fff" /></Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Progress Photos</Text>
            <Text style={styles.sectionSub}>See your transformation</Text>
          </View>
          <View style={styles.photoRow}>
            <View style={styles.photoCard}>
              <Image source={require("./src/screens/images/Analytics before.jpg")} style={styles.photoImage} />
              <View style={styles.photoBadge}><Text style={styles.photoBadgeText}>Before</Text></View>
            </View>
            <View style={styles.photoCard}>
              <Image source={require("./src/screens/images/Hero.jpg")} style={styles.photoImage} />
              <View style={[styles.photoBadge, { backgroundColor: "#10B981" }]}><Text style={styles.photoBadgeText}>Current</Text></View>
            </View>
            <Pressable style={styles.addPhotoCard}>
              <Ionicons name="camera" size={24} color="#64748B" />
              <Text style={styles.addPhotoText}>Add Pic</Text>
            </Pressable>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>Activity{"\n"}Summary</Text>
            <View style={styles.todayPill}><Text style={styles.todayPillText}>Today</Text></View>
          </View>

          <View style={styles.heroRow}>
            <View style={styles.heroImageCard}>
              <Image source={require("./src/screens/images/Hero.jpg")} style={styles.heroImage} />
              <View style={styles.miniGraphContainer}>
                <View style={styles.graphLine} />
                <Text style={styles.graphText}>124 <Text style={styles.graphSub}>Reps</Text></Text>
                <Text style={styles.graphLabel}>Avg Score: 92%</Text>
              </View>
            </View>

            <View style={styles.heroRightCol}>
              <View style={styles.circlesCard}>
                <View style={styles.circleRow}>
                  <View style={styles.circleWrapper}>
                    <View style={[styles.circle, { borderColor: "#3B82F6" }]}><Text style={styles.circleNum}>124</Text></View>
                    <Text style={styles.circleLabel}>Total</Text>
                  </View>
                  <View style={styles.circleWrapper}>
                    <View style={[styles.circle, { borderColor: "#10B981" }]}><Text style={styles.circleNum}>110</Text></View>
                    <Text style={styles.circleLabel}>Good</Text>
                  </View>
                  <View style={styles.circleWrapper}>
                    <View style={[styles.circle, { borderColor: "#EF4444" }]}><Text style={styles.circleNum}>14</Text></View>
                    <Text style={styles.circleLabel}>Fix</Text>
                  </View>
                </View>
              </View>

              <Pressable style={styles.statBox} onPress={() => setShowWeightModal(true)}>
                <View style={styles.statHeader}><Text style={styles.statTitle}>Weight</Text><Ionicons name="chevron-forward" size={16} color="#64748B" /></View>
                <Text style={styles.statValue}>168.5 <Text style={styles.statUnit}>lbs</Text></Text>
                <Text style={styles.statSub}><Text style={{color: "#10B981"}}>v 2.4 lbs</Text> this month</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.statsRow}>
            <Pressable style={styles.statBoxSmall} onPress={() => setShowFormModal(true)}>
              <View style={styles.statHeader}><Text style={styles.statTitle}>Total Reps</Text><Ionicons name="chevron-forward" size={16} color="#64748B" /></View>
              <Text style={styles.statValue}>2,450</Text>
              <Text style={styles.statSub}>Tap for form details</Text>
            </Pressable>
            <Pressable style={styles.statBoxSmall} onPress={() => setShowFormModal(true)}>
              <View style={styles.statHeader}><Text style={styles.statTitle}>Form Score</Text><Ionicons name="chevron-forward" size={16} color="#64748B" /></View>
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statSub}>Avg. today</Text>
            </Pressable>
          </View>

          <Pressable style={styles.weeklyCard} onPress={() => setShowInsightsModal(true)}>
             <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Weekly Activity</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}><Text style={styles.statSub}>View Insights</Text><Ionicons name="chevron-forward" size={14} color="#64748B" /></View>
              </View>
              <View style={styles.chartRow}>
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <View key={i} style={styles.chartCol}>
                      <View style={[styles.chartBar, { height: i === 4 ? 60 : 30, backgroundColor: i === 4 ? "#F59E0B" : "#1E293B" }]} />
                      <Text style={[styles.chartText, i === 4 && {color: "#fff"}]}>{day}</Text>
                    </View>
                ))}
              </View>
          </Pressable>

          <View style={styles.diagnosticsHeader}>
            <Text style={styles.sectionTitle}>Recent Diagnostics</Text>
            <Pressable style={styles.dateSelector}>
              <Text style={styles.dateText}>Today</Text>
              <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
            </Pressable>
          </View>

          <View style={styles.diagnosticsList}>
            {diagnostics.map((item) => (
              <View key={item.id} style={styles.diagnosticCard}>
                <View style={styles.diagLeft}>
                  <Image source={item.image} style={styles.diagImage} />
                  <View style={styles.diagTextContainer}>
                    <Text style={styles.diagName}>{item.name}</Text>
                    <Text style={styles.diagDate}>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.diagMiddle}>
                  <Text style={[styles.diagScore, { color: item.color }]}>{item.score}%</Text>
                  <Text style={[styles.diagStatus, { color: item.color }]}>{item.status}</Text>
                </View>
                <View style={styles.diagRight}><Text style={styles.diagSuggestion}>{item.suggestion}</Text></View>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>

      <Modal visible={showWeightModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}><Text style={styles.modalTitle}>Body & Performance</Text><Pressable onPress={() => setShowWeightModal(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color="#fff" /></Pressable></View>
            <Text style={styles.modalSubTitle}>Weight Trend vs. Reps</Text>
            <View style={styles.lineChartContainer}>
              <View style={styles.lineChartGrid}><View style={styles.lineChartLine} /><View style={styles.lineChartLine} /><View style={styles.lineChartLine} /></View>
              <View style={styles.dataPointContainer}>
                <View style={[styles.dataPoint, { bottom: "40%", left: "10%" }]} /><View style={[styles.dataPoint, { bottom: "30%", left: "35%" }]} /><View style={[styles.dataPoint, { bottom: "50%", left: "60%" }]} /><View style={[styles.dataPoint, { bottom: "60%", left: "85%" }]} />
              </View>
              <View style={styles.mockLine} />
              <View style={styles.chartLabels}><Text style={styles.chartLabelText}>Week 1</Text><Text style={styles.chartLabelText}>Week 2</Text><Text style={styles.chartLabelText}>Week 3</Text><Text style={styles.chartLabelText}>Week 4</Text></View>
            </View>
            <View style={styles.correlationRow}>
              <View style={styles.correlationBox}><Text style={styles.corrTitle}>Weight Lost</Text><Text style={styles.corrValue}>-2.4 lbs</Text></View>
              <View style={styles.correlationBox}><Text style={styles.corrTitle}>Reps Increase</Text><Text style={[styles.corrValue, { color: "#10B981" }]}>+18%</Text></View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showFormModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}><Text style={styles.modalTitle}>Form Breakdown</Text><Pressable onPress={() => setShowFormModal(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color="#fff" /></Pressable></View>
            <View style={styles.breakdownRow}><View style={[styles.breakdownIcon, { backgroundColor: "rgba(16, 185, 129, 0.2)" }]}><Ionicons name="checkmark-circle" size={24} color="#10B981" /></View><View style={{ flex: 1 }}><Text style={styles.breakdownLabel}>Correct Form</Text><Text style={styles.breakdownValue}>110 <Text style={{fontSize: 14, color: "#10B981"}}>(88%)</Text></Text></View></View>
            <View style={styles.breakdownRow}><View style={[styles.breakdownIcon, { backgroundColor: "rgba(239, 68, 68, 0.2)" }]}><Ionicons name="warning" size={24} color="#EF4444" /></View><View style={{ flex: 1 }}><Text style={styles.breakdownLabel}>Incorrect Form</Text><Text style={styles.breakdownValue}>14 <Text style={{fontSize: 14, color: "#EF4444"}}>(12%)</Text></Text></View></View>
          </View>
        </View>
      </Modal>

      <Modal visible={showInsightsModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}><Text style={styles.modalTitle}>Improvement Insights</Text><Pressable onPress={() => setShowInsightsModal(false)} style={styles.closeBtn}><Ionicons name="close" size={24} color="#fff" /></Pressable></View>
            <View style={styles.insightList}>
              <View style={styles.insightItem}><Text style={styles.insightLabel}>Yesterday</Text><View style={styles.insightBarBg}><View style={[styles.insightBarFill, { width: "60%", backgroundColor: "#3B82F6" }]} /></View><Text style={styles.insightValue}>92%</Text></View>
              <View style={styles.insightItem}><Text style={styles.insightLabel}>Last Week</Text><View style={styles.insightBarBg}><View style={[styles.insightBarFill, { width: "80%", backgroundColor: "#8B5CF6" }]} /></View><Text style={styles.insightValue}>88%</Text></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function CameraScreen({ navigation }: any) {
  return <WorkoutScreen navigation={navigation} route={{ params: { exercise: { name: "Push-ups" } } }} />;
}

function AIScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}><Text style={styles.pageTitle}>AI Coach</Text></View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="sparkles" size={64} color="#8B5CF6" />
        <Text style={[styles.greeting, { marginTop: 16 }]}>Deep AI Chat coming soon.</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [haptics, setHaptics] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}><Text style={styles.pageTitle}>Settings</Text></View>
      <ScrollView style={{ padding: 24 }}>
        <View style={styles.settingsProfile}>
          <Image source={require("./src/screens/images/Profile.jpg")} style={styles.settingsAvatar} />
          <Text style={styles.settingsName}>Alex Rivera</Text>
          <Text style={styles.settingsEmail}>alex@xeridian.com</Text>
        </View>
        <Text style={styles.settingsSectionTitle}>Preferences</Text>
        <View style={styles.settingsRow}>
          <View style={styles.settingsRowLeft}><Ionicons name="notifications" size={20} color="#F59E0B" /><Text style={styles.settingsLabel}>Push Notifications</Text></View>
          <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: "#F59E0B" }} />
        </View>
        <View style={styles.settingsRow}>
          <View style={styles.settingsRowLeft}><Ionicons name="moon" size={20} color="#8B5CF6" /><Text style={styles.settingsLabel}>Dark Mode</Text></View>
          <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: "#8B5CF6" }} />
        </View>
        <View style={styles.settingsRow}>
          <View style={styles.settingsRowLeft}><Ionicons name="phone-portrait" size={20} color="#10B981" /><Text style={styles.settingsLabel}>Haptic Feedback</Text></View>
          <Switch value={haptics} onValueChange={setHaptics} trackColor={{ true: "#10B981" }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#09090B", borderTopColor: "#18181B", height: 90, paddingBottom: 25, paddingTop: 10 },
        tabBarActiveTintColor: "#F59E0B", tabBarInactiveTintColor: "#64748B", tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "HomeTab") return <Ionicons name="home" size={size} color={color} />;
          if (route.name === "AnalyticsTab") return <Ionicons name="analytics" size={size} color={color} />;
          if (route.name === "AITab") return <Ionicons name="sparkles" size={size} color={color} />;
          if (route.name === "SettingsTab") return <Ionicons name="settings" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="AnalyticsTab" component={AnalyticsScreen} options={{ tabBarLabel: "Analytics" }} />
      <Tab.Screen name="CameraTab" component={CameraScreen} options={{ tabBarLabel: "", tabBarIcon: () => (<View style={styles.navItemCenter}><Ionicons name="camera" size={28} color="#0F172A" /></View>) }} />
      <Tab.Screen name="AITab" component={AIScreen} options={{ tabBarLabel: "AI Coach" }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ tabBarLabel: "Settings" }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Workout" component={WorkoutScreen} options={{ animation: "slide_from_bottom" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090B" },
  safe: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 120 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginTop: 10, marginBottom: 20 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  greeting: { fontSize: 13, color: "#94A3B8", fontWeight: "500" },
  name: { fontSize: 16, fontWeight: "700", color: "#fff", marginTop: 2 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#18181B", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#27272A" },
  pageTitle: { fontSize: 36, fontWeight: "800", color: "#fff", lineHeight: 40, letterSpacing: -1 },
  
  heroBanner: { width: "100%", height: 400, justifyContent: "flex-end" },
  heroContent: { padding: 24, paddingBottom: 32 },
  heroTopRow: { position: "absolute", top: 60, left: 24, right: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logoPill: { backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
  logoText: { color: "#fff", fontSize: 14, fontWeight: "800", letterSpacing: 2 },
  heroAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: "#fff" },
  heroTitle: { color: "#fff", fontSize: 42, fontWeight: "900", lineHeight: 46, letterSpacing: -1, marginBottom: 12 },
  heroSubTitle: { color: "#cbd5e1", fontSize: 16, lineHeight: 24, fontWeight: "500", paddingRight: 20 },
  section: { padding: 24 },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionHeader: { fontSize: 22, fontWeight: "800", color: "#fff" },
  seeAllText: { color: "#F59E0B", fontSize: 14, fontWeight: "600" },
  benefitRow: { flexDirection: "row", gap: 16, marginTop: 16 },
  benefitCard: { flex: 1, backgroundColor: "#18181B", padding: 20, borderRadius: 24, borderWidth: 1, borderColor: "#27272A" },
  benefitIcon: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  benefitTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginBottom: 8 },
  benefitText: { color: "#94A3B8", fontSize: 13, lineHeight: 18 },
  
  exerciseCard: { width: 160, backgroundColor: "#18181B", borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "#27272A" },
  exerciseImage: { width: "100%", height: 120 },
  exerciseInfo: { padding: 16 },
  exerciseName: { color: "#fff", fontSize: 18, fontWeight: "800", marginBottom: 4 },
  exerciseTarget: { color: "#94A3B8", fontSize: 12, fontWeight: "500" },
  startIconBtn: { position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: 16, backgroundColor: "#F59E0B", alignItems: "center", justifyContent: "center" },

  modalContentManual: { backgroundColor: "#18181B", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, height: "85%" },
  manualImage: { width: "100%", height: 200, borderRadius: 24, marginBottom: 24 },
  manualSectionTitle: { color: "#fff", fontSize: 18, fontWeight: "800", marginBottom: 16 },
  manualStepRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 16 },
  stepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#27272A", alignItems: "center", justifyContent: "center", marginRight: 12, marginTop: 2 },
  stepNumberText: { color: "#F59E0B", fontSize: 14, fontWeight: "800" },
  manualStepText: { color: "#E2E8F0", fontSize: 15, lineHeight: 22, flex: 1 },
  manualTipRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  manualTipText: { color: "#94A3B8", fontSize: 14, flex: 1 },
  manualStartBtn: { backgroundColor: "#F59E0B", paddingVertical: 20, borderRadius: 20, alignItems: "center", marginTop: 32, shadowColor: "#F59E0B", shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 8 } },
  manualStartBtnText: { color: "#09090B", fontSize: 18, fontWeight: "800", letterSpacing: 0.5 },

  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 24, marginBottom: 24 },
  todayPill: { backgroundColor: "#18181B", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#27272A" },
  todayPillText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  heroRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  heroImageCard: { flex: 1.2, height: 220, borderRadius: 32, overflow: "hidden", justifyContent: "flex-end" },
  heroImage: { ...StyleSheet.absoluteFillObject, opacity: 0.8 },
  miniGraphContainer: { backgroundColor: "rgba(24, 24, 27, 0.85)", padding: 16, margin: 12, borderRadius: 20, borderWidth: 1, borderColor: "#27272A" },
  graphLine: { height: 2, backgroundColor: "#F59E0B", width: "100%", marginBottom: 12, transform: [{ rotate: "-5deg" }] },
  graphText: { color: "#fff", fontSize: 20, fontWeight: "800" },
  graphSub: { fontSize: 12, color: "#94A3B8", fontWeight: "500" },
  graphLabel: { color: "#94A3B8", fontSize: 11, marginTop: 4 },
  heroRightCol: { flex: 1.2, gap: 16 },
  circlesCard: { flex: 1, backgroundColor: "#18181B", borderRadius: 32, justifyContent: "center", borderWidth: 1, borderColor: "#27272A", padding: 12 },
  circleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  circleWrapper: { alignItems: "center", gap: 6 },
  circle: { width: 60, height: 60, borderRadius: 30, borderWidth: 5, alignItems: "center", justifyContent: "center" },
  circleNum: { color: "#fff", fontSize: 16, fontWeight: "800" },
  circleLabel: { color: "#94A3B8", fontSize: 11, fontWeight: "600" },
  statBox: { backgroundColor: "#18181B", borderRadius: 24, padding: 16, borderWidth: 1, borderColor: "#27272A", justifyContent: "center" },
  statHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  statTitle: { color: "#94A3B8", fontSize: 12, fontWeight: "600" },
  statValue: { color: "#fff", fontSize: 22, fontWeight: "800" },
  statUnit: { fontSize: 14, color: "#64748B" },
  statSub: { color: "#64748B", fontSize: 11, fontWeight: "500", marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  statBoxSmall: { flex: 1, backgroundColor: "#18181B", borderRadius: 24, padding: 16, borderWidth: 1, borderColor: "#27272A" },
  weeklyCard: { backgroundColor: "#18181B", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "#27272A", marginBottom: 24 },
  chartRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 80, marginTop: 16 },
  chartCol: { alignItems: "center", gap: 8 },
  chartBar: { width: 8, borderRadius: 4 },
  chartText: { color: "#64748B", fontSize: 12, fontWeight: "600" },

  diagnosticsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#fff" },
  sectionSub: { fontSize: 12, color: "#94A3B8" },
  dateSelector: { flexDirection: "row", alignItems: "center", backgroundColor: "#18181B", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, gap: 6, borderWidth: 1, borderColor: "#27272A" },
  dateText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  diagnosticsList: { gap: 12, marginBottom: 24 },
  diagnosticCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#18181B", padding: 12, borderRadius: 20, borderWidth: 1, borderColor: "#27272A" },
  diagLeft: { flex: 1.4, flexDirection: "row", alignItems: "center" },
  diagImage: { width: 44, height: 44, borderRadius: 12, marginRight: 10 },
  diagTextContainer: { flex: 1 },
  diagName: { color: "#fff", fontSize: 14, fontWeight: "700", marginBottom: 2 },
  diagDate: { color: "#64748B", fontSize: 10, fontWeight: "500" },
  diagMiddle: { flex: 0.8, alignItems: "center", borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#27272A", paddingHorizontal: 6 },
  diagScore: { fontSize: 16, fontWeight: "800" },
  diagStatus: { fontSize: 9, fontWeight: "700", textTransform: "uppercase", marginTop: 2 },
  diagRight: { flex: 1.2, paddingLeft: 10 },
  diagSuggestion: { color: "#94A3B8", fontSize: 11, fontWeight: "500", lineHeight: 14 },

  navItemCenter: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#F59E0B", alignItems: "center", justifyContent: "center", marginTop: -30, shadowColor: "#F59E0B", shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
  settingsProfile: { alignItems: "center", marginBottom: 32 },
  settingsAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  settingsName: { color: "#fff", fontSize: 20, fontWeight: "700" },
  settingsEmail: { color: "#64748B", fontSize: 14, marginTop: 4 },
  settingsSectionTitle: { color: "#64748B", fontSize: 12, fontWeight: "700", textTransform: "uppercase", marginTop: 16, marginBottom: 12 },
  settingsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#18181B", padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: "#27272A" },
  settingsRowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingsLabel: { color: "#fff", fontSize: 16, fontWeight: "600" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#18181B", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, minHeight: 400 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 24, fontWeight: "800", color: "#fff" },
  modalSubTitle: { fontSize: 14, color: "#94A3B8", marginBottom: 24 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#27272A", alignItems: "center", justifyContent: "center" },
  lineChartContainer: { height: 150, backgroundColor: "#09090B", borderRadius: 20, padding: 16, marginBottom: 24, justifyContent: "space-between", borderWidth: 1, borderColor: "#27272A" },
  lineChartGrid: { position: "absolute", top: 16, bottom: 16, left: 16, right: 16, justifyContent: "space-between" },
  lineChartLine: { height: 1, backgroundColor: "#27272A", width: "100%" },
  dataPointContainer: { position: "absolute", top: 16, bottom: 16, left: 16, right: 16 },
  dataPoint: { position: "absolute", width: 10, height: 10, borderRadius: 5, backgroundColor: "#10B981", shadowColor: "#10B981", shadowOpacity: 0.5, shadowRadius: 5 },
  mockLine: { position: "absolute", top: "50%", left: 20, right: 20, height: 2, backgroundColor: "rgba(16, 185, 129, 0.3)", transform: [{ rotate: "-10deg" }] },
  chartLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: "auto" },
  chartLabelText: { color: "#64748B", fontSize: 10, fontWeight: "600" },
  correlationRow: { flexDirection: "row", gap: 16, marginBottom: 24 },
  correlationBox: { flex: 1, backgroundColor: "#09090B", padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#27272A" },
  corrTitle: { color: "#94A3B8", fontSize: 12, fontWeight: "600", marginBottom: 8 },
  corrValue: { color: "#fff", fontSize: 20, fontWeight: "800" },
  breakdownRow: { flexDirection: "row", alignItems: "center", marginBottom: 16, backgroundColor: "#09090B", padding: 16, borderRadius: 20, borderWidth: 1, borderColor: "#27272A" },
  breakdownIcon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", marginRight: 16 },
  breakdownLabel: { color: "#94A3B8", fontSize: 13, fontWeight: "600", marginBottom: 4 },
  breakdownValue: { color: "#fff", fontSize: 20, fontWeight: "800" },
  insightList: { gap: 16, marginBottom: 24 },
  insightItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  insightLabel: { color: "#94A3B8", fontSize: 13, fontWeight: "600", width: 90 },
  insightBarBg: { flex: 1, height: 8, backgroundColor: "#27272A", borderRadius: 4, marginHorizontal: 16, overflow: "hidden" },
  insightBarFill: { height: "100%", borderRadius: 4 },
  insightValue: { color: "#fff", fontSize: 14, fontWeight: "800", width: 40, textAlign: "right" },
});