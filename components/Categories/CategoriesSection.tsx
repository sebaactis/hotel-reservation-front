"use client"

import { Label } from "@/components/ui/label"

import { useState, useMemo, useEffect } from "react"
import { Search, Filter, X, Package, MapPin, Star, Wifi, Car, Coffee, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Categorie, Hotel } from "@/types"
import { colorsAux } from "@/styles/colorsAux"
import CategoryFilters from "./CategoryFilters"
import CategoryHotel from "./CategoryHotel"
import { ca } from "date-fns/locale"

export default function CategoriesSection() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [categories, setCategories] = useState<Categorie[]>([])
    const [hotels, setHotels] = useState<Hotel[]>([])

    const filteredHotels = useMemo(() => {
        let filtered = hotels

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((hotel) => selectedCategories.includes(hotel.category))
        }

        if (searchTerm) {
            filtered = filtered.filter(
                (hotel) =>
                    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    hotel.description.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        return filtered
    }, [selectedCategories, searchTerm, hotels])


    const updatedCategories = useMemo(() => {
        return categories.map((category) => ({
            ...category,
            count: filteredHotels.filter((hotel) => hotel.category === category.description).length
        }))
    }, [filteredHotels, categories])

    const handleCategoryChange = (categoryDescription: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, categoryDescription])
        } else {
            setSelectedCategories(selectedCategories.filter((desc) => desc !== categoryDescription))
        }
    }

    const clearAllFilters = () => {
        setSelectedCategories([])
        setSearchTerm("")
    }

    const hasActiveFilters = selectedCategories.length > 0 || searchTerm.length > 0

    useEffect(() => {
        const fetchCategories = async () => {
            const requestCategories = await fetch("http://localhost:8080/api/v1/category")
            const responseCategories = await requestCategories.json()

            setCategories(responseCategories.entity)
        }

        fetchCategories();
    }, [])

    useEffect(() => {
        const fetchHotels = async () => {
            const requestHotels = await fetch("http://localhost:8080/api/v1/hotel?size=100&random=true")
            const responseHotels = await requestHotels.json()

            setHotels(responseHotels.entity.page.content)
        }

        fetchHotels();
    }, [])

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="max-w-7xl mx-auto space-y-6">

                <Card className="shadow-lg border-0">
                    <CardHeader style={{ backgroundColor: "#3B234A" }}>
                        <CardTitle className="text-white text-2xl font-bold">Catálogo de Productos y Servicios</CardTitle>
                        <p className="text-white opacity-90 text-sm mt-1">
                            Explora nuestras habitaciones, servicios y amenidades disponibles
                        </p>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1 space-y-4">

                        <Card className="shadow-lg border-0">
                            <CardContent className="p-4" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-3" style={{ color: "#3B234A" }}>
                                            <Search className="w-4 h-4 inline mr-2" />
                                            Buscar Hoteles
                                        </h3>
                                        <div className="relative">
                                            <Search
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                                style={{ color: "#523961" }}
                                            />
                                            <Input
                                                placeholder="Buscar por nombre..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 border-2 focus:ring-0"
                                                style={{
                                                    borderColor: "#BAAFC4",
                                                    backgroundColor: "white",
                                                    color: colorsAux.darkprimary
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardContent className="p-4" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold" style={{ color: "#3B234A" }}>
                                            <Filter className="w-4 h-4 inline mr-2" />
                                            Categorías
                                        </h3>
                                        {hasActiveFilters && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={clearAllFilters}
                                                className="text-xs hover:bg-opacity-20"
                                                style={{ color: "#523961" }}
                                            >
                                                <X className="w-3 h-3 mr-1" />
                                                Limpiar
                                            </Button>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        {updatedCategories.map((category) => {
                                            const isSelected = selectedCategories.includes(category.description)
                                            return (
                                                <CategoryFilters isSelected={isSelected} category={category} key={category.id} handleCategoryChange={handleCategoryChange} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {hasActiveFilters && (
                            <Card className="shadow-lg border-0">
                                <CardContent className="p-4" style={{ backgroundColor: "#C3BBC9" }}>
                                    <h3 className="font-semibold mb-3" style={{ color: "#3B234A" }}>
                                        Filtros Activos
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCategories.map((categoryName) => {
                                            const category = categories.find((c) => c.description === categoryName)
                                            return (
                                                <Badge
                                                    key={categoryName}
                                                    className="text-white cursor-pointer hover:opacity-80"
                                                    style={{ backgroundColor: "#523961" }}
                                                    onClick={() => handleCategoryChange(categoryName, false)}
                                                >
                                                    {category?.description}
                                                    <X className="w-3 h-3 ml-1" />
                                                </Badge>
                                            )
                                        })}
                                        {searchTerm && (
                                            <Badge
                                                className="text-white cursor-pointer hover:opacity-80"
                                                style={{ backgroundColor: "#523961" }}
                                                onClick={() => setSearchTerm("")}
                                            >
                                                "{searchTerm}"
                                                <X className="w-3 h-3 ml-1" />
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <Card className="shadow-lg border-0">
                            <CardContent className="p-4" style={{ backgroundColor: "#C3BBC9" }}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div className="flex items-center gap-4 text-sm" style={{ color: "#523961" }}>
                                        <span className="font-medium">
                                            Mostrando {filteredHotels.length} de {hotels.length} productos
                                        </span>
                                        {hasActiveFilters && (
                                            <span className="text-xs">
                                                ({selectedCategories.length} {selectedCategories.length === 1 ? "filtro" : "filtros"} aplicados)
                                            </span>
                                        )}
                                    </div>
                                    {hasActiveFilters && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={clearAllFilters}
                                            className="border-2 hover:bg-opacity-10 bg-transparent"
                                            style={{
                                                borderColor: "#523961",
                                                color: "#523961",
                                            }}
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Limpiar todos los filtros
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                                {filteredHotels.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
                                        {filteredHotels.map((hotel) => {
                                            const category = categories.find((c) => c.description === hotel.category)
                                            return (
                                                <CategoryHotel hotel={hotel} category={category} key={hotel.id} />
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center">
                                        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: "#523961" }} />
                                        <div className="text-gray-500 mb-2">No se encontraron hoteles</div>
                                        <div className="text-sm text-gray-400 mb-4">
                                            {hasActiveFilters
                                                ? "Intenta ajustar los filtros de búsqueda"
                                                : "No hay hoteles disponibles en este momento"}
                                        </div>
                                        {hasActiveFilters && (
                                            <Button
                                                onClick={clearAllFilters}
                                                className="text-white font-semibold hover:opacity-90 transition-opacity"
                                                style={{ backgroundColor: "#3B234A" }}
                                            >
                                                Limpiar filtros
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
