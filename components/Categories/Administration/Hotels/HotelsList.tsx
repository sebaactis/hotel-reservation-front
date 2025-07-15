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
import { Categorie, Hotel } from "@/types"
import HotelItem from "./HotelItem"

interface Props {
    filteredHotels: Hotel[];
    searchTerm: string;
    handleDelete: (hotelId: number) => void;
}

const HotelsList = ({ filteredHotels, searchTerm, handleDelete }: Props) => {

    const [categories, setCategories] = useState<Categorie[]>();

    const handleEdit = (hotelId: number) => {
        console.log("Editar hotel:", hotelId)

    }

    const handleView = (hotelId: number) => {
        console.log("Ver detalles hotel:", hotelId)

    }

    useEffect(() => {
        const fetchCategories = async () => {
            const request = await fetch("http://localhost:8080/api/v1/category")
            const data = await request.json();

            setCategories(data.entity);
        }

        fetchCategories();
    }, [])

    return (
        <Card className="shadow-lg border-0">
            <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                <div className="space-y-0">
                    {filteredHotels.map((hotel, index) => (
                        <HotelItem key={index} hotel={hotel} index={index} handleDelete={handleDelete} categories={categories} />
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