import type { ComponentProps } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";

type NavKey = "home" | "favorites" | "orders" | "profile";
type FeatherIconName = ComponentProps<typeof Feather>["name"];

type NavItem = {
  key: NavKey;
  icon: FeatherIconName;
  href: "/home" | "/favorites" | "/orders" | "/profile";
};

const NAV_ITEMS: NavItem[] = [
  { key: "home", icon: "home", href: "/home" },
  { key: "favorites", icon: "heart", href: "/favorites" },
  { key: "orders", icon: "lock", href: "/orders" },
  { key: "profile", icon: "user", href: "/profile" },
];

export default function BottomNav() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(12, 9) }]}>
      <View style={styles.bar}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Pressable
              key={item.key}
              onPress={() => {
                if (!isActive) {
                  router.push(item.href as any);
                }
              }}
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
    bottom: 0,
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
