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
import HotelItem from "./HotelItem/HotelItem"
import categorieAPI from "@/services/categorie/categorie.service"
import { Feature } from "@/types/feature"
import featureAPI from "@/services/feature/feature.service"

interface Props {
    filteredHotels: Hotel[];
    searchTerm: string;
}

const HotelsList = ({ filteredHotels, searchTerm }: Props) => {

    const [categories, setCategories] = useState<Categorie[]>();
    const [features, setFeatures] = useState<Feature[]>();

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await categorieAPI.getCategories();
            setCategories(data.entity);
        }

        const fetchFeatures = async () => {
            const data = await featureAPI.getFeatures();
            setFeatures(data.entity.content)
        }

        fetchCategories();
        fetchFeatures();
    }, [])

    return (
        <Card className="shadow-lg border-0">
            <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                <div className="space-y-0">
                    {filteredHotels?.map((hotel, index) => (
                        <HotelItem key={index} hotel={hotel} index={index} categories={categories} features={features} />
                    ))}
                </div>

                {filteredHotels?.length === 0 && (
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