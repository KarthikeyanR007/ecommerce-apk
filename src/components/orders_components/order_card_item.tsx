import { useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import { getImageUrl } from "@/src/utils/image";

type OrderCardItemProps = {
    product_name: string;
    product_price: number;
    product_image: string;
    product_id: number;
    product_description: string;
    product_stock: number;
    quantity?: number;
}

export default function OrderCardItem({
    product_name,
    product_price,
    product_image,
    product_id,
    product_description,
    product_stock,
    quantity,
}: OrderCardItemProps) {
    const qty = typeof quantity === "number" ? quantity : 1;
    const placeholderImage = require("../../../assets/images/icon.png");
    const imageSource = useMemo(
        () => (product_image ? { uri: getImageUrl(product_image) } : placeholderImage),
        [product_image]
    );
    const totalPrice = product_price * qty;

    const subtitle = product_description?.trim()
        ? product_description
        : `${product_stock} in stock`;

    return (
        <View style={styles.card}>
            <View style={styles.imageWrap}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Text style={styles.name} numberOfLines={2}>
                        {product_name}
                    </Text>
                    <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                </View>
                <Text style={styles.subtext} numberOfLines={1}>
                    {subtitle}
                </Text>
                <View style={styles.metaRow}>
                    <View style={styles.qtyPill}>
                        <Text style={styles.qtyLabel}>Qty</Text>
                        <Text style={styles.qtyValue}>{qty}</Text>
                    </View>
                    <Text style={styles.unitPrice}>${product_price.toFixed(2)} each</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 14,
        backgroundColor: "#fff",
        borderRadius: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
        elevation: 3,
    },
    imageWrap: {
        width: 60,
        height: 60,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    image: {
        width: 44,
        height: 44,
        resizeMode: "contain",
    },
    content: {
        flex: 1,
        paddingTop: 2,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 10,
    },
    name: {
        flex: 1,
        fontSize: 14,
        fontWeight: "700",
        color: "#0F172A",
        letterSpacing: 0.2,
    },
    totalPrice: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0F172A",
        letterSpacing: 0.3,
    },
    subtext: {
        marginTop: 4,
        fontSize: 12,
        color: "#94A3B8",
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    qtyPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#F1F5F9",
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    qtyLabel: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "600",
    },
    qtyValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0F172A",
    },
    unitPrice: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "600",
    },
});
