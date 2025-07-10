import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LogoutModal({ visible, onClose }: LogoutModalProps) {
  const cancel = () => {
    onClose();
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "refreshToken", "loginData"]);
      onClose();
      router.replace("/login");
    } catch (error) {
      onClose();
      router.replace("/login");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.message}>Are you sure you want to log out?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={cancel}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Text style={styles.logoutBtnText}>Yes, Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: Platform.OS === "ios" ? 36 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#1ec28b",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  cancelBtnText: {
    color: "#1ec28b",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#1ec28b",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  logoutBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
