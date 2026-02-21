import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Colors } from "@/constants/theme";
import { router } from "expo-router";


const Data = [
    { title: "Edit Profile", icon: require("../../../assets/images/icon.png"), path: "/edit_profile" },
    { title: "Settings", icon: require("../../../assets/images/icon.png"), path: "/settings" },
    { title: "Payment Methods", icon: require("../../../assets/images/icon.png"), path: "/payment-methods" },
    { title: "Privacy Policy", icon: require("../../../assets/images/icon.png"), path: "/privacy-policy" },
    { title: "Terms & Conditions", icon: require("../../../assets/images/icon.png"), path: "/terms-conditions" },
];


export default function ProfileMenuItem() {
    return (
            <View>
            {Data.map((item, index) => (
                <Pressable
                    key={index}
                    style={styles.container}
                    onPress={() => router.push(item.path as any)} // navigation
                >
                <Image source={item.icon} style={styles.icon} />

                <Text style={styles.title}>{item.title}</Text>

                <Feather
                    name="chevron-right"
                    size={20}
                    color={Colors.light.icon}
                />
                </Pressable>
            ))}
            </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 1,
    borderRadius: 10,
    backgroundColor: "#fff",

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 1,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    resizeMode: "contain",
  },

  title: {
    flex: 1, 
    fontSize: 16,
    color: "#333",
  },
});
