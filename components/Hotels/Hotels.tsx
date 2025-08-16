"use client"

import { Dispatch, useEffect, useState } from "react";

import HotelCard from "./HotelCard"
import HotelPagination from "./HotelPagination";
import HotelSkeleton from "./HotelSkeleton";

import { toast } from "sonner";
import { Hotel } from "@/types";

interface Props {
  hotels: Hotel[]
  page: number;
  seed: string;
  totalPages: number;
  setPage: React.SetStateAction<Dispatch<number>>;
}

const Hotels = ({ hotels, page, seed, totalPages, setPage }: Props) => {

  return (
    <div className="py-6">
      <p className="text-center md:text-start md:pl-16 text-2xl md:text-3xl font-bold text-indigo-950 italic mb-8 md:mb-5">Hoteles que te pueden interesar</p>

      {hotels?.length < 1 &&
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
          hotels?.map((hotel) => {
            return (
              <HotelCard key={hotel.id} hotel={hotel} />
            )
          })
        }
      </div>

      {hotels?.length > 0 && <HotelPagination totalPages={totalPages} page={page} seed={seed} onChangePage={setPage} />}

    </div>
  )
}

export default Hotels