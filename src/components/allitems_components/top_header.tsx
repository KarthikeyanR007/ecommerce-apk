import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {RootStackParamList } from "../../types/types";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

interface TopHeaderProps {
  title: string;
}

export default function TopHeader({ title }: TopHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={Colors.light.tabIconDefault} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => console.log("Search pressed")}>
         <Ionicons name="search-outline" size={24} color={Colors.light.tabIconDefault} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#fff",
    // elevation: 4,
    marginTop: 55,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  icon: {
    fontSize: 20,
  },
});
