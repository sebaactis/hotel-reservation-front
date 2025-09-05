"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"
import { Hotel } from "@/types"
import HotelDetails from "@/components/Hotels/HotelDetails/HotelDetails";
import hotelApi from "@/services/hotel/hotel.service";


export default function HotelDetailsPage() {

    const { id } = useParams({});
    const [hotel, setHotel] = useState<Hotel>({});

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const data = await hotelApi.getHotel(id);
                setHotel(data.entity)
            } catch (error) {
                console.error("Error fetching hotel data:", error)
            }
        }

        fetchHotel();
    }, [])

    return (
        <HotelDetails hotel={hotel} />
    )
}
