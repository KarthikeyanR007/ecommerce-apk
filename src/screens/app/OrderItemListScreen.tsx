import { StyleSheet, View, FlatList } from "react-native";
import { useEffect, useMemo, useState } from "react";
import OrdersHeader from "../../components/orders_components/orders_header";
import { api } from "@/src/lib/api"; 
import OrderCardItem from "@/src/components/orders_components/order_card_item";

type OrderItemListScreenProps = {
    orderId: string;
};

export default function OrderItemListScreen({ orderId }: OrderItemListScreenProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [datas, setDatas] = useState<any[]>([]);
    useEffect(()=>{
        if (!orderId) return;
        handleGetOrders(orderId);
    },[orderId]);

    const handleGetOrders = async (orderId: string ) => {
        try {
            const response = await api.get(`/order/get_order_item_list/${orderId}`);
            const payload = response.data?.data ?? response.data?.items ?? response.data ?? [];
            const list = Array.isArray(payload) ? payload : [];
            setDatas(list);
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };

    const toNumber = (value: unknown, fallback = 0) => {
        if (typeof value === "number" && Number.isFinite(value)) return value;
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    };

    const filteredProducts = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        if (!normalizedQuery) return datas;
        return datas.filter((item) =>
          item.product_name?.toLowerCase().includes(normalizedQuery)
        );
      }, [searchQuery, datas]);

    return (
        <View style={styles.screen}>
            <OrdersHeader title="My Order" />
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.product_id.toString()}
                renderItem={({ item }) => (
                    <OrderCardItem 
                      product_name= {item.product_name}
                      product_price= {toNumber(item.product_price)}
                      product_image= {item.product_image || ""}
                      product_id= {item.product_id}
                      product_description= {item.product_description || ""}
                      product_stock= {item.product_stock}
                      quantity = {item.quantity}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  listContent: {
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
});
