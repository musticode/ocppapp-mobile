import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

export default function QRScanner() {
  const router = useRouter();
  const [scanning, setScanning] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);

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

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    console.log("Barcode scanned:", scanningResult.data);
    setScanning(false);
    setScannedData(scanningResult.data);
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
        <TouchableOpacity style={styles.scanBtn}>
          <Text style={styles.scanBtnText}>Scan QR Code</Text>
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
