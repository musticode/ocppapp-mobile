import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

interface NavigationHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  onBackPress?: () => void;
  onHomePress?: () => void;
  rightComponent?: React.ReactNode;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  showHomeButton = false,
  onBackPress,
  onHomePress,
  rightComponent,
}) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const theme = (colorScheme ?? "light") as "light" | "dark";

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const handleHomePress = () => {
    if (onHomePress) {
      onHomePress();
    } else {
      router.push("/(tabs)");
    }
  };

  return (
    <View
      style={[styles.header, { backgroundColor: Colors[theme].background }]}
    >
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity style={styles.iconButton} onPress={handleBackPress}>
            <Icon name="arrow-left" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
        )}
        {showHomeButton && (
          <TouchableOpacity style={styles.iconButton} onPress={handleHomePress}>
            <Icon name="home" size={24} color={Colors[theme].text} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        <Text style={[styles.title, { color: Colors[theme].text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: Colors[theme].text }]}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.rightSection}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50, // Account for status bar
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  leftSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 2,
    alignItems: "center",
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
