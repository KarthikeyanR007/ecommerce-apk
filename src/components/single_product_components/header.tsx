import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

export default function Header(){
    return(
        <View style = {[styles.header, { backgroundColor: Colors.light.background }]}>
            <TouchableOpacity>
                <Ionicons name="chevron-back" size={24} color={Colors.light.icon}/>
            </TouchableOpacity>
            <Text style={styles.title}>Product Name</Text>
            <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color={"#fff"}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color:"#fff",
    }
})