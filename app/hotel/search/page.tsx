"use client"

import { useEffect, useState } from "react"
import {
    Search,
    Filter,
    MapPin,
    Star,
    Wifi,
    Car,
    Coffee,
    Waves,
    ChevronDown,
    Grid3X3,
    List,
    ArrowUpDown,
    Heart,
    Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSearchHotels } from "@/hooks/useSearchHotels"
import { useRouter, useSearchParams } from "next/navigation"
import { fr } from "date-fns/locale"
import { BadgeListFromJson } from "@/components/BagdeListFromJson"
import { Hotel } from "@/types"

export default function Component() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const location = searchParams.get('location') || ''
    const from = searchParams.get('from') || ''
    const to = searchParams.get('to') || ''

    const { hotelsResult, searchHotels } = useSearchHotels();
    const hotels: Hotel[] = hotelsResult.entity?.page?.content;

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    const searchCriteria = {
        location,
        checkIn: from,
        checkOut: to
    }

    useEffect(() => {
        searchHotels({
            location,
            dateRange: {
                from,
                to
            }
        });
    }, [location, from, to])

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="p-6" style={{ backgroundColor: "#3B234A" }}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">Resultados de búsqueda</h1>
                            <div className="flex flex-wrap items-center gap-4 text-white text-sm">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{searchCriteria.location}</span>
                                </div>
                                <div>
                                    {searchCriteria.checkIn} - {searchCriteria.checkOut}
                                </div>

                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-purple-900 bg-transparent"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Modificar búsqueda
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                    <div className="lg:col-span-3 space-y-4">

                        <Card className="shadow-lg border-0">
                            <CardContent className="p-4" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium" style={{ color: "#523961" }}>
                                            {hotels && hotels.length} hoteles encontrados
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">

                                        <div className="flex border rounded-md" style={{ borderColor: "#523961" }}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`${viewMode === "grid" ? "bg-opacity-20" : ""}`}
                                                style={{ color: "#523961" }}
                                                onClick={() => setViewMode("grid")}
                                            >
                                                <Grid3X3 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`${viewMode === "list" ? "bg-opacity-20" : ""}`}
                                                style={{ color: "#523961" }}
                                                onClick={() => setViewMode("list")}
                                            >
                                                <List className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                            {hotels && hotels.map((hotel) => (
                                <Card key={hotel.id} className="shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow">
                                    <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                                        <div className={viewMode === "grid" ? "flex flex-col" : "flex"}>
                                            <div className={viewMode === "grid" ? "relative" : "relative w-1/3 min-h-[200px]"}>
                                                <img
                                                    src={"https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"}
                                                    alt={hotel.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
                                                >
                                                    <Heart className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <div className={viewMode === "grid" ? "p-4" : "flex-1 p-4"}>
                                                <div className="space-y-3">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-lg" style={{ color: "#3B234A" }}>
                                                                {hotel.name}
                                                            </h3>
                                                            <div className="flex items-center gap-1 text-sm" style={{ color: "#523961" }}>
                                                                <MapPin className="w-4 h-4" />
                                                                <span>{hotel.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div
                                                                className="flex items-center justify-center w-12 h-8 rounded text-white font-bold text-sm"
                                                                style={{ backgroundColor: "#3B234A" }}
                                                            >
                                                                {hotel.score}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

                                                    <div className="flex gap-2 flex-wrap pt-2">
                                                        {
                                                            <BadgeListFromJson key={hotel.id} features={hotel.features} />
                                                        }
                                                    </div>

                                                    <div className="flex items-end justify-between pt-2">
                                                        <div>

                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-2xl font-bold" style={{ color: "#3B234A" }}>
                                                                    ${hotel.price}
                                                                </span>
                                                                <span className="text-sm text-gray-600">por noche</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-2 hover:bg-opacity-10 bg-transparent"
                                                                style={{
                                                                    borderColor: "#523961",
                                                                    color: "#523961",
                                                                }}
                                                                onClick={() => router.push(`/hotel/${hotel.id}`)}
                                                            >
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                Ver
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
