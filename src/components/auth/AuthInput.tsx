import { TextInput } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      className="border border-emerald-200 rounded-2xl px-4 py-4 text-base mb-4 bg-white text-textPrimary shadow-sm"
      placeholderTextColor="#9CA3AF"
      selectionColor="#5DBB63"
    />
  );
}
