import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react"

import { Plus, Search, MapPin, Edit, Trash2, Eye, MoreVertical, Star, AlertCircle } from "lucide-react"
import { Hotel } from "@/types"

const HotelsList = ({ filteredHotels, searchTerm, handleDelete }: { filteredHotels: Hotel[], searchTerm: string }) => {

    const handleEdit = (hotelId: number) => {
        console.log("Editar hotel:", hotelId)

    }

    const handleView = (hotelId: number) => {
        console.log("Ver detalles hotel:", hotelId)

    }

    return (
        <Card className="shadow-lg border-0">
            <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                <div className="space-y-0">
                    {filteredHotels.map((hotel, index) => (
                        <div
                            key={hotel.id}
                            className={`p-6 ${index !== filteredHotels.length - 1 ? "border-b" : ""}`}
                            style={{ borderColor: "#BAAFC4" }}
                        >
                            <div className="flex flex-col lg:flex-row gap-4">

                                <div className="flex gap-4 flex-1">
                                    <img
                                        src={"https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"}
                                        alt={hotel.name}
                                        className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold truncate" style={{ color: "#3B234A" }}>
                                                    {hotel.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-sm" style={{ color: "#523961" }}>
                                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                                    <span className="truncate">{hotel.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex gap-1">
                                                <span className="font-medium" style={{ color: "#523961" }}>
                                                    ID:
                                                </span>
                                                <div className="font-bold" style={{ color: "#3B234A" }}>
                                                    {hotel.id}
                                                </div>
                                            </div>

                                            <div>
                                                <span className="font-medium" style={{ color: "#523961" }}>
                                                    Precio:
                                                </span>
                                                <div className="font-bold" style={{ color: "#3B234A" }}>
                                                    ${hotel.price}/noche
                                                </div>
                                            </div>

                                            <div>
                                                <span className="font-medium" style={{ color: "#523961" }}>
                                                    Calificación:
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-bold" style={{ color: "#3B234A" }}>
                                                        {hotel.score}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex lg:flex-col gap-2 lg:w-auto w-full">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 lg:flex-none border-2 hover:bg-opacity-10 bg-transparent"
                                        style={{
                                            borderColor: "#523961",
                                            color: "#523961",
                                        }}
                                        onClick={() => handleView(hotel.id)}
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        Ver
                                    </Button>

                                    <Button
                                        size="sm"
                                        className="flex-1 lg:flex-none text-white font-semibold hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#523961" }}
                                        onClick={() => handleEdit(hotel.id)}
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Editar
                                    </Button>

                                    <Dialog>
                                        <form>
                                            <DialogTrigger asChild>
                                                <Button className="text-red-500 hover:text-red-500 bg-white/70 hover:bg-white/90 border-0" variant="outline">
                                                    <Trash2 /> Eliminar
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Eliminando un hotel</DialogTitle>
                                                    <DialogDescription>
                                                        Estas seguro que desea eliminar el hotel?
                                                    </DialogDescription>
                                                    <DialogDescription>
                                                        <div className="flex items-center gap-1 mt-2">
                                                            <AlertCircle className="text-red-500 w-5 h-5" />
                                                            <span className="text-red-500">Esta accion no se puede volver atras</span>
                                                        </div>
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="name-1">Nombre del hotel</Label>
                                                        <span className="bg-slate-300/10 py-2 rounded-md pl-3">{hotel.name}</span>
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="username-1">Id</Label>
                                                        <span className="bg-slate-300/10 py-2 rounded-md pl-3">{hotel.id}</span>
                                                    </div>
                                                </div>

                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancelar</Button>
                                                    </DialogClose>
                                                    <Button
                                                        onClick={() => handleDelete(hotel.id)}
                                                        className="text-red-500"
                                                        type="submit">Eliminar
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </form>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredHotels.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="text-gray-500 mb-2">No se encontraron hoteles</div>
                        <div className="text-sm text-gray-400">
                            {searchTerm ? "Intenta con otros términos de búsqueda" : "Agrega tu primer hotel para comenzar"}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default HotelsList