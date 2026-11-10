import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ACCENT = "#C6FF00"; // just a temporary color replacement

// Additional feature added, if not needed can be removed
const recentDiagnostics = [
  { exercise: "Squats", date: "Today, 08:30 AM", score: 94},
  { exercise: "Push-Ups", date: "Yesterday", score: 88},
  { exercise: "Crunches", date: "3 days ago", score: 79},
];

export default function DashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require("./src/screens/images/Profile.jpg")} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Welcome Back,</Text>
              <Text style={styles.name}>Alex Rivera</Text>
            </View>
          </View>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="options-outline" size={20} color="#fff" />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.titleRow}>
            <Text style={styles.pageTitle}>Activity{"\n"}Summary</Text>
            <View style={styles.todayPill}>
              <Text style={styles.todayPillText}>Today</Text>
            </View>
          </View>

          {/* TOP SECTION: Hero Image & Ring */}
          <View style={styles.heroRow}>
            {/* Left Hero Card (Gym Photo + Graph) */}
            <View style={styles.heroImageCard}>
              <Image 
                source={require("./src/screens/images/Hero.jpg")} 
                style={styles.heroImage} 
              />
              {/* Overlay Graph */}
              <View style={styles.miniGraphContainer}>
                <View style={styles.graphLine} />
                <Text style={styles.graphText}>124 <Text style={styles.graphSub}>Reps</Text></Text>
                <Text style={styles.graphLabel}>Avg Score: 92%</Text>
              </View>
            </View>

            {/* Right Progress Ring */}
            <View style={styles.heroRightCol}>
              <View style={styles.ringCard}>
                <View style={styles.ringOuter}>
                  <View style={styles.ringInner}>
                    <Ionicons name="barbell" size={24} color={ACCENT} />
                    <Text style={styles.ringPercent}>75%</Text>
                  </View>
                </View>
                <Text style={styles.ringLabel}>Daily Goal</Text>
              </View>

              {/* Weight Stat Box */}
              <View style={styles.statBox}>
                <View style={styles.statHeader}>
                  <Text style={styles.statTitle}>Weight</Text>
                  <Ionicons name="fitness-outline" size={16} color="#64748B" />
                </View>
                <Text style={styles.statValue}>168.5 <Text style={styles.statUnit}>lbs</Text></Text>
                <Text style={styles.statSub}><Text style={{color: "#10B981"}}>v 2.4 lbs</Text> this month</Text>
              </View>
            </View>
          </View>

          {/* BOTTOM STATS ROW */}
          <View style={styles.statsRow}>
            <View style={styles.statBoxSmall}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Total Reps</Text>
                <Ionicons name="checkmark-circle-outline" size={16} color="#64748B" />
              </View>
              <Text style={styles.statValue}>2,450</Text>
              <Text style={styles.statSub}>This week</Text>
            </View>
            
            <View style={styles.statBoxSmall}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Form Score</Text>
                <Ionicons name="scan-outline" size={16} color="#64748B" />
              </View>
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statSub}>Avg. today</Text>
            </View>
          </View>

          {/* Weekly Activity Chart Mockup */}
          <View style={styles.weeklyCard}>
             <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Weekly Activity</Text>
                <Text style={styles.statSub}>Last 7 Days</Text>
              </View>
              <View style={styles.chartRow}>
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
                  const isActive = i === 4;
                  return (
                    <View key={i} style={styles.chartCol}>
                      <View style={[styles.chartBar, { height: isActive ? 60 : 30, backgroundColor: isActive ? "#F59E0B" : "#1E293B" }]} />
                      <Text style={[styles.chartText, isActive && {color: "#fff"}]}>{day}</Text>
                    </View>
                  )
                })}
              </View>
          </View>

          {/* Recent Diagnostics - additional feature added */}
          <Text style={styles.sectionTitle}>Recent Diagnostics</Text>
          {recentDiagnostics.map((item, index) => (
            <View key={index} style={styles.diagnosticsCard}>
              <View style={styles.diagnosticsInfo}>
                <Text style={styles.diagnosticsTitle}>{item.exercise}</Text>
                <Text style={styles.diagnosticsDate}>{item.date}</Text>
              </View>
              <Text style={[styles.diagnosticScore, { color: item.score >= 90 ? "#22C55E" : "#F59E0B" }]}>
                {item.score}% Form
              </Text>
            </View>
          ))}
                   
          {/* CTA Button */}
          <Pressable 
            style={styles.ctaBtn}
            onPress={() => navigation.navigate("Workout", { exercise: { name: "Push-ups", color: ACCENT } })}
          >
            <Text style={styles.ctaText}>Start Workout</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>

      {/* CUSTOM BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
        </Pressable>
        <Pressable style={styles.navItem}>
          <Ionicons name="stats-chart" size={24} color="#64748B" />
        </Pressable>
        <Pressable style={styles.navItemCenter}>
          <Ionicons name="add" size={28} color="#0F172A" />
        </Pressable>
        <Pressable style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#64748B" />
        </Pressable>
        <Pressable style={styles.navItem}>
          <Ionicons name="person" size={24} color="#64748B" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090B" },
  safe: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 100 },

  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginTop: 10 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  greeting: { fontSize: 13, color: "#94A3B8", fontWeight: "500" },
  name: { fontSize: 16, fontWeight: "700", color: "#fff", marginTop: 2 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#18181B", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#27272A" },

  // Title
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 24, marginBottom: 24 },
  pageTitle: { fontSize: 36, fontWeight: "800", color: "#fff", lineHeight: 40, letterSpacing: -1 },
  todayPill: { backgroundColor: "#18181B", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: "#27272A" },
  todayPillText: { color: "#fff", fontSize: 13, fontWeight: "600" },

  // Hero Row
  heroRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  
  // Left Image Card
  heroImageCard: { flex: 1.2, height: 220, borderRadius: 32, overflow: "hidden", justifyContent: "flex-end" },
  heroImage: { ...StyleSheet.absoluteFillObject, opacity: 0.8 },
  miniGraphContainer: { backgroundColor: "rgba(24, 24, 27, 0.85)", padding: 16, margin: 12, borderRadius: 20, borderWidth: 1, borderColor: "#27272A" },
  graphLine: { height: 2, backgroundColor: ACCENT, width: "100%", marginBottom: 12, transform: [{ rotate: "-5deg" }] },
  graphText: { color: "#fff", fontSize: 20, fontWeight: "800" },
  graphSub: { fontSize: 12, color: "#94A3B8", fontWeight: "500" },
  graphLabel: { color: "#94A3B8", fontSize: 11, marginTop: 4 },

  // Right Column
  heroRightCol: { flex: 1, gap: 16 },
  ringCard: { flex: 1, backgroundColor: "#18181B", borderRadius: 32, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#27272A" },
  ringOuter: { width: 100, height: 100, borderRadius: 50, borderWidth: 8, borderColor: ACCENT, alignItems: "center", justifyContent: "center", shadowColor: ACCENT, shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 0 } },
  ringInner: { alignItems: "center" },
  ringPercent: { color: "#fff", fontSize: 18, fontWeight: "800", marginTop: 4 },
  ringLabel: { color: "#94A3B8", fontSize: 12, fontWeight: "600", marginTop: 12 },

  // Small Stat Box
  statBox: { backgroundColor: "#18181B", borderRadius: 24, padding: 16, borderWidth: 1, borderColor: "#27272A", justifyContent: "center" },
  statHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  statTitle: { color: "#94A3B8", fontSize: 12, fontWeight: "600" },
  statValue: { color: "#fff", fontSize: 22, fontWeight: "800" },
  statUnit: { fontSize: 14, color: "#64748B" },
  statSub: { color: "#64748B", fontSize: 11, fontWeight: "500", marginTop: 4 },

  // Bottom Stats Row
  statsRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  statBoxSmall: { flex: 1, backgroundColor: "#18181B", borderRadius: 24, padding: 16, borderWidth: 1, borderColor: "#27272A" },

  // Weekly Chart
  weeklyCard: { backgroundColor: "#18181B", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "#27272A", marginBottom: 24 },
  chartRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 80, marginTop: 16 },
  chartCol: { alignItems: "center", gap: 8 },
  chartBar: { width: 8, borderRadius: 4 },
  chartText: { color: "#64748B", fontSize: 12, fontWeight: "600" },

  // Recent Diagnostics
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", marginBottom: 14 },
  diagnosticsCard: { backgroundColor: "#18181B", padding: 16, borderRadius: 16, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  diagnosticsInfo: { flex: 1},
  diagnosticsTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  diagnosticsDate: { color: "#94A3B8", fontSize: 12, marginTop: 5 },
  diagnosticScore: { fontSize: 12, fontWeight: "700" },

  // CTA Button
  ctaBtn: { backgroundColor: ACCENT, paddingVertical: 20, borderRadius: 24, alignItems: "center", shadowColor: ACCENT, shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 8 } },
  ctaText: { color: "#09090B", fontSize: 18, fontWeight: "800", letterSpacing: 0.5 },

  // Bottom Nav
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 90, backgroundColor: "#09090B", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: 20, borderTopWidth: 1, borderTopColor: "#18181B" },
  navItem: { padding: 10 },
  navItemCenter: { width: 56, height: 56, borderRadius: 28, backgroundColor: ACCENT, alignItems: "center", justifyContent: "center", marginTop: -20, shadowColor: ACCENT, shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
});