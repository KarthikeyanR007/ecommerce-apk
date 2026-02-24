import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../types/types";

interface TopHeaderProps {
  title: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export default function TopHeader({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search items",
}: TopHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const query = useMemo(() => searchValue ?? localQuery, [searchValue, localQuery]);
  const setQuery = onSearchChange ?? setLocalQuery;
  const showSearch = isSearchOpen || query.length > 0;

  const handleToggleSearch = () => {
    if (showSearch) {
      setIsSearchOpen(false);
      if (query) setQuery("");
      return;
    }
    setIsSearchOpen(true);
  };

  return (
    <View style={[styles.header, { backgroundColor: Colors.light.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={Colors.light.icon} />
      </TouchableOpacity>

      {showSearch ? (
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            autoFocus={isSearchOpen}
            returnKeyType="search"
          />
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
     {(title === "Edit Profile") ? (
      <TouchableOpacity >
         {/* <Ionicons
          name={showSearch ? "close" : "."}
          size={24}
          color={Colors.light.icon}
        /> */}
      </TouchableOpacity> 
      ) : 
      <TouchableOpacity onPress={handleToggleSearch}>
         <Ionicons
          name={showSearch ? "close" : "search-outline"}
          size={24}
          color={Colors.light.icon}
        />
      </TouchableOpacity> 
    }

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    height: 80,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color:"#fff",
  },
  searchWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },
  icon: {
    fontSize: 20,
  },
});
