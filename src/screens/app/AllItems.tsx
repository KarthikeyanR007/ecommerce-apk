import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TopHeader from "../../components/allitems_components/top_header";
import { api } from "../../lib/api";
import { Product } from "../../types/types";

type AllItemsProps = {
  categoryId: string;
  categoryTitle?: string;
};

export default function AllItems({ categoryId, categoryTitle }: AllItemsProps) {

  const placeholderImage = require("../../../assets/images/icon.png");
  const [selectedCategoryProduct, setSelectedCategoryProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItemsForCategory(categoryId);
  }, [categoryId]);

  const fetchItemsForCategory = async(categoryId: string) => {
    try{
        // Simulate API call to fetch items based on categoryId
        const response = await api.get<Product[]>(`/getProduct?category=${categoryId}`);
        const data = response.data;
        setSelectedCategoryProduct(data);
        setLoading(false);
        console.log("Fetched items for category", categoryId, data);
    }catch(error){
        console.error("Failed to fetch items for category", categoryId, error);
        setLoading(false);
    }
  };
  const CATEGORIES = useMemo(
    () => [
      { id: "fresh-veg", title: "Fresh Vegetables" },
      { id: "fresh-fruit", title: "Fresh Fruits" },
      { id: "seasonal", title: "Seasonal" },
      { id: "exotics", title: "Exotics" },
      { id: "sprouts", title: "Sprouts" },
      { id: "leafy", title: "Leafies & Herbs" },
      { id: "flowers", title: "Flowers & Leaves" },
      { id: "roots", title: "Root Vegetables" },
    ],
    []
  );

  const ITEMS = useMemo(
    () => [
      {
        id: "1",
        categoryId: "fresh-veg",
        title: "Hybrid Tomato (Tamatar)",
        weight: "500 g",
        price: 10,
        oldPrice: 18,
      },
      {
        id: "2",
        categoryId: "fresh-veg",
        title: "Lady Finger (Bhindi)",
        weight: "250 g",
        price: 7,
        oldPrice: 10,
      },
      {
        id: "3",
        categoryId: "fresh-fruit",
        title: "Green Chili (Hari Mirch)",
        weight: "100 g",
        price: 8,
        oldPrice: 10,
      },
      {
        id: "4",
        categoryId: "fresh-fruit",
        title: "Cluster Beans (Gawar Phali)",
        weight: "250 g",
        price: 12,
        oldPrice: 14,
      },
      {
        id: "5",
        categoryId: "seasonal",
        title: "Cabbage (Patta Gobhi)",
        weight: "500 g",
        price: 8,
        oldPrice: 10,
      },
      {
        id: "6",
        categoryId: "seasonal",
        title: "Capsicum (Shimla Mirch)",
        weight: "250 g",
        price: 7,
        oldPrice: 10,
      },
      {
        id: "7",
        categoryId: "exotics",
        title: "Baby Potato (Chota Aloo)",
        weight: "500 g",
        price: 10,
        oldPrice: 14,
      },
      {
        id: "8",
        categoryId: "exotics",
        title: "Green Peas (Matar)",
        weight: "250 g",
        price: 5,
        oldPrice: 10,
      },
    ],
    []
  );

  const initialCategoryId =
    categoryId && CATEGORIES.some((c) => c.id === categoryId)
      ? categoryId
      : CATEGORIES[0]?.id;

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialCategoryId
  );

  useEffect(() => {
    if (categoryId && CATEGORIES.some((c) => c.id === categoryId)) {
      setSelectedCategoryId(categoryId);
    }
  }, [categoryId, CATEGORIES]);

  const selectedCategory = CATEGORIES.find(
    (category) => category.id === selectedCategoryId
  );

  const headerTitle = selectedCategory?.title
    ? `All Items - ${selectedCategory.title}`
    : categoryTitle
    ? `All Items - ${categoryTitle}`
    : categoryId
    ? `All Items - ${categoryId}`
    : "All Items";

  const filteredItems = ITEMS.filter(
    (item) => item.categoryId === selectedCategoryId
  );

  return (
    <View style={styles.screen}>
      <TopHeader title={headerTitle} />

      <View style={styles.body}>
        <View style={styles.leftNav}>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.leftNavContent}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedCategoryId;
              return (
                <TouchableOpacity
                  onPress={() => setSelectedCategoryId(item.id)}
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
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.rightContent}>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrap}
            contentContainerStyle={styles.gridContent}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.cardTop}>
                  <Image source={placeholderImage} style={styles.itemImage} />
                  <TouchableOpacity style={styles.heartBtn}>
                    <Ionicons name="heart-outline" size={18} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.itemMeta}>{item.weight}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>${item.price}</Text>
                  {item.oldPrice ? (
                    <Text style={styles.oldPrice}>${item.oldPrice}</Text>
                  ) : null}
                </View>

                <TouchableOpacity style={styles.addBtn}>
                  <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
    width: 110,
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
    paddingBottom: 20,
  },
  columnWrap: {
    justifyContent: "space-between",
  },
  itemCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemImage: {
    width: 64,
    height: 64,
    resizeMode: "contain",
  },
  heartBtn: {
    padding: 4,
  },
  itemTitle: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  itemMeta: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  oldPrice: {
    fontSize: 11,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  addBtn: {
    marginTop: 8,
    backgroundColor: "#22C55E",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
