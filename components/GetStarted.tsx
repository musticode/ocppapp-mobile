import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

export const GetStarted = () => {
  return (
    <LinearGradient colors={["#f5f5f5", "#e8e8e8"]} style={styles.container}>
      {/* Main Content Card */}
      <View style={styles.contentCard}>
        {/* Illustration Section */}
        <View style={styles.illustrationContainer}>
          {/* Charging Station */}
          <View style={styles.stationContainer}>
            <View style={styles.station1}>
              <View style={styles.stationDisplay} />
              <View style={styles.stationBody} />
            </View>
            <View style={styles.station2}>
              <View style={styles.stationDisplay} />
              <View style={styles.stationBody} />
            </View>
          </View>

          {/* Car */}
          <View style={styles.carContainer}>
            <View style={styles.carBody}>
              <View style={styles.carWindow} />
              <View style={styles.carDoor} />
            </View>
            <View style={styles.carWheelContainer}>
              <View style={styles.carWheel} />
              <View style={styles.carWheel} />
            </View>
          </View>

          {/* Charging Cable */}
          <View style={styles.chargingCable} />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Powering Your Journey</Text>
          <Text style={styles.description}>
            Find, reserve, and pay for EV charging across the nation with ease.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logInButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.logInButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Legal Disclaimer */}
        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>
            By continuing, you agree to our{" "}
            <Text style={styles.legalLink}>Terms of Service</Text> and{" "}
            <Text style={styles.legalLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentCard: {
    flex: 1,
    backgroundColor: "#fff",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 30,
  },
  illustrationContainer: {
    height: height * 0.35,
    backgroundColor: "#8FBC8F",
    borderRadius: 16,
    marginBottom: 40,
    position: "relative",
    overflow: "hidden",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stationContainer: {
    position: "absolute",
    left: 30,
    bottom: 20,
    flexDirection: "row",
    gap: 15,
  },
  station1: {
    alignItems: "center",
  },
  station2: {
    alignItems: "center",
  },
  stationDisplay: {
    width: 20,
    height: 12,
    backgroundColor: "#2F4F4F",
    borderRadius: 2,
    marginBottom: 4,
  },
  stationBody: {
    width: 16,
    height: 35,
    backgroundColor: "#2F4F4F",
    borderRadius: 8,
  },
  carContainer: {
    position: "absolute",
    right: 30,
    bottom: 20,
  },
  carBody: {
    width: 90,
    height: 45,
    backgroundColor: "#DAA520",
    borderRadius: 22,
    position: "relative",
    marginBottom: 8,
  },
  carWindow: {
    position: "absolute",
    top: 8,
    left: 20,
    width: 50,
    height: 15,
    backgroundColor: "#4A6741",
    borderRadius: 8,
  },
  carDoor: {
    position: "absolute",
    top: 25,
    right: 25,
    width: 20,
    height: 2,
    backgroundColor: "#B8860B",
  },
  carWheelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  carWheel: {
    width: 12,
    height: 12,
    backgroundColor: "#2F4F4F",
    borderRadius: 6,
  },
  chargingCable: {
    position: "absolute",
    left: 75,
    bottom: 35,
    width: 40,
    height: 3,
    backgroundColor: "#2F4F4F",
    borderRadius: 2,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F4F4F",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: Colors.green.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logInButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.green.primary,
  },
  logInButtonText: {
    color: Colors.green.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  legalContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  legalText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  legalLink: {
    color: Colors.green.primary,
    textDecorationLine: "underline",
  },
});
