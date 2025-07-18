import { Hotel } from "@/types"
import { useEffect, useState } from "react"

interface Params {
    location: string;
    dateRange: {
        from: string;
        to: string;
    }
}

export const useSearchHotels = () => {
    const [hotelsResult, setHotelsResult] = useState<Hotel[]>([]);

    const searchHotels = async (parameters: Params) => {
        const { location, dateRange } = parameters;

        try {
            const res = await fetch(`http://localhost:8080/api/v1/hotel?size=10&location=${encodeURIComponent(location)}&from=${dateRange.from}&to=${dateRange.to}`);
            const data = await res.json();
            setHotelsResult(data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    return { hotelsResult, searchHotels };
};