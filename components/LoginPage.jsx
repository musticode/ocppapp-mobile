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
import { AppHeader } from "./AppHeader";

export default function LoginPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // todo : store login data in async storage
  const storeLoginData = async (value) => {
    try {
      await AsyncStorage.setItem("loginData", value);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogginButtonPress = () => {
    console.log("Login button pressed");
  };

  const onRegisterButtonPress = () => {
    console.log("Register button pressed");
    navigation.navigate("register");
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Sign In"
        showBackButton={true}
        subtitle="Welcome back"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={onLogginButtonPress}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png",
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={onRegisterButtonPress}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#222",
  },
  registerButton: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
    borderColor: "#ccc",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  loginButton: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 8,
    color: "#888",
    fontSize: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "100%",
    maxWidth: 320,
    justifyContent: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
});
