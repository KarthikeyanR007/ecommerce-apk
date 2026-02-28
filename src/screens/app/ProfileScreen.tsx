// import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import  ProfileTop  from "../../components/profile_components/profile_top"; 
import ProfileMenuItem from "../../components/profile_components/ProfileMenuItem";
import BottomNav from "../../components/home_components/bottom_nav";
import ProfileLogoutButton from "../../components/profile_components/profile_logout_button";
// import { api } from "../../lib/api";
// import { UserProfile } from "../../types/types";

export default function ProfileScreen() {

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
    }
});
