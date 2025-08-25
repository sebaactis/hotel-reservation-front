// components/HotelImages.tsx
"use client";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type HotelImage = { url: string };

type Props = {
    images?: Array<HotelImage | string>;
};

export default function HotelImages({ images = [] }: Props) {
    const [showGallery, setShowGallery] = useState(false);

    const normalized = useMemo<HotelImage[]>(
        () =>
            (images ?? [])
                .map((img) => (typeof img === "string" ? { url: img } : img))
                .filter((img): img is HotelImage => Boolean(img?.url)),
        [images]
    );

    const hasImages = normalized.length > 0;
    const mainUrl = hasImages ? normalized[0].url : "/placeholder.svg";
    const rest = hasImages ? normalized.slice(1, 5) : [];

    return (
        <>
            <Card className="overflow-hidden shadow-lg border-0">
                <CardContent className="p-0">
                    <div className="relative w-full">
                        {/* Desktop */}
                        <div className="hidden md:flex h-96">
                            <div className="w-1/2 relative">
                                <img
                                    src={mainUrl}
                                    alt="Imagen principal del hotel"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-1">
                                {rest.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image.url || "/placeholder.svg"}
                                            alt={`Hotel imagen ${index + 2}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}

                                {Array.from({ length: Math.max(0, 4 - rest.length) }).map((_, i) => (
                                    <div key={`ph-${i}`} className="relative">
                                        <img
                                            src="/placeholder.svg"
                                            alt="Placeholder"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:hidden">
                            <div className="relative h-64">
                                <img
                                    src={mainUrl}
                                    alt="Imagen principal del hotel"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-1 h-20">
                                {rest.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image.url || "/placeholder.svg"}
                                            alt={`Hotel imagen ${index + 2}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                {Array.from({ length: Math.max(0, 4 - rest.length) }).map((_, i) => (
                                    <div key={`ph-m-${i}`} className="relative">
                                        <img
                                            src="/placeholder.svg"
                                            alt="Placeholder"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            className="absolute bottom-4 right-4 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                            style={{ backgroundColor: "#3B234A" }}
                            onClick={() => setShowGallery(true)}
                            disabled={!hasImages}
                        >
                            Ver más
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Modal galería */}
            {showGallery && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <div className="relative w-full max-w-4xl">
                        <Button
                            onClick={() => setShowGallery(false)}
                            className="absolute top-4 right-4 z-50 bg-white text-black"
                        >
                            Cerrar
                        </Button>
                        <div className="flex overflow-x-auto space-x-4 p-4">
                            {normalized.length === 0 ? (
                                <img
                                    src="/placeholder.svg"
                                    alt="Placeholder"
                                    className="h-[500px] object-contain rounded shadow-lg"
                                />
                            ) : (
                                normalized.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`Imagen ${index + 1}`}
                                        className="h-[500px] object-contain rounded shadow-lg"
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
