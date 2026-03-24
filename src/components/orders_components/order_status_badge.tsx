import { View, Text, StyleSheet } from "react-native";
import type { OrderStatus } from "./types";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  delivered: "Delivered",
  received: "Received",
  upcoming: "Upcoming",
  cancelled: "Cancelled",
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const badgeStyle =
    status === "delivered"
      ? styles.delivered
      : status === "received"
        ? styles.received
        : status === "cancelled"
          ? styles.cancelled
        : styles.upcoming;
  const textStyle =
    status === "delivered"
      ? styles.deliveredText
      : status === "received"
        ? styles.receivedText
        : status === "cancelled"
          ? styles.cancelledText
        : styles.upcomingText;

  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.text, textStyle]}>{STATUS_LABELS[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 10,
    fontWeight: "700",
  },
  delivered: {
    backgroundColor: "#F3F4F6",
  },
  deliveredText: {
    color: "#9CA3AF",
  },
  received: {
    backgroundColor: "#E8F7EC",
  },
  receivedText: {
    color: "#2FB463",
  },
  upcoming: {
    backgroundColor: "#DBEAFE",
  },
  upcomingText: {
    color: "#2563EB",
  },
  cancelled: {
    backgroundColor: "#FEE2E2",
  },
  cancelledText: {
    color: "#DC2626",
  },
});
