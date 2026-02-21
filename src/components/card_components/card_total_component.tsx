import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CardTotalProps = {
    total?: number;
    currencySymbol?: string;
    addressLabel?: string;
    addressHighlight?: string;
    addressLine?: string;
    paymentLabel?: string;
    paymentValue?: string;
    onChangeAddress?: () => void;
    onPaymentPress?: () => void;
    onPlaceOrder?: () => void;
    buttonLabel?: string;
};

export default function CardTotal({
    total = 22,
    currencySymbol = "$",
    addressLabel = "Delivering to",
    addressHighlight = "Home",
    addressLine = "6391 Elgin St. Celina, Delaware...",
    paymentLabel = "Pay Using",
    paymentValue = "Visa 6589",
    onChangeAddress,
    onPaymentPress,
    onPlaceOrder,
    buttonLabel = "Place Order",
}: CardTotalProps) {
    const amountLabel = `${currencySymbol}${total.toFixed(2)}`;
    const changeDisabled = !onChangeAddress;
    const paymentDisabled = !onPaymentPress;
    const placeDisabled = !onPlaceOrder;

    return (
        <View style={styles.card}>
            <View style={styles.rowBetween}>
                <Text style={styles.grandTotal}>Grand Total</Text>
                <Text style={styles.grandAmount}>{amountLabel}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.deliveryRow}>
                <View style={styles.deliveryIcon}>
                    <Ionicons name="home-outline" size={16} color="#22C55E" />
                </View>
                <View style={styles.deliveryText}>
                    <Text style={styles.deliveryTitle} numberOfLines={1}>
                        {addressLabel}{" "}
                        <Text style={styles.deliveryBold}>{addressHighlight}</Text>
                    </Text>
                    <Text style={styles.deliverySub} numberOfLines={1}>
                        {addressLine}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={onChangeAddress}
                    disabled={changeDisabled}
                    style={changeDisabled && styles.disabled}
                >
                    <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.bottomRow}>
                <TouchableOpacity
                    style={styles.payment}
                    onPress={onPaymentPress}
                    disabled={paymentDisabled}
                >
                    <Text style={styles.paymentLabel}>{paymentLabel}</Text>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentValue}>{paymentValue}</Text>
                        <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.placeButton, placeDisabled && styles.disabled]}
                    onPress={onPlaceOrder}
                    disabled={placeDisabled}
                >
                    <Text style={styles.placeAmount}>{amountLabel}</Text>
                    <View style={styles.buttonDivider} />
                    <Text style={styles.placeLabel}>{buttonLabel}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 60,
    },
    rowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    grandTotal: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },
    grandAmount: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 12,
    },
    deliveryRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    deliveryIcon: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "#E9FBEA",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    deliveryText: {
        flex: 1,
    },
    deliveryTitle: {
        fontSize: 13,
        color: "#111827",
        fontWeight: "600",
    },
    deliveryBold: {
        fontWeight: "800",
    },
    deliverySub: {
        marginTop: 2,
        fontSize: 12,
        color: "#9CA3AF",
    },
    changeText: {
        fontSize: 12,
        color: "#22C55E",
        fontWeight: "600",
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    payment: {
        flex: 1,
    },
    paymentLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        marginBottom: 6,
    },
    paymentRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    paymentValue: {
        fontSize: 13,
        fontWeight: "700",
        color: "#111827",
    },
    placeButton: {
        flex: 1.3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 8,
    },
    placeAmount: {
        fontSize: 13,
        fontWeight: "800",
        color: "#fff",
    },
    buttonDivider: {
        width: 1,
        alignSelf: "stretch",
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    placeLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#fff",
    },
    disabled: {
        opacity: 0.6,
    },
});
