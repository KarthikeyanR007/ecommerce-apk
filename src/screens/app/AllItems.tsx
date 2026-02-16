import { use, useEffect, useMemo, useState } from "react";
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
import { Product, Category } from "../../types/types";


type AllItemsProps = {
  categoryId: string;
  categoryTitle?: string;
};

export default function AllItems({ categoryId, categoryTitle }: AllItemsProps) {

  const placeholderImage = require("../../../assets/images/icon.png");
  const [selectedCategoryProduct, setSelectedCategoryProduct] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItemsForCategory(categoryId);
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
        console.log("Fetched items for category", categoryId, data);
    }catch(error){
        console.error("Failed to fetch items for category", categoryId, error);
        setLoading(false);
    }
  };

    const fetchCategories = async () => {
        try{
            const response = await api.get<Category[]>("/categories/home");
            const data = response.data;
            console.log("Fetched categories", data);
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

  return (
    <View style={styles.screen}>
      <TopHeader title={categoryTitle || "All Items"} />

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
            data={selectedCategoryProduct}
            keyExtractor={(item) => item.product_id.toString()}
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
                  {item.product_name}
                </Text>
                <Text style={styles.itemMeta}>{item.product_stock}</Text>

                {item.product_discount != null && item.product_discount > 0 && (
                  <Text style={styles.oldPrice}>
                    $
                    {(
                      item.product_price /
                      (1 - item.product_discount / 100)
                    ).toFixed(2)}
                  </Text>
                )}

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
