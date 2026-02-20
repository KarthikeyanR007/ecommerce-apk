import {View,StyleSheet} from "react-native";
import { Feather } from '@expo/vector-icons';
import { Colors } from "@/constants/theme";

export default function SearchBar() {
    return (
        <View style={styles.container}>
           <View style={styles.searchBar}>
                {/* Placeholder for search input */}
           </View>
            <View style={styles.fiterIcon}>
                <Feather name="sliders" size={24} color={Colors.light.background} />
            </View>
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
        backgroundColor: '#f0f0f0',
        height: 50,
        borderRadius: 8,
        width: '70%',
        marginLeft: 24,
    },
    fiterIcon: {
        marginRight: 12,
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
    
    }       
});

//category icon, search icon, filter icon, shopping bag icon, location icon