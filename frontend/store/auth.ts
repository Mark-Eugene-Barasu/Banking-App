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

interface User {
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
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem("token", token);
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },
      refreshUser: async () => {
        const { data } = await api.get("/auth/me");
        set({ user: data });
      },
    }),
    { name: "auth-store", partialize: (s) => ({ token: s.token, user: s.user }) }
  )
);
