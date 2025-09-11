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
import { HotelEditDto } from "@/types/hotel"
import hotelApi from "@/services/hotel/hotel.service"
import { Feature } from "@/types/feature"
import IconRender from "@/components/Icons/IconRender"

interface Props {
    hotel: Hotel;
    categories: Categorie[];
    features: Feature[];
}


const HotelItemEdit = ({ hotel, categories, features }: Props) => {

    const [hotelData, setHotelData] = useState<HotelEditDto>([])
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [rating, setRating] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setHotelData({ ...hotelData, [name]: value })
    }

    const handleFeatureChange = (featureName: string, checked: boolean) => {
        if (checked) {
            setSelectedFeatures([...selectedFeatures, featureName])
        } else {
            setSelectedFeatures(selectedFeatures.filter((name) => name !== featureName))
        }
    }

    useEffect(() => {
        setHotelData(hotel);
        setRating(hotel.score);
        setSelectedFeatures(hotel.features.map((feature) => feature.name));
    }, [hotel])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const editHotel = {
            ...hotelData,
            score: rating.toFixed(1),
            features: selectedFeatures
        }

        try {
            const request = await hotelApi.editHotel(hotel.id, editHotel)

            if (request) {
                toast.success("Hotel editado exitosamente")
                setSelectedFeatures([])
                setRating(0)


            }

        } catch (error) {
            toast.error(error.message)
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
                            <div className="grid grid-cols-2 gap-2">
                                {features?.map((feature) => {
                                    return (
                                        <div key={feature.id} className="flex items-center">
                                            <Checkbox
                                                id={feature.name}
                                                checked={selectedFeatures.includes(feature.name)}
                                                onCheckedChange={(checked) => handleFeatureChange(feature.name, checked as boolean)}
                                                className="border-2 mx-2"
                                                style={{ borderColor: "#ae7acd" }}
                                            />
                                            <Label
                                                htmlFor={feature.id}
                                                className="text-sm font-medium cursor-pointer flex items-center gap-1"
                                                style={{ color: "#ae7acd" }}
                                            >
                                                <IconRender name={feature.icon} />
                                                {feature.name}
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
                            <Label htmlFor="name-1">Telefono del hotel</Label>
                            <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="phone" value={hotelData.phone} onChange={handleInputChange} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Categoria del hotel</Label>

                            <select className="bg-slate-300/10 py-2 rounded-md pl-3" name="category" value={hotelData.category} onChange={handleInputChange}>
                                {categories?.map(category => (
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