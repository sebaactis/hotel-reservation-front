import HotelRating from './HotelRating';
import HotelDescription from './HotelDescription';
import HotelImages from './HotelImages';


import { Hotel } from '@/types';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useAuthStore } from '@/stores/authStore';

import Link from "next/link"

import {
    ArrowLeft, MapPin, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Shirt, Phone, Mail, Calendar, Users, CalendarIcon, ChevronDown, Heart, Star, MessageSquare,
    Facebook,
    Twitter,
    Instagram,
    Share2,
    Copy
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


import { HotelDetailSkeletonNames, HotelDetailsSkeletonRating } from '../HotelDetailSkeletons';
import { colorsAux } from '@/styles/colorsAux';

import HotelShare from './HotelShare';



const HotelDetails = ({ hotel }: { hotel: Hotel }) => {

    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const { fetchFavorites, favoriteHotelIds, toggleFavorite } = useFavoritesStore();

    const [showShareModal, setShowShareModal] = useState(false)

    const isFavoriteHotel = (hotelId: number) => {
        return favoriteHotelIds.includes(hotelId);
    }

    const handleOpenShareModal = () => {
        setShowShareModal(true)
    }

    useEffect(() => {
        if (!user?.userId) return;
        fetchFavorites(user?.userId);

    }, [user?.userId])

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="p-6" style={{ backgroundColor: "#3B234A" }}>

                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <Button onClick={router.back} variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 w-full flex justify-end">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver a resultados
                        </Button>

                        <Button
                            onClick={handleOpenShareModal}
                            variant="ghost"
                            className="text-white hover:bg-white hover:bg-opacity-20"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Compartir
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            {!hotel.name ?
                                <HotelDetailSkeletonNames width={"21.8rem"} />
                                :
                                <div className='flex items-center gap-3 mb-2'>
                                    <h1 className="text-3xl font-bold text-white">{hotel.name}</h1>
                                    {isAuthenticated && <button onClick={() => toggleFavorite(user?.userId, hotel.id)}>{isFavoriteHotel(hotel.id) ? <Heart className='fill-red-500 text-red-500' /> : <Heart />}</button>}
                                </div>
                            }


                            <div className="flex items-center gap-2 text-white mb-4">
                                <MapPin className="w-5 h-5" />
                                {!hotel.location ? <HotelDetailSkeletonNames width={"20rem"} /> : <span>{hotel.location}</span>}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl border-2 border-white">
                                    {!hotel.score && hotel.score != 0 ?
                                        <HotelDetailsSkeletonRating /> :
                                        hotel.score == 0 ?
                                            <span>-</span> :
                                            <span>{hotel.score.toFixed(1)} </span>}
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

            <HotelShare hotel={hotel} showShareModal={showShareModal} setShowShareModal={setShowShareModal} />

            <div className="max-w-6xl mx-auto p-6 space-y-6">
                <HotelImages />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <HotelDescription hotel={hotel} />
                        <HotelRating hotel={hotel} />
                    </div>

                    <div className="space-y-6">
                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <Button
                                    onClick={() => router.push(`/reservation/${hotel.id}`)}
                                    style={{ backgroundColor: "#3B234A", color: "white" }}
                                    disabled={!isAuthenticated}
                                >
                                    {isAuthenticated ? "Reservar ahora" : "Iniciar sesión para reservar"}
                                </Button>
                            </CardHeader>
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