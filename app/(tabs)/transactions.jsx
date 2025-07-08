import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { TransactionList } from "@/components/TransactionList";
import { TransactionModal } from "@/components/TransactionModal";

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      <TransactionList onTransactionPress={handleTransactionPress} />
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
    padding: 5,
  },
});
