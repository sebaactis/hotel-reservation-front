"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

export default function AuthBootstrap() {
    const { bootstrap } = useAuthStore();
    useEffect(() => { bootstrap(); }, [bootstrap]); // se ejecuta una vez
    return null;
}