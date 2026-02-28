import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useMemo } from "react";
import { useRouter } from "expo-router";
import Header from "@/src/components/single_product_components/header";
import ProductDetails from "@/src/components/single_product_components/product_details";
import SimilarProduct from "@/src/components/single_product_components/similar_product";
import { useCartStore } from "@/src/store/cart.store";

type Props = { productId: string };
export default function SingleProductScreen({ productId }: Props) {
    const placeholderImage = require("../../../assets/images/icon.png");
    const router = useRouter();
    const cartItems = useCartStore((state) => state.items);
    const hydrateCart = useCartStore((state) => state.hydrate);

    useEffect(() => {
      console.log("product_id 123 ", productId);
    }, [productId]);

    useEffect(() => {
      hydrateCart();
    }, [hydrateCart]);

    const toNumber = (value: unknown, fallback = 0) => {
      if (typeof value === "number" && Number.isFinite(value)) return value;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const cartCount = cartItems.reduce(
      (sum, item) => sum + toNumber(item.quantity, 1),
      0
    );
    const cartTotal = useMemo(
      () =>
        cartItems.reduce(
          (sum, item) =>
            sum + toNumber(item.product_price) * toNumber(item.quantity, 1),
          0
        ),
      [cartItems]
    );
    const itemsLabel = cartCount === 1 ? "1 item" : `${cartCount} items`;
    const totalLabel = `$${toNumber(cartTotal).toFixed(2)}`;

    const handleOpenCart = () => {
      router.push("/card");
    };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Header />
      <ProductDetails />
      <SimilarProduct
        product_id={productId}
        bottomCard={
          cartCount > 0
            ? {
                itemsLabel,
                totalLabel,
                buttonLabel: "View Cart",
                onPress: handleOpenCart,
                imageSource: placeholderImage,
              }
            : undefined
        }
      />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffff"
  },
  content: {
    paddingBottom: 16
  }
})
