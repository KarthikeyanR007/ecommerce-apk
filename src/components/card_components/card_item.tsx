import {View, Text, StyleSheet} from "react-native";
    
type CardItemProps = {
    product_name: string;
    product_price: number;
    product_image: string;
    product_id: number;
    product_description: string;
    product_stock: number;
}

export default function CardItem({
    product_name,
    product_price,
    product_image,
    product_id,
    product_description,
    product_stock
}: CardItemProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{product_name}</Text>
            <Text style={styles.price}>${product_price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        color: "#111827",
    },
    price: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 5,
    },
});