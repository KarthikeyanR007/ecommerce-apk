import { View, StyleSheet } from "react-native";
import { useMemo, useState } from "react";
import BottomNav from "../../components/home_components/bottom_nav";
import OrdersHeader from "../../components/orders_components/orders_header";
import OrdersTabs from "../../components/orders_components/orders_tabs";
import OrderList from "../../components/orders_components/order_list";
import OrdersEmptyState from "../../components/orders_components/orders_empty_state";
import type { Order, OrdersTab } from "../../components/orders_components/types";

const placeholderImage = require("../../../assets/images/icon.png");

const SAMPLE_ORDERS: Order[] = [
  {
    id: "#2789076356",
    address: "4517 Washington Ave.",
    items: 10,
    status: "delivered",
    price: 22,
    dateTime: "10 Apr 2023 at 07:45 PM",
    tab: "previous",
    image: placeholderImage,
  },
  {
    id: "#8901239908",
    address: "4517 Washington Ave.",
    items: 10,
    status: "delivered",
    price: 50,
    dateTime: "10 Apr 2023 at 07:45 PM",
    tab: "previous",
    image: placeholderImage,
  },
  {
    id: "#33098890165",
    address: "4517 Washington Ave.",
    items: 5,
    status: "delivered",
    price: 45,
    dateTime: "10 Apr 2023 at 07:45 PM",
    tab: "previous",
    image: placeholderImage,
  },
  {
    id: "#4789076356",
    address: "4570 Washington Ave.",
    items: 12,
    status: "received",
    price: 32,
    dateTime: "12 Apr 2023 at 01:15 PM",
    tab: "upcoming",
    image: placeholderImage,
  },
  {
    id: "#9801239908",
    address: "4530 Washington Ave.",
    items: 8,
    status: "received",
    price: 58,
    dateTime: "12 Apr 2023 at 02:15 PM",
    tab: "upcoming",
    image: placeholderImage,
  },
];

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<OrdersTab>("previous");
  const [ratings, setRatings] = useState<Record<string, number>>({});


  const visibleOrders = useMemo(
    () => SAMPLE_ORDERS.filter((order) => order.tab === activeTab),
    [activeTab]
  );

  const handleRate = (orderId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [orderId]: rating }));
  };

  const handleReorder = (orderId: string) => {
    console.log("Reorder", orderId);
  };

  const handleMessage = (orderId: string) => {
    console.log("Message", orderId);
  };

  const handleCall = (orderId: string) => {
    console.log("Call", orderId);
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
