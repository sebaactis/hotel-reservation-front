import authApi from "@/services/auth/auth.service";
import { UserLoginResponse } from "@/types";
import { create } from "zustand"

type UserType = {
    email: string;
    name: string;
    lastName: string;
    userId: number;
    role: string;
}

type AuthState = {
    user: UserType | null;
    isAuthenticated: boolean;
    loading: boolean;

    setUser: (user: UserType) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setLoading: (loading: boolean) => void;

    bootstrap: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    setUser: (user) => set({ user }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setLoading: (loading) => set({ loading }),

    login: async (email: string, password: string) => {
        const data: UserLoginResponse = await authApi.login(email, password);
        set({ user: data.user, isAuthenticated: data.authenticated })
    },

    logout: async () => {
        await authApi.logout();
        set({ user: null, isAuthenticated: false })
    },

    bootstrap: async () => {
        set({ loading: true });
        try {
            const data = await authApi.getMe();
            if (data?.authenticated && data?.user) {
                set({ user: data.user, isAuthenticated: true });
            } else {
                set({ user: null, isAuthenticated: false });
            }
        } catch {
            set({ user: null, isAuthenticated: false });
        } finally {
            set({ loading: false });
        }
    },
}))