import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { CartItem } from "../../types/types";
import CardHeader from "../../components/card_components/card_header";
import { Colors } from "@/constants/theme";
import CardItem from "@/src/components/card_components/card_item";
import CardTotal from "@/src/components/card_components/card_total_component";
import { useRouter } from "expo-router";

export default function CardScreen() {
  const CART_STORAGE_KEY = "cartItems";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const toNumber = (value: unknown, fallback = 0) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const loadCartItems = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      const parsed = stored ? (JSON.parse(stored) as CartItem[]) : [];
      const normalized = Array.isArray(parsed)
        ? parsed.map((item) => ({
            ...item,
            quantity: toNumber((item as CartItem).quantity, 1),
          }))
        : [];
      setCartItems(normalized);
    } catch (error) {
      console.error("Failed to load cart items", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCartItems();
    }, [loadCartItems])
  );

  useEffect(() => {
    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems)).catch(
      (error) => console.error("Failed to save cart items", error)
    );
  }, [cartItems]);

  useEffect(() => {
    if (!loading && cartItems.length === 0) {
      router.replace("/all-items");
    }
  }, [cartItems.length, loading, router]);

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product_id === productId
            ? {
                ...item,
                quantity: Math.max(1, toNumber(item.quantity, 1) + delta),
              }
            : item
        )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
  };

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + toNumber(item.product_price) * toNumber(item.quantity, 1),
        0
      ),
    [cartItems]
  );

  return (
    <View style={[styles.screen]}>
      <CardHeader />
      {loading ? (
        <Text style={styles.muted}>Loading...</Text>
      ) : cartItems.length === 0 ? (
        <Text style={styles.muted}>Your cart is empty.</Text>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product_id.toString()}
            renderItem={({ item }) => (
                <CardItem 
                  product_name= {item.product_name}
                  product_price= {toNumber(item.product_price)}
                  product_image= {item.product_image || ""}
                  product_id= {item.product_id}
                  product_description= {item.product_description || ""}
                  product_stock= {item.product_stock}
                  quantity={toNumber(item.quantity, 1)}
                  onIncrement={() => updateQuantity(item.product_id, 1)}
                  onDecrement={() => updateQuantity(item.product_id, -1)}
                  onRemove={() => removeItem(item.product_id)}
                />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <CardTotal
            total={toNumber(cartTotal)}
            onPlaceOrder={() => {}}
            onPaymentPress={() => {}}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  muted: {
    fontSize: 14,
    color: "#6B7280",
  },
  content: {
    flex: 1,
    marginTop: 32,
  },
  listContent: {
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  name: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    color: "#111827",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
    textAlign: "right",
  },
});
