"use client";

import { useEffect, useState } from "react";

const BLACKLIST = new Set([
    "Icon",
    "createLucideIcon",
    "icons",
    "default",
    "LucideProps",
    "IconNode",
]);

export function useLucideIconNames() {
    const [names, setNames] = useState<string[]>([]);

    useEffect(() => {
        let alive = true;
        (async () => {
            const mod = await import("lucide-react");
            const all = Object.entries(mod)
                .filter(([k, v]) => {
                    if (BLACKLIST.has(k)) return false;

                    const isComponent = (typeof v === "function" || typeof v === "object") && /^[A-Z]/.test(k);
                    return isComponent;
                })
                .map(([k]) => k)
                .sort((a, b) => a.localeCompare(b));

            if (alive) setNames(all);
        })();

        return () => { alive = false; };
    }, []);

    return names;
}