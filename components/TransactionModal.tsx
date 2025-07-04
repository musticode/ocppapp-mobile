import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TransactionDetails } from "./TransactionDetails";

const { height } = Dimensions.get("window");

interface TransactionModalProps {
  visible: boolean;
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
  } | null;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  visible,
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TransactionDetails transaction={transaction} onClose={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
