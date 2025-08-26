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
                if (!seed) setSeed(data.entity.seed);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                toast.error("Error al cargar los hoteles: " + error);
            }
        }

        fetchHotels();
    }, [])

    return (
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-20 bg-[#c3bbc98e] w-full">
            {hotels.map((hotel) => (
                <RecommendationCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    )
}

export default Recommendations