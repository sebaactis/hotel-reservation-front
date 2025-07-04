import React from 'react'
import { LikeIcon, MapIcon, WifiIcon } from '../icons'
import { colorsAux } from '@/styles/colorsAux'

const RecommendationCard = () => {

    const badgesTest = [
        { name: "Desayuno", icon: <WifiIcon /> },
        { name: "Wifi", icon: <WifiIcon /> },
        { name: "Estacionamiento", icon: <WifiIcon /> },
        { name: "Gimnasio", icon: <WifiIcon /> },

    ]

    return (
        <article style={{ backgroundColor: colorsAux.secondary }} className='grid grid-cols-1 md:grid-cols-[30%_1fr]'>
            <div>
                <img
                    src="https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"
                    alt="Hotel Elegante Vista"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className='pl-8 pt-5'>
                <p className="text-indigo-950 text-2xl font-bold">Hotel Elegante Vista</p>

                <div style={{ color: colorsAux.primary }} className="flex items-center gap-1">
                    <MapIcon />
                    <p>Centro historico, Barcelona</p>
                </div>

                <div className='flex items-center gap-2 mt-5'>
                    <p style={{ backgroundColor: colorsAux.primary }} className='rounded-full p-3 text-center font-bold text-lg'>8.9</p>
                    <div className='ml-2'>
                        <p style={{ color: colorsAux.primary }} className="text-black/40 font-bold text-lg">Excelente</p>
                        <p className="text-black/40 font-medium text-sm">Basado en 1000 opiniones</p>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap mt-5">
                    {
                        badgesTest.map((bagdes, index) => {
                            return (
                                <div style={{ backgroundColor: colorsAux.lighter, color: colorsAux.primary }} key={index} className="flex gap-1.5 px-3 py-1 rounded-full text-sm">
                                    <p>{bagdes.icon}</p>
                                    <p>{bagdes.name}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <p style={{ color: colorsAux.darkprimary }} className='w-[90%] mt-5 text-base font-light'>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas accusantium et! Id, nam! Aspernatur optio atque quam? Asperiores excepturi id quidem eum autem temporibus, optio nobis similique aperiam quo."</p>

                <div className='flex flex-col md:flex-row gap-5 md:gap-0 justify-between mr-5 mt-7 mb-3'>
                    <p style={{ color: colorsAux.darkprimary }} className="font-bold text-2xl">$25000 <span className="font-normal text-sm text-black/50 ">por noche</span> </p>
                    <div className='flex gap-2'>

                        <button style={{ borderColor: colorsAux.darkprimary, color: colorsAux.darkprimary }} className="flex px-4 gap-2 py-1 pl-3 pr-4 rounded-lg transition-all hover:opacity-90 text-white border-3 text-sm font-semibold items-center">
                            <LikeIcon />
                            Me gusta
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