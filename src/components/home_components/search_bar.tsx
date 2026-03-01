import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Colors } from "@/constants/theme";

type SearchBarProps = {
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
    onClear?: () => void;
};

export default function SearchBar({
    value,
    onChangeText,
    placeholder = "Search categories",
    onClear,
}: SearchBarProps) {
    const handleFilterPress = () => {
        if (value && onClear) {
            onClear();
        }
    };

    return (
        <View style={styles.container}>
           <View style={styles.searchBar}>
                <Feather name="search" size={18} color="#9CA3AF" />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    style={styles.searchInput}
                    returnKeyType="search"
                />
           </View>
            <TouchableOpacity style={styles.filterIcon} onPress={handleFilterPress}>
                <Feather
                    name={value ? "x" : "sliders"}
                    size={22}
                    color={Colors.light.background}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#111827',
        paddingVertical: 0,
    },
    filterIcon: {
        backgroundColor: '#fff',
        height: 50,
        width: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderStartEndRadius: 10,
        borderBottomEndRadius: 10,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },
});

//category icon, search icon, filter icon, shopping bag icon, location icon
