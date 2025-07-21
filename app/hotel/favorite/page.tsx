"use client"

import { useEffect, useState } from "react"
import { Heart, MapPin, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFavoritesStore } from "@/stores/favoritesStore"
import { useAuth } from "@/hooks/useAuth"

export default function FavoriteComponent() {

    const { userId } = useAuth();
    const { fetchFavorites, favoriteHotels } = useFavoritesStore();


    const [favorites, setFavorites] = useState([
        {
            id: 1,
            name: "Hotel Elegante Vista",
            location: "Centro Histórico, Barcelona",
            price: 89,
            rating: 8.9,
            image: "/placeholder.svg?height=80&width=120&text=Hotel+1",
        },
        {
            id: 2,
            name: "Gran Hotel Mediterráneo",
            location: "Playa de la Barceloneta, Barcelona",
            price: 156,
            rating: 9.2,
            image: "/placeholder.svg?height=80&width=120&text=Hotel+2",
        },
        {
            id: 3,
            name: "Hotel Boutique Gaudí",
            location: "Eixample, Barcelona",
            price: 134,
            rating: 8.7,
            image: "/placeholder.svg?height=80&width=120&text=Hotel+3",
        },
        {
            id: 4,
            name: "Hotel Modernista",
            location: "Gràcia, Barcelona",
            price: 98,
            rating: 8.5,
            image: "/placeholder.svg?height=80&width=120&text=Hotel+4",
        },
        {
            id: 5,
            name: "Hotel Ramblas Premium",
            location: "Las Ramblas, Barcelona",
            price: 112,
            rating: 8.8,
            image: "/placeholder.svg?height=80&width=120&text=Hotel+5",
        },
    ])

    const removeFromFavorites = (hotelId: number) => {
        setFavorites(favorites.filter((hotel) => hotel.id !== hotelId))
    }

    useEffect(() => {
        if (!userId) return;
        fetchFavorites(userId)
    }, [userId])

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <Card className="shadow-lg border-0">
                    <CardHeader style={{ backgroundColor: "#3B234A" }}>
                        <CardTitle className="text-white text-2xl font-bold flex items-center">
                            <Heart className="w-6 h-6 mr-3 fill-white" />
                            Mis Hoteles Favoritos
                        </CardTitle>
                        <p className="text-white opacity-90 text-sm mt-1">
                            {favorites.length} {favorites.length === 1 ? "hotel guardado" : "hoteles guardados"}
                        </p>
                    </CardHeader>
                </Card>

                {/* Lista de Favoritos */}
                <Card className="shadow-lg border-0">
                    <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                        {favorites.length > 0 ? (
                            <div className="space-y-0">
                                {favorites.map((hotel, index) => (
                                    <div
                                        key={hotel.id}
                                        className={`p-4 ${index !== favorites.length - 1 ? "border-b" : ""}`}
                                        style={{ borderColor: "#BAAFC4" }}
                                    >
                                        <div className="flex gap-4">
                                            {/* Imagen */}
                                            <img
                                                src={hotel.image || "/placeholder.svg"}
                                                alt={hotel.name}
                                                className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                            />

                                            {/* Información del Hotel */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-lg truncate" style={{ color: "#3B234A" }}>
                                                    {hotel.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-sm mb-2" style={{ color: "#523961" }}>
                                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">{hotel.location}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="font-medium text-sm" style={{ color: "#3B234A" }}>
                                                                {hotel.rating}
                                                            </span>
                                                        </div>
                                                        <div className="text-lg font-bold" style={{ color: "#3B234A" }}>
                                                            €{hotel.price}
                                                            <span className="text-sm font-normal text-gray-600 ml-1">por noche</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Botón Remover */}
                                            <div className="flex items-center">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => removeFromFavorites(hotel.id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <X className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: "#523961" }} />
                                <div className="text-lg font-medium mb-2" style={{ color: "#3B234A" }}>
                                    No tienes hoteles favoritos
                                </div>
                                <div className="text-sm text-gray-600 mb-4">
                                    Explora hoteles y marca los que más te gusten como favoritos
                                </div>
                                <Button
                                    className="text-white font-semibold hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: "#3B234A" }}
                                >
                                    Explorar Hoteles
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
