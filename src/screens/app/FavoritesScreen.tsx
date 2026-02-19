import { View, Text, StyleSheet } from "react-native";
import BottomNav from "../../components/home_components/bottom_nav";

export default function FavoritesScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>No favorites yet.</Text>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    color: "#6B7280",
  },
});
