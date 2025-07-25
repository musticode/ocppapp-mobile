import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axiosService from "../service/axiosService";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.6;
const STROKE_WIDTH = 12;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PERCENT = 35; // state of charge information
const PROGRESS = (CIRCUMFERENCE * (100 - PERCENT)) / 100;
const KW = 72;
const CHARGING_TIME = "00:20:45";
const AMOUNT = 20.24;
let total = 0;

export default function ActiveSession() {
  const [percent, setPercent] = useState(PERCENT);
  const [kw, setKw] = useState(KW);
  const [chargingTime, setChargingTime] = useState(CHARGING_TIME);
  const [amount, setAmount] = useState(AMOUNT);
  const [totalCost, setTotalCost] = useState(total);
  const navigation = useNavigation();

  useEffect(() => {
    fetchChargingMeterValues();
  }, []);

  const fetchChargingMeterValues = async () => {
    try {
      const response = await axiosService.post(
        "/meter-values/fetchChargingMeterValues",
        {
          chargingMeterId: 1,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleStopCharging = async () => {
    const remoteStopTransactionRequestBody = {
      transactionId: "1234567890",
      transactionType: "CHARGING",
      transactionStatus: "STOPPED",
      transactionAmount: 100,
      transactionDate: "2021-01-01",
      transactionTime: "10:00:00",
      transactionLocation: "New York",
    };

    try {
      // todo : will be implemented as backend controller
      const response = await axiosService.post(
        "/trigger-message/remoteStopTransaction",
        remoteStopTransactionRequestBody
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

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
        <Text style={styles.headerTitle}>Active Session</Text>
      </View>

      {/* Circular Progress */}
      <View style={styles.progressContainer}>
        <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
          <Circle
            stroke="#e5e7eb"
            fill="none"
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
          <Circle
            stroke="#22c55e"
            fill="none"
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={PROGRESS}
            strokeLinecap="round"
            rotation="-90"
            origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
          />
        </Svg>
        <View style={styles.progressTextContainer}>
          <MaterialCommunityIcons
            name="flash"
            size={32}
            color="#fbbf24"
            style={{ marginBottom: 2 }}
          />
          <Text style={styles.percentText}>{percent}%</Text>
          <Text style={styles.kwText}>{kw} kw</Text>
        </View>
      </View>

      {/* Usage Card */}
      <View style={styles.usageCard}>
        <View style={styles.usageCol}>
          <Text style={styles.usageValue}>{chargingTime}</Text>
          <Text style={styles.usageLabel}>Charging Time</Text>
        </View>
        <View style={styles.usageCol}>
          <Text style={styles.usageValue}>{amount}</Text>
          <Text style={styles.usageLabel}>kWh (Amount)</Text>
        </View>
        <View style={styles.usageCol}>
          <Text style={styles.usageValue}>$ {totalCost.toFixed(2)}</Text>
          <Text style={styles.usageLabel}>Total Cost</Text>
        </View>
      </View>

      {/* Slide to Stop Charging Button */}
      <TouchableOpacity
        style={styles.slideBtn}
        activeOpacity={0.8}
        onPress={() => handleStopCharging()}
      >
        <Text style={styles.slideBtnText}>Stop Charging</Text>
        <View style={styles.slideArrow}>
          <Ionicons name="arrow-forward" size={22} color="#22c55e" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // alignItems: "center", // centers all content in the screen
    backgroundColor: "#f9fafb",
    paddingTop: 40,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginRight: 32, // to balance the back arrow
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
  },
  progressTextContainer: {
    position: "relative", // 'absolute' is used to position the text inside the circle
    top: 0,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  percentText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#22c55e",
    marginBottom: 2,
  },
  kwText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "500",
  },
  usageCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginTop: 18,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: "space-between",
  },
  usageCol: {
    flex: 1,
    alignItems: "center",
  },
  usageValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22c55e",
    marginBottom: 2,
  },
  usageLabel: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
  slideBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f9ee",
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 24,
  },
  slideBtnText: {
    color: "#22c55e",
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  slideArrow: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#22c55e",
  },
});
