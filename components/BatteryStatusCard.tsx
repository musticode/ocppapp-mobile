import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface BatteryStatusCardProps {
  batteryLevel: string;
  estimatedRange: string;
  efficiency: string;
  //   chargingStatus: string;
  //   chargingPower: string;
  //   chargingType: string;
  //   chargingLocation: string;
  //   chargingDate: string;
  //   chargingTime: string;
}

export const BatteryStatusCard = ({
  batteryLevel,
  estimatedRange,
  efficiency,
}: BatteryStatusCardProps) => {
  return (
    <View style={styles.container}>
      {/* Card Content */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.statusRow}></View>
        </View>
        <View style={styles.stationRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.stationName}>Battery Status</Text>
          </View>
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>Battery Level</Text>
            <Text style={styles.metricLabel}>{batteryLevel}</Text>
          </View>
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>Efficiency</Text>
            <Text style={styles.metricLabel}>{efficiency}</Text>
          </View>
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>Estimated Range</Text>
            <Text style={styles.metricLabel}>{estimatedRange}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 18,
    marginBottom: 8,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  statusRow: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  stationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#888",
    fontSize: 13,
  },
  directionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1ec28b",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
  },
  metricCol: {
    alignItems: "center",
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    textAlign: "center",
  },
  metricValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#1ec28b",
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#1ec28b",
    fontWeight: "bold",
    fontSize: 16,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: "#1ec28b",
    borderRadius: 10,
    paddingVertical: 10,
    marginLeft: 8,
    alignItems: "center",
  },
  viewBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BatteryStatusCard;
