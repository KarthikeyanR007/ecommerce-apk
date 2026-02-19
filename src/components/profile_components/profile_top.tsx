import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { api } from "../../lib/api";

export default function ProfileTop() {
    return(
        <View style={styles.container}  >
            <Text style={styles.title} >My Profile</Text>
            <View style={styles.profileSection}>
                <View  style={styles.imageContainer}>
                   <Image
                    source={require("../../../assets/images/icon.png")}
                    style={styles.profileImage}
                    // className="border border-red-500"
                   />
                </View>
                <View >
                    <Text style={styles.name}>Smith Mate</Text> 
                    <Text style={styles.email}>smithmate@example.com</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        backgroundColor: "#5AC268",
        height: 230,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
        // marginBottom: 20,
        alignItems:"center",
        justifyContent:"center",
        // marginTop: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
    },
    email: {
        marginTop: 6,
        color: "#fff",
    },
    title: {
        marginTop: 70,
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "flex-start",
        marginTop: 20,
        paddingHorizontal: 30,
    },
    imageContainer: {
        marginRight: 20,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
});
