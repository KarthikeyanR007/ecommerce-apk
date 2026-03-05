import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Product } from "../../types/types";
import { useRouter } from "expo-router";

type FavoriteCardProps = {
  item: Product;
  isFavorite: boolean;
  quantity: number;
  onToggleFavorite: (nextValue: boolean) => void;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

const placeholderImage = require("../../../assets/images/icon.png");

const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function FavoriteCard({
  item,
  isFavorite,
  quantity,
  onToggleFavorite,
  onAdd,
  onIncrement,
  onDecrement,
}: FavoriteCardProps) {
  const router = useRouter();
  const imageSource = item.product_image
    ? { uri: item.product_image }
    : placeholderImage;

  const discount = toNumber(item.product_discount, 0);
  const hasDiscount = discount > 0;
  const oldPrice = hasDiscount
    ? toNumber(item.product_price) / (1 - discount / 100)
    : null;

  const metaText =
    item.product_description?.trim() ||
    (typeof item.product_stock === "number"
      ? `${item.product_stock} in stock`
      : "In stock");

  const handleNavigateProductDetails = () => {
    router.push({
      pathname: "/single_product",
      params: {
        productId: item.product_id.toString(),
        productName: item.product_name,
      },
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => onToggleFavorite(!isFavorite)}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={18}
          color={isFavorite ? "#5AC268" : "#9CA3AF"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateProductDetails}>
        <View style={styles.imageWrap}>
          <Image source={imageSource} style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateProductDetails}>
        <Text style={styles.name} numberOfLines={2}>
          {item.product_name}
        </Text>
      </TouchableOpacity>
      <Text style={styles.meta} numberOfLines={1}>
        {metaText}
      </Text>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.price}>${toNumber(item.product_price).toFixed(2)}</Text>
          {hasDiscount && oldPrice !== null && (
            <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text>
          )}
        </View>

        {quantity > 0 ? (
          <View style={styles.qtyWrap}>
            <TouchableOpacity style={styles.qtyButton} onPress={onDecrement}>
              <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyButton} onPress={onIncrement}>
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    marginBottom: 6,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  meta: {
    marginTop: 2,
    fontSize: 11,
    color: "#9CA3AF",
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  oldPrice: {
    marginTop: 2,
    fontSize: 10,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  addButton: {
    backgroundColor: "#5AC268",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  qtyWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5AC268",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyButton: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5AC268",
  },
  qtyText: {
    minWidth: 14,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "#5AC268",
    marginHorizontal: 4,
  },
});
