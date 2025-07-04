import { colorsAux } from "@/styles/colorsAux"
import { MapIcon, WifiIcon } from "../icons"

const CategoryCard = () => {

    const badgesTest = [
        { name: "Desayuno", icon: <WifiIcon /> },
        { name: "Wifi", icon: <WifiIcon /> },
        { name: "Estacionamiento", icon: <WifiIcon /> },
        { name: "Gimnasio", icon: <WifiIcon /> },

    ]

    return (
        <article style={{ backgroundColor: colorsAux.secondary }} className="flex flex-col mx-2 rounded-lg">


            <div className="w-full rounded-lg">
                <img
                    src="https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"
                    alt="Hotel Elegante Vista"
                    className="w-full h-48 object-cover bg-red-200"
                />
            </div>

            <div className="flex flex-col gap-2 px-8 py-5">

                <p className="text-indigo-950 text-2xl font-bold ">Hotel Elegante Vista</p>

                <div style={{ color: colorsAux.primary }} className="flex items-center gap-1">
                    <MapIcon />
                    <p>Centro historico, Barcelona</p>
                </div>


                <div className="flex gap-2 flex-wrap pt-2">
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

                <div className="flex items-center justify-between pt-4">
                    <p style={{ color: colorsAux.darkprimary }} className="font-bold text-2xl">$25000 <span className="font-normal text-sm text-black/50 ">por noche</span> </p>
                    <p style={{ color: colorsAux.primary }} className="text-sm font-medium">Ahorra 26%</p>
                </div>

                <p className="pt-5 text-black/40 font-medium text-sm">Impuestos y tasas incluidos</p>
                <button style={{ backgroundColor: colorsAux.darkprimary }} className="mt-3 py-2 rounded-xl transition-all hover:opacity-90 text-white">Reservar Ahora</button>
            </div>

        </article>
    )
}

export default CategoryCard