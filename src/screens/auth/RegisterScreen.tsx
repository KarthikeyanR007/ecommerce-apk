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

const ACCENT = "#5DBB63";
const ACCENT_SOFT = "rgba(93, 187, 99, 0.12)";
const ACCENT_SOFT_ALT = "rgba(93, 187, 99, 0.08)";
const ACCENT_BORDER = "rgba(93, 187, 99, 0.2)";

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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View
        pointerEvents="none"
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full"
        style={{ backgroundColor: ACCENT_SOFT }}
      />
      <View
        pointerEvents="none"
        className="absolute top-40 -left-24 h-64 w-64 rounded-full"
        style={{ backgroundColor: ACCENT_SOFT_ALT }}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingTop: 80, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View className="flex-1 px-6">
          {/* Header */}
          <View
            className="self-start rounded-full px-3 py-1"
            style={{ borderWidth: 1, borderColor: ACCENT_BORDER, backgroundColor: ACCENT_SOFT }}
          >
            <Text className="text-xs font-semibold" style={{ color: ACCENT }}>
              CREATE
            </Text>
          </View>
          <Text className="text-3xl font-extrabold text-textPrimary mt-4">
            Create Account
            <Text style={{ color: ACCENT }}>.</Text>
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
              className="py-4 rounded-2xl mt-2 items-center shadow-sm"
              style={{ backgroundColor: ACCENT }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Register
                </Text>
              )}
            </TouchableOpacity>
            <View className="flex-row justify-center mt-5">
              <Text className="text-textSecondary mr-1">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="font-semibold" style={{ color: ACCENT }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
