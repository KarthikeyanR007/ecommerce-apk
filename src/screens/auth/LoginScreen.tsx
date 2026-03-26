import { useRouter } from "expo-router";
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
import AuthInput from "../../components/auth/AuthInput";
import { login } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

export default function LoginScreen() {

  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);
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

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      setLoadingSafe(true);
      console.log("Attempting login with:", { email, password });
      const data = await login(email, password);
      setAuth(data.token, { ...data.user, id: Number(data.user.id) });
      if(data.token !== undefined && data.token !== null && data.token !== ''){
        router.replace("/home");
      }
    } catch (err) {
      console.log("Login failed", err);
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
              WELCOME
            </Text>
          </View>
          <Text className="text-3xl font-extrabold text-textPrimary mt-4">
            Welcome Back
            <Text className="text-primary">.</Text>
          </Text>
          <Text className="text-textSecondary mt-2">
            Login to continue your fresh picks
          </Text>

          <View className="bg-white rounded-3xl border border-gray-100 px-6 py-6 mt-8 shadow-md">
            <Text className="text-base font-semibold text-textPrimary mb-4">
              Your account
            </Text>
            {/* Inputs */}
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
              onPress={handleLogin}
              disabled={loading}
              className="bg-primary py-4 rounded-2xl mt-2 items-center shadow-sm"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Login
                </Text>
              )}
            </TouchableOpacity>
            <View className="flex-row justify-center mt-5">
              <Text className="text-textSecondary mr-1">
                New user?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/register")}
              >
                <Text className="text-primary font-semibold">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
