import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import TopHeader from "../../components/allitems_components/top_header";
import SingleCard from "../../components/allitems_components/single_card";
import { api } from "../../lib/api";
import { Product, Category, CartItem } from "../../types/types";
import BottomCard from "../../components/allitems_components/bottom_card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type AllItemsProps = {
  categoryId?: string;
  categoryTitle?: string;
};

export default function AllItems({ categoryId, categoryTitle }: AllItemsProps) {

  const CART_STORAGE_KEY = "cartItems";
  const FAVORITE_ENDPOINT = "/product/favourite";
  const placeholderImage = require("../../../assets/images/icon.png");
  const [selectedCategoryProduct, setSelectedCategoryProduct] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteMap, setFavoriteMap] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toNumber = (value: unknown, fallback = 0) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  useEffect(() => {
    if (categoryId) {
      fetchItemsForCategory(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchItemsForCategory = async(categoryId: string) => {
    try{
        // Simulate API call to fetch items based on categoryId
        const response = await api.get<Product[]>(`/getProduct/${categoryId}`);
        const data = response.data;
        setSelectedCategoryProduct(data);
        setLoading(false);
        // console.log("Fetched items for category", categoryId, data);
    }catch(error){
        console.error("Failed to fetch items for category", categoryId, error);
        setLoading(false);
    }
  };

    const fetchCategories = async () => {
        try{
            const response = await api.get<Category[]>("/categories/home");
            const data = response.data;
            // console.log("Fetched categories", data);
            setCategories(data);
            // setLoading(false);
        }catch(error){
            console.error("Failed to fetch categories", error);
        }
    };

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useEffect(() => {
      if (!categories.length) return;
        const numericCategoryId = Number(categoryId);
        const exists = categories.some(
          (c) => c.category_id === numericCategoryId
        );

        const defaultId = exists
          ? numericCategoryId
          : categories[0].category_id;
        setSelectedCategoryId(defaultId);
    }, [categories, categoryId]);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      fetchItemsForCategory(selectedCategoryId.toString());
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as CartItem[];
          if (Array.isArray(parsed)) {
            const normalized = parsed.map((item) => ({
              ...item,
              quantity: toNumber((item as CartItem).quantity, 1),
            }));
            setCartItems(normalized);
          }
        }
      } catch (error) {
        console.error("Failed to load cart items", error);
      }
    };

    loadCartItems();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems)).catch(
      (error) => console.error("Failed to save cart items", error)
    );
  }, [cartItems]);

  const handleAddToCart = (item: Product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (cartItem) => cartItem.product_id === item.product_id
      );
      if (existingIndex === -1) {
        return [...prev, { ...item, quantity: 1 }];
      }
      return prev.map((cartItem, index) =>
        index === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    });
  };

  const handleFavoriteToggle = async (item: Product, nextValue: boolean) => {
    setFavoriteMap((prev) => ({
      ...prev,
      [item.product_id]: nextValue,
    }));

    try {
      await api.post(FAVORITE_ENDPOINT, {
        product_id: item.product_id,
        is_favourite: nextValue,
      });
    } catch (error) {
      console.error("Failed to update favorite", error);
      setFavoriteMap((prev) => ({
        ...prev,
        [item.product_id]: !nextValue,
      }));
    }
  };

  const getItemFavorite = (item: Product) => {
    const mapValue = favoriteMap[item.product_id];
    if (typeof mapValue === "boolean") return mapValue;
    const raw = (item as Product & { is_favourite?: boolean | number })
      .is_favourite;
    if (typeof raw === "boolean") return raw;
    if (typeof raw === "number") return raw === 1;
    return false;
  };

  const handleOpenCart = () => {
    router.push("/card");
  };

  const selectedCategoryTitle =
    categories.find((item) => item.category_id === selectedCategoryId)
      ?.category_name ??
    categoryTitle ??
    "All Items";

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return selectedCategoryProduct;
    return selectedCategoryProduct.filter((item) =>
      item.product_name?.toLowerCase().includes(normalizedQuery)
    );
  }, [searchQuery, selectedCategoryProduct]);

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

  return (
    <View style={styles.screen}>
      <TopHeader
        title={selectedCategoryTitle}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <View style={styles.body}>
        <View style={styles.leftNav}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.category_id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.leftNavContent}
            renderItem={({ item }) => {
             const isSelected = item.category_id === selectedCategoryId;
              return (
                <TouchableOpacity
                  onPress={() => setSelectedCategoryId(item.category_id)}
                  style={[
                    styles.categoryItem,
                    isSelected && styles.categoryItemSelected,
                  ]}
                >
                  <View style={styles.categoryImageWrap}>
                    <Image source={placeholderImage} style={styles.categoryImage} />
                  </View>
                  <Text
                    style={[
                      styles.categoryLabel,
                      isSelected && styles.categoryLabelSelected,
                    ]}
                    numberOfLines={2}
                  >
                    {item.category_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.rightContent}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.product_id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrap}
            contentContainerStyle={styles.gridContent}
            renderItem={({ item }) => (
              <SingleCard
                item={item}
                placeholderImage={placeholderImage}
                onAdd={handleAddToCart}
                isFavorite={getItemFavorite(item)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            )}
          />
          {cartCount > 0 && (
            <BottomCard
              itemsLabel={itemsLabel}
              totalLabel={totalLabel}
              buttonLabel="View Cart"
              onPress={handleOpenCart}
              imageSource={placeholderImage}
            />
          )}
        </View>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    flexDirection: "row",
  },
  leftNav: {
    width: 90,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  leftNavContent: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  categoryItemSelected: {
    backgroundColor: "#EAF7F0",
    borderLeftColor: "#22C55E",
  },
  categoryImageWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  categoryImage: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  categoryLabel: {
    fontSize: 11,
    textAlign: "center",
    color: "#6B7280",
  },
  categoryLabelSelected: {
    color: "#14532D",
    fontWeight: "600",
  },
  rightContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  gridContent: {
    paddingBottom: 90,
  },
  columnWrap: {
    justifyContent: "space-between",
  },
});
