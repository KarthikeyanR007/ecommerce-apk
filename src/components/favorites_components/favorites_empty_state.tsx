import { View, Text, StyleSheet } from "react-native";

type FavoritesEmptyStateProps = {
  title?: string;
  description?: string;
};

export default function FavoritesEmptyState({
  title = "No favorites yet",
  description = "Tap the heart on any product to save it here.",
}: FavoritesEmptyStateProps) {
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
