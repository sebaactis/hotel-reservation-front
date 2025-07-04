"use client"

import { useEffect, useState } from "react"
import {
    ArrowLeft,
    MapPin,
    Wifi,
    Car,
    Coffee,
    Waves,
    Utensils,
    Dumbbell,
    Shirt,
    Phone,
    Mail,
    Calendar,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import { Hotel } from "@/types"
import { BadgeListFromJsonBigger } from "@/components/BagdeListFromJson"

export default function HotelDetails() {

    const { id } = useParams({});

    const [hotel, setHotel] = useState<Hotel>({});
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [guests, setGuests] = useState(2)

    const images = [
        "/placeholder.svg?height=400&width=600&text=Imagen+Principal",
        "/placeholder.svg?height=200&width=300&text=Imagen+2",
        "/placeholder.svg?height=200&width=300&text=Imagen+3",
        "/placeholder.svg?height=200&width=300&text=Imagen+4",
        "/placeholder.svg?height=200&width=300&text=Imagen+5",
    ]

    const amenities = [
        { icon: Wifi, label: "WiFi Gratis" },
        { icon: Car, label: "Parking Gratuito" },
        { icon: Coffee, label: "Desayuno Incluido" },
        { icon: Waves, label: "Piscina" },
        { icon: Utensils, label: "Restaurante" },
        { icon: Dumbbell, label: "Gimnasio" },
        { icon: Shirt, label: "Servicio de Lavandería" },
    ]

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/hotel/${id}`)
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del hotel")
                }
                const data = await response.json()
                setHotel(data.entity)
            } catch (error) {
                console.error("Error fetching hotel data:", error)
            }
        }

        fetchHotel();
    }, [])

    console.log(hotel)

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="p-6" style={{ backgroundColor: "#3B234A" }}>
                <div className="max-w-6xl mx-auto">
                    <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a resultados
                    </Button>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-2">{hotel.name}</h1>
                            <div className="flex items-center gap-2 text-white mb-4">
                                <MapPin className="w-5 h-5" />
                                <span>{hotel.location}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl border-2 border-white">
                                    {hotel.score}
                                </div>
                                <div className="text-white">
                                    <p className="text-lg font-semibold">{hotel.score > 6 ? "Excelente" : "Normal"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-right text-white">
                            <div className="text-3xl font-bold">ARS($) {hotel.price}</div>
                            <div className="text-sm opacity-90">por noche</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 space-y-6">

                <Card className="overflow-hidden shadow-lg border-0">
                    <CardContent className="p-0">
                        <div className="relative w-full">

                            <div className="hidden md:flex h-96">

                                <div className="w-1/2 relative">
                                    <img
                                        src={images[0] || "/placeholder.svg"}
                                        alt="Imagen principal del hotel"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-1">
                                    {images.slice(1, 5).map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image || "/placeholder.svg"}
                                                alt={`Hotel imagen ${index + 2}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="md:hidden">

                                <div className="relative h-64">
                                    <img
                                        src={images[0] || "/placeholder.svg"}
                                        alt="Imagen principal del hotel"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-1 h-20">
                                    {images.slice(1, 5).map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image || "/placeholder.svg"}
                                                alt={`Hotel imagen ${index + 2}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                className="absolute bottom-4 right-4 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                                style={{ backgroundColor: "#3B234A" }}
                                onClick={() => {
                                    console.log("Abrir galería completa")
                                }}
                            >
                                Ver más
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">

                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <CardTitle style={{ color: "#3B234A" }}>Acerca de este hotel</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {hotel.description}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <CardTitle style={{ color: "#3B234A" }}>Servicios y Amenidades</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                {hotel && hotel.features ? (
                                    <BadgeListFromJsonBigger key={hotel.id} features={hotel.features} />
                                ) : (
                                    "Esperando datos del hotel..."
                                )}
                            </CardContent>
                        </Card>

                    </div>

                    <div className="space-y-6">

                        <Card className="shadow-lg border-0 top-6">
                            <CardHeader style={{ backgroundColor: "#3B234A" }}>
                                <CardTitle className="text-white text-center">Reservar Ahora</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium" style={{ color: "#523961" }}>
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Check-in
                                        </label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="w-full mt-1 p-2 border-2 rounded focus:outline-none"
                                            style={{ borderColor: "#BAAFC4" }}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium" style={{ color: "#523961" }}>
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Check-out
                                        </label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full mt-1 p-2 border-2 rounded focus:outline-none"
                                            style={{ borderColor: "#BAAFC4" }}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium" style={{ color: "#523961" }}>
                                            <Users className="w-4 h-4 inline mr-1" />
                                            Huéspedes
                                        </label>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                                            className="w-full mt-1 p-2 border-2 rounded focus:outline-none"
                                            style={{ borderColor: "#BAAFC4" }}
                                        >
                                            <option value={1}>1 Huésped</option>
                                            <option value={2}>2 Huéspedes</option>
                                            <option value={3}>3 Huéspedes</option>
                                            <option value={4}>4 Huéspedes</option>
                                        </select>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium" style={{ color: "#523961" }}>
                                            Total por noche:
                                        </span>
                                        <span className="text-2xl font-bold" style={{ color: "#3B234A" }}>
                                            ARS 15000
                                        </span>
                                    </div>

                                    <Button
                                        className="w-full text-white font-semibold py-3 hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#3B234A" }}
                                    >
                                        Reservar Ahora
                                    </Button>

                                    <p className="text-xs text-center text-gray-600">Cancelación gratuita hasta 24h antes</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <CardTitle style={{ color: "#3B234A" }}>Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5" style={{ color: "#523961" }} />
                                        <span className="text-sm" style={{ color: "#523961" }}>
                                            +34 123 456 789
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5" style={{ color: "#523961" }} />
                                        <span className="text-sm" style={{ color: "#523961" }}>
                                            info@hotelelegante.com
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5" style={{ color: "#523961" }} />
                                        <span className="text-sm" style={{ color: "#523961" }}>
                                            Calle Ejemplo 123
                                            <br />
                                            08001 Barcelona, España
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
