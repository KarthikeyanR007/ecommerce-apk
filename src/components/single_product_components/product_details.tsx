import { View, Text, StyleSheet, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductDetails(){
    return(
        <View style={styles.container}>
           <Image source={require("../../../assets/project_image/goldOil.jpg")} style={styles.img_style} />
           <Text style={styles.product_name}>beautiful Gold Winner </Text>
           <View style={styles.ratingRow}>
             <View style={styles.stars}>
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star-outline" size={16} color="#F59E0B" />
             </View>
             <Text style={styles.ratingText}>4.0 (146 Reviews)</Text>
           </View>
           <View style={styles.priceRow}>
             <Text style={styles.priceCurrent}>$12</Text>
             <Text style={styles.priceOld}>$14</Text>
             <View style={styles.discountBadge}>
               <Text style={styles.discountText}>10% OFF</Text>
             </View>
           </View>
           <Text style={styles.sectionTitle}>Description</Text>
           <Text style={styles.description}>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, sem
             feugiat ut nullam nisl orci, volutpat, felis. Nunc elit, et mattis
             commodo condimentum tellus et.{" "}
             <Text style={styles.readMore}>Read More</Text>
           </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        alignItems:'center',
        paddingHorizontal: 16,

    },
    img_style: {
        width: '50%',
        height: 200,
        resizeMode: "contain",
        marginTop:50,
    },
    product_name: {
        fontSize: 20,
        fontWeight: 800,
        marginTop: 30,
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 16,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 6,
    },
    stars: {
        flexDirection: "row",
        gap: 2,
        marginRight: 8,
    },
    ratingText: {
        fontSize: 12,
        color: "#6B7280",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 10,
    },
    priceCurrent: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginRight: 8,
    },
    priceOld: {
        fontSize: 12,
        color: "#9CA3AF",
        textDecorationLine: "line-through",
        marginRight: 8,
    },
    discountBadge: {
        backgroundColor: "#22C55E",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    discountText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#fff",
    },
    sectionTitle: {
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 16,
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },
    description: {
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 8,
        fontSize: 12,
        lineHeight: 18,
        color: "#6B7280",
    },
    readMore: {
        color: "#10B981",
        fontWeight: "700",
    },
})
