// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface DecodedToken {
    sub: string;
    roles?: string;
    exp: number;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email");

        if (storedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(storedToken);

                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    logout();
                } else {
                    setToken(storedToken);
                    setEmail(storedEmail);
                    setIsAuthenticated(true);
                    setRoles(decoded.roles?.split(",") ?? []);
                }
            } catch (err) {
                console.error("Token inválido", err);
                logout();
            }
        }
    }, []);

    const login = (token: string, email: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        setToken(token);
        setEmail(email);
        setIsAuthenticated(true);

        try {
            const decoded: DecodedToken = jwtDecode(token);
            setRoles(decoded.roles?.split(",") ?? []);
        } catch (err) {
            console.error("Token inválido", err);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
        setEmail(null);
        setIsAuthenticated(false);
        setRoles([]);
        toast.success("Logout realizado con éxito");
    };

    return {
        token,
        email,
        roles,
        isAuthenticated,
        login,
        logout,
    };
};
