import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import Header from "@/src/components/single_product_components/header";
import ProductDetails from "@/src/components/single_product_components/product_details";
import SimilarProduct from "@/src/components/single_product_components/similar_product";
import { useCartStore } from "@/src/store/cart.store";
import { useAuthStore } from "@/src/store/auth.store";
import { api } from "@/src/lib/api";

type Props = { productId: string; productName?: string };
export default function SingleProductScreen({ productId, productName }: Props) {
    const placeholderImage = require("../../../assets/images/icon.png");
    const router = useRouter();
    const cartItems = useCartStore((state) => state.items);
    const hydrateCart = useCartStore((state) => state.hydrate);
    const user = useAuthStore((state) => state.user);
    const hydrateUser = useAuthStore((state) => state.hydrate);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isFavoriteLoaded, setIsFavoriteLoaded] = useState(false);
    const [productTitle, setProductTitle] = useState<string | null>(
      productName ?? null
    );

    useEffect(() => {
      console.log("product_id 123 ", productId);
      getProductTitle(productId);
    }, [productId]);

    useEffect(() => {
      hydrateCart();
    }, [hydrateCart]);

    useEffect(() => {
      if (!user) {
        hydrateUser();
      }
    }, [user, hydrateUser]);

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

    const getProductTitle = async (productId: string) => {
      try {
        const response = await api.get<string>(`/getProductTitle/${productId}`);
        const title =
          typeof response.data === "string" ? response.data.trim() : "";
        console.log(title);
        if (title) {
          
          setProductTitle(title);
        }
      } catch (error) {
        console.error("Failed to load product title", error);
      }
    };

    const numericProductId = toNumber(productId, 0);
    const userId = user?.id;

    const fetchFavoriteState = async () => {
      if (!userId || !numericProductId) return;
      try {
        const response = await api.post(`/user/favourites/${userId}`);
        const payload = response.data?.data ?? response.data;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        const ids = list
          .map((entry: unknown) => {
            if (typeof entry === "number") return entry;
            if (
              entry &&
              typeof (entry as { product_id?: number }).product_id === "number"
            ) {
              return (entry as { product_id: number }).product_id;
            }
            if (entry && typeof (entry as { id?: number }).id === "number") {
              return (entry as { id: number }).id;
            }
            if (
              entry &&
              typeof (entry as { product?: { product_id?: number } }).product
                ?.product_id === "number"
            ) {
              return (entry as { product: { product_id: number } }).product
                .product_id;
            }
            return null;
          })
          .filter((value: any): value is number => typeof value === "number");

        setIsFavorite(ids.includes(numericProductId));
        setIsFavoriteLoaded(true);
      } catch (error) {
        console.error("Failed to load favorites", error);
        setIsFavoriteLoaded(true);
      }
    };

    useEffect(() => {
      if (userId && numericProductId) {
        fetchFavoriteState();
      }
    }, [userId, numericProductId]);

    const handleToggleFavorite = async () => {
      if (!userId || !numericProductId) return;
      const nextValue = !isFavorite;
      const previous = isFavorite;
      setIsFavorite(nextValue);
      try {
        await api.post(`/user/favourites`, {
          product_id: numericProductId,
          is_favourite: nextValue,
        });
      } catch (error) {
        console.error("Failed to update favorite", error);
        setIsFavorite(previous);
      }
    };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Header
        title={productTitle ?? productName ?? "Product"}
        onBack={() => router.back()}
        isFavorite={isFavorite}
        onToggleFavorite={isFavoriteLoaded ? handleToggleFavorite : undefined}
      />
      <ProductDetails 
        product_id={productId}
      />
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
