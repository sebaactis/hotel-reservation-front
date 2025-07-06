"use client"

import { useEffect, useState } from "react";
import HotelCard from "./HotelCard"
import HotelPagination from "./HotelPagination";

const Hotels = () => {

  const baseUrl = "http://localhost:8080/api/v1/hotel?"

  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [seed, setSeed] = useState<string>("");


  useEffect(() => {
    const fetchHotels = async () => {
      const request = await fetch(`${baseUrl}page=${page}&random=true` + (seed ? `&seed=${seed}` : ""))
      const data = await request.json();

      setHotels(data.entity.page.content);
      setPage(data.entity.page.pageable.pageNumber);
      setTotalPages(data.entity.page.totalPages);

      if (!seed) setSeed(data.entity.seed);

    }

    fetchHotels();

  }, [page])

  return (
    <div className="py-6">
      <p className="text-center md:text-start md:pl-16 text-2xl md:text-3xl font-bold text-indigo-950 italic mb-8 md:mb-5">Hoteles que te pueden interesar</p>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center justify-items-center gap-5 md:gap-2">
        {
          hotels.map((hotel) => {
            return (
              <HotelCard key={hotel.id} hotel={hotel} />
            )
          })
        }
      </div>

      <HotelPagination totalPages={totalPages} page={page} seed={seed} onChangePage={setPage} />

    </div>
  )
}

export default Hotels