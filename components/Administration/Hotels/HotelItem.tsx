import { Hotel } from '@/types'
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
import { Edit, Eye, MapPin, Star, Trash2, AlertCircle, AlertTriangle, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Shirt } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'


const HotelItem = ({ hotel, index, handleDelete }: { hotel: Hotel }) => {


    const [hotelData, setHotelData] = useState([])
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
    const [rating, setRating] = useState(0)

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

        console.log("Editando hotel")

        const editHotel = {
            ...hotelData,
            score: rating.toFixed(1),
            features: selectedAmenities
        }

        const submit = await fetch(`http://localhost:8080/api/v1/hotel/${hotel.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editHotel),
        })

        if (submit.ok) {
            toast.success("Hotel editado exitosamente")
            setSelectedAmenities([])
            setRating(0)
            window.reload();
        } else {
            toast.error("Error al intentar editar hotel")
        }
    }

    useEffect(() => {
        setHotelData(hotel);
        setRating(hotel.score);
        setSelectedAmenities(hotel.features);
    }, [hotel])


    const amenities = [
        { id: "Wifi", label: "WiFi Gratis", icon: Wifi },
        { id: "Estacionamiento", label: "Parking", icon: Car },
        { id: "Desayuno", label: "Desayuno", icon: Coffee },
        { id: "Piscina", label: "Piscina", icon: Waves },
        { id: "Restaurante", label: "Restaurante", icon: Utensils },
        { id: "Gimnasio", label: "Gimnasio", icon: Dumbbell },
        { id: "Lavanderia", label: "Lavandería", icon: Shirt },
    ]


    return (
        <div
            key={hotel.id}
            className={`p-6 border-1`}
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
                                            <AlertTriangle className="text-yellow-500 w-5 h-5" />
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
                                        <Input className="bg-slate-300/10 py-2 rounded-md pl-3" name="category" value={hotelData.category} onChange={handleInputChange} />
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


                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <Button className="text-red-500 hover:text-red-500 bg-white/70 hover:bg-white/90 border-0 min-w-28" variant="outline">
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
    )
}

export default HotelItem