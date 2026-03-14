import { View, Text, StyleSheet, Image } from "react-native";
import type { Order } from "./types";
import OrderActionRow from "./order_action_row";
import OrderStatusBadge from "./order_status_badge";
import { useEffect } from "react";
import { getImageUrl } from "@/src/utils/image";

type OrderCardProps = {
  order: Order;
  rating?: number;
  onRate?: (rating: number) => void;
  onReorder?: () => void;
  onMessage?: () => void;
  onCall?: (order: Order) => void;
};

export default function OrderCard({
  order,
  rating,
  onRate,
  onReorder,
  onMessage,
  onCall,
}: OrderCardProps) {
  const placeholderImage = require("../../../assets/images/icon.png");
  const imageSource = order.image ? order.image : placeholderImage ;
  const canCall = order.delivery_boy_id != null;
  const handleCall = onCall ? () => onCall(order) : undefined;

  useEffect(()=>{
    console.log('imageSource ===',imageSource);
  },[])

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: getImageUrl(imageSource) }} style={styles.image} />
        </View>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.orderId} numberOfLines={1}>
              {order.id}
            </Text>
            <OrderStatusBadge status={order.status} />
          </View>
          <Text style={styles.address} numberOfLines={1}>
            {order.address}
          </Text>
          <Text style={styles.items}>{order.items} Items</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.dateText}>{order.dateTime}</Text>
        <Text style={styles.priceText}>${order.price.toFixed(2)}</Text>
      </View>

      <OrderActionRow
        status={order.status}
        rating={rating}
        onRate={onRate}
        onReorder={onReorder}
        onMessage={onMessage}
        onCall={handleCall}
        callEnabled={canCall}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  imageWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 46,
    height: 46,
    resizeMode: "contain",
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  orderId: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  address: {
    marginTop: 4,
    fontSize: 11,
    color: "#9CA3AF",
  },
  items: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 11,
    color: "#6B7280",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
});
