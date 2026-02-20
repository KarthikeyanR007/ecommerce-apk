// import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import  ProfileTop  from "../../components/profile_components/profile_top"; 
import ProfileMenuItem from "../../components/profile_components/ProfileMenuItem";
import BottomNav from "../../components/home_components/bottom_nav";
import ProfileLogoutButton from "../../components/profile_components/profile_logout_button";
// import { api } from "../../lib/api";
// import { UserProfile } from "../../types/types";

export default function ProfileScreen() {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const placeholderImage = require("../../../assets/images/icon.png");

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const response = await api.get<UserProfile>("/user/profile");
    //             const data = response.data;
    //             setProfile(data);
    //             console.log("Fetched user profile", data);
    //         } catch (error) {
    //             console.error("Failed to fetch user profile", error);
    //         }
    //     };
    //     fetchProfile();
    // }, []);

//   if (!profile) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading profile...</Text>
//       </View>
//     );
//   }

    return (
        <View style={styles.screen}>
            <ProfileTop />
            <ProfileMenuItem />
            <ProfileLogoutButton />
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
   screen: {
     flex: 1,
     backgroundColor: "#fff",
    },
   container: {
     flex: 1,
        alignItems: "center",   
        justifyContent: "center",
        paddingBottom: 120,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: "#666",



        },
    item: {      flexDirection: "row",  
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,


        borderBottomColor: "#E5E7EB",
        },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemPrice: {
        fontSize: 14,
        color: "#6B7280",
    },
    addBtn: {   
        backgroundColor: "#22C55E",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    }});
