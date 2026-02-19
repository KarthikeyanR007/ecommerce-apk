import "../global.css";

if (__DEV__) {
  require("../ReactotronConfig");
}
import { Slot } from "expo-router";
export default function RootLayout() {
  return <Slot />;
}
