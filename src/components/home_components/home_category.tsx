import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/theme";
import Card from "./card";
import { useRouter } from "expo-router";

export default function HomeCategory() {
    const router = useRouter();
    const NUM_COLUMNS = 3;
    const DATA = [
            { id: '1', title: 'Item 1' },
            { id: '2', title: 'Item 2' },
            { id: '3', title: 'Item 3' },
            { id: '4', title: 'Item 3' },
            { id: '5', title: 'Item 1' },
            { id: '6', title: 'Item 2' },
            { id: '7', title: 'Item 3' },
            { id: '8', title: 'Item 3' },
            { id: '9', title: 'Item 3' },
        ];

    const rows = Array.from({ length: Math.ceil(DATA.length / NUM_COLUMNS) }, (_, rowIndex) =>
        DATA.slice(rowIndex * NUM_COLUMNS, rowIndex * NUM_COLUMNS + NUM_COLUMNS),
    );

    return (
        <View style={styles.container}>
            <View style={styles.topText_container}>
                <Text style={styles.mainText}>Shop By Category</Text>
                <Text style={[styles.seeAllText, {color: Colors.light.icon}]}>See All</Text>
            </View>
            <View style={styles.categoryContainer}>  
                {rows.map((row, rowIndex) => (
                    <View
                        key={`row-${rowIndex}`}
                        style={[
                            styles.row,
                            rowIndex === rows.length - 1 ? styles.lastRow : undefined,
                        ]}>
                        {row.map((item) => (
                            <View key={item.id} style={styles.cell}>
                                  <Pressable
                                    onPress={() =>
                                        router.push({
                                            pathname: "/all-items",
                                            params: {
                                                categoryId: item.id,
                                                categoryTitle: item.title,
                                            },
                                        })
                                    }
                                  >
                                    <Card name={item.title} />
                                  </Pressable>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        width: '100%',
    },
    topText_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
    },
    topText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '500',
    },
    mainText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    categoryContainer: {
        paddingTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    lastRow: {
        marginBottom: 0,
    },
    cell: {
        flex: 1,
    }
});
