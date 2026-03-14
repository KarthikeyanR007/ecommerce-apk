import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getImageUrl } from "@/src/utils/image";
import { useEffect } from "react";

type BottomCardProps = {
  itemsLabel?: string;
  totalLabel?: string;
  buttonLabel?: string;
  imageSource?: string;
  onPress?: () => void;
};

export default function BottomCard({
  itemsLabel = "2 items",
  totalLabel = "$25",
  buttonLabel = "View Cart",
  imageSource = require("../../../assets/images/icon.png"),
  onPress,
}: BottomCardProps) {
    return(
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          style={styles.container}
        >
            <View style={styles.thumbWrap}>
              <Image source={{ uri: getImageUrl(imageSource) }}  style={styles.thumbImage} />
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.itemsText} numberOfLines={1}>
                {itemsLabel}
              </Text>
              <Text style={styles.totalText} numberOfLines={1}>
                {totalLabel}
              </Text>
            </View>

            <View style={styles.ctaWrap}>
              <Text style={styles.ctaText} numberOfLines={1}>
                {buttonLabel}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 12,
        right: 12,
        bottom: 14,
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#56C061",
        borderRadius: 14,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 6,
        marginBottom: 35,
    },
    thumbWrap: {
        width: 44,
        height: 44,
        borderRadius: 20,
        // backgroundColor: "#E8F7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    thumbImage: {
        width: 35,
        height: 35,
        resizeMode: "contain",
        borderRadius: 3,
    },
    textWrap: {
        flex: 1,
    },
    itemsText: {
        fontSize: 12,
        color: "#E9FCEB",
    },
    totalText: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
    ctaWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    ctaText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#fff",
    },
});
