import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type FavoritesSearchProps = {
  value: string;
  onChange: (text: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
};

export default function FavoritesSearch({
  value,
  onChange,
  onClear,
  autoFocus,
  placeholder = "Search favorites",
}: FavoritesSearchProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color="#9CA3AF" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        autoFocus={autoFocus}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close-circle" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: "#111827",
    paddingVertical: 0,
  },
});
