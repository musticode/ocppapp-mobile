import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, View, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// Custom Tab Icon Component
const TabIcon = ({
  name,
  focused,
  color,
  size = 24,
}: {
  name: any;
  focused: boolean;
  color: string;
  size?: number;
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";

  return (
    <View style={styles.iconContainer}>
      <Icon
        name={name}
        size={size}
        color={
          focused
            ? Colors[theme as keyof typeof Colors].tint
            : Colors[theme as keyof typeof Colors].tabIconDefault
        }
      />
      {focused && (
        <View
          style={[
            styles.activeIndicator,
            { backgroundColor: Colors[theme as keyof typeof Colors].tint },
          ]}
        />
      )}
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme as keyof typeof Colors].tint,
        tabBarInactiveTintColor:
          Colors[theme as keyof typeof Colors].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: "absolute",
              height: 88,
              paddingBottom: 20,
              paddingTop: 8,
            },
            android: {
              height: 70,
              paddingBottom: 8,
              paddingTop: 8,
              elevation: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            default: {
              height: 70,
              paddingBottom: 8,
              paddingTop: 8,
            },
          }),
          backgroundColor: Colors[theme as keyof typeof Colors].background,
          borderTopWidth: 1,
          borderTopColor: Colors[theme as keyof typeof Colors].icon + "20",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="home" focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="format-list-bulleted"
              focused={focused}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="qrscanner"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="qrcode-scan" focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="vehicle"
        options={{
          title: "Vehicle",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="car-electric" focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="account" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
