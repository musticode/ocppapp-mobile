import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AddCardModal from "./AddCardModal";
import { AppHeader } from "./AppHeader";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  cardNumber: string;
  cardHolder: string;
  expires: string;
  isActive: boolean;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  icon: string;
  iconColor: string;
  isExpense: boolean;
}

export default function PaymentMethodList() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expires, setExpires] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("visa");

  const navigation = useNavigation();
  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "mastercard",
      cardNumber: "5564 - 4578 - 3254 - 7860",
      cardHolder: "Mary Rivera",
      expires: "29/May",
      isActive: true,
    },
    {
      id: "2",
      type: "visa",
      cardNumber: "4111 - 1111 - 1111 - 1111",
      cardHolder: "Mary Rivera",
      expires: "12/Dec",
      isActive: false,
    },
    {
      id: "3",
      type: "visa",
      cardNumber: "4111 - 1111 - 1111 - 1111",
      cardHolder: "John Doe",
      expires: "12/Dec",
      isActive: false,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      description: "Dribbble Activation",
      amount: 36,
      date: "Wed, 20 May 2018",
      icon: "dribbble",
      iconColor: "#ea4c89",
      isExpense: true,
    },
    {
      id: "2",
      description: "Macbook Pro 2017",
      amount: 1123.33,
      date: "Mon, 27 May 2018",
      icon: "laptop-mac",
      iconColor: "#8e8e93",
      isExpense: true,
    },
    {
      id: "3",
      description: "EV Charging Session",
      amount: 24.5,
      date: "Today, 2:30 PM",
      icon: "flash",
      iconColor: "#1ec28b",
      isExpense: true,
    },
  ];

  const balance = 845.77;

  const handleAddCard = () => {
    console.log("Add Card");
    setOpen(true);
  };

  const handleCardPress = (card: PaymentMethod) => {
    console.log("Card Pressed", card);
    setActiveCard(card.id);
  };

  const renderCard = (card: PaymentMethod) => (
    <View key={card.id} style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.chipContainer}>{renderCardIcon(card)}</View>
      </View>

      <Text style={styles.cardNumber}>{card.cardNumber}</Text>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>CARD HOLDER</Text>
          <Text style={styles.cardValue}>{card.cardHolder}</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>EXPIRES</Text>
          <Text style={styles.cardValue}>{card.expires}</Text>
        </View>
      </View>
    </View>
  );

  const renderCardIcon = (card: PaymentMethod) => {
    if (card.type === "mastercard") {
      return <FontAwesome name="cc-mastercard" size={24} color="#ff6b35" />;
    } else if (card.type === "visa") {
      return <FontAwesome5 name="cc-visa" size={24} color="#1a1f71" />;
    } else {
      return <FontAwesome5 name="cc-visa" size={24} color="#1a1f71" />;
    }
  };

  const renderCardList = () => {
    return (
      <View style={styles.cardListContainer}>
        {paymentMethods.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.cardOption}
            onPress={() => handleCardPress(card)}
          >
            {renderCardIcon(card)}
            <Text style={styles.cardOptionText}>{card.cardHolder}</Text>
            <Text style={styles.cardOptionText2}>{card.cardNumber}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTransaction = (transaction: Transaction) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.transactionIcon,
            { backgroundColor: transaction.iconColor },
          ]}
        >
          <Ionicons name={transaction.icon as any} size={20} color="#fff" />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription}>
            {transaction.description}
          </Text>
          <Text style={styles.transactionDate}>{transaction.date}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            { color: transaction.isExpense ? "#F44336" : "#1ec28b" },
          ]}
        >
          ${transaction.amount.toFixed(2)}
        </Text>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={20} color="#1ec28b" />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppHeader
        title="Payments"
        subtitle="Payment Methods"
        showBackButton={true}
        showProfile={false}
        onLeftPress={() => router.back()}
      />

      {/* Main Credit Card Display */}
      {activeCard
        ? renderCard(paymentMethods.find((card) => card.id === activeCard)!)
        : renderCard(paymentMethods[0])}
      {/* Active Card Selection */}
      <View style={styles.activeCardSection}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {renderCardList()}
      </View>
      <View style={styles.addCardButtonContainer}>
        <TouchableOpacity style={styles.addCardButton} onPress={handleAddCard}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <AddCardModal
        open={open}
        onClose={() => setOpen(false)}
        label="Card Number"
        placeholder="Enter Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  balanceSection: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#222",
    marginBottom: 8,
  },
  balanceCard: {
    backgroundColor: "#1e3a8a",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContainer: {
    backgroundColor: "#DDDDDD",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  chipContainer: {
    width: 50,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTypeContainer: {
    alignItems: "flex-end",
  },
  mastercardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6b35",
  },
  visaText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1f71",
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 30,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  activeCardSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  cardSelection: {
    flexDirection: "row",
    gap: 12,
  },
  cardListContainer: {
    flexDirection: "column",
    gap: 12,
  },
  cardOption: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  cardOptionActive: {
    borderColor: "#1ec28b",
    backgroundColor: "#f0fdf4",
  },
  cardOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
  cardOptionText2: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    marginTop: 2,
  },
  cardOptionTextActive: {
    color: "#1ec28b",
  },
  activeIndicator: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1ec28b",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionSection: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1ec28b",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionList: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: "#888",
  },
  transactionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  successIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navItemActive: {
    // Active state styling
  },
  navText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  navTextActive: {
    color: "#1ec28b",
    fontWeight: "600",
  },
  centralButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1ec28b",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addCardButton: {
    backgroundColor: "#1ec28b",
    padding: 10,
    borderRadius: 10,
  },
  addCardButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addCardButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
