import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type OrderRatingRowProps = {
  value?: number;
  max?: number;
  onSelect?: (rating: number) => void;
};

export default function OrderRatingRow({
  value,
  max = 5,
  onSelect,
}: OrderRatingRowProps) {
  const isInteractive = typeof onSelect === "function";
  return (
    <View style={styles.row}>
      {Array.from({ length: max }).map((_, index) => {
        const rating = index + 1;
        const isActive = typeof value === "number" && rating <= value;
        return (
          <TouchableOpacity
            key={rating}
            disabled={!isInteractive}
            onPress={() => onSelect?.(rating)}
            style={[styles.pill, isActive && styles.pillActive]}
          >
            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
              {rating}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pill: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  pillActive: {
    backgroundColor: "#E8F7EC",
    borderColor: "#5AC268",
  },
  pillText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  pillTextActive: {
    color: "#2FB463",
  },
});
