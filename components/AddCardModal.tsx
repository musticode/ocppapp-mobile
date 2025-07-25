import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axiosService from "@/service/axiosService";

interface CardInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  open: boolean;
  onClose: () => void;
}

export default function AddCardModal({
  label,
  placeholder,
  value,
  onChangeText,
  open,
  onClose,
}: CardInputProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handleAddCard = async () => {
    console.log("Add Card", cardNumber, expiryDate, cvv, cardholderName);

    const payload = {
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
    };

    try {
      const response = await axiosService.post(
        "/payments/createPaymentMethod",
        payload
      );
      console.log("Response", response);
    } catch (error) {
      console.error("Error adding card", error);
    }
  };

  return (
    <Modal
      visible={open}
      onRequestClose={onClose}
      transparent={false}
      animationType="slide"
    >
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>Payment Methods</Text>
          <Text style={styles.subtitle}>Manage your payment methods here.</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Expiry Date</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={onClose}>
            <Text style={styles.signInButtonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "92%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#e0e0e0",
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fafbfc",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  forgotPasswordBtn: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 2,
  },
  forgotPasswordText: {
    color: "#1ec28b",
    fontSize: 14,
    fontWeight: "500",
  },
  signInButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#1ec28b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    fontSize: 15,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 18,
    marginTop: 2,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  signupText: {
    color: "#888",
    fontSize: 15,
  },
  signupLink: {
    color: "#1ec28b",
    fontWeight: "bold",
    fontSize: 15,
  },
  cancelButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
  },
});
