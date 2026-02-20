import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/theme";
import Card from "./card";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Category } from "../../types/types";
import { api } from "../../lib/api";

export default function HomeCategory() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try{
            const response = await api.get<Category[]>("/categories/home");
            const data = response.data;
            setCategories(data);
            setLoading(false);
        }catch(error){
            console.error("Failed to fetch categories", error);
        }
    };
    const NUM_COLUMNS = 3;

    const rows = Array.from(
        { length: Math.ceil(categories.length / NUM_COLUMNS) },
        (_, rowIndex) =>
         categories.slice(
            rowIndex * NUM_COLUMNS, 
            rowIndex * NUM_COLUMNS + NUM_COLUMNS
        ),
    );

    return (
        <View style={[styles.container]}>
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
                            <View key={item.category_id} style={styles.cell}>
                                  <Pressable
                                    onPress={() =>
                                        router.push({
                                            pathname: "/all-items",
                                            params: {
                                                categoryId: item.category_id,
                                                categoryTitle: item.category_name,
                                            },
                                        })
                                    }
                                  >
                                    <Card 
                                        name={item.category_name}
                                        imgUrl={item.category_image || undefined}
                                    />
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
