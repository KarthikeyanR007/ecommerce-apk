import {View,Text,StyleSheet,FlatList,Image} from "react-native";
import { Colors } from "@/constants/theme";
import OffersCard from "./offers_card";

export default function BestOffers() {

    const products = [
                        {
                            id: '1',
                            name: 'Fresh Apples',
                            quantity: '1kg',
                            currentPrice: 120,
                            oldPrice: 150,
                            image: 'https://via.placeholder.com/200x200.png?text=Apples',
                        },
                        {
                            id: '2',
                            name: 'Full Cream Milk',
                            quantity: '500ml',
                            currentPrice: 35,
                            oldPrice: 40,
                            image: 'https://via.placeholder.com/200x200.png?text=Milk',
                        },
                        {
                            id: '3',
                            name: 'Basmati Rice',
                            quantity: '5kg',
                            currentPrice: 450,
                            oldPrice: 520,
                            image: 'https://via.placeholder.com/200x200.png?text=Rice',
                        },
                        {
                            id: '4',
                            name: 'Sunflower Oil',
                            quantity: '1L',
                            currentPrice: 160,
                            oldPrice: 190,
                            image: 'https://via.placeholder.com/200x200.png?text=Oil',
                        },
                        {
                            id: '5',
                            name: 'Brown Bread',
                            quantity: '400g',
                            currentPrice: 45,
                            oldPrice: 55,
                            image: 'https://via.placeholder.com/200x200.png?text=Bread',
                        },
                     ];


    return (
        <View style={styles.container}>
            <View style={styles.topText_container}>
                <Text style={styles.mainText}>Best Deal</Text>
                <Text style={[styles.seeAllText, {color: Colors.light.icon}]}>See All</Text>
            </View>
            <View style={styles.categoryContainer}>  
                 <FlatList
                    data={products}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <OffersCard
                          name={item.name}
                          quantity={item.quantity}
                          currentPrice={item.currentPrice}
                          oldPrice={item.oldPrice}
                          image={item.image}
                      /> 
                    )}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    />
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
    mainText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '500',
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