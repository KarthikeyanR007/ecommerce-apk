import { View, StyleSheet, Linking, Platform } from "react-native";
import { useMemo, useState, useEffect } from "react";
import BottomNav from "../../components/home_components/bottom_nav";
import OrdersHeader from "../../components/orders_components/orders_header";
import OrdersTabs from "../../components/orders_components/orders_tabs";
import OrderList from "../../components/orders_components/order_list";
import OrdersEmptyState from "../../components/orders_components/orders_empty_state";
import type { Order, OrdersTab, OrderStatus } from "../../components/orders_components/types";
import { api } from "@/src/lib/api"; 
import { useCartStore } from "../../store/cart.store";

const placeholderImage = require("../../../assets/images/icon.png");

type ApiOrder = Record<string, any>;

const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeStatus = (value: unknown): OrderStatus => {
  if (typeof value !== "string") return "upcoming";
  const normalized = value.toLowerCase();
  if (normalized.includes("deliver")) return "delivered";
  if (normalized.includes("receive") || normalized.includes("recive"))
    return "received";
  if (normalized.includes("upcoming")) return "upcoming";
  if (normalized.includes("pending")) return "upcoming";
  if (normalized.includes("process")) return "upcoming";
  return "upcoming";
};

const normalizeTab = (value: unknown, status: OrderStatus): OrdersTab => {
  if (value === "previous" || value === "upcoming") return value;
  return status === "upcoming" ? "upcoming" : "previous";
};

const mapApiOrder = (raw: ApiOrder, index: number): Order => {
  const rawStatus = raw.status ?? raw.order_status ?? raw.delivery_status ?? raw.state;
  const status = normalizeStatus(rawStatus);
  const tab = normalizeTab(raw.tab, status);
  const rawId =
    raw.order_id ??
    raw.id ??
    raw.orderId ??
    raw.order_number ??
    raw.orderNo ??
    raw.code ??
    index + 1;
  const id = String(rawId).startsWith("#") ? String(rawId) : `#${rawId}`;

  const address =
    raw.address ??
    raw.delivery_address ??
    raw.shipping_address ??
    raw.address_line ??
    raw.addressLine ??
    raw.address?.address ??
    "Unknown address";

  const itemsCount =
    toNumber(raw.items ?? raw.items ?? raw.items, 0) ||
    (Array.isArray(raw.items) ? raw.items.length : 0) ||
    0;

  const price = toNumber(raw.total ?? raw.total_price ?? raw.amount ?? raw.price, 0);

  const dateTime =
    raw.date_time ??
    raw.dateTime ??
    raw.created_at ??
    raw.createdAt ??
    raw.order_date ??
    raw.orderDate ??
    "—";

  const image =
    raw.image ??
    raw.thumbnail ??
    raw.product_image ??
    raw.items?.[0]?.image ??
    raw.items?.[0]?.product_image ??
    placeholderImage;

  const deliveryBoyId =
    raw.delivery_boy_id ??
    raw.deliveryBoyId ??
    raw.delivery_boy?.id ??
    raw.deliveryBoy?.id ??
    null;

  const deliveryBoyNumber =
    raw.deliveryBoyNumber ??
    raw.delivery_boy_number ??
    raw.delivery_boy?.phone ??
    raw.delivery_boy?.mobile ??
    raw.deliveryBoy?.phone ??
    raw.deliveryBoy?.mobile ??
    null;

  return {
    id,
    address: String(address),
    items: itemsCount,
    status,
    price,
    dateTime: String(dateTime),
    tab,
    image,
    delivery_boy_id: deliveryBoyId,
    delivery_boy_number: deliveryBoyNumber,
  };
};

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<OrdersTab>("previous");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const clear = useCartStore((state) => state.clear);

  const getOrders = async () => {
    try {
      const response = await api.get("getOrders");
      const rawData =
        response.data?.data ??
        response.data?.orders ??
        response.data ??
        [];
      if (!Array.isArray(rawData)) {
        setOrders([]);
        return;
      }

      const mapped = rawData.map((item, index) => mapApiOrder(item, index));
      setOrders(mapped);
    } catch (error) {
      console.log("error ", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    console.log('activeTab ',activeTab);
    getOrders();
    clear();
  }, []);

  const visibleOrders = useMemo(() => {
    if (activeTab === "upcoming") {
      return orders.filter((order) => order.status === "upcoming");
    }

    return orders.filter((order) => order.status !== "upcoming");
  }, [activeTab, orders]);

  const handleRate = (orderId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [orderId]: rating }));
  };

  const handleReorder = (orderId: string) => {
    console.log("Reorder", orderId);
  };

  const handleMessage = (orderId: string) => {
    console.log("Message", orderId);
  };

  const handleCall = async (order: Order) => {
    const rawNumber = order.delivery_boy_number;
    const phoneNumber = rawNumber == null ? "" : String(rawNumber).trim();

    if (!phoneNumber) {
      console.log("Missing delivery boy number for order", order.id);
      return;
    }

    const telUrl = `tel:${phoneNumber}`;

    try {
      await Linking.openURL(telUrl);
    } catch (error) {
      const hint =
        Platform.OS === "android" || Platform.OS === "ios"
          ? "Dialer may be unavailable on simulators."
          : "Dialer may be unavailable on this platform.";
      console.log("Failed to start call", error, hint);
    }
  };

  return (
    <View style={styles.screen}>
      <OrdersHeader title="My Order" />
      <OrdersTabs activeTab={activeTab} onChange={setActiveTab} />
      {visibleOrders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <OrderList
          orders={visibleOrders}
          ratings={ratings}
          onRate={handleRate}
          onReorder={handleReorder}
          onMessage={handleMessage}
          onCall={handleCall}
        />
      )}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});
