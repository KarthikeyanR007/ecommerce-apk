import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import AuthInput from "../../components/auth/AuthInput";
import { register } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const setLoadingSafe = (value: boolean) => {
    if (isMountedRef.current) {
      setLoading(value);
    }
  };
  const handleRegister = async () => {
    console.log("REGISTER BUTTON PRESSED");

    if (!name || !email || !password) return;

    try {
      setLoadingSafe(true);
      console.log("Attempting register with:", { name, email });

      const data = await register({
        name,
        email,
        password,
      });

      // IMPORTANT: new signature → (token, user)
      await setAuth(data.token, { 
        ...data.user, 
        id: Number(data.user.id),
        phone: data.user.phone || "",
        homeAddress: data.user.homeAddress || "",
        officeAddress: data.user.officeAddress || ""
      });
      if(data.token !== undefined && data.token !== null && data.token !== ''){
        router.replace("/home");
      }
    } catch (err) {
      console.log("Register failed", err);
    } finally {
      setLoadingSafe(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
    >
      <View
        pointerEvents="none"
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full"
        style={{ backgroundColor: "#F28C28", opacity: 0.12 }}
      />
      <View
        pointerEvents="none"
        className="absolute top-40 -left-24 h-64 w-64 rounded-full"
        style={{ backgroundColor: "#F28C28", opacity: 0.08 }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 pb-10">
          {/* Header */}
          <View className="self-start rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <Text className="text-primary text-xs font-semibold">
              CREATE
            </Text>
          </View>
          <Text className="text-3xl font-extrabold text-textPrimary mt-4">
            Create Account
            <Text className="text-primary">.</Text>
          </Text>
          <Text className="text-textSecondary mt-2">
            Join for faster checkout and fresh deals
          </Text>

          <View className="bg-white rounded-3xl border border-gray-100 px-6 py-6 mt-8 shadow-md">
            <Text className="text-base font-semibold text-textPrimary mb-4">
              Your details
            </Text>
            {/* Inputs */}
            <AuthInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />

            <AuthInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <AuthInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className="bg-primary py-4 rounded-2xl mt-2 items-center shadow-sm"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Register
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
