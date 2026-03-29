import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import AuthInput from "../../components/auth/AuthInput";
import { sendOtp, verifyOtp, register } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";

// ─── Theme ────────────────────────────────────────────────────────────────────
const ACCENT        = "#5DBB63";
const ACCENT_SOFT   = "rgba(93, 187, 99, 0.12)";
const ACCENT_SOFT_ALT = "rgba(93, 187, 99, 0.08)";
const ACCENT_BORDER = "rgba(93, 187, 99, 0.2)";
const OTP_LENGTH    = 6;

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3;

// ─── OTP Box component ────────────────────────────────────────────────────────
function OtpBoxes({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Allow only digits
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const arr = value.padEnd(OTP_LENGTH, " ").split("");
    arr[index] = digit || " ";
    const next = arr.join("").trimEnd();
    onChange(next);

    // Auto-focus next box
    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace") {
      const arr = value.padEnd(OTP_LENGTH, " ").split("");
      if (arr[index].trim() === "" && index > 0) {
        // Current box empty → clear previous and go back
        arr[index - 1] = " ";
        onChange(arr.join("").trimEnd());
        inputs.current[index - 1]?.focus();
      } else {
        arr[index] = " ";
        onChange(arr.join("").trimEnd());
      }
    }
  };

  return (
    <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 12 }}>
      {Array.from({ length: OTP_LENGTH }).map((_, i) => {
        const char = (value[i] ?? "").trim();
        const isFocused = value.length === i || (i === OTP_LENGTH - 1 && value.length >= OTP_LENGTH);
        return (
          <TextInput
            key={i}
            ref={(r) => {
              inputs.current[i] = r;
            }}
            value={char}
            onChangeText={(t) => handleChange(t, i)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              width: 44,
              height: 52,
              borderRadius: 12,
              borderWidth: isFocused ? 1.5 : 1,
              borderColor: char ? ACCENT : isFocused ? ACCENT : "rgba(0,0,0,0.15)",
              backgroundColor: char ? ACCENT_SOFT : "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "700",
              color: "#1a1a1a",
            }}
          />
        );
      })}
    </View>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: Step }) {
  const steps = [1, 2, 3] as const;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
      {steps.map((s, idx) => (
        <View key={s} style={{ flexDirection: "row", alignItems: "center", flex: idx < 2 ? 1 : undefined }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: s < current ? ACCENT : s === current ? ACCENT : "rgba(0,0,0,0.08)",
            }}
          >
            {s < current ? (
              <Text style={{ color: "#fff", fontSize: 13, fontWeight: "700" }}>✓</Text>
            ) : (
              <Text
                style={{
                  color: s === current ? "#fff" : "rgba(0,0,0,0.35)",
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                {s}
              </Text>
            )}
          </View>
          {idx < 2 && (
            <View
              style={{
                flex: 1,
                height: 1.5,
                marginHorizontal: 4,
                backgroundColor: s < current ? ACCENT : "rgba(0,0,0,0.1)",
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function RegisterScreen() {
  // Step 1 state
  const [phone, setPhone] = useState("");

  // Step 2 state
  const [otp, setOtp]         = useState("");
  const [timer, setTimer]     = useState(30);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Step 3 state
  const [name, setName]         = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // Shared
  const [step, setStep]       = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  const setAuth  = useAuthStore((state) => state.setAuth);
  const router   = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates?.height ?? 0);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const safe = <T,>(fn: () => T) => { if (isMounted.current) fn(); };
  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  // ── Countdown timer ─────────────────────────────────────────────────────────
  const startCountdown = () => {
    safe(() => { setTimer(30); setCanResend(false); });
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          safe(() => setCanResend(true));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ── Step 1: Send OTP ─────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    const cleaned = phone.replace(/\s/g, "");
    if (cleaned.length < 10) {
      safe(() => setError("Enter Valid Phone Number"));
      return;
    }
    safe(() => { setError(""); setLoading(true); });
    try {
      await sendOtp({ phone: cleaned });
      safe(() => setStep(2));
      startCountdown();
    } catch (e: any) {
      safe(() => setError(e?.message ?? "Failed to send OTP — please try again"));
    } finally {
      safe(() => setLoading(false));
    }
  };

  // ── Step 2: Verify OTP ───────────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    if (otp.trim().length < OTP_LENGTH) {
      safe(() => setError("6-digit OTP is required"));
      return;
    }
    safe(() => { setError(""); setLoading(true); });
    try {
      await verifyOtp({ phone: phone.replace(/\s/g, ""), otp: otp.trim() });
      safe(() => { setStep(3); setOtp(""); });
    } catch (e: any) {
      safe(() => setError(e?.message ?? "Invalid OTP — please try again"));
    } finally {
      safe(() => setLoading(false));
    }
  };

  // ── Step 2: Resend OTP ───────────────────────────────────────────────────────
  const handleResend = async () => {
    if (!canResend) return;
    safe(() => { setError(""); setLoading(true); });
    try {
      await sendOtp({ phone: phone.replace(/\s/g, "") });
      safe(() => { setOtp(""); startCountdown(); });
    } catch (e: any) {
      safe(() => setError(e?.message ?? "Resend தப்பாச்சு"));
    } finally {
      safe(() => setLoading(false));
    }
  };

  // ── Step 3: Register ─────────────────────────────────────────────────────────
  const handleRegister = async () => {
    if (!name.trim())          return safe(() => setError("Name is required"));
    if (password.length < 8)   return safe(() => setError("Password must be at least 8 characters"));
    if (password !== confirmPw) return safe(() => setError("Passwords do not match"));

    safe(() => { setError(""); setLoading(true); });
    try {
      const data = await register({
        name: name.trim(),
        phone: phone.replace(/\s/g, ""),
        password,
      });

      await setAuth(data.token, {
        ...data.user,
        id: Number(data.user.id),
        phone: data.user.phone || "",
        homeAddress: data.user.homeAddress || "",
        officeAddress: data.user.officeAddress || "",
      });

      if (data.token) router.replace("/home");
    } catch (e: any) {
      safe(() => setError(e?.message ?? "Registration failed — please try again"));
    } finally {
      safe(() => setLoading(false));
    }
  };

  // ── Step labels ──────────────────────────────────────────────────────────────
  const stepTitle = ["Phone Number", "Verify OTP", "Your Details"][step - 1];
  const stepSub   = [
    "OTP will be sent — verify it",
    `${phone} - OTP sent to this number`,
    "Enter a few details",
  ][step - 1];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      {/* Background blobs */}
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
        ref={scrollRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 80,
          paddingBottom: Math.max(48, keyboardHeight + 24),
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View className="flex-1 px-6">
          {/* ── Header ── */}
          <View
            className="self-start rounded-full px-3 py-1"
            style={{ borderWidth: 1, borderColor: ACCENT_BORDER, backgroundColor: ACCENT_SOFT }}
          >
            <Text className="text-xs font-semibold" style={{ color: ACCENT }}>
              CREATE
            </Text>
          </View>
          <Text className="text-3xl font-extrabold text-textPrimary mt-4">
            Create Account<Text style={{ color: ACCENT }}>.</Text>
          </Text>
          <Text className="text-textSecondary mt-2">
            Join for faster checkout and fresh deals
          </Text>

          {/* ── Card ── */}
          <View className="bg-white rounded-3xl border border-gray-100 px-6 py-6 mt-8 shadow-md">
            <StepIndicator current={step} />

            <Text className="text-base font-semibold text-textPrimary mb-1">
              {stepTitle}
            </Text>
            <Text className="text-sm text-textSecondary mb-4">{stepSub}</Text>

            {/* Error banner */}
            {!!error && (
              <View
                style={{
                  backgroundColor: "rgba(220,53,69,0.08)",
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "rgba(220,53,69,0.2)",
                }}
              >
                <Text style={{ color: "#dc3545", fontSize: 13 }}>{error}</Text>
              </View>
            )}

            {/* ── STEP 1: Phone ── */}
            {step === 1 && (
              <>
                <AuthInput
                  placeholder="+91 9876543210"
                  value={phone}
                  onChangeText={(t) => { setPhone(t); setError(""); }}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity
                  onPress={handleSendOtp}
                  disabled={loading || phone.replace(/\s/g, "").length < 10}
                  className="py-4 rounded-2xl mt-3 items-center shadow-sm"
                  style={{
                    backgroundColor:
                      loading || phone.replace(/\s/g, "").length < 10
                        ? "rgba(93,187,99,0.4)"
                        : ACCENT,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-semibold text-base">
                      Send OTP
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 2 && (
              <>
                <OtpBoxes value={otp} onChange={(v) => { setOtp(v); setError(""); }} />

                {/* Resend row */}
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 4 }}>
                  {canResend ? (
                    <TouchableOpacity onPress={handleResend} disabled={loading}>
                      <Text style={{ color: ACCENT, fontSize: 13, fontWeight: "600" }}>
                        Resend OTP
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ color: "rgba(0,0,0,0.4)", fontSize: 13 }}>
                      Resend in{" "}
                      <Text style={{ fontWeight: "700", color: "rgba(0,0,0,0.6)" }}>
                        {timer}s
                      </Text>
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleVerifyOtp}
                  disabled={loading || otp.trim().length < OTP_LENGTH}
                  className="py-4 rounded-2xl mt-3 items-center shadow-sm"
                  style={{
                    backgroundColor:
                      loading || otp.trim().length < OTP_LENGTH
                        ? "rgba(93,187,99,0.4)"
                        : ACCENT,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-semibold text-base">
                      Verify OTP
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Back */}
                <TouchableOpacity
                  onPress={() => { setStep(1); setOtp(""); setError(""); }}
                  style={{ alignItems: "center", marginTop: 12 }}
                >
                  <Text style={{ color: "rgba(0,0,0,0.45)", fontSize: 13 }}>
                    ← Change number
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* ── STEP 3: Name + Password ── */}
            {step === 3 && (
              <>
                <AuthInput
                  placeholder="Full Name"
                  value={name}
                  onChangeText={(t) => { setName(t); setError(""); }}
                  onFocus={scrollToEnd}
                />
                <AuthInput
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChangeText={(t) => { setPassword(t); setError(""); }}
                  secureTextEntry
                  onFocus={scrollToEnd}
                />
                <AuthInput
                  placeholder="Confirm Password"
                  value={confirmPw}
                  onChangeText={(t) => { setConfirmPw(t); setError(""); }}
                  secureTextEntry
                  onFocus={scrollToEnd}
                />

                <TouchableOpacity
                  onPress={handleRegister}
                  disabled={loading}
                  className="py-4 rounded-2xl mt-2 items-center shadow-sm"
                  style={{ backgroundColor: loading ? "rgba(93,187,99,0.4)" : ACCENT }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-semibold text-base">
                      Create Account
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {/* ── Login link ── */}
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
