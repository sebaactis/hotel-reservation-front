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
    CalendarIcon,
    ChevronDown,
    Heart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { BadgeListFromJsonBigger } from "@/components/BagdeListFromJson"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HotelDetailSkeletonNames, HotelDetailsSkeletonBagdes, HotelDetailsSkeletonDescription, HotelDetailsSkeletonRating } from './HotelDetailSkeletons';
import { colorsAux } from '@/styles/colorsAux';
import { useAuth } from '@/hooks/useAuth';
import { useFavoritesStore } from '@/stores/favoritesStore';


const HotelDetails = ({ hotel }: { hotel: Hotel }) => {

    const router = useRouter();
    const { token, userId } = useAuth();
    const { fetchFavorites, favoriteHotelIds, toggleFavorite } = useFavoritesStore();

    const [reservations, setReservations] = useState([]);

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkOutOpen, setCheckOutOpen] = useState(false);

    const [showGallery, setShowGallery] = useState(false)

    const images = [
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
    ]

    const formatDateRange = (date: Date | undefined): string => {
        if (!date) return "Seleccionar fecha"

        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    let disabledRanges = [];

    if (reservations && Array.isArray(reservations)) {
        disabledRanges = reservations.map(reservation => ({
            from: new Date(reservation.bookedFrom),
            to: new Date(reservation.bookedTo)
        }));
    }

    const isDateDisabled = (date: Date) => {
        return disabledRanges.some(range =>
            date >= range.from && date <= range.to
        );
    };

    const isFavoriteHotel = (hotelId: number) => {
        return favoriteHotelIds.includes(hotelId);
    }


    const handleSubmit = () => {
        console.log(hotel.id, checkIn, checkOut)
    }

    useEffect(() => {
        if (!hotel.id) return;
        try {
            const getReservations = async () => {
                const request = await fetch(`http://localhost:8080/api/v1/hotelBooking/${hotel.id}`)
                const response = await request.json();

                if (request.ok) {
                    setReservations(response.entity);
                }
            }

            getReservations();
        } catch (error) {
            console.log(error)
        }
    }, [hotel?.id])

    useEffect(() => {

        if (!userId) return;
        fetchFavorites(userId);

    }, [userId])

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
                            {!hotel.name ?
                                <HotelDetailSkeletonNames width={"21.8rem"} />
                                :
                                <div className='flex items-center gap-3 mb-2 cursor-pointer'>
                                    <h1 className="text-3xl font-bold text-white">{hotel.name}</h1>
                                    <button onClick={() => toggleFavorite(userId, hotel.id)}>{isFavoriteHotel(hotel.id) ? <Heart className='fill-red-500 text-red-500' /> : <Heart />}</button>
                                </div>
                            }


                            <div className="flex items-center gap-2 text-white mb-4">
                                <MapPin className="w-5 h-5" />
                                {!hotel.location ? <HotelDetailSkeletonNames width={"20rem"} /> : <span>{hotel.location}</span>}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl border-2 border-white">
                                    {!hotel.score ? <HotelDetailsSkeletonRating /> : <span>{hotel.score} </span>}
                                </div>
                                <div className="text-white">
                                    <p className="text-lg font-semibold">{hotel.score > 6 ? "Excelente" : "Normal"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-right text-white">
                            <div className="text-3xl font-bold">
                                {!hotel.price ? <HotelDetailSkeletonNames width={"10rem"} /> : <span>ARS($) {hotel.price}</span>}
                            </div>
                            <div className="text-sm opacity-90">
                                {!hotel.price ? <HotelDetailSkeletonNames width={"10rem"} /> : <span>por noche</span>}

                            </div>
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
                                {!hotel.description ? <HotelDetailsSkeletonDescription /> :
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {hotel.description}
                                    </p>
                                }
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <CardTitle style={{ color: "#3B234A" }}>Servicios y Amenidades</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                {!hotel.features ? (
                                    <HotelDetailsSkeletonBagdes />
                                ) : (
                                    <BadgeListFromJsonBigger key={hotel.id} features={hotel.features} />
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

                                        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                                            <PopoverTrigger asChild>
                                                <button
                                                    id="dates"
                                                    className="w-full flex items-center justify-between p-3 rounded-md border-2 bg-white"
                                                    style={{ borderColor: "#523961" }}
                                                >
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="w-5 h-5 mr-2" style={{ color: "#523961" }} />
                                                        <span style={{ color: colorsAux.darkprimary }}>
                                                            {formatDateRange(checkIn)}
                                                        </span>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4" style={{ color: "#523961" }} />
                                                </button>
                                            </PopoverTrigger>

                                            <PopoverContent>
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={checkIn}
                                                    onSelect={(date) => setCheckIn(date)}
                                                    numberOfMonths={1}
                                                    className="rounded-lg border"
                                                    classNames={{
                                                        disabled: "text-red-400 line-through",
                                                    }}
                                                    disabled={(date) => isDateDisabled(date)}
                                                />
                                            </PopoverContent>
                                        </Popover>

                                    </div>

                                    <div>
                                        <label className="text-sm font-medium" style={{ color: "#523961" }}>
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Check-out
                                        </label>

                                        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                                            <PopoverTrigger asChild>
                                                <button
                                                    id="dates"
                                                    className="w-full flex items-center justify-between p-3 rounded-md border-2 bg-white"
                                                    style={{ borderColor: "#523961" }}
                                                >
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="w-5 h-5 mr-2" style={{ color: "#523961" }} />
                                                        <span style={{ color: colorsAux.darkprimary }}>
                                                            {formatDateRange(checkOut)}
                                                        </span>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4" style={{ color: "#523961" }} />
                                                </button>
                                            </PopoverTrigger>

                                            <PopoverContent>
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={checkOut}
                                                    onSelect={(date) => setCheckOut(date)}
                                                    numberOfMonths={1}
                                                    className="rounded-lg border"
                                                    disabled={(date) => isDateDisabled(date)}
                                                    classNames={{
                                                        disabled: "text-red-400 line-through",
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
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
                                        onClick={handleSubmit}
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
                                        {!hotel.phone ? <HotelDetailSkeletonNames width={"10rem"} /> :
                                            <span className="text-sm" style={{ color: "#523961" }}>
                                                {hotel.phone}
                                            </span>}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5" style={{ color: "#523961" }} />
                                        {!hotel.email ? <HotelDetailSkeletonNames width={"10rem"} />
                                            :
                                            <span className="text-sm" style={{ color: "#523961" }}>
                                                {hotel.email}
                                            </span>
                                        }

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