import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { OrdersTab } from "./types";

type OrdersTabsProps = {
  activeTab: OrdersTab;
  onChange: (next: OrdersTab) => void;
};

const TABS: { key: OrdersTab; label: string }[] = [
  { key: "previous", label: "Previous" },
  { key: "upcoming", label: "Upcoming" },
  { key: "cancelled", label: "Cancelled" },
];

export default function OrdersTabs({ activeTab, onChange }: OrdersTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 4,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#5AC268",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#fff",
  },
});
