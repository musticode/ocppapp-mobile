import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AppHeader } from "@/components/AppHeader";
import AddCardModal from "@/components/AddCardModal";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = (colorScheme ?? "light") as "light" | "dark";

  // header: () => <AppHeader />, // Use custom header component instead
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        // headerShown: true,
        // header: () => null,
        headerShown: false,
        // header: () => <AppHeader />,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            // <Icon name="home" size={24} color="black" />
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: true,
          header: () => <AppHeader title="Transactions" />,
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            // <Icon name="credit-card" size={24} color="black" />
            // <AntDesign name="creditcard" size={24} color="black" / >
            // <MaterialCommunityIcons
            //   name="battery-charging-90"
            //   color="#000"
            //   size={24}
            // />
            <AntDesign name="barschart" color="#000" size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="qrscanner"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            // <Icon name="scan" size={24} color="black" />
            // <AntDesign name="scan1" size={24} color="black" />
            <FontAwesome name="bolt" color="#000" size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="vehicle"
        options={{
          title: "Vehicle",
          tabBarIcon: ({ color }) => (
            // <Icon name="car-electric" size={24} color="black" />
            // <AntDesign name="car" size={24} color="black" />
            // <Ionicons name="car-sport-sharp" color="#000" size={24} />
            <Ionicons name="car-sport-outline" color="#000" size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          header: () => (
            <AppHeader
              title="Profile"
              rightIconComponent={
                <AntDesign name="setting" color="#000" size={24} />
              }
            />
          ),
          title: "Profile",
          tabBarIcon: ({ color }) => (
            // <Icon name="account" size={24} color="black" />
            // <AntDesign name="user" size={24} color="black" />
            <AntDesign name="user" color="#000" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
