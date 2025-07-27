import React from "react";
import { View, StyleSheet } from "react-native";
import { AppHeader } from "./AppHeader";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export const ExampleHeaderUsage: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = (colorScheme ?? "light") as "light" | "dark";

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {/* Header with back button and profile button */}
      <AppHeader
        title="My Screen"
        showBackButton={true}
        showProfile={true}
        onProfilePress={() => {
          console.log("Profile button pressed");
        }}
      />

      {/* Content area */}
      <View style={styles.content}>{/* Your screen content goes here */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
