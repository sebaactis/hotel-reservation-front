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
import { Button } from "@/components/ui/button"
import { Edit, Eye, MapPin, Star, Trash2, AlertCircle, AlertTriangle, Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Shirt } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Hotel } from "@/types"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"

const HotelItemDelete = ({ hotel }: Hotel) => {

    const { token } = useAuth();

    const handleDelete = async (hotelId: number) => {
        const request = await fetch(`http://localhost:8080/api/v1/hotel/${hotelId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (request.ok) {
            toast.success("Hotel eliminado correctamente")
        } else {
            toast.error("No se pudo eliminar el hotel")
        }

    }

    return (
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
    )
}

export default HotelItemDelete