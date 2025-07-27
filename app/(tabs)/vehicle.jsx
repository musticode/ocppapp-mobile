import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BatteryStatusCard } from "@/components/BatteryStatusCard";
import { VehicleInfoCard } from "@/components/VehicleInfoCard";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function Vehicle() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme] ?? Colors.light;

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
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#F8F9FB", dark: "#121212" }}
      >
        <AppHeader
          title="My Vehicle"
          showBackButton={true}
          showProfile={true}
          onLeftPress={() => router.back()}
        />

        {/* Vehicle Header */}
        <View style={styles.vehicleHeader}>
          <Image source={vehicleData.avatar} style={styles.vehicleImage} />
          <View style={styles.headerTextContainer}>
            <ThemedText type="title" style={styles.vehicleName}>
              {vehicleData.year} {vehicleData.make} {vehicleData.model}
            </ThemedText>
            <ThemedText style={styles.vehicleTrim}>
              {vehicleData.trim}
            </ThemedText>
            <ThemedText style={styles.licensePlate}>
              {vehicleData.licensePlate}
            </ThemedText>
          </View>
        </View>

        {/* Battery Status Card */}
        <BatteryStatusCard
          batteryLevel={`${vehicleData.currentCharge}%`}
          estimatedRange={`${vehicleData.range} km`}
          efficiency={`${vehicleData.efficiency} km/kWh`}
        />

        {/* Battery Status Card */}
        {/* <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            BATTERY STATUS
          </ThemedText>
          <View style={styles.batteryContainer}>
            <View style={styles.batteryInfo}>
              <Text
                style={[
                  styles.batteryPercentage,
                  { color: getBatteryColor(vehicleData.currentCharge) },
                ]}
              >
                {vehicleData.currentCharge}%
              </Text>
              <Text style={[styles.batteryLabel, { color: colors.icon }]}>
                Current Charge
              </Text>
            </View>
            <View style={styles.batteryInfo}>
              <Text style={[styles.batteryRange, { color: colors.text }]}>
                {vehicleData.range} mi
              </Text>
              <Text style={[styles.batteryLabel, { color: colors.icon }]}>
                Estimated Range
              </Text>
            </View>
            <View style={styles.batteryInfo}>
              <Text style={[styles.batteryEfficiency, { color: colors.text }]}>
                {vehicleData.efficiency} mi/kWh
              </Text>
              <Text style={[styles.batteryLabel, { color: colors.icon }]}>
                Efficiency
              </Text>
            </View>
          </View>
          <View style={styles.batteryBar}>
            <View
              style={[
                styles.batteryFill,
                {
                  width: `${vehicleData.currentCharge}%`,
                  backgroundColor: getBatteryColor(vehicleData.currentCharge),
                },
              ]}
            />
          </View>
        </View> */}

        <VehicleInfoCard vehicle={vehicleData} />
        {/* Vehicle Information Card */}
        {/* <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            VEHICLE INFORMATION
          </ThemedText>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>
              Make & Model
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {vehicleData.make} {vehicleData.model}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Year</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {vehicleData.year}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Trim</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {vehicleData.trim}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Color</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {vehicleData.color}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>VIN</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {vehicleData.vin}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Total Km</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {vehicleData.totalMiles.toLocaleString()} mi
            </Text>
          </View>
        </View> */}

        {/* Charging Statistics Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            CHARGING STATISTICS
          </ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.tint }]}>
                {vehicleData.chargingStats.totalSessions}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                Total Sessions
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.tint }]}>
                {vehicleData.chargingStats.totalEnergy} kWh
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                Total Energy
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.tint }]}>
                {formatCurrency(vehicleData.chargingStats.totalCost)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                Total Spent
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.tint }]}>
                {vehicleData.chargingStats.averageSession} kWh
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>
                Avg Session
              </Text>
            </View>
          </View>
          <View style={styles.favoriteStation}>
            <Text style={[styles.favoriteLabel, { color: colors.icon }]}>
              Favorite Station
            </Text>
            <Text style={[styles.favoriteValue, { color: colors.text }]}>
              {vehicleData.chargingStats.favoriteStation}
            </Text>
          </View>
        </View>

        {/* Maintenance Status Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            MAINTENANCE STATUS
          </ThemedText>
          <View style={styles.maintenanceGrid}>
            <View style={styles.maintenanceItem}>
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
              <Text style={[styles.maintenanceLabel, { color: colors.icon }]}>
                Tire Health
              </Text>
            </View>
            <View style={styles.maintenanceItem}>
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
              <Text style={[styles.maintenanceLabel, { color: colors.icon }]}>
                Brake Health
              </Text>
            </View>
            <View style={styles.maintenanceItem}>
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
              <Text style={[styles.maintenanceLabel, { color: colors.icon }]}>
                Battery Health
              </Text>
            </View>
            <View style={styles.maintenanceItem}>
              <Text style={[styles.maintenanceValue, { color: colors.text }]}>
                {vehicleData.maintenance.tirePressure}
              </Text>
              <Text style={[styles.maintenanceLabel, { color: colors.icon }]}>
                Tire Pressure
              </Text>
            </View>
          </View>
          <View style={styles.serviceInfo}>
            <View style={styles.serviceRow}>
              <Text style={[styles.serviceLabel, { color: colors.icon }]}>
                Last Service
              </Text>
              <Text style={[styles.serviceValue, { color: colors.text }]}>
                {vehicleData.lastService}
              </Text>
            </View>
            <View style={styles.serviceRow}>
              <Text style={[styles.serviceLabel, { color: colors.icon }]}>
                Next Service
              </Text>
              <Text style={[styles.serviceValue, { color: colors.text }]}>
                {vehicleData.nextService}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            QUICK ACTIONS
          </ThemedText>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.tint + "20" },
              ]}
            >
              <IconSymbol name="location" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.tint }]}>
                Find Charging
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.tint + "20" },
              ]}
            >
              <IconSymbol
                name="wrench.and.screwdriver"
                size={24}
                color={colors.tint}
              />
              <Text style={[styles.actionText, { color: colors.tint }]}>
                Schedule Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: colors.tint + "20" },
              ]}
            >
              <IconSymbol name="doc.text" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.tint }]}>
                View Manual
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  vehicleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#EEE",
  },
  headerTextContainer: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  vehicleTrim: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  licensePlate: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0a7ea4",
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f9fa",
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a7ea4",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  card: {
    marginHorizontal: 10,
    marginBottom: 18,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 16,
    letterSpacing: 1,
  },
  batteryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  batteryInfo: {
    alignItems: "center",
    flex: 1,
  },
  batteryPercentage: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  batteryRange: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  batteryEfficiency: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  batteryLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  batteryBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  batteryFill: {
    height: "100%",
    borderRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
    textAlign: "right",
    fontWeight: "500",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  favoriteStation: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  favoriteLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  favoriteValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  maintenanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  maintenanceItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  maintenanceValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  maintenanceLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  serviceInfo: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  serviceLabel: {
    fontSize: 14,
  },
  serviceValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
});
