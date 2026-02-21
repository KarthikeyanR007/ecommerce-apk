import { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TopHeader from "@/src/components/allitems_components/top_header";

export default function EditProfileScreen() {
    const router = useRouter();
    const [name, setName] = useState("Smith Mate");
    const [email, setEmail] = useState("smithmate@example.com");
    const [phone, setPhone] = useState("(205) 555-0100");
    const [address, setAddress] = useState("8502 Preston Rd. Inglewood, USA");
    const avatar = require("../../../assets/images/icon.png");

    const InputField = ({
        label,
        value,
        onChangeText,
        keyboardType,
        multiline,
    }: {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
        keyboardType?: "default" | "email-address" | "phone-pad";
        multiline?: boolean;
    }) => (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.inputMultiline]}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                multiline={multiline}
                placeholderTextColor="#9CA3AF"
            />
        </View>
    );

    return (
        <View style={styles.screen}>
            <TopHeader title="Edit Profile" />
             <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.avatarWrap}>
                    <Image source={avatar} style={styles.avatar} />
                    <View style={styles.avatarBadge}>
                        <Ionicons name="pencil" size={12} color="#fff" />
                    </View>
                </View>

                <InputField label="Name" value={name} onChangeText={setName} />
                <InputField
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <InputField
                    label="Mobile Number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <InputField
                    label="Enter Address"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                />

                <TouchableOpacity style={styles.updateButton}>
                    <Text style={styles.updateText}>Update</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bgCircle: {
        position: "absolute",
        top: -80,
        right: -60,
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: "rgba(88, 194, 110, 0.12)",
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    headerSpacer: {
        width: 24,
    },
    avatarWrap: {
        marginTop: 24,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 37,
    },
    avatarBadge: {
        position: "absolute",
        right: 125,
        bottom: 2,
        width: 25,
        height: 25,
        borderRadius: 10,
        backgroundColor: "#58C26E",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    field: {
        marginBottom: 14,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#58C26E",
        marginBottom: 6,
        marginLeft: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#58C26E",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: "#111827",
        backgroundColor: "#fff",
    },
    inputMultiline: {
        minHeight: 60,
        textAlignVertical: "top",
    },
    updateButton: {
        marginTop: 18,
        backgroundColor: "#58C26E",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
    },
    updateText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
});
