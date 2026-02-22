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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <Text className="text-3xl font-bold text-textPrimary mb-2">
            Create Account ✨
          </Text>
          <Text className="text-textSecondary mb-8">
            Sign up to start shopping
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
            className="bg-primary py-4 rounded-xl mt-4 items-center"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
