import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

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
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = "My App",
  leftIconName,
  onLeftPress,
  rightIconName,
  onRightPress,
  leftIconComponent,
  rightIconComponent,
}) => {
  return (
    <View style={styles.headerBar}>
      {leftIconComponent ? (
        leftIconComponent
      ) : leftIconName ? (
        <TouchableOpacity style={styles.headerIcon} onPress={onLeftPress}>
          <IconSymbol name={leftIconName} size={26} color="#222" />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerIcon} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {rightIconComponent ? (
        rightIconComponent
      ) : rightIconName ? (
        <TouchableOpacity style={styles.headerIcon} onPress={onRightPress}>
          <IconSymbol name={rightIconName} size={24} color="#222" />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerIcon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 4,
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    flex: 1,
    textAlign: "center",
  },
  headerIcon: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
