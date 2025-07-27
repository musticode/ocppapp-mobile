import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TransactionList } from "@/components/TransactionList";
import { TransactionModal } from "@/components/TransactionModal";
import { AppHeader } from "@/components/AppHeader";
import { router } from "expo-router";

const TABS = ["All", "Completed", "Cancelled"];

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState("All");

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Transactions"
        showBackButton={true}
        showProfile={true}
        showNotifications={true}
        onNotificationPress={() => router.push("/notification")}
        onLeftPress={() => router.back()}
      />
      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={styles.tabBtn}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t}
            </Text>
            {tab === t && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      {/* Transaction List */}
      <TransactionList onTransactionPress={handleTransactionPress} tab={tab} />
      <TransactionModal
        visible={modalVisible}
        transaction={selectedTransaction}
        onClose={handleCloseModal}
      />
    </View>
  );
}

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
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderColor: "#e0e0e0",
    marginBottom: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  },
  tabText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 15,
  },
  tabTextActive: {
    color: "#1ec28b",
  },
  tabIndicator: {
    position: "absolute",
    left: "20%",
    right: "20%",
    bottom: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#1ec28b",
  },
});
