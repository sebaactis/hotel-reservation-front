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
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

import { useEffect, useState } from "react";

import { Edit, AlertCircle, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Shirt } from 'lucide-react'
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { Categorie, Hotel } from "@/types"

interface Props {
    hotel: Hotel;
    categories: Categorie[]
}


const HotelItemEdit = ({ hotel, categories }: Props) => {

    const { token } = useAuth();
    const [hotelData, setHotelData] = useState([])
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
    const [rating, setRating] = useState(0);

    const amenities = [
        { id: "Wifi", label: "WiFi Gratis", icon: Wifi },
        { id: "Estacionamiento", label: "Parking", icon: Car },
        { id: "Desayuno", label: "Desayuno", icon: Coffee },
        { id: "Piscina", label: "Piscina", icon: Waves },
        { id: "Restaurante", label: "Restaurante", icon: Utensils },
        { id: "Gimnasio", label: "Gimnasio", icon: Dumbbell },
        { id: "Lavanderia", label: "Lavandería", icon: Shirt },
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setHotelData({ ...hotelData, [name]: value })
    }

    const handleAmenityChange = (amenityId: string, checked: boolean) => {
        if (checked) {
            setSelectedAmenities([...selectedAmenities, amenityId])
        } else {
            setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId))
        }
    }

    useEffect(() => {
        setHotelData(hotel);
        setRating(hotel.score);
        setSelectedAmenities(hotel.features);
    }, [hotel])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const editHotel = {
            ...hotelData,
            score: rating.toFixed(1),
            features: selectedAmenities
        }

        const submit = await fetch(`http://localhost:8080/api/v1/hotel/${hotel.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(editHotel),
        })

        if (submit.ok) {
            toast.success("Hotel editado exitosamente")
            setSelectedAmenities([])
            setRating(0)

        } else {
            toast.error("Error al intentar editar hotel")
        }
    }

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button
                    style={{
                        borderColor: "#523961",
                        color: "#523961",
                        backgroundColor: "transparent",

                    }}
                    className='border-2 min-w-28'
                    variant="outline">
                    <Edit /> Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Editar hotel con id: {hotel.id}</DialogTitle>

                        <DialogDescription className=''>
                            <div className="flex items-center gap-1 my-3">
                                <AlertCircle className="text-yellow-500 w-5 h-5" />
                                <span className="text-yellow-500">Está editando un hotel vigente</span>
                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3.5">

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nombre del hotel</Label>
                            <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="name" value={hotelData.name} onChange={handleInputChange} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Ubicación del hotel</Label>
                            <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="location" value={hotelData.location} onChange={handleInputChange} />
                        </div>

                        <div className="grid gap-5">
                            <Label htmlFor="name-1">Caracteristicas del hotel</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {amenities.map((amenity) => {
                                    const IconComponent = amenity.icon
                                    return (
                                        <div key={amenity.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={amenity.id}
                                                checked={selectedAmenities.includes(amenity.id)}
                                                onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                                                className="border-2"
                                                style={{ borderColor: "#ae7acd" }}
                                            />
                                            <Label
                                                htmlFor={amenity.id}
                                                className="text-sm font-medium cursor-pointer flex items-center gap-1 "
                                                style={{ color: "#ae7acd" }}
                                            >
                                                <IconComponent className="w-4 h-4" />
                                                {amenity.label}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Descripcion del hotel</Label>
                            <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="description" value={hotelData.description} onChange={handleInputChange} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Precio del hotel</Label>
                            <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="price" value={hotelData.price} onChange={handleInputChange} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Rating del hotel</Label>
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="0.1"
                                    value={rating}
                                    onChange={(e) => setRating(Number.parseFloat(e.target.value))}
                                    className="flex-1"
                                    style={{ accentColor: "#ae7acd" }}
                                />
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold"
                                    style={{ backgroundColor: "#ae7acd" }}
                                >
                                    {rating.toFixed(1)}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Email del hotel</Label>
                            <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="email" value={hotelData.email} onChange={handleInputChange} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Email del hotel</Label>
                            <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="phone" value={hotelData.phone} onChange={handleInputChange} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Categoria del hotel</Label>

                            <select className="bg-slate-300/10 py-2 rounded-md pl-3" name="category" value={hotelData.category} onChange={handleInputChange}>
                                {categories.map(category => (
                                    <option style={{ backgroundColor: "gray" }} key={category.id} value={category.description} >{category.description}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <DialogFooter className='mt-4'>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button
                            className="text-purple-500"
                            type="submit">
                            Enviar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default HotelItemEdit