"use client"

import { useEffect, useState } from "react";
import HotelCard from "./HotelCard"

const Hotels = () => {

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const request = await fetch("http://localhost:8080/api/v1/hotel/random")
      const data = await request.json();
      setHotels(data.entity);
    }

    fetchHotels();

  }, [])


  return (
    <div className="py-6">
      <p className="text-center md:text-start md:pl-16 text-2xl md:text-3xl font-bold text-indigo-950 italic mb-8 md:mb-5">Hoteles que te pueden interesar</p>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-5 md:gap-2">
        {
          hotels.map((hotel) => {
            return (
              <HotelCard key={hotel.id} hotel={hotel} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Hotels