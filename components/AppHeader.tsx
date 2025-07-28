import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
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
  onSearchPress?: () => void;
  subtitle?: string;
  // New props for image support
  backgroundImage?: any;
  showAppLogo?: boolean;
  appLogoSource?: any;
  showSearchButton?: boolean;
  showNotificationButton?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = "EV Charge",
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
  onSearchPress,
  subtitle,
  backgroundImage,
  showAppLogo = true,
  appLogoSource,
  showSearchButton = false,
  showNotificationButton = true,
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

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      console.log("Search pressed");
    }
  };

  const HeaderContent = () => (
    <View style={styles.headerBar}>
      <View style={styles.leftSection}>
        {showBackButton ? (
          <TouchableOpacity style={styles.headerIcon} onPress={handleBackPress}>
            <Icon name="arrow-left" size={24} color="#000000" />
          </TouchableOpacity>
        ) : showAppLogo ? (
          <View style={styles.logoContainer}>
            <View style={styles.appLogo}>
              <Icon name="lightning-bolt" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.appTitle}>{title}</Text>
          </View>
        ) : leftIconComponent ? (
          leftIconComponent
        ) : leftIconName ? (
          <TouchableOpacity style={styles.headerIcon} onPress={onLeftPress}>
            <IconSymbol name={leftIconName} size={26} color="#000000" />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerIcon} />
        )}
      </View>

      <View style={styles.centerSection}>
        {!showAppLogo && (
          <>
            <Text style={styles.headerTitle}>{title}</Text>
            {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
          </>
        )}
      </View>

      <View style={styles.rightSection}>
        {showSearchButton && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSearchPress}
          >
            <Icon name="magnify" size={20} color="#000000" />
          </TouchableOpacity>
        )}

        {showNotificationButton && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNotificationPress}
          >
            <Icon name="bell-outline" size={20} color="#000000" />
          </TouchableOpacity>
        )}

        {showNotifications && !showNotificationButton && (
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={handleNotificationPress}
          >
            <Icon name="bell-outline" size={24} color="#000000" />
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
            <IconSymbol name={rightIconName} size={24} color="#000000" />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerIcon} />
        )}
      </View>
    </View>
  );

  if (backgroundImage) {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          source={backgroundImage}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <HeaderContent />
        </ImageBackground>
        <View style={styles.separator} />
      </View>
    );
  }

  return (
    <View style={styles.headerContainer}>
      <HeaderContent />
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFFFFF", // White background to match the image
  },
  headerBackground: {
    width: "100%",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40, // Account for status bar
    paddingBottom: 10,
    paddingHorizontal: 16,
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4CAF50", // Green background to match the image
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000", // Black text to match the image
    fontFamily: "System",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000", // Black text to match the image
    fontFamily: "System",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 2,
    color: "#666666", // Dark gray subtitle
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#E0E0E0", // Light gray separator line
  },
});
