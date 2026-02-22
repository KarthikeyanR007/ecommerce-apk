import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuthStore } from "../../store/auth.store";


export default function ProfileTop() {
    const user = useAuthStore((state) => state.user);
    const hydrate = useAuthStore((state) => state.hydrate);

    useEffect(() => {
        if (!user) {
            hydrate();
        }
        console.log('user details ',user);
    }, [user, hydrate]);

    return(
        <View style={styles.container}  >
            <Text style={styles.title} >My Profile</Text>
            <View style={styles.profileSection}>
                <View  style={styles.imageContainer}>
                   <Image
                    source={require("../../../assets/images/icon.png")}
                    style={styles.profileImage}
                   />
                </View>
                <View >
                    <Text style={styles.name}>{user?.name ?? "Guest"}</Text> 
                    <Text style={styles.email}>{user?.email ?? "guest@example.com"}</Text>
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
        alignItems:"center",
        justifyContent:"center",
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
