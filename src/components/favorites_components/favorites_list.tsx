import { FlatList, StyleSheet } from "react-native";
import type { Product } from "../../types/types";
import FavoriteCard from "./favorite_card";

type FavoritesListProps = {
  items: Product[];
  favoriteMap: Record<number, boolean>;
  getQuantity: (productId: number) => number;
  onToggleFavorite: (item: Product, nextValue: boolean) => void;
  onAdd: (item: Product) => void;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
};

export default function FavoritesList({
  items,
  favoriteMap,
  getQuantity,
  onToggleFavorite,
  onAdd,
  onIncrement,
  onDecrement,
}: FavoritesListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.product_id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrap}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <FavoriteCard
          item={item}
          isFavorite={favoriteMap[item.product_id] ?? true}
          quantity={getQuantity(item.product_id)}
          onToggleFavorite={(nextValue) => onToggleFavorite(item, nextValue)}
          onAdd={() => onAdd(item)}
          onIncrement={() => onIncrement(item.product_id)}
          onDecrement={() => onDecrement(item.product_id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  columnWrap: {
    justifyContent: "space-between",
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
});
