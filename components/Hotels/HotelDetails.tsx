import { Hotel } from '@/types';
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

import { BadgeListFromJsonBigger } from "@/components/BagdeListFromJson"
import Link from "next/link"
import { useRouter } from "next/navigation"


const HotelDetails = ({ hotel }: { hotel: Hotel }) => {

    const router = useRouter();

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [guests, setGuests] = useState(2)

    const [showGallery, setShowGallery] = useState(false)

    const images = [
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
    ]

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="p-6" style={{ backgroundColor: "#3B234A" }}>

                <div className="max-w-6xl mx-auto">
                    <Button onClick={router.back} variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 mb-4 w-full flex justify-end">
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
                                    setShowGallery(true);
                                }}
                            >
                                Ver más
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {showGallery && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                        <div className="relative w-full max-w-4xl">
                            <Button
                                onClick={() => setShowGallery(false)}
                                className="absolute top-4 right-4 z-50 bg-white text-black"
                            >
                                Cerrar
                            </Button>

                            {/* Carrusel */}
                            <div className="flex overflow-x-auto space-x-4 p-4">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Imagen ${index + 1}`}
                                        className="h-[500px] object-contain rounded shadow-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

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

export default HotelDetails