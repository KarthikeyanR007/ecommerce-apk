import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";

type HeaderProps = {
    title: string;
    onBack?: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void | Promise<void>;
};

export default function Header({
    title,
    onBack,
    isFavorite = false,
    onToggleFavorite,
}: HeaderProps){
    const router = useRouter();
    const handleBack = onBack ?? (() => router.back());
    return(
        <View style={[styles.header, { backgroundColor: Colors.light.background }]}>
            <TouchableOpacity onPress={handleBack}>
                <Ionicons name="chevron-back" size={24} color={Colors.light.icon}/>
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <TouchableOpacity onPress={onToggleFavorite} disabled={!onToggleFavorite}>
                <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={24}
                    color={"#fff"}
                />
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
        flex: 1,
        textAlign: "center",
        marginHorizontal: 12,
    },
})
