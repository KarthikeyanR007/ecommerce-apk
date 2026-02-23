import { View, Text, StyleSheet, Pressable } from "react-native";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const isHomeActive =
        activeAddress === "1" || activeAddress === "home";

    const activeLabel = isHomeActive ? "Home" : "Office";
    const activeAddressValue = isHomeActive ? homeAddress : officeAddress;

    const handleSelectAddress = (type: "home" | "office") => {
        setActiveAddress(type === "home" ? "1" : "2");
        setIsMenuOpen(false);
    };

    useEffect(() => {
        storeCurrentAddress();
    }, [activeAddress]);

    const storeCurrentAddress = async () => {
        try{
           const payload = { activeAddress: activeAddress.trim() };
            if(!user?.id)return;
            const response = await api.post(`/user/change_active_address/${user.id}`,payload);
            const currentActiveAddress = response.data?.data;
        }catch(error){
            console.log('Filed to post current Active Address', error);
        }
    }


    return (
        <View style={[styles.container, { backgroundColor: Colors.light.background }]}>
            <View style={styles.row1}>
                <View style={styles.row2}>
                    <IconSymbol name="location.fill" size={40} color={Colors.light.icon} />
                    <View>
                        <Pressable
                            onPress={() => setIsMenuOpen((prev) => !prev)}
                            style={styles.labelRow}
                        >
                            <Text style={styles.label}>{activeLabel}</Text>
                            <Feather
                                name={isMenuOpen ? "chevron-up" : "chevron-down"}
                                size={24}
                                color={Colors.light.icon}
                            />
                        </Pressable>
                        <Text style={styles.address}>
                            {activeAddressValue || "No address set"}
                        </Text>
                    </View>
                </View>
                <View>
                     <Feather name="shopping-bag" size={28} color={Colors.light.icon} />
                </View>
            </View>

            {isMenuOpen && (
                <View style={styles.dropdown}>
                    <Pressable
                        style={styles.option}
                        onPress={() => handleSelectAddress("home")}
                    >
                        <Text
                            style={[
                                styles.optionLabel,
                                isHomeActive && styles.optionActive,
                            ]}
                        >
                            Home
                        </Text>
                        <Text style={styles.optionAddress}>
                            {homeAddress || "No home address"}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.option}
                        onPress={() => handleSelectAddress("office")}
                    >
                        <Text
                            style={[
                                styles.optionLabel,
                                !isHomeActive && styles.optionActive,
                            ]}
                        >
                            Office
                        </Text>
                        <Text style={styles.optionAddress}>
                            {officeAddress || "No office address"}
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // padding: 16,
        width: '90%',
        position: 'relative',
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
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    address: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    dropdown: {
        marginTop: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    optionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    optionActive: {
        color: '#0a7ea4',
    },
    optionAddress: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
});
