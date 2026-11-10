import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Modal, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");

function DashboardScreen() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" }} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
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

          {/* TOP SECTION: Hero Image & 3 CIRCLES */}
          <View style={styles.heroRow}>
            <View style={styles.heroImageCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop" }} style={styles.heroImage} />
              <View style={styles.miniGraphContainer}>
                <View style={styles.graphLine} />
                <Text style={styles.graphText}>124 <Text style={styles.graphSub}>Reps</Text></Text>
                <Text style={styles.graphLabel}>Avg Score: 92%</Text>
              </View>
            </View>

            {/* Right 3 Circles */}
            <View style={styles.heroRightCol}>
              <View style={styles.circlesCard}>
                <View style={styles.circleRow}>
                  <View style={styles.circleWrapper}>
                    <View style={[styles.circle, { borderColor: "#3B82F6" }]}>
                      <Text style={styles.circleNum}>124</Text>
                    </View>
                    <Text style={styles.circleLabel}>Total</Text>
                  </View>
                  <View style={styles.circleWrapper}>
                    <View style={[styles.circle, { borderColor: "#10B981" }]}>
                      <Text style={styles.circleNum}>110</Text>
                    </View>
                    <Text style={styles.circleLabel}>Good</Text>
                  </View>
                  <View style={styles.circleWrapper}>
                    <View style={[styles.circle, { borderColor: "#EF4444" }]}>
                      <Text style={styles.circleNum}>14</Text>
                    </View>
                    <Text style={styles.circleLabel}>Fix</Text>
                  </View>
                </View>
              </View>

              {/* WEIGHT STAT BOX (Now Interactive) */}
              <Pressable style={styles.statBox} onPress={() => setShowWeightModal(true)}>
                <View style={styles.statHeader}>
                  <Text style={styles.statTitle}>Weight</Text>
                  <Ionicons name="chevron-forward" size={16} color="#64748B" />
                </View>
                <Text style={styles.statValue}>168.5 <Text style={styles.statUnit}>lbs</Text></Text>
                <Text style={styles.statSub}><Text style={{color: "#10B981"}}>↓ 2.4 lbs</Text> this month</Text>
              </Pressable>
            </View>
          </View>

          {/* BOTTOM STATS ROW */}
          <View style={styles.statsRow}>
            <Pressable style={styles.statBoxSmall} onPress={() => setShowFormModal(true)}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Total Reps</Text>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </View>
              <Text style={styles.statValue}>2,450</Text>
              <Text style={styles.statSub}>Tap for form details</Text>
            </Pressable>
            
            <Pressable style={styles.statBoxSmall} onPress={() => setShowFormModal(true)}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Form Score</Text>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </View>
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statSub}>Avg. today</Text>
            </Pressable>
          </View>

          {/* Weekly Activity Chart Mockup */}
          <Pressable style={styles.weeklyCard} onPress={() => setShowInsightsModal(true)}>
             <View style={styles.statHeader}>
                <Text style={styles.statTitle}>Weekly Activity</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                  <Text style={styles.statSub}>View Insights</Text>
                  <Ionicons name="chevron-forward" size={14} color="#64748B" />
                </View>
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
          </Pressable>

          <Pressable style={styles.ctaBtn} onPress={() => alert("Camera tracking coming soon!")}>
            <Text style={styles.ctaText}>Start Workout</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>

      {/* ========================================= */}
      {/* MODAL: WEIGHT & PERFORMANCE ANALYTICS */}
      {/* ========================================= */}
      <Modal visible={showWeightModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Body & Performance</Text>
              <Pressable onPress={() => setShowWeightModal(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#fff" />
              </Pressable>
            </View>
            
            <Text style={styles.modalSubTitle}>Weight Trend vs. Reps</Text>
            
            {/* Mock Line Chart Area */}
            <View style={styles.lineChartContainer}>
              <View style={styles.lineChartGrid}>
                <View style={styles.lineChartLine} />
                <View style={styles.lineChartLine} />
                <View style={styles.lineChartLine} />
              </View>
              
              {/* Mock Data Points */}
              <View style={styles.dataPointContainer}>
                <View style={[styles.dataPoint, { bottom: "40%", left: "10%" }]} />
                <View style={[styles.dataPoint, { bottom: "30%", left: "35%" }]} />
                <View style={[styles.dataPoint, { bottom: "50%", left: "60%" }]} />
                <View style={[styles.dataPoint, { bottom: "60%", left: "85%" }]} />
              </View>
              {/* Mock Line connecting points */}
              <View style={styles.mockLine} />
              
              <View style={styles.chartLabels}>
                <Text style={styles.chartLabelText}>Week 1</Text>
                <Text style={styles.chartLabelText}>Week 2</Text>
                <Text style={styles.chartLabelText}>Week 3</Text>
                <Text style={styles.chartLabelText}>Week 4</Text>
              </View>
            </View>

            {/* Performance Correlation Stats */}
            <View style={styles.correlationRow}>
              <View style={styles.correlationBox}>
                <Text style={styles.corrTitle}>Weight Lost</Text>
                <Text style={styles.corrValue}>-2.4 lbs</Text>
              </View>
              <View style={styles.correlationBox}>
                <Text style={styles.corrTitle}>Reps Increase</Text>
                <Text style={[styles.corrValue, { color: "#10B981" }]}>+18%</Text>
              </View>
            </View>

            <View style={styles.aiTipBox}>
              <Ionicons name="sparkles" size={20} color="#F59E0B" />
              <Text style={styles.aiTipText}>Insight: As your weight dropped, your push-up endurance increased. You're getting leaner and stronger!</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================= */}
      {/* MODAL 1: FORM BREAKDOWN DETAILS (Kept from before) */}
      {/* ========================================= */}
      <Modal visible={showFormModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Form Breakdown</Text>
              <Pressable onPress={() => setShowFormModal(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.breakdownRow}>
              <View style={[styles.breakdownIcon, { backgroundColor: "rgba(16, 185, 129, 0.2)" }]}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.breakdownLabel}>Correct Form</Text>
                <Text style={styles.breakdownValue}>110 <Text style={{fontSize: 14, color: "#10B981"}}>(88%)</Text></Text>
              </View>
            </View>
            <View style={styles.breakdownRow}>
              <View style={[styles.breakdownIcon, { backgroundColor: "rgba(239, 68, 68, 0.2)" }]}>
                <Ionicons name="warning" size={24} color="#EF4444" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.breakdownLabel}>Incorrect Form</Text>
                <Text style={styles.breakdownValue}>14 <Text style={{fontSize: 14, color: "#EF4444"}}>(12%)</Text></Text>
              </View>
            </View>
            <View style={styles.aiTipBox}>
              <Ionicons name="sparkles" size={20} color="#F59E0B" />
              <Text style={styles.aiTipText}>AI Coach Tip: You lose form when you go too fast. Slow down the negative rep!</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================= */}
      {/* MODAL 2: WEEKLY INSIGHTS (Kept from before) */}
      {/* ========================================= */}
      <Modal visible={showInsightsModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Improvement Insights</Text>
              <Pressable onPress={() => setShowInsightsModal(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.insightList}>
              <View style={styles.insightItem}>
                <Text style={styles.insightLabel}>Yesterday</Text>
                <View style={styles.insightBarBg}><View style={[styles.insightBarFill, { width: "60%", backgroundColor: "#3B82F6" }]} /></View>
                <Text style={styles.insightValue}>92%</Text>
              </View>
              <View style={styles.insightItem}>
                <Text style={styles.insightLabel}>Last Week</Text>
                <View style={styles.insightBarBg}><View style={[styles.insightBarFill, { width: "80%", backgroundColor: "#8B5CF6" }]} /></View>
                <Text style={styles.insightValue}>88%</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}><Ionicons name="home" size={24} color="#fff" /></Pressable>
        <Pressable style={styles.navItem}><Ionicons name="stats-chart" size={24} color="#64748B" /></Pressable>
        <Pressable style={styles.navItemCenter}><Ionicons name="add" size={28} color="#0F172A" /></Pressable>
        <Pressable style={styles.navItem}><Ionicons name="calendar" size={24} color="#64748B" /></Pressable>
        <Pressable style={styles.navItem}><Ionicons name="person" size={24} color="#64748B" /></Pressable>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090B" },
  safe: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 120 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, marginTop: 10 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  greeting: { fontSize: 13, color: "#94A3B8", fontWeight: "500" },
  name: { fontSize: 16, fontWeight: "700", color: "#fff", marginTop: 2 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#18181B", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#27272A" },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 24, marginBottom: 24 },
  pageTitle: { fontSize: 36, fontWeight: "800", color: "#fff", lineHeight: 40, letterSpacing: -1 },
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
  ctaBtn: { backgroundColor: "#F59E0B", paddingVertical: 20, borderRadius: 24, alignItems: "center", shadowColor: "#F59E0B", shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 8 } },
  ctaText: { color: "#09090B", fontSize: 18, fontWeight: "800", letterSpacing: 0.5 },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 90, backgroundColor: "#09090B", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: 20, borderTopWidth: 1, borderTopColor: "#18181B" },
  navItem: { padding: 10 },
  navItemCenter: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#F59E0B", alignItems: "center", justifyContent: "center", marginTop: -20, shadowColor: "#F59E0B", shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#18181B", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, minHeight: 400 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 24, fontWeight: "800", color: "#fff" },
  modalSubTitle: { fontSize: 14, color: "#94A3B8", marginBottom: 24 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#27272A", alignItems: "center", justifyContent: "center" },
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
  aiTipBox: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(245, 158, 11, 0.1)", padding: 16, borderRadius: 16, gap: 12, marginTop: 10, borderWidth: 1, borderColor: "rgba(245, 158, 11, 0.2)" },
  aiTipText: { color: "#F59E0B", fontSize: 13, fontWeight: "600", flex: 1, lineHeight: 18 },
  
  // Line Chart specific styles
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
});