"use client"

import { useEffect, useState } from "react"
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    Package,
    Wifi,
    Car,
    Coffee,
    Waves,
    MapPin,
    Calendar,
    Hash,
    AlertTriangle,
    AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Categorie } from "@/types"
import { colorsAux } from "@/styles/colorsAux"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import categorieAPI from "@/services/categorie/categorie.service"

export default function CategoriesEditPage() {

    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    const [categories, setCategories] = useState<Categorie[]>([]);
    const [categorieDescription, setCategorieDescription] = useState<string>("");

    const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0)

    const filteredCategories = categories.filter((category) => {
        const matchesSearch =
            category.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterStatus === "all" || category.status === filterStatus
        return matchesSearch && matchesFilter
    })

    const handleEdit = async (categoryId: number, description: string) => {
        try {
            const requestEdit = await categorieAPI.editCategorie(categoryId, description)
            toast.success("Categoría editada exitosamente")
            return;

        } catch (error) {
            toast.error(error.message)
        }

    }

    const handleDelete = async (categoryId: number) => {
        try {

            const requestDelete = await categorieAPI.deleteCategorie(categoryId)
            toast.success("Categoría eliminada exitosamente")
            setCategories(categories.filter((cat) => cat.id !== categoryId))
            return;

        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleAddCategory = async () => {
        try {
            const requestCreate = await categorieAPI.createCategorie(categorieDescription)
            toast.success("Categoría creada exitosamente")
            return;

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await categorieAPI.getCategories();
            setCategories(data.entity)
        }

        fetchCategories();
    }, [])

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <Card className="shadow-lg border-0">
                    <CardHeader style={{ backgroundColor: "#3B234A" }}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-white text-2xl font-bold">Gestión de Categorías</CardTitle>
                                <p className="text-white opacity-90 text-sm mt-1">Administra las categorías de productos y servicios</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-white text-lg font-bold">{categories.length}</div>
                                    <div className="text-white opacity-75 text-xs">Total</div>
                                </div>

                                <Dialog>
                                    <form>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="text-white font-semibold hover:opacity-90 transition-opacity"
                                                style={{ backgroundColor: "#523961" }}
                                                onClick={() => setCategorieDescription("")}
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Agregar Categoría
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Creando categoria</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="description">Description</Label>
                                                    <Input
                                                        id="description"
                                                        name="description"
                                                        value={categorieDescription}
                                                        onChange={(e) => setCategorieDescription(e.target.value)} />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancelar</Button>
                                                </DialogClose>
                                                <Button
                                                    type="submit"
                                                    onClick={handleAddCategory}
                                                >
                                                    Guardar Cambios
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </form>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Filtros y Búsqueda */}
                <Card className="shadow-lg border-0">
                    <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                    style={{ color: "#523961" }}
                                />
                                <Input
                                    placeholder="Buscar categorías por nombre o descripción..."
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
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border-2 hover:bg-opacity-10 bg-transparent"
                                            style={{
                                                borderColor: "#523961",
                                                color: "#523961",
                                            }}
                                        >
                                            Estado: {filterStatus === "all" ? "Todos" : filterStatus === "active" ? "Activas" : "Inactivas"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setFilterStatus("all")}>Todas</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilterStatus("active")}>Activas</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>Inactivas</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: "#523961" }}>
                            <span>Mostrando: {filteredCategories.length} categorías</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de Categorías */}
                <Card className="shadow-lg border-0">
                    <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                        <div className="space-y-0">
                            {filteredCategories.map((category, index) => {
                                return (
                                    <div
                                        key={category.id}
                                        className={`p-6 ${index !== filteredCategories.length - 1 ? "border-b" : ""}`}
                                        style={{ borderColor: "#BAAFC4" }}
                                    >
                                        <div className="flex flex-col lg:flex-row gap-4">
                                            {/* Icono y Info Principal */}
                                            <div className="flex gap-4 flex-1">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">Descripcion:  <span className="font-bold">{category.description}</span></p>
                                                        </div>

                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <span className="font-medium" style={{ color: "#523961" }}>
                                                                <Hash className="w-3 h-3 inline mr-1" />
                                                                ID:
                                                            </span>
                                                            <div className="font-bold" style={{ color: "#3B234A" }}>
                                                                #{category.id}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex lg:flex-col gap-2 lg:w-auto w-full">

                                                <Dialog>
                                                    <form>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                className="flex-1 lg:flex-none text-white font-semibold hover:opacity-90 transition-opacity"
                                                                style={{ backgroundColor: "#523961" }}
                                                                onClick={() => setCategorieDescription(category.description)}
                                                            >
                                                                <Edit className="w-4 h-4 mr-1" />
                                                                Editar
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Editar Categoria con ID: {category.id}</DialogTitle>
                                                                <DialogDescription>
                                                                    <div className="flex items-center gap-1 my-3">
                                                                        <AlertTriangle className="text-yellow-500 w-5 h-5" />
                                                                        <span className="text-yellow-500">Está editando una categoria vigente</span>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4">
                                                                <div className="grid gap-3">
                                                                    <Label htmlFor="description">Description</Label>
                                                                    <Input
                                                                        id="description"
                                                                        name="description"
                                                                        value={categorieDescription}
                                                                        onChange={(e) => setCategorieDescription(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancelar</Button>
                                                                </DialogClose>
                                                                <Button
                                                                    type="submit"
                                                                    onClick={() => handleEdit(category.id, categorieDescription)}
                                                                >
                                                                    Guardar Cambios
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </form>
                                                </Dialog>

                                                <Dialog>
                                                    <form>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                className="flex-1 lg:flex-none text-white font-semibold hover:opacity-90 transition-opacity"
                                                                style={{ backgroundColor: "#ffffff94", color: "#d32626" }}
                                                                onClick={() => setCategorieDescription(category.description)}
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-1" />
                                                                Eliminar
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Eliminar Categoria con ID: {category.id}</DialogTitle>
                                                                <DialogDescription>
                                                                    <div className="flex items-center gap-1 my-3">
                                                                        <AlertCircle className="text-red-500 w-5 h-5" />
                                                                        <span className="text-red-500">Esta accion no se puede volver atras</span>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4">
                                                                <div className="grid gap-3">
                                                                    <Label htmlFor="description">Description</Label>
                                                                    <p className="text-sm italic bg-gray-500 py-2 pl-3 rounded-lg">{category.description}</p>
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancelar</Button>
                                                                </DialogClose>
                                                                <Button
                                                                    type="submit"
                                                                    onClick={() => handleDelete(category.id)}
                                                                >
                                                                    Guardar Cambios
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </form>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {filteredCategories.length === 0 && (
                            <div className="p-12 text-center">
                                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: "#523961" }} />
                                <div className="text-gray-500 mb-2">No se encontraron categorías</div>
                                <div className="text-sm text-gray-400 mb-4">
                                    {searchTerm || filterStatus !== "all"
                                        ? "Intenta ajustar los filtros de búsqueda"
                                        : "Agrega tu primera categoría para comenzar"}
                                </div>
                                <Button
                                    onClick={handleAddCategory}
                                    className="text-white font-semibold hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: "#3B234A" }}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Agregar Primera Categoría
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}
