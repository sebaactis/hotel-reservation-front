"use client"

import { useState } from "react"
import { Upload, MapPin, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { features } from "process"
import { toast } from "sonner"

export default function AddHotel() {

    const [hotelData, setHotelData] = useState([])
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
    const [rating, setRating] = useState(0)

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newHotel = {
            ...hotelData,
            score: rating.toFixed(1),
            features: selectedAmenities,
            images: [
                {
                    "url": "https://example.com/image.jpg",
                }
            ]
        }

        const submit = await fetch("http://localhost:8080/api/v1/hotel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newHotel),
        })

        if (submit.ok) {
            toast.success("Hotel agregado exitosamente")
            setHotelData([])
            setSelectedAmenities([])
            setRating(0)
            window.reload();
        } else {
            toast.error("Error al intentar agregar hotel")
        }
    }

    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="max-w-2xl mx-auto">
                <Card className="shadow-lg border-0 overflow-hidden">

                    <CardHeader style={{ backgroundColor: "#3B234A" }}>
                        <CardTitle className="text-white text-2xl font-bold text-center">Agregar Nuevo Hotel</CardTitle>
                    </CardHeader>

                    <CardContent className="p-8" style={{ backgroundColor: "#C3BBC9" }}>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold" style={{ color: "#3B234A" }}>
                                    Información Básica
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name" className="text-sm font-medium" style={{ color: "#523961" }}>
                                            Nombre del Hotel *
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Ej: Hotel Elegante Vista"
                                            className="mt-1 border-2 focus:ring-0 text-gray-500"
                                            style={{
                                                borderColor: "#BAAFC4",
                                                backgroundColor: "white",
                                            }}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="price" className="text-sm font-medium" style={{ color: "#523961" }}>
                                            Precio por Noche (ARS) *
                                        </Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            name="price"
                                            placeholder="89"
                                            className="mt-1 border-2 focus:ring-0 text-gray-500"
                                            style={{
                                                borderColor: "#BAAFC4",
                                                backgroundColor: "white",
                                            }}
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="location" className="text-sm font-medium" style={{ color: "#523961" }}>
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        Ubicación *
                                    </Label>
                                    <Input
                                        id="location"
                                        placeholder="Ej: Centro Histórico, Barcelona"
                                        name="location"
                                        className="mt-1 border-2 focus:ring-0 text-gray-500"
                                        style={{
                                            borderColor: "#BAAFC4",
                                            backgroundColor: "white",
                                        }}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description" className="text-sm font-medium" style={{ color: "#523961" }}>
                                        Descripción
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        onChange={handleInputChange}
                                        placeholder="Describe las características principales del hotel..."
                                        rows={4}
                                        className="mt-1 border-2 focus:ring-0 resize-none text-gray-500"
                                        style={{
                                            borderColor: "#BAAFC4",
                                            backgroundColor: "white",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Calificación */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold" style={{ color: "#3B234A" }}>
                                    Calificación
                                </h3>

                                <div>
                                    <Label className="text-sm font-medium" style={{ color: "#523961" }}>
                                        Puntuación (1-10)
                                    </Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            step="0.1"
                                            value={rating}
                                            onChange={(e) => setRating(Number.parseFloat(e.target.value))}
                                            className="flex-1"
                                            style={{ accentColor: "#3B234A" }}
                                        />
                                        <div
                                            className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold"
                                            style={{ backgroundColor: "#3B234A" }}
                                        >
                                            {rating.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Amenidades */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold" style={{ color: "#3B234A" }}>
                                    Amenidades
                                </h3>

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
                                                    style={{ borderColor: "#523961" }}
                                                />
                                                <Label
                                                    htmlFor={amenity.id}
                                                    className="text-sm font-medium cursor-pointer flex items-center gap-1 "
                                                    style={{ color: "#523961" }}
                                                >
                                                    <IconComponent className="w-4 h-4" />
                                                    {amenity.label}
                                                </Label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Imagen */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold" style={{ color: "#3B234A" }}>
                                    Imagen del Hotel
                                </h3>

                                <div
                                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-opacity-50 transition-colors"
                                    style={{
                                        borderColor: "#BAAFC4",
                                        backgroundColor: "#BAAFC4",
                                    }}
                                >
                                    <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: "#523961" }} />
                                    <p className="text-sm font-medium" style={{ color: "#523961" }}>
                                        Haz clic para subir una imagen o arrastra y suelta
                                    </p>
                                    <p className="text-xs mt-1" style={{ color: "#523961" }}>
                                        PNG, JPG hasta 10MB
                                    </p>
                                    <input type="file" className="hidden" accept="image/*" />
                                </div>
                            </div>

                            {/* Información de Contacto */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold" style={{ color: "#3B234A" }}>
                                    Información de Contacto
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone" className="text-sm font-medium" style={{ color: "#523961" }}>
                                            Teléfono
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            placeholder="+34 123 456 789"
                                            className="mt-1 border-2 focus:ring-0 text-gray-500"
                                            style={{
                                                borderColor: "#BAAFC4",
                                                backgroundColor: "white",
                                            }}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#523961" }}>
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="info@hotel.com"
                                            className="mt-1 border-2 focus:ring-0 text-gray-500"
                                            style={{
                                                borderColor: "#BAAFC4",
                                                backgroundColor: "white",
                                            }}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 border-2 hover:bg-opacity-10 bg-transparent"
                                    style={{
                                        borderColor: "#523961",
                                        color: "#523961",
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 text-white font-semibold hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: "#3B234A" }}
                                >
                                    Agregar Hotel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
