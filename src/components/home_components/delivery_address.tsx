import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Feather } from '@expo/vector-icons';
import { api } from "@/src/lib/api"; 
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.store"; 

export default function DeliveryAddress() {

    const [homeAddress, setHomeAddress] = useState("");
    const [officeAddress, setOfficeAddress] = useState("");
    const [activeAddress, setActiveAddress] = useState("1");

    const user = useAuthStore((state) => state.user);
    const hydrate = useAuthStore((state) => state.hydrate);

    useEffect(() => {
        if (!user) {
            hydrate();
            return;
        }
        getActiveAddress();
    }, [user]);

    const getActiveAddress = async () => {
        try{
            if (!user?.id) return;
            const response = await api.get(`/user/active_address/${user.id}`);
            const address_data = response.data?.data;
            setHomeAddress(address_data?.home_address ?? homeAddress);
            setOfficeAddress(address_data?.office_address ?? officeAddress);
            setActiveAddress(address_data?.active_address ?? activeAddress);
        }catch(error){
            console.log('Faild to Get Current Address',error);
        }
    }
    return (
        <View style={[styles.container, { backgroundColor: Colors.light.background }]}>
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
        fontSize: 17,
        fontWeight: '800',
        color: '#fff',
    },
    address: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
});