// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import authApi from "@/services/auth/auth.service";

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

            setUser(response.user);
            setIsAuthenticated(true);
        }

        getInfo();
    }, []);

    const login = async (email: string, password: string) => {
        const request = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        if (!request.ok) throw new Error("Login inválido");
        const data = await request.json();
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success("Login exitoso")
    };

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setUser(null);
        setIsAuthenticated(false);
        toast.success("Logout exitoso")
    };

    return { user, isAuthenticated, login, logout };
};
