import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import OrderItemListScreen from "../../src/screens/app/OrderItemListScreen";

export default function OrderItemList() {
    const { orderId } = useLocalSearchParams<{ orderId?: string }>();
    const resolvedOrderId = Array.isArray(orderId) ? orderId[0] : orderId;

    return (
        <View className="flex-1  bg-white">
            <OrderItemListScreen orderId={resolvedOrderId ?? ""} />
        </View>
    );
}
