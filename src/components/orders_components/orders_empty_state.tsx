import { View, Text, StyleSheet } from "react-native";

type OrdersEmptyStateProps = {
  title?: string;
  description?: string;
};

export default function OrdersEmptyState({
  title = "No orders yet",
  description = "Your orders will show up here once you place them.",
}: OrdersEmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    marginTop: 6,
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
