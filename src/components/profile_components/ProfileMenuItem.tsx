import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/theme";
import { router } from "expo-router";

const Data = [
    { title: "Edit Profile", icon: "person-outline", path: "/edit_profile" },
    { title: "Privacy Policy", icon: "shield-checkmark-outline", path: "/privacy-policy" },
    { title: "Terms & Conditions", icon: "reader-outline", path: "/terms-conditions" },
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
                {/* <Image source={item.icon} style={styles.icon} /> */}

                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color="#333"
                  style={styles.icon}
                />

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
