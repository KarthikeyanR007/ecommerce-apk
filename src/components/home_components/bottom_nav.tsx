import { useState } from "react";
import type { ComponentProps } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

type NavKey = "home" | "favorites" | "orders" | "profile";
type FeatherIconName = ComponentProps<typeof Feather>["name"];

const NAV_ITEMS: Array<{ key: NavKey; icon: FeatherIconName }> = [
  { key: "home", icon: "home" },
  { key: "favorites", icon: "heart" },
  { key: "orders", icon: "lock" },
  { key: "profile", icon: "user" },
];

export default function BottomNav() {
  const [active, setActive] = useState<NavKey>("home");
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(12, insets.bottom) }]}>
      <View style={styles.bar}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => setActive(item.key)}
              style={({ pressed }) => [
                styles.item,
                pressed && styles.itemPressed,
                isActive && styles.itemActive,
              ]}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Feather
                  name={item.icon}
                  size={22}
                  color={isActive ? "#2FB463" : "#1F2937"}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 8,
  },
  bar: {
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 10,
  },
  item: {
    padding: 8,
  },
  itemPressed: {
    opacity: 0.7,
  },
  itemActive: {},
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "#E8F7EC",
  },
});
