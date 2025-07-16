import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import axiosService from "../service/axiosService";
import { router } from "expo-router";

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const storeLoginData = async (value) => {
    try {
      await AsyncStorage.setItem("loginData", value);
    } catch (e) {
      console.log(e);
    }
  };

  const loginWithEmail = async (email, password) => {
    if (!email || !password) {
      console.log("Please enter your email and password");
      return;
    }

    const requestData = {
      mail: email,
      password: password,
    };

    /**
     * test user
     * {
     * "mail": "mustafakaratas2345@mail.com",
     * "password": "mustafakaratas1"
     * }
     *
     */

    try {
      const response = await axiosService.post(
        "/auth/customerLogin",
        requestData
      );

      console.log(response);

      if (response.status === 200) {
        storeLoginData(response.data);
        await AsyncStorage.setItem("token", response.data.token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLogginButtonPress = () => {
    console.log("Login button pressed");
    loginWithEmail(email, password);
  };

  const onRegisterButtonPress = () => {
    navigation.navigate("register");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Hi! Welcome back, you&apos;ve been missed
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="**************"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPasswordBtn}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={onLogginButtonPress}
        >
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or sign in with</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="apple" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="facebook" size={24} color="#1877F3" />
          </TouchableOpacity>
        </View>
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={onRegisterButtonPress}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
    marginTop: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#e0e0e0",
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fafbfc",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },
  forgotPasswordBtn: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 2,
  },
  forgotPasswordText: {
    color: "#1ec28b",
    fontSize: 14,
    fontWeight: "500",
  },
  signInButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#1ec28b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    fontSize: 15,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 18,
    marginTop: 2,
  },
  socialBtn: {
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
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  signupText: {
    color: "#888",
    fontSize: 15,
  },
  signupLink: {
    color: "#1ec28b",
    fontWeight: "bold",
    fontSize: 15,
  },
});
