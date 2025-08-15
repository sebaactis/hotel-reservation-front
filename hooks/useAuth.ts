// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import authApi from "@/services/auth/auth.service.ts";

type UserType = {
    email: string;
    name: string;
    lastName: string;
    userId: number;
    role: string;
}

export const useAuth = () => {

    const [user, setUser] = useState<UserType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const getInfo = async () => {
            const data = await authApi.getMe();
            setUser(data.user);
            setIsAuthenticated(true);
        }

        getInfo();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await authApi.login(email, password);
        setUser(data.user);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        await authApi.logout();
        setUser(null);
        setIsAuthenticated(false);
        toast.success("Logout exitoso")
    };

    return { user, isAuthenticated, login, logout };
};
