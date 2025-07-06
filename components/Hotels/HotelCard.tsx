import { colorsAux } from "@/styles/colorsAux"
import { MapIcon, WifiIcon } from "../icons"
import BadgeList from "../BagdeListFromJson";
import { BadgeListFromJson } from "../BagdeListFromJson";
import Link from "next/link";
import { Hotel } from "@/types";


const HotelCard = ({ hotel }: { hotel: Hotel }) => {

    return (
        <article style={{ backgroundColor: colorsAux.secondary }} className="flex flex-col m-2 rounded-lg min-w-[42rem] max-w-2xl shadow-lg transition-all hover:shadow-2xl">

            <div className="w-full rounded-lg">
                <img
                    src="https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"
                    alt={hotel.name}
                    className="w-full object-cover"
                />
            </div>

            <div className="flex flex-col min-h-96 justify-between gap-2 px-8 py-10">

                <p className="text-indigo-950 text-2xl font-bold ">{hotel.name}</p>

                <div style={{ color: colorsAux.primary }} className="flex items-center gap-1">
                    <MapIcon />
                    <p>{hotel.location}</p>
                </div>


                <div className="flex gap-2 flex-wrap pt-2">
                    {
                        <BadgeListFromJson key={hotel.id} features={hotel.features} />
                    }
                </div>

                <div className="flex items-center justify-between pt-4">
                    <p style={{ color: colorsAux.darkprimary }} className="font-bold text-2xl">$ {hotel.price} <span className="font-normal text-sm text-black/50 ">por noche</span> </p>
                </div>

                <p className="pt-5 text-black/40 font-medium text-sm">Impuestos y tasas incluidos</p>
                <Link href={`hotel/${hotel.id}`} style={{ backgroundColor: colorsAux.darkprimary }} className="mt-3 py-2 rounded-xl transition-all hover:opacity-90 text-white text-center">Reservar Ahora </Link>
            </div>

        </article>
    )
}

export default HotelCard