import {View, Text, StyleSheet, Pressable, Image, Animated } from "react-native";
import { useRef } from "react";

export default function Voucher() {
    
    const scale = useRef(new Animated.Value(1)).current;
    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.93,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.topText_container}>
                <Text style={styles.textStyle}>World Food Festival,Bring the world to your kitchen!</Text>
                <Animated.View style={{ transform: [{ scale }] }}>
                   <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => console.log("pressed")}
                    style={{
                        backgroundColor: "#66C37A",
                        paddingVertical: 12,
                        paddingHorizontal: 32,
                        borderRadius: 999,
                        alignItems: "center",
                    }}
                >
                <Text
                    style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "600",
                    }}
                >
                    Shop Now
                </Text>
                   </Pressable>
                </Animated.View>
            </View>
            <View style={styles.imgContainer}>
                <Image
                    source={{ uri: 'https://static.betterretailing.com/wp-content/uploads/2024/10/15161755/boost-energy-500ml-976x549.jpg' }}
                    style={styles.imgBox}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEF9F0',
        padding: 16,
        width: '90%',
        borderRadius: 20,
        height: 180,
        flexDirection: 'row',
        marginTop:15
    },
    topText_container: {
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
        width: '50%',
    },
    mainText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: '500',
    },
    imgContainer: {
        paddingTop: 10,
        width: '50%',
    },
    imgBox:{
        width: '100%',
        height: 120, 
        borderRadius: 12
    },
    textStyle:{
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        lineHeight: 22,   
    },
    textShopNow:{
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
    },
    buttonStyle:{
        backgroundColor: '#4CAF65',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50, // full pill
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        height: 45,
        elevation: 4,
    }

});