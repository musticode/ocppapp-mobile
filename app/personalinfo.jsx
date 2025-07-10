import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PersonalInfo() {
  const navigation = useNavigation();
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("123 *** *** 545");
  const [email, setEmail] = useState("example@gmail.com");

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info.</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="pencil" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Form Card */}
      <View style={styles.card}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        {/* Phone */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCode}>+1 ▼</Text>
          </View>
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 8 }]}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateBtn}>
        <Text style={styles.updateBtnText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginRight: 32, // to balance the back arrow
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#eee",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 110 / 2 - 18, // center horizontally on image
    backgroundColor: "#22c55e",
    borderRadius: 16,
    padding: 4,
    borderWidth: 2,
    borderColor: "#fff",
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 4,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  countryCodeBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countryCode: {
    fontSize: 16,
    color: "#222",
  },
  updateBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 24,
  },
  updateBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
