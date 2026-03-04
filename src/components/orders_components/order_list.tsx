import { FlatList, StyleSheet } from "react-native";
import type { Order } from "./types";
import OrderCard from "./order_card";

type OrderListProps = {
  orders: Order[];
  ratings?: Record<string, number>;
  onRate?: (orderId: string, rating: number) => void;
  onReorder?: (orderId: string) => void;
  onMessage?: (orderId: string) => void;
  onCall?: (order: Order) => void;
};

export default function OrderList({
  orders,
  ratings,
  onRate,
  onReorder,
  onMessage,
  onCall,
}: OrderListProps) {
  return (
    <FlatList
      style={styles.list}
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <OrderCard
          order={item}
          rating={ratings?.[item.id]}
          onRate={(rating) => onRate?.(item.id, rating)}
          onReorder={() => onReorder?.(item.id)}
          onMessage={() => onMessage?.(item.id)}
          onCall={onCall}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
});
