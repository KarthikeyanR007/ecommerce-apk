import type { ImageSourcePropType } from "react-native";

export type OrdersTab = "previous" | "upcoming" | "cancelled";

export type OrderStatus = "delivered" | "received" | "upcoming" | "cancelled";

export type Order = {
  id: string;
  address: string;
  items: number;
  status: OrderStatus;
  price: number;
  dateTime: string;
  tab: OrdersTab;
  image?: ImageSourcePropType;
  delivery_boy_id?: string | number | null;
  delivery_boy_number?: string | number | null;
};
