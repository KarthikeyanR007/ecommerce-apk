import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { CartItem, Product } from "../types/types";

const CART_STORAGE_KEY = "cartItems";

const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeItems = (items: CartItem[]) =>
  items.map((item) => ({
    ...item,
    quantity: Math.max(1, toNumber(item.quantity, 1)),
  }));

const mergeItems = (current: CartItem[], stored: CartItem[]) => {
  const map = new Map<number, CartItem>();
  const add = (item: CartItem) => {
    const existing = map.get(item.product_id);
    if (existing) {
      map.set(item.product_id, {
        ...existing,
        ...item,
        quantity:
          toNumber(existing.quantity, 1) + toNumber(item.quantity, 1),
      });
    } else {
      map.set(item.product_id, {
        ...item,
        quantity: Math.max(1, toNumber(item.quantity, 1)),
      });
    }
  };

  current.forEach(add);
  stored.forEach(add);
  return Array.from(map.values());
};

const persistItems = async (items: CartItem[]) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart items", error);
  }
};

interface CartState {
  items: CartItem[];
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  addItem: (item: Product, quantity?: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isHydrated: false,

  hydrate: async () => {
    if (get().isHydrated) return;
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
      const parsed = stored ? (JSON.parse(stored) as CartItem[]) : [];
      const normalized = Array.isArray(parsed) ? normalizeItems(parsed) : [];
      const merged = mergeItems(get().items, normalized);
      set({ items: merged, isHydrated: true });
      void persistItems(merged);
    } catch (error) {
      console.error("Failed to load cart items", error);
      set({ items: [], isHydrated: true });
    }
  },

  addItem: (product, quantity = 1) => {
    set((state) => {
      const qty = Math.max(1, toNumber(quantity, 1));
      const existingIndex = state.items.findIndex(
        (item) => item.product_id === product.product_id
      );

      let nextItems: CartItem[];
      if (existingIndex === -1) {
        nextItems = [...state.items, { ...product, quantity: qty }];
      } else {
        nextItems = state.items.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: toNumber(item.quantity, 1) + qty,
              }
            : item
        );
      }

      void persistItems(nextItems);
      return { items: nextItems, isHydrated: true };
    });
  },

  updateQuantity: (productId, delta) => {
    set((state) => {
      const nextItems = state.items.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                toNumber(item.quantity, 1) + toNumber(delta, 0)
              ),
            }
          : item
      );
      void persistItems(nextItems);
      return { items: nextItems, isHydrated: true };
    });
  },

  removeItem: (productId) => {
    set((state) => {
      const nextItems = state.items.filter(
        (item) => item.product_id !== productId
      );
      void persistItems(nextItems);
      return { items: nextItems, isHydrated: true };
    });
  },

  clear: () => {
    set({ items: [], isHydrated: true });
    AsyncStorage.removeItem(CART_STORAGE_KEY).catch((error) =>
      console.error("Failed to clear cart items", error)
    );
  },
}));
