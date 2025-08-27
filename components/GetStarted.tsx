import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export const GetStarted = () => {
  return (
    <LinearGradient
      //colors={["#2c3e50", "#34495e", "#2c3e50"]}
      colors={["#299799", "#6BBF91", "#AABD66", "#C7BC52", "#FDBB2D"]}
      style={styles.container}
    >
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>E</Text>
          </View>
          <Text style={styles.appName}>EV Charge</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title Text */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleLine}>Find your dream</Text>
          <Text style={styles.highlightedText}>electric car</Text>
          <Text style={styles.titleLine}>and</Text>
          <Text style={styles.titleLine}>start your journey</Text>
        </View>

        {/* Car and Charging Station Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/ev-electric-car-connect-charging-260nw-2367123101.png")}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Navigation Indicators */}
        {/* <View style={styles.navigationIndicators}>
          <View style={styles.indicatorActive} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View> */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1ec28b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  appName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  titleLine: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    lineHeight: 36,
  },
  highlightedText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#87CEEB",
    textAlign: "center",
    lineHeight: 36,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "#1ec28b",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    minWidth: 200,
    alignItems: "center",
  },
  getStartedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  navigationIndicators: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicatorActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1ec28b",
    marginHorizontal: 4,
  },
  indicator: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
  },
});
