import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppHeader } from "@/components/AppHeader";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TransactionDetails } from "@/components/TransactionDetails";
import TransactionCard from "@/components/TransactionCard";
import VehicleCard from "@/components/VehicleCard";
import UserInfoCard from "@/components/UserInfoCard";

const { width } = Dimensions.get("window");

// Mock data for demonstration
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "👤",
  membershipLevel: "Premium",
  totalCharges: 127,
  totalSavings: 45.2,
  phone: "+1234567890",
  status: "Active",
};

const mockLastTransaction = {
  id: "1",
  stationName: "Tesla Supercharger - Downtown",
  location: "123 Main St, Downtown",
  date: "2024-01-15T14:30:00Z",
  duration: 45,
  energyDelivered: 35.5,
  cost: 12.45,
  status: "completed",
  paymentMethod: "Credit Card",
  connectorType: "CCS",
};

const mockCar = {
  model: "Tesla Model 3",
  batteryLevel: 78,
  range: 245,
  isCharging: false,
  lastCharged: "2 hours ago",
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme as keyof typeof Colors] ?? Colors.light;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return "#4CAF50";
    if (level > 30) return "#FF9800";
    return "#F44336";
  };

  return (
    <View style={styles.screen}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.subtitleText}>Ready to charge your EV?</Text>
          </View>
        }
      >
        {/* User Info Card */}
        {/* <ThemedView style={[styles.card, { borderColor: colors.icon + "20" }]}>
          <View style={styles.userCardHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>{mockUser.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <ThemedText type="subtitle" style={styles.userName}>
                {mockUser.name}
              </ThemedText>
              <ThemedText style={[styles.userEmail, { color: colors.icon }]}>
                {mockUser.email}
              </ThemedText>
              <View style={styles.membershipBadge}>
                <Text style={styles.membershipText}>
                  {mockUser.membershipLevel}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color={colors.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.userStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.tint }]}>
                {mockUser.totalCharges}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                Total Charges
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.tint }]}>
                ${mockUser.totalSavings}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                Total Savings
              </Text>
            </View>
          </View>
        </ThemedView> */}
        <UserInfoCard user={mockUser} />

        <VehicleCard vehicle={mockCar} />

        {/* Car Status Card */}
        {/* <ThemedView style={[styles.card, { borderColor: colors.icon + "20" }]}>
          <View style={styles.carCardHeader}>
            <View style={styles.carIcon}>
              <Text style={styles.carEmoji}>🚗</Text>
            </View>
            <View style={styles.carInfo}>
              <ThemedText type="subtitle" style={styles.carModel}>
                {mockCar.model}
              </ThemedText>
              <ThemedText style={[styles.carStatus, { color: colors.icon }]}>
                {mockCar.isCharging ? "Charging..." : "Ready to charge"}
              </ThemedText>
            </View>
            <View style={styles.batteryContainer}>
              <View style={styles.batteryOutline}>
                <View
                  style={[
                    styles.batteryLevel,
                    {
                      width: `${mockCar.batteryLevel}%`,
                      backgroundColor: getBatteryColor(mockCar.batteryLevel),
                    },
                  ]}
                />
              </View>
              <Text style={[styles.batteryText, { color: colors.text }]}>
                {mockCar.batteryLevel}%
              </Text>
            </View>
          </View>
          <View style={styles.carDetails}>
            <View style={styles.carDetailItem}>
              <Ionicons name="speedometer" size={16} color={colors.icon} />
              <Text style={[styles.carDetailText, { color: colors.text }]}>
                {mockCar.range} mi range
              </Text>
            </View>
            <View style={styles.carDetailItem}>
              <Ionicons name="time" size={16} color={colors.icon} />
              <Text style={[styles.carDetailText, { color: colors.text }]}>
                Last charged {mockCar.lastCharged}
              </Text>
            </View>
          </View>
        </ThemedView> */}

        <TransactionCard transaction={mockLastTransaction} onClose={() => {}} />

        {/* Quick Actions */}
        {/* <ThemedView style={[styles.card, { borderColor: colors.icon + "20" }]}>
          <ThemedText type="subtitle" style={styles.quickActionsTitle}>
            Quick Actions
          </ThemedText>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.tint + "20" },
              ]}
            >
              <Ionicons name="search" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Find Station
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.tint + "20" },
              ]}
            >
              <Ionicons name="card" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Payment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.tint + "20" },
              ]}
            >
              <Ionicons name="settings" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.tint + "20" },
              ]}
            >
              <Ionicons name="help-circle" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                Help
              </Text>
            </TouchableOpacity>
          </View>
        </ThemedView> */}
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginTop: 4,
  },
  // card: {
  //   marginHorizontal: 16,
  //   marginBottom: 16,
  //   padding: 16,
  //   borderRadius: 12,
  //   borderWidth: 1,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  userCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
    color: "#222",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  membershipBadge: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  membershipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  editButton: {
    padding: 8,
  },
  userStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  carCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  carIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  carEmoji: {
    fontSize: 24,
  },
  carInfo: {
    flex: 1,
  },
  carModel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  carStatus: {
    fontSize: 14,
  },
  batteryContainer: {
    alignItems: "center",
  },
  batteryOutline: {
    width: 40,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4,
  },
  batteryLevel: {
    height: "100%",
    borderRadius: 1,
  },
  batteryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  carDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  carDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  carDetailText: {
    fontSize: 14,
    marginLeft: 4,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  transactionContent: {
    gap: 12,
  },
  stationInfo: {
    gap: 4,
  },
  stationName: {
    fontSize: 16,
    fontWeight: "600",
  },
  stationLocation: {
    fontSize: 14,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionMetric: {
    alignItems: "center",
    flex: 1,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
  },
  quickActionsTitle: {
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionButton: {
    width: (width - 64) / 2 - 6,
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "92%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#e0e0e0",
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fafbfc",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  forgotPasswordBtn: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 2,
  },
  forgotPasswordText: {
    color: "#1ec28b",
    fontSize: 14,
    fontWeight: "500",
  },
  signInButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#1ec28b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    fontSize: 15,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 18,
    marginTop: 2,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  signupText: {
    color: "#888",
    fontSize: 15,
  },
  signupLink: {
    color: "#1ec28b",
    fontWeight: "bold",
    fontSize: 15,
  },
});
