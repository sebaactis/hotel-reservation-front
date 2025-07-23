"use client"

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"
import { Hotel } from "@/types"
import HotelDetails from "@/components/Hotels/HotelDetails/HotelDetails";


export default function HotelDetailsPage() {

    const { id } = useParams({});
    const [hotel, setHotel] = useState<Hotel>({});

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/hotel/${id}`)
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del hotel")
                }
                const data = await response.json()
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
