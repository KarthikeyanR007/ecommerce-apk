import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../types/types";

type SingleCardProps = {
  item: Product;
  placeholderImage: ImageSourcePropType;
  onAdd: (item: Product) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (item: Product, nextValue: boolean) => void;
};

export default function SingleCard({
  item,
  placeholderImage,
  onAdd,
  isFavorite,
  onFavoriteToggle,
}: SingleCardProps) {
  const [localFavorite, setLocalFavorite] = useState(false);
  const favorite = typeof isFavorite === "boolean" ? isFavorite : localFavorite;

  const toNumber = (value: unknown, fallback = 0) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const discount = toNumber(item.product_discount, 0);
  const hasDiscount = discount > 0;
  const oldPrice = hasDiscount
    ? toNumber(item.product_price) / (1 - discount / 100)
    : null;

  const handleFavoritePress = () => {
    const nextValue = !favorite;
    if (typeof isFavorite !== "boolean") {
      setLocalFavorite(nextValue);
    }
    if (onFavoriteToggle) onFavoriteToggle(item, nextValue);
  };

  return (
    <View style={styles.itemCard}>
      <View style={styles.imageWrap}>
        <Image source={placeholderImage} style={styles.itemImage} />
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={handleFavoritePress}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={20}
            color={favorite ? "#5AC268" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.itemTitle} numberOfLines={2}>
        {item.product_name}
      </Text>
      <Text style={styles.itemMeta}>{item.product_stock}</Text>

      {hasDiscount && oldPrice !== null && (
        <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text>
      )}

      <TouchableOpacity style={styles.addBtn} onPress={() => onAdd(item)}>
        <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  imageWrap: {
    position: "relative",
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 70,
    resizeMode: "contain",
  },
  heartBtn: {
    position: "absolute",
    top: -6,
    right: -10,
    width: 26,
    height: 26,
    borderRadius: 13,
    // backgroundColor: "#fff",
    //  borderWidth: 1,
    // borderColor: "#E5E7EB",
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 2,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.08,
    // shadowRadius: 6,
    // elevation: 2,
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
  oldPrice: {
    marginTop: 6,
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
