"use client"

import { useEffect, useState } from "react"
import {
    Calendar,
    MapPin,
    Star,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    Download,
    MessageSquare,
    Filter,
    Search,
    ChevronDown,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import hotelBookingApi from "@/services/hotelBooking/hotelBooking.service"
import { useAuthStore } from "@/stores/authStore"


export default function MyReservationPage() {

    const { user, isAuthenticated } = useAuthStore();
    const [reservations, setReservations] = useState([])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const getDaysUntilReservation = (checkInDate: string) => {
        const today = new Date()
        const checkIn = new Date(checkInDate)
        const diffTime = checkIn.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    useEffect(() => {
        if (!user?.userId) return;
        const fetchReservations = async () => {
            try {
                const request = await hotelBookingApi.getHotelBooking(user?.userId);
                setReservations(request.entity);

            } catch (error) {
                console.log(error)
            }
        }

        fetchReservations();
    }, [user?.userId])

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#D4C7BF" }}>

            <div className="p-6" style={{ backgroundColor: "#3B234A" }}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Mis Reservas</h1>
                            <p className="text-white opacity-90">Gestiona y revisa todas tus reservas de hotel</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 space-y-6">

                <div className="space-y-4">
                    {reservations.length > 0 && isAuthenticated ? (
                        reservations.map((reservation) => {
                            const daysUntil = getDaysUntilReservation(reservation.checkIn)

                            return (
                                <Card key={reservation.id} className="shadow-lg border-0 overflow-hidden">
                                    <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Imagen del Hotel */}
                                            <div className="lg:w-48 h-32 lg:h-auto">
                                                <img
                                                    src={reservation.hotel.images[0].url}
                                                    alt={reservation.hotel.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Información Principal */}
                                            <div className="flex-1 p-6">
                                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                                    <div className="flex-1">
                                                        {/* Header con estado */}
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h3 className="text-xl font-semibold" style={{ color: "#3B234A" }}>
                                                                    {reservation.hotel.name}
                                                                </h3>
                                                                <div className="flex items-center gap-1 text-sm mt-1" style={{ color: "#523961" }}>
                                                                    <MapPin className="w-4 h-4" />
                                                                    <span>{reservation.hotel.location}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                            <div>
                                                                <div className="text-xs" style={{ color: "#523961" }}>
                                                                    Check-in
                                                                </div>
                                                                <div className="font-medium text-sm" style={{ color: "#3B234A" }}>
                                                                    {formatDate(reservation.bookedFrom)}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs" style={{ color: "#523961" }}>
                                                                    Check-out
                                                                </div>
                                                                <div className="font-medium text-sm" style={{ color: "#3B234A" }}>
                                                                    {formatDate(reservation.bookedTo)}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs" style={{ color: "#523961" }}>
                                                                    Huéspedes
                                                                </div>
                                                                <div
                                                                    className="font-medium text-sm flex items-center gap-1"
                                                                    style={{ color: "#3B234A" }}
                                                                >
                                                                    <Users className="w-3 h-3" />
                                                                    {reservation.guests}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs" style={{ color: "#523961" }}>
                                                                    Noches
                                                                </div>
                                                                <div className="font-medium text-sm" style={{ color: "#3B234A" }}>
                                                                    {reservation.nights}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: "#523961" }}>
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                                <span>{reservation.hotel.score.toFixed(1)}</span>
                                                            </div>
                                                            <div>Reservado: {formatDate(reservation.createdAt)}</div>
                                                            {reservation.status === "confirmed" && daysUntil > 0 && (
                                                                <div className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span>{daysUntil === 1 ? "Mañana" : `En ${daysUntil} días`}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="lg:text-right lg:min-w-[200px]">
                                                        <div className="mb-4">
                                                            <div className="text-2xl font-bold" style={{ color: "#3B234A" }}>
                                                                ${reservation.totalPrice}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    ) : (
                        <Card className="shadow-lg border-0">
                            <CardContent className="p-12 text-center" style={{ backgroundColor: "#C3BBC9" }}>
                                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: "#523961" }} />
                                <div className="text-lg font-medium mb-2" style={{ color: "#3B234A" }}>
                                    {isAuthenticated ? "No se encontraron reservas" : "Debes loguearte para poder ver tus reservas"}
                                </div>

                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
