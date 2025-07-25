"use client"

import { useEffect, useState } from "react"

import { Plus, Search, MapPin, Edit, Trash2, Eye, MoreVertical, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Hotel } from "@/types"

import HotelsList from "@/components/Administration/Hotels/HotelsList"
import HotelPagination from "@/components/Hotels/HotelPagination"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function HotelAdministration() {
    const baseUrl = "http://localhost:8080/api/v1/hotel?"

    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    const [hotels, setHotels] = useState<Hotel>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalHotels, setTotalHotels] = useState(0);

    const [seed, setSeed] = useState("");


    const filteredHotels = hotels.filter((hotel: Hotel) => {
        const matchesSearch =
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })


    useEffect(() => {

        const fetchHotels = async () => {
            const request = await fetch(`${baseUrl}page=${page}&random=true` + (seed ? `&seed=${seed}` : ""))
            const data = await request.json();

            setHotels(data.entity.page.content);
            setPage(data.entity.page.pageable.pageNumber);
            setTotalPages(data.entity.page.totalPages);
            setTotalHotels(data.entity.page.totalElements);
        }

        fetchHotels();

    }, [page])

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="max-w-7xl mx-auto space-y-6">

                <Card className="shadow-lg border-0">
                    <CardHeader style={{ backgroundColor: "#3B234A" }}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-white text-2xl font-bold">Panel de Gestión de Hoteles</CardTitle>
                                <p className="text-white opacity-90 text-sm mt-1">Administra todos los hoteles de tu plataforma</p>
                            </div>
                            <Button
                                className="text-white font-semibold hover:opacity-90 transition-opacity self-start md:self-center"
                                style={{ backgroundColor: "#523961" }}
                                onClick={() => router.push("/administration/hotels/addHotel")}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Agregar Hotel
                            </Button>
                        </div>
                    </CardHeader>
                </Card>


                <Card className="shadow-lg border-0">
                    <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                    style={{ color: "#523961" }}
                                />
                                <Input
                                    placeholder="Buscar hoteles por nombre o ubicación..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-2 focus:ring-0"
                                    style={{
                                        borderColor: "#BAAFC4",
                                        backgroundColor: "white",
                                        color: "#000000be",
                                        fontWeight: "bold"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col justify-center gap-4 text-sm" style={{ color: "#523961" }}>
                            <span>Mostrando: {filteredHotels.length} hoteles</span>
                            <span>Total: {totalHotels} hoteles</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de Hoteles */}
                <HotelsList filteredHotels={filteredHotels} searchTerm={searchTerm} />
                {hotels.length > 0 && <HotelPagination totalPages={totalPages} page={page} seed={seed} onChangePage={setPage} />}

            </div>
        </div>
    )
}
