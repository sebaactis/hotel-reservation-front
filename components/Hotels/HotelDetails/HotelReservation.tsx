import { useState, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"


import { Calendar, CalendarIcon, ChevronDown } from "lucide-react"
import { colorsAux } from "@/styles/colorsAux"
import { Hotel } from "@/types"

const HotelReservation = ({ hotel }: Hotel) => {

    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkOutOpen, setCheckOutOpen] = useState(false);
    const [reservations, setReservations] = useState([]);

    let disabledRanges = [];

    if (reservations && Array.isArray(reservations)) {
        disabledRanges = reservations.map(reservation => ({
            from: new Date(reservation.bookedFrom),
            to: new Date(reservation.bookedTo)
        }));
    }

    const handleSubmit = () => {
        console.log(hotel.id, checkIn, checkOut)
    }

    const isDateDisabled = (date: Date) => {
        return disabledRanges.some(range =>
            date >= range.from && date <= range.to
        );
    };

    const formatDateRange = (date: Date | undefined): string => {
        if (!date) return "Seleccionar fecha"

        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
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

    return (
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
    )
}

export default HotelReservation