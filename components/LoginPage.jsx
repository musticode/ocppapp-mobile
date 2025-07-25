import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  setUserIdTagInfo,
  setUserToken,
  setUserEmail,
  setUserPhone,
  setUserRole,
  selectUserEmail,
  selectUserToken,
} from "../store/reducers/userSlice";

export default function LoginPage() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const userToken = useSelector(selectUserToken);

  // Monitor Redux state changes
  useEffect(() => {
    console.log("Redux state updated - Email:", userEmail);
    console.log("Redux state updated - Token:", userToken);
  }, [userEmail, userToken]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const storeLoginData = async (value) => {
    try {
      await AsyncStorage.setItem("loginData", JSON.stringify(value));
    } catch (e) {
      console.log("Error storing login data:", e);
    }
  };

  const loginWithEmail = async (email, password) => {
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    setIsLoading(true);
    setError("");

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

      console.log("Login response:", response);

      if (response.status === 200 && response.data) {
        // Store login data
        await storeLoginData(response.data);
        await AsyncStorage.setItem("token", response.data.token);

        // Dispatch user data to Redux store
        if (response.data.id) {
          dispatch(setUserId(response.data.id));
        }
        if (response.data.userIdTagInfo) {
          dispatch(setUserIdTagInfo(response.data.userIdTagInfo));
        }
        if (response.data.token) {
          dispatch(setUserToken(response.data.token));
        }
        if (response.data.email) {
          dispatch(setUserEmail(response.data.email));
        }
        if (response.data.phoneNumber) {
          dispatch(setUserPhone(response.data.phoneNumber));
        }
        if (response.data.role) {
          dispatch(setUserRole(response.data.role));
        }

        console.log("User email stored:", response.data.email);
        console.log("User token stored:", response.data.token);

        // Verify Redux state after dispatch
        console.log("Redux state - Email:", response.data.email);
        console.log("Redux state - Token:", response.data.token);

        // Navigate to home
        router.push("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.log("Login error:", error);
      if (error.response) {
        setError(error.response.data?.message || "Login failed");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
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

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

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
          style={[
            styles.signInButton,
            isLoading && styles.signInButtonDisabled,
          ]}
          onPress={onLogginButtonPress}
          disabled={isLoading}
        >
          <Text style={styles.signInButtonText}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Text>
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
  errorContainer: {
    width: "100%",
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  errorText: {
    color: "#c62828",
    fontSize: 14,
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
  signInButtonDisabled: {
    backgroundColor: "#cccccc",
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
