import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import LogoutModal from "@/components/LogoutModal";
import { router } from "expo-router";
import { AppHeader } from "@/components/AppHeader";

export default function Profile() {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const user = {
    name: "John Doe",
    phone: "+1 123 **** 789",
    avatar: require("@/assets/images/react-logo.png"),
  };

  const menu = [
    {
      icon: <MaterialIcons name="directions-car" size={22} color="#1ec28b" />,
      label: "My Vehicle",
      onPress: () => router.push("/myvehicle"),
    },
    {
      icon: <MaterialIcons name="payment" size={22} color="#1ec28b" />,
      label: "Payment Methods",
      onPress: () => router.push("/payments"),
    },
    {
      icon: <Ionicons name="person-outline" size={22} color="#1ec28b" />,
      label: "Personal Info.",
      onPress: () => router.push("/personalinfo"),
    },
    {
      icon: <Ionicons name="help-circle-outline" size={22} color="#1ec28b" />,
      label: "Help Center",
      onPress: () => router.push("/helpcenter"),
    },
    {
      icon: <FontAwesome5 name="key" size={20} color="#1ec28b" />,
      label: "Password Manager",
      onPress: () => router.push("/passwordmanager"),
    },
    {
      icon: <Ionicons name="document-text-outline" size={22} color="#1ec28b" />,
      label: "Privacy Policy",
      onPress: () => router.push("/privacypolicy"),
    },
  ];

  const handlePaymentMethods = () => {
    router.push("/payments");
  };

  const handleMyVehicle = () => {
    router.push("/myvehicle");
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      {/* <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 38 }} />
      </View> */}
      <AppHeader
        title="Account"
        showBackButton={true}
        showProfile={false}
        onLeftPress={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <View style={styles.card}>
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <Image source={user.avatar} style={styles.avatar} />
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Name & Phone */}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          {/* Menu */}
          <View style={styles.menuList}>
            {menu.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuItem}
                onPress={item.onPress || (() => {})}
              >
                <View style={styles.menuIcon}>{item.icon}</View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#1ec28b"
                  style={styles.menuArrow}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#ff3b30"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
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
  scrollContent: {
    alignItems: "center",
    paddingBottom: 40,
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
    marginTop: 10,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EEE",
  },
  editBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1ec28b",
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginTop: 2,
    marginBottom: 2,
    textAlign: "center",
  },
  phone: {
    fontSize: 15,
    color: "#888",
    marginBottom: 18,
    textAlign: "center",
  },
  menuList: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIcon: {
    width: 32,
    alignItems: "center",
    marginRight: 8,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  menuArrow: {
    marginLeft: 8,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    backgroundColor: "#fff0f0",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
  },
  logoutText: {
    color: "#ff3b30",
    fontWeight: "bold",
    fontSize: 16,
  },
});
