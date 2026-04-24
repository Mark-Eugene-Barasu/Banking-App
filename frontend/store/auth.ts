import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";

interface Account {
  id: string;
  accountNumber: string;
  type: string;
  balance: number;
  currency: string;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  accounts: Account[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: async () => {
        await api.post("/auth/logout").catch(() => {});
        set({ user: null, isAuthenticated: false });
      },
      refreshUser: async () => {
        const { data } = await api.get("/auth/me");
        set({ user: data, isAuthenticated: true });
      },
    }),
    {
      name: "auth-store",
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    }
  )
);
