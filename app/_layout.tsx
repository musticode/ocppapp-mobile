import React from "react";
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

  // Replace this with your real authentication logic
  const isLoggedIn =
    typeof window !== "undefined" && AsyncStorage.getItem("token");

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
        <Stack>
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
            </>
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
