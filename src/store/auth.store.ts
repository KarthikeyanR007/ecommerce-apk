import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../services/auth.service";
import { getCredentials, removeCredentials } from "../utils/storage";

let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let refreshing = false;

const clearRefreshTimer = () => {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
};

const getTokenExp = (token: string): number | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const buffer = (globalThis as { Buffer?: any }).Buffer;
    const decoded =
      typeof globalThis.atob === "function"
        ? globalThis.atob(padded)
        : buffer
          ? buffer.from(padded, "base64").toString("utf-8")
          : "";
    if (!decoded) return null;
    const parsed = JSON.parse(decoded);
    return typeof parsed.exp === "number" ? parsed.exp : null;
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string, skewSeconds = 60) => {
  const exp = getTokenExp(token);
  if (!exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return now >= exp - skewSeconds;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  homeAddress: string;
  officeAddress: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const scheduleRefresh = (token: string) => {
    clearRefreshTimer();
    const exp = getTokenExp(token);
    if (!exp) {
      refreshTimer = setTimeout(() => {
        void refreshToken();
      }, 10 * 60 * 1000);
      return;
    }
    const now = Math.floor(Date.now() / 1000);
    const refreshInMs = Math.max((exp - 60 - now) * 1000, 0);
    refreshTimer = setTimeout(() => {
      void refreshToken();
    }, refreshInMs);
  };

  const clearAuth = async () => {
    clearRefreshTimer();
    await AsyncStorage.multiRemove(["token", "user"]);
    set({ token: null, user: null, isAuthenticated: false });
  };

  const refreshToken = async () => {
    if (refreshing) return;
    refreshing = true;
    try {
      const { email, password } = await getCredentials();
      if (!email || !password) {
        await removeCredentials();
        await clearAuth();
        return;
      }
      const data = await login(email, password);
      if (!data?.token) {
        await removeCredentials();
        await clearAuth();
        return;
      }
      await get().setAuth(data.token, { ...data.user, id: Number(data.user.id) });
    } catch {
      await removeCredentials();
      await clearAuth();
    } finally {
      refreshing = false;
    }
  };

  return {
    user: null,
    token: null,
    isAuthenticated: false,

    setAuth: async (token, user) => {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
      });

      scheduleRefresh(token);
    },

    hydrate: async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token && user && !isTokenExpired(token)) {
        set({
          token,
          user: JSON.parse(user),
          isAuthenticated: true,
        });
        scheduleRefresh(token);
        return;
      }

      await refreshToken();
    },

    logout: async () => {
      await removeCredentials();
      await clearAuth();
    },
  };
});
