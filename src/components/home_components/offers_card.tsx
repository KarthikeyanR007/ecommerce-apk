import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import { Colors } from "@/constants/theme";

interface OffersCardProps {
    name: string;
    quantity: string;
    currentPrice: number;
    oldPrice: number;
    image: string;
}

export default function OffersCard({name, quantity, currentPrice, oldPrice, image}: OffersCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.imgBox}>
                <Image 
                    source={{ uri: 'https://www.realsimple.com/thmb/ye0mpYw0p9_AyP52rFCOfuB2nF4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-174655938-0dee21af9296498986e417a7639f335d.jpg' }}
                    style={styles.imgStyle}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.textBox}>
                <Text style={styles.ItemName}>{name}</Text> 
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8}}>
                    <View>
                        <Text style={styles.ItemQuantity}>{quantity}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.currentPrice}>${currentPrice}</Text>
                            <Text style={styles.oldPrice}>${oldPrice}</Text>
                        </View>
                    </View>
                    <View style={[styles.addButton, {backgroundColor: Colors.light.icon}]}>
                        <Pressable>
                            <Text>Add</Text>
                        </Pressable>
                    </View>
                </View>   
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginHorizontal: 8,
        width: 140,
    },
    imgBox: {
        height: 80,
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        marginBottom: 8,
    },
    imgStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    textBox: {
       //alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
    ItemName:{
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
    ItemQuantity: {
        fontSize: 12,
        color: '#555',
       textAlign: 'left'
    },
    currentPrice:{

    },
    oldPrice: {
        fontSize: 12,
        color: '#555',
        textDecorationLine: 'line-through',
    },
    addButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 6, 
        paddingHorizontal: 10,
        borderRadius: 10,
        margin: 10,
    },
});