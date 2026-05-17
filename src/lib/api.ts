import axios, { type InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "https://33ef-2401-4900-633b-49ae-15bf-887f-a85b-41f8.ngrok-free.app/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const IMAGE_URL = "https://33ef-2401-4900-633b-49ae-15bf-887f-a85b-41f8.ngrok-free.app/storage/";