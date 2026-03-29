import { api } from "../lib/api";
import { RegisterPayload, AuthResponse } from "../types/auth";
import { removeToken } from "../utils/storage";

/**
 * LOGIN
 */
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/login", {
    email,
    password,
  });
  console.log("Login response data:", res.data);
  return res.data;
};

/**
 * REGISTER
 */
export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/register", payload);
  console.log("Register response data:", res.data);
  return res.data;
};

/**
 * LOGOUT
 */
export const logout = async () => {
  try {
    await api.post("/logout");
    await removeToken();
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const sendOtp = async ({ phone }: { phone: string }) => {
  const res = await api.post("/auth/send-otp", { phone });
  return res.data;
};

export const verifyOtp = async ({ phone, otp }: { phone: string; otp: string }) => {
  const res = await api.post("/auth/verify-otp", { phone, otp });
  return res.data;
};

export const checkUsername = async ({ name }: { name: string }) => {
  const res = await api.post("/auth/check-username", { name });
  return res.data;
};
