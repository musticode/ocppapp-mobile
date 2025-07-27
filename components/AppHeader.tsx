import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

// Only these icon names are supported by IconSymbol
const allowedIconNames = [
  "house.fill",
  "paperplane.fill",
  "chevron.left.forwardslash.chevron.right",
  "chevron.right",
] as const;
type AllowedIconName = (typeof allowedIconNames)[number];

interface AppHeaderProps {
  title?: string;
  leftIconName?: AllowedIconName;
  onLeftPress?: () => void;
  rightIconName?: AllowedIconName;
  onRightPress?: () => void;
  // Optionally allow passing a custom icon component for more flexibility
  leftIconComponent?: React.ReactNode;
  rightIconComponent?: React.ReactNode;
  showBackButton?: boolean;
  showProfile?: boolean;
  showNotifications?: boolean;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  subtitle?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = "My App",
  leftIconName,
  onLeftPress,
  rightIconName,
  onRightPress,
  leftIconComponent,
  rightIconComponent,
  showBackButton = false,
  showProfile = false,
  showNotifications = false,
  onProfilePress,
  onNotificationPress,
  subtitle,
}) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const theme = (colorScheme ?? "light") as "light" | "dark";

  const handleBackPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      router.back();
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push("/(tabs)/profile");
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      // Navigate to notifications or show notification modal
      console.log("Notifications pressed");
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerBar}>
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={handleBackPress}
            >
              <Icon name="arrow-left" size={24} color="#B0B0B0" />
            </TouchableOpacity>
          ) : leftIconComponent ? (
            leftIconComponent
          ) : leftIconName ? (
            <TouchableOpacity style={styles.headerIcon} onPress={onLeftPress}>
              <IconSymbol name={leftIconName} size={26} color="#B0B0B0" />
            </TouchableOpacity>
          ) : (
            <View style={styles.headerIcon} />
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.rightSection}>
          {showNotifications && (
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={handleNotificationPress}
            >
              <Icon name="bell-outline" size={24} color="#B0B0B0" />
            </TouchableOpacity>
          )}

          {showProfile && (
            <TouchableOpacity
              style={styles.profileButton}
              onPress={handleProfilePress}
            >
              <View style={styles.profileAvatar}>
                <Icon name="account" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          )}

          {rightIconComponent ? (
            rightIconComponent
          ) : rightIconName ? (
            <TouchableOpacity style={styles.headerIcon} onPress={onRightPress}>
              <IconSymbol name={rightIconName} size={24} color="#B0B0B0" />
            </TouchableOpacity>
          ) : (
            <View style={styles.headerIcon} />
          )}
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#2E6F40", // Dark blue background
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40, // Account for status bar
    paddingBottom: 10,
    paddingHorizontal: 10,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFFFFF", // Light gray text
    fontFamily: "System",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 2,
    color: "#FFFFFF", // Light gray text
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 40,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0a7ea4",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#B0B0B0", // Light gray separator line
  },
});
