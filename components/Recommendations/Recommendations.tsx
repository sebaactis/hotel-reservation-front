import { colorsAux } from "@/styles/colorsAux"
import RecommendationCard from "./RecommendationCard"
import { useEffect, useState } from "react"
import { Hotel } from "@/types/hotel"
import { toast } from "sonner"
import hotelApi from "@/services/hotel/hotel.service"

const Recommendations = () => {

    const [hotels, setHotels] = useState<Hotel[]>([]);

    useEffect(() => {
        const fetchHotels = async () => {

            try {
                const data = await hotelApi.getHotels({ size: 2 });
                setHotels(data.entity.page.content);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                toast.error("Error al cargar los hoteles 2: " + error);
            }
        }

        fetchHotels();
    }, [])

    return (
        <article className="bg-[#c3bbc98e]">
            <p className="text-center md:text-start md:pl-16 text-2xl md:text-3xl font-bold text-indigo-950 italic mb-8 md:mb-5 pt-5">Hoteles recomendados</p>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-20 w-full">

                {hotels.map((hotel) => (
                    <RecommendationCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
        </article>
    )
}

export default Recommendations