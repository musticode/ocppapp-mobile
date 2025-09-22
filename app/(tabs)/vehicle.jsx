import React, { useState, useEffect } from "react";
import axiosService from "@/service/axiosService";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BatteryStatusCard } from "@/components/BatteryStatusCard";
import { VehicleInfoCard } from "@/components/VehicleInfoCard";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { selectUserId } from "@/store/reducers/userSlice";

const { width } = Dimensions.get("window");

export default function Vehicle() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme] ?? Colors.light;
  const localUserId = useSelector(selectUserId);

  const [vehicleData, setVehicleData] = useState({
    make: "Tesla",
    model: "Model 3",
    year: "2023",
    trim: "Long Range AWD",
    vin: "1HGBH41JXMN109186",
    licensePlate: "EV-1234",
    color: "Midnight Silver Metallic",
    batteryCapacity: 82, // kWh
    currentCharge: 75, // percentage
    range: 358, // miles
    efficiency: 4.1, // miles per kWh
    totalMiles: 12450,
    lastService: "2024-01-15",
    nextService: "2024-04-15",
    chargingStats: {
      totalSessions: 45,
      totalEnergy: 1250, // kWh
      totalCost: 437.5,
      averageSession: 28, // kWh
      favoriteStation: "Tesla Supercharger - Downtown",
    },
    maintenance: {
      tirePressure: "32 PSI",
      tireHealth: "85%",
      brakeHealth: "95%",
      batteryHealth: "98%",
    },
    avatar: require("@/assets/images/react-logo.png"), // Replace with car image
  });

  const fetchVehicleData = async () => {
    try {
      const response = await axiosService.get("/vehicle/fetchVehicleData", {
        params: {
          userId: localUserId ? localUserId : null,
        },
      });
      console.log(response.data);
      setVehicleData(response.data);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const getBatteryColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 50) return "#FF9800";
    return "#F44336";
  };

  const getHealthColor = (percentage) => {
    if (percentage >= 90) return "#4CAF50";
    if (percentage >= 70) return "#FF9800";
    return "#F44336";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <AppHeader
        title="My Vehicle"
        showBackButton={true}
        showProfile={true}
        onLeftPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Vehicle Section */}
        <View style={styles.heroSection}>
          <View style={styles.vehicleHeader}>
            <Image source={vehicleData.avatar} style={styles.vehicleImage} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.vehicleName}>
                {vehicleData.year} {vehicleData.make} {vehicleData.model}
              </Text>
              <Text style={styles.vehicleTrim}>{vehicleData.trim}</Text>
              <View style={styles.licensePlateContainer}>
                <Text style={styles.licensePlate}>
                  {vehicleData.licensePlate}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Stats Overview */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{vehicleData.currentCharge}%</Text>
              <Text style={styles.statLabel}>Battery</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{vehicleData.range}</Text>
              <Text style={styles.statLabel}>Range (mi)</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {vehicleData.totalMiles.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Total Miles</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Battery Status Card */}
          <View style={styles.cardContainer}>
            <BatteryStatusCard
              batteryLevel={`${vehicleData.currentCharge}%`}
              estimatedRange={`${vehicleData.range} km`}
              efficiency={`${vehicleData.efficiency} km/kWh`}
            />
          </View>

          {/* Vehicle Information Card */}
          <View style={styles.cardContainer}>
            <VehicleInfoCard vehicle={vehicleData} />
          </View>

          {/* Charging Statistics Card */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Charging Statistics</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statCardValue}>
                    {vehicleData.chargingStats.totalSessions}
                  </Text>
                  <Text style={styles.statCardLabel}>Total Sessions</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statCardValue}>
                    {vehicleData.chargingStats.totalEnergy} kWh
                  </Text>
                  <Text style={styles.statCardLabel}>Total Energy</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statCardValue}>
                    {formatCurrency(vehicleData.chargingStats.totalCost)}
                  </Text>
                  <Text style={styles.statCardLabel}>Total Spent</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statCardValue}>
                    {vehicleData.chargingStats.averageSession} kWh
                  </Text>
                  <Text style={styles.statCardLabel}>Avg Session</Text>
                </View>
              </View>
              <View style={styles.favoriteStation}>
                <Text style={styles.favoriteLabel}>Favorite Station</Text>
                <Text style={styles.favoriteValue}>
                  {vehicleData.chargingStats.favoriteStation}
                </Text>
              </View>
            </View>
          </View>

          {/* Maintenance Status Card */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Maintenance Status</Text>
              <View style={styles.maintenanceGrid}>
                <View style={styles.maintenanceCard}>
                  <Text
                    style={[
                      styles.maintenanceValue,
                      {
                        color: getHealthColor(
                          parseInt(vehicleData.maintenance.tireHealth)
                        ),
                      },
                    ]}
                  >
                    {vehicleData.maintenance.tireHealth}
                  </Text>
                  <Text style={styles.maintenanceLabel}>Tire Health</Text>
                </View>
                <View style={styles.maintenanceCard}>
                  <Text
                    style={[
                      styles.maintenanceValue,
                      {
                        color: getHealthColor(
                          parseInt(vehicleData.maintenance.brakeHealth)
                        ),
                      },
                    ]}
                  >
                    {vehicleData.maintenance.brakeHealth}
                  </Text>
                  <Text style={styles.maintenanceLabel}>Brake Health</Text>
                </View>
                <View style={styles.maintenanceCard}>
                  <Text
                    style={[
                      styles.maintenanceValue,
                      {
                        color: getHealthColor(
                          parseInt(vehicleData.maintenance.batteryHealth)
                        ),
                      },
                    ]}
                  >
                    {vehicleData.maintenance.batteryHealth}
                  </Text>
                  <Text style={styles.maintenanceLabel}>Battery Health</Text>
                </View>
                <View style={styles.maintenanceCard}>
                  <Text style={styles.maintenanceValue}>
                    {vehicleData.maintenance.tirePressure}
                  </Text>
                  <Text style={styles.maintenanceLabel}>Tire Pressure</Text>
                </View>
              </View>
              <View style={styles.serviceInfo}>
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceLabel}>Last Service</Text>
                  <Text style={styles.serviceValue}>
                    {vehicleData.lastService}
                  </Text>
                </View>
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceLabel}>Next Service</Text>
                  <Text style={styles.serviceValue}>
                    {vehicleData.nextService}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Quick Actions</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <View
                    style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}
                  >
                    <IconSymbol name="location" size={24} color="#1976D2" />
                  </View>
                  <Text style={styles.actionText}>Find Charging</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <View
                    style={[styles.actionIcon, { backgroundColor: "#F3E5F5" }]}
                  >
                    <IconSymbol
                      name="wrench.and.screwdriver"
                      size={24}
                      color="#7B1FA2"
                    />
                  </View>
                  <Text style={styles.actionText}>Schedule Service</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <View
                    style={[styles.actionIcon, { backgroundColor: "#E8F5E8" }]}
                  >
                    <IconSymbol name="doc.text" size={24} color="#388E3C" />
                  </View>
                  <Text style={styles.actionText}>View Manual</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  vehicleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#f0f0f0",
  },
  headerTextContainer: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 6,
  },
  vehicleTrim: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  licensePlateContainer: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#bbdefb",
  },
  licensePlate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976d2",
  },
  quickStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e0e0e0",
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 6,
  },
  statCardLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "500",
    textAlign: "center",
  },
  favoriteStation: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  favoriteLabel: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 6,
    fontWeight: "500",
  },
  favoriteValue: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "600",
  },
  maintenanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  maintenanceCard: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  maintenanceValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  maintenanceLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "500",
    textAlign: "center",
  },
  serviceInfo: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  serviceLabel: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  serviceValue: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
  },
});
