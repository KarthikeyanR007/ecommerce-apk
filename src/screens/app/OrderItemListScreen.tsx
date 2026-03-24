import { StyleSheet, ScrollView , View } from "react-native";
import { useEffect, useState } from "react";
import OrdersHeader from "../../components/orders_components/orders_header";
import { api } from "@/src/lib/api"; 

export default function OrderItemListScreen() {
    const orderId = "ORD-2026-00004";
    useEffect(()=>{
        handleGetOrders(orderId);
    },[orderId]);

    const handleGetOrders = async (orderId: String ) => {
        try {
            const response = await api.get(`/order/get_order/${orderId}`);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };
    return (
        <View style={styles.screen}>
            <OrdersHeader title="My Order" />
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});