import { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
    
type CardItemProps = {
    product_name: string;
    product_price: number;
    product_image: string;
    product_id: number;
    product_description: string;
    product_stock: number;
    quantity?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onRemove?: () => void;
}

export default function CardItem({
    product_name,
    product_price,
    product_image,
    product_id,
    product_description,
    product_stock,
    quantity,
    onIncrement,
    onDecrement,
    onRemove,
}: CardItemProps) {
    const [localQty, setLocalQty] = useState(quantity ?? 1);
    const qty = typeof quantity === "number" ? quantity : localQty;
    const placeholderImage = require("../../../assets/images/icon.png");
    const imageSource = useMemo(
        () => (product_image ? { uri: product_image } : placeholderImage),
        [product_image]
    );

    const handleIncrement = () => {
        if (onIncrement) return onIncrement();
        setLocalQty((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (onDecrement) return onDecrement();
        setLocalQty((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleRemove = () => {
        if (!onRemove) return;
        Alert.alert(
            "Remove Item",
            "Do you want to remove this product?",
            [
                { text: "No", style: "cancel" },
                { text: "Yes", style: "destructive", onPress: onRemove },
            ]
        );
    };

    const subtitle = product_description?.trim()
        ? product_description
        : `${product_stock} in stock`;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
                <Ionicons name="close" size={16} color="#DC2626" />
            </TouchableOpacity>
            <View style={styles.imageWrap}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={2}>
                    {product_name}
                </Text>
                <Text style={styles.subtext} numberOfLines={1}>
                    {subtitle}
                </Text>
                <Text style={styles.price}>${product_price.toFixed(2)}</Text>
            </View>
            <View style={styles.qtyWrap}>
                <TouchableOpacity style={styles.qtyButton} onPress={handleDecrement}>
                    <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={handleIncrement}>
                    <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 18,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        overflow: "visible",
        marginTop: 8,
    },
    removeButton: {
        position: "absolute",
        top: -6,
        right: -6,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#FEE2E2",
        borderWidth: 1,
        borderColor: "#FCA5A5",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3,
        elevation: 4,
    },
    imageWrap: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },
    subtext: {
        marginTop: 2,
        fontSize: 12,
        color: "#9CA3AF",
    },
    price: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },
    qtyWrap: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#22C55E",
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 10,
    },
    qtyButton: {
        width: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    qtyButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#22C55E",
    },
    qtyText: {
        minWidth: 16,
        textAlign: "center",
        fontSize: 13,
        fontWeight: "700",
        color: "#22C55E",
        marginHorizontal: 4,
    },
});
