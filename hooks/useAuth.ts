// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface DecodedToken {
    sub: string;
    role?: string;
    exp: number;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [role, setRole] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email");
        const storesUserId = localStorage.getItem("userId");

        if (storedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(storedToken);

                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    logout();
                } else {
                    setToken(storedToken);
                    setEmail(storedEmail);
                    setUserId(storesUserId);
                    setIsAuthenticated(true);
                    setRole(decoded.role.name);
                }
            } catch (err) {
                console.error("Token inválido", err);
                logout();
            }
        }
    }, []);

    const login = (token: string, email: string, userId: number) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", userId);
        setToken(token);
        setUserId(userId);
        setEmail(email);

        setIsAuthenticated(true);

        try {
            const decoded: DecodedToken = jwtDecode(token);
            setRole(decoded.role.name ?? "");

        } catch (err) {
            console.error("Token inválido", err);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        setToken(null);
        setEmail(null);
        setUserId(null);
        setIsAuthenticated(false);
        setRole("");
        toast.success("Logout realizado con éxito");
    };

    return {
        token,
        email,
        userId,
        role,
        isAuthenticated,
        login,
        logout,
    };
};
