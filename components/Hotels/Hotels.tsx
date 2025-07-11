"use client"

import { useEffect, useState } from "react";

import HotelCard from "./HotelCard"
import HotelPagination from "./HotelPagination";
import HotelSkeleton from "./HotelSkeleton";

import { toast } from "sonner";
import { Hotel } from "@/types";

const Hotels = () => {

  const baseUrl = "http://localhost:8080/api/v1/hotel?"

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [seed, setSeed] = useState("");


  useEffect(() => {
    const fetchHotels = async () => {

      try {
        const request = await fetch(`${baseUrl}page=${page}&random=true` + (seed ? `&seed=${seed}` : ""))
        const data = await request.json();

        
        setHotels(data.entity.page.content);
        setPage(data.entity.page.pageable.pageNumber);
        setTotalPages(data.entity.page.totalPages);

        if (!seed) setSeed(data.entity.seed);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        toast.error("Error al cargar los hoteles: " + error);
      }
    }

    fetchHotels();
  }, [page])

  return (
    <div className="py-6">
      <p className="text-center md:text-start md:pl-16 text-2xl md:text-3xl font-bold text-indigo-950 italic mb-8 md:mb-5">Hoteles que te pueden interesar</p>

      {hotels.length < 1 &&
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-5 md:gap-2 mt-10">
          <HotelSkeleton />
          <HotelSkeleton />
          <HotelSkeleton />
          <HotelSkeleton />
          <HotelSkeleton />
          <HotelSkeleton />
        </div>}

      <div className="grid grid-cols-1 md:grid-cols-2 justify-center justify-items-center gap-5 md:gap-2">
        {
          hotels.map((hotel) => {
            return (
              <HotelCard key={hotel.id} hotel={hotel} />
            )
          })
        }
      </div>

      {hotels.length > 0 && <HotelPagination totalPages={totalPages} page={page} seed={seed} onChangePage={setPage} />}

    </div>
  )
}

export default Hotels