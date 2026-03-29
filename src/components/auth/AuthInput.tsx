import { TextInput, type TextInputProps } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  onFocus?: TextInputProps["onFocus"];
};

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  onFocus,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onFocus={onFocus}
      className="border border-emerald-200 rounded-2xl px-4 py-4 text-base mb-4 bg-white text-textPrimary shadow-sm"
      placeholderTextColor="#9CA3AF"
      selectionColor="#5DBB63"
    />
  );
}
