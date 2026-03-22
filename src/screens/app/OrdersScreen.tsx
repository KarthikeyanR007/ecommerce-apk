import {
  View,
  StyleSheet,
  Linking,
  Platform,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
  const [cancelOrder, setCancelOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);
  const clear = useCartStore((state) => state.clear);
  const cancelReasonPresets = [
    "Ordered by mistake",
    "Change of plans",
    "Found a better price",
    "Delivery taking too long",
  ];

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

  const handleCancelPress = (order: Order) => {
    setCancelOrder(order);
    setCancelReason("");
    setCancelError(null);
  };

  const handleCancelClose = () => {
    setCancelOrder(null);
    setCancelReason("");
    setCancelError(null);
  };

  const handleCancelSubmit = async () => {
    if (!cancelOrder) return;

    const reason = cancelReason.trim();
    if (!reason) {
      setCancelError("Please tell us why you are cancelling.");
      return;
    }

    setCancelError(null);

    try {
      console.log("Cancel order", cancelOrder.id, reason);
      setOrders((prev) => prev.filter((order) => order.id !== cancelOrder.id));
      handleCancelClose();
    } catch (error) {
      console.log("Failed to cancel order", error);
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
          onCancel={handleCancelPress}
        />
      )}
      <Modal
        visible={Boolean(cancelOrder)}
        transparent
        animationType="fade"
        onRequestClose={handleCancelClose}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Cancel Order</Text>
            <Text style={styles.modalSubtitle}>
              Why are you cancelling {cancelOrder?.id}?
            </Text>
            <View style={styles.reasonChips}>
              {cancelReasonPresets.map((reason) => {
                const isSelected = cancelReason.trim() === reason;
                return (
                  <TouchableOpacity
                    key={reason}
                    style={[
                      styles.reasonChip,
                      isSelected && styles.reasonChipActive,
                    ]}
                    onPress={() => {
                      setCancelReason(reason);
                      if (cancelError) setCancelError(null);
                    }}
                  >
                    <Text
                      style={[
                        styles.reasonChipText,
                        isSelected && styles.reasonChipTextActive,
                      ]}
                    >
                      {reason}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TextInput
              style={[
                styles.reasonInput,
                cancelError && styles.reasonInputError,
              ]}
              placeholder="Type your reason"
              value={cancelReason}
              onChangeText={(value) => {
                setCancelReason(value);
                if (cancelError) setCancelError(null);
              }}
              multiline
              maxLength={160}
            />
            {cancelError ? (
              <Text style={styles.errorText}>{cancelError}</Text>
            ) : null}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalKeep]}
                onPress={handleCancelClose}
              >
                <Text style={styles.modalKeepText}>Keep Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancel]}
                onPress={handleCancelSubmit}
              >
                <Text style={styles.modalCancelText}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  modalSubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
  },
  reasonChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  reasonChip: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  reasonChipActive: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FEE2E2",
  },
  reasonChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
  },
  reasonChipTextActive: {
    color: "#DC2626",
  },
  reasonInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 80,
    textAlignVertical: "top",
    fontSize: 12,
    color: "#111827",
    backgroundColor: "#fff",
  },
  reasonInputError: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FFF5F5",
  },
  errorText: {
    marginTop: 6,
    fontSize: 11,
    color: "#DC2626",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  modalKeep: {
    backgroundColor: "#F3F4F6",
  },
  modalCancel: {
    backgroundColor: "#DC2626",
  },
  modalKeepText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  modalCancelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
});
