import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = (token: string) =>
  AsyncStorage.setItem("token", token);

export const getToken = () =>
  AsyncStorage.getItem("token");

export const removeToken = () =>
  AsyncStorage.removeItem("token");

export const storeCredentials = (email: string, password: string) =>
  AsyncStorage.multiSet([
    ["email", email],
    ["password", password],
  ]);

export const getCredentials = async () => {
  const entries = await AsyncStorage.multiGet(["email", "password"]);
  const emailEntry = entries.find(([k]) => k === "email");
  const passwordEntry = entries.find(([k]) => k === "password");
  return {
    email: emailEntry?.[1] ?? "",
    password: passwordEntry?.[1] ?? "",
  };
};

export const removeCredentials = () =>
  AsyncStorage.multiRemove(["email", "password"]);
