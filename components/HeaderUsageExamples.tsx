import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppHeader } from "./AppHeader";
import { HeaderWithMapExample } from "./HeaderWithMapExample";

export const HeaderUsageExamples: React.FC = () => {
  const handleSearchPress = () => {
    console.log("Search button pressed");
  };

  const handleNotificationPress = () => {
    console.log("Notification button pressed");
  };

  const handleEnterMapsPress = () => {
    console.log("Enter Maps button pressed");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Header Design Examples</Text>

      {/* Example 1: Default header with app logo */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>1. Default Header with App Logo</Text>
        <AppHeader
          title="Ngecass"
          showAppLogo={true}
          showSearchButton={true}
          showNotificationButton={true}
          onSearchPress={handleSearchPress}
          onNotificationPress={handleNotificationPress}
        />
      </View>

      {/* Example 2: Header with custom title */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>2. Header with Custom Title</Text>
        <AppHeader
          title="My Custom App"
          subtitle="Welcome back!"
          showSearchButton={true}
          showNotificationButton={true}
          onSearchPress={handleSearchPress}
          onNotificationPress={handleNotificationPress}
        />
      </View>

      {/* Example 3: Header with back button */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>3. Header with Back Button</Text>
        <AppHeader
          title="Details"
          showBackButton={true}
          showSearchButton={true}
          onSearchPress={handleSearchPress}
        />
      </View>

      {/* Example 4: Header with profile button */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>4. Header with Profile Button</Text>
        <AppHeader
          title="Profile"
          showProfile={true}
          showNotificationButton={true}
          onNotificationPress={handleNotificationPress}
        />
      </View>

      {/* Example 5: Header with background image (Map example) */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>5. Header with Background Image</Text>
        <HeaderWithMapExample
          onSearchPress={handleSearchPress}
          onNotificationPress={handleNotificationPress}
          onEnterMapsPress={handleEnterMapsPress}
        />
      </View>

      {/* Example 6: Minimal header */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>6. Minimal Header</Text>
        <AppHeader
          title="Simple"
          showAppLogo={false}
          showSearchButton={false}
          showNotificationButton={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333333",
  },
  exampleContainer: {
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    padding: 16,
    paddingBottom: 8,
  },
});
