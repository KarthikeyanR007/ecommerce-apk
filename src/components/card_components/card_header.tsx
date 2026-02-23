import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {RootStackParamList } from "../../types/types";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";


export default function CardHeader() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
    <View style={[styles.header, { backgroundColor: Colors.light.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={Colors.light.icon} />
      </TouchableOpacity>

      <Text style={styles.title}>Your Cart</Text>

      <TouchableOpacity onPress={() => console.log("Search pressed")}>
         <Ionicons name="search-outline" size={24} color={Colors.light.icon} />
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
    paddingTop: 10,
    height: 70,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color:"#fff",
  },
  icon: {
    fontSize: 20,
  },
});

