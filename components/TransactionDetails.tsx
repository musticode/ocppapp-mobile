import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const { width } = Dimensions.get("window");

interface TransactionDetailsProps {
  transaction: {
    id: string;
    stationName: string;
    location: string;
    date: string;
    duration: number;
    energyDelivered: number;
    cost: number;
    status: string;
    paymentMethod: string;
    connectorType: string;
  };
  onClose: () => void;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  onClose,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme as keyof typeof Colors] ?? Colors.light;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "in_progress":
        return "#FF9800";
      case "failed":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const getConnectorIcon = (connectorType: string) => {
    switch (connectorType) {
      case "CCS":
        return "🔌";
      case "CHAdeMO":
        return "⚡";
      case "Type 2":
        return "🔋";
      case "Tesla":
        return "🚗";
      default:
        return "🔌";
    }
  };

  const calculateEfficiency = () => {
    // kWh per minute
    return (transaction.energyDelivered / transaction.duration).toFixed(2);
  };

  const calculateCostPerKWh = () => {
    return (transaction.cost / transaction.energyDelivered).toFixed(2);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.stationName, { color: colors.text }]}>
              {transaction.stationName}
            </Text>
            <Text style={[styles.location, { color: colors.icon }]}>
              📍 {transaction.location}
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(transaction.status) },
                ]}
              />
              <Text style={[styles.statusText, { color: colors.text }]}>
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={[styles.closeButtonText, { color: colors.icon }]}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main Metrics */}
        <View
          style={[
            styles.metricsContainer,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <View style={styles.metricRow}>
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: colors.tint }]}>
                {transaction.energyDelivered} kWh
              </Text>
              <Text style={[styles.metricLabel, { color: colors.icon }]}>
                Energy Delivered
              </Text>
            </View>
            <View style={styles.metric}>
              <Text style={[styles.metricValue, { color: colors.tint }]}>
                {transaction.duration} min
              </Text>
              <Text style={[styles.metricLabel, { color: colors.icon }]}>
                Duration
              </Text>
            </View>
          </View>
          <View style={styles.costContainer}>
            <Text style={[styles.costValue, { color: colors.text }]}>
              ${transaction.cost.toFixed(2)}
            </Text>
            <Text style={[styles.costLabel, { color: colors.icon }]}>
              Total Cost
            </Text>
          </View>
        </View>

        {/* Details Grid */}
        <View
          style={[
            styles.detailsContainer,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Transaction Details
          </Text>

          <View style={styles.detailGrid}>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Date
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {formatDate(transaction.date)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Time
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {formatTime(transaction.date)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Connector Type
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {getConnectorIcon(transaction.connectorType)}{" "}
                {transaction.connectorType}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Payment Method
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                💳 {transaction.paymentMethod}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Efficiency
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                {calculateEfficiency()} kWh/min
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>
                Cost per kWh
              </Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>
                ${calculateCostPerKWh()}
              </Text>
            </View>
          </View>
        </View>

        {/* Environmental Impact */}
        <View
          style={[
            styles.environmentalContainer,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Environmental Impact
          </Text>
          <View style={styles.environmentalStats}>
            <View style={styles.envStat}>
              <Text style={[styles.envValue, { color: "#4CAF50" }]}>
                {(transaction.energyDelivered * 0.85).toFixed(1)} kg
              </Text>
              <Text style={[styles.envLabel, { color: colors.icon }]}>
                CO₂ Saved
              </Text>
            </View>
            <View style={styles.envStat}>
              <Text style={[styles.envValue, { color: "#2196F3" }]}>
                {(transaction.energyDelivered * 3.5).toFixed(1)} km
              </Text>
              <Text style={[styles.envLabel, { color: colors.icon }]}>
                Range Added
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.tint }]}
          >
            <Text style={styles.actionButtonText}>Download Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "transparent",
                borderColor: colors.tint,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={[styles.actionButtonText, { color: colors.tint }]}>
              Report Issue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 15,
  },
  headerContent: {
    flex: 1,
    marginRight: 10,
  },
  stationName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  location: {
    fontSize: 14,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  metricsContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
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
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  metric: {
    alignItems: "center",
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
  },
  costContainer: {
    alignItems: "center",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  costValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  costLabel: {
    fontSize: 14,
  },
  detailsContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailItem: {
    width: "48%",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  environmentalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
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
  environmentalStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  envStat: {
    alignItems: "center",
  },
  envValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  envLabel: {
    fontSize: 12,
  },
  actionsContainer: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
