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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <Text className="text-3xl font-bold text-textPrimary mb-2">
            Welcome Back 👋
          </Text>
          <Text className="text-textSecondary mb-8">
            Login to continue shopping
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
            className="bg-primary py-4 rounded-xl mt-4 items-center"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
