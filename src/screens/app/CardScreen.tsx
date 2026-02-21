import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function CardScreen() {
  const router = useRouter();
  
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Card Screen</Text>
        </View>
    );
}