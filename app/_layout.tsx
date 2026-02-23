import "../global.css";

if (__DEV__) {
  require("../ReactotronConfig");
}
import { Slot } from "expo-router";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1,backgroundColor: "black" }} edges={["top", "bottom"]}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
