import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  if (!loaded || isLoggedIn === null) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </>
          ) : (
            <>
              <Stack.Screen name="landing" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ headerShown: false }} />
              <Stack.Screen name="payments" options={{ headerShown: false }} />
              <Stack.Screen
                name="helpcenter"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="passwordmanager"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="privacypolicy"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="myvehicle" options={{ headerShown: false }} />
              <Stack.Screen
                name="personalinfo"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="personalinfo"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="activesession"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="notification"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="startcharging"
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
