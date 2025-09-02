"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IconRender from "./IconRender";
import { useLucideIconNames } from "@/hooks/useLucideIconNames";
import { Search } from "lucide-react";

type IconPickerProps = {
    value?: string;
    onChange: (name: string) => void;
    trigger?: React.ReactNode;
    title?: string;
};

export default function IconPicker({ value, onChange, title = "Elegir ícono" }: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");

    const allNames = useLucideIconNames();
    const names = open && Array.isArray(allNames) ? allNames : [];

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return names;
        return names.filter((n) => n.toLowerCase().includes(term));
    }, [q, names]);

    const listToRender = Array.isArray(filtered) ? filtered : [];

    const select = (name: string) => {
        onChange?.(name);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>

                <Button variant="outline" className="gap-2">
                    <IconRender name={value} />
                    {value ?? "Elegir ícono"}
                </Button>

            </DialogTrigger>

            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" />
                    <Input
                        placeholder="Buscar por nombre (Wifi, Car, Coffee, Waves, MapPin...)"
                        className="pl-9"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>

                {names.length === 0 ? (
                    <div className="p-6 text-sm opacity-70">Cargando íconos…</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[420px] overflow-auto">
                        {listToRender?.map((name) => (
                            <button
                                key={name}
                                onClick={() => select(name)}
                                className={`group border rounded-xl p-3 text-center hover:shadow transition 
                ${value === name ? "ring-2 ring-purple-600" : ""}`}
                                title={name}
                            >
                                <div className="flex items-center justify-center h-10">
                                    <IconRender name={name} />
                                </div>
                                <div className="mt-2 text-xs break-words opacity-80 group-hover:opacity-100">
                                    {name}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}