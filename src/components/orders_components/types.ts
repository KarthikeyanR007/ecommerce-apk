import type { ImageSourcePropType } from "react-native";

export type OrdersTab = "previous" | "upcoming";

export type OrderStatus = "delivered" | "received" | "upcoming";

export type Order = {
  id: string;
  address: string;
  items: number;
  status: OrderStatus;
  price: number;
  dateTime: string;
  tab: OrdersTab;
  image?: ImageSourcePropType;
};
