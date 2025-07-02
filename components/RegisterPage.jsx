import { View, Text } from "react-native";

export default function RegisterPage() {
  return (
    <View style={styles.container}>
      <Text>RegisterPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
