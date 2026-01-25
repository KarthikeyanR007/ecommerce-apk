import { api } from "../lib/api";
import { RegisterPayload, AuthResponse } from "../types/auth";

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
