import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";

import { AppHeader } from "@/components/AppHeader";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TransactionCard from "@/components/TransactionCard";
import VehicleCard from "@/components/VehicleCard";
import UserInfoCard from "@/components/UserInfoCard";
import { router } from "expo-router";
import StartCharging from "@/app/startcharging";

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
      <StatusBar barStyle="light-content" backgroundColor="#A1CEDC" />
      <AppHeader
        title="EV Charge"
        showBackButton={false}
        showProfile={true}
        showNotifications={true}
        onNotificationPress={() => router.push("/notification")}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.subtitleText}>Ready to charge your EV?</Text>

            {/* Quick Action Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/startcharging")}
            >
              <Text style={styles.primaryButtonText}>Start Charging</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* User Info Card */}
          <View style={styles.cardContainer}>
            <UserInfoCard user={mockUser} />
          </View>

          {/* Vehicle Status Card */}
          <View style={styles.cardContainer}>
            <VehicleCard vehicle={mockCar} />
          </View>

          {/* Recent Transaction Card */}
          <View style={styles.cardContainer}>
            <TransactionCard
              transaction={mockLastTransaction}
              onClose={() => {}}
            />
          </View>

          {/* Quick Actions Grid */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#E3F2FD" }]}
                onPress={() => router.push("/qrscanner")}
              >
                <Text style={styles.actionEmoji}>📱</Text>
                <Text style={styles.actionText}>Scan QR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#F3E5F5" }]}
                onPress={() => router.push("/vehicle")}
              >
                <Text style={styles.actionEmoji}>🚗</Text>
                <Text style={styles.actionText}>My Vehicle</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#E8F5E8" }]}
                onPress={() => router.push("/transactions")}
              >
                <Text style={styles.actionEmoji}>📊</Text>
                <Text style={styles.actionText}>History</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#FFF3E0" }]}
                onPress={() => router.push("/payments")}
              >
                <Text style={styles.actionEmoji}>💳</Text>
                <Text style={styles.actionText}>Payments</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{mockUser.totalCharges}</Text>
                <Text style={styles.statLabel}>Total Charges</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>${mockUser.totalSavings}</Text>
                <Text style={styles.statLabel}>Total Savings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{mockCar.batteryLevel}%</Text>
                <Text style={styles.statLabel}>Battery Level</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: "#A1CEDC",
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  heroContent: {
    alignItems: "center",
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.95,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#A1CEDC",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    marginLeft: 4,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  actionButton: {
    width: (width - 70) / 2,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "500",
    textAlign: "center",
  },
});
