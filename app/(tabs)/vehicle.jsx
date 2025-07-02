import { View, Text, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

export default function Vehicle() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#F8F9FB", dark: "#121212" }}
    >
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerIcon}>
          <IconSymbol name="chevron.left" size={26} color="#222" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Vehicle
        </ThemedText>
        <TouchableOpacity style={styles.headerIcon}>
          <IconSymbol name="ellipsis" size={24} color="#222" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Vehicle</Text>
      </View>
    </ParallaxScrollView>
  );
}

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
