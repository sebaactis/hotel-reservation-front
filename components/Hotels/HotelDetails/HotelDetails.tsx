import HotelRating from './HotelRating';
import HotelDescription from './HotelDescription';
import HotelImages from './HotelImages';


import { Hotel } from '@/types';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useAuth } from '@/hooks/useAuth';

import Link from "next/link"

import {
    ArrowLeft, MapPin, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Shirt, Phone, Mail, Calendar, Users, CalendarIcon, ChevronDown, Heart, Star, MessageSquare
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"



import { HotelDetailSkeletonNames, HotelDetailsSkeletonRating } from '../HotelDetailSkeletons';
import { colorsAux } from '@/styles/colorsAux';
import HotelReservation from './HotelReservation';


const HotelDetails = ({ hotel }: { hotel: Hotel }) => {

    const router = useRouter();
    const { token, userId, isAuthenticated } = useAuth();
    const { fetchFavorites, favoriteHotelIds, toggleFavorite } = useFavoritesStore();


    const isFavoriteHotel = (hotelId: number) => {
        return favoriteHotelIds.includes(hotelId);
    }


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
                                <div className='flex items-center gap-3 mb-2'>
                                    <h1 className="text-3xl font-bold text-white">{hotel.name}</h1>
                                    {isAuthenticated && <button onClick={() => toggleFavorite(userId, hotel.id)}>{isFavoriteHotel(hotel.id) ? <Heart className='fill-red-500 text-red-500' /> : <Heart />}</button>}
                                </div>
                            }


                            <div className="flex items-center gap-2 text-white mb-4">
                                <MapPin className="w-5 h-5" />
                                {!hotel.location ? <HotelDetailSkeletonNames width={"20rem"} /> : <span>{hotel.location}</span>}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl border-2 border-white">
                                    {!hotel.score ? <HotelDetailsSkeletonRating /> : <span>{hotel.score.toFixed(1)} </span>}
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
                <HotelImages />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <HotelDescription hotel={hotel} />
                        <HotelRating hotel={hotel} />
                    </div>

                    <div className="space-y-6">
                        <HotelReservation hotel={hotel} />

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