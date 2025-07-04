import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useNavigation } from "@react-navigation/native";
import Notifications from "@/components/Notifications";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function Profile() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme] ?? Colors.light;

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
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#F8F9FB", dark: "#121212" }}
      >
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

        {/* Profile Summary Stats */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {userProfile.creditCard.type}
            </Text>
            <Text style={styles.summaryLabel}>Card Type</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>Social Accounts</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>Active</Text>
            <Text style={styles.summaryLabel}>Status</Text>
          </View>
        </View>

        {/* Personal Information Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            PERSONAL INFORMATION
          </ThemedText>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Username</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.username}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Name</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.firstName} {userProfile.lastName}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Phone</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.phone}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Birthday</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.birthday}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Country</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.country}
            </Text>
          </View>
        </View>

        {/* Credit Card Information Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            CREDIT CARD INFORMATION
          </ThemedText>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>
              Card Number
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.creditCard.number}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>
              Card Type
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.creditCard.type}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>
              Expiry Date
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.creditCard.expiryDate}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>
              Cardholder Name
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.creditCard.cardholderName}
            </Text>
          </View>
        </View>

        {/* Login Information Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.background,
              borderColor: colors.icon + "20",
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            LOGIN INFORMATION
          </ThemedText>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>Email</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {userProfile.email}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: colors.icon }]}>
              Update password
            </Text>
            <IconSymbol name="chevron.right" size={18} color={colors.icon} />
          </View>
        </View>

        {/* <SocialAccounts social={userProfile.social} /> */}
      </ParallaxScrollView>
    </View>
  );
}

function PersonalInformation() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme] ?? Colors.light;

  return (
    <View>
      <Text>Personal Information</Text>
    </View>
  );
}

function SocialAccounts(props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background,
          borderColor: colors.icon + "20",
        },
      ]}
    >
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
        <Text style={[styles.socialLabel, { color: colors.text }]}>Apple</Text>
        {props.social.apple === "connected" ? (
          <Text style={[styles.socialStatus, styles.connected]}>Connected</Text>
        ) : (
          <Text style={[styles.socialStatus, styles.needsVerification]}>
            Needs Verification
          </Text>
        )}
      </View>
      <View style={styles.infoRow}>
        <IconSymbol
          name="gamecontroller"
          size={20}
          color="#5865F2"
          style={styles.socialIcon}
        />
        <Text style={[styles.socialLabel, { color: colors.text }]}>
          Discord
        </Text>
        {props.social.discord === "connected" ? (
          <Text style={[styles.socialStatus, styles.connected]}>Connected</Text>
        ) : (
          <Text style={[styles.socialStatus, styles.needsVerification]}>
            Needs Verification
          </Text>
        )}
      </View>
      <View style={styles.infoRow}>
        <IconSymbol
          name="logo.facebook"
          size={20}
          color="#1877F3"
          style={styles.socialIcon}
        />
        <Text style={[styles.socialLabel, { color: colors.text }]}>
          Facebook
        </Text>
        {props.social.facebook === "connected" ? (
          <Text style={[styles.socialStatus, styles.connected]}>Connected</Text>
        ) : (
          <Text style={[styles.socialStatus, styles.needsVerification]}>
            Needs Verification
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
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
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f9fa",
    marginHorizontal: 10,
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
  card: {
    marginHorizontal: 10,
    marginBottom: 18,
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
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
    textAlign: "right",
    fontWeight: "500",
  },
  socialIcon: {
    marginRight: 10,
  },
  socialLabel: {
    flex: 1,
    fontSize: 16,
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
