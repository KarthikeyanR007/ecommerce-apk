import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";

type OrdersHeaderProps = {
  title: string;
  onBack?: () => void;
};

export default function OrdersHeader({ title, onBack }: OrdersHeaderProps) {
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
        <Ionicons name="chevron-back" size={24} color="#111827" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
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
  iconPlaceholder: {
    width: 36,
    height: 36,
  },
});
