import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppHeader } from "./AppHeader";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export const HeaderExamples: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = (colorScheme ?? "light") as "light" | "dark";

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Example 1: Basic header with back button and profile */}
        <View style={styles.exampleSection}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            Basic Header with Back & Profile
          </Text>
          <AppHeader
            title="My Screen"
            showBackButton={true}
            showProfile={true}
          />
        </View>

        {/* Example 2: Header with subtitle */}
        <View style={styles.exampleSection}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            Header with Subtitle
          </Text>
          <AppHeader
            title="Charging Station"
            subtitle="Station #1234"
            showBackButton={true}
            showProfile={true}
          />
        </View>

        {/* Example 3: Header with notifications */}
        <View style={styles.exampleSection}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            Header with Notifications
          </Text>
          <AppHeader
            title="Dashboard"
            showBackButton={true}
            showProfile={true}
            showNotifications={true}
          />
        </View>

        {/* Example 4: Custom left icon */}
        <View style={styles.exampleSection}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            Custom Left Icon
          </Text>
          <AppHeader
            title="Settings"
            leftIconName="house.fill"
            showProfile={true}
          />
        </View>

        {/* Example 5: Profile only */}
        <View style={styles.exampleSection}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            Profile Button Only
          </Text>
          <AppHeader title="Home" showProfile={true} />
        </View>

        {/* Example 6: Back button only */}
        <View style={styles.exampleSection}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            Back Button Only
          </Text>
          <AppHeader title="Details" showBackButton={true} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  exampleSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
