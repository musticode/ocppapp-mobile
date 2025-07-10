import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function ChargepointDetail() {
  const [tab, setTab] = useState("Info");

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <View style={styles.headerRightRow}>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="heart-outline" size={24} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="map-outline" size={24} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Image */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          }}
          style={styles.stationImage}
        />
        {/* Card Content */}
        <View style={styles.card}>
          <Text style={styles.stationName}>Chargepoint Charging Station</Text>
          <View style={styles.addressRow}>
            <Ionicons
              name="location-outline"
              size={16}
              color="#1ec28b"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.addressText}>451 Crescenty near BC V6Z</Text>
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingValue}>5.0</Text>
            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name="star" size={18} color="#FFC107" />
              ))}
            </View>
            <Text style={styles.reviewCount}>(107 Reviews)</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialIcons name="bolt" size={20} color="#1ec28b" />
              <Text style={styles.infoText}>07 Kw</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="dollar" size={18} color="#1ec28b" />
              <Text style={styles.infoText}>$24.00/Kw</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="directions-walk" size={20} color="#1ec28b" />
              <Text style={styles.infoText}>3.5 km/50min</Text>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Get Direction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filledBtn}>
              <Text style={styles.filledBtnText}>Route Planner</Text>
            </TouchableOpacity>
          </View>
          {/* Tabs */}
          <View style={styles.tabRow}>
            {["Info", "Chargers", "Check-ins", "Reviews"].map((t) => (
              <TouchableOpacity
                key={t}
                style={styles.tabBtn}
                onPress={() => setTab(t)}
              >
                <Text
                  style={[styles.tabText, tab === t && styles.tabTextActive]}
                >
                  {t}
                </Text>
                {tab === t && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
          {/* Tab Content - Only Info for now */}
          {tab === "Info" && (
            <View style={styles.infoTabContent}>
              <Text style={styles.aboutTitle}>About</Text>
              <Text style={styles.aboutText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magn{" "}
                <Text style={styles.readMore}>Read more...</Text>
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* Bottom Book Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bookBtn}>
          <Ionicons
            name="calendar-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.bookBtnText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 100,
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
  headerRightRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stationImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginBottom: -18,
    resizeMode: "cover",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 10,
    marginTop: 0,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 18,
  },
  stationName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  addressText: {
    color: "#888",
    fontSize: 15,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginRight: 4,
  },
  starsRow: {
    flexDirection: "row",
    marginRight: 6,
  },
  reviewCount: {
    color: "#888",
    fontSize: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 2,
  },
  infoText: {
    color: "#1ec28b",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#1ec28b",
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  outlineBtnText: {
    color: "#1ec28b",
    fontWeight: "bold",
    fontSize: 16,
  },
  filledBtn: {
    flex: 1,
    backgroundColor: "#1ec28b",
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: "center",
  },
  filledBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderColor: "#e0e0e0",
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
  infoTabContent: {
    marginTop: 16,
    marginBottom: 8,
  },
  aboutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#222",
  },
  aboutText: {
    color: "#888",
    fontSize: 15,
    lineHeight: 22,
  },
  readMore: {
    color: "#1ec28b",
    fontWeight: "bold",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
  },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1ec28b",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    justifyContent: "center",
  },
  bookBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
