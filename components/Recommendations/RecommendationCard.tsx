import React from 'react'
import { LikeIcon, MapIcon, WifiIcon } from '../icons'
import { colorsAux } from '@/styles/colorsAux'
import { Hotel } from '@/types/hotel'
import { BadgeListFromJson } from '../Icons/IconBagde'

const RecommendationCard = ({ hotel }: { hotel: Hotel }) => {

    const badgesTest = [
        { name: "Desayuno", icon: <WifiIcon /> },
        { name: "Wifi", icon: <WifiIcon /> },
        { name: "Estacionamiento", icon: <WifiIcon /> },
        { name: "Gimnasio", icon: <WifiIcon /> },
    ]

    const scoreString = (score: number) => {
        if (score < 2) return "Malo";
        if (score < 4) return "Bueno";

        return "Excelente";
    }

    return (
        <article style={{ backgroundColor: colorsAux.secondary }} className='grid grid-cols-1 md:grid-cols-[30%_1fr]'>
            <div>
                <img
                    src={hotel.images[0].url}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className='pl-8 pt-5'>
                <p className="text-indigo-950 text-2xl font-bold">{hotel.name}</p>

                <div style={{ color: colorsAux.primary }} className="flex items-center gap-1">
                    <MapIcon />
                    <p>{hotel.location}</p>
                </div>

                <div className='flex items-center gap-2 mt-5'>
                    <p style={{ backgroundColor: colorsAux.primary }} className='rounded-full p-3 text-center font-bold text-lg'>{hotel.score}</p>
                    <div className='ml-2'>
                        <p style={{ color: colorsAux.primary }} className="text-black/40 font-bold text-lg">{scoreString(hotel.score)}</p>
                    </div>
                </div>

                <p style={{ color: colorsAux.darkprimary }} className='w-[90%] mt-5 text-base font-light'>{hotel.description}</p>

                <div className='flex flex-col md:flex-row gap-5 md:gap-0 justify-between mr-5 mt-7 mb-3'>
                    <p style={{ color: colorsAux.darkprimary }} className="font-bold text-2xl">${hotel.price} <span className="font-normal text-sm text-black/50 ">por noche</span> </p>
                    <div className='flex gap-2'>

                        <button style={{ borderColor: colorsAux.darkprimary, color: colorsAux.darkprimary }} className="flex px-4 gap-2 py-1 pl-3 pr-4 rounded-lg transition-all hover:opacity-90 text-white border-3 text-sm font-semibold items-center">
                            <LikeIcon />
                            Favorito
                        </button>
                        <button style={{ backgroundColor: colorsAux.darkprimary }} className="py-1.5 px-4 md:px-5 rounded-lg transition-all hover:opacity-90 text-white text-base font-normal">
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default RecommendationCard