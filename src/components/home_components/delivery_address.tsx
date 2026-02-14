import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Feather } from '@expo/vector-icons';

export default function DeliveryAddress() {
    return (
        <View style={styles.container}>
            <View style={styles.row1}>
                <View style={styles.row2}>
                    <IconSymbol name="location.fill" size={40} color={Colors.light.icon} />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text style={styles.label}>Home</Text>
                            <Feather name="chevron-down" size={24} color={Colors.light.icon} />
                        </View>
                        <Text style={styles.address}>123 Main St, Springfield</Text>
                    </View>
                </View>
                <View>
                     <Feather name="shopping-bag" size={28} color={Colors.light.icon} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        width: '90%',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    address: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
});