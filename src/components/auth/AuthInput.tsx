import { Text, TextInput, TouchableOpacity, View, type TextInputProps } from "react-native";
import { useState } from "react";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  onFocus?: TextInputProps["onFocus"];
  showSecureToggle?: boolean;
};

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  onFocus,
  showSecureToggle = false,
}: Props) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const shouldToggle = showSecureToggle && secureTextEntry;
  const effectiveSecure = shouldToggle ? isSecure : secureTextEntry;

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={effectiveSecure}
        keyboardType={keyboardType}
        onFocus={onFocus}
        className={`border border-emerald-200 rounded-2xl px-4 py-4 text-base mb-4 bg-white text-textPrimary shadow-sm ${shouldToggle ? "pr-12" : ""}`}
        placeholderTextColor="#9CA3AF"
        selectionColor="#5DBB63"
      />
      {shouldToggle && (
        <TouchableOpacity
          onPress={() => setIsSecure((s) => !s)}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: [{ translateY: -10 }],
            paddingHorizontal: 4,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: "#5DBB63", fontSize: 12, fontWeight: "600" }}>
            {isSecure ? "Show" : "Hide"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
