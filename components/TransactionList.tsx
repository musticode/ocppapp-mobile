import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const { width } = Dimensions.get("window");

// Mock transaction data - replace with real API data
const mockTransactions = [
  {
    id: "1",
    stationName: "Tesla Supercharger - Downtown",
    location: "123 Main St, Downtown",
    date: "2024-01-15T14:30:00Z",
    duration: 45, // minutes
    energyDelivered: 35.5, // kWh
    cost: 12.45,
    status: "completed",
    paymentMethod: "Credit Card",
    connectorType: "CCS",
  },
  {
    id: "2",
    stationName: "Electrify America - Mall",
    location: "456 Shopping Ave, Mall",
    date: "2024-01-14T09:15:00Z",
    duration: 30,
    energyDelivered: 28.2,
    cost: 9.87,
    status: "completed",
    paymentMethod: "Apple Pay",
    connectorType: "CHAdeMO",
  },
  {
    id: "3",
    stationName: "ChargePoint - Office Park",
    location: "789 Business Blvd",
    date: "2024-01-13T17:45:00Z",
    duration: 60,
    energyDelivered: 42.1,
    cost: 14.74,
    status: "completed",
    paymentMethod: "Credit Card",
    connectorType: "Type 2",
  },
  {
    id: "4",
    stationName: "EVgo - Highway Rest Stop",
    location: "Highway 101, Exit 45",
    date: "2024-01-12T11:20:00Z",
    duration: 25,
    energyDelivered: 18.8,
    cost: 6.58,
    status: "completed",
    paymentMethod: "Google Pay",
    connectorType: "CCS",
  },
  {
    id: "5",
    stationName: "Tesla Supercharger - Airport",
    location: "International Airport Terminal 1",
    date: "2024-01-11T08:30:00Z",
    duration: 40,
    energyDelivered: 32.7,
    cost: 11.45,
    status: "completed",
    paymentMethod: "Credit Card",
    connectorType: "Tesla",
  },
];

type Transaction = (typeof mockTransactions)[0];

interface TransactionCardProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme as keyof typeof Colors] ?? Colors.light;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.background, borderColor: colors.icon + "20" },
      ]}
      onPress={() => onPress(transaction)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.stationInfo}>
          <Text
            style={[styles.stationName, { color: colors.text }]}
            numberOfLines={1}
          >
            {transaction.stationName}
          </Text>
          <Text
            style={[styles.location, { color: colors.icon }]}
            numberOfLines={1}
          >
            📍 {transaction.location}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(transaction.status) },
            ]}
          />
          <Text style={[styles.statusText, { color: colors.icon }]}>
            {transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>
              Energy
            </Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {transaction.energyDelivered} kWh
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>
              Duration
            </Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {transaction.duration} min
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>
              Cost
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: colors.tint, fontWeight: "bold" },
              ]}
            >
              ${transaction.cost.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
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
              Connector
            </Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {getConnectorIcon(transaction.connectorType)}{" "}
              {transaction.connectorType}
            </Text>
          </View>
        </View>

        <View style={styles.paymentRow}>
          <Text style={[styles.paymentLabel, { color: colors.icon }]}>
            Payment:
          </Text>
          <Text style={[styles.paymentMethod, { color: colors.text }]}>
            💳 {transaction.paymentMethod}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface FilterButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  isActive,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme as keyof typeof Colors] ?? Colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: isActive ? colors.tint : "transparent",
          borderColor: colors.tint,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterButtonText,
          {
            color: isActive ? "#fff" : colors.tint,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface TransactionListProps {
  onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  onTransactionPress,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [transactions, setTransactions] = useState(mockTransactions);

  const filters = [
    { key: "all", title: "All" },
    { key: "recent", title: "Recent" },
    { key: "high_cost", title: "High Cost" },
    { key: "long_duration", title: "Long Duration" },
  ];

  const handleFilter = (filterKey: string) => {
    setSelectedFilter(filterKey);

    let filteredTransactions = [...mockTransactions];

    switch (filterKey) {
      case "recent":
        // Show transactions from last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filteredTransactions = mockTransactions.filter(
          (t) => new Date(t.date) > weekAgo
        );
        break;
      case "high_cost":
        // Show transactions above $10
        filteredTransactions = mockTransactions.filter((t) => t.cost > 10);
        break;
      case "long_duration":
        // Show transactions longer than 30 minutes
        filteredTransactions = mockTransactions.filter((t) => t.duration > 30);
        break;
      default:
        filteredTransactions = mockTransactions;
    }

    setTransactions(filteredTransactions);
  };

  const handleTransactionPress = (transaction: Transaction) => {
    if (onTransactionPress) {
      onTransactionPress(transaction);
    }
    // You can add navigation to transaction details here
    console.log("Transaction pressed:", transaction);
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TransactionCard transaction={item} onPress={handleTransactionPress} />
  );

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by:</Text>
        <View style={styles.filterButtons}>
          {filters.map((filter) => (
            <FilterButton
              key={filter.key}
              title={filter.title}
              isActive={selectedFilter === filter.key}
              onPress={() => handleFilter(filter.key)}
            />
          ))}
        </View>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{transactions.length}</Text>
          <Text style={styles.summaryLabel}>Transactions</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            ${transactions.reduce((sum, t) => sum + t.cost, 0).toFixed(2)}
          </Text>
          <Text style={styles.summaryLabel}>Total Spent</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {transactions
              .reduce((sum, t) => sum + t.energyDelivered, 0)
              .toFixed(1)}{" "}
            kWh
          </Text>
          <Text style={styles.summaryLabel}>Total Energy</Text>
        </View>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#666",
  },
  filterButtons: {
    flexDirection: "row",
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f9fa",
    marginHorizontal: 20,
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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
  card: {
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stationInfo: {
    flex: 1,
    marginRight: 10,
  },
  stationName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  cardContent: {
    gap: 12,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metric: {
    alignItems: "center",
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "500",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  paymentLabel: {
    fontSize: 12,
    marginRight: 6,
  },
  paymentMethod: {
    fontSize: 13,
    fontWeight: "500",
  },
});
