import {View, Text, StyleSheet, Image} from "react-native";

    interface CardProps {
        name: string;
        imgUrl?: string;
    }

export default function Card({name, imgUrl}: CardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.imgBox}>
                <Image 
                    source={{
                        uri: imgUrl
                        ? imgUrl
                        : "https://www.realsimple.com/thmb/ye0mpYw0p9_AyP52rFCOfuB2nF4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-174655938-0dee21af9296498986e417a7639f335d.jpg",
                     }}
                    style={styles.imgStyle}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.textBox}>
                <Text>{name}</Text>    
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        // padding: 10,
        paddingHorizontal: 12,
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
       alignItems: 'center',
    }
});