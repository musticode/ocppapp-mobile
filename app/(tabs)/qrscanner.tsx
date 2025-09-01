import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import axiosService from "@/service/axiosService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { selectUserIdTagInfo } from "@/store/reducers/userSlice";
import {
  setChargeBoxIdentifier,
  setChargeBoxName,
  setChargeBoxStatus,
} from "@/store/reducers/chargeBoxSlice";
import { setChargeBoxLocation } from "@/store/reducers/chargeBoxSlice";
import { useDispatch } from "react-redux";

export default function QRScanner() {
  const router = useRouter();
  const userIdTagInfo = useSelector(selectUserIdTagInfo);
  const dispatch = useDispatch();
  const [scanning, setScanning] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [chargeBoxId, setChargeBoxId] = useState<string | null>(null);
  const [chargeBox, setChargeBox] = useState<any>(null);

  const fetchChargeBox = async (chargeBoxIdentifier: string) => {
    console.log("Fetching charge box:", chargeBoxIdentifier);

    console.log(
      "Fetching connector status for charge box:",
      chargeBoxIdentifier
    );

    try {
      const response = await axiosService.get(`/charge-box/cp`, {
        params: {
          identifier: chargeBoxIdentifier,
        },
      });

      console.log("Charge box:", response.data);
      if (response.status === 200) {
        setChargeBox(response.data);
      } else {
        console.log("Failed to fetch charge box");
      }
    } catch (error) {
      console.error("Error fetching charge box:", error);
    }
  };

  const sendRemoteStartTransactionRequest = async (
    chargeBoxId: string,
    userIdTagInfo: string | null,
    connectorId: number
  ) => {
    console.log(
      "Sending remote start transaction request to charge box:",
      chargeBoxId
    );
    console.log("User ID tag info:", userIdTagInfo);
    const response = await axiosService.post(
      "/trigger-message/remoteStartTransaction",
      {
        chargeBoxId,
        userIdTagInfo,
        connectorId,
      }
    );
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
    console.log("Response message:", response.data.message);
    console.log("Response currentTime:", response.data.currentTime);

    if (response.status === 200) {
      router.push("/activesession");
    } else {
      console.log("Failed to send remote start transaction request");
      router.push("/");
    }
  };

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.permissionText}>
            We need your permission to show the camera
          </Text>
          <TouchableOpacity style={styles.scanBtn} onPress={requestPermission}>
            <Text style={styles.scanBtnText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleBarcodeScanned = async (
    scanningResult: BarcodeScanningResult
  ) => {
    console.log("Barcode scanned:", scanningResult.data);
    setScanning(false);
    setScanned(true);
    setScannedData(scanningResult.data);
    setChargeBoxId(scanningResult.data);

    // const chargeBoxId = scanningResult.data;
    console.log("Charge box ID:", chargeBoxId);
    console.log("User ID tag info:", userIdTagInfo);

    if (chargeBoxId && userIdTagInfo && scanned === true) {
      // sendRemoteStartTransactionRequest(chargeBoxId, userIdTagInfo);
    } else {
      // Alert.alert("Error", "Invalid charge box ID");
      console.log("Invalid charge box ID");
    }
  };

  // todo : update this function
  const onPressRequestStartTransaction = () => {
    console.log("Request start transaction");

    if (scannedData) {
      fetchChargeBox(scannedData);

      //todo: remove this
      // fetchChargeBox("CP_SIM1");
    }

    if (chargeBoxId && userIdTagInfo) {
      const availableConnector = chargeBox?.connectors.find(
        (connector: any) => connector.connectorStatus === "Available"
      );
      console.log("Available connector:", availableConnector);
      if (availableConnector) {
        console.log("Sending remote start transaction request");
        sendRemoteStartTransactionRequest(
          chargeBoxId,
          userIdTagInfo,
          availableConnector.id
        );

        console.log("Setting charge box identifier");
        dispatch(setChargeBoxIdentifier(chargeBoxId));
        dispatch(setChargeBoxName(chargeBox?.name));
        dispatch(setChargeBoxStatus(chargeBox?.status));
        dispatch(setChargeBoxLocation(chargeBox?.location));

        router.push("/startcharging");
      } else {
        console.log("No available connector");
      }
    } else {
      console.log("Invalid charge box ID or user ID tag info");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.title}>Scan Bar code</Text>
          <View style={{ width: 32 }} />
        </View>
        {/* Scanner Frame with Camera */}
        <View style={styles.scannerFrameWrap}>
          <View style={styles.scannerFrame}>
            <CameraView
              style={styles.camera}
              // Add barcode scanning logic as needed
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
            />
            {/* Green corners */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
        </View>
        {/* Scanning text */}
        <Text style={styles.scanningText}>
          {scanning ? "Scanning Code..." : scannedData}
        </Text>
        {/* Icon row */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="image-outline" size={26} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons
              name="keyboard-outline"
              size={26}
              color="#888"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="flash-outline" size={26} color="#888" />
          </TouchableOpacity>
        </View>
        {/* Scan button */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => onPressRequestStartTransaction()}
        >
          <Text style={styles.scanBtnText}>Request Start Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
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
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    flex: 1,
  },
  scannerFrameWrap: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  scannerFrame: {
    width: 220,
    height: 220,
    borderRadius: 18,
    backgroundColor: "#f8fefb",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 8,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  corner: {
    position: "absolute",
    width: 38,
    height: 38,
    borderColor: "#1ec28b",
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRadius: 18,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderRadius: 18,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderRadius: 18,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 18,
  },
  scanningText: {
    fontSize: 16,
    color: "#888",
    marginVertical: 10,
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  scanBtn: {
    width: "100%",
    height: 48,
    backgroundColor: "#1ec28b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  scanBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  permissionText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
});
