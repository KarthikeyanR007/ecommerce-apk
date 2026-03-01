import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";

type FavoritesHeaderProps = {
  title: string;
  onBack?: () => void;
  onSearchPress?: () => void;
  isSearchOpen?: boolean;
};

export default function FavoritesHeader({
  title,
  onBack,
  onSearchPress,
  isSearchOpen,
}: FavoritesHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.light.background }, { paddingTop: Math.max(insets.top, 12) }]}>
      <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={22} color="#111827" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
        <Ionicons
          name={isSearchOpen ? "close" : "search-outline"}
          size={20}
          color="#111827"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#F3F4F6",
  },
});
