import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Mock transaction data - replace with real API data
const mockTransactions = [
  {
    id: "1",
    stationName: "Chargepoint Charging Station",
    location: "451 Crescenty near BC V6Z",
    date: "2025-07-10T07:20:00Z",
    plugType: "Tesla (Plug)",
    maxPower: "100 kW",
    duration: "1 Hour",
    amount: "$20.32",
    status: "All",
    active: true,
  },
  {
    id: "2",
    stationName: "Chargepoint Charging Station",
    location: "451 Crescenty near BC V6Z",
    date: "2024-12-17T07:20:00Z",
    plugType: "Tesla (Plug)",
    maxPower: "100 kW",
    duration: "1 Hour",
    amount: "$20.32",
    status: "Completed",
    active: false,
  },
  {
    id: "3",
    stationName: "Chargepoint Charging Station",
    location: "451 Crescenty near BC V6Z",
    date: "2024-12-17T07:20:00Z",
    plugType: "Tesla (Plug)",
    maxPower: "100 kW",
    duration: "1 Hour",
    amount: "$20.32",
    status: "Cancelled",
    active: false,
  },
  {
    id: "4",
    stationName: "Chargepoint Charging Station",
    location: "451 Crescenty near BC V6Z",
    date: "2024-12-17T07:20:00Z",
    plugType: "Tesla (Plug)",
    maxPower: "100 kW",
    duration: "1 Hour",
    amount: "$20.32",
    status: "All",
    active: true,
  },
  {
    id: "5",
    stationName: "Chargepoint Charging Station",
    location: "451 Crescenty near BC V6Z",
    date: "2024-12-17T07:20:00Z",
    plugType: "Tesla (Plug)",
    maxPower: "100 kW",
    duration: "1 Hour",
    amount: "$25.32",
    status: "All",
    active: true,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "All":
      return "#1ec28b";
    case "Completed":
      return "#888";
    case "Cancelled":
      return "#F44336";
    default:
      return "#888";
  }
};

const TransactionCard = ({
  transaction,
  onPress,
}: {
  transaction: any;
  onPress: (transaction: any) => void;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <View>
          <Text style={styles.dateText}>
            {new Date(transaction.date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>
          <Text style={styles.timeText}>
            {new Date(transaction.date).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </View>
        {/* <Switch
          value={transaction.active}
          trackColor={{ false: "#e0e0e0", true: "#1ec28b" }}
          thumbColor={transaction.active ? "#1ec28b" : "#ccc"}
          style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          disabled
        /> */}
      </View>
      <View style={styles.stationRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.stationName}>{transaction.stationName}</Text>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={15}
              color="#1ec28b"
              style={{ marginRight: 3 }}
            />
            <Text style={styles.locationText}>{transaction.location}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.directionBtn}
          onPress={() => console.log("direction button pressed")}
        >
          <Ionicons name="paper-plane" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.metricsRow}>
        <View style={styles.metricCol}>
          <MaterialIcons
            name="ev-station"
            size={22}
            color="#222"
            style={{ marginBottom: 2 }}
          />
          <Text style={styles.metricLabel}>Tesla (Plug)</Text>
        </View>
        <View style={styles.metricCol}>
          <Text style={styles.metricValue}>{transaction.maxPower}</Text>
          <Text style={styles.metricLabel}>Max. Power</Text>
        </View>
        <View style={styles.metricCol}>
          <Text style={styles.metricValue}>{transaction.duration}</Text>
          <Text style={styles.metricLabel}>Duration</Text>
        </View>
        <View style={styles.metricCol}>
          <Text style={styles.metricValue}>{transaction.amount}</Text>
          <Text style={styles.metricLabel}>Amount</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        {/* <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.viewBtn}
          onPress={() => onPress(transaction)}
        >
          <Text style={styles.viewBtnText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TransactionList = ({
  onTransactionPress,
  tab,
}: {
  onTransactionPress: (transaction: any) => void;
  tab: string;
}) => {
  // Filter transactions by tab
  const filtered = mockTransactions.filter((t) => t.status === tab);

  return (
    <FlatList
      data={filtered}
      renderItem={({ item }) => (
        <TransactionCard transaction={item} onPress={onTransactionPress} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={styles.emptyText}>No transactions found.</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
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
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
    fontSize: 16,
  },
});
