import { View, StyleSheet } from "react-native";
import { useEffect, useMemo, useState } from "react";
import FavoritesHeader from "../../components/favorites_components/favorites_header";
import FavoritesSearch from "../../components/favorites_components/favorites_search";
import FavoritesList from "../../components/favorites_components/favorites_list";
import FavoritesEmptyState from "../../components/favorites_components/favorites_empty_state";
import BottomCard from "../../components/allitems_components/bottom_card";
import BottomNav from "../../components/home_components/bottom_nav";
import { useAuthStore } from "../../store/auth.store";
import { useCartStore } from "../../store/cart.store";
import { api } from "../../lib/api";
import type { Product } from "../../types/types";
import { useRouter } from "expo-router";

const FAVORITES_LIST_ENDPOINT = "/user/favourites";
const FAVORITES_TOGGLE_ENDPOINT = "/user/favourites";
const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeFavoritePayload = (payload: unknown) => {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown })?.data)
      ? (payload as { data: unknown[] }).data
      : Array.isArray((payload as { favorites?: unknown })?.favorites)
        ? ((payload as { favorites: unknown[] }).favorites as unknown[])
        : [];

  const ids: number[] = [];
  const productsMap = new Map<number, Product>();

  list.forEach((entry) => {
    if (typeof entry === "number") {
      ids.push(entry);
      return;
    }

    if (!entry || typeof entry !== "object") return;
    const obj = entry as Record<string, any>;
    const product = (obj.product ?? obj.item ?? obj) as Record<string, any>;
    const rawId =
      obj.product_id ??
      obj.id ??
      product?.product_id ??
      product?.id ??
      null;

    if (typeof rawId === "number") {
      ids.push(rawId);
    }

    if (
      product &&
      typeof product === "object" &&
      typeof product.product_id === "number" &&
      typeof product.product_name === "string"
    ) {
      productsMap.set(product.product_id, product as Product);
    }
  });

  const products = Array.from(productsMap.values());
  const resolvedIds = ids.length
    ? ids
    : products.map((item) => item.product_id);

  return { ids: resolvedIds, products };
};

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [favoriteMap, setFavoriteMap] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const hydrateUser = useAuthStore((state) => state.hydrate);
  const cartItems = useCartStore((state) => state.items);
  const hydrateCart = useCartStore((state) => state.hydrate);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const router = useRouter();

  const userId = user?.id;

  useEffect(() => {
    if (!user) {
      hydrateUser();
    }
  }, [user, hydrateUser]);

  useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);

  const fetchFavorites = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const response = await api.post(`${FAVORITES_LIST_ENDPOINT}/${userId}`);
      const payload = response.data?.data ?? response.data;
      const { ids, products } = normalizeFavoritePayload(payload);

      setFavoriteMap(
        ids.reduce<Record<number, boolean>>((acc, id) => {
          acc[id] = true;
          return acc;
        }, {})
      );
      setFavorites(products);

      if (products.length === 0 && ids.length > 0) {
        console.log("Favorites response contains only IDs:", ids);
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const handleToggleFavorite = async (item: Product, nextValue: boolean) => {
    if (!userId) return;
    const previousFavorites = favorites;
    const previousMap = favoriteMap;

    setFavoriteMap((prev) => ({
      ...prev,
      [item.product_id]: nextValue,
    }));

    if (!nextValue) {
      setFavorites((prev) =>
        prev.filter((entry) => entry.product_id !== item.product_id)
      );
    }

    try {
      console.log([
        'product_id =>',item.product_id,'  is_favourite =>',nextValue
      ])
      await api.post(`${FAVORITES_TOGGLE_ENDPOINT}`, {
        product_id: item.product_id,
        is_favourite: nextValue,
      });
    } catch (error) {
      console.error("Failed to update favorite", error);
      setFavoriteMap(previousMap);
      setFavorites(previousFavorites);
    }
  };

  const handleAddToCart = (item: Product) => {
    addItem(item, 1);
  };

  const handleIncrement = (productId: number) => {
    updateQuantity(productId, 1);
  };

  const handleDecrement = (productId: number) => {
    const currentQty = cartItems.find(
      (entry) => entry.product_id === productId
    )?.quantity;
    if (currentQty && currentQty <= 1) {
      removeItem(productId);
      return;
    }
    updateQuantity(productId, -1);
  };

  const getQuantity = (productId: number) => {
    const item = cartItems.find((entry) => entry.product_id === productId);
    return item ? toNumber(item.quantity, 1) : 0;
  };

  const filteredFavorites = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return favorites;
    return favorites.filter((item) =>
      item.product_name?.toLowerCase().includes(normalizedQuery)
    );
  }, [favorites, searchQuery]);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + toNumber(item.quantity, 1),
    0
  );
  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum + toNumber(item.product_price) * toNumber(item.quantity, 1),
    0
  );
  const avatar = require("../../../assets/images/icon.png");
  const itemsLabel = cartCount === 1 ? "1 item" : `${cartCount} items`;
  const totalLabel = `$${toNumber(cartTotal).toFixed(2)}`;
  const showSearch = isSearchOpen || searchQuery.length > 0;
  const cartItemImg = cartItems?.[0]?.product_image || avatar;

  const handleToggleSearch = () => {
    if (showSearch) {
      setIsSearchOpen(false);
      setSearchQuery("");
      return;
    }
    setIsSearchOpen(true);
  };

  const handleOpenCart = () => {
    router.push("/card");
  };

  return (
    <View style={styles.screen}>
      <FavoritesHeader
        title="Wishlist"
        onSearchPress={handleToggleSearch}
        isSearchOpen={showSearch}
      />
      {showSearch && (
        <FavoritesSearch
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
          autoFocus={isSearchOpen}
        />
      )}

      {isLoading ? (
        <FavoritesEmptyState title="Loading..." description="Fetching favorites" />
      ) : filteredFavorites.length === 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FavoritesList
          items={filteredFavorites}
          favoriteMap={favoriteMap}
          getQuantity={getQuantity}
          onToggleFavorite={handleToggleFavorite}
          onAdd={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      )}

      {cartCount > 0 && (
        <View style={styles.BottomCardStyle}>
            <BottomCard
              itemsLabel={itemsLabel}
              totalLabel={totalLabel}
              buttonLabel="View Cart"
              onPress={handleOpenCart}
              imageSource={cartItemImg}
            />
        </View>
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
  BottomCardStyle:{
    marginBottom: 35,
  }
});
