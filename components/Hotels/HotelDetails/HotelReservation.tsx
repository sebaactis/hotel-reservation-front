"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    ArrowLeft,
    Calendar,
    CalendarIcon,
    ChevronDown,
    MapPin,
    Star,
    Users,
    CreditCard,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Hotel } from "@/types"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"


export default function HotelReservation() {
    const router = useRouter()
    const { id } = useParams();

    const [hotel, setHotel] = useState<Hotel>();
    const { isAuthenticated, userId, name, lastName, email, token } = useAuth();

    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
    const [checkInOpen, setCheckInOpen] = useState(false)
    const [checkOutOpen, setCheckOutOpen] = useState(false)
    const [reservations, setReservations] = useState([])

    const [errors, setErrors] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const disabledRanges = reservations?.map((reservation) => ({
        from: new Date(reservation.bookedFrom),
        to: new Date(reservation.bookedTo),
    }))

    const isDateDisabled = (date: Date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (date < today) return true

        return disabledRanges?.some((range) => date >= range.from && date <= range.to)
    }

    const isRangeValid = (startDate: Date, endDate: Date) => {
        const currentDate = new Date(startDate)
        while (currentDate <= endDate) {
            if (isDateDisabled(currentDate)) {
                return false
            }
            currentDate.setDate(currentDate.getDate() + 1)
        }
        return true
    }

    const formatDateRange = (date: Date | undefined): string => {
        if (!date) return "Seleccionar fecha"
        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const calculateNights = () => {
        if (!checkIn || !checkOut) return 0
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    const calculateTotal = () => {
        const nights = calculateNights()
        return nights * hotel.price
    }

    const handleCheckInSelect = (date: Date | undefined) => {
        setCheckIn(date)
        setCheckInOpen(false)

        // Si ya hay check-out seleccionado, verificar que el rango sea válido
        if (date && checkOut && date >= checkOut) {
            setCheckOut(undefined)
        }
    }

    const handleCheckOutSelect = (date: Date | undefined) => {
        if (!checkIn || !date) {
            setCheckOut(date)
            setCheckOutOpen(false)
            return
        }

        // Verificar que el rango no incluya fechas ocupadas
        if (!isRangeValid(checkIn, date)) {
            setErrors(["El rango seleccionado incluye fechas no disponibles. Por favor, selecciona otras fechas."])
            return
        }

        setCheckOut(date)
        setCheckOutOpen(false)
        setErrors([])
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)


        try {
            const body = {
                hotelId: hotel?.id,
                userId,
                bookedFrom: checkIn,
                bookedTo: checkOut,
            }

            const request = await fetch("http://localhost:8080/api/v1/hotelBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            if (request.ok) {
                toast.success("Reserva realizada con éxito")

            } else {
                toast.error("Error al procesar la reserva")
            }
        } catch (error) {
            setErrors(["Error al procesar la reserva. Inténtalo nuevamente."])
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (!id) return;
        try {
            const getHotel = async () => {
                const request = await fetch(`http://localhost:8080/api/v1/hotel/${id}`)
                const response = await request.json();

                if (request.ok) {
                    setHotel(response.entity);
                }
            }

            getHotel();
        } catch (error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        if (!id) return;
        try {
            const getReservations = async () => {
                const request = await fetch(`http://localhost:8080/api/v1/hotelBooking/hotel/${id}`)
                const response = await request.json();

                if (request.ok) {
                    setReservations(response.entity);
                }
            }

            getReservations();
        } catch (error) {
            console.log(error)
        }
    }, [id])


    return (
        <div className="min-h-screen" style={{ backgroundColor: "#D4C7BF" }}>
            {/* Header */}
            <div className="p-6" style={{ backgroundColor: "#3B234A" }}>
                <div className="max-w-6xl mx-auto">
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        className="text-white hover:bg-white hover:bg-opacity-20 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al hotel
                    </Button>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-2">Reservar Hotel</h1>
                            <p className="text-white opacity-90">Completa los datos para confirmar tu reserva</p>
                        </div>
                        <div className="text-right text-white">
                            <div className="text-sm opacity-75">Usuario:</div>
                            <div className="font-semibold">{name + " " + lastName}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Formulario de Reserva */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Información del Hotel */}
                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <CardTitle style={{ color: "#3B234A" }}>Hotel Seleccionado</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="flex gap-4">
                                    <img
                                        src={hotel?.imageUrl || "/placeholder.svg"}
                                        alt={hotel?.name}
                                        className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold" style={{ color: "#3B234A" }}>
                                            {hotel?.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm mb-2" style={{ color: "#523961" }}>
                                            <MapPin className="w-4 h-4" />
                                            <span>{hotel?.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium text-sm" style={{ color: "#3B234A" }}>
                                                    {hotel?.score.toFixed(1)}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {hotel?.features.slice(0, 2).map((feature, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {feature}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Selección de Fechas */}
                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <CardTitle style={{ color: "#3B234A" }}>Fechas de Estadía</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium" style={{ color: "#523961" }}>
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Check-in
                                        </Label>
                                        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                                            <PopoverTrigger asChild>
                                                <button
                                                    className="w-full flex items-center justify-between p-3 rounded-md border-2 bg-white mt-1"
                                                    style={{ borderColor: "#523961" }}
                                                >
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="w-5 h-5 mr-2" style={{ color: "#523961" }} />
                                                        <span style={{ color: "#3B234A" }}>{formatDateRange(checkIn)}</span>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4" style={{ color: "#523961" }} />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={checkIn}
                                                    onSelect={handleCheckInSelect}
                                                    numberOfMonths={1}
                                                    className="rounded-lg border"
                                                    disabled={isDateDisabled}
                                                    classNames={{
                                                        disabled: "text-red-400 line-through",
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div>
                                        <Label className="text-sm font-medium" style={{ color: "#523961" }}>
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Check-out
                                        </Label>
                                        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                                            <PopoverTrigger asChild>
                                                <button
                                                    className="w-full flex items-center justify-between p-3 rounded-md border-2 bg-white mt-1"
                                                    style={{ borderColor: "#523961" }}
                                                >
                                                    <div className="flex items-center">
                                                        <CalendarIcon className="w-5 h-5 mr-2" style={{ color: "#523961" }} />
                                                        <span style={{ color: "#3B234A" }}>{formatDateRange(checkOut)}</span>
                                                    </div>
                                                    <ChevronDown className="w-4 h-4" style={{ color: "#523961" }} />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={checkOut}
                                                    onSelect={handleCheckOutSelect}
                                                    numberOfMonths={1}
                                                    className="rounded-lg border"
                                                    disabled={(date) => {
                                                        if (!checkIn) return isDateDisabled(date)
                                                        return isDateDisabled(date) || date <= checkIn
                                                    }}
                                                    classNames={{
                                                        disabled: "text-red-400 line-through",
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {checkIn && checkOut && (
                                    <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#BAAFC4" }}>
                                        <div className="flex items-center gap-2 text-sm" style={{ color: "#3B234A" }}>
                                            <CheckCircle className="w-4 h-4" />
                                            <span>
                                                {calculateNights()} {calculateNights() === 1 ? "noche" : "noches"} seleccionadas
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Información del Huésped */}
                        <Card className="shadow-lg border-0">
                            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                                <CardTitle style={{ color: "#3B234A" }}>Información del Huésped</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="firstName" className="text-sm font-bold" style={{ color: "#523961" }}>
                                            Nombre
                                        </Label>
                                        <Label htmlFor="firstName" className="text-sm font-medium" style={{ color: "#523961" }}>
                                            {name}
                                        </Label>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="firstName" className="text-sm font-bold" style={{ color: "#523961" }}>
                                            Apellido
                                        </Label>
                                        <Label htmlFor="firstName" className="text-sm font-medium" style={{ color: "#523961" }}>
                                            {lastName}
                                        </Label>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="firstName" className="text-sm font-bold" style={{ color: "#523961" }}>
                                            Email
                                        </Label>
                                        <Label htmlFor="firstName" className="text-sm font-medium" style={{ color: "#523961" }}>
                                            {email}
                                        </Label>
                                    </div>

                                </div>

                            </CardContent>
                        </Card>

                        {/* Errores */}
                        {errors.length > 0 && (
                            <div>
                                <AlertCircle className="h-4 w-4" />
                                <div>
                                    <ul className="list-disc list-inside space-y-1">
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Resumen de Reserva */}
                    <div className="space-y-6">
                        <Card className="shadow-lg border-0 sticky top-6">
                            <CardHeader style={{ backgroundColor: "#3B234A" }}>
                                <CardTitle className="text-white text-center">Resumen de Reserva</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="space-y-4">
                                    {checkIn && checkOut && (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{ color: "#523961" }}>
                                                    Check-in:
                                                </span>
                                                <span className="font-medium" style={{ color: "#3B234A" }}>
                                                    {formatDateRange(checkIn)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{ color: "#523961" }}>
                                                    Check-out:
                                                </span>
                                                <span className="font-medium" style={{ color: "#3B234A" }}>
                                                    {formatDateRange(checkOut)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{ color: "#523961" }}>
                                                    Noches:
                                                </span>
                                                <span className="font-medium" style={{ color: "#3B234A" }}>
                                                    {calculateNights()}
                                                </span>
                                            </div>

                                            <Separator />

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{ color: "#523961" }}>
                                                    ${hotel.price} x {calculateNights()} noches:
                                                </span>
                                                <span className="font-medium" style={{ color: "#3B234A" }}>
                                                    ${calculateTotal()}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{ color: "#523961" }}>
                                                    Impuestos y tasas:
                                                </span>
                                                <span className="font-medium" style={{ color: "#3B234A" }}>
                                                    Incluidos
                                                </span>
                                            </div>

                                            <Separator />

                                            <div className="flex justify-between items-center">
                                                <span className="font-medium" style={{ color: "#523961" }}>
                                                    Total:
                                                </span>
                                                <span className="text-2xl font-bold" style={{ color: "#3B234A" }}>
                                                    ${calculateTotal()}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !checkIn || !checkOut}
                                        className="w-full text-white font-semibold py-3 hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#3B234A" }}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Procesando...
                                            </div>
                                        ) : (
                                            <>
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Confirmar Reserva
                                            </>
                                        )}
                                    </Button>

                                    <div className="space-y-2 text-xs text-center text-gray-600">
                                        <div className="flex items-center justify-center gap-1">
                                            <Shield className="w-3 h-3" />
                                            <span>Pago seguro</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>Cancelación gratuita hasta 24h antes</span>
                                        </div>
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
