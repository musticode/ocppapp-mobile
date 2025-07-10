import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const VEHICLES = [
  { brand: "Tesla", model: "Model S", edition: "40", color: "#1ec28b" },
  { brand: "Audi", model: "e-Tron", edition: "Prestige", color: "#ff9800" },
  { brand: "Porsche", model: "Taycan", edition: "Turbo S", color: "#888" },
  {
    brand: "Volkswagen",
    model: "ID4",
    edition: "1st Edition",
    color: "#2196f3",
  },
  { brand: "Ford", model: "Mustang Mach-E", edition: "GT", color: "#ffd600" },
  { brand: "Kia", model: "Niro EV", edition: "EX Premium", color: "#222" },
];

export default function AddVehicle() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Your Vehicle</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="add" size={26} color="#1ec28b" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {VEHICLES.map((v, idx) => (
          <TouchableOpacity
            key={v.brand + v.model}
            style={styles.card}
            onPress={() => setSelected(idx)}
            activeOpacity={0.85}
          >
            <View
              style={[styles.carIconWrap, { backgroundColor: v.color + "22" }]}
            >
              <MaterialCommunityIcons name="car" size={32} color={v.color} />
            </View>
            <View style={styles.carInfo}>
              <Text style={styles.carBrand}>{v.brand}</Text>
              <Text style={styles.carModel}>
                {v.model} • {v.edition}
              </Text>
            </View>
            <View style={styles.radioWrap}>
              {selected === idx ? (
                <View style={styles.radioOuterActive}>
                  <View style={styles.radioInner} />
                </View>
              ) : (
                <View style={styles.radioOuter} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.continueBtn,
          { backgroundColor: selected !== null ? "#222" : "#ccc" },
        ]}
        disabled={selected === null}
      >
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
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
    padding: 12,
    paddingBottom: 80,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  carIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  carInfo: {
    flex: 1,
  },
  carBrand: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
    marginBottom: 2,
  },
  carModel: {
    color: "#888",
    fontSize: 14,
  },
  radioWrap: {
    marginLeft: 10,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#1ec28b",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1ec28b",
  },
  continueBtn: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
    elevation: 2,
  },
  continueBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
