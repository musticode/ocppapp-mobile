import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppHeader } from "./AppHeader";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface HeaderWithMapExampleProps {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  onEnterMapsPress?: () => void;
}

export const HeaderWithMapExample: React.FC<HeaderWithMapExampleProps> = ({
  onSearchPress,
  onNotificationPress,
  onEnterMapsPress,
}) => {
  // You can replace this with an actual map image or use a placeholder
  const mapBackgroundImage = require("../assets/images/ev_station_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png");

  return (
    <View style={styles.container}>
      <AppHeader
        title="Ngecass"
        showAppLogo={true}
        showSearchButton={false}
        showNotificationButton={true}
        onSearchPress={onSearchPress}
        onNotificationPress={onNotificationPress}
        backgroundImage={mapBackgroundImage}
      />

      {/* Map content area */}
      <View style={styles.mapContainer}>
        {/* Placeholder for map content */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Map Interface</Text>
          <Text style={styles.streetText}>4th Av.</Text>
        </View>

        {/* Enter Maps Button */}
        <TouchableOpacity
          style={styles.enterMapsButton}
          onPress={onEnterMapsPress}
        >
          <Text style={styles.enterMapsText}>Enter Maps</Text>
          <Icon name="chevron-down" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#E8E8E8", // Light grey background for map
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mapText: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 10,
  },
  streetText: {
    fontSize: 14,
    color: "#999999",
    transform: [{ rotate: "90deg" }],
    position: "absolute",
    right: 10,
    top: "50%",
  },
  enterMapsButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  enterMapsText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
