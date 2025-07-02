import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();

  const [creditCard, setCreditCard] = useState({
    number: "**** **** **** 1234",
    type: "Visa",
    expiryDate: "12/25",
    cardholderName: "JOHN DOE",
  });

  const [address, setAddress] = useState({
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
  });

  const [userProfile] = useState({
    username: "@johndoe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    birthday: "May 5th, 1990",
    country: "United States",
    creditCard: creditCard,
    address: address,
    social: {
      apple: "connected",
      discord: "connected",
      facebook: "needs_verification",
    },
    avatar: require("@/assets/images/react-logo.png"), // Replace with user avatar if available
  });

  return (
    <ParallaxScrollView
      //   headerImage={<Image source={userProfile.avatar} style={styles.avatar} />}
      headerBackgroundColor={{ light: "#F8F9FB", dark: "#121212" }}
    >
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("login")}
        />
      </View>

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerIcon}>
          <IconSymbol name="chevron.left" size={26} color="#222" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Account
        </ThemedText>
        <TouchableOpacity style={styles.headerIcon}>
          <IconSymbol name="ellipsis" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={userProfile.avatar} style={styles.avatar} />
        <View style={styles.headerTextContainer}>
          <ThemedText type="title" style={styles.fullName}>
            {userProfile.firstName} {userProfile.lastName}
          </ThemedText>
          <ThemedText style={styles.username}>
            {userProfile.username}
          </ThemedText>
        </View>
      </View>

      {/* Personal Information Card */}
      <View style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          PERSONAL INFORMATION
        </ThemedText>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{userProfile.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {userProfile.firstName} {userProfile.lastName}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{userProfile.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Birthday</Text>
          <Text style={styles.value}>{userProfile.birthday}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Country</Text>
          <Text style={styles.value}>{userProfile.country}</Text>
        </View>
      </View>

      {/* Credit Card Information Card */}
      <View style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          CREDIT CARD INFORMATION
        </ThemedText>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Card Number</Text>
          <Text style={styles.value}>{userProfile.creditCard.number}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Card Type</Text>
          <Text style={styles.value}>{userProfile.creditCard.type}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Expiry Date</Text>
          <Text style={styles.value}>{userProfile.creditCard.expiryDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Cardholder Name</Text>
          <Text style={styles.value}>
            {userProfile.creditCard.cardholderName}
          </Text>
        </View>
      </View>

      {/* Login Information Card */}
      <View style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          LOGIN INFORMATION
        </ThemedText>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userProfile.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Update password</Text>
          <IconSymbol name="chevron.right" size={18} color="#888" />
        </View>
      </View>

      {/* Social Accounts Card */}
      <View style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          SOCIAL ACCOUNTS
        </ThemedText>
        <View style={styles.infoRow}>
          <IconSymbol
            name="applelogo"
            size={20}
            color="#000"
            style={styles.socialIcon}
          />
          <Text style={styles.socialLabel}>Apple</Text>
          <Text style={[styles.socialStatus, styles.connected]}>Connected</Text>
        </View>
        <View style={styles.infoRow}>
          <IconSymbol
            name="gamecontroller"
            size={20}
            color="#5865F2"
            style={styles.socialIcon}
          />
          <Text style={styles.socialLabel}>Discord</Text>
          <Text style={[styles.socialStatus, styles.connected]}>Connected</Text>
        </View>
        <View style={styles.infoRow}>
          <IconSymbol
            name="logo.facebook"
            size={20}
            color="#1877F3"
            style={styles.socialIcon}
          />
          <Text style={styles.socialLabel}>Facebook</Text>
          <Text style={[styles.socialStatus, styles.needsVerification]}>
            Needs Verification
          </Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FB",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
    backgroundColor: "#EEE",
  },
  headerTextContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    color: "#888",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  label: {
    fontSize: 16,
    color: "#444",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#222",
    flex: 2,
    textAlign: "right",
  },
  socialIcon: {
    marginRight: 10,
  },
  socialLabel: {
    flex: 1,
    fontSize: 16,
    color: "#444",
  },
  socialStatus: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    flex: 1.2,
  },
  connected: {
    color: "#2ECC40",
  },
  needsVerification: {
    color: "#FF4136",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 4,
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    flex: 1,
    textAlign: "center",
  },
  headerIcon: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
