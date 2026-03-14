import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { OrderStatus } from "./types";
import OrderRatingRow from "./order_rating_row";
import { useEffect } from "react";

type OrderActionRowProps = {
  status: OrderStatus;
  rating?: number;
  onRate?: (rating: number) => void;
  onReorder?: () => void;
  onMessage?: () => void;
  onCall?: () => void;
  callEnabled?: boolean;
};

export default function OrderActionRow({
  status,
  rating,
  onRate,
  onReorder,
  onMessage,
  onCall,
  callEnabled = true,
}: OrderActionRowProps) {
  const callButtonStyle = [
    styles.button,
    styles.filledButton,
    !callEnabled && styles.disabledButton,
  ];
  const callTextStyle = [styles.filledText, !callEnabled && styles.disabledText];

  useEffect(()=>{
    console.log('status ',status);
  },[]);

  if (status === "received") {
    return (
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={onMessage}>
          <Ionicons name="chatbubble-ellipses-outline" size={14} color="#2FB463" />
          <Text style={styles.outlineText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={callButtonStyle}
          onPress={onCall}
          disabled={!callEnabled}
          accessibilityState={{ disabled: !callEnabled }}
        >
          <Ionicons name="call-outline" size={14} color="#fff" />
          <Text style={callTextStyle}>Call</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (status === "upcoming") {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={callButtonStyle}
          onPress={onCall}
          disabled={!callEnabled}
          accessibilityState={{ disabled: !callEnabled }}
        >
          <Ionicons name="call-outline" size={14} color="#fff" />
          <Text style={callTextStyle}>Call</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={onMessage}>
          <Ionicons name="chatbubble-ellipses-outline" size={14} color="#2FB463" />
          <Text style={styles.outlineText}>Message</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <OrderRatingRow value={rating} onSelect={onRate} />
      <TouchableOpacity style={[styles.button, styles.filledButton]} onPress={onReorder}>
        <Ionicons name="repeat" size={14} color="#fff" />
        <Text style={styles.filledText}>Reorder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flex: 1,
  },
  filledButton: {
    backgroundColor: "#5AC268",
  },
  filledText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.45,
  },
  disabledText: {
    color: "#F9FAFB",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#5AC268",
    backgroundColor: "#fff",
  },
  outlineText: {
    color: "#2FB463",
    fontSize: 12,
    fontWeight: "700",
  },
});
