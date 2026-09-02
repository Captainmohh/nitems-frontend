import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi, userApi } from "@/lib/api";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string;
  role: "ADMIN" | "HR" | "EMPLOYEE";
  isVerified: boolean;
  isBanned: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
  refreshProfile: () => Promise<void>;
  isAdmin: () => boolean;
  isHr: () => boolean;
}

function decodeJwt(token: string): Partial<User> {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      isVerified: true,
      isBanned: false,
    };
  } catch {
    return {};
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,

      setTokens: (accessToken, refreshToken) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        set({ accessToken, refreshToken });
      },

      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const data = await authApi.signIn({ email, password });
          get().setTokens(data.accessToken, data.refreshToken);
          const base = decodeJwt(data.accessToken);
          set({
            user: {
              firstName: "",
              lastName: "",
              phone: null,
              ...base,
            } as User,
          });
          await get().refreshProfile();
        } finally {
          set({ isLoading: false });
        }
      },

      refreshProfile: async () => {
        try {
          const profile = await userApi.getMe();
          set((s) => ({
            user: s.user
              ? {
                  ...s.user,
                  firstName: profile.firstName ?? "",
                  lastName: profile.lastName ?? "",
                  phone: profile.phone ?? null,
                  role: profile.role,
                }
              : null,
          }));
        } catch {
          /* non-fatal */
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch {
          /* ignore */
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ user: null, accessToken: null, refreshToken: null });
      },

      isAdmin: () => get().user?.role === "ADMIN",
      isHr: () => {
        const r = get().user?.role;
        return r === "ADMIN" || r === "HR";
      },
    }),
    {
      name: "erp-auth",
      version: 1,
      partialize: (s) => ({
        user: s.user,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
    }
  )
);
