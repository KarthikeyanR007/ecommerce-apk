import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CardItem from "@/src/components/card_components/card_item";
import CardTotal from "@/src/components/card_components/card_total_component";
import { useRouter } from "expo-router";
import  TopHeader  from "../../components/allitems_components/top_header";
import { useCartStore } from "../../store/cart.store";

export default function CardScreen() {
  const cartItems = useCartStore((state) => state.items);
  const hydrateCart = useCartStore((state) => state.hydrate);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toNumber = (value: unknown, fallback = 0) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return cartItems;
    return cartItems.filter((item) =>
      item.product_name?.toLowerCase().includes(normalizedQuery)
    );
  }, [searchQuery, cartItems]);

  useFocusEffect(
    useCallback(() => {
      hydrateCart();
    }, [hydrateCart])
  );

  useEffect(() => {
    if (isHydrated && cartItems.length === 0) {
      router.replace("/all-items");
    }
  }, [cartItems.length, isHydrated, router]);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + toNumber(item.product_price) * toNumber(item.quantity, 1),
        0
      ),
    [cartItems]
  );

  const handleOrder = async() => {
      console.log('cartItems ',cartItems);
  }

  return (
    <View style={[styles.screen]}>
      <TopHeader
        title={"Your Card"}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {!isHydrated ? (
        <Text style={styles.muted}>Loading...</Text>
      ) : cartItems.length === 0 ? (
        <Text style={styles.muted}>Your cart is empty.</Text>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={filteredProducts}
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
            onPlaceOrder={() => handleOrder()}
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
