import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = (token: string) =>
  AsyncStorage.setItem("token", token);

export const getToken = () =>
  AsyncStorage.getItem("token");

export const removeToken = () =>
  AsyncStorage.removeItem("token");
